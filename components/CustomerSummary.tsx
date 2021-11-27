import React, { useCallback, useMemo, useState } from 'react'
import { Box, ButtonGroup, Center } from '@chakra-ui/react'
import Customer from 'components/CustomerDetail'
import { useData } from 'components/DataProvider'
import KeyboardButton from 'components/KeyboardButton'
import { getDataByCustomer } from 'utils/getData'

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
          <Box textAlign="center">
            {step} / {size}
          </Box>
          <ButtonGroup>
            <KeyboardButton callback={goPrev} keyCode={38}>
              Prev
            </KeyboardButton>
            <KeyboardButton callback={goNext} keyCode={40}>
              Next
            </KeyboardButton>
          </ButtonGroup>
        </div>
      </Center>
      <hr />
      <Customer customer={customers[step - 1]} />
    </div>
  )
}

export default CustomerSummary
