import React, { createContext, useContext, useReducer } from 'react'

type ActionType =
  | {
      type: 'SET_CUSTOMER_IDX'
      value: number
    }
  | {
      type: 'SET_FCFSB_COUNT'
      value: number
    }

type StateType = {
  customerIdx: number
  fcfsBasisCount: number // 선착순 수
}

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case 'SET_CUSTOMER_IDX': {
      return {
        ...state,
        customerIdx: action.value,
      }
    }
    case 'SET_FCFSB_COUNT': {
      return {
        ...state,
        fcfsBasisCount: action.value,
      }
    }
    default:
      return state
  }
}

type CustomerSummaryProviderProps = {
  state: StateType
  dispatch: React.Dispatch<ActionType>
}

const defaultState = {
  customerIdx: 0,
  fcfsBasisCount: 0,
}

const defaultValue = {
  state: defaultState,
  dispatch: () => {},
}

const Context = createContext<CustomerSummaryProviderProps>(defaultValue)

const CustomerSummaryProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState)
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  )
}

export const useCustomerSummary = () => useContext(Context)

export default CustomerSummaryProvider
