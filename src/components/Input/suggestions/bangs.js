import React from 'react'

export const bangs = require('./bangs.json')

export function searchTrigger(trigger) {
  return bangs.find(bang => bang.triggers.includes(trigger))
}

export function matchBang(query) {
  let bangMatch = query.match(/!([a-zA-Z]+)\s(.*)/)

  if (bangMatch) {
    let bang = searchTrigger(bangMatch[1])
    if (bang) {
      return {
        ...bang,
        trigger: bangMatch[1],
        query: bangMatch[2],
      }
    }
  }

  return null
}

export default async function bangsSuggestions(query) {
  let bang = matchBang(query)
  if (bang) {
    return {
      value: (
        <>
          {'Searching '}
          <strong>{bang.name}</strong>
          {' for '}
          <strong>{bang.query}</strong>
        </>
      ),
      type: 'bang',
    }
  }

  return null
}
