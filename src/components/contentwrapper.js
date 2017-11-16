import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import App from '../App';
import { get_note, set_note, remove_note } from '../note';
import {
  add_highlight,
  remove_highlight,
  get_highlights,
  set_highlights
} from '../highlight.js';

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
    documentFragment.appendChild(
      new Text(node.data.substring(last, node.data.length))
    );
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
      } else if (element.classList.contains('notes')) {
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
    return this.regularizedTextOffsetAddress(
      element,
      get_regularized_offset_size(element)
    );
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
    return (
      this.regularizedTextAddressForElement(element) +
      this.regularizedTextOffsetAddress(element, offset)
    );
  }
  highlightEntireElement(id, element) {
    if (this.elementIsIgnored(element)) {
      return;
    }
    if (element.nodeType === Node.ELEMENT_NODE) {
      element.className += ' highlight';
      element.className += ' highlight.' + id;
    } else if (element.nodeType === Node.TEXT_NODE) {
      let spanNode = insert_span_into_text(
        element,
        0,
        this.regularizedTextSize(element)
      );
      this.highlightEntireElement(id, spanNode);
    }
  }
  elementOfRegularizedTextAddressRecursive(element, address) {
    if (this.elementIsIgnored(element)) {
      return null;
    }
    let position = this.regularizedTextAddressForElement(element);
    let size = this.regularizedTextSize(element);
    if (element.nodeType === Node.ELEMENT_NODE) {
      position += size;
      for (var i = element.childNodes.length - 1; i >= 0; i--) {
        let child = element.childNodes[i];
        let childSize = this.regularizedTextSize(child);
        if (position >= address && position - childSize < address) {
          let result = this.elementOfRegularizedTextAddressRecursive(
            child,
            address
          );
          if (result === null) {
            return element;
          } else {
            return result;
          }
        }
        position -= childSize;
      }
      return null;
    } else {
      return null;
    }
  }
  elementOfRegularizedTextAddress(address) {
    return this.elementOfRegularizedTextAddressRecursive(
      this.ancestor,
      address
    );
  }
  highlightRangeRecursive(id, element, begin, end) {
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
        if (position < end && position - childSize > begin) {
          this.highlightEntireElement(id, child);
        } else if (position - childSize < end && position > begin) {
          this.highlightRangeRecursive(id, child, begin, end);
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
      let spanNode = insert_span_into_text(
        element,
        begin - position,
        end - position
      );
      this.highlightEntireElement(id, spanNode);
    }
  }
  highlightRange(id, begin, end) {
    this.highlightRangeRecursive(id, this.ancestor, begin, end);
  }
}

function get_non_inline_parent_and_path(node) {
  let path = [];
  while (
    (node !== null && node.nodeType !== Node.ELEMENT_NODE) ||
    window.getComputedStyle(node).display === 'inline'
  ) {
    let oldNode = node;
    node = node.parentNode;
    for (var i = 0; i < node.childNodes.length; i++) {
      if (node.childNodes[i] === oldNode) {
        path.push(i);
      }
    }
  }
  return [node, path];
}

function true_node_position(node) {
  if (
    node.tagName.toUpperCase() === 'HTML' ||
    node.tagName.toUpperCase() === 'BODY'
  ) {
    return [0, 0];
  } else {
    let parent = node.offsetParent;
    var parentPosition;
    if (parent === null) {
      parentPosition = [0, 0];
    } else {
      parentPosition = true_node_position(parent);
    }
    return [
      parentPosition[0] + node.offsetLeft,
      parentPosition[1] + node.offsetTop
    ];
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
    if (offset >= node.childNodes.length) {
      let position = true_node_position(node);
      return [position[0] + node.offsetWidth, position[1] + node.offsetHeight];
    } else if (offset === 0) {
      return true_node_position(node);
    } else {
      correctChild = node.childNodes[offset];
      if (correctChild.nodeType === Node.ELEMENT_NODE) {
        return true_node_position(correctChild);
      } else {
        return node_offset_position(correctChild, 0);
      }
    }
  } else if (node.nodeType === Node.TEXT_NODE) {
    let info = get_non_inline_parent_and_path(node);
    let parentNode = info[0];
    if (parentNode === null) {
      return [0, 0];
    }
    let path = info[1];
    let duplicateNode = parentNode.cloneNode(true);
    let duplicateChild = duplicateNode;
    for (var i = path.length - 1; i >= 0; i--) {
      duplicateChild = duplicateChild.childNodes[path[i]];
    }
    let spanNode = insert_span_into_text(duplicateChild, offset, offset + 1);
    let position = true_node_position(parentNode);
    duplicateNode.style.position = 'absolute';
    duplicateNode.style.top = position[1] + 'px';
    duplicateNode.style.left = position[0] + 'px';
    duplicateNode.style.width = parentNode.offsetWidth + 'px';
    duplicateNode.style.margin = '0px';
    duplicateNode.style.userSelect = 'none';
    duplicateNode.style['-ms-user-select'] = 'none';
    parentNode.parentNode.appendChild(duplicateNode);
    let result = true_node_position(spanNode);
    parentNode.parentNode.removeChild(duplicateNode);
    return result;
  } else {
    return [0, 0];
  }
}

function select_position(elements) {
  var position;
  position = null;
  for (var i = 0; i < elements.length; i++) {
    let newPosition = node_offset_position(elements[i], 0);
    if (position === null || newPosition[1] < position[1]) {
      position = newPosition;
    }
  }
  return position;
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

function generate_content(props) {
  return <div id="ussc-content-wrapper">{props.children}</div>;
}

function html_is_effectively_blank(html) {
  return (
    html === null ||
    html === '' ||
    html.trim().toUpperCase() === '<BR>' ||
    html.trim().toUpperCase() === '<BR />'
  );
}

function element_holds_notes(element) {
  return (
    element.nodeType === Node.ELEMENT_NODE &&
    [
      'H2',
      'H3',
      'H4',
      'LI',
      'TABLE',
      'P',
      'BLOCKQUOTE',
      'DIV',
      'SECTION',
      'IMG'
    ].indexOf(element.tagName.toUpperCase()) !== -1 &&
    !element.classList.contains('notes')
  );
}

function append_button(parent, text, className) {
  let button = document.createElement('button');
  button.innerText = text;
  button.classList.add(className);
  parent.append(button);
}

export class ContentWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { content: generate_content(props), ids: [] };
    this.highlightSelection = this.highlightSelection.bind(this);
    this.selectHandler = this.selectHandler.bind(this);
  }
  getSelectionInfo() {
    let result = {};
    let selection = document.getSelection();
    let highlightContent = document.getElementById('ussc-content-wrapper');
    if (
      highlightContent !== null &&
      highlightContent.contains(selection.anchorNode) &&
      highlightContent.contains(selection.focusNode) &&
      (selection.anchorNode !== selection.focusNode ||
        selection.anchorOffset !== selection.focusOffset)
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
  getNote(id) {
    return get_note(this.props.path, id);
  }
  setNote(id, content) {
    if (html_is_effectively_blank(content)) {
      remove_note(this.props.path, id);
    } else {
      set_note(this.props.path, id, content, this.props.title);
    }
  }
  turnOffNoteEditing(id) {
    let notesObject = document.getElementById('notes.' + id);
    notesObject.getElementsByClassName('edit_note')[0].style.display =
      'inline-block';
    notesObject.getElementsByClassName('save_note')[0].style.display = 'none';
    notesObject.getElementsByClassName('revert_note')[0].style.display = 'none';
    let textObject = notesObject.getElementsByClassName('notes_text')[0];
    let noteHTML = this.getNote(id);
    textObject.innerHTML = noteHTML;
    textObject.contentEditable = 'false';
    if (html_is_effectively_blank(noteHTML)) {
      notesObject.getElementsByClassName('notes_control')[0].style.display =
        'none';
      textObject.style.display = 'none';
    }
  }
  turnOnNoteEditing(id) {
    let notesObject = document.getElementById('notes.' + id);
    notesObject.getElementsByClassName('notes_control')[0].style.display =
      'block';
    notesObject.getElementsByClassName('edit_note')[0].style.display = 'none';
    notesObject.getElementsByClassName('save_note')[0].style.display =
      'inline-block';
    notesObject.getElementsByClassName('revert_note')[0].style.display =
      'inline-block';
    let textObject = notesObject.getElementsByClassName('notes_text')[0];
    textObject.contentEditable = 'true';
    textObject.style.display = 'block';
    if (textObject.innerHTML.length === 0) {
      textObject.innerHTML = '<br />';
    }
    textObject.focus();
    notesObject.scrollIntoView();
  }
  removeNoteClickHandler(id) {
    this.setNote(id, '');
    this.turnOffNoteEditing(id);
  }
  saveNoteClickHandler(id, event) {
    let notes_object = document.getElementById('notes.' + id);
    let text_object = notes_object.getElementsByClassName('notes_text')[0];
    let note_html = text_object.innerHTML;
    this.setNote(id, note_html);
    this.turnOffNoteEditing(id);
  }
  revertNoteClickHandler(id, event) {
    this.turnOffNoteEditing(id);
  }
  editNoteClickHandler(id, event) {
    this.turnOnNoteEditing(id);
  }
  getNextNotesObject(element) {
    let parent = element;
    while (parent !== null && !element_holds_notes(parent)) {
      parent = parent.parentNode;
    }
    if (
      parent !== null &&
      parent.nextSibling !== null &&
      parent.nextSibling.classList.contains('notes')
    ) {
      return parent.nextSibling;
    } else {
      return null;
    }
  }
  focusNotesAfterSelection() {
    let selectionInfo = this.getSelectionInfo();
    if (selectionInfo.selectionExists) {
      let notesObject = this.getNextNotesObject(selectionInfo.first.node);
      if (notesObject !== null) {
        this.turnOnNoteEditing(notesObject.id.split('.')[1]);
      }
    }
  }
  focusNotesAfterHighlight(id) {
    let highlightCollection = this.getHighlightCollection();
    let highlightObject = null;
    for (var i = 0; i < highlightCollection.data.length; i++) {
      if (highlightCollection.data[i].id == id) {
        highlightObject = highlightCollection.data[i];
      }
    }
    if (highlightObject !== null) {
      let context = new HighlightContext(
        document.getElementById('ussc-content-wrapper')
      );
      let highlightElement = context.elementOfRegularizedTextAddress(
        highlightObject.first
      );
      if (highlightElement !== null) {
        let notesObject = this.getNextNotesObject(highlightElement);
        if (notesObject !== null) {
          this.turnOnNoteEditing(notesObject.id.split('.')[1]);
        }
      }
    }
  }
  createNotesObject(id) {
    let notes_object = document.createElement('div');
    notes_object.className = 'notes';
    notes_object.id = 'notes.' + id;
    let notes_control_link = document.createElement('p');
    notes_control_link.classList.add('notes_control');
    append_button(notes_control_link, 'Remove Note', 'remove_note');
    notes_control_link.append(new Text(' '));
    append_button(notes_control_link, 'Edit Note', 'edit_note');
    notes_control_link.append(new Text(' '));
    append_button(notes_control_link, 'Save Note', 'save_note');
    notes_control_link.append(new Text(' '));
    append_button(notes_control_link, 'Revert Note', 'revert_note');
    let notes_control_text = document.createElement('p');
    notes_control_text.className = 'notes_text';
    let noteHTML = this.getNote(id);
    notes_control_text.innerHTML = noteHTML;
    notes_object.appendChild(notes_control_link);
    notes_object.appendChild(notes_control_text);
    return notes_object;
  }
  applyNotesToDomElementRecursive(element, id) {
    let new_id = id;
    if (element.nodeType === Node.ELEMENT_NODE) {
      if (element_holds_notes(element)) {
        let children_found = false;
        for (var i = element.childNodes.length - 1; i >= 0; i--) {
          let temp_new_id = this.applyNotesToDomElementRecursive(
            element.childNodes[i],
            new_id
          );
          if (temp_new_id !== null) {
            new_id = temp_new_id;
            children_found = true;
          }
        }
        if (new_id === id && children_found) {
          let notes_object = this.createNotesObject(new_id);
          if (element.parentNode !== null) {
            if (element.nextSibling === null) {
              element.parentNode.appendChild(notes_object);
            } else {
              element.parentNode.insertBefore(
                notes_object,
                element.nextSibling
              );
            }
          }
          new_id++;
        }
      }
    } else if (element.nodeType === Node.TEXT_NODE) {
      if (element.data.trim().length === 0) {
        return null;
      }
    } else {
      return null;
    }
    return new_id;
  }
  applyNotesToDomElement(domDiv) {
    this.applyNotesToDomElementRecursive(domDiv, 0);
  }
  getHighlightQueryString() {
    return JSON.stringify({
      type: 'ussc-highlights',
      path: this.props.path
    });
  }
  getHighlightCollection() {
    return get_highlights(this.props.path);
  }
  setHighlightCollection(collection) {
    set_highlights(this.props.path, collection);
  }
  applyHighlightsToDomElement(domDiv) {
    let highlightCollection = this.getHighlightCollection();
    let context = new HighlightContext(domDiv);
    let ids = [];
    for (var i = 0; i < highlightCollection.data.length; i++) {
      let highlightItem = highlightCollection.data[i];
      context.highlightRange(
        highlightItem.id,
        highlightItem.first,
        highlightItem.last
      );
      ids.push(highlightItem.id);
    }
    return ids;
  }
  rerenderLocalContent() {
    let domDiv = document.createElement('div');
    domDiv.innerHTML = this.originalContent;
    let ids = this.applyHighlightsToDomElement(domDiv);
    this.applyNotesToDomElement(domDiv);
    this.setState({
      content: (
        <div
          id="ussc-content-wrapper"
          dangerouslySetInnerHTML={{ __html: domDiv.innerHTML }}
        />
      ),
      ids: ids
    });
  }
  removeHighlight(id) {
    remove_highlight(this.props.path, id);
    this.rerenderLocalContent();
  }
  highlightSelection() {
    let selectionInfo = this.getSelectionInfo();
    if (selectionInfo.selectionExists) {
      let highlightCollection = this.getHighlightCollection();
      let highlightContent = document.getElementById('ussc-content-wrapper');
      let context = new HighlightContext(highlightContent);
      let firstAddr = context.regularizedTextAddress(
        selectionInfo.first.node,
        selectionInfo.first.offset
      );
      let lastAddr = context.regularizedTextAddress(
        selectionInfo.last.node,
        selectionInfo.last.offset
      );
      add_highlight(this.props.path, firstAddr, lastAddr);
      this.rerenderLocalContent();
    }
  }
  selectHandler() {
    let selectionInfo = this.getSelectionInfo();
    let selectMenu = document.getElementById('ussc-select-menu');
    /* If something is selected and the select menu exists, show the selection menu. Otherwise, hide the selection menu. */
    if (selectMenu) {
      if (selectionInfo.selectionExists) {
        let highlightContext = new HighlightContext(
          document.getElementById('ussc-content-wrapper')
        );
        if (
          !highlightContext.elementIsIgnored(selectionInfo.first.node) ||
          !highlightContext.elementIsIgnored(selectionInfo.last.node)
        ) {
          /* first hide the other menu if it is present */
          document.getElementById('ussc-highlight-click-menu').style.display =
            'none';
          /* show the menu above the beginning of the selection */
          selectMenu.style.display = 'block';
          selectMenu.style.position = 'absolute';
          let position = node_offset_position(
            selectionInfo.first.node,
            selectionInfo.first.offset
          );
          selectMenu.style.top = position[1] + 25 + 'px';
          selectMenu.style.left = position[0] + 'px';
        }
      } else {
        selectMenu.style.display = 'none';
      }
    }
  }
  highlightClickHandler(id) {
    let clickMenu = document.getElementById('ussc-highlight-click-menu');
    if (clickMenu) {
      let elements = document.getElementsByClassName('highlight.' + id);
      if (elements.length > 0) {
        /* in this case, show the menu; first hide the other menu if it is present */
        document.getElementById('ussc-select-menu').style.display = 'none';
        clickMenu.style.display = 'block';
        clickMenu.style.position = 'absolute';
        let position = select_position(elements);
        clickMenu.style.top = position[1] + 25 + 'px';
        clickMenu.style.left = position[0] + 'px';
        document.getElementById(
          'ussc-remove-highlight-button'
        ).onclick = (function(component, item) {
          return function() {
            component.removeHighlight(item);
            clickMenu.style.display = 'none';
          };
        })(this, id);
        document.getElementById(
          'ussc-highlight-notes-button'
        ).onclick = (function(component, item) {
          return function() {
            component.focusNotesAfterHighlight(item);
            clickMenu.style.display = 'none';
          };
        })(this, id);
      }
    }
  }
  componentDidMount() {
    this.originalContent = document.getElementById(
      'ussc-content-wrapper'
    ).innerHTML;
    this.rerenderLocalContent();
  }
  componentWillReceiveProps(props) {
    this.setState({ content: generate_content(props) });
  }
  componentDidUpdate(props, state) {
    if (this.props !== props) {
      this.originalContent = document.getElementById(
        'ussc-content-wrapper'
      ).innerHTML;
      this.rerenderLocalContent();
    }
    if (this.state !== state) {
      for (var i = 0; i < this.state.ids.length; i++) {
        let elements = document.getElementsByClassName(
          'highlight.' + this.state.ids[i]
        );
        for (var j = 0; j < elements.length; j++) {
          elements[j].onclick = (function(component, item) {
            return function() {
              component.highlightClickHandler(item);
            };
          })(this, this.state.ids[i]);
        }
      }
      let elements = document.getElementsByClassName('notes');
      for (var i = 0; i < elements.length; i++) {
        let id = parseInt(elements[i].id.split('.')[1], 10);
        elements[i].getElementsByClassName('remove_note')[0].addEventListener(
          'click',
          (function(component, item) {
            return function() {
              component.removeNoteClickHandler(item);
            };
          })(this, id)
        );
        elements[i].getElementsByClassName('save_note')[0].addEventListener(
          'click',
          (function(component, item) {
            return function() {
              component.saveNoteClickHandler(item);
            };
          })(this, id)
        );
        elements[i].getElementsByClassName('revert_note')[0].addEventListener(
          'click',
          (function(component, item) {
            return function() {
              component.revertNoteClickHandler(item);
            };
          })(this, id)
        );
        elements[i].getElementsByClassName('edit_note')[0].addEventListener(
          'click',
          (function(component, item) {
            return function() {
              component.editNoteClickHandler(item);
            };
          })(this, id)
        );
        this.turnOffNoteEditing(id);
      }
      document.getElementById('content_wrapper').addEventListener(
        'click',
        function() {
          document.getElementById('ussc-select-menu').style.display = 'none';
          document.getElementById('ussc-highlight-click-menu').style.display =
            'none';
        },
        true
      );
    }
  }
  render() {
    document.addEventListener('selectionchange', this.selectHandler);
    return (
      <div id="content_wrapper" className="usa-section">
        <ul
          id="ussc-select-menu"
          className="usa-nav-submenu"
          style={{ display: 'none' }}
        >
          <li>
            <button
              type="button"
              className="usa-nav-link"
              onClick={() => {
                this.highlightSelection();
                document.getElementById('ussc-select-menu').style.display =
                  'none';
              }}
              onBlur={() => {
                document.getElementById('ussc-select-menu').style.display =
                  'none';
              }}
            >
              Highlight
            </button>
          </li>
          <li>
            <button
              type="button"
              className="usa-nav-link"
              onClick={event => {
                this.focusNotesAfterSelection();
                document.getElementById('ussc-select-menu').style.display =
                  'none';
                event.preventDefault();
              }}
              onBlur={() => {
                document.getElementById('ussc-select-menu').style.display =
                  'none';
              }}
            >
              Notes
            </button>
          </li>
        </ul>
        <ul
          id="ussc-highlight-click-menu"
          className="usa-nav-submenu"
          style={{ display: 'none' }}
        >
          <li>
            <button
              type="button"
              id="ussc-remove-highlight-button"
              className="usa-nav-link"
              onBlur={() => {
                document.getElementById(
                  'ussc-highlight-click-menu'
                ).style.display =
                  'none';
              }}
            >
              Remove Highlight
            </button>
          </li>
          <li>
            <button
              type="button"
              id="ussc-highlight-notes-button"
              className="usa-nav-link"
              onBlur={() => {
                document.getElementById(
                  'ussc-highlight-click-menu'
                ).style.display =
                  'none';
              }}
            >
              Notes
            </button>
          </li>
        </ul>
        {this.state.content}
      </div>
    );
  }
}
