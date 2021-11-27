import React, { useMemo } from 'react'
import { useData } from 'components/DataProvider'
import { getDataTotal } from 'utils/orders'
import {
  List,
  ListItem,
  ListIcon,
  Badge,
  Heading,
  Center,
  Box,
  Spacer,
  VStack,
} from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'
import ProductTable from 'components/ProductTable'

const TotalSummary: React.FC = () => {
  const {
    data: { orderData },
  } = useData()
  const { totalParcel, shouldPayPostCount, firstOrderCount, orderProducts } =
    useMemo(() => getDataTotal(orderData), [orderData])

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
              {Object.keys(orderData).length}건
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.400" />
              <Badge variant="outline" colorScheme="green">
                신규 구매자
              </Badge>{' '}
              {firstOrderCount}명
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
          <ProductTable orderProducts={orderProducts} />
        </VStack>
      </Box>
    </Center>
  )
}

export default TotalSummary
