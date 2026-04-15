interface PaintOptions {
  shape: string;
  xPos?: number;
  yPos?: number;
}

// CREATE OBJECT INTERFACE
interface perform {
  name: string;
  set: string[];
  nationality: () => string;
}

// OBJECT INSTANCE
const obj: perform = {
  name: "sarah",
  set: ["ruler"],
  nationality() {
    return "name";
  },
};

// console.log(obj.nationality())
function paintOptions({ shape, yPos, xPos }: PaintOptions) {
  console.log(shape);
  console.log(xPos);
  console.log(yPos);
}
// paintOptions({ shape: "shape" });
// paintOptions({ shape: "shape", xPos: 10 });
// paintOptions({ shape: "shape", yPos: 20 });
// paintOptions({ shape: "shape", yPos: 5, xPos: 15 });

// function paintOptionsSecond(options: PaintOptions) {
//   console.log(options.xPos);
//   console.log(options.yPos);
// }

interface Person {
  name: string;
  age: number;
}

interface ReadonlyPerson {
  readonly name: string;
  readonly age: number;
  readonly prop?: { count: number };
  readonly resident?: { name: string; age: number };
}

let writablePerson: ReadonlyPerson = {
  name: "Person McPersonface",
    age: 42,
    resident: {
        name: "sarah",
        age: 20
  }
};

// works
let readonlyPerson: ReadonlyPerson = writablePerson;
console.log(readonlyPerson.age); // prints '42'
readonlyPerson.resident!.age++;
readonlyPerson.resident!.name = "tobi";
console.log(readonlyPerson.resident!.age); // prints '43'
console.log(readonlyPerson.resident!.name); // prints '43'

// console.log([2,8,0,9].slice())

// let x: readonly number[] = [1, 2];
// // x = [1, 2]
// let y: number[] = [67, 89];
// x = y;
// console.log(x)

// let x: readonly string[] = [];
// let y: string[] = [];

// x = y;
// y = x;

// GENERIC
function identity<Type>(arg: Type): Type {
    return arg;
}

console.log(identity<string>("oluwatobi"));

let myIdentity: <Input>(arg: Input) => Input = identity;

let mIdentity: { <Type>(arg: Type): Type } = identity;

// Generic Class
// class GenericNumber<NumberType> {
//     zeroValue: NumberType;
//     add: (x: NumberType, y: NumberType) => NumberType;
// }

// let myGenericNumber = new GenericNumber<number>;
// myGenericNumber.zeroValue = 0;
// myGenericNumber.add = function (x, y) {
//   return x + y;
// };

// interface feature<Type> {
//     album: Type
// }

// let artist: feature<string> = {
//     album: "Baba Ara"
// }

// console.log({"ARTIST": artist})

interface LengthWise {
    length: number;
}

function logggingIdentity<Type extends LengthWise>(arg: Type) {
    console.log(arg.length);
    return arg;
}

interface facStructure {
    name: string;
    age: number;
}
// CREATING FACTORY -- a function that create and return object
function factory(name: string, age: number): facStructure{
    return { name, age };
}

console.log(factory("sarah", 56));

function create<Type>(c: { new(): Type }): Type {
    return new c;
}

// VARIANCE ANNOTATIONS
// Co-variance because it produces or return something
interface Producer<T> {
    make(): T;
}

// Contravariance because it consumes something
interface Consumer<T> {
    consume: (arg: T) => void;
}

type point = { x: number, y: number };
type p = keyof point;


type locateFunc = (coordinate: number, point: number, person: string) => { x: number, y: number, p: string };
let finder: locateFunc = (coord, point, person) => {
  let coordx: number = coord * 2;
  let pointx: number = coordx * point;

  return {x:coordx, y:pointx, p:person}

  // NOTE: IN TS, Object return types are strict about property names, not just values.
//   return { x: coord, y: point, p: person };
}