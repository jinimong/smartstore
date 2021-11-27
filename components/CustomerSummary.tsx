import React, { useCallback, useMemo, useState } from 'react'
import { useData } from 'components/DataProvider'
import { getDataByCustomer } from 'utils/getData'
import Customer from './CustomerDetail'
import { Box, Button, ButtonGroup, Center } from '@chakra-ui/react'

const CustomerSummary: React.FC = () => {
  const { data } = useData()
  const customers = useMemo(
    () => getDataByCustomer(data).sort((a, b) => (a.key < b.key ? -1 : 1)),
    [data],
  )
  const size = customers.length
  const [step, setStep] = useState(1)
  const goNext = useCallback(
    () => setStep((prev) => Math.min(prev + 1, size)),
    [size],
  )
  const goPrev = useCallback(() => setStep((prev) => Math.max(prev - 1, 1)), [])

  return (
    <div>
      <Center>
        <div>
          <Box>
            {step} / {size}
          </Box>
          <ButtonGroup>
            <Button
              onClick={goPrev}
              onKeyDownCapture={(e) => console.log(1, e)}
            >
              Prev
            </Button>
            <Button onClick={goNext}>Next</Button>
          </ButtonGroup>
        </div>
      </Center>
      <hr />
      <Customer customer={customers[step - 1]} />
    </div>
  )
}

export default CustomerSummary
