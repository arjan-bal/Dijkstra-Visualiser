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
  sourceX = 3;
  sourceY = 5;
  destX = 13;
  destY = 38;

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
