export function count_bookmarks() {
	let bookmark_count = localStorage.getItem('ussc-bookmark-count');
	if (bookmark_count === null)
		bookmark_count = '0';
	return parseInt(bookmark_count);
}

export function read_bookmark(bookmark_id) {
	var bookmark_object;
	try {
		bookmark_object = JSON.parse(localStorage.getItem('ussc-bookmarks.' + bookmark_id));
	} catch (e) {
		return null;
	}
	if (!('path' in bookmark_object && 'title' in bookmark_object)) {
		return null;
	}
	return bookmark_object;
}

export function remove_bookmark(bookmark_id) {
	let bookmark_count = count_bookmarks();
	localStorage.removeItem('ussc-bookmarks.' + bookmark_id);
	for (var i = bookmark_id + 1; i < bookmark_count; i++) {
		localStorage.setItem(
			'ussc-bookmarks.' + (i - 1),
			localStorage.getItem('ussc-bookmarks.' + i)
		);
	}
	localStorage.setItem('ussc-bookmark-count', bookmark_count - 1);
}

export function add_bookmark(path, title) {
	let bookmark_count = count_bookmarks();
	localStorage.setItem('ussc-bookmarks.' + bookmark_count, JSON.stringify({path: path, title: title}));
	bookmark_count++;
	localStorage.setItem('ussc-bookmark-count', bookmark_count.toString());
}