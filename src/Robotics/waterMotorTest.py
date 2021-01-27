import RPi.GPIO as GPIO
from time import sleep

motor_channel = (37, 35)

GPIO.setwarnings(True)
GPIO.setmode(GPIO.BOARD)
GPIO.setup(motor_channel, GPIO.OUT)

GPIO.output(motor_channel, (GPIO.HIGH, GPIO.LOW))
print('Should be on')

sleep(1)
GPIO.output(motor_channel, (GPIO.LOW, GPIO.LOW))