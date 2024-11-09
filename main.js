// Function

// 1. declaretion function
function sayHello(name){
    // logic code
    return `Xin chào ${name}`;// template string `` '' ""
}

const result = sayHello('ngocthach');
// console.log(result);

// 2. expression function
var sayHello2 = function(name){
    return `Chào mừng bạn ${name}`;
}

// console.log(sayHello2('ngocthach'));

// 3. arrow function
var sayHello3 = (name)=>{
    return `Chào bạn ${name}`
}

// console.log(sayHello3("ngocthach"));

var test = a => `a: ${a}`;
// console.log(test(10));

// default parameter : giá trị mặc định của tham số
var sum = (a=0,b=0) => a+b;

// console.log(sum(10,20));

// destructuring
var myArray = [1,2,3,4];

// console.log(myArray[1]); // 2

var [a,b,,d] = myArray;

// console.log(a);
// console.log(b);
// // console.log(c);
// console.log(d);
var myObject = {
    name: "ngocthach",
    age: 20,
    child: {
        name: "ngocthach2"
    }
}

// console.log(myObject.name);// ngocthach

var {name,age,child:{name: childName}} = myObject;

// console.log(name);
// console.log(age);
// console.log(childName);

function showInfo(data){
    console.log(data.name);
    console.log(data.age);
    console.log(data.child.name);
}

// showInfo(myObject)

function showInfo1({name,age,child:{name: childName}}){
    console.log(name);
    console.log(age);
    console.log(childName);
}

// showInfo1(myObject)