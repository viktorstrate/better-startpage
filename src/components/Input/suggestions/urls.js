import React from 'react'

export function getUrl(string) {
  let match = string.match(
    /(?:([a-zA-Z]+:\/\/)|[a-zA-Z0-9-_]+\.)[a-zA-Z0-9-_\.]+/
  )

  if (match) {
    let protocol = match[1]
    let host

    if (!protocol) {
      host = string
      protocol = 'http://'
    } else {
      host = string.substr(protocol.length)
    }

    if (!host.includes('/')) {
      host += '/'
    }

    try {
      return new URL(protocol + host)
    } catch {
      return null
    }
  }

  return null
}

export async function urlSuggestions(query) {
  let urlItems = await browser.history.search({
    text: query,
    startTime: 0, // all browser history
    maxResults: 10,
  })

  urlItems = urlItems
    .map(x => ({ ...x, url: new URL(x.url) }))
    .filter(x => x.url.origin.includes(query))
    .map(x => x.url.origin)
    .sort((a, b) => a.length > b.length)
    .reduce(
      (prev, curr) => (prev.includes(curr) ? prev : prev.concat(curr)),
      []
    )
    .map(x => ({
      name: x,
      onClick() {
        location.href = x
      },
    }))
    .splice(0, 3)

  if (urlItems.length > 0) {
    return {
      type: 'suggestions',
      name: 'Sites',
      items: urlItems,
    }
  } else {
    return null
  }
}

export async function visitUrl(query) {
  let url = getUrl(query)

  if (url) {
    return {
      type: 'bang',
      value: (
        <>
          {'Visit '} <strong>{url.href}</strong>
        </>
      ),
    }
  }

  return null
}
