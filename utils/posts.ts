import XLSX from 'xlsx'
import { CustomerType } from 'utils/orders'

export const headers = [
  '받는 분',
  '우편번호',
  '주소(시도+시군구+도로명+건물번호)',
  '상세주소(동, 호수, 洞명칭, 아파트, 건물명 등)',
  '휴대전화(010-1234-5678)',
]

export const getPostData = (custormers: CustomerType[]) =>
  custormers.map(({ targetUser, zipCode, address1, address2, targetPhone }) => [
    targetUser,
    zipCode,
    address1,
    address2,
    targetPhone,
  ])

export const downloadPostExcelFile = (rows: string[][]) => () => {
  if (rows.length === 0) {
    return
  }

  const wb = XLSX.utils.book_new()
  const excelData = XLSX.utils.aoa_to_sheet([headers, ...rows])
  XLSX.utils.book_append_sheet(wb, excelData, '발주발송관리')
  XLSX.writeFile(wb, `준등기_사전접수_${new Date().toJSON().slice(0, 10)}.xlsx`)
}
