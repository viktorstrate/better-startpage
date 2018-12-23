import { toParams, urlFormat } from './helpers'
import { matchBang } from './bangs'

async function googleSuggestions(query) {
  const bangMatch = matchBang(query)
  if (bangMatch) {
    if (bangMatch.name == 'Google') {
      query = bangMatch.query
    } else {
      return null
    }
  }

  let params = toParams({
    q: query,
    client: 'firefox',
  })

  let results = await fetch(
    `http://suggestqueries.google.com/complete/search?${params}`
  )
  results = await results.json()
  results = results[1]

  let items = results.map(item => ({
    name: item,
    onClick: () => {
      location.href = `https://www.google.com/search?q=${urlFormat(item)}`
    },
  }))

  if (items.length > 0) {
    return {
      type: 'suggestions',
      name: 'Google',
      items,
    }
  } else {
    return null
  }
}

export default googleSuggestions
