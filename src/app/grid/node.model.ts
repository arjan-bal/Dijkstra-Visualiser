export interface Node {
  isBlocked: boolean,
  xCoord: number,
  yCoord: number,
  isSource: boolean,
  isDest: boolean,
  distance: number,
  isColored: boolean,
  isOnPath: boolean,
  parent: Node
}
