import React, { useCallback, useState } from 'react'
import { Box, ButtonGroup, Center } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import Customer from 'components/CustomerDetail'
import { useData } from 'components/DataProvider'
import KeyboardButton from 'components/KeyboardButton'
import CustomerMenu from 'components/CustomerMenu'

const CustomerSummary: React.FC = () => {
  const {
    data: { customers },
  } = useData()

  const size = customers.length
  const [step, setStep] = useState(1)
  const goNext = useCallback(
    () => setStep((prev) => Math.min(prev + 1, size)),
    [size],
  )
  const goPrev = useCallback(() => setStep((prev) => Math.max(prev - 1, 1)), [])

  return (
    <div>
      <CustomerMenu />
      <Center>
        <Box>
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
