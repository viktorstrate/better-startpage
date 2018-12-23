import React from 'react'
import styled from 'styled-components'

import getSuggestionCategory from './suggestionCategory'
import getBangCategory from './bangCategory'
import getTextCategory from './textCategory'

export default function categories({
  suggestions,
  highlight,
  query,
  onHighlight,
}) {
  const categories = suggestions.map((category, categoryIndex) => {
    if (category.type == 'suggestions') {
      return getSuggestionCategory({
        category,
        categoryIndex,
        highlight,
        onHighlight,
        suggestions,
        query,
      })
    } else if (category.type == 'bang') {
      return getBangCategory({ category })
    } else if (category.type == 'text') {
      return getTextCategory({ category })
    }
  })

  return categories
}
