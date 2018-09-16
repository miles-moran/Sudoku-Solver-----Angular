import { Point } from "./point";

export class Grouping {
    points:Array<Point> = new Array<Point>();
    ledger:Array<Array<Point>> = new Array<Array<Point>>();

    constructor() {
        this.ledger = [];
    }

}
