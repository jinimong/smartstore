import { Box, Img, Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react'
import React from 'react'
import { getOrderProductInfo, OrderProductType } from 'utils/orders'
import { useData } from 'components/DataProvider'

type Props = {
  orderProducts: OrderProductType[]
}

const ProductTable: React.FC<Props> = ({ orderProducts }) => {
  const orderProductInfo = getOrderProductInfo(orderProducts)
  const {
    data: { productData },
  } = useData()
  const sum = Object.values(orderProductInfo).reduce(
    (acc, { count, discount, price }) => ({
      count: acc.count + count,
      discount: acc.discount + discount,
      price: acc.price + price,
    }),
    {
      count: 0,
      discount: 0,
      price: 0,
    },
  )
  return (
    <Table size="sm">
      <Thead>
        <Tr>
          <Th></Th>
          <Th>상품</Th>
          <Th isNumeric>판매량</Th>
          <Th isNumeric>매출액</Th>
          <Th isNumeric>할인액</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr color="gray.400" fontWeight="bold">
          <Td></Td>
          <Td>전체합계</Td>
          <Td isNumeric>{sum.count}</Td>
          <Td isNumeric>{sum.price}</Td>
          <Td isNumeric>{sum.discount}</Td>
        </Tr>
        {Object.entries(orderProductInfo).map(
          ([name, { productCode, count, price, discount }]) => (
            <Tr key={name}>
              <Td>
                {productData[productCode] ? (
                  <Img
                    src={productData[productCode]['대표이미지 URL']}
                    boxSize="50px"
                    objectFit="cover"
                    alt={name}
                  />
                ) : (
                  <Box w={50} h={50} bg="green.100" />
                )}
              </Td>
              <Td>{name}</Td>
              <Td
                isNumeric
                {...(count > 1
                  ? {
                      color: 'green.400',
                      fontWeight: 'bold',
                    }
                  : {})}
              >
                {count}
              </Td>
              <Td isNumeric>{price}</Td>
              <Td isNumeric>{discount}</Td>
            </Tr>
          ),
        )}
      </Tbody>
    </Table>
  )
}

export default ProductTable
