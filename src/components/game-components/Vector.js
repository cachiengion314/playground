export default class Vector {
    constructor(x = 0, y = 0) {
        this.x = x
        this.y = y
    }
    plusVector(vector2) {
        return new Vector(this.x + vector2.x, this.y + vector2.y)
    }
    multipliByNumber(num) {
        return new Vector(this.x * num, this.y * num)
    }
    isEqualTo(vector) {
        if (this.x == vector.x && this.y == vector.y) {
            return true
        }
        return false
    }
    isXYUniform() {
        if (this.x % 2 == 0 && this.y % 2 == 0 || this.x % 2 != 0 && this.y % 2 != 0) {
            return true
        }
        return false
    }
    isBoardLastLine() {
        if (this.y == 7 || this.y == 0) {
            return true
        }
        return false
    }
    isPositionInLegalMoves() {
        let isPosInLegalMovess = AssignedVar.legalMovesOfSelectedPiece.filter((vector) => {
            return vector.isEqualTo(this)
        });
        if (isPosInLegalMovess.length > 0) {
            return true
        }
        return false
    }
    convertToId() {
        return `${this.x}_${this.y}`
    }
    convertToPercentPosition() {
        let positionObject = {
            left: `${this.x * 12.5}%`,
            top: `${this.y * 12.5}%`,
        };
        return positionObject
    }
    convertToDirection() {
        let a = Math.abs(this.x)
        let b = Math.abs(this.y)
        let slot1 = a / b
        let slot2 = 1
        if (a > b) {
            slot1 = 1
            slot2 = b / a
        } else {
            slot1 = a / b
            slot2 = 1
        }
        if (this.x < 0) {
            slot1 = -slot1
        }
        if (this.y < 0) {
            slot2 = -slot2
        }
        return new Vector(slot1, slot2)
    }
    isPositionOnTheBoard() {
        if (this.x < 0 || this.y < 0 ||
            this.x > 7 || this.y > 7) {
            return false
        }
        return true
    }
    static createRandomDirection() {
        function randomFromAToMax(a = 0, MAX = 2) {
            return Math.floor(Math.random() * (MAX - a)) + a
        }
        let rX = randomFromAToMax(-1, 2)
        let rY = randomFromAToMax(-1, 2)
        if (rX == 0 && rY == 0) {
            return Vector.createRandomDirection()
        }
        return new Vector(rX, rY)
    }
    static convertIdToVector(id) {
        let numbers = id.split(`_`)
        numbers = numbers.map(item => {
            return Number(item);
        });
        return new Vector(numbers[numbers.length - 2], numbers[numbers.length - 1])
    }
}