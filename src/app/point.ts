export class Point {

    id:number;
    x:number;
    y:number;
    sector:number;
    value:number;
    properties:number[];
    mutable:boolean;
    sector_id:number;
    possibles:number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    constructor(id:number, x:number, y:number) {
        console.log('-Point Instantiated-');
        this.id = id;
        this.x = x;
        this.y = y;
        this.sector = 3 * (y / 3 >> 0) + (x / 3 >> 0);
        this.value = 0;
        this.properties = [this.x, this.y, this.sector];
        this.mutable = true;
    }


}
