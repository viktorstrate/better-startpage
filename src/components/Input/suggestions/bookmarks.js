import React from 'react'

export default async function bookmarksSuggestions(query) {
  let match = query.match(/(?:bm?|book(?:marks?)?|marks?)\s(.+)/)
  if (!match) return null
  query = match[1]

  let results = await browser.bookmarks.search(query)

  let items = results
    .filter(item => item.url)
    .filter(
      (item, _, array) => array.find(other => other.url == item.url) === item
    )
    .slice(0, 5)
    .map(item => {
      let result = {}

      if (item.title) {
        result = {
          name: item.title,
          description: item.url,
        }
      } else {
        result = {
          name: item.url,
        }
      }

      return {
        ...result,
        onClick: () => {
          location.href = item.url
        },
      }
    })

  if (items.length == 0) {
    return null
  }

  console.log('bookmarks', results)

  return {
    type: 'suggestions',
    name: 'Bookmarks',
    items,
  }
}
