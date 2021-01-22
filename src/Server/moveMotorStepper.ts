import { spawn } from 'child_process'

function sleep (ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const main = async () => {
  console.log('start')

  const rotateProcess = spawn('python', ['src/Server/moveStepper.py', '3', '5', '7', '11', 'clockwise', '0.01'])
  console.log('running')

  await sleep(5000)
  rotateProcess.kill()

  console.log('change direction')
  const couterRotateProcess = spawn('python', ['src/Server/moveStepper.py', '3', '5', '7', '11', 'counterClockwise', '0.01'])
  await sleep(5000)
  couterRotateProcess.kill()
}

main()
