var lunr = require('lunr');
var fs = require('fs');
var data = require('./src/data/gl.json');

var idx = lunr(function () {
  this.ref('id')
  this.field('content')
  
    data.forEach(function (gl) {
      this.add(gl);
    }, this);
});

fs.writeFile('./src/data/gl_index.json', JSON.stringify(idx), function (err) {
  if (err) throw err;
  console.log('done');
});