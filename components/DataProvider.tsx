import React, { createContext, useContext, useReducer } from 'react'

export type DataType = {
  ['상품주문번호']: string
  ['주문번호']: string
  ['구매자명']: string
  ['수취인명']: string
  ['주문상태']: string
  ['주문세부상태']: string
  ['결제일']: number
  ['상품번호']: string
  ['상품명']: string
  ['상품종류']: string
  ['옵션정보']: string
  ['수량']: number
  ['옵션가격']: number
  ['상품가격']: number
  ['상품별 할인액']: number
  ['판매자 부담 할인액']: number
  ['상품별 총 주문금액']: number
  ['배송비 형태']: string
  ['배송비 묶음번호']: string
  ['배송비 유형']: string
  ['배송비 합계']: number
  ['제주/도서 추가배송비']: number
  ['배송비 할인액']: number
  ['수취인연락처1']: string
  ['수취인연락처2']: string
  ['배송지']: string
  ['구매자연락처']: string
  ['우편번호']: string
  ['배송메세지']: string
  ['결제수단']: string
  ['수수료결제방식']: string
  ['네이버페이 주문관리 수수료']: number
  ['매출연동 수수료']: number
  ['정산예정금액']: number
  ['주문일시']: number
  ['배송속성']: string
}

export type MappedDataType = Record<string, DataType[]>

type ActionType = {
  type: 'INITIALIZE'
  dataList: DataType[]
}

const reducer = (data: MappedDataType, action: ActionType) => {
  switch (action.type) {
    case 'INITIALIZE': {
      return action.dataList.reduce((acc, data) => {
        const key = data['주문번호']
        const value = acc[key] || []
        return {
          ...acc,
          [key]: [...value, data],
        }
      }, {} as MappedDataType)
    }
    default:
      return data
  }
}

type DataProviderProps = {
  data: MappedDataType
  dispatch: React.Dispatch<ActionType>
}

const defaultValue = {
  data: {},
  dispatch: () => {},
}

const Context = createContext<DataProviderProps>(defaultValue)

const DataProvider: React.FC = ({ children }) => {
  const [data, dispatch] = useReducer(reducer, {})
  return (
    <Context.Provider value={{ data, dispatch }}>{children}</Context.Provider>
  )
}

export const useData = () => useContext(Context)

export default DataProvider
