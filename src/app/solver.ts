import { Point } from "./point";

export class Solver {
    grid:Array<Array<Array<Point>>>;
    assembled:Array<Point>;
    constructor(grid:Array<Array<Array<Point>>>){
        this.grid = grid;
        this.assembled = this.assemble(grid);
    }
    
    solve2(){
        let assembled = this.assembled;
        let p = 0;
        let backtrack = false;
        while (p < assembled.length){
            console.log(p);
            let point = assembled[p];
            if (point.mutable == true){
                if (point.value == null){
                    point.value = 0;
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
                if (backtrack == false){
                    p++;
                } else {
                    if (p > 0){
                        p = p - 1;
                    }
                }
            }
        }
    }

    solve(){
        this.findPossible();
        console.log(this.grid[0][0][0].possibles);
    }
    //go through every point
    //go through a number asssignment 0-9
    //go through every category of x, y, sector
    //if that category has one place where that assignment can go. WINNNER

    findPossible2(){

        let assembled = this.assembled;
        for (let p = 0; p < assembled.length - 1; p++){
            let point:Point = assembled[p];
            if (point.mutable){
                let new_possibles = new Array<number>();
                for (let proposed_assignment_index = 0; proposed_assignment_index < 9; proposed_assignment_index++){
                    if (this.isValidInput(point, point.possibles[proposed_assignment_index])){
                        new_possibles.push(point.possibles[proposed_assignment_index]);
                    }
                }
                point.possibles = new_possibles;
                if (point.possibles.length == 1){
                    console.log("only possible value case in FindPossible()")
                    point.value = point.possibles[0];
                    point.mutable = false;
                }
            } else {
                point.possibles = [];
            }

        for (let gridCategory = 0; gridCategory < 3; gridCategory++){ //each method of organization is looped through 0, 1, 2
            for (let xys = 0; xys < 9; xys++){ //each grouping, a column row, or sector, is looped through. 0-8
                let potentialCounter = [0, 0, 0, 0, 0, 0, 0, 0, 0]; //each signifying how many places within a grouping they can go
                                                                    //if we count, a total of 1 would make it mandatory to place it there
                for (let xysIndex = 0; xysIndex < 9; xysIndex++){  //looping through points 
                    let point:Point = this.grid[gridCategory][xys][xysIndex];
                    for (let possible_value = 1; possible_value < 10; possible_value++){ //looping through possible values
                        if (this.isValidInput(point, possible_value)){
                           potentialCounter[possible_value - 1]++;
                        }
                    }
                    //if (gridCategory == 2){
                    //    console.log("---");
                    //    console.log(this.grid[gridCategory][xys]);
                    //    console.log(potentialCounter);
                    //}
                }
                for (let possible_value_index = 0; possible_value_index < potentialCounter.length - 1; possible_value_index++){
                    if (potentialCounter[possible_value_index] == 1){
                        console.log("unique");
                    }
                }
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
 
