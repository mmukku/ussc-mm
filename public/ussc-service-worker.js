onfetch = function(event) {
	var path, origin;
	path = event.request.url.split('/').slice(3).join('/');
	origin = event.request.url.split('/').slice(0, 3).join('/');
	if (path.indexOf('sw_read/') === 0) {
		/* special actions to read custom data -- only read from cache -- can not be loaded from the
			internet */
		event.respondWith(
			caches.open('ussc').then(function(cache) {
				return cache.match(event.request).then(function(response) {
					if (response) {
						return response;
					} else {
						return new Response('Not found', {status: '404'});
					}
				});
			})
		);
	} else if (path.indexOf('sw_write/') === 0) {
		/* special actions to write custom data */
		event.respondWith(
			caches.open('ussc').then(function(cache) {
				parts = path.split('/');
				if (parts.length < 3) {
					return new Response('Not found', {status: '404'});
				}
				key = parts[1];
				value = parts[2];
				cache.put(origin + '/sw_read/' + key, new Response(value, {status: '200'}));
				return new Response('Success', {status: '200'});
			})
		);
	} else {
		/* respond to ordinary URLs like an ordinary cache */
		event.respondWith(
			caches.open('ussc').then(function(cache) {
				return cache.match(event.request).then(function(response) {
					if (response) {
						return response;
					} else {
						return fetch(event.request).then(function(response) {
							cache.put(event.request, response.clone());
							return response;
						});
					}
				});
			})
		);
	}
};