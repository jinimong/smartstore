import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/react'
import DataResetButton from 'components/DataResetButton'
import TotalSummary from 'components/TotalSummary'
import CustomerSummary from 'components/CustomerSummary'
import CustomerSummaryProvider from 'components/CustomerSummaryProvider'

const DataViewer: React.FC = () => {
  return (
    <Box position="relative">
      <Box position="absolute" top={0} right={0}>
        <DataResetButton />
      </Box>
      <Tabs>
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
