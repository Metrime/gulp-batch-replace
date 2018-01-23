var es = require('event-stream');

module.exports = function(arr) {

  var doReplace = function(file, callback) {


    var isStream = file.contents && typeof file.contents.on === 'function' && typeof file.contents.pipe === 'function';
    var isBuffer = file.contents instanceof Buffer;
    var fileName = (/^win/.test(process.platform)) ? file.path.split('\\')[file.path.split('\\').length - 1] : file.path.split('/')[file.path.split('/').length - 1];


    if (isStream)
    {
      file.contents = file.contents.pipe(es.map(function(chunk,cb){
        for( var i=0, max = arr.length; i<max; i++ ){
          var search  = arr[i][0],
              replace = arr[i][1];

          var content = String( chunk );
          var search = search instanceof RegExp ? search : new RegExp(search.replace(/\\/g,'\\\\'), 'g');

          if (search.test(content)) {
            result = content.replace( search, function() {
              console.log('Replaced: ' + search.source + ' to: ' + replace + ' (' + fileName + ')');
              return replace;
            })
          } else {
            console.log('Failed: ' + search.source + ' to: ' + replace + ' in (' + fileName + ')');
          }

          chunk = new Buffer(result);
        }
        cb(null,chunk);
      }));
    }

    else if(isBuffer)

    {
      for( var i=0, max = arr.length; i<max; i++ ){
        var search  = arr[i][0],
            replace = arr[i][1];

        var content = String( file.contents );
        var search = search instanceof RegExp ? search : new RegExp(search.replace(/\\/g,'\\\\'), 'g');

        if (search.test(content)) {
            content = content.replace( search, function() {
                console.log('Replaced: ' + search.source + ' to: ' + replace + ' (' + fileName + ')');
                return replace;
            })
        } else {
            console.log('Failed: ' + search.source + ' to: ' + replace + ' in (' + fileName + ')');
        }

        file.contents = new Buffer(content);
      }
    }

    callback(null,file);
  };


  return es.map(doReplace);
};