import React from 'react'
import { useData } from 'components/DataProvider'

const CustomerSummary: React.FC = () => {
  const { data } = useData()
  return (
    <div>
      <div>총 {Object.keys(data).length}개의 주문내역</div>
      <hr />
    </div>
  )
}

export default CustomerSummary
