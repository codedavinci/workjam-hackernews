export const ENDPOINT: string = `https://hacker-news.firebaseio.com/v0`

export const fetchItem = async (itemid: number) => {
  let res = await fetch(`${ENDPOINT}/item/${itemid}.json`)
  let data = await res.json()

  return data
}