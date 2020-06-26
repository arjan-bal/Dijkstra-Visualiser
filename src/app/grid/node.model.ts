export interface Node {
  isBlocked: boolean,
  x: number,
  y: number,
  distance: number,
  isColored: boolean,
  isOnPath: boolean,
  parent: Node
}
