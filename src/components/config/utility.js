import { produce } from 'immer'
import { themes } from '.'
import Piece from '../game-components/classes/Piece'
import Vector from '../game-components/classes/Vector'
import anime from "animejs/lib/anime.es.js"

/** anime section start */
const default_springAnime = {
    direction: "normal",
    // easing: 'spring(.1, 100, 100, 50)',
    // easing: 'easeInElastic(1, 1)'
    easing: 'easeInOutQuad',
    duration: 120,
}

const default_animeObj = {
    direction: "normal",
    easing: "easeInOutSine",
    duration: 100,
}

/**
 * @param {string} selectedId 
 * @param {object} translateObj 
 * @returns {object}
 */
export function anime_createObj(selectedId, translateObj) {
    return ({
        ...default_animeObj,
        targets: `#${selectedId}`,
        ...translateObj,
    })
}

/**
 * @param {object[]} anime_actions 
 * @param {Function} completedCallback - optional
 * @param {number} index - optional
 */
export function anime_executeTimeline(anime_actions, completedCallback, _index = 0,) {
    if (_index === anime_actions.length) {
        completedCallback && completedCallback()
        return
    }
    anime({
        ...anime_actions[_index],
        complete: function () {
            anime_executeTimeline(anime_actions, completedCallback, _index + 1)
        }
    })
}

/**
 * @param {Piece} selected 
 * @param {Vector} nextPos 
 * @param {ChessBlock[][]} chessboard 
 */
export function anime_createMoveObj(selected, nextPos, chessboard) {
    return ({
        ...default_springAnime,
        targets: `#${selected.id}`,
        top: nextPos.convertToPercentPosition(chessboard).top,
        left: nextPos.convertToPercentPosition(chessboard).left,
    })
}
/** anime section end */

/**
 * @param {Vector} currentPos 
 * @param {number} currentTheme 
 */
export function getBlockColorFrom(currentPos, currentTheme) {
    let defaultColor = ""
    if (currentPos.isXYUniform()) {
        defaultColor = themes[currentTheme]["dark-block-color"]
    } else {
        defaultColor = themes[currentTheme]["light-block-color"]
    }
    return defaultColor
}
/**
 * @param {object} app 
 * @param {Function} setAppState 
 * @param {string} subStateName 
 * @param {object[]} props 
 * @example
    updateProps(app, setAppState, stateName, [
        {
            key: KEY_SELECTED,
            val: null
        }
    ])
 */
export function updateProps(app, setAppState, subStateName, props) {
    const nextState = produce(app, draftState => {
        if (!subStateName) {
            for (let i = 0; i < props.length; ++i) {
                const { key, val } = props[i]
                draftState[key] = val
            }
        } else {
            for (let i = 0; i < props.length; ++i) {
                const { key, val } = props[i]
                draftState[subStateName][key] = val
            }
        }
    })
    setAppState(nextState)
}
/**
 * @param {number} fromNumber - includesive
 * @param {number} excludesNumber - excludesive
 */
export function randomFrom(fromNumber = 0, excludesNumber = 2) {
    return Math.floor(Math.random() * (excludesNumber - fromNumber)) + fromNumber
}
/**
 * @param {number[]} nums 
 */
export function randomBetween(nums) {
    return nums[randomFrom(0, nums.length)]
}
