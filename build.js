var  elasticlunr = require('./node_modules/elasticlunr/release/elasticlunr.js');
var fs = require('fs');

var idx = elasticlunr(function () {
this.setRef('id');

this.addField('content');
});

fs.readFile('./src/data/gl.json', function (err, data) {
if (err) throw err;

var raw = JSON.parse(data);
console.log(raw.leingth);
var guidelines = raw.map(function (g) {
return {
  id: g.id,
  content: g.content,
};
});

guidelines.forEach(function (gl) {
idx.addDoc(gl);
});

fs.writeFile('./src/data/gl_index.json', JSON.stringify(idx), function (err) {
if (err) throw err;
console.log('done');
});
});