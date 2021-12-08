import React, { useState } from 'react'
import {
  Box,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  IconButton,
  Stack,
  Tooltip,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@chakra-ui/react'
import { DownloadIcon } from '@chakra-ui/icons'
import { useData } from './DataProvider'
import { getPostData, headers, downloadPostExcelFile } from 'utils/posts'
import PostReceipt from './PostReceipt'

const PostManager: React.FC = () => {
  const [value, setValue] = useState<number>(0)
  const {
    data: { customers },
  } = useData()
  const postCustomers = customers.filter(({ parcel }) => parcel === value)
  const rows = getPostData(postCustomers)
  return (
    <Box>
      <Box d="flex" justifyContent="space-between" alignItems="center">
        <Stack direction="row" alignItems="center" sx={{ gap: '0.5em' }}>
          <>배송비 합계가</>
          <NumberInput
            w={24}
            min={0}
            value={value}
            onChange={(value) => setValue(Number(value))}
            step={100}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <>원인 경우</>
        </Stack>
        <Tooltip
          hasArrow
          label="준등기 사전접수 XLSX 파일 받기"
          bg="gray.300"
          color="black"
          isDisabled={rows.length === 0}
        >
          <IconButton
            aria-label="excel-download-btn"
            icon={<DownloadIcon />}
            onClick={downloadPostExcelFile(rows)}
            disabled={rows.length === 0}
          />
        </Tooltip>
      </Box>
      <PostReceipt />
      <Table size="sm" mt={8}>
        <Thead>
          <Tr>
            {headers.map((header) => (
              <Th fontSize="sm" isTruncated key={header}>
                {header}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {rows.map(
            ([targetUser, zipCode, address1, address2, targetPhone]) => (
              <Tr
                key={targetUser + targetPhone}
                color="gray.400"
                fontWeight="bold"
              >
                <Td isTruncated>{targetUser}</Td>
                <Td isTruncated>{zipCode}</Td>
                <Td isTruncated>{address1}</Td>
                <Td isTruncated>{address2}</Td>
                <Td isTruncated>{targetPhone}</Td>
              </Tr>
            ),
          )}
        </Tbody>
      </Table>
    </Box>
  )
}

export default PostManager
