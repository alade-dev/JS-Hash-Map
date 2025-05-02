import HashMap from "./hashMap";

const test = new HashMap();

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

console.log(test.length()); 
console.log(test.entries());

test.set('apple', 'green');
test.set('banana', 'green');
console.log(test.get('apple')); 
console.log(test.length()); 

test.set('moon', 'silver');
console.log(test.capacity);
console.log(test.length()); 

console.log(test.has('moon')); 
console.log(test.remove('moon')); 
console.log(test.has('moon')); 
console.log(test.keys());
console.log(test.values());
console.log(test.entries());

test.clear();
console.log(test.length()); 
console.log(test.entries()); 