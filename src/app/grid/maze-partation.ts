import { Node } from './node.model';
import { partition } from 'rxjs';

interface Hole {
  x: number;
  y: number;
};

const timeDelay = 20;

export class MazePartation {
  private grid: Node[][];

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // generates a random value in the range [minVal, maxVal]
  random(minVal: number, maxVal: number) {
    return minVal + Math.floor(Math.random() * (maxVal - minVal));
  }

  validCordinate(x: number, y: number) {
    return (x >= 0 && x < this.grid.length && y >= 0 && y < this.grid[0].length);
  }

  async partition(startX: number, endX: number, startY: number, endY: number) {
    const vRange = endX - startX - 1;
    let hCut: number;
    if (vRange >= 1) {
      hCut = this.random(startX + 1, endX - 1);
      // make the horizontal cut
      // check if first cell doesn't block a gap in a vertical wall
      // only then build a wall
      if (!this.validCordinate(hCut, startY - 1) || this.grid[hCut][startY - 1].isBlocked) {
        this.grid[hCut][startY].isBlocked = true;
        await this.delay(timeDelay);
      }

      for (let j = startY + 1; j <= endY - 1; ++j) {
        this.grid[hCut][j].isBlocked = true;
        await this.delay(timeDelay);
      }

      // check if last cell doesn't block a gap in a vertical wall
      // only then build a wall
      if (!this.validCordinate(hCut, endY + 1) || this.grid[hCut][endY + 1].isBlocked) {
        this.grid[hCut][endY].isBlocked = true;
        await this.delay(timeDelay);
      }
    }

    let vCut: number;
    const hRange = endY - startY - 1;
    if (hRange >= 1) {
      vCut = this.random(startY + 1, endY - 1);
      // make the vertical cut
      // check if first cell doesn't block a gap in a horizontal wall
      // only then build a wall
      if (!this.validCordinate(startX - 1, vCut) || this.grid[startX - 1][vCut].isBlocked) {
        this.grid[startX][vCut].isBlocked = true;
        await this.delay(timeDelay);
      }

      for (let i = startX + 1; i < endX; ++i) {
        this.grid[i][vCut].isBlocked = true;
        await this.delay(timeDelay);
      }

      // check if last cell doesn't block a gap in a horizontal wall
      // only then build a wall
      if (!this.validCordinate(endX + 1, vCut) || this.grid[endX + 1][vCut].isBlocked) {
        this.grid[endX][vCut].isBlocked = true;
        await this.delay(timeDelay);
      }
    }

    // Base condition
    // if you made 0 cuts, return
    if (vRange < 1 && hRange < 1) {
      return ;
    }

    // if you made 1 cut, need to unblock one cell and recurse
    if (vRange < 1) {
      // this means hRange >=1 and we only made a vertical cut
      // generate a number to make a hole in the vertical wall
      const hole = this.random(startX, endX);
      this.grid[hole][vCut].isBlocked = false;
      this.partition(startX, endX, startY, vCut - 1);
      this.partition(startX, endX, vCut + 1, endY);
      return ;
    }

    if (hRange < 1) {
      // this means vRange >=1 and we only made a horizontal cut
      // generate a number to make a hole in the horizontal wall
      const hole = this.random(startY, endY);
      this.grid[hCut][hole].isBlocked = false;
      this.partition(startX, hCut -1, startY,  endY);
      this.partition(hCut + 1, endX, startY, endY);
      return ;
    }

    // we made a horizontal and vertical cut
    // need to generate 3 holes
    // to do that, we make holes in all four segments of walls
    // and choose one to fill back

    let holes: Hole[] = [];
    // make 2 holes in vertical wall
    holes.push({
      x: this.random(startX, hCut - 1),
      y: vCut
    });

    holes.push({
      x: this.random(hCut + 1, endX),
      y: vCut
    });

    // make 2 holes in horizontal wall
    holes.push({
      x: hCut,
      y: this.random(startY, vCut - 1)
    });
    holes.push({
      x: hCut,
      y: this.random(vCut + 1, endY)
    });

    // choose an index to leave
    const leaveIndex = this.random(0, 3);

    for (let i = 0; i < 4; ++i) {
      if (i != leaveIndex) {
        await this.delay(timeDelay);
        this.grid[holes[i].x][holes[i].y].isBlocked = false;
      }
    }

    // recurse on 4 smaller parts
    this.partition(startX, hCut - 1, startY, vCut - 1);
    this.partition(startX, hCut - 1, vCut + 1, endY);
    this.partition(hCut + 1, endX, startY, vCut - 1);
    this.partition(hCut + 1, endX, vCut + 1, endY);
  }

  mazify(grid: Node[][]) {
    this.grid = grid;
    const height = grid.length;
    const width = grid[0].length;

    this.partition(0, height - 1, 0, width - 1);
  }
}
