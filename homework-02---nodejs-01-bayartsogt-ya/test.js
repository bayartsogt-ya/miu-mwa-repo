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