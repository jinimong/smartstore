import { useClipboard, useToast } from '@chakra-ui/react'
import { useEffect } from 'react'

const CopyClipboardText: React.FC = ({ children }) => {
  const text = children?.toString() || ''
  const { hasCopied, onCopy } = useClipboard(text)
  const toast = useToast()
  useEffect(() => {
    if (hasCopied) {
      toast({
        title: `복사완료 😎 : "${text}"`,
        status: 'success',
        duration: 1000,
        isClosable: true,
      })
    }
  }, [hasCopied, toast, text])

  return (
    <span style={{ cursor: 'pointer' }} onClick={onCopy}>
      {children}
    </span>
    // hasCopied ? '복사완료 😎' :
  )
}

export default CopyClipboardText
