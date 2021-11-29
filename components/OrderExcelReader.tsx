import React, { useCallback } from 'react'
import XLSX from 'xlsx'
import { Box, Center, useBoolean, useToast } from '@chakra-ui/react'
import { useData } from 'components/DataProvider'
import Dropzone from 'components/Dropzone'
import { OrderType } from 'utils/orders'

function isOrderTypeArray(obj: any): obj is OrderType[] {
  return obj.length === 0 || obj[0]['상품주문번호'] !== undefined
}

const OrderExcelReader: React.FC = () => {
  const { dispatch } = useData()
  const toast = useToast()
  const [loading, { on, off }] = useBoolean(false)

  const onDrop = useCallback(
    (acceptedFiles) => {
      on()
      acceptedFiles.forEach((file: File) => {
        const fileReader = new FileReader()
        fileReader.onload = () => {
          const file = fileReader.result
          const workbook = XLSX.read(file, { type: 'binary' })
          const data = workbook.Sheets[workbook.SheetNames[0]]
          const orders = XLSX.utils.sheet_to_json(data, { range: 1 })
          if (isOrderTypeArray(orders)) {
            dispatch({ type: 'INIT_ORDER', orders })
            toast({
              title: '파일 불러오기 성공 🙂',
              status: 'success',
              duration: 5000,
              isClosable: true,
            })
          } else {
            toast({
              title: '파일 불러오기 실패 🙁',
              description: '엑셀파일이 올바른지 확인해주세요.',
              status: 'error',
              duration: 5000,
              isClosable: true,
            })
          }
          off()
        }
        fileReader.readAsBinaryString(file)
      })
    },
    [dispatch, toast, on, off],
  )

  return (
    <Box>
      <Center>
        <Dropzone
          options={{
            maxFiles: 1,
            multiple: false,
            accept:
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            onDrop,
          }}
          loading={loading}
        />
      </Center>
    </Box>
  )
}

export default OrderExcelReader
