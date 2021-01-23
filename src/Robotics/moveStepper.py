# command arguments to run process
# 1: int pin_one
# 2: int pin_two
# 3: int pin_three
# 4: int pin_four
# 5: string clockwise or counterClockwise
# 6: float: interval_time


import RPi.GPIO as GPIO
from time import sleep
import sys

motor_channel = (int(sys.argv[1]), int(sys.argv[2]), int(sys.argv[3]), int(sys.argv[4]))
motor_direction = sys.argv[5]
interval_time = float(sys.argv[6])

GPIO.setwarnings(True)
GPIO.setmode(GPIO.BOARD)
GPIO.setup(motor_channel, GPIO.OUT)

while True:
    try:
        if(motor_direction == 'clockwise'):
            print('motor running clockwise\n')
            GPIO.output(motor_channel, (GPIO.HIGH,GPIO.LOW,GPIO.LOW,GPIO.HIGH))
            sleep(interval_time)
            GPIO.output(motor_channel, (GPIO.HIGH,GPIO.HIGH,GPIO.LOW,GPIO.LOW))
            sleep(interval_time)
            GPIO.output(motor_channel, (GPIO.LOW,GPIO.HIGH,GPIO.HIGH,GPIO.LOW))
            sleep(interval_time)
            GPIO.output(motor_channel, (GPIO.LOW,GPIO.LOW,GPIO.HIGH,GPIO.HIGH))
            sleep(interval_time)

        elif(motor_direction == 'counterClockwise'):
            print('motor running anti-clockwise\n')
            GPIO.output(motor_channel, (GPIO.HIGH,GPIO.LOW,GPIO.LOW,GPIO.HIGH))
            sleep(interval_time)
            GPIO.output(motor_channel, (GPIO.LOW,GPIO.LOW,GPIO.HIGH,GPIO.HIGH))
            sleep(interval_time)
            GPIO.output(motor_channel, (GPIO.LOW,GPIO.HIGH,GPIO.HIGH,GPIO.LOW))
            sleep(interval_time)
            GPIO.output(motor_channel, (GPIO.HIGH,GPIO.HIGH,GPIO.LOW,GPIO.LOW))
            sleep(interval_time)


    except KeyboardInterrupt:
        sys.exit(0)