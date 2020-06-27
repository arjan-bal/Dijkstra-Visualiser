import { Node } from './node.model';

export class Dijkstra {
  grid: Node[][];
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

  async findPath(grid: Node[][], sourceNode: Node, destNode: Node) {
    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];

    console.log("In path function");
    this.grid = grid;
    let queue: [number, Node][] = [[0, sourceNode]];

    sourceNode.distance = 0;

    while (queue.length > 0) {
      let front = queue.shift();
      let current = front[1], currentDistance = front[0];

      if (current.distance != currentDistance) {
        continue;
      }

      current.isColored = true;
      await this.delay(15);

      if (current == destNode) {
        break;
      }

      for (var i = 0; i < 4; ++i) {
        let nextX = current.x + dx[i];
        let nextY = current.y + dy[i];
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

    if (destNode.distance >= 0) {
      this.animatePath(destNode);
    } else {
      alert('No path to destination!');
    }
  }
}
