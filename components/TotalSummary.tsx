import React, { useMemo } from 'react'
import { useData } from 'components/DataProvider'
import { getDataTotal } from 'utils/getData'
import {
  List,
  ListItem,
  ListIcon,
  Badge,
  Heading,
  Divider,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Center,
  Box,
  Spacer,
  VStack,
} from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'

const TotalSummary: React.FC = () => {
  const { data } = useData()
  const { totalParcel, shouldPayPostCount, productInfo } = useMemo(
    () => getDataTotal(data),
    [data],
  )
  const sum = Object.values(productInfo).reduce(
    (acc, { count, discount, price }) => ({
      count: acc.count + count,
      discount: acc.discount + discount,
      price: acc.price + price,
    }),
  )

  return (
    <Center>
      <Box minWidth="40rem">
        <VStack minHeight="100%">
          <Heading as="h3" size="lg" mt={8}>
            요약
          </Heading>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.400" />
              <Badge variant="outline" colorScheme="green">
                주문내역
              </Badge>{' '}
              {Object.keys(data).length}건
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.400" />
              <Badge variant="outline" colorScheme="green">
                택배 운송료 합계
              </Badge>{' '}
              {totalParcel}원
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.400" />
              <Badge variant="outline" colorScheme="green">
                준등기비용 지불 누락자
              </Badge>{' '}
              {shouldPayPostCount}명
            </ListItem>
          </List>
          <Spacer />
          <Spacer />
          <Spacer />
          <Spacer />
          <Heading as="h3" size="lg">
            상품별 통계
          </Heading>
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
              <Tr color="green.400" fontWeight="bold">
                <Td>전체합계</Td>
                <Td isNumeric>{sum.count}</Td>
                <Td isNumeric>{sum.price}</Td>
                <Td isNumeric>{sum.discount}</Td>
              </Tr>
              {Object.entries(productInfo).map(
                ([name, { count, price, discount }]) => (
                  <Tr key={name}>
                    <Td>{name}</Td>
                    <Td isNumeric>{count}</Td>
                    <Td isNumeric>{price}</Td>
                    <Td isNumeric>{discount}</Td>
                  </Tr>
                ),
              )}
            </Tbody>
          </Table>
        </VStack>
      </Box>
    </Center>
  )
}

export default TotalSummary
