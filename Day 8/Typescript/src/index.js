"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var message = 'hello world';
console.log(message);
var name = 'Ahmad';
var isBeginner = true;
var sentence = "My name is ".concat(name, "\nI am a begineer in Typescript");
console.log(sentence);
var n = null;
var u = undefined;
// let isNew : boolean = null;
// let myName:string = undefined;
var list1 = [1, 2, 3];
var list2 = [1, 2, 3];
var person1 = ['Ahmad', 24];
var anyType;
anyType = 20;
anyType = "abc";
var multiType;
multiType = 12;
multiType = true;
function add(num1, num2) {
    return num1 + num2;
}
function add2(num1, num2) {
    if (num2)
        return num1 + num2;
    else
        return num1;
}
function add3(num1, num2) {
    if (num2 === void 0) { num2 = 10; }
    return num1 + num2;
}
console.log(add(1, 2));
console.log(add2(5));
console.log(add3(5));
function fullName(person) {
    console.log("".concat(person.firstName, " ").concat(person.lastName));
}
function fullName2(person) {
    console.log("".concat(person.firstName, " ").concat(person.lastName));
}
var p = {
    firstName: "Ahmad",
    lastName: "Hasnain"
};
fullName(p);
fullName2(p);
var Employee = /** @class */ (function () {
    function Employee(name) {
        this.employeeName = name;
    }
    Employee.prototype.greet = function () {
        console.log("Good morning ".concat(this.employeeName));
    };
    return Employee;
}());
var emp1 = new Employee('Ahmad');
console.log(emp1.employeeName);
emp1.greet();
var Manager = /** @class */ (function (_super) {
    __extends(Manager, _super);
    function Manager(managerName) {
        return _super.call(this, managerName) || this;
    }
    Manager.prototype.delegateWork = function () {
        console.log("Manager delegating tasks");
    };
    return Manager;
}(Employee));
var m1 = new Manager('Saud');
m1.delegateWork();
m1.greet();
console.log(m1.employeeName);
