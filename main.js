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
				// name: Leanne Graham
			}
		});
	});
}
getUserWithBluebird(1)
// callback for then receives whatever was passed into the
// resolve function of the promise
.then(function(usernameData) {
	console.log('got username with bluebird:', usernameData);
	// logs: got username with bluebird: Leanne Graham
	return usernameData + ' is the name of a user!!!! SICK!';
})
.then(function(newUsernameData) {
	console.log('check out the new data', newUsernameData);
	// logs: check out the new data Leanne Graham is the name of a user!!!! SICK!

})
.catch(function (error) {
	console.log('error getting user with bluebird', error);
})
.finally(function () {
	console.log('this gets run no matter what, error or not');
	// logs: this gets run no matter what, error or not
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




var promiseFuncAddFive = function promiseFuncAddFive (arr) {
	return new Promise (function (resolve, reject) {
		var newArr = arr.map(function (el){
			return el + 5;
		});
		resolve(newArr);
	});
}

var eachFunc = function eachFunc(thing) {
	var o = {};
	thing.forEach(function (el) {
		o[el] = true;
	});
	return o;
}

promiseFuncAddFive([1,2,3,4,5])
.then(function(data) {
	console.log("here is the data from the mapped function:", data);
	return eachFunc(data);
	// we can use the function defined above to make chained then blocks nice and tidy
})
.then(function(obj) {
	console.log("obj created in previous then:", obj);
})
.catch(function(error) {
	console.log('oops error', error);
})








