# gulp-batch-replace
> A [gulp-replace](https://github.com/lazd/gulp-replace) fork for batch replacing files.


##Installation

	npm install gulp-batch-replace

## Usage

	var replaceThis = [
		[ 'original', 'replacement' ],
		[ 'original1', 'replacement1' ],
		[ 'original2', 'replacement2' ]
	];
	
	var replace = require('gulp-batch-replace');
	
	gulp.task('example', function(){
		gulp.src('foo.txt')
			.pipe(replace(replaceThis))
			.pipe(gulp.dest('bar/'));
	});


## API

gulp-batch-replace can be called with a string or regex.

### replace(array)

#### array

Should contain subarrays, where the first value is the search parameter (string or regexp) and the second value is the replacement value (string).

You can also mix search parameter types, for example:

	var replaceMe = [
		[ 'original', 'replacement' ],
		[ /regexp/g, 'replacement' ],
		...
	];
