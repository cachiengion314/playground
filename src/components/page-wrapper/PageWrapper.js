import React from 'react'

const StateContext = React.createContext(null)
/** 
 * @example
    const [pageState, setPageState] = usePageContext()
    return (
        <PageWrapper
            value={{}}
            className=""
        >
            {"Children comps are here"}
        </PageWrapper>
    )
 */
const PageWrapper = ({ children, value, className, _printLog }) => {
    const [pageState, setPageState] = React.useState(value)
    if (_printLog) {
        // const FgRed = "\x1b[31m"
        // const FgYellow = "\x1b[33m"
        // const FgBlack = "\x1b[30m"
        const FgGreen = "\x1b[32m"
        console.log(`${FgGreen}%s\x1b[0m`, `appState: `, pageState)
    }
    return (
        <div className={className}>
            <StateContext.Provider value={{ pageState, setPageState }} >
                {children}
            </StateContext.Provider>
        </div>
    )
}
/** @example
    const [pageInfo, setPageState] = usePageContext()
 */
export const usePageContext = () => {
    const { pageState, setPageState } = React.useContext(StateContext)
    return [pageState, setPageState]
}

export default PageWrapper