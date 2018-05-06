//% weight=50 color="#31C7D5" weight=10 icon="\uf11e"

/**
//% led.enable(false)
*/

namespace MyRoboStem {
	/************************************************************************************************************************************************
	* Robot<>Stem<>Project<>micro:bit 
	************************************************************************************************************************************************/
    export enum Motors {
        //% blockId=RoboBit_motor_A
        //% block="motor A"
        MotorA,
        //% blockId=RoboBit_motor_B
        //% block="motor B"
        MotorB,
        //% blockId=RoboBit_motor_AB
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

     /**	
     * Turns on motor, forward, reverse at the requested speed 
     *
	 * @param motor which motor to turn on
	 * @param dir   which direction to go
	 * @param speed which slow/fast to spin the motor, eg:50
     */
    //% subcategory=RoboBit
    //% blockId=RoboBit_motor_on
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
    //% subcategory=RoboBit
    //% blockId=RoboBit_motor_off
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
    //% subcategory=RoboBit
    //% blockId=RoboBit_rotateDelay block="rotate|%index|speed %speed|delay %delay|sec"
    //% speed.min=0 speed.max=100
    //% delay.min=0 delay.max=10
    export function RotateDelay(index: Rotated, speed: number, delay: number): void {
      let motorspeed = pins.map(speed,0,100,0,1023)      
	switch (index) {
            case Rotated.Left:
		MyRoboStem.motorOn(MyRoboStem.Motors.MotorA, MyRoboStem.MotorDirection.Reverse, speed)
		MyRoboStem.motorOn(MyRoboStem.Motors.MotorB, MyRoboStem.MotorDirection.Forward, speed)
		basic.pause(delay*1000)
		MyRoboStem.motorOFF(MyRoboStem.Motors.MotorAB, MyRoboStem.StopMode.Coast)
		break

            case Rotated.Right:
		MyRoboStem.motorOn(MyRoboStem.Motors.MotorA, MyRoboStem.MotorDirection.Forward, speed)
		MyRoboStem.motorOn(MyRoboStem.Motors.MotorB, MyRoboStem.MotorDirection.Reverse, speed)
		basic.pause(delay*1000)
		MyRoboStem.motorOFF(MyRoboStem.Motors.MotorAB, MyRoboStem.StopMode.Coast)
		break
        }
    }

	/**
	 * Execute dual motor to rotate with delay mS time to stop.
	 * @param index rotate robot Index
	 * @param speed speed of motor; eg: 50
	 * @param pausems milliseconde delay to stop; eg: 400
	*/
    //% subcategory=RoboBit
    //% blockId=RoboBit_rotatePAUSE block="rotate|%index|speed %speed|pause %pause|mS"
    //% speed.min=0 speed.max=100
    export function RotatePAUSE(index: RotatedmS, speed: number, pausems: number): void {
      let motorspeed = pins.map(speed,0,100,0,1023)      
	switch (index) {
            case RotatedmS.Left:
		MyRoboStem.motorOn(MyRoboStem.Motors.MotorA, MyRoboStem.MotorDirection.Reverse, speed)
		MyRoboStem.motorOn(MyRoboStem.Motors.MotorB, MyRoboStem.MotorDirection.Forward, speed)
		basic.pause(pausems)
		MyRoboStem.motorOFF(MyRoboStem.Motors.MotorAB, MyRoboStem.StopMode.Coast)
		break

            case RotatedmS.Right:
		MyRoboStem.motorOn(MyRoboStem.Motors.MotorA, MyRoboStem.MotorDirection.Forward, speed)
		MyRoboStem.motorOn(MyRoboStem.Motors.MotorB, MyRoboStem.MotorDirection.Reverse, speed)
		basic.pause(pausems)
		MyRoboStem.motorOFF(MyRoboStem.Motors.MotorAB, MyRoboStem.StopMode.Coast)
		break
        }
    }

	/**
	 * Execute turn direction with dual motors for follow line robot.
	 * @param indexfl Turn Index Left or Right
	 * @param speed speed of motor; eg: 40
	*/
    //% subcategory=RoboBit
    //% blockId=RoboBit_followlineTurn block="turn|%index|speed %speed"
    //% speed.min=0 speed.max=100
    export function followlineTurn(indexfl: Turn, speed: number): void {
      let motorspeed = pins.map(speed,0,100,0,1023)      
	switch (indexfl) {
            case Turn.Left:
		MyRoboStem.motorOn(MyRoboStem.Motors.MotorA, MyRoboStem.MotorDirection.Forward, 0)
		MyRoboStem.motorOn(MyRoboStem.Motors.MotorB, MyRoboStem.MotorDirection.Forward, speed)
		break
            case Turn.Right:
		MyRoboStem.motorOn(MyRoboStem.Motors.MotorA, MyRoboStem.MotorDirection.Forward, speed)
		MyRoboStem.motorOn(MyRoboStem.Motors.MotorB, MyRoboStem.MotorDirection.Forward, 0)
		break
        }
    }

	/**
	 * Execute puase time
	 * @param pausetime  mSec number  to elay; eg: 100
	*/
    //% subcategory=RoboBit
    //% pausetime.min=1 pausetime.max=10000
    //% blockId=RoboBit_TimePAUSE block="pause|%pausetime|mSec"
    export function TimePAUSE(pausetime: number): void {
		basic.pause(pausetime)
		break
        }

	/**
	 * Execute delay time
	 * @param delaytime   Seconde number to delay; eg: 1
	*/
    //% subcategory=RoboBit
    //% delaytime.min=1 delaytime.max=10
    //% blockId=RoboBit_TimeDELAY block="delay|%delaytime|Sec"
    export function TimeDELAY(delaytime: number): void {
		basic.pause(delaytime*1000)
		break
        }

}