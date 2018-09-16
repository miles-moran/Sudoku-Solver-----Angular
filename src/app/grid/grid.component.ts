import { Component, OnInit } from '@angular/core';
import { Point } from '../point';
import { Solver } from '../solver';
import { Grouping } from '../grouping';
import { isType } from '@angular/core/src/type';
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  gridByX:Array<Grouping> = new Array<Grouping>(9);
  gridByY:Array<Grouping> = new Array<Grouping>(9);
  gridByS:Array<Grouping> = new Array<Grouping>(9);
  grid:Array<Array<Grouping>> = [this.gridByX, this.gridByY, this.gridByS];

  constructor() {
    this.populateGrid();
  }

  ngOnInit() {}

  populateGrid(){
    let counter = 0;
    for (let y = 0; y < 9; y++){
      for (let x = 0; x < 9; x++){
        let point = new Point(counter, x, y);
        for (let p = 0; p < 3; p++){
          if (typeof this.grid[p][point.properties[p]] === 'undefined'){
            this.grid[p][point.properties[p]] = new Grouping();
            this.grid[p][point.properties[p]].points.push(point);
          } else {
            this.grid[p][point.properties[p]].points.push(point);
          }
        }
        counter ++;
      }
    }
    this.updatePossibles();
  }

  updateList(point:Point){
    let range = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    if (range.indexOf(point.value) == -1 || this.isValidInput(point, point.value) == false){
      point.value = null;
      point.mutable = true;
      point.original = false;
      point.possibles = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    } else {
      point.mutable = false;
      point.original = true;
    }
    this.grid[0][point.properties[0]].points.push(point);
    this.grid[1][point.properties[1]].points.push(point);
    this.updatePossibles();
    //console.log(this.grid[2][0].ledger[0]);
  }

  solve(){
    let solver = new Solver(this.grid);
    solver.solve();
    this.updatePossibles();
  }

  hint(){
    let solver = new Solver(this.grid);
    solver.hint();
    this.updatePossibles();
  }

  back(){
    for (let y = 0; y < 9; y++){
      for (let x = 0; x < 9; x++){
        if (this.grid[1][y].points[x].original == false){
          this.grid[1][y].points[x].value = null;
        }
      }
    }
    this.updatePossibles();
  }

  isValidInput(point, assignment){
    for (let p = 0; p < 3; p++){
      for (let scan in this.grid[p][point.properties[p]].points){
        if (assignment == this.grid[p][point.properties[p]].points[scan].value && this.grid[p][point.properties[p]].points[scan] != point){
          return false;
        }
      }
    }
    return true;
  }

  updatePossibles(){ //WHEN WE PUSH, WE NEED TO INJECT AT THE RIGHT LOCATION. PUSHING MESSES STUFF UP
    for (let gridCategory = 0; gridCategory < 3; gridCategory++){ 
        for (let xys = 0; xys < 9; xys++){ 
          let grouping:Grouping = this.grid[gridCategory][xys];
            let ledger = grouping.ledger;
            for (let xysIndex = 0; xysIndex < 9; xysIndex++){ 
                let point:Point = this.grid[gridCategory][xys].points[xysIndex];
                if (point.mutable == false){
                  point.possibles = [];
                  ledger[point.value - 1] = [];
                  for (let possible_value = 1; possible_value < 10; possible_value++){
                    if (typeof ledger[possible_value - 1] !== 'undefined' && ledger[possible_value - 1].indexOf(point) != -1){
                      ledger[possible_value - 1].splice(ledger[possible_value - 1].indexOf(point), 1);
                    }
                  }
                } else {
                    for (let possible_value = 1; possible_value < 10; possible_value++){ //looping through possible values
                        if (this.isValidInput(point, possible_value)){
                          if (point.possibles.indexOf(possible_value) == -1){
                            point.possibles.push(possible_value);
                          }
                          if (typeof ledger[possible_value - 1] === 'undefined'){
                            ledger[possible_value - 1] = new Array<Point>();
                          } else {
                            if (ledger[possible_value - 1].indexOf(point) == -1){
                              let taken:boolean = false;
                              for (let scan = 0; scan < grouping.points.length; scan++){
                                if (grouping.points[scan].value == possible_value){
                                  taken = true;
                                  break;
                                }
                              }
                              if (taken == false){
                                ledger[possible_value - 1].push(point);
                              }
                            }
                          }
                        } else {
                          if (point.possibles.indexOf(possible_value) != -1){
                            point.possibles.splice(point.possibles.indexOf(possible_value), 1);
                          } 
                          if (typeof ledger[possible_value - 1] !== 'undefined' && ledger[possible_value - 1].indexOf(point) != -1){
                            ledger[possible_value - 1].splice(ledger[possible_value - 1].indexOf(point), 1);
                          }
                      }
                    }
                  }
                }
              }
            }
            for (let grouping = 0; grouping < this.grid[2].length; grouping++){
              let ledger = this.grid[2][grouping].ledger;
              for (let possible_value = 1; possible_value < 10; possible_value++){
                if (typeof ledger[possible_value - 1] !== 'undefined' && ledger[possible_value - 1].length > 0){
                  let x = ledger[possible_value - 1][0].x;
                  let y = ledger[possible_value - 1][0].y;
                  for (let p = 1; p < ledger[possible_value - 1].length; p++){
                    if (ledger[possible_value - 1][p].x != x){
                      x = null;
                    }
                    if (ledger[possible_value - 1][p].y != y){
                      y = null;
                    }
                    if (x == null && y == null){
                      break
                    } else {
                      if (p == ledger[possible_value - 1].length - 1){
                        let dimension;
                        let organization;
                        if (x != null){
                          dimension = x;
                          organization = 0;
                        }
                        if (y != null){
                          dimension = y;
                          organization = 1;
                        }
                        let rowORcolumn = this.grid[organization][dimension];
                        for (let point = 0; point < 9; point++){
                          let rcPoint = rowORcolumn.points[point];
                          if (rcPoint.possibles.indexOf(possible_value) != -1 && rcPoint.sector != grouping){
                            rcPoint.possibles.splice(rcPoint.possibles.indexOf(possible_value), 1);
                          }
                          if (rowORcolumn.ledger[possible_value - 1].indexOf(rcPoint) != -1 && rcPoint.sector != grouping){
                            rowORcolumn.ledger[possible_value - 1].splice(rowORcolumn.ledger[possible_value - 1].indexOf(rcPoint), 1);
            
                            console.log("removed " + rcPoint.x + " - " + rcPoint.y);
                            console.log(rowORcolumn.ledger[possible_value -1]);
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
}

hover(point:Point){
  let possibles:any;
  possibles = point.possibles;
  document.getElementById("possibles").innerHTML = "(" + point.x + ", " + point.y + ") - "  + possibles;
}
  
focus(point:Point){
  for (let y = 0; y < 9; y++){
    for (let x = 0; x < 9; x++){
      let compare:Point = this.grid[1][y].points[x];
      if ((compare.x == point.x || compare.y == point.y || compare.sector == point.sector)){
        compare.focused = true;
      } else {
        compare.focused = false;
      }
    }
  }
}

clear(){
  for (let y = 0; y < 9; y++){
    for (let x = 0; x < 9; x++){
        this.grid[1][y].points[x].original = false
        this.grid[1][y].points[x].mutable = true;
        this.grid[1][y].points[x].value = null;
    }
  }
  this.updatePossibles();
}

sectorData(grouping:Grouping){ 
  let ledger:any = "";
  for (let a = 0; a < grouping.ledger.length; a++){
    ledger += "<div>";
    ledger += (a + 1) + " - " ;
    ledger += grouping.ledger[a];
    ledger += "</div>";
  }
  document.getElementById("sectorData").innerHTML = ledger;

}

}
