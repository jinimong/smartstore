import { AtSignIcon, PhoneIcon, StarIcon } from '@chakra-ui/icons'
import { List, ListItem, ListIcon } from '@chakra-ui/react'
import { CustomerType } from 'utils/orders'

export const getCustomerTextInfo = (customer: CustomerType) => {
  const { payUser, targetUser, phone, address } = customer
  return {
    name:
      payUser === targetUser ? payUser : `${payUser} (수취인:${targetUser})`,
    address,
    phone,
  }
}

const highlightedText = (text: string, query: string) => {
  if (query !== '' && text.includes(query)) {
    const parts = text.split(new RegExp(`(${query})`, 'gi'))
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={index}>{part}</mark>
          ) : (
            part
          ),
        )}
      </>
    )
  }
  return text
}

const CustomerInfo: React.FC<{
  customer: CustomerType
  q?: string
}> = ({ customer, q }) => {
  const { name, address, phone } = getCustomerTextInfo(customer)
  return (
    <List mx={4} spacing={3}>
      <ListItem>
        <ListIcon as={StarIcon} color="green.400" />
        {q ? highlightedText(name, q) : name}
      </ListItem>
      <ListItem>
        <ListIcon as={AtSignIcon} color="green.400" />
        {q ? highlightedText(address, q) : address}
      </ListItem>
      <ListItem>
        <ListIcon as={PhoneIcon} color="green.400" />
        {q ? highlightedText(phone, q) : phone}
      </ListItem>
    </List>
  )
}

export default CustomerInfo
