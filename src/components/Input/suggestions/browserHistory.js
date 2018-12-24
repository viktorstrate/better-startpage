import React from 'react'

export default async function historySuggestions(query) {
  let results = await browser.history.search({ text: query })

  if (results.length == 0) {
    return null
  }

  let items = results
    .slice(0, 3)
    .filter(item => item.title)
    .filter(
      (item, _, array) => array.find(other => other.url == item.url) === item
    )
    .map(item => ({
      name: item.title,
      description: item.url,
      onClick: () => {
        location.href = item.url
      },
    }))

  if (items.length == 0) {
    return null
  }

  return {
    type: 'suggestions',
    name: 'Browser History',
    items,
  }
}