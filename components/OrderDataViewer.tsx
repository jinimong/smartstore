import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/react'
import TotalSummary from 'components/TotalSummary'
import CustomerSummary from 'components/CustomerSummary'
import CustomerSummaryProvider from 'components/CustomerSummaryProvider'

const OrderDataViewer: React.FC = () => {
  return (
    <Box w="5xl" p={4} mx="auto">
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

export default OrderDataViewer
