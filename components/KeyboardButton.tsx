import { Button, ButtonProps } from '@chakra-ui/button'
import React, { useCallback, useEffect } from 'react'

const KeyboardButton: React.FC<
  {
    callback: () => void
    keyCode: number
  } & ButtonProps
> = ({ children, callback, keyCode, ...buttonProps }) => {
  const handleKeydown = useCallback(
    (e) => {
      if (e.keyCode === keyCode) {
        callback()
      }
    },
    [callback, keyCode],
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
