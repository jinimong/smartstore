import React from 'react'
import { useData } from 'components/DataProvider'
import OrderExcelReader from 'components/OrderExcelReader'
import OrderDataViewer from 'components/OrderDataViewer'
import { Box } from '@chakra-ui/react'

const Main: React.FC = () => {
  const {
    data: { orderData },
  } = useData()
  return (
    <Box>
      {Object.keys(orderData).length > 0 ? (
        <OrderDataViewer />
      ) : (
        <OrderExcelReader />
      )}
    </Box>
  )
}

export default Main
