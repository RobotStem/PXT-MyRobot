﻿//% weight=50 color="#ff6600" weight=10 icon="\uf11e"

namespace MyRobotBit {
	/************************************************************************************************************************************************
	* Robot<>Stem<>Project<>micro:bit 
	************************************************************************************************************************************************/
    export enum Motors {
        //% blockId=Motor_motor_A
        //% block="motor A"
        MotorA,
        //% blockId=Motor_motor_B
        //% block="motor B"
        MotorB,
        //% blockId=Motor_motor_AB
        //% block="motor AB"
        MotorAB
    }

    export enum MotorDirection {
        //% block="forward"
        Forward,
        //% block="reverse"
        Reverse
    }

    export enum StopMode {
        //% block="brake"
        Brake,
        //% block="coast"
        Coast
    }

    export enum Rotated {
        //% block="left"
        Left,
        //% block="right"
        Right
    }

    export enum RotatedmS {
        //% block="left"
        Left,
        //% block="right"
        Right
    }

    export enum Turn {
        //% block="left"
        Left,
        //% block="right"
        Right
    }

   export enum Servo {
	//% block="P0"
	Servo0,
	//% block="P1"
	Servo1,
	//% block="P2"
	Servo2,
	//% block="P3"
	Servo3,
	//% block="P4"
	Servo4,
	//% block="P10"
	Servo10,
	//% block="P5"
	Servo5,
	//% block="P6"
	Servo6,
	//% block="P7"
	Servo7,
	//% block="P8"
	Servo8,
	//% block="P9"
	Servo9,
	//% block="P11"
	Servo11,
	//% block="P12"
	Servo12
    }

   export enum Servo360 {
	//% block="P0"
	Servo0,
	//% block="P1"
	Servo1,
	//% block="P2"
	Servo2,
	//% block="P3"
	Servo3,
	//% block="P4"
	Servo4,
	//% block="P10"
	Servo10
    }

    export enum PingUnit {
	//% block="μs"  
	MicroSeconds,
	//% block="cm"
	Centimeters,
	//% block="inches"
	Inches
    }

     /**	
     * Turns on motor, forward, reverse at the requested speed 
     *
	 * @param motor which motor to turn on
	 * @param dir   which direction to go
	 * @param speed which slow/fast to spin the motor, eg:50
     */
    //% subcategory=Motor
    //% blockId=Motor_motor_on
    //% block="%motor|direction %dir|speed %speed"
    //% speed.min=0 speed.max=100
    export function motorOn(motor: Motors, dir: MotorDirection, speed: number): void {
        let motorspeed = pins.map(speed,0,100,0,1023)     
        switch (motor) {
            case Motors.MotorA: /*Motor A uses Pins 13 and 14*/
                switch (dir) {
                    case MotorDirection.Forward:
                        pins.analogWritePin(AnalogPin.P13, motorspeed);
                        pins.digitalWritePin(DigitalPin.P14, 0);
                        break
                    case MotorDirection.Reverse:
                        pins.analogWritePin(AnalogPin.P14, motorspeed);
                        pins.digitalWritePin(DigitalPin.P13, 0);
                        break
                }
                break;
            case Motors.MotorB: /*Motor B uses Pins 15 and 16*/
                switch (dir) {
                    case MotorDirection.Forward:
                        pins.analogWritePin(AnalogPin.P15, motorspeed);
                        pins.digitalWritePin(DigitalPin.P16, 0);
                        break
                    case MotorDirection.Reverse:
                        pins.analogWritePin(AnalogPin.P16, motorspeed);
                        pins.digitalWritePin(DigitalPin.P15, 0);
                        break
                }
                break;
	    case Motors.MotorAB: /*Motor AB uses Pins 13, 14, 15 and 16*/
                switch (dir) {
                    case MotorDirection.Forward:
                        pins.analogWritePin(AnalogPin.P13, motorspeed);
                        pins.digitalWritePin(DigitalPin.P14, 0);
			pins.analogWritePin(AnalogPin.P15, motorspeed);
                        pins.digitalWritePin(DigitalPin.P16, 0);
                        break
                    case MotorDirection.Reverse:
                        pins.analogWritePin(AnalogPin.P14, motorspeed);
                        pins.digitalWritePin(DigitalPin.P13, 0);
                        pins.analogWritePin(AnalogPin.P16, motorspeed);
                        pins.digitalWritePin(DigitalPin.P15, 0);
                        break
                }
                break;
        }
    }

    /**
     * Turns off the motor
     * @param motor which motor to turn off
     */
    //% subcategory=Motor
    //% blockId=Motor_motor_off
    //% block="%motor|Stop %StopMode|mode"
    export function motorOFF(motor: Motors, stop: StopMode): void {
        switch (motor) {
            case Motors.MotorAB:
                switch (stop) {
                    case StopMode.Brake:
			pins.digitalWritePin(DigitalPin.P13, 1);
		        pins.digitalWritePin(DigitalPin.P14, 1);
			pins.digitalWritePin(DigitalPin.P15, 1);
		        pins.digitalWritePin(DigitalPin.P16, 1);
			break
                    case StopMode.Coast:
			pins.digitalWritePin(DigitalPin.P13, 0);
		        pins.digitalWritePin(DigitalPin.P14, 0);
			pins.digitalWritePin(DigitalPin.P15, 0);
		        pins.digitalWritePin(DigitalPin.P16, 0);
			break
                }
                break;
            case Motors.MotorA:
                switch (stop) {
                    case StopMode.Brake:
			pins.digitalWritePin(DigitalPin.P13, 1);
		        pins.digitalWritePin(DigitalPin.P14, 1);
                        break
                    case StopMode.Coast:
			pins.digitalWritePin(DigitalPin.P13, 0);
		        pins.digitalWritePin(DigitalPin.P14, 0);
                        break
                }
                break;
            case Motors.MotorB:
                switch (stop) {
                    case StopMode.Brake:
			pins.digitalWritePin(DigitalPin.P15, 1);
		        pins.digitalWritePin(DigitalPin.P16, 1);
                        break
                    case StopMode.Coast:
			pins.digitalWritePin(DigitalPin.P15, 0);
		        pins.digitalWritePin(DigitalPin.P16, 0);
                        break
                }
	}
    }

	/**
	 * Execute dual motor to rotate with delay time to stop.
	 * @param index rotate robot Index
	 * @param speed speed of motor; eg: 50
	 * @param delay seconde delay to stop; eg: 1
	*/
    //% subcategory=Motor
    //% blockId=Motor_rotateDelay block="rotate|%index|speed %speed|delay %delay|sec"
    //% speed.min=0 speed.max=100
    //% delay.min=0 delay.max=10
    export function RotateDelay(index: Rotated, speed: number, delay: number): void {
      let motorspeed = pins.map(speed,0,100,0,1023)      
	switch (index) {
            case Rotated.Left:
		MyRobotBit.motorOn(MyRobotBit.Motors.MotorA, MyRobotBit.MotorDirection.Reverse, speed)
		MyRobotBit.motorOn(MyRobotBit.Motors.MotorB, MyRobotBit.MotorDirection.Forward, speed)
		basic.pause(delay*1000)
		MyRobotBit.motorOFF(MyRobotBit.Motors.MotorAB, MyRobotBit.StopMode.Coast)
		break

            case Rotated.Right:
		MyRobotBit.motorOn(MyRobotBit.Motors.MotorA, MyRobotBit.MotorDirection.Forward, speed)
		MyRobotBit.motorOn(MyRobotBit.Motors.MotorB, MyRobotBit.MotorDirection.Reverse, speed)
		basic.pause(delay*1000)
		MyRobotBit.motorOFF(MyRobotBit.Motors.MotorAB, MyRobotBit.StopMode.Coast)
		break
        }
    }

	/**
	 * Execute dual motor to rotate with delay mS time to stop.
	 * @param index rotate robot Index
	 * @param speed speed of motor; eg: 50
	 * @param pausems milliseconde delay to stop; eg: 400
	*/
    //% subcategory=Motor
    //% blockId=Motor_rotatePAUSE block="rotate|%index|speed %speed|pause %pause|mS"
    //% speed.min=0 speed.max=100
    export function RotatePAUSE(index: RotatedmS, speed: number, pausems: number): void {
      let motorspeed = pins.map(speed,0,100,0,1023)      
	switch (index) {
            case RotatedmS.Left:
		MyRobotBit.motorOn(MyRobotBit.Motors.MotorA, MyRobotBit.MotorDirection.Reverse, speed)
		MyRobotBit.motorOn(MyRobotBit.Motors.MotorB, MyRobotBit.MotorDirection.Forward, speed)
		basic.pause(pausems)
		MyRobotBit.motorOFF(MyRobotBit.Motors.MotorAB, MyRobotBit.StopMode.Coast)
		break

            case RotatedmS.Right:
		MyRobotBit.motorOn(MyRobotBit.Motors.MotorA, MyRobotBit.MotorDirection.Forward, speed)
		MyRobotBit.motorOn(MyRobotBit.Motors.MotorB, MyRobotBit.MotorDirection.Reverse, speed)
		basic.pause(pausems)
		MyRobotBit.motorOFF(MyRobotBit.Motors.MotorAB, MyRobotBit.StopMode.Coast)
		break
        }
    }

	/**
	 * Turn direction with dual motors for line follow robot.
	 * @param indexfl  Turn Index Left or Right
	 * @param speed    speed of motor; eg: 40
	*/
    //% subcategory=Motor
    //% blockId=Motor_followlineTurn block="turn|%indexfl|speed %speed"
    //% speed.min=0 speed.max=100
    export function followlineTurn(indexfl: Turn, speed: number): void {
      let motorspeed = pins.map(speed,0,100,0,1023)      
	switch (indexfl) {
            case Turn.Left:
		MyRobotBit.motorOn(MyRobotBit.Motors.MotorA, MyRobotBit.MotorDirection.Forward, 0)
		MyRobotBit.motorOn(MyRobotBit.Motors.MotorB, MyRobotBit.MotorDirection.Forward, speed)
		break
            case Turn.Right:
		MyRobotBit.motorOn(MyRobotBit.Motors.MotorA, MyRobotBit.MotorDirection.Forward, speed)
		MyRobotBit.motorOn(MyRobotBit.Motors.MotorB, MyRobotBit.MotorDirection.Forward, 0)
		break
        }
    }

	/**
	 * Execute puase time
	 * @param pausetime  mSec number  to delay; eg: 100
	*/
    //% subcategory=Motor
    //% pausetime.min=1 pausetime.max=10000
    //% blockId=Motor_TimePAUSE block="pause|%pausetime|mSec"
    export function TimePAUSE(pausetime: number): void {
		basic.pause(pausetime)
        }

	/**
	 * Execute delay time
	 * @param delaytime   Seconde number to delay; eg: 1
	*/
    //% subcategory=Motor
    //% delaytime.min=1 delaytime.max=10
    //% blockId=Motor_TimeDELAY block="delay|%delaytime|Sec"
    export function TimeDELAY(delaytime: number): void {
		basic.pause(delaytime*1000)
        }

    /**
     * Control Servo 0 - 180 degree 
     * @param indexSV  Select servo number to control
     * @param degree   Servo degree 0-180, eg: 90
     */
    //% subcategory=Servo
    //% blockId=Servo_servoDEGREE block="servo|%indexSV|degree %degree"
    //% degree.min=0 degree.max=180
    export function servoDEGREE(indexSV: Servo, degree: number): void {
	switch (indexSV) {
            case Servo.Servo0:
	        pins.servoWritePin(AnalogPin.P0, degree)
            case Servo.Servo1:
	        pins.servoWritePin(AnalogPin.P1, degree)
            case Servo.Servo2:
	        pins.servoWritePin(AnalogPin.P2, degree)
            case Servo.Servo3:
	        pins.servoWritePin(AnalogPin.P3, degree)
            case Servo.Servo4:
	        pins.servoWritePin(AnalogPin.P4, degree)
	    case Servo.Servo10:
	        pins.servoWritePin(AnalogPin.P10, degree)
            case Servo.Servo5:
	        pins.servoWritePin(AnalogPin.P5, degree)
            case Servo.Servo6:
	        pins.servoWritePin(AnalogPin.P6, degree)
            case Servo.Servo7:
	        pins.servoWritePin(AnalogPin.P7, degree)
            case Servo.Servo8:
	        pins.servoWritePin(AnalogPin.P8, degree)
            case Servo.Servo9:
	        pins.servoWritePin(AnalogPin.P9, degree)
            case Servo.Servo11:
	        pins.servoWritePin(AnalogPin.P11, degree)
            case Servo.Servo12:
	        pins.servoWritePin(AnalogPin.P12, degree)
	}
    }

    /**
     * Servo stop
     * @param indexSVstop  Select servo number to control
     */
    //% subcategory=Servo
    //% blockId=Servo_servoSTOP block="servo stop|%indexSVstop"
    export function servoSTOP(indexSVstop: Servo): void {
	switch (indexSVstop) {
            case Servo.Servo0:
	        pins.servoSetPulse(AnalogPin.P0, 0)
		break
            case Servo.Servo1:
	        pins.servoSetPulse(AnalogPin.P1, 0)
		break
            case Servo.Servo2:
	        pins.servoSetPulse(AnalogPin.P2, 0)
		break
            case Servo.Servo3:
	        pins.servoSetPulse(AnalogPin.P3, 0)
		break
            case Servo.Servo4:
	        pins.servoSetPulse(AnalogPin.P4, 0)
		break
            case Servo.Servo10:
	        pins.servoSetPulse(AnalogPin.P10, 0)
		break
            case Servo.Servo5:
	        pins.servoSetPulse(AnalogPin.P5, 0)
		break
            case Servo.Servo6:
	        pins.servoSetPulse(AnalogPin.P6, 0)
		break
            case Servo.Servo7:
	        pins.servoSetPulse(AnalogPin.P7, 0)
		break
            case Servo.Servo8:
	        pins.servoSetPulse(AnalogPin.P8, 0)
		break
            case Servo.Servo9:
	        pins.servoSetPulse(AnalogPin.P9, 0)
		break
            case Servo.Servo11:
	        pins.servoSetPulse(AnalogPin.P11, 0)
		break
            case Servo.Servo12:
	        pins.servoSetPulse(AnalogPin.P12, 0)
		break
	}
    }

}
