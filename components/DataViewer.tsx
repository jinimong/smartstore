import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/react'
import DataResetButton from 'components/DataResetButton'
import TotalSummary from 'components/TotalSummary'
import CustomerSummary from 'components/CustomerSummary'
import CustomerSummaryProvider from 'components/CustomerSummaryProvider'

const DataViewer: React.FC = () => {
  return (
    <Box w="5xl" p={4} mx="auto">
      <Box position="absolute" top={4} right={4}>
        <DataResetButton />
      </Box>
      <Tabs isFitted variant="enclosed">
        <TabList>
          <Tab>전체 통계</Tab>
          <Tab>구매자별 요약</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <TotalSummary />
          </TabPanel>
          <TabPanel>
            <CustomerSummaryProvider>
              <CustomerSummary />
            </CustomerSummaryProvider>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default DataViewer
