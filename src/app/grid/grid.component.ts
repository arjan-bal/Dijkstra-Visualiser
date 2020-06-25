import { Component, OnInit } from '@angular/core';

import { Node } from './node.model';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit{
  height: number = 15;
  width: number = 40;
  grid: Node[][];
  sourceX = 7;
  sourceY = 1;
  destX = 7;
  destY = 38;
  addWall = false;
  mouseDown = false;

  toggleMode() {
    this.addWall = !this.addWall;
    // console.log(this.addWall);
  }

  onMouseDown() {
    this.mouseDown = true;
    // console.log(this.mouseDown);
  }

  onMouseUp() {
    this.mouseDown = false;
    // console.log(this.mouseDown);
  }

  toggleWall(xCoord: number, yCoord: number) {
    if (!this.mouseDown) {
      return ;
    }
    if (!this.addWall) {
      this.grid[xCoord][yCoord].isBlocked = false;
    } else {
      this.grid[xCoord][yCoord].isBlocked = true;
    }
    // console.log(xCoord, yCoord);
  }

  findPath() {
    console.log("In path function");
  }

  ngOnInit() {
    this.grid = new Array(this.height);

    for (var i = 0; i < this.height; ++i) {
      this.grid[i] = new Array(this.width);

      for ( var j = 0; j < this.width; ++j) {
        this.grid[i][j] = {
          isBlocked: false,
          xCoord: i,
          yCoord: j,
          isSource: (i == this.sourceX && j == this.sourceY),
          isDest: (i == this.destX && j == this.destY),
        };
      }

    }
  }
}
