export class MinHeap {
  private heap: Array<[number, number, number]> = [];

  empty() {
    return (this.heap.length == 0);
  }

  swap(val1: number, val2: number) {
    let tmp = this.heap[val1];
    this.heap[val1] = this.heap[val2];
    this.heap[val2] = tmp;
  }

  push(distance: number, x: number, y: number) {
    this.heap.push([distance, x, y]);
    let cur = this.heap.length - 1;

    while (cur > 0) {
      let par = Math.floor((cur - 1) / 2);
      // check if cur is greater than par
      if (this.heap[cur][0] >= this.heap[par][0]) {
        return ;
      }
      this.swap(cur, par);
      cur = par;
    }
  }


  pop(): any {
    if (this.empty()) {
      return null;
    }

    let ret = this.heap[0].slice();
    this.swap(0, this.heap.length - 1);
    this.heap.pop();
    const n = this.heap.length;
    let cur = 0;

    while (1) {
      let left = 2 * cur + 1;
      let right = left + 1;
      // if this is a leaf node, return
      if (left >= n) {
        return ret;
      }
      // if only left child is present
      if (right >= n) {
        if (this.heap[left][0] >= this.heap[cur][0]) {
          return ret;
        }
        this.swap(left, cur);
        cur = left;
        continue;
      }
      // both children are present
      // check if cur is smaller than both
      if (this.heap[cur][0] <= Math.min(this.heap[left][0], this.heap[right][0])) {
        return ret;
      }
      // need to swap with smaller child
      if (this.heap[left][0] <= this.heap[right][0]) {
        this.swap(cur, left);
        cur = left;
        continue;
      } else {
        this.swap(cur, right);
        cur = right;
        continue;
      }
    }
  }
}
