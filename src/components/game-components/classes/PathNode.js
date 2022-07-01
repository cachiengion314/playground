import Piece from "./Piece"
import Vector from "./Vector"

export default class PathNode {
    /**
     * @param {Vector} pos 
     * @param {Piece} piece 
     */
    constructor(pos, piece) {
        this.id = piece.id
        this.pos = pos
        this.piece = piece
        this.parentNode = null
        this.fCost = 0 /** fCost always equal to sum of hCost and gCost */
        this.hCost = 0
        this.gCost = 0
    }
    /**
   * @param {PathNode} node 
   */
    setParentNode(node) {
        this.parentNode = node
    }
    setHCost(val) {
        this.hCost = val
        this.fCost = this.gCost + this.hCost
    }
    setGCost(val) {
        this.gCost = val
        this.fCost = this.gCost + this.hCost
    }
    /**
     * @return {Vector[]}
     */
    getTracingPath() {
        const paths = [this.pos]
        let parentNode = this.parentNode
        while (parentNode) {
            paths.push(parentNode.pos)
            parentNode = parentNode.parentNode
        }
        return paths.reverse()
    }

    /**
     * @param {any[][]} board 
     * @param {Piece} piece 
     */
    getNeighbors(board, piece) {
        return this.piece.getClosestPossibleMoves(board)
            .map(pos => {
                return new PathNode(pos, piece.getClone(pos))
            })
    }
    /**
     * @param {Vector} destinationPos 
     * @param {Vector} rootPos 
     * @param {Piece} piece 
     * @param {any[][]} board 
     */
    static findRouteTo(destinationPos, rootPos, piece, board) {
        const distanceVal = rootPos.distanceTo(destinationPos)
        const rootNode = new PathNode(rootPos, piece.getClone(), distanceVal)
        let stack = [rootNode], visited = []

        while (stack.length) {
            let currNode = stack[stack.length - 1]
            for (let i = 0; i < stack.length; ++i) {
                if (stack[i].fCost <= currNode.fCost) {
                    currNode = stack[i]
                }
            }
            stack = stack.filter((node) => node.id !== currNode.id)
            visited.push(currNode)

            const neighbors = currNode.getNeighbors(board, piece)
            for (const neighbor of neighbors) {
                if (stack.find(node => node.id === neighbor.id)
                    || visited.find(node => node.id === neighbor.id)) {
                    continue
                }

                const distanceToDes = neighbor.pos.distanceTo(destinationPos)
                const distanceFromParent = neighbor.pos.distanceTo(currNode.pos)
                neighbor.setHCost(distanceToDes)
                neighbor.setGCost(currNode.gCost + distanceFromParent)
                neighbor.setParentNode(currNode)

                if (distanceToDes === 0) { return neighbor.getTracingPath() }
                stack.push(neighbor)
            }
        }
        return []
    }
}