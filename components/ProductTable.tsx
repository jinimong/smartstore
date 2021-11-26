import { Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/table'
import React from 'react'
import { ProductType } from 'utils/getData'

type Props = {
  products: ProductType[]
}

const ProductTable: React.FC<Props> = ({ products }) => {
  const sum = products.reduce(
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
          <Th>상품</Th>
          <Th isNumeric>판매량</Th>
          <Th isNumeric>매출액</Th>
          <Th isNumeric>할인액</Th>
        </Tr>
      </Thead>
      <Tbody>
        {products.map(({ name, count, price, discount }) => (
          <Tr key={name}>
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
        ))}
        <Tr color="gray.400" fontWeight="bold">
          <Td>전체합계</Td>
          <Td isNumeric>{sum.count}</Td>
          <Td isNumeric>{sum.price}</Td>
          <Td isNumeric>{sum.discount}</Td>
        </Tr>
      </Tbody>
    </Table>
  )
}

export default ProductTable
