import { Component, OnInit, Input } from '@angular/core';

import { Node } from './node.model';
import { Dijkstra } from './dijkstra';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit{
  height = 15;
  width = 40;
  grid: Node[][];
  sourceNode: Node;
  destNode: Node;
  editMode: string;
  mouseDown = false;
  dijkstra: Dijkstra;

  getClass(node: Node) {
    if (node.isOnPath) {
      return 'on-path';
    } else if (node.isColored) {
      return 'visited';
    }
    return '';
  }

  getCellText(node: Node) {
    if (node == this.sourceNode) {
      return 'S';
    } else if (node == this.destNode) {
      return 'D';
    } else if (node.isBlocked) {
      return 'X';
    }
    return '';
  }

  onMouseDown() {
    this.mouseDown = true;
    // console.log(this.mouseDown);
  }

  onMouseUp() {
    this.mouseDown = false;
    // console.log(this.mouseDown);
  }

  onMovement(node: Node) {
    if (!this.mouseDown) {
      return ;
    }
    if (this.editMode === 'RemoveWall') {
      node.isBlocked = false;
    } else if (this.editMode === 'AddWeight') {
      return ;
    } else if (this.editMode === 'AddWall' && node != this.sourceNode && node != this.destNode){
      node.isBlocked = true;
    }
  }

  findPath() {
    this.dijkstra.findPath(this.grid, this.sourceNode, this.destNode);
  }

  ngOnInit() {
    this.grid = new Array(this.height);
    this.dijkstra = new Dijkstra;

    for (var i = 0; i < this.height; ++i) {
      this.grid[i] = new Array(this.width);

      for ( var j = 0; j < this.width; ++j) {
        this.grid[i][j] = {
          isBlocked: false,
          x: i,
          y: j,
          distance: -1,
          isColored: false,
          isOnPath: false,
          parent: null
        };
      }

    }

    this.sourceNode = this.grid[Math.floor(this.height/2)][1];
    this.destNode = this.grid[Math.floor(this.height/2)][this.width-2];
  }
}
