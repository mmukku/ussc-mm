import { get_list, set_list, remove_list_item, add_list_item } from './locallist';

export function get_bookmarks() {
  return get_list(JSON.stringify({type: 'ussc-bookmarks'}));
}

export function set_bookmarks(bookmarks) {
  set_list(JSON.stringify({type: 'ussc-bookmarks'}));
}

export function remove_bookmark(bookmark_id) {
  remove_list_item(JSON.stringify({type: 'ussc-bookmarks'}), bookmark_id);
}

export function add_bookmark(path, title) {
  add_list_item(JSON.stringify({type: 'ussc-bookmarks'}), {path: path, title: title});
}