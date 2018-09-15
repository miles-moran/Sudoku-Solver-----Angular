import { Point } from "./point";
import { isType } from "@angular/core/src/type";
import { Grouping } from "./grouping";

export class Solver {
    grid:Array<Array<Grouping>>;
    assembled:Array<Point>;
    constructor(grid:Array<Array<Grouping>>){
        this.grid = grid;
        this.assembled = this.assemble(grid);
    }
    
    solve(){
        let assembled = this.assembled;
        var comparisons = 0;
        var p = 0;
        var backtrack = false;
        assembled = this.assemble(this.grid);
        while (p < assembled.length){
            let point = assembled[p];
            console.log(p + " - " + point.mutable + " - " + point.value);
            if (point.mutable == true){
                if (point.value == null){
                    point.value = 0;
                }   
                var new_assign = false;
                for (let assignment = point.value + 1; assignment < 10; assignment++){
                    if (this.isValidInput(point, assignment)){
                        point.value = assignment;
                        new_assign = true;
                        break;
                    } 
                }
                if (new_assign){
                    p++;
                    backtrack = false;
                } else {
                    if (p > 0){
                        point.value = 0;
                        p--;
                        backtrack = true;
                    } else {
                        console.log("No Solution");
                        break;
                    }
                    //console.log("backtrack@" + p + " - " + point.mutable);
                }
            } else {
                if (backtrack){
                    if (p > 0){
                        p--;
                    } else {
                        console.log("No Solution");
                        break;
                    }
                    //console.log("backtrack@" + p + " - " + point.mutable);
                } else {
                    p++;
                }
            }
            comparisons++;
        }
        console.log("Comparisons: " + comparisons);
    }
    
    hint(){
        console.log(this.grid[0][0].points[0].possibles);
        for (let gridCategory = 0; gridCategory < 3; gridCategory++){ //each method of organization is looped through 0, 1, 2
            for (let xys = 0; xys < 9; xys++){ //each grouping, a column row, or sector, is looped through. 0-8
                for (let xysIndex = 0; xysIndex < 9; xysIndex++){  //looping through points 
                    let ledger = this.grid[gridCategory][xysIndex].ledger;
                    //TYPE ONE - ONE POSSIBLE LOCATION
                    for (let assignment_index = 0; assignment_index < ledger.length; assignment_index++){
                        if (ledger[assignment_index].length == 1){
                            console.log("(1) NUMBER HAS ONE POSSIBLE LOCATION")
                            ledger[assignment_index][0].value = assignment_index + 1;
                            ledger[assignment_index][0].mutable = false;
                            ledger[assignment_index] = [];
                            return;
                        }
                    }
                    //TYPE TWO - LOCATION HAS ONE POSSIBLE NUMBER
                    let point:Point = this.grid[gridCategory][xys].points[xysIndex];
                    if (point.mutable == false){

                    } else {
                        if (point.possibles.length == 1){
                            console.log("(2) POINT HAS ONE POSSIBLE NUMBER")
                            point.value = point.possibles[0];
                            point.mutable = false;
                            point.possibles = [];
                            return;
                        }
                    }
                }
            }
        }
    }

    isValidInput(point, assignment){
        for (let p = 0; p < 3; p++){
          for (let scan in this.grid[p][point.properties[p]].points){
            if (assignment == this.grid[p][point.properties[p]].points[scan].value){
              return false;
            }
          }
        }
        return true;
    }
    
    assemble(grid:Array<Array<Grouping>>){
        console.log("assembled");
        let assembled = new Array<Point>();
        for(let y = 0; y < 9; y++){
            for (let x = 0; x < 9; x++){
                if (this.grid[1][y].points[x].value == null){
                    this.grid[1][y].points[x].mutable = true;
                } else {
                    this.grid[1][y].points[x].mutable = false;
                    this.grid[1][y].points[x].original = true;
                }
                assembled.push(this.grid[1][y].points[x]);
            }
        }
        return assembled;
    }
 }
 
