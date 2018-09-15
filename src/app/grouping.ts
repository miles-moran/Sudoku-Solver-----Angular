import { Point } from "./point";

export class Grouping {
    points:Array<Point> = new Array<Point>();
    ledger:Array<Array<Point>> = new Array<Array<Point>>();

    constructor() {
        this.ledger = [];
    }

    

    findPossible(){ //SAVED IN CASE
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

}
