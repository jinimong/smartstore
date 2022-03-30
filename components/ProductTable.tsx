import {
  Box,
  Img,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Select,
} from '@chakra-ui/react'
import React, { useState } from 'react'
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
  const [orderType, setOrderType] = useState('date')
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
          <Th>
            <Select
              value={orderType}
              size="xs"
              onChange={(e) => {
                setOrderType(e.target.value)
              }}
            >
              <option value="count">판매량 순</option>
              <option value="date">신상품 순</option>
            </Select>
          </Th>
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
        {Object.entries(orderProductInfo)
          .sort((a, b) => {
            switch (orderType) {
              case 'count': {
                return b[1].count - a[1].count
              }
              case 'date': {
                return (
                  productData[b[1].productCode]['최종수정일'] -
                  productData[a[1].productCode]['최종수정일']
                )
              }
              default: {
                return 0
              }
            }
          })
          .map(([name, { productCode, count, price, discount }]) => (
            <Tr key={name}>
              <Td>
                <Box w={50} h={50} bg="green.100">
                  {productData[productCode] && (
                    <Img
                      src={productData[productCode]['대표이미지 URL']}
                      boxSize="50px"
                      objectFit="cover"
                      alt={name}
                      sx={{
                        '&:hover': {
                          transform: 'scale(4)',
                          transition: 'all .1s ease-in-out',
                        },
                      }}
                    />
                  )}
                </Box>
              </Td>
              <Td>{name}</Td>
              <Td
                isNumeric
                {...(count > 1
                  ? {
                      color: 'red.400',
                      fontWeight: 'bold',
                    }
                  : {})}
              >
                {count}
              </Td>
              <Td isNumeric>{price}</Td>
              <Td isNumeric>{discount}</Td>
            </Tr>
          ))}
      </Tbody>
    </Table>
  )
}

export default ProductTable
