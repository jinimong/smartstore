// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import cheerio from 'cheerio'

export type PostReceiptRowType = {
  postKey: string
  zipCode: string
  name: string
}

type Data = {
  contents: PostReceiptRowType[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { href } = req.query
  const response = await fetch(href as string)
  const data = await response.text()
  const $ = cheerio.load(data)
  const contents = $('.message_ipt > div > a')

  res.status(200).json({
    contents: Array.from(contents).map((element) => {
      const { next, children } = element as cheerio.TagElement
      const [, zipCode, description] = (next!.data || '')
        .trim()
        .replace(/\s\s+/g, ' ')
        .split(' ')
      return {
        postKey: children[0].data,
        zipCode,
        name: description.split('\n')[0],
      } as PostReceiptRowType
    }),
  })
}
