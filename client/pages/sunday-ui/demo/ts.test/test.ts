export abstract class Department {
  public name :String;
  constructor(name:string) {
    this.name = name;
  }

  abstract getName():void;
}
export class De extends Department {
  getName():void{
    console.log(this.name);
  }

  getTest():void {
    console.log(2);
  }
}

export const test1:Department = new De('nihao');
