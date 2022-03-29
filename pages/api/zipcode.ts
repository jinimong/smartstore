// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import cheerio from 'cheerio'

type Data = {
  newZipCode?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { address } = req.query
  const q = encodeURI(address as string)
  const response = await fetch(
    `https://postcode.map.daum.net/search?region_name=${q}&cq=${q}&cpage=1&origin=https%3A%2F%2Fpostcode.map.daum.net&isp=N&isgr=N&isgj=N&banner=on&ubl=on&indaum=off&vt=layer&amr=on&amj=on&ani=on&mode=view&sd=on&fi=off&fc=on&hmb=off&heb=off&asea=off&smh=off&zo=on&plrgt=1.5&us=on&msi=10&ahs=off&whas=500&zn=Y&sm=on&CWinWidth=400&fullpath=%2Fguide&a51=off`,
  )
  const data = await response.text()
  const $ = cheerio.load(data)
  const contents = $('.txt_postcode')
  const newZipCode = (contents[0] as cheerio.TagElement).children[0].data

  res.status(200).json({
    newZipCode,
  })
}
