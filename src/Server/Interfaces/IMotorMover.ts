interface IMotorMover {
  moveClockwise(): void,
  moveCounterClockwise(): void,
  stopMovement(): void,
  movementState: 'CLOCKWISE' | 'COUNTERCLOCKWISE' | "IDLE"
}

export default IMotorMover
