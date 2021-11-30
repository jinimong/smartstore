import React, { useCallback, useMemo, useState } from 'react'
import { Box, ButtonGroup, Center } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import Customer from 'components/CustomerDetail'
import { useData } from 'components/DataProvider'
import KeyboardButton from 'components/KeyboardButton'
import FcfsBasis from 'components/FcfsBasis'
import { getCustomers } from 'utils/orders'

const CustomerSummary: React.FC = () => {
  const {
    data: { orderData },
  } = useData()

  const customers = useMemo(
    () => getCustomers(orderData).sort((a, b) => (a.key < b.key ? -1 : 1)),
    [orderData],
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
        <Box>
          <FcfsBasis customers={customers} />
          <div>
            <Box textAlign="center">
              {step} / {size}
            </Box>
            <ButtonGroup>
              <KeyboardButton
                callback={goPrev}
                code="ArrowLeft"
                Icon={ChevronLeftIcon}
              />
              <KeyboardButton
                callback={goNext}
                code="ArrowRight"
                Icon={ChevronRightIcon}
              />
            </ButtonGroup>
          </div>
        </Box>
      </Center>
      <hr />
      <Customer customer={customers[step - 1]} order={step} />
    </div>
  )
}

export default CustomerSummary
