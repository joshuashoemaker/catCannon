# command arguments to run process
# 1: int pin_one
# 2: int pin_two
# 3: int motor_active_time

import RPi.GPIO as GPIO
from time import sleep
import sys

motor_channel = (int(sys.argv[1]), int(sys.argv[2])) # (37, 35)

motor_active_time = int(sys.argv[3])

GPIO.setwarnings(True)
GPIO.setmode(GPIO.BOARD)
GPIO.setup(motor_channel, GPIO.OUT)

GPIO.output(motor_channel, (GPIO.HIGH, GPIO.LOW))
print('Should be on')

sleep(motor_active_time)
GPIO.output(motor_channel, (GPIO.LOW, GPIO.LOW))