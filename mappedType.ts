/* Mapped Types
... When you don’t want to repeat yourself, sometimes 
a type needs to be based on another type. 

NOTE::
Mapped types build on the syntax for index signatures, 
which are used to declare the types of properties which 
have not been declared ahead of time:*/

// EXAMPLE OF SYNTAX FOR INDEX SIGNATURE
type Horse = {};
type OnlyBoolsAndHorses = {
    [index: string]: boolean | Horse;
}

const conforms: OnlyBoolsAndHorses = {
  del: true,
  rodney: false,
};

/* A mapped type is a generic type which uses a 
union of PropertyKeys (frequently created via a keyof) 
to iterate through keys to create a type: 

In this example, OptionsFlags will take all the properties 
from the type Type and change their values to be a boolean.*/
type OptionsFlagType<Type> = {
    [Property in keyof Type]: boolean;
}

type Features = {
  darkMode: () => void;
  newUserProfile: () => void;
};

type FeatureOptions = OptionsFlagType<Features>;

/* ----------------- Mapping Modifiers ---------------- */
/* There are two additional modifiers which can be applied during mapping: 
`readonly and ?` which affect mutability and optionality respectively.

 You can remove or add these modifiers by prefixing with - or +. If you 
 don’t add a prefix, then + is assumed.*/
type CreateMutable<Type> = {
    -readonly [Property in keyof Type]: Type[Property];
}

type LockedAccount = {
    readonly id: string;
    readonly name: string;
}

type UnlockedAccount = CreateMutable<LockedAccount>;

// Removes 'optional' attributes from a type's properties
type Concrete<Type> = {
    [Property in keyof Type]-?: Type[Property];
}

type MaybeUser = {
  id: string;
  name?: string;
  age?: number;
};

type Users = Concrete<MaybeUser>;

/* ------------------ Key Remapping via as --------------- */
/* In TypeScript 4.1 and onwards, you can re-map keys in 
mapped types with an as clause in a mapped type: */
type MappedTypeWithNewProperties<Type> = {
  [Properties in keyof Type as KeyType]: Type[Properties];
};

/* You can leverage features like template literal types to 
create new property names from prior ones: */
type Getters<Type> = {
    [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property];
}

interface Person {
  name: string;
  age: number;
  location: string;
}

type LazyPerson = Getters<Person>;

/* You can filter out keys by producing never via a conditional type:

...Remove the 'kind' property */
type RemoveKindField<Type> = {
    [Property in keyof Type as Exclude<Property, "kind">]: Type[Property];
}

interface Circle {
  kind: "circle";
  radius: number;
}

type KindlessCircle = RemoveKindField<Circle>;

/* You can map over arbitrary unions, not just unions of 
... string | number | symbol, but unions of any type: */
type EventConfig<Events extends { kind: string }> = {
    [E in Events as E["kind"]]: (event: E) => void;
}

type SquareEvent = { kind: "square"; x: number; y: number };
type CircleEvent = { kind: "circle"; radius: number };

type Config = EventConfig<SquareEvent | CircleEvent>;

/* ----------------- Further Exploration ---------------- */
/* Mapped types work well with other features in this type manipulation section
for example here is a mapped type using a conditional type which 
returns either a true or false depending on whether an object has 
the property pii set to the literal true: */
type ExtractPII<Type> = {
    [Property in keyof Type]: Type[Property] extends { pii: true } ? true : false;
}

type DBFields = {
  id: { format: "incrementing" };
  name: { type: string; pii: true };
};

type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>;