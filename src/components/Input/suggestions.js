import bangsSuggestions, { searchTrigger } from './suggestions/bangs'
import google from './suggestions/google'
import youtube from './suggestions/youtube'
import calculations from './suggestions/calculations'
import duckduckgo from './suggestions/duckduckgo'
import reddit from './suggestions/reddit'
import bookmarks from './suggestions/bookmarks'
import browserHistory from './suggestions/browserHistory'
import browserTabs from './suggestions/browserTabs'
import unitConversion from './suggestions/unitConversion'
import { visitUrl, urlSuggestions } from './suggestions/urls'

export function hookSuggestions(query, update) {
  let pendingResults = []

  pendingResults = [
    // Top level redirects
    bangsSuggestions(query),
    visitUrl(query),
    // Require prefix or special form
    reddit(query),
    calculations(query),
    unitConversion(query),
    bookmarks(query),
    browserHistory(query),
    browserTabs(query),
    // General Suggestions
    urlSuggestions(query),
    duckduckgo(query),
    youtube(query),
    google(query),
  ]

  if (pendingResults.filter(x => x != undefined).length == 0) {
    console.log('updating empty')
    update([])
  } else {
    Promise.all(pendingResults)
      .then(finishedResults => {
        finishedResults = finishedResults
          .reduce((prev, curr) => prev.concat(curr), [])
          .filter(x => x != undefined)

        console.log('finished', finishedResults)

        update(finishedResults)
      })
      .catch(err => {
        console.log('Something went wrong', err)
      })
  }
}

// export function followQuery(query) {
//   let match = query.match(/!([a-zA-Z]+)\s(.+)/)
//   let url

//   if (match) {
//     let bang = searchTrigger(match[1])

//     if (bang) {
//       url = bang.url.replace('%query%', urlFormat(match[2]))
//     }
//   } else {
//     url = 'https://www.google.com/search?q=' + urlFormat(query)
//   }

//   location.href = url
// }
