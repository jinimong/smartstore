import { SearchIcon } from '@chakra-ui/icons'
import React, { useState } from 'react'
import { useData } from './DataProvider'
import { PostReceiptRowType } from 'pages/api/post-receipt'
import { useToast, IconButton, Input, InputGroup } from '@chakra-ui/react'

const PostReceipt: React.FC = () => {
  const [href, setHref] = useState('')
  const {
    data: { postReceiptContents },
    dispatch,
  } = useData()
  const toast = useToast()

  const disabled = href.length === 0
  const callApi = async () => {
    if (disabled) return
    try {
      const response = await fetch(`/api/post-receipt?href=${href}`)
      const data = await response.json()

      if (data.contents.length > 0) {
        dispatch({
          type: 'INIT_POST_RECEIPT_CONTENTS',
          contents: data.contents as PostReceiptRowType[],
        })
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
  }
  return (
    <InputGroup size="sm">
      <IconButton
        aria-label="api"
        as={SearchIcon}
        onClick={callApi}
        disabled={disabled}
      />
      <Input
        placeholder="https://m.epost.go.kr//ems/mobile.RetrieveMobileRecepitList.parcel?r="
        onChange={(e) => {
          setHref(e.target.value)
        }}
      />
    </InputGroup>
  )
}

export default PostReceipt
