export type OrderType = {
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
  ['배송지']: string
  ['(기본주소)']: string
  ['(상세주소)']: string
}

export type MappedOrderType = Record<string, OrderType[]>

type BaseOrderProductType = {
  orderCode: string
  productCode: number
  count: number
  price: number
  discount: number
}

export type OrderProductType = {
  name: string
} & BaseOrderProductType

export type CustomerType = {
  orderProducts: OrderProductType[]
  parcel: number
  shouldPayPost: boolean
  isFirstOrder: boolean
  address: string
  address1: string
  address2: string
  zipCode: string
  phone: string
  payUser: string
  targetUser: string
  targetPhone: string
  key: string
}

type TotalType = {
  totalParcel: number
  shouldPayPostCount: number
  firstOrderCount: number
  orderProducts: OrderProductType[]
}

export const getCustomers: (orderData: MappedOrderType) => CustomerType[] = (
  orderData,
) => {
  return Object.values(orderData).map((orders) => ({
    key: orders[0]['주문번호'],
    payUser: orders[0]['구매자명'],
    address: orders[0]['배송지'],
    address1: orders[0]['(기본주소)'],
    address2: orders[0]['(상세주소)'],
    zipCode: orders[0]['우편번호'],
    phone: orders[0]['구매자연락처'],
    targetUser: orders[0]['수취인명'],
    targetPhone: orders[0]['수취인연락처1'],
    isFirstOrder: orders[0]['주문세부상태'] === '신규주문',
    parcel: orders[0]['배송비 합계'],
    shouldPayPost:
      orders[0]['배송비 합계'] === 0 &&
      !orders.some((row) => row['상품명'].startsWith('준등기')),
    orderProducts: orders.reduce(
      (acc, cur) => [
        ...acc,
        {
          name:
            cur['상품명'] +
            (cur['상품종류'] === '조합형옵션상품'
              ? ` #${cur['옵션정보']}`
              : ''),
          productCode: Number(cur['상품번호']),
          orderCode: cur['상품주문번호'],
          count: cur['수량'],
          price: cur['상품별 총 주문금액'],
          discount: cur['판매자 부담 할인액'],
        },
      ],
      [] as OrderProductType[],
    ),
  }))
}

type MappedOrderProductType = Record<
  string,
  Omit<BaseOrderProductType, 'orderCode'>
>

export const getOrderProductInfo: (
  orderProducts: OrderProductType[],
) => MappedOrderProductType = (orderProducts) => {
  return orderProducts.reduce(
    (acc, { name, productCode, count, price, discount }) => ({
      ...acc,
      [name]: {
        productCode,
        count: (acc[name]?.count || 0) + count,
        price: (acc[name]?.price || 0) + price,
        discount: (acc[name]?.discount || 0) + discount,
      },
    }),
    {} as MappedOrderProductType,
  )
}

export const getDataTotal: (customers: CustomerType[]) => TotalType = (
  customers,
) => {
  return customers.reduce(
    (acc, { parcel, shouldPayPost, isFirstOrder, orderProducts }) => ({
      totalParcel: acc.totalParcel + parcel,
      shouldPayPostCount: acc.shouldPayPostCount + (shouldPayPost ? 1 : 0),
      firstOrderCount: acc.firstOrderCount + (isFirstOrder ? 1 : 0),
      orderProducts: [...acc.orderProducts, ...orderProducts],
    }),
    {
      totalParcel: 0,
      shouldPayPostCount: 0,
      firstOrderCount: 0,
      orderProducts: [],
    } as {
      totalParcel: number
      shouldPayPostCount: number
      firstOrderCount: number
      orderProducts: OrderProductType[]
    },
  )
}

export const getFcfsbList: (
  customers: CustomerType[],
  fcfsBasisCount: number,
) => string[] = (customers, fcfsBasisCount) => {
  return customers
    .slice(0, fcfsBasisCount)
    .map(({ payUser, phone }) => ({
      name: payUser
        .split('')
        .map((c, i) => (i === 1 ? '*' : c))
        .join(''),
      phone: phone
        .split('-')[2]
        .split('')
        .map((c, i) => (i === 3 ? '*' : c))
        .join(''),
    }))
    .map(({ name, phone }) => `${name} (${phone})`)
}
