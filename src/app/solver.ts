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
        var p = 0;
        var backtrack = false;
        while (p < assembled.length){
            let point = assembled[p];
            console.log(p + " - " + point.mutable);
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
                    point.value = 0;
                    p--;
                    backtrack = true;
                    console.log("backtrack@" + p + " - " + point.mutable);
                }
            } else {
                if (backtrack){
                    if (p > 0){
                        p = p - 1;
                    } else {
                    
                    }
                    console.log("backtrack@" + p + " - " + point.mutable);
                } else {
                    p++;
                }
            }
        }
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
                    if (point.value == null){
                        point.value = 0;
                    }
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
        let assembled = new Array<Point>();
        for(let y = 0; y < 9; y++){
            for (let x = 0; x < 9; x++){
                assembled.push(grid[1][y][x]);
            }
        }
        return assembled;
    }

 }
 
