import React, { useCallback } from 'react'
import { Input } from '@chakra-ui/input'
import { Box, Text } from '@chakra-ui/layout'
import XLSX from 'xlsx'
import { Center, useToast } from '@chakra-ui/react'
import { useData, DataType } from 'components/DataProvider'

function isDataTypeArray(obj: any): obj is DataType[] {
  return obj.length === 0 || obj[0]['상품주문번호'] !== undefined
}

const ExcelReader: React.FC = () => {
  const { dispatch } = useData()
  const toast = useToast()

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement
      const files = target.files as FileList

      if (files.length > 0) {
        const fileReader = new FileReader()
        fileReader.onload = () => {
          const file = fileReader.result
          const workbook = XLSX.read(file, { type: 'binary' })
          const data = workbook.Sheets[workbook.SheetNames[0]]
          const dataList = XLSX.utils.sheet_to_json(data, { range: 1 })
          if (isDataTypeArray(dataList)) {
            dispatch({ type: 'INITIALIZE', dataList })
          } else {
            toast({
              title: '파일 불러오기 실패',
              description: '엑셀파일이 올바른지 확인해주세요. 🙁',
              status: 'error',
              duration: 5000,
              isClosable: true,
            })
          }
        }
        fileReader.readAsBinaryString(files[0])
      }
    },
    [dispatch, toast],
  )

  return (
    <Center h="100vh">
      <Box>
        <Text align="center">upload excel file</Text>
        <Input type="file" accept=".xlsx" onChange={handleOnChange} />
      </Box>
    </Center>
  )
}

export default ExcelReader
