import React, { useCallback } from 'react'
import { Box, VStack, Text, Spacer, Flex } from '@chakra-ui/layout'
import XLSX from 'xlsx'
import {
  Center,
  CircularProgress,
  useBoolean,
  useToast,
} from '@chakra-ui/react'
import { useData, DataType } from 'components/DataProvider'
import { useDropzone } from 'react-dropzone'

function isDataTypeArray(obj: any): obj is DataType[] {
  return obj.length === 0 || obj[0]['상품주문번호'] !== undefined
}

function getFileSize(number: number) {
  if (number < 1024) {
    return number + 'bytes'
  } else if (number >= 1024 && number < 1048576) {
    return (number / 1024).toFixed(1) + 'KB'
  } else if (number >= 1048576) {
    return (number / 1048576).toFixed(1) + 'MB'
  }
}

const ExcelReader: React.FC = () => {
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
          const dataList = XLSX.utils.sheet_to_json(data, { range: 1 })
          if (isDataTypeArray(dataList)) {
            dispatch({ type: 'INITIALIZE', dataList })
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

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    maxFiles: 1,
    multiple: false,
    accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    onDrop,
  })
  let borderColor = '#eee'
  if (isDragAccept) {
    borderColor = '#00e676'
  } else if (isDragReject) {
    borderColor = '#ff1744'
  }

  return (
    <Center h="100vh">
      <VStack position="relative">
        <Box
          m={4}
          p={16}
          width="50vw"
          height="30vh"
          cursor="pointer"
          borderWidth={2}
          borderStyle="dashed"
          borderColor={borderColor}
          borderRadius={8}
          transition="border .24s ease-in-out"
          {...getRootProps({ className: 'dropzone' })}
        >
          <Center height="100%" fontSize="1.5rem">
            <input {...getInputProps()} />
            {isDragReject ? (
              <Text>{`파일이 올바르지 않은 것 같아요. 🤥`}</Text>
            ) : (
              <Text>{`파일을 Drag & Drop 해주세요. 💁‍♂️`}</Text>
            )}
          </Center>
        </Box>
        {acceptedFiles.length > 0 && (
          <Text position="absolute" bottom={-10}>
            {acceptedFiles[0].name} - {getFileSize(acceptedFiles[0].size)}
          </Text>
        )}
        {loading && (
          <Flex position="absolute" bottom={-20} w="140px" alignItems="center">
            <Text fontSize="lg">파일 분석 중..</Text>
            <Spacer />
            <CircularProgress size={8} isIndeterminate />
          </Flex>
        )}
      </VStack>
    </Center>
  )
}

export default ExcelReader
