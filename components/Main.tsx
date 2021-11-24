import React from 'react'
import { useData } from 'components/DataProvider'
import ExcelReader from 'components/ExcelReader'
import DataViewer from 'components/DataViewer'

const Main: React.FC = () => {
  const { data } = useData()
  return Object.keys(data).length > 0 ? <DataViewer /> : <ExcelReader />
}

export default Main
