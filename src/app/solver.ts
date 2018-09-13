import { Point } from "./point";
import { isType } from "@angular/core/src/type";

export class Solver {
    grid:Array<Array<Array<Point>>>;
    assembled:Array<Point>;
    constructor(grid:Array<Array<Array<Point>>>){
        this.grid = grid;
        this.assembled = this.assemble(grid);
    }
    
    solve(){
        let assembled = this.assembled;
        var comparisons = 0;
        var p = 0;
        var backtrack = false;
        assembled = this.reviewAssemble(assembled);
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
   

    findPossible(){
        for (let gridCategory = 0; gridCategory < 3; gridCategory++){ //each method of organization is looped through 0, 1, 2
            for (let xys = 0; xys < 9; xys++){ //each grouping, a column row, or sector, is looped through. 0-8
                let potentialCounter = [0, 0, 0, 0, 0, 0, 0, 0, 0]; //each signifying how many places within a grouping they can go
                for (let xysIndex = 0; xysIndex < 9; xysIndex++){  //looping through points 
                    let point:Point = this.grid[gridCategory][xys][xysIndex];
                    if (point.mutable == false){

                    } else {
                        for (let possible_value = 1; possible_value < 10; possible_value++){ //looping through possible values
                            if (this.isValidInput(point, possible_value)){
                                potentialCounter[possible_value - 1]++;
                            }
                        }
                    }
                }
                for (let possible_value_index = 0; possible_value_index < 9; possible_value_index++){
                    if (potentialCounter[possible_value_index] == 1){
                        for (let xysIndex = 0; xysIndex < 9; xysIndex++){
                            let point:Point = this.grid[gridCategory][xys][xysIndex];
                            if (this.isValidInput(point, possible_value_index + 1) && point.mutable == true){
                                point.value = possible_value_index + 1;
                                point.mutable = false;
                            }
                        }
                    }
                }
            }
        }
    }

    hint(){
        for (let gridCategory = 0; gridCategory < 3; gridCategory++){ //each method of organization is looped through 0, 1, 2
            for (let xys = 0; xys < 9; xys++){ //each grouping, a column row, or sector, is looped through. 0-8
                let potentialCounter = [0, 0, 0, 0, 0, 0, 0, 0, 0]; //each signifying how many places within a grouping they can go
                for (let xysIndex = 0; xysIndex < 9; xysIndex++){  //looping through points 
                    let point:Point = this.grid[gridCategory][xys][xysIndex];
                    if (point.mutable == false){

                    } else {
                        for (let possible_value = 1; possible_value < 10; possible_value++){ //looping through possible values
                            if (this.isValidInput(point, possible_value)){
                                potentialCounter[possible_value - 1]++;
                            }
                        }
                    }
                }
                for (let possible_value_index = 0; possible_value_index < 9; possible_value_index++){
                    if (potentialCounter[possible_value_index] == 1){
                        for (let xysIndex = 0; xysIndex < 9; xysIndex++){
                            let point:Point = this.grid[gridCategory][xys][xysIndex];
                            if (this.isValidInput(point, possible_value_index + 1) && point.mutable == true){
                                point.value = possible_value_index + 1;
                                point.mutable = false;
                                point.clue = true;
                            }
                        }
                    }
                }
            }
        }
    }

    isValidInput(point, assignment){
        for (let p = 0; p < 3; p++){
          for (let scan in this.grid[p][point.properties[p]]){
            if (assignment == this.grid[p][point.properties[p]][scan].value){
              return false;
            }
          }
        }
        return true;
    }
    
    assemble(grid:Array<Array<Array<Point>>>){
        console.log("assembled");
        let assembled = new Array<Point>();
        for(let y = 0; y < 9; y++){
            for (let x = 0; x < 9; x++){
                assembled.push(this.grid[1][y][x]);
            }
        }
        return assembled;
    }
    reviewAssemble(grid:Array<Point>){
        for (let i = 0; i < grid.length; i++){
                if (grid[i].value == null){
                    grid[i].mutable = true;
                } else {
                    grid[i].mutable = false;
                    grid[i].original = true;
                }
            }
        return grid;
    }

 }
 
