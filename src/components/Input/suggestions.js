import bangsSuggestions, { searchTrigger } from './suggestions/bangs'
import google from './suggestions/google'
import youtube from './suggestions/youtube'
import calculations from './suggestions/calculations'

import { urlFormat } from './suggestions/helpers'

export function hookSuggestions(query, update) {
  let pendingResults = []
  // let finishedResults = []

  pendingResults = [
    bangsSuggestions(query),
    calculations(query),
    youtube(query),
    google(query),
  ]

  if (pendingResults.filter(x => x != undefined).length == 0) {
    console.log('updating empty')
    update([])
  } else {
    Promise.all(pendingResults)
      .then(finishedResults => {
        update(finishedResults.filter(x => x != undefined))
      })
      .catch(err => {
        console.log('Something went wrong', err)
      })
  }
}

export function followQuery(query) {
  let match = query.match(/!([a-zA-Z]+)\s(.+)/)
  let url

  if (match) {
    let bang = searchTrigger(match[1])

    if (bang) {
      url = bang.url.replace('%query%', urlFormat(match[2]))
    }
  } else {
    url = 'https://www.google.com/search?q=' + urlFormat(query)
  }

  location.href = url
}
