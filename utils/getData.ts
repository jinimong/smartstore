import { MappedDataType } from 'components/DataProvider'

type BaseProductType = {
  count: number
  price: number
  discount: number
}

type ProductType = {
  name: string
} & BaseProductType

type CustomerType = {
  products: ProductType[]
  parcel: number
  shouldPayPost: boolean
  isFirstOrder: boolean
  address: string
  phone: string
  payUser: string
  targetUser: string
  key: string
}

type TotalType = {
  totalParcel: number
  shouldPayPostCount: number
  firstOrderCount: number
  productInfo: Record<string, BaseProductType>
}

export const getDataByCustomer: (data: MappedDataType) => CustomerType[] = (
  data: MappedDataType,
) => {
  return Object.values(data).map((dataList) => ({
    key: dataList[0]['주문번호'],
    payUser: dataList[0]['구매자명'],
    address: dataList[0]['배송지'],
    phone: dataList[0]['구매자연락처'],
    targetUser: dataList[0]['수취인명'],
    isFirstOrder: dataList[0]['주문세부상태'] === '신규주문',
    parcel: dataList[0]['배송비 합계'],
    shouldPayPost:
      dataList[0]['배송비 합계'] === 0 &&
      !dataList.some((row) => row['상품명'].startsWith('준등기')),
    products: dataList.reduce(
      (acc, cur) => [
        ...acc,
        {
          name:
            cur['상품명'] +
            (cur['상품종류'] === '조합형옵션상품'
              ? ` #${cur['옵션정보']}`
              : ''),
          count: cur['수량'],
          price: cur['상품별 총 주문금액'],
          discount: cur['판매자 부담 할인액'],
        },
      ],
      [] as ProductType[],
    ),
  }))
}

export const getDataTotal: (data: MappedDataType) => TotalType = (
  data: MappedDataType,
) => {
  const customers = getDataByCustomer(data)
  const { totalParcel, shouldPayPostCount, firstOrderCount, products } =
    customers.reduce(
      (acc, { parcel, shouldPayPost, isFirstOrder, products }) => ({
        totalParcel: acc.totalParcel + parcel,
        shouldPayPostCount: acc.shouldPayPostCount + (shouldPayPost ? 1 : 0),
        firstOrderCount: acc.firstOrderCount + (isFirstOrder ? 1 : 0),
        products: [...acc.products, ...products],
      }),
      {
        totalParcel: 0,
        shouldPayPostCount: 0,
        firstOrderCount: 0,
        products: [],
      } as {
        totalParcel: number
        shouldPayPostCount: number
        firstOrderCount: number
        products: ProductType[]
      },
    )
  return {
    totalParcel,
    shouldPayPostCount,
    firstOrderCount,
    productInfo: products.reduce(
      (acc, { name, count, price, discount }) => ({
        ...acc,
        [name]: {
          count: (acc[name]?.count || 0) + count,
          price: (acc[name]?.price || 0) + price,
          discount: (acc[name]?.discount || 0) + discount,
        },
      }),
      {} as Record<string, BaseProductType>,
    ),
  }
}
