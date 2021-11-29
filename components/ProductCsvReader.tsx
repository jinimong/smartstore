import React, { useCallback } from 'react'
import XLSX from 'xlsx'
import { Center, useBoolean, useToast } from '@chakra-ui/react'
import { useData } from 'components/DataProvider'
import Dropzone from 'components/Dropzone'
import { ProductType } from 'utils/products'

function isProductTypeArray(obj: any): obj is ProductType[] {
  return obj.length === 0 || obj[0]['상품번호(스마트스토어)'] !== undefined
}

const ProductCsvReader: React.FC = () => {
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
          const products = XLSX.utils.sheet_to_json(data, { range: 0 })
          if (isProductTypeArray(products)) {
            dispatch({ type: 'INIT_PRODUCT', products })
            toast({
              title: '파일 불러오기 성공 🙂',
              status: 'success',
              duration: 5000,
              isClosable: true,
            })
          } else {
            toast({
              title: '파일 불러오기 실패 🙁',
              description: 'CSV파일이 올바른지 확인해주세요.',
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
    <Center>
      <Dropzone
        options={{
          maxFiles: 1,
          multiple: false,
          accept: '.csv',
          onDrop,
        }}
        loading={loading}
      />
    </Center>
  )
}

export default ProductCsvReader
