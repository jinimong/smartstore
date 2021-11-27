import React from 'react'
import { useData } from 'components/DataProvider'
import { Button } from '@chakra-ui/react'

const OrderDataResetButton: React.FC = () => {
  const { dispatch } = useData()
  return (
    <Button onClick={() => dispatch({ type: 'INIT_ORDER', orders: [] })}>
      데이터 다시 불러오기
    </Button>
  )
}

export default OrderDataResetButton
