import { Component, OnInit, Input } from '@angular/core';

import { Node } from './node.model';

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
  private dx = [-1, 1, 0, 0];
  private dy = [0, 0, -1, 1];

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

  validCordinate(x: number, y: number) {
    return (x >= 0 && x < this.height && y >= 0 && y < this.width);
  }

  delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
  }

  async animatePath() {
    // animate formation of path
    let currentNode = this.destNode;

    while (currentNode) {
      // console.log(currentNode.x, currentNode.y);
      currentNode.isOnPath = true;
      currentNode = currentNode.parent;
      await this.delay(20);
    }
  }

  async findPath() {
    console.log("In path function");
    let queue: [number, Node][] = [[0, this.sourceNode]];

    this.sourceNode.distance = 0;

    while (queue.length > 0) {
      let front = queue.shift();
      let current = front[1], currentDistance = front[0];

      if (current.distance != currentDistance) {
        continue;
      }

      current.isColored = true;
      await this.delay(15);

      if (current == this.destNode) {
        break;
      }

      for (var i = 0; i < 4; ++i) {
        let nextX = current.x + this.dx[i];
        let nextY = current.y + this.dy[i];
        if (!this.validCordinate(nextX, nextY)) {
          continue;
        }
        let nextNode = this.grid[nextX][nextY];
        if (nextNode.isBlocked) {
          continue;
        }
        if (nextNode.distance == -1 || currentDistance + 1 < nextNode.distance) {
          nextNode.distance = currentDistance + 1;
          nextNode.parent = current;
          queue.push([currentDistance + 1, nextNode]);
        }
      }
    }

    if (this.destNode.distance >= 0) {
      this.animatePath();
    } else {
      alert('No path to destination!');
    }
  }

  ngOnInit() {
    this.grid = new Array(this.height);

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
