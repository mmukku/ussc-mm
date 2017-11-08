import { add_list_item, remove_list_item, get_list, set_list } from './locallist';

function get_query_string(path) {
  return JSON.stringify({
	type: 'ussc-highlights',
	path: path
  });
}

export function add_highlight(path, first, last) {
  add_list_item(get_query_string(path), {
	first: first,
	last: last
  });
}

export function remove_highlight(path, id) {
  remove_list_item(get_query_string(path), id);
}

export function get_highlights(path) {
  return get_list(get_query_string(path));
}

export function set_highlights(path, highlights) {
  set_list(get_query_string(path), highlights);
}