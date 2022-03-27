import React, { useCallback } from 'react'
import {
  Box,
  FormControl,
  FormLabel,
  IconButton,
  List,
  ListItem,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Switch,
  Text,
  Tooltip,
  useBoolean,
  useClipboard,
} from '@chakra-ui/react'
import { CopyIcon } from '@chakra-ui/icons'
import { useCustomerSummary } from 'components/CustomerSummaryProvider'
import { getFcfsbList } from 'utils/orders'
import { useData } from 'components/DataProvider'

const FcfsBasis: React.FC = () => {
  const {
    data: { customers },
  } = useData()
  const {
    state: { fcfsBasisCount },
    dispatch,
  } = useCustomerSummary()
  const [mode, setMode] = useBoolean(fcfsBasisCount > 0)
  const handleSwitch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { checked } = event.target
      if (checked) {
        dispatch({ type: 'SET_FCFSB_COUNT', value: 1 })
        setMode.on()
      } else {
        dispatch({ type: 'SET_FCFSB_COUNT', value: 0 })
        setMode.off()
      }
    },
    [setMode, dispatch],
  )
  const fcfsbList = getFcfsbList(customers, fcfsBasisCount)

  const { hasCopied, onCopy } = useClipboard(fcfsbList.join('\n'))
  return (
    <>
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="fcfsb" mb="0">
          선착순
        </FormLabel>
        <Switch id="fcfsb" defaultChecked={mode} onChange={handleSwitch} />
      </FormControl>
      {mode && (
        <Box d="flex" alignItems="center" mt={4}>
          <NumberInput
            w={24}
            min={1}
            max={customers.length}
            value={fcfsBasisCount}
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
            <Box ml={2}>
              <Tooltip
                hasArrow
                label={
                  <List>
                    {fcfsbList.slice(0, 10).map((v) => (
                      <ListItem key={v}>{v}</ListItem>
                    ))}
                    {fcfsbList.length > 10 && <ListItem>...</ListItem>}
                  </List>
                }
                bg="gray.300"
                color="black"
              >
                <IconButton
                  aria-label="copy-btn"
                  icon={<CopyIcon />}
                  onClick={onCopy}
                  disabled={hasCopied}
                />
              </Tooltip>
            </Box>
          )}
          <Text ml={4}>
            {hasCopied ? '복사완료 😎' : '클립보드에 복사하기'}
          </Text>
        </Box>
      )}
    </>
  )
}

export default FcfsBasis
