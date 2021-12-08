import { InputGroup, Input } from '@chakra-ui/input'
import { Button, ButtonProps, IconButton } from '@chakra-ui/button'
import { SearchIcon } from '@chakra-ui/icons'
import React, { useState } from 'react'

const PostReceipt: React.FC = () => {
  const [href, setHref] = useState('')
  const disabled = href.length === 0
  const callApi = async () => {
    if (disabled) return
    try {
      const response = await fetch(`/api/post-receipt?href=${href}`)
      const data = await response.json()
      console.log(data)
    } catch (err) {
      console.log(err)
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
