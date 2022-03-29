import { CheckIcon, DownloadIcon } from '@chakra-ui/icons'
import React, { useCallback, useState } from 'react'
import { PostReceiptRowType } from 'pages/api/post-receipt'
import {
  useToast,
  IconButton,
  Input,
  InputGroup,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  InputRightElement,
  Tooltip,
  Stack,
} from '@chakra-ui/react'
import XLSX from 'xlsx'
import { useData } from './DataProvider'
import { CustomerType } from 'utils/orders'

const placeholder =
  'https://m.epost.go.kr//ems/mobile.RetrieveMobileRecepitList.parcel?r='

const getNewZipCode = async (address: string) => {
  const response = await fetch(`/api/zipcode?address=${address}`)
  const data = await response.json()
  return data.newZipCode
}

const PostReceipt: React.FC = () => {
  const {
    data: { customers },
  } = useData()
  const toast = useToast()
  const [contents, setContents] = useState<PostReceiptRowType[]>([])
  const loaded = contents.length > 0

  const callApi = useCallback(
    async (href: string) => {
      if (href.length === 0) return
      if (href.startsWith(placeholder))
        try {
          const response = await fetch(`/api/post-receipt?href=${href}`)
          const data = await response.json()

          if (data.contents.length > 0) {
            setContents(data.contents as PostReceiptRowType[])
            toast({
              title: '모바일 영수증 불러오기 성공 🙂',
              status: 'success',
              duration: 5000,
              isClosable: true,
            })
          } else {
            console.log('empty', data)
          }
        } catch (err) {
          toast({
            title: '모바일 영수증 불러오기 실패 🙁',
            description: '모바일 영수증 링크가 올바른지 확인해주세요.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        }
    },
    [toast, setContents],
  )

  const downloadExcel = useCallback(async () => {
    const wb = XLSX.utils.book_new()
    const postUsers = [...customers.filter(({ parcel }) => parcel === 0)]
    postUsers.forEach(async (user) => {
      if (user.zipCode.length > 5) {
        user.zipCode = await getNewZipCode(`${user.address1} ${user.address2}`)
      }
    })

    const postUsersMap: Record<string, CustomerType> = postUsers.reduce(
      async (acc, user) => {
        const zipCode =
          user.zipCode.length > 5
            ? await getNewZipCode(`${user.address1} ${user.address2}`)
            : user.zipCode
        return {
          ...acc,
          [`${user.targetUser}#${zipCode}`]: user,
        }
      },
      {},
    )

    const rows = contents.flatMap(({ postKey, zipCode, name }) => {
      // 준등기, 이름, 우편번호가 같은 유저로 채택
      const key = `${name}#${zipCode}`
      const targetUser = postUsersMap[key]
      return (
        targetUser?.orderProducts.map(({ orderCode }) => [
          orderCode,
          '택배,등기,소포',
          '우편등기',
          postKey,
        ]) || []
      )
    })
    const excelData = XLSX.utils.aoa_to_sheet([
      ['상품주문번호', '배송방법', '택배사', '송장번호'],
      ...rows,
    ])
    XLSX.utils.book_append_sheet(wb, excelData, '발송처리')
    XLSX.writeFile(
      wb,
      `준등기_발송처리_${new Date().toJSON().slice(0, 10)}.xlsx`,
    )
  }, [contents, customers])

  return (
    <>
      <Stack direction="row" alignItems="center" sx={{ gap: '0.5em' }}>
        <InputGroup size="sm">
          <Input
            placeholder={placeholder}
            onChange={(e) => {
              callApi(e.target.value)
            }}
          />
          {loaded && (
            <InputRightElement>
              <CheckIcon color="green.500" />
            </InputRightElement>
          )}
        </InputGroup>
        <Tooltip
          hasArrow
          label="준등기 발송처리 XLSX 파일 받기"
          bg="gray.300"
          color="black"
          isDisabled={!loaded}
        >
          <IconButton
            aria-label="excel-download-btn"
            icon={<DownloadIcon />}
            onClick={downloadExcel}
            disabled={!loaded}
          />
        </Tooltip>
      </Stack>
      {loaded && (
        <Table size="sm" mt={8}>
          <Thead>
            <Tr>
              <Th fontSize="sm" isTruncated>
                등기번호
              </Th>
              <Th fontSize="sm" isTruncated>
                우편번호
              </Th>
              <Th fontSize="sm" isTruncated>
                수취인
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {contents.map(({ postKey, zipCode, name }) => (
              <Tr key={postKey} color="gray.400" fontWeight="bold">
                <Td isTruncated>{postKey}</Td>
                <Td isTruncated>{zipCode}</Td>
                <Td isTruncated>{name}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </>
  )
}

export default PostReceipt
