import React from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  List,
  ListItem,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Switch,
  Tooltip,
  useBoolean,
  useClipboard,
} from '@chakra-ui/react'
import { useCustomerSummary } from 'components/CustomerSummaryProvider'
import { CustomerType, getFcfsbList } from 'utils/orders'

const FcfsBasis: React.FC<{
  customers: CustomerType[]
}> = ({ customers }) => {
  const {
    state: { fcfsBasisCount },
    dispatch,
  } = useCustomerSummary()
  const [mode, { toggle }] = useBoolean(false)
  const fcfsbList = getFcfsbList(customers, fcfsBasisCount)

  const { hasCopied, onCopy } = useClipboard(fcfsbList.join('\n'))
  return (
    <>
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="fcfsb" mb="0">
          선착순
        </FormLabel>
        <Switch id="fcfsb" onChange={toggle} />
      </FormControl>
      {mode && (
        <>
          <NumberInput
            w={24}
            min={1}
            max={customers.length}
            onChange={(value) => {
              dispatch({ type: 'SET_FCFSB_COUNT', value: +value })
            }}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          {fcfsBasisCount > 0 && (
            <Box>
              <Tooltip
                hasArrow
                label={
                  <List>
                    {fcfsbList.map((v) => (
                      <ListItem key={v}>{v}</ListItem>
                    ))}
                  </List>
                }
                bg="gray.300"
                color="black"
              >
                <Button onClick={onCopy} ml={2}>
                  {hasCopied ? 'Copied' : 'Copy'}
                </Button>
              </Tooltip>
              <span>명단 클립보드에 복사하기</span>
            </Box>
          )}
        </>
      )}
    </>
  )
}

export default FcfsBasis
