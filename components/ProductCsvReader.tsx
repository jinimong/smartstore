import React, { useCallback } from 'react'
import XLSX from 'xlsx'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Center,
  Link,
  Text,
  useBoolean,
  useToast,
} from '@chakra-ui/react'
import { LinkIcon, QuestionIcon } from '@chakra-ui/icons'
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
      <Box w="40%">
        <Box w="full" my={8} p={4} rounded="lg" position="relative">
          <QuestionIcon
            color="green.300"
            bg="white"
            fontSize="xl"
            mb={4}
            position="absolute"
            top={0}
            left={0}
          />
          <Accordion allowMultiple>
            <AccordionItem>
              <AccordionButton
                _expanded={{ color: 'green.300', fontWeight: 'bold' }}
              >
                <Box flex="1" textAlign="left">
                  상품목록 CSV 파일은 어디서 다운받나요?
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Link
                  isExternal
                  href="https://help.sell.smartstore.naver.com/faq/search.help?categoryId=0&searchKeyword=%EC%83%81%ED%92%88%EC%9D%98+%EC%A0%95%EB%B3%B4%EB%A5%BC+%EC%97%91%EC%85%80"
                >
                  <Box d="flex" alignItems="center">
                    <LinkIcon />
                    <Text pt={1} ml={1}>
                      스마트스토어 FAQ 바로가기
                    </Text>
                  </Box>
                </Link>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
        <Dropzone
          options={{
            maxFiles: 1,
            multiple: false,
            accept: 'text/csv',
            onDrop,
          }}
          loading={loading}
        />
      </Box>
    </Center>
  )
}

export default ProductCsvReader
