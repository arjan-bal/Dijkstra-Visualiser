interface HeapNode {
  distance: number,
  x: number,
  y: number
};

export class MinHeap {
  private heap: Array<HeapNode> = [];

  empty() {
    return (this.heap.length == 0);
  }

  swap(val1: number, val2: number) {
    let tmp = this.heap[val1];
    this.heap[val1] = this.heap[val2];
    this.heap[val2] = tmp;
  }

  push(distance: number, x: number, y: number) {
    this.heap.push({
      distance: distance,
      x: x,
      y: y
    });
    let cur = this.heap.length - 1;

    while (cur > 0) {
      let par = Math.floor((cur - 1) / 2);
      // check if cur is greater than par
      if (this.heap[cur].distance >= this.heap[par].distance) {
        return ;
      }
      this.swap(cur, par);
      cur = par;
    }
  }


  pop(): HeapNode {
    if (this.empty()) {
      return null;
    }

    let ret = {...this.heap[0]};
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
        if (this.heap[left].distance >= this.heap[cur].distance) {
          return ret;
        }
        this.swap(left, cur);
        cur = left;
        continue;
      }
      // both children are present
      // check if cur is smaller than both
      if (this.heap[cur].distance <= Math.min(this.heap[left].distance, this.heap[right].distance)) {
        return ret;
      }
      // need to swap with smaller child
      if (this.heap[left].distance <= this.heap[right].distance) {
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
