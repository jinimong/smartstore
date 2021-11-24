import React from 'react'
import { useData } from 'components/DataProvider'
import { Button } from '@chakra-ui/react'

const DataViewer: React.FC = () => {
  const { data, dispatch } = useData()
  return (
    <div>
      <Button onClick={() => dispatch({ type: 'INITIALIZE', dataList: [] })}>
        데이터 다시 불러오기
      </Button>
      <div>총 {Object.keys(data).length}개의 주문내역</div>
    </div>
  )
}

export default DataViewer
