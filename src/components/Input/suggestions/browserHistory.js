import React from 'react'

export default async function historySuggestions(query) {
  let match = query.match(/(?:h|hist(?:ory)?)\s(.+)/)
  if (!match) return null
  query = match[1]

  let startDate = new Date()
  // Search the last year
  startDate = startDate.getTime() - 1000 * 60 * 60 * 24 * 360

  let results = await browser.history.search({
    text: query,
    startTime: startDate,
  })

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
