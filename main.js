var Promise = require('bluebird');
var request = require('request');
var fs = require('fs');

// normal request with callback pattern
request('http://httpbin.org/get', function (error, response, body) {
	if (!error && response.statusCode === 200) {
		console.log('received response');
	}
});

// request = Promise.promisify(request);


// request(url)
// 	.then(function(body) {
// 		var bod = JSON.parse(body.body)
// 		console.log(bod.username)
// 	})
// 	.catch(function (error) {
// 		console.log(error)
// 	});

var url = 'http://jsonplaceholder.typicode.com/users/'

console.log('hi')
// can use this function if we have not 'promisified' request
var getUserWithBluebird = function (user) {
	return new Promise(function(resolve, reject) {
		request(url + user, function(err, res) {
			if (err) { reject(err); }
			else {
				var userData = JSON.parse(res.body)
				name = userData.name
				resolve(name)
			}
		});
	});
}
getUserWithBluebird(1)
// callback for then receives whatever was passed into the
// resolve function of the promise
.then(function(usernameData) {
	console.log('got username with bluebird:', usernameData);
	return usernameData + ' is the name of a user!!!! SICK!';
})
.then(function(newUsernameData) {
	console.log('check out the new data', newUsernameData);
})
.catch(function (error) {
	console.log('error getting user with bluebird', error);
})
.finally(function () {
	console.log('this gets run no matter what, error or not');
})

/*
Essentially, the getUser function returns a promise object, inside of which
things have happened (an api call), and then when you call that function,
you can attach .then and .catch to it. The callback in the .then block
will take whatever value was passed to resolve() in the original function.
For chaining thens, whatever is returned in the .then block will be passed
to the next .then block.
And not only can you return single values from each .then block, you can
also create and return new promises
*/

