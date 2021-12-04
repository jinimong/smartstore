const SAFE_IMAGE_URL = 'https://shop-phinf.pstatic.net'
const SMALL_SIZE_SEARCH = 'type=f200'

export const getSafeImageUrl = (url: string) => {
  /**
   * unsafe url: https://shop1.phinf.naver.net/20211102_178/1635862100961jcIOu_JPEG/36997996605200802_1136588921.jpg
   * safe url: https://shop-phinf.pstatic.net/20211102_178/1635862100961jcIOu_JPEG/36997996605200802_1136588921.jpg?type=type=f200
   */
  const { pathname } = new URL(url)
  return `${SAFE_IMAGE_URL}${pathname}?${SMALL_SIZE_SEARCH}`
}
