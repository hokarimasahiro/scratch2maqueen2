function joinBools (ledLeft: number, ledRight: number, patrolLeft: number, patrolRight: number) {
    slot3Value = ledLeft * 8 + ledRight * 4 + patrolLeft * 2 + patrolRight
}
ScratchMore.startService(function () {
	
})
function splitToBools (value: number) {
    ledLeft = Math.floor(value / 8)
    ledRight = Math.floor((value - ledLeft * 8) / 4)
    patrolLeft = Math.floor((value - ledLeft * 8 - ledRight * 4) / 2)
    patrolRight = value - ledLeft * 8 - ledRight * 4 - patrolLeft * 2
}
let speedRight = 0
let speedLeft = 0
let ledRight = 0
let ledLeft = 0
let slot3Value = 0
let patrolRight = 0
let patrolLeft = 0
pins.digitalWritePin(DigitalPin.P0, 0)
if (input.buttonIsPressed(Button.A)) {
    carcotrol.setCarType(carType.Tinybit)
} else if (input.buttonIsPressed(Button.B)) {
    carcotrol.setCarType(carType.Ecocar)
} else {
    carcotrol.setCarType(carType.Maqueen)
}
if (carcotrol.getCarType() == carcotrol.car(carType.Tinybit)) {
    basic.showString("T")
} else if (carcotrol.getCarType() == carcotrol.car(carType.Ecocar)) {
    basic.showString("E")
} else {
    basic.showString("M")
}
patrolLeft = 0
patrolRight = 0
bluetooth.setTransmitPower(7)
basic.forever(function () {
    speedLeft = ScratchMore.getSlot(Slot.SLOT0)
    speedRight = ScratchMore.getSlot(Slot.SLOT1)
    carcotrol.CarCtrl2(speedLeft, speedRight)
    ScratchMore.setSlot(Slot.SLOT2, carcotrol.getDistance())
    slot3Value = ScratchMore.getSlot(Slot.SLOT3)
    splitToBools(slot3Value)
    if (carcotrol.getCarType() == carcotrol.car(carType.Maqueen)) {
        if (ledLeft == 1) {
            carcotrol.setLED(Position.Left, carcotrol.colors(RGBColors.Red))
        } else {
            carcotrol.setLED(Position.Left, carcotrol.colors(RGBColors.Black))
        }
        if (ledRight == 1) {
            carcotrol.setLED(Position.Right, carcotrol.colors(RGBColors.Red))
        } else {
            carcotrol.setLED(Position.Right, carcotrol.colors(RGBColors.Black))
        }
    } else {
        carcotrol.setLED(Position.Both, carcotrol.rgb(ledLeft * 255, ledRight * 255, 0))
    }
    patrolLeft = carcotrol.Line_Sensor(Position.Left)
    patrolRight = carcotrol.Line_Sensor(Position.Right)
    joinBools(ledLeft, ledRight, patrolLeft, patrolRight)
    ScratchMore.setSlot(Slot.SLOT3, slot3Value)
})
