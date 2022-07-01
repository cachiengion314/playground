import ChessBlock from "./ChessBlock"
import { themes, TYPE_OBSTACLE } from "../../config"
import { randomFrom } from "../../config/utility"
import Vector from "./Vector"

export default class Obstacle extends ChessBlock {
    constructor(currentPos, color = "#7fff00") {
        super(currentPos, color)
        this.type = TYPE_OBSTACLE
        this.id = TYPE_OBSTACLE + "-" + currentPos.convertToId()
    }
    /**
     * @param {Vector} _newPos 
     * @param {string} _newColor 
     * @returns 
     */
    getClone(_newPos, _newColor) {
        if (_newPos) {
            return new Obstacle(_newPos, _newColor ? _newColor : this.color)
        }
        return new Obstacle(this.currentPos, this.color)
    }
    /**
      * @param {any[][]} board 
      * @param {number} _currTheme - optional \
      * a algorithm for generate a perfect maze
      */
    static generateFrom(board, _currTheme = 0) {
        const directions = [
            new Vector(0, 1), new Vector(1, 0), new Vector(0, -1), new Vector(-1, 0),
        ]

        let totalSet = []
        for (let x = 0; x < board.length; x += 1) {
            for (let y = 0; y < board[x].length; y += 1) {
                const currPos = new Vector(x, y)
                if (x % 2 !== 0 || y % 2 !== 0) {
                    board[x][y] = new Obstacle(
                        currPos, themes[_currTheme]["obstacles-color"]
                    )
                    continue
                }
                const set = { id: currPos.convertToId(), val: [currPos] }
                totalSet.push(set)
            }
        }

        while (totalSet.length > 1) {
            const currSet = totalSet[randomFrom(0, totalSet.length)]
            const currPos = currSet.val[randomFrom(0, currSet.val.length)]

            let foundSet = null, directions_clone = [...directions]
            while (directions_clone.length) {
                const vector = directions_clone[randomFrom(0, directions_clone.length)]
                const neighbor = currPos.plus(vector.multipliBy(2))
                if (!neighbor.isPositionOnTheBoard(board)
                    || currSet.val.find(v => v.isEqualTo(neighbor))
                ) {
                    directions_clone = directions_clone.filter(v => !v.isEqualTo(vector))
                    continue
                }
                foundSet = totalSet.find(_set => _set.val.find(_pos => _pos.isEqualTo(neighbor)))
                if (!foundSet) {
                    directions_clone = directions_clone.filter(v => !v.isEqualTo(vector))
                    continue
                }
                currSet.val.push(...foundSet.val)
                const obstaclePos = currPos.plus(vector)
                board[obstaclePos.x][obstaclePos.y] = 0
                break
            }
            if (!foundSet) { continue }

            totalSet = totalSet.filter(set => set.id !== foundSet.id)
        }

        return board
    }
}