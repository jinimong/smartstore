import type { NextPage } from 'next'
import DataProvider from 'components/DataProvider'
import Main from 'components/Main'

const Home: NextPage = () => {
  return (
    <DataProvider>
      <Main />
    </DataProvider>
  )
}

export default Home
