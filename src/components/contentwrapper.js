import React, { Component } from 'react';
import { Link } from 'react-router-dom';

function index_within(parent, child) {
  for (var i = 0; i < parent.childNodes.length; i++) {
	if (child === parent.childNodes[i]) {
	  return i;
	}
  }
  return null;
}

function get_dom_coords(ancestor, descendent) {
  if (ancestor === descendent) {
    return [];
  }
  if (descendent.parentNode === null) {
	return null;
  }
  let result = get_dom_coords(ancestor, descendent.parentNode);
  let index = index_within(descendent.parentNode, descendent);
  if (index === null) {
	return null;
  } else {
	result.push(index);
	return result;
  }
}

function get_extended_dom_coords(ancestor, descendent, offset) {
  let result = get_dom_coords(ancestor, descendent);
  if (result === null) {
	return result;
  }
  result.push(offset);
  return result;
}

/* Hack to find the pixel location of a text-selection endpoint represented in the
	node/offset form returned by the Selection API. If the node is an element, offset
	is an index into its array of children, so we can find the position of that child.
	If the node is a text node, offset represents an index into its characters, so we have
	to resort to tricks. Make a copy of the parent element modified so that the character
	we are looking for is wrapped in a SPAN tag. Render the copied element at the same position
	as the element it copies and find the position of the SPAN tag, then destroy the copied
	element. */
function node_offset_position(node, offset) {
  if (node.nodeType === Node.ELEMENT_NODE) {
	var correctChild;
	if (node.children.length >= offset)
	{
	  return [
	    node.offsetLeft + node.offsetWidth,
		node.offsetTop + node.offsetHeight
	  ];
	} else {
	  correctChild = node.children[offset];
	  return [
	    correctChild.offsetLeft,
	    correctChild.offsetTop
	  ];
	}
  } else if (node.nodeType === Node.TEXT_NODE) {
	let parentNode = node.parentNode;
	let duplicateNode = parentNode.cloneNode(true);
	let documentFragment = new DocumentFragment();
	if (offset > 0) {
	  documentFragment.appendChild(new Text(node.data.substring(0, offset)));
	}
	let spanNode = document.createElement('span');
	spanNode.appendChild(new Text(node.data.substring(offset, offset+1)));
	documentFragment.appendChild(spanNode);
	if (offset + 1 < node.length) {
	  documentFragment.appendChild(new Text(node.data.substring(offset+1, node.length)));
	}
	let index = index_within(parentNode, node);
	if (index === null) {
	  return [0, 0];
	}
	let duplicateChild = duplicateNode.childNodes[index];
	duplicateNode.replaceChild(documentFragment, duplicateChild);
	duplicateNode.style.position = 'absolute';
	duplicateNode.style.top = parentNode.offsetTop + 'px';
	duplicateNode.style.left = parentNode.offsetLeft + 'px';
	duplicateNode.style.width = parentNode.offsetWidth + 'px';
	duplicateNode.style.margin = '0px';
	duplicateNode.style.userSelect = 'none';
	duplicateNode.style['-ms-user-select'] = 'none';
	parentNode.parentNode.appendChild(duplicateNode);
	let result = [
	  spanNode.offsetLeft + parentNode.offsetLeft,
	  spanNode.offsetTop + parentNode.offsetTop
	];
	parentNode.parentNode.removeChild(duplicateNode);
	return result;
  } else {
    return [0, 0];
  }
}

function fill_selection_info_forward(selection, info) {
  info.first.node = selection.anchorNode;
  info.first.offset = selection.anchorOffset;
  info.last.node = selection.focusNode;
  info.last.offset = selection.focusOffset;
}

function fill_selection_info_backward(selection, info) {
  info.first.node = selection.focusNode;
  info.first.offset = selection.focusOffset;
  info.last.node = selection.anchorNode;
  info.last.offset = selection.anchorOffset;
}

function blank_highlight_collection() {
  return {
	nextId: 0,
	data: []
  };
}

export class ContentWrapper extends Component {
  constructor(props) {
	super(props);
	this.highlightSelection = this.highlightSelection.bind(this);
    this.selectHandler = this.selectHandler.bind(this);
  }
  getSelectionInfo() {
	let result = {};
	let selection = document.getSelection();
	if (
	  this.dom.contains(selection.anchorNode) &&
	  this.dom.contains(selection.focusNode) &&
	  (selection.anchorNode !== selection.focusNode || selection.anchorOffset !== selection.focusOffset)
	) {
	  result.selectionExists = true;
	  result.first = {};
	  result.last = {};
	  /* anchorNode does not necessarily come before focusNode in the DOM -- find the beginning, in
	    document order, of the selection */
	  if (selection.anchorNode === selection.focusNode) {
		if (selection.anchorOffset < selection.focusOffset) {
		  fill_selection_info_forward(selection, result);
		} else {
		  fill_selection_info_backward(selection, result);
		}
	  } else if (
	    selection.anchorNode.compareDocumentPosition(selection.focusNode) &
		Node.DOCUMENT_POSITION_PRECEDING
	  ) {
		fill_selection_info_backward(selection, result);
	  } else {
		fill_selection_info_forward(selection, result);
	  }
	  return result;
	} else {
	  result.selectionExists = false;
	  return result;
	}
  }
  highlightSelection() {
	let selectionInfo = this.getSelectionInfo();
	if (selectionInfo.selectionExists) {
	  let highlightQueryObject = {
		type: 'ussc-highlights',
		path: this.props.path
	  };
	  var highlightCollection;
	  try {
		highlightCollection = JSON.parse(localStorage.getItem(JSON.stringify(highlightQueryObject)));
	  } catch (e) {
		highlightCollection = blank_highlight_collection();
	  }
	  if (highlightCollection === null) {
		highlightCollection = blank_highlight_collection();
	  }
	  let firstCoords = get_extended_dom_coords(this.dom, selectionInfo.first.node, selectionInfo.first.offset);
	  let lastCoords = get_extended_dom_coords(this.dom, selectionInfo.last.node, selectionInfo.last.offset);
	  let highlightObject = {
		id: highlightCollection.nextId,
	    first: firstCoords,
	    last: lastCoords
	  };
	  highlightCollection.data.push(highlightObject);
	  highlightCollection.nextId++;
	  localStorage.setItem(JSON.stringify(highlightQueryObject), JSON.stringify(highlightCollection));
	}
  }
  selectHandler() {
    let selectionInfo = this.getSelectionInfo();
	let selectMenu = this.dom.children[0];
	/* If something is selected, show the selection menu. Otherwise, hide the selection menu. */
	if (selectionInfo.selectionExists) {
	  /* show the menu above the beginning of the selection */
	  selectMenu.style.display = 'block';
	  selectMenu.style.position = 'absolute';
	  let position = node_offset_position(selectionInfo.first.node, selectionInfo.first.offset);
	  selectMenu.style.top = (position[1] - selectMenu.offsetHeight) + 'px';
	  selectMenu.style.left = position[0] + 'px';
	} else {
	  selectMenu.style.display = 'none';
	}
  }
  render() {
	document.addEventListener('selectionchange', this.selectHandler);
    return (
	  <div className="usa-section" ref={dom => this.dom = dom}>
	    <ul className='usa-nav-submenu' style={{display:'none'}}>
		  <li><a href='#' className='usa-nav-link' onClick={this.highlightSelection}>Highlight</a></li>
		</ul>
	    {this.props.children}
	  </div>
	);
  }
}