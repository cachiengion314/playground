import { produce } from 'immer'

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