import { AtSignIcon, PhoneIcon, StarIcon } from '@chakra-ui/icons'
import { List, ListItem, ListIcon } from '@chakra-ui/react'
import { CustomerType } from 'utils/orders'

const CustomerInfo: React.FC<CustomerType> = ({
  payUser,
  targetUser,
  phone,
  address1,
  address2,
}) => (
  <List mx={4} spacing={3}>
    <ListItem>
      <ListIcon as={StarIcon} color="green.400" />
      {payUser}
      {payUser !== targetUser && ` (수취인:${targetUser})`}
    </ListItem>
    <ListItem>
      <ListIcon as={AtSignIcon} color="green.400" />
      {`${address1} ${address2}`}
    </ListItem>
    <ListItem>
      <ListIcon as={PhoneIcon} color="green.400" />
      {phone}
    </ListItem>
  </List>
)

export default CustomerInfo
