import { Component, OnInit } from '@angular/core';
import { Point } from '../point';
import { Solver } from '../solver';
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  gridByX:Array<Array<Point>> = new Array<Array<Point>>(9);
  gridByY:Array<Array<Point>> = new Array<Array<Point>>(9);
  gridByS:Array<Array<Point>> = new Array<Array<Point>>(9);
  grid:Array<Array<Array<Point>>> = [this.gridByX, this.gridByY, this.gridByS];

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
            this.grid[p][point.properties[p]] = new Array<Point>();
            this.grid[p][point.properties[p]].push(point);
          } else {
            this.grid[p][point.properties[p]].push(point);
          }
        }
        counter ++;
      }
    }
  }

  updateList(point:Point){
    let range = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    console.log(point.value);
    console.log(range.indexOf(point.value));
    if (range.indexOf(point.value) == -1 || this.isValidInput(point, point.value) == false){
      point.value = "null";
      point.mutable = true;
      point.original = false;
      point.possibles = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    } else {
      point.mutable = false;
      point.original = true;
    }
    this.grid[0][point.properties[0]].push(point);
    this.grid[1][point.properties[1]].push(point);
  }

  solve(){
    let solver = new Solver(this.grid);
    solver.solve();
  }

  hint(){
    let solver = new Solver(this.grid);
    solver.hint();
  }

  isValidInput(point, assignment){
    for (let p = 0; p < 3; p++){
      for (let scan in this.grid[p][point.properties[p]]){
        if (assignment == this.grid[p][point.properties[p]][scan].value && this.grid[p][point.properties[p]][scan] != point){
          return false;
        }
      }
    }
    return true;
  }
}
