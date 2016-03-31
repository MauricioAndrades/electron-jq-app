function txForEach(obj) {
  tx(obj)
	.forEach(function(x) {

	});
}

var arr = [];

// async.series({
//   txForEach: function(obj, callback) {
//     tx(obj)
//       .forEach(function(x) {
//         if (this.node) {
//           nullobj = new Object(null);
//           nullobj[this.node] = {
//             path: this.path,
//             node: this.node
//           };
//         }
//         callback(nullobj);
//       });
//   }
// }, callback);

function stich(obj) {
  console.log(obj);
  arr.push(obj);
}

async.map(['file1','file2','file3'], fs.stat, function(err, results){
	// results is now an array of stats for each file
});

async.filter(['file1','file2','file3'], function(filePath, callback) {
  fs.access(filePath, function(err) {
	callback(null, !err);
  });
}, function(err, results){
	// results now equals an array of the existing files
});
