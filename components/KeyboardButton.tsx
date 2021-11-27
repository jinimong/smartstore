import { Button, ButtonProps } from '@chakra-ui/button'
import React, { useCallback, useEffect } from 'react'

const KeyboardButton: React.FC<
  {
    callback: () => void
    code: string
  } & ButtonProps
> = ({ children, callback, code, ...buttonProps }) => {
  const handleKeydown = useCallback(
    (e) => {
      if (e.code === code) {
        callback()
      }
    },
    [callback, code],
  )
  useEffect(() => {
    window.addEventListener('keydown', handleKeydown, true)
    return () => window.removeEventListener('keydown', handleKeydown, true)
  }, [handleKeydown])
  return (
    <Button {...buttonProps} onClick={callback}>
      {children}
    </Button>
  )
}

export default KeyboardButton
