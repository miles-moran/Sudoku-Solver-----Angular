export class Point {
    id:number;
    x:number;
    y:number;
    sector:number;
    value:any;
    properties:number[];
    mutable:boolean;
    original:boolean;
    clue:boolean;
    sector_id:number;
    possibles:number[];

    constructor(id:number, x:number, y:number) {
        console.log('-Point Instantiated-');
        this.id = id;
        this.x = x;
        this.y = y;
        this.sector = 3 * (y / 3 >> 0) + (x / 3 >> 0);
        this.value = null;
        this.properties = [this.x, this.y, this.sector];
        this.mutable = true;
        this.original = false;
        this.clue = false;
        this.possibles = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    }

    toString(){
        return "(" + this.x + "," + this.y + ")";
    }
}
