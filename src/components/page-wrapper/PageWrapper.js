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
const PageWrapper = ({ children, value, className, _needLog }) => {
    const [pageState, setPageState] = React.useState(value)
    if (_needLog) {
        console.log(`appState`, pageState)
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