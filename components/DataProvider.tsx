import React, { createContext, useContext, useEffect, useReducer } from 'react'
import {
  CustomerType,
  getCustomers,
  MappedOrderType,
  OrderType,
} from 'utils/orders'
import { MappedProductType, ProductType } from 'utils/products'
import { getSafeImageUrl } from 'utils/urls'

export enum Step {
  UPLOAD_PRODUCT_DATA,
  UPLOAD_ORDER_DATA,
  UPLOAD_FINISH,
}

export const stepMap = new Map([
  [Step.UPLOAD_PRODUCT_DATA, '상품목록 CSV 파일 읽기'],
  [Step.UPLOAD_ORDER_DATA, '주문내역 엑셀파일 읽기'],
])

type DataType = {
  step: Step
  productData: MappedProductType
  customers: CustomerType[]
}

type ActionType =
  | {
      type: 'CHANGE_STEP'
      step: Step
    }
  | {
      type: 'INIT_DATA'
      savedData: DataType
    }
  | {
      type: 'INIT_PRODUCT'
      products: ProductType[]
    }
  | {
      type: 'INIT_ORDER'
      orders: OrderType[]
    }

const STORAGE_KEY = 'smartstore-data'

const reducer = (data: DataType, action: ActionType) => {
  switch (action.type) {
    case 'CHANGE_STEP': {
      return {
        ...data,
        step: action.step,
      }
    }
    case 'INIT_DATA': {
      return {
        ...action.savedData,
      }
    }
    case 'INIT_PRODUCT': {
      const result = {
        ...data,
        step: Step.UPLOAD_ORDER_DATA,
        productData: action.products.reduce((acc, product) => {
          const key = product['상품번호(스마트스토어)']
          const safeImageUrl = getSafeImageUrl(product['대표이미지 URL'])
          return {
            ...acc,
            [key]: { ...product, ['대표이미지 URL']: safeImageUrl },
          }
        }, {} as MappedProductType),
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(result))
      return result
    }
    case 'INIT_ORDER': {
      const orderData = action.orders.reduce((acc, order) => {
        const key = order['주문번호']
        const value = acc[key] || []
        return {
          ...acc,
          [key]: [...value, order],
        }
      }, {} as MappedOrderType)
      const result = {
        ...data,
        step: Step.UPLOAD_FINISH,
        customers: getCustomers(orderData).sort((a, b) =>
          a.key < b.key ? -1 : 1,
        ),
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(result))
      return result
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
  customers: [],
  productData: {},
  postReceiptContents: [],
}

const defaultValue = {
  data: defaultData,
  dispatch: () => {},
}

const Context = createContext<DataProviderProps>(defaultValue)

const DataProvider: React.FC = ({ children }) => {
  const [data, dispatch] = useReducer(reducer, defaultData)

  useEffect(() => {
    const item = localStorage.getItem(STORAGE_KEY)
    if (item) {
      const savedData = JSON.parse(item) as DataType
      dispatch({ type: 'INIT_DATA', savedData })
    }
  }, [dispatch])

  return (
    <Context.Provider value={{ data, dispatch }}>{children}</Context.Provider>
  )
}

export const useData = () => useContext(Context)

export default DataProvider
