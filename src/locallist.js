function blank_list() {
  return {
	nextId: 0,
	data: []
  };
}

export function object_type(item) {
  if (typeof item !== 'object') {
	return 'non-object';
  } else if (item === null) {
	return 'null';
  } else if (Array.isArray(item)) {
	return 'array';
  } else {
    return 'true-object';
  }
}

function validate_list(list) {
  if (object_type(list) !== 'true-object') {
	return blank_list();
  }
  if (!('nextId' in list)) {
	return blank_list();
  }
  if (typeof list.nextId !== 'number') {
	return blank_list();
  }
  if (!('data' in list)) {
	return blank_list();
  }
  if (object_type(list.data) !== 'array') {
	return blank_list();
  }
  return list;
}

export function get_list(query_string) {
  var list;
  try {
	list = JSON.parse(localStorage.getItem(query_string));
  } catch (e) {
	list = null;
  }
  return validate_list(list);
}

export function set_list(query_string, list) {
  localStorage.setItem(query_string, JSON.stringify(validate_list(list)));
}

export function remove_list_item(query_string, id) {
  let list = get_list(query_string);
  for (var i = 0; i < list.data.length; i++) {
	if ('id' in list.data[i] && list.data[i].id === id) {
	  list.data.splice(i, 1);
	  break;
	}
  }
  set_list(query_string, list);
}

export function add_list_item(query_string, object) {
  if (object_type(object) === 'true-object') {
    let list = get_list(query_string);
    object.id = list.nextId;
    list.data.push(object);
    list.nextId++;
	set_list(query_string, list);
  }
}