import React, { createContext, useContext, useReducer } from 'react'
import { MappedOrderType, OrderType } from 'utils/orders'
import { MappedProductType, ProductType } from 'utils/products'

type ActionType =
  | {
      type: 'INIT_PRODUCT'
      products: ProductType[]
    }
  | {
      type: 'INIT_ORDER'
      orders: OrderType[]
    }

export enum Step {
  UPLOAD_PRODUCT_DATA,
  UPLOAD_ORDER_DATA,
  UPLOAD_FINISH,
}

export const stepMap = {
  [Step.UPLOAD_PRODUCT_DATA]: '상품목록 CSV 파일 읽기',
  [Step.UPLOAD_ORDER_DATA]: '주문내역 엑셀파일 읽기',
  [Step.UPLOAD_FINISH]: '업로드가 끝났습니다',
}

type DataType = {
  step: Step
  productData: MappedProductType
  orderData: MappedOrderType
}

const reducer = (data: DataType, action: ActionType) => {
  switch (action.type) {
    case 'INIT_PRODUCT': {
      return {
        ...data,
        step: data.step + 1,
        productData: action.products.reduce((acc, product) => {
          const key = product['상품번호(스마트스토어)']
          return {
            ...acc,
            [key]: product,
          }
        }, {} as MappedOrderType),
      }
    }
    case 'INIT_ORDER': {
      return {
        ...data,
        step: data.step + 1,
        orderData: action.orders.reduce((acc, order) => {
          const key = order['주문번호']
          const value = acc[key] || []
          return {
            ...acc,
            [key]: [...value, order],
          }
        }, {} as MappedOrderType),
      }
    }
    default:
      return data
  }
}

type DataProviderProps = {
  data: DataType
  dispatch: React.Dispatch<ActionType>
}

const defaultData = {
  step: Step.UPLOAD_PRODUCT_DATA,
  orderData: {},
  productData: {},
}

const defaultValue = {
  data: defaultData,
  dispatch: () => {},
}

const Context = createContext<DataProviderProps>(defaultValue)

const DataProvider: React.FC = ({ children }) => {
  const [data, dispatch] = useReducer(reducer, defaultData)
  return (
    <Context.Provider value={{ data, dispatch }}>{children}</Context.Provider>
  )
}

export const useData = () => useContext(Context)

export default DataProvider
