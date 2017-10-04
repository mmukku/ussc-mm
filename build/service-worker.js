"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["/index.html","395f505316d9dd9da8503f5cda867d93"],["/static/css/main.f89d30a0.css","be43894dbad367de2d8b7f579528d73a"],["/static/js/0.ef147380.chunk.js","81dcd36e636df340ef8b8198a6834193"],["/static/js/10.5e9cea97.chunk.js","d898de67eab6158c67d7cc564c95718b"],["/static/js/11.7ad03a58.chunk.js","06633fe6ab4cb2a0efd08bea8878f2db"],["/static/js/12.108395ad.chunk.js","6420fa95e31e055324cb1177345d154b"],["/static/js/2.37807f01.chunk.js","271c1d2f8e4f254cf1a24aa6e47ebd32"],["/static/js/3.09ec7610.chunk.js","99cbf44e79001f98dab5cdd56ea82965"],["/static/js/4.d1d96f68.chunk.js","64dee94d350390c0b070e76b90df98ac"],["/static/js/5.e24fe470.chunk.js","fe94257d959af7697dd5bb1745c64950"],["/static/js/6.7032ebb8.chunk.js","b43011bd898bdbc38d779fa5731e20bf"],["/static/js/7.3b8b5cb6.chunk.js","2e886d0a17d168615f93f6c89b6ae1e7"],["/static/js/8.e1185238.chunk.js","6591f9eedd3a1992dcc3473ba5456203"],["/static/js/9.769f2a67.chunk.js","a711e30e1c6d8ef145cb3b86d108ca03"],["/static/js/main.f68fd89c.js","0229dbce37a7d872fe9ba670b320a53c"],["/static/media/2016GLMCover.9e23b5e0.jpg","9e23b5e057c9d3d699ae06ecbf93bbb5"],["/static/media/angle-arrow-down-hover.53c1cd25.png","53c1cd25fff1a79ed90714e3715cd54c"],["/static/media/angle-arrow-down-hover.a3ee995e.svg","a3ee995ea9d6a796976456b54af5d8ab"],["/static/media/angle-arrow-down-primary-hover.2c1f3745.png","2c1f37452a65db04b8820e11eb52f5f3"],["/static/media/angle-arrow-down-primary-hover.b03111e9.svg","b03111e98c11810da72da5ba38993989"],["/static/media/angle-arrow-down-primary.4cd8adaf.png","4cd8adaf9cae8026348df3f74539b3e5"],["/static/media/angle-arrow-down-primary.64f4e968.svg","64f4e9687ab10d5205dfb2a13314ddeb"],["/static/media/angle-arrow-down.c3c72a6e.svg","c3c72a6ee199232be52daa761c4a7582"],["/static/media/angle-arrow-up-primary-hover.5304e70f.svg","5304e70f45e70a9c305f181f929b4052"],["/static/media/angle-arrow-up-primary.7f380f79.svg","7f380f792390566450e98a901f3f3c22"],["/static/media/arrow-down.134ee96f.svg","134ee96f77fb18c6d879bf962912a085"],["/static/media/arrow-right.1483e055.svg","1483e05534c83b4db269d418ea27fc2d"],["/static/media/bottom-slide-1.c68400f1.png","c68400f1e5e99096642698f378a4a638"],["/static/media/bottom-slide-2.171cdcd9.png","171cdcd94b0558506a7a1a15ca3d8a55"],["/static/media/bottom-slide-3.84569cfd.png","84569cfd32b1154e43e08d3e23c0e9ad"],["/static/media/close.6db4149d.svg","6db4149d71df57ab00a0d3d486b8aa96"],["/static/media/correct8.944de30f.svg","944de30f0d6c95c2aa544f8b9cac8f27"],["/static/media/correct9.1d70e405.svg","1d70e405146ea70e69de06359952e843"],["/static/media/error.8773ca7e.svg","8773ca7e457bfc1b3de3d87df927edda"],["/static/media/external-link-alt-hover.0a737479.png","0a7374799901bcfdb245108cc51c7516"],["/static/media/external-link-alt-hover.48f4f10f.svg","48f4f10f8b2bc89625a53b23578f8711"],["/static/media/external-link-alt.18b41ab2.svg","18b41ab22f64fda9a9c1da6ca3bd8773"],["/static/media/external-link-hover.f09ec858.svg","f09ec8586b4d786847e5229617754e17"],["/static/media/external-link.bdcbd439.svg","bdcbd439a464ff3037dad45b44af345c"],["/static/media/facebook25.37c061f7.svg","37c061f74cb30ea358a1981cc34c3904"],["/static/media/gd-icon.896ed1c7.png","896ed1c79bb221db448beef0b016afa6"],["/static/media/hero.94a10c56.png","94a10c5639ee6d4c88d67d63fe7a2228"],["/static/media/icon-dot-gov.cdd13dd3.svg","cdd13dd30a04e47b6eb00eda6060a1d8"],["/static/media/icon-https.c7c1e46f.svg","c7c1e46fb55f5d11df826e0deb61c127"],["/static/media/info.f6fcba34.svg","f6fcba349ae758f6bfe3ccbf521ef8c4"],["/static/media/logo.0fd420c5.png","0fd420c58304a2ebb6638432f5c24f63"],["/static/media/merriweather-bold-webfont.3a8907c9.ttf","3a8907c945b4ea384ad0b99150847706"],["/static/media/merriweather-bold-webfont.65d5dea5.eot","65d5dea57619d14d4e012b3a25550207"],["/static/media/merriweather-bold-webfont.6d33d169.woff2","6d33d1693d8c3e674020a003b03d5aef"],["/static/media/merriweather-bold-webfont.b6b7444f.woff","b6b7444ffb6c03617a6a3c337965ce78"],["/static/media/merriweather-italic-webfont.5568fe0d.woff","5568fe0d4ab09cd47227a2baade5fac2"],["/static/media/merriweather-italic-webfont.5b09f197.eot","5b09f19714acef0663643ff49294a777"],["/static/media/merriweather-italic-webfont.9830783a.woff2","9830783aaa859c742823f3fefd60b867"],["/static/media/merriweather-italic-webfont.ad5dd583.ttf","ad5dd583afab8f453645b057029586bf"],["/static/media/merriweather-light-webfont.726e8a5e.ttf","726e8a5e407de4813fba4998cf946761"],["/static/media/merriweather-light-webfont.8e9df39c.woff2","8e9df39cafa62b65262a85908e33ec66"],["/static/media/merriweather-light-webfont.c370c7b6.woff","c370c7b61d28a26a1c8107def5d57b7d"],["/static/media/merriweather-light-webfont.f423e689.eot","f423e689e0bdaa0f7b0587785f334e56"],["/static/media/merriweather-regular-webfont.18fb7572.woff2","18fb7572812a600eeb86ecbdeb3c3064"],["/static/media/merriweather-regular-webfont.479fc84c.ttf","479fc84c654874d031d50f8e878f2139"],["/static/media/merriweather-regular-webfont.8af54a98.woff","8af54a984d2993508bf270e9204d1860"],["/static/media/merriweather-regular-webfont.a1e02af0.eot","a1e02af03345e22ea9f0c3c56cf1b932"],["/static/media/minus-alt.8816fd01.svg","8816fd01d020f9eed45e4f17ed128e15"],["/static/media/minus-alt.b9b1e818.png","b9b1e818b4b3e470c98c36154eea7168"],["/static/media/minus.5a7e9c37.svg","5a7e9c3749351ab3c46b4b239fbbf2bd"],["/static/media/plus-alt.1c26be1a.svg","1c26be1a8f4ed2eb58ab7074ccc20e83"],["/static/media/plus-alt.d92cb517.png","d92cb517b8ba5fc1eae9f469506c82de"],["/static/media/plus.eb771fb8.svg","eb771fb87ddbd32d9e5f66f0564b5abd"],["/static/media/research-data-bg.d1864527.png","d18645270b7ae6083ef3b55cdbc8d1ca"],["/static/media/rss-icon.e46800ba.png","e46800ba76d4d0446935f17d91a595df"],["/static/media/rss25.ad09b321.svg","ad09b3218da26c977631ada8a2daab96"],["/static/media/search-alt.37d9028e.svg","37d9028ee1429b8d8001f41568d35375"],["/static/media/search-alt.953243e6.png","953243e6439e0afd97d29c57ecfbc578"],["/static/media/search.06982348.svg","069823480e15b7b391de5f268e12194b"],["/static/media/sourcesanspro-bold-webfont.74f174d0.woff","74f174d071369e0df8566c8a3013e001"],["/static/media/sourcesanspro-bold-webfont.86937a00.ttf","86937a00b9e6bd153ddb2d25a296896d"],["/static/media/sourcesanspro-bold-webfont.cc7343dc.eot","cc7343dca32ce1c4de62e430c449b216"],["/static/media/sourcesanspro-bold-webfont.db089244.woff2","db08924457dfce83611a4392af58de04"],["/static/media/sourcesanspro-italic-webfont.1c766c2a.woff","1c766c2ac93653f97310ac420ef6aa84"],["/static/media/sourcesanspro-italic-webfont.95366d5c.eot","95366d5c901f8de3fbc6aef7421e0da7"],["/static/media/sourcesanspro-italic-webfont.ab48e5ed.woff2","ab48e5edfe4dc666d1aeba338fc078b8"],["/static/media/sourcesanspro-italic-webfont.c5a1649c.ttf","c5a1649c9d410b426fca73e29c4f20a5"],["/static/media/sourcesanspro-light-webfont.36b24548.eot","36b2454850951a572647d682c969937f"],["/static/media/sourcesanspro-light-webfont.3920c044.woff","3920c044810625353fedd3e074553422"],["/static/media/sourcesanspro-light-webfont.5110c10b.ttf","5110c10b6fcf515fc776cd1b62aab226"],["/static/media/sourcesanspro-light-webfont.91533bcf.woff2","91533bcffe7d49099b98dea3e7093217"],["/static/media/sourcesanspro-regular-webfont.01c34960.ttf","01c34960c01c24ac996e1348d25c54eb"],["/static/media/sourcesanspro-regular-webfont.699e5f09.woff2","699e5f09daf577ae815ddc7b920f8e24"],["/static/media/sourcesanspro-regular-webfont.d2e3cf3e.woff","d2e3cf3e91620fa02db78122b43b856f"],["/static/media/sourcesanspro-regular-webfont.d8ab7c53.eot","d8ab7c53981c7d8247c52e2caab2721a"],["/static/media/success.2eb47a3f.svg","2eb47a3ff8f1770a58340b17f745b977"],["/static/media/top-slide.e8a7cb07.png","e8a7cb071e64debe9ab4ad8a61fcba55"],["/static/media/tw-icon.902bafbd.png","902bafbd9c63f3c38853d1e8dd971c59"],["/static/media/twitter16.0168b3b6.svg","0168b3b6acafc97c978ba91010b3d455"],["/static/media/warning.4ba1d198.svg","4ba1d198d9487ee97e4cf851ed2de1f3"],["/static/media/youtube15.bededcff.svg","bededcffe4cfd671d5c63db5d04c9374"],["/static/media/yt-icon.65e96ce4.png","65e96ce4a067f7c765b7d6117be4fea7"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,a,t,c){var d=new URL(e);return c&&d.pathname.match(c)||(d.search+=(d.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),d.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],c=new URL(a,self.location),d=createCacheKey(c,hashParamName,t,/\.\w{8}\./);return[c.toString(),d]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var c=new Request(t,{credentials:"same-origin"});return fetch(c).then(function(a){if(!a.ok)throw new Error("Request for "+t+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(t,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(t){return Promise.all(t.map(function(t){if(!a.has(t.url))return e.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(a=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,"index.html"),a=urlsToCacheKeys.has(t));!a&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(t=new URL("/index.html",self.location).toString(),a=urlsToCacheKeys.has(t)),a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});