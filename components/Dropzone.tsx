import {
  Box,
  Center,
  CircularProgress,
  Flex,
  Spacer,
  VStack,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import { useDropzone, DropzoneOptions } from 'react-dropzone'

function getFileSize(number: number) {
  if (number < 1024) {
    return number + 'bytes'
  } else if (number >= 1024 && number < 1048576) {
    return (number / 1024).toFixed(1) + 'KB'
  } else if (number >= 1048576) {
    return (number / 1048576).toFixed(1) + 'MB'
  }
}

const Dropzone: React.FC<{
  options: DropzoneOptions
  loading: boolean
}> = ({ options, loading }) => {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
  } = useDropzone(options)
  let borderColor = '#eee'
  if (isDragAccept) {
    borderColor = '#00e676'
  } else if (isDragReject) {
    borderColor = '#ff1744'
  }

  return (
    <VStack position="relative">
      <Box
        m={4}
        p={16}
        width="full"
        height="30vh"
        cursor="pointer"
        borderWidth={4}
        borderStyle="dashed"
        borderColor={borderColor}
        borderRadius={8}
        transition="border .24s ease-in-out"
        sx={{
          '&:hover': { backgroundColor: 'green.100' },
        }}
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
  )
}

export default Dropzone
