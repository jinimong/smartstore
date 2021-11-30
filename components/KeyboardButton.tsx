import { Button, ButtonProps, IconButton } from '@chakra-ui/button'
import { ComponentWithAs, IconProps } from '@chakra-ui/react'
import React, { useCallback, useEffect } from 'react'

const KeyboardButton: React.FC<
  {
    callback: () => void
    code: string
    Icon?: ComponentWithAs<'svg', IconProps>
  } & ButtonProps
> = ({ children, callback, code, Icon, ...buttonProps }) => {
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

  if (Icon) {
    return <IconButton aria-label={code} onClick={callback} icon={<Icon />} />
  }

  return (
    <Button {...buttonProps} onClick={callback}>
      {children}
    </Button>
  )
}

export default KeyboardButton
