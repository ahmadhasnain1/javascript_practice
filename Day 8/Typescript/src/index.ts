export {}
let message = 'hello world';
console.log(message);

let name: string = 'Ahmad';
let isBeginner : boolean = true;
let sentence: string = `My name is ${name}
I am a begineer in Typescript`;

console.log(sentence);

let  n:null = null;
let u:undefined = undefined;

// let isNew : boolean = null;
// let myName:string = undefined;

let list1 :number[] = [1,2,3];
let list2 : Array<number> = [1,2,3];

let person1 :[string,number] = ['Ahmad', 24];

let anyType : any ;
anyType = 20;
anyType = "abc";

let multiType : number|boolean;
multiType = 12;
multiType = true;

function add (num1:number, num2:number) : number {
    return num1+num2;
}

function add2 (num1:number, num2?:number) : number {  //optional param
    if(num2)
        return num1+num2;
    else
        return num1;
}

function add3 (num1:number, num2:number = 10) : number {  //default value of optional param
        return num1+num2;
}

console.log(add(1,2));
console.log(add2(5));
console.log(add3(5)); 

interface Person {
    firstName:string,
    lastName:string
}

function fullName(person : {firstName:string, lastName:string}){  //without using interface
    console.log(`${person.firstName} ${person.lastName}`);
}

function fullName2(person : Person){  //using interface
    console.log(`${person.firstName} ${person.lastName}`);
}

let p={
    firstName: "Ahmad",
    lastName: "Hasnain"
}

fullName(p);

fullName2(p);


class Employee {   //class
    public employeeName: string  //access modifier is public

    constructor(name:string){
        this.employeeName = name;
    }

    greet() {
        console.log(`Good morning ${this.employeeName}`);
    }

}

let emp1 = new Employee('Ahmad');
console.log(emp1.employeeName);
emp1.greet();


class Manager extends Employee{   //inheritance
    constructor(managerName:string){
        super(managerName);
    }
    delegateWork(){
         console.log(`Manager delegating tasks`);
    }
}

let m1 = new Manager('Saud');
m1.delegateWork();
m1.greet();
console.log(m1.employeeName);