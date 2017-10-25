onfetch = function(event) {
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
};