import React, { useCallback, useState } from 'react'
import { Box, ButtonGroup, Input, Spacer, Stack } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import Customer from 'components/CustomerDetail'
import { useData } from 'components/DataProvider'
import KeyboardButton from 'components/KeyboardButton'
import CustomerMenu from 'components/CustomerMenu'
import CustomerInfo, { getCustomerTextInfo } from './CustomerInfo'

const CustomerSummary: React.FC = () => {
  const {
    data: { customers },
  } = useData()

  const size = customers.length
  const [step, setStep] = useState(1)
  const [q, setQ] = useState('')
  const goNext = useCallback(
    () => setStep((prev) => Math.min(prev + 1, size)),
    [size],
  )
  const goPrev = useCallback(() => setStep((prev) => Math.max(prev - 1, 1)), [])

  return (
    <div>
      <Box
        w="100%"
        gridGap={6}
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Input
          w={300}
          placeholder="이름 / 주소 / 연락처 검색"
          textAlign="center"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <CustomerMenu />
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
      </Box>
      <Spacer />
      {q.length > 0 ? (
        <Stack direction="column" alignItems="left">
          {customers
            .map((customer) => ({
              text: Array.from(
                Object.values(getCustomerTextInfo(customer)),
              ).join('\n'),
              customer,
            }))
            .filter(({ text }) => text.includes(q))
            .map(({ customer }) => (
              <Box
                key={customer.key}
                mt={4}
                p={8}
                borderRadius="xl"
                boxShadow="xl"
                fontSize="lg"
              >
                <CustomerInfo customer={customer} q={q} />
              </Box>
            ))}
        </Stack>
      ) : (
        <Customer customer={customers[step - 1]} order={step} />
      )}
    </div>
  )
}

export default CustomerSummary
