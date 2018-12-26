import React from 'react'
import convert from 'convert-units'

function convertSuggestion(amount, from, to) {
  let result
  try {
    result = convert(amount)
      .from(from)
      .to(to)
  } catch (e) {
    return {
      type: 'text',
      value: (
        <>
          {`Failed to convert ${from} to ${to}: `}
          <i>{e.message}</i>
        </>
      ),
    }
  }

  return {
    type: 'text',
    value: (
      <>
        {`${amount} ${convert().describe(from).plural} in ${
          convert().describe(to).plural
        }: `}
        <strong>{result}</strong>
      </>
    ),
  }
}

export default async function unitConversionSuggestions(query) {
  let pattern = /^(?:(?:convert)\s)?(\d+)\s([a-zA-Z]+)(?:\s(?:(?:to|in)\s)?([a-zA-Z]+))?/
  let match = query.match(pattern)

  if (!match) {
    return null
  }

  let amount = match[1]
  let from = match[2]
  let to = match[3]

  if (to) {
    return convertSuggestion(amount, from, to)
  }

  return null
}
