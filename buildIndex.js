var lunr = require('lunr');
var fs = require('fs');
var gldata = require('./src/data/gl.json', function(err) {
  console.log(err);
});
var bdata = require('./src/data/appendix-b.json', function(err) {
  console.log(err);
});

fs.unlink('./src/data/gl_index.json');
var idx = lunr(function() {
  this.ref('id');
  this.field('title');
  this.field('content');

  gldata.forEach(function(gl) {
    this.add({ id: gl.id, title: gl.title, content: gl.content });
  }, this);
  bdata.forEach(function(b) {
    this.add({ id: b.id, title: b.title, content: b.content });
  }, this);
});

fs.writeFile('./src/data/gl_index.json', JSON.stringify(idx), function(err) {
  if (err) throw err;
  console.log('done');
});
