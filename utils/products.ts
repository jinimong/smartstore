export type ProductType = {
  ['상품번호(스마트스토어)']: number
  ['상품명']: string
  ['판매가']: number
  ['할인가(PC)']: number
  ['판매자즉시할인(PC)']: string
  ['할인가(모바일)']: number
  ['판매자즉시할인(모바일)']: string
  ['옵션']: string
  ['대분류']: string
  ['중분류']: string
  ['소분류']: string
  ['세분류']: string
  ['대표이미지 URL']: string
  ['상품등록일']: number
  ['최종수정일']: number
}

export type MappedProductType = Record<string, ProductType>
