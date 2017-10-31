import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import App from '../App';

function get_regularized_offset_size(element) {
  if (element.nodeType === Node.ELEMENT_NODE) {
	return element.childNodes.length;
  } else if (element.nodeType === Node.TEXT_NODE) {
	return element.data.length;
  } else {
	return 0;
  }
}

function insert_span_into_text(node, first, last) {
  let documentFragment = new DocumentFragment();
  if (first > 0) {
	documentFragment.appendChild(new Text(node.data.substring(0, first)));
  }
  let span = document.createElement('span');
  span.appendChild(new Text(node.data.substring(first, last)));
  documentFragment.appendChild(span);
  if (last < node.data.length) {
	documentFragment.appendChild(new Text(node.data.substring(last, node.data.length)));
  }
  node.parentNode.replaceChild(documentFragment, node);
  return span;
}

class HighlightContext {
  constructor(ancestor) {
	this.ancestor = ancestor;
  }
  elementIsInherentlyIgnored(element) {
    if (element.nodeType === Node.ELEMENT_NODE) {
      if (element.tagName.toUpperCase() === 'A') {
	    return true;
	  } else {
	    return false;
	  }
    } else if (element.nodeType === Node.TEXT_NODE) {
	  return false;
    } else {
	  return true;
    }
  }
  elementIsIgnored(element) {
    if (this.ancestor === element) {
	  return false;
    }
    if (element.parentNode === null) {
	  return true;
    }
    if (this.elementIsInherentlyIgnored(element)) {
	  return true;
    }
    return this.elementIsIgnored(element.parentNode);
  }
  regularizedTextOffsetAddress(element, offset) {
	let size = get_regularized_offset_size(element);
	if (offset > size) {
	  offset = size;
	}
	if (this.elementIsIgnored(element)) {
	  return 0;
	} else if (element.nodeType === Node.ELEMENT_NODE) {
	  let result = 0;
	  for (var i = 0; i < offset; i++) {
		result += this.regularizedTextSize(element.childNodes[i]);
	  }
	  return result;
	} else if (element.nodeType === Node.TEXT_NODE) {
	  return offset;
	} else {
	  return 0;
	}
  }
  regularizedTextSize(element) {
	return this.regularizedTextOffsetAddress(element, get_regularized_offset_size(element));
  }
  regularizedTextAddressForElement(element) {
	if (this.ancestor === element) {
	  return 0;
	}
	if (element.parentNode === null) {
	  return null;
	}
	let result = this.regularizedTextAddressForElement(element.parentNode);
	for (var i = 0; i < element.parentNode.childNodes.length; i++) {
	  if (element.parentNode.childNodes[i] !== element) {
		result += this.regularizedTextSize(element.parentNode.childNodes[i]);
	  } else {
		return result;
	  }
	}
    return null;
  }
  regularizedTextAddress(element, offset) {
	return this.regularizedTextAddressForElement(element) + this.regularizedTextOffsetAddress(element, offset);
  }
  highlightEntireElement(element) {
	if (this.elementIsIgnored(element)) {
	  return;
	}
	element.className += ' highlight';
  }
  highlightRangeRecursive(element, begin, end) {
	if (this.elementIsIgnored(element)) {
	  return;
	}
	let position = this.regularizedTextAddressForElement(element);
	let size = this.regularizedTextSize(element);
	if (element.nodeType === Node.ELEMENT_NODE) {
	  position += size;
	  for (var i = element.childNodes.length - 1; i >= 0; i--) {
		let child = element.childNodes[i];
		let childSize = this.regularizedTextSize(child);
		if (position > end && position - childSize > begin) {
		  this.highlightEntireElement(child);
		} else if (position - childSize < end && position > begin) {
		  this.highlightRangeRecursive(child, begin, end);
		}
		position -= childSize;
	  }
	} else if (element.nodeType === Node.TEXT_NODE) {
	  if (position > begin) {
		begin = position;
	  }
	  if (position + size < end) {
		end = position + size;
	  }
	  let spanNode = insert_span_into_text(element, begin - position, end - position);
	  this.highlightEntireElement(spanNode);
	}
  }
  highlightRange(begin, end) {
	this.highlightRangeRecursive(this.ancestor, begin, end);
  }
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
	if (node.childNodes.length >= offset)
	{
	  return [
	    node.offsetLeft + node.offsetWidth,
		node.offsetTop + node.offsetHeight
	  ];
	} else {
	  correctChild = node.childNodes[offset];
	  return [
	    correctChild.offsetLeft,
	    correctChild.offsetTop
	  ];
	}
  } else if (node.nodeType === Node.TEXT_NODE) {
	let parentNode = node;
	let index = [];
    while (parentNode.nodeType !== Node.ELEMENT_NODE || window.getComputedStyle(parentNode).display === 'inline') {
	  let oldParent = parentNode;
  	  parentNode = parentNode.parentNode;
	  for (var i = 0; i < parentNode.childNodes.length; i++) {
		if (parentNode.childNodes[i] === oldParent) {
		  index.push(i);
		}
	  }
    }
	let duplicateNode = parentNode.cloneNode(true);
	let duplicateChild = duplicateNode;
	for (var i = index.length - 1; i >= 0; i--) {
	  duplicateChild = duplicateChild.childNodes[index[i]];
	}
	let spanNode = insert_span_into_text(duplicateChild, offset, offset + 1);
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

function generate_content(props) {
  return (<div id='ussc-highlight-content'>{props.children}</div>);
}

export class ContentWrapper extends Component {
  constructor(props) {
	super(props);
	this.state = {content: generate_content(props)};
	this.highlightSelection = this.highlightSelection.bind(this);
    this.selectHandler = this.selectHandler.bind(this);
  }
  getSelectionInfo() {
	let result = {};
	let selection = document.getSelection();
	let highlightContent = document.getElementById('ussc-highlight-content');
	if (
	  highlightContent !== null &&
	  highlightContent.contains(selection.anchorNode) &&
	  highlightContent.contains(selection.focusNode) &&
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
  getHighlightCollection() {
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
	return highlightCollection;
  }
  applyHighlights() {
	let highlightCollection = this.getHighlightCollection();
	let domDiv = document.createElement('div');
	domDiv.innerHTML = this.originalContent;
	let context = new HighlightContext(domDiv);
	for (var i = 0; i < highlightCollection.data.length; i++) {
	  let highlightItem = highlightCollection.data[i];
	  context.highlightRange(highlightItem.first, highlightItem.last);
	}
	this.setState({content: <div id='ussc-highlight-content' dangerouslySetInnerHTML={{__html: domDiv.innerHTML}} />});
  }
  highlightSelection() {
	let selectionInfo = this.getSelectionInfo();
	if (selectionInfo.selectionExists) {
	  let highlightCollection = this.getHighlightCollection();
	  let highlightContent = document.getElementById('ussc-highlight-content');
	  let context = new HighlightContext(highlightContent);
	  let firstAddr = context.regularizedTextAddress(selectionInfo.first.node, selectionInfo.first.offset);
	  let lastAddr = context.regularizedTextAddress(selectionInfo.last.node, selectionInfo.last.offset);
	  let highlightObject = {
		id: highlightCollection.nextId,
	    first: firstAddr,
	    last: lastAddr
	  };
	  highlightCollection.data.push(highlightObject);
	  highlightCollection.nextId++;
	  let highlightQueryObject = {
	    type: 'ussc-highlights',
	    path: this.props.path
	  };
	  localStorage.setItem(JSON.stringify(highlightQueryObject), JSON.stringify(highlightCollection));
	  this.updateContent();
	}
  }
  selectHandler() {
    let selectionInfo = this.getSelectionInfo();
	let selectMenu = document.getElementById('ussc-select-menu');
	/* If something is selected and the select menu exists, show the selection menu. Otherwise, hide the selection menu. */
	if (selectMenu) {
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
  }
  updateContent() {
	this.originalContent = document.getElementById('ussc-highlight-content').innerHTML;
	this.applyHighlights();
  }
  componentDidMount() {
	this.updateContent();
  }
  componentWillReceiveProps(props) {
	this.setState({content: generate_content(props)});
  }
  componentDidUpdate(props, state) {
	if (this.props !== props) {
	  this.updateContent();
	}
  }
  render() {
	document.addEventListener('selectionchange', this.selectHandler);
    return (
	  <div className="usa-section">
	    <ul id='ussc-select-menu' className='usa-nav-submenu' style={{display:'none'}}>
		  <li><a href='#' className='usa-nav-link' onClick={this.highlightSelection}>Highlight</a></li>
		</ul>
		{this.state.content}
	  </div>
	);
  }
}