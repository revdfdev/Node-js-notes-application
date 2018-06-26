var square = x => x * x;


var user = {
    name: 'Rehan',
    sayHi: () => {
        console.log("Hi!");
    },
    sayHiAlt() {
        console.log(arguments);
        console.log(`Hi, I am ${this.name}`);
    }
};

console.log(square(9));
user.sayHi();
user.sayHiAlt(1,2,3,4);