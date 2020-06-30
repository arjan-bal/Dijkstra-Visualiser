import { Component, OnInit, Input } from '@angular/core';

import { Node } from './node.model';
import { Dijkstra } from './dijkstra';
import { MazePartation } from './maze-partation';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit{
  height = 13;
  width = 45;
  grid: Node[][];
  sourceNode: Node;
  destNode: Node;
  editMode = "AddWall";
  mouseDown = false;
  dijkstra: Dijkstra;
  grid1D: Node[];
  weightSlider = 20;
  draggingSource = false;
  draggingDest = false;
  instructionOpenState = false;
  maze: MazePartation;

  getClass(node: Node) {
    if (node == this.sourceNode) {
      return 'source';
    } else if (node == this.destNode) {
      return 'dest';
    } else if (node.isOnPath) {
      return 'on-path';
    } else if (node.isColored) {
      return 'visited';
    } else if (node.isBlocked) {
      return 'blocked';
    }
    return '';
  }

  getCellText(node: Node) {
    if (node == this.sourceNode) {
      return 'S';
    } else if (node == this.destNode) {
      return 'D';
    }
    return '';
  }

  onMouseDown() {
    this.mouseDown = true;
    // console.log(this.mouseDown);
  }

  onMouseUp() {
    this.mouseDown = false;
    this.draggingSource = false;
    this.draggingDest = false;
    // console.log(this.mouseDown);
  }

  onMovement(node: Node, isClick: boolean = false) {
    if (!isClick && !this.mouseDown) {
      return ;
    }
    if (this.draggingSource) {
      this.sourceNode = node;
    } else if (this.draggingDest) {
      this.destNode = node;
    } else if (node == this.sourceNode) {
      this.draggingSource = true;
    } else if (node == this.destNode) {
      this.draggingDest = true;
    } else if (this.editMode === 'RemoveWall') {
      node.isBlocked = false;
    } else if (this.editMode === 'AddWeight') {
      node.weight = this.weightSlider ;
    } else if (this.editMode === 'AddWall'){
      node.isBlocked = true;
    }
  }

  findPath() {
    this.dijkstra.findPath(this.grid, this.sourceNode, this.destNode);
  }

  reinit() {
    this.grid1D = [];
    this.grid = new Array(this.height);
    for (var i = 0; i < this.height; ++i) {
      this.grid[i] = new Array(this.width);

      for (var j = 0; j < this.width; ++j) {
        this.grid[i][j] = {
          isBlocked: false,
          x: i,
          y: j,
          distance: -1,
          isColored: false,
          isOnPath: false,
          parent: null,
          weight: 1
        };
      }
      this.grid1D = this.grid1D.concat(this.grid[i]);
    }

    this.sourceNode = this.grid[Math.floor(this.height/2)][1];
    this.destNode = this.grid[Math.floor(this.height/2)][this.width-2];
  }

  randomWeights() {
    for (let i = 0; i < this.height; ++i) {
      for (let j = 0; j < this.width; ++j) {
        this.grid[i][j].weight = Math.ceil(Math.random() * 100);
      }
    }
  }

  randomWalls() {
    for (let i = 0; i < this.height; ++i) {
      for (let j = 0; j < this.width; ++j) {
        this.grid[i][j].isBlocked = false;
      }
    }
    this.maze.mazify(this.grid);
  }

  ngOnInit() {
    this.dijkstra = new Dijkstra;
    this.maze = new MazePartation;
    this.reinit();
  }
}
