import React from 'react'
import { CheckCircleIcon } from '@chakra-ui/icons'
import { Center, List, ListItem, ListIcon, Text } from '@chakra-ui/react'
import { stepMap, useData } from './DataProvider'

const StepNav: React.FC = () => {
  const {
    data: { step },
  } = useData()
  return (
    <Center>
      <List spacing={3}>
        {Object.entries(stepMap).map(([stepKey, description]) => {
          return (
            <ListItem key={stepKey}>
              <ListIcon
                as={CheckCircleIcon}
                color={
                  Number(stepKey) < (step as number) ? 'green.400' : 'gray.300'
                }
                transition="all .5s ease-in-out"
              />
              <Text as="i">{description}</Text>
              {Number(stepKey) === (step as number) && '(NOW)'}
            </ListItem>
          )
        })}
      </List>
    </Center>
  )
}

export default StepNav
