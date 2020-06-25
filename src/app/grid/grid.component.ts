import { Component, OnInit } from '@angular/core';

import { Node } from './node.model';
import { queue } from 'rxjs/internal/scheduler/queue';
import { from } from 'rxjs';

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
  visitingOrder: Node[] = [];
  private dx = [-1, 1, 0, 0];
  private dy = [0, 0, -1, 1];


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
    } else if (!this.grid[xCoord][yCoord].isSource && !this.grid[xCoord][yCoord].isDest){
      this.grid[xCoord][yCoord].isBlocked = true;
    }
    // console.log(xCoord, yCoord);
  }

  validCordinate(xCoord: number, yCoord: number) {
    return (xCoord >= 0 && xCoord < this.height && yCoord >= 0 && yCoord < this.width);
  }

  findPath() {
    console.log("In path function");
    let queue: [number, Node][] = [[0, this.grid[this.sourceX][this.sourceY]]];

    this.grid[this.sourceX][this.sourceY].distance = 0;

    while (queue.length > 0) {
      let front = queue.shift();
      let current = front[1], currentDistance = front[0];

      if (current.distance != currentDistance) {
        continue;
      }

      this.visitingOrder.push(current);

      for (var i = 0; i < 4; ++i) {
        let nextX = current.xCoord + this.dx[i];
        let nextY = current.yCoord + this.dy[i];
        if (!this.validCordinate(nextX, nextY)) {
          continue;
        }
        let nextNode = this.grid[nextX][nextY];
        if (nextNode.isBlocked) {
          continue;
        }
        if (nextNode.distance == -1 || currentDistance + 1 < nextNode.distance) {
          nextNode.distance = currentDistance + 1;
          queue.push([currentDistance + 1, nextNode]);
        }
      }
    }

    console.log(this.visitingOrder);
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
          distance: -1
        };
      }

    }
  }
}
