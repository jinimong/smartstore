import { Badge, Box } from '@chakra-ui/layout'
import React from 'react'
import { CustomerType } from 'utils/orders'
import ProductTable from 'components/ProductTable'
import { Tooltip } from '@chakra-ui/react'
import { useCustomerSummary } from './CustomerSummaryProvider'
import CustomerInfo from './CustomerInfo'

type Props = { customer: CustomerType; order: number }

const Customer: React.FC<Props> = ({ customer, order }) => {
  const { parcel, isFirstOrder, shouldPayPost, orderProducts } = customer
  const {
    state: { fcfsBasisCount },
  } = useCustomerSummary()
  const isFcfsBasis = order <= fcfsBasisCount
  return (
    <Box mt={4} p={8} borderRadius="xl" boxShadow="xl" fontSize="lg">
      <CustomerInfo {...customer} />
      <Box mx={4} d="flex" justifyContent="flex-end" sx={{ gap: 4 }}>
        {parcel > 0 ? (
          <Tooltip hasArrow label={`${parcel}원`} bg="gray.300" color="black">
            <Badge variant="outline" colorScheme="green">
              택배
            </Badge>
          </Tooltip>
        ) : (
          <Tooltip
            hasArrow
            label="준등기발송 상품을 구매하지 않았어요! 😔"
            bg="gray.300"
            color="black"
            isDisabled={!shouldPayPost}
          >
            <Badge
              variant="outline"
              colorScheme={shouldPayPost ? 'red' : 'green'}
            >
              준등기
            </Badge>
          </Tooltip>
        )}
        {isFirstOrder && (
          <Badge variant="outline" colorScheme="green">
            첫주문
          </Badge>
        )}
        {isFcfsBasis && (
          <Badge variant="outline" colorScheme="green">
            선착순#{order}
          </Badge>
        )}
      </Box>
      <Box mt={4}>
        <ProductTable orderProducts={orderProducts} />
      </Box>
    </Box>
  )
}

export default Customer
