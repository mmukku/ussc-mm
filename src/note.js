import { object_type } from './locallist';

export function get_notes_summary() {
  let results = {};
  for (var i = 0; i < localStorage.length; i++) {
	let key = localStorage.key(i);
	console.log(key);
	var query;
	try {
	  query = JSON.parse(key);
	} catch (e) {
	  query = null;
	}
	if (
	  object_type(query) === 'true-object' &&
	  'type' in query &&
	  query.type === 'ussc-notes' &&
	  'path' in query &&
	  'id' in query
	) {
	  console.log(query);
	  let path = query.path;
	  if (!(path in results)) {
	    results[path] = {title: path, ids: []};
	  }
	  results[path].ids.push(query.id);
	  let data = localStorage.getItem(key);
	  try {
		let item = JSON.parse(data);
		if (object_type(item) === 'true-object' && 'title' in item) {
		  results[path].title = item.title;
		}
	  } catch (e) {
	  }
	}
  }
  return results;
}

function get_query_string(path, id) {
  return JSON.stringify({
	type: 'ussc-notes',
	path: path,
	id: parseInt(id)
  });
}

export function get_note(path, id) {
  let data = localStorage.getItem(get_query_string(path, id));
  try {
	let object = JSON.parse(data);
	if (object_type(object) === 'true-object' && 'content' in object) {
	  return object.content;
	} else {
	  return data;
	}
  } catch (e) {
	return data;
  }
}

export function set_note(path, id, content, title) {
  let query_string = get_query_string(path, id);
  let object = {content: content, title: title};
  localStorage.setItem(query_string, JSON.stringify(object));
}

export function remove_note(path, id) {
  let query_string = get_query_string(path, id);
  localStorage.removeItem(query_string);
}