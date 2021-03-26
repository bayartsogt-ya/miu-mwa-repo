# MWA Homework 02 - NodeJS 01
## Written Exercises
1. Explain why do we want sometimes to use `setImmediate` instead of using `setTimeout`? 
    
    **`[Answer]`** `setImmediate` goes to "Check" queue. So after no checking left, it will be executed while `setTimeout` goes to `Timer` so most cases it can be priority low.

    So if you have low resource execution you can directly send to "Check" using `setImmediate`. Instead, you can use setTimeout where you should get through I/O which takes most of the time.

2. Explain the difference between `process.nextTick` and `setImmediate`?
    
    **`[Answer]`** `process.nextTick` has higher priority and will be executed before all task and event queues *while* `setImmediate` will be handled inside event queue so it has lower priority than `process.Tick`
3. Name 10 core modules that Node provides by default.
    
    **`[Answer]`** 
    1. assert
    1. buffer
    1. child_process
    1. console
    1. cluster
    1. crypto
    1. dgram
    1. dns
    1. events
    1. fs
    1. http
    1. http2
    1. https
    1. net
    1. os
    1. path
    1. perf_hooks
    1. process
    1. querystring
    1. readline
    1. repl
    1. stream
    1. string_decoder
    1. timers
    1. tls
    1. tty
    1. url
    1. util
    1. v8
    1. vm
    1. wasi
    1. worker
    1. zlib

## Exercise 02
Complete the necessary Node code to make `pluck(value)` method work asynchronously, pluck will return a new array after removing the value.  
```javascript
// your Node code here...
Array.prototype.pluck = function(el) {
    var newArray = [];
    for (let i = 0; i < this.length; i++) {
        if (this[i] != el) {
            newArray.push(this[i]);
        }
    }
    
    const promise = new Promise((resolve, reject) => {
        resolve(newArray);
    })
    promise.then(console.log);
};


console.log('start');
[1,2,3,4,5,6,7,8].pluck(3);
[1,2,3,4,5,6,7,8].pluck(6);
console.log('end');

// Test your code in Node.JS CLI, Output:
// start
// end
// [1,2,4,5,6,7,8]
// [1,2,3,4,5,7,8]
```
**Practice:** Try to solve the exercise in many ways, especially using the `Promise` object.
