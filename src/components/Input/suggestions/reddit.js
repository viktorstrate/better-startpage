import React from 'react'
import { debounce } from 'lodash'

const searchSub = debounce((subreddit, resolve, reject) => {
  fetch(`https://www.reddit.com/r/${subreddit}/about.json`)
    .then(res => res.json())
    .then(json => {
      console.log('reddit', json)
      resolve(json)
    })
    .catch(err => {
      reject(err)
    })
}, 200)

export default async function redditSuggestions(query) {
  let match = query.match(/(\/?r\/)([a-zA-Z0-9\-\_]+)/)
  if (!match) {
    return null
  }

  let result = await new Promise((resolve, reject) => {
    searchSub(match[2], resolve, reject)
  })

  if (result.error == 404) {
    return {
      value: (
        <>
          {'Subreddit '}
          <strong>{match[2]}</strong>
          {' does not exist'}
        </>
      ),
      type: 'bang',
      onClick: () => {},
    }
  }

  if (result.error == 403 && result.reason == 'private') {
    return {
      value: (
        <>
          {'Subreddit '}
          <strong>{match[2]}</strong>
          {' is private'}
        </>
      ),
      type: 'bang',
      onClick: () => {
        location.href = 'https://reddit.com/r/' + match[2]
      },
    }
  }

  if (result.kind != 't5') {
    return null
  }

  return {
    value: (
      <>
        {'Visit subreddit '}
        <strong>{match[2]}</strong>
        {` - `}
        <i>
          {result.data.public_description || 'The subreddit has no description'}
        </i>
      </>
    ),
    type: 'bang',
    onClick: () => {
      location.href = 'https://reddit.com/r/' + match[2]
    },
  }
}
