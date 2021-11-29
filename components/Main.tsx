import React from 'react'
import { Step, useData } from 'components/DataProvider'
import OrderExcelReader from 'components/OrderExcelReader'
import OrderDataViewer from 'components/OrderDataViewer'
import { Box } from '@chakra-ui/react'
import ProductCsvReader from './ProductCsvReader'
import StepNav from './StepNav'

const Main: React.FC = () => {
  const {
    data: { step, productData, orderData },
  } = useData()
  return (
    <Box>
      <StepNav />
      {step === Step.UPLOAD_PRODUCT_DATA && <ProductCsvReader />}
      {step === Step.UPLOAD_ORDER_DATA && <OrderExcelReader />}
      {step === Step.UPLOAD_FINISH && <OrderDataViewer />}
    </Box>
  )
}

export default Main
