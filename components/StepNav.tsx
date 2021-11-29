import React, { useCallback } from 'react'
import { CheckCircleIcon } from '@chakra-ui/icons'
import { Center, List, ListItem, ListIcon, Text, As } from '@chakra-ui/react'
import { Step, stepMap, useData } from 'components/DataProvider'

const StepNav: React.FC = () => {
  const {
    data: { step },
    dispatch,
  } = useData()
  const handleChangeStep = useCallback(
    (targetStep: Step) => () => {
      dispatch({
        type: 'CHANGE_STEP',
        step: targetStep,
      })
    },
    [dispatch],
  )
  return (
    <Center>
      <List spacing={3} mt={4} fontSize="xl">
        {Array.from(stepMap.entries()).map(([stepKey, description]) => {
          const overStep = (step as number) - Number(stepKey)
          const textProps = {
            ...(overStep === 0 ? { as: 'mark' as As<any> } : {}),
            ...(overStep > 0 ? { as: 's' as As<any> } : {}),
            ...(overStep < 0 ? { color: 'gray.300' } : {}),
          }
          const listItemProps = {
            ...(overStep > 0
              ? {
                  onClick: handleChangeStep(stepKey),
                  cursor: 'pointer',
                }
              : {}),
          }
          return (
            <ListItem
              key={stepKey}
              d="flex"
              alignItems="center"
              {...listItemProps}
            >
              <ListIcon
                as={CheckCircleIcon}
                color={overStep > 0 ? 'green.400' : 'gray.300'}
                transition="all 1.5s ease-in-out"
              />
              <Text {...textProps}>{description}</Text>
            </ListItem>
          )
        })}
      </List>
    </Center>
  )
}

export default StepNav
