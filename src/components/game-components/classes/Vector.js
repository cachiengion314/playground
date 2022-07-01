import { randomFrom } from "../../config/utility"
import ChessBlock from "./ChessBlock"

export default class Vector {
    constructor(x = 0, y = 0) {
        this.x = x
        this.y = y
    }
    /**
     * 
     * @param {Vector} vector2 
     * @returns 
     */
    plus(vector2) {
        return new Vector(this.x + vector2.x, this.y + vector2.y)
    }
    /**
     * 
     * @param {number} num 
     * @returns 
     */
    multipliBy(num) {
        return new Vector(this.x * num, this.y * num)
    }
    /**
     * 
     * @param {Vector} vector 
     * @returns 
     */
    isEqualTo(vector) {
        if (this.x == vector.x && this.y == vector.y) {
            return true
        }
        return false
    }
    /**
     * @param {Vector} pos 
     */
    distanceTo(pos) {
        return Number(Math.sqrt(Math.pow((this.x - pos.x), 2) + Math.pow((this.y - pos.y), 2)).toFixed(2))
    }
    isXYUniform() {
        if (this.x % 2 == 0 && this.y % 2 == 0 || this.x % 2 != 0 && this.y % 2 != 0) {
            return true
        }
        return false
    }
    convertToId() {
        return `${this.x}_${this.y}`
    }
    /**
     * @param {ChessBlock[][]} chessboard 
     */
    convertToPercentPosition(chessboard) {
        let positionObject = {
            left: `${this.x * 12.5}%`,
            top: `${this.y * 12.5}%`,
        }
        if (!Array.isArray(chessboard)) {
            return positionObject
        }
        const constant_x = (100 / chessboard.length) || 12.5
        const constant_y = (100 / chessboard[0]?.length) || 12.5
        positionObject = {
            left: `${this.x * constant_x}%`,
            top: `${this.y * constant_y}%`,
        }
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
    isPositionOnTheBoard(chessBoard) {
        if (this.x < 0 || this.y < 0
            || this.x > chessBoard.length - 1
            || this.y > chessBoard[this.x].length - 1) {
            return false
        }
        return true
    }
    /**
     * @returns {Vector}
     */
    static createRandomDirection() {
        let rX = randomFrom(-1, 2)
        let rY = randomFrom(-1, 2)
        if (rX == 0 && rY == 0) {
            return Vector.createRandomDirection()
        }
        return new Vector(rX, rY)
    }
    static convertIdToVector(id) {
        let numbers = id.split(`_`)
        numbers = numbers.map(item => {
            return Number(item);
        })
        return new Vector(numbers[numbers.length - 2], numbers[numbers.length - 1])
    }
}