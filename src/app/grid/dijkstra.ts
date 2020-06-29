import { Node } from './node.model';
import { MinHeap } from './min-heap';

export class Dijkstra {
  private grid: Node[][];

  constructor(grid: Node[][]) {
    this.grid = grid;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  validCordinate(x: number, y: number) {
    return (x >= 0 && x < this.grid.length && y >= 0 && y < this.grid[0].length);
  }

  async animatePath(destNode: Node) {
    // animate formation of path
    let currentNode = destNode;

    while (currentNode) {
      // console.log(currentNode.x, currentNode.y);
      currentNode.isOnPath = true;
      currentNode = currentNode.parent;
      await this.delay(20);
    }
  }

  async findPath(sourceNode: Node, destNode: Node) {
    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];

    console.log("In path function");
    const queue = new MinHeap;
    sourceNode.distance = 0;
    queue.push(0, sourceNode.x, sourceNode.y);


    while (!queue.empty()) {
      let front = queue.pop();
      let currentDistance = front.distance, cx = front.x, cy = front.y;
      const current = this.grid[cx][cy];

      if (current.isColored) {
        continue;
      }

      current.isColored = true;
      await this.delay(15);

      if (current == destNode) {
        break;
      }

      for (var i = 0; i < 4; ++i) {
        let nextX = cx + dx[i];
        let nextY = cy + dy[i];
        if (!this.validCordinate(nextX, nextY)) {
          continue;
        }
        const nextNode = this.grid[nextX][nextY];
        if (nextNode.isBlocked) {
          continue;
        }
        if (nextNode.distance == -1 || currentDistance + current.weight < nextNode.distance) {
          nextNode.distance = currentDistance + current.weight;
          nextNode.parent = current;
          queue.push(nextNode.distance, nextNode.x, nextNode.y);
        }
      }
    }

    if (destNode.isColored) {
      this.animatePath(destNode);
    } else {
      alert('No path to destination!');
    }
  }
}
