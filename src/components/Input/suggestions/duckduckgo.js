import { toParams, urlFormat } from './helpers'
import { matchBang } from './bangs'

async function duckduckgo(query) {
  let bang = matchBang(query)

  if (!bang || bang.name != 'DuckDuckGo') {
    return null
  }

  query = bang.query
  if (!query) {
    return null
  }

  console.log('query duckduckgo', query)
  let params = toParams({
    q: query,
    callback: 'autocompleteCallback',
  })

  let results = await fetch(`https://duckduckgo.com/ac/?${params}`)

  results = await results.text()
  results = JSON.parse(results.match(/autocompleteCallback\((.*)+\)/)[1])
  console.log('dd results', results)

  let items = results.slice(0, 5).map(item => ({
    name: item.phrase,
    onClick: () => {
      location.href = `https://duckduckgo.com/?q=${urlFormat(item.phrase)}`
    },
  }))

  if (items.length > 0) {
    return {
      type: 'suggestions',
      name: 'DuckDuckGo',
      items,
    }
  } else {
    return null
  }
}

export default duckduckgo
