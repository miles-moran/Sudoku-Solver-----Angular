import { Point } from "./point";

export class Solver {
    grid:Array<Array<Array<Point>>>;
    assembled:Array<Point>;
    constructor(grid:Array<Array<Array<Point>>>){
        this.grid = grid;
        this.assembled = this.assemble(grid);
    }

    solve(){
        let assembled = this.assembled;
        let p = 0;
        let backtrack = false;
        while (p < assembled.length){
            console.log(p);
            let point = assembled[p];
            if (point.mutable == true){
                if (point.value == null){
                    point.value = 0;
                    console.log("null");
                }
                for (let assignment = point.value + 1; assignment <= 10; assignment++){
                    if (this.ifValid(point, assignment)){
                        point.value = assignment;
                        p++;
                        backtrack = false;
                        break;
                    } 
                }
                if (point.value == 10){
                    point.value = 0;
                    if (p > 1){
                        p = p - 2;
                    }
                    console.log("backtrack @ " + p);
                    backtrack = true;
                }
            } else {
                if (backtrack == false && this.ifValid(point, point.value)){
                    p++;
                } else {
                    if (p > 1){
                        p = p - 2;
                    }
                }
            }
        }
    }
    ifValid(point:Point, assignment:number){
        for (let p = 0; p < 3; p++){
            for (let scan = 0; scan < this.grid[p].length - 1; scan++){
                if (this.grid[p][point.properties[p]][scan].value == assignment && this.grid[p][point.properties[p]][scan] != point){
                    return false;
                }
            }
        }
        return true;
    }
    assemble(grid:Array<Array<Array<Point>>>){
        let assembled = new Array<Point>();
        for(let y = 0; y < 9; y++){
            for (let x = 0; x < 9; x++){
                assembled.push(grid[1][y][x]);
            }
        }
        return assembled;
    }

 }
 
