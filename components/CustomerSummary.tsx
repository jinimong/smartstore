import React, { useCallback, useMemo, useState } from 'react'
import { useData } from 'components/DataProvider'
import { getDataByCustomer } from 'utils/getData'
import { Button, ButtonGroup } from '@chakra-ui/button'
import { Box, Text } from '@chakra-ui/layout'
import Customer from './CustomerDetail'

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
      <div>
        {step} / {size}
      </div>
      <hr />
      <ButtonGroup>
        <Button onClick={goNext}>Next</Button>
        <Button onClick={goPrev}>Prev</Button>
      </ButtonGroup>
      <Customer customer={customers[step - 1]} />
    </div>
  )
}

export default CustomerSummary
