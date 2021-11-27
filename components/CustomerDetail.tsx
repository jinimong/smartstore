import { Badge, Box, List, ListIcon, ListItem } from '@chakra-ui/layout'
import React from 'react'
import { CustomerType } from 'utils/orders'
import ProductTable from 'components/ProductTable'
import { AtSignIcon, PhoneIcon, StarIcon } from '@chakra-ui/icons'
import { Tooltip } from '@chakra-ui/react'

type Props = { customer: CustomerType }

const Customer: React.FC<Props> = ({
  customer: {
    payUser,
    targetUser,
    phone,
    address,
    parcel,
    isFirstOrder,
    shouldPayPost,
    orderProducts,
  },
}) => {
  return (
    <Box mt={4} p={8} borderRadius="xl" boxShadow="xl" fontSize="lg">
      <List mx={4} spacing={3}>
        <ListItem>
          <ListIcon as={StarIcon} color="green.400" />
          {payUser}
          {payUser !== targetUser && ` (수취인:${targetUser})`}
        </ListItem>
        <ListItem>
          <ListIcon as={AtSignIcon} color="green.400" />
          {address}
        </ListItem>
        <ListItem>
          <ListIcon as={PhoneIcon} color="green.400" />
          {phone}
        </ListItem>
      </List>

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
      </Box>
      <Box mt={4}>
        <ProductTable orderProducts={orderProducts} />
      </Box>
    </Box>
  )
}

export default Customer
