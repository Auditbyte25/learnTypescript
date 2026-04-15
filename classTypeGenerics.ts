// @strict: false
class BeeKeeper {
  hasMask: boolean = true;
}

class Region {
  continent: string = "America";
}

class ZooKeeper extends Region {
  nametag: string = "Mikle";
}

class Animals {
  numLegs: number = 4;
}

class Bee extends Animals {
  numLegs = 6;
  keeper: BeeKeeper = new BeeKeeper();
}

class Lion extends Animals {
  keeper: ZooKeeper = new ZooKeeper();
}

function createInstance<A extends Animals>(c: new () => A): A {
  return new c();
}

createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;
console.log(createInstance(Lion).keeper);
