import { toParams, urlFormat } from './helpers'

async function youtube(query) {
  query = query.match(/(!?yt|youtube)\s(.+)/)
  if (!query) {
    return null
  }

  query = query[2]

  console.log('query youtube', query)
  let params = toParams({
    q: query,
    ds: 'yt',
    client: 'youtube',
  })

  let results = await fetch(
    `http://suggestqueries.google.com/complete/search?${params}`
  )

  results = await results.text()
  results = JSON.parse(results.match(/window\.google\.ac\.h\((.*)+\)/)[1])
  console.log('yt results', results)
  results = results[1]

  let items = results.slice(0, 5).map(item => ({
    name: item[0],
    onClick: () => {
      location.href = `https://www.youtube.com/results?search_query=${urlFormat(
        item[0]
      )}`
    },
  }))

  if (items.length > 0) {
    return {
      type: 'suggestions',
      name: 'Youtube',
      items,
    }
  } else {
    return null
  }
}

export default youtube
