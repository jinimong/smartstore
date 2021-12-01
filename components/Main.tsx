import React from 'react'
import { Step, useData } from 'components/DataProvider'
import OrderExcelReader from 'components/OrderExcelReader'
import OrderDataViewer from 'components/OrderDataViewer'
import { Box, Text } from '@chakra-ui/react'
import ProductCsvReader from './ProductCsvReader'
import StepNav from './StepNav'

const Main: React.FC = () => {
  const {
    data: { step },
  } = useData()
  return (
    <Box>
      <Text
        bgGradient="linear(to-r, lightgray, green.400)"
        bgClip="text"
        fontSize="6xl"
        fontWeight="extrabold"
        textAlign="center"
      >
        스마트스토어
      </Text>
      <StepNav />
      {step === Step.UPLOAD_PRODUCT_DATA && <ProductCsvReader />}
      {step === Step.UPLOAD_ORDER_DATA && <OrderExcelReader />}
      {step === Step.UPLOAD_FINISH && <OrderDataViewer />}
    </Box>
  )
}

export default Main
