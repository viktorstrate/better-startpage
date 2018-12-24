import React from 'react'
import styled from 'styled-components'

const ItemStyle = styled.li`
  cursor: pointer;
  font-weight: 300;
  padding: 4px 18px;

  &.highlight {
    background-color: #eee;
  }
`

const ItemName = styled.div`
  font-size: 15px;
  & strong {
    font-weight: 400;
  }
`

const ItemContainer = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  margin-bottom: 8px;
`

const Description = styled.div`
  font-size: 12px;
  color: #444;
`

const Title = styled.div``

const Category = styled.div`
  padding-top: 4px;
  & > ${Title} {
    padding: 0 18px;
    font-size: 10px;
    font-weight: 600;
    margin-bottom: 4px;

    &.bang {
      font-size: 14px;
      font-weight: 200;
      margin-bottom: 8px;
    }
  }
`

const itemToHighlight = (category, item, suggestions) => {
  let result = item || 0
  for (let i = 0; i < category; i++) {
    if (suggestions[i].items == undefined) continue
    result += suggestions[i].items.length
  }
  return result
}

const markMatch = (match, query) => {
  let result = []
  let split = match.split(query)

  if (split.length == 1) {
    query = query.substr(query.indexOf(' ') + 1)
    split = match.split(query)
  }

  for (let i = 0; i < split.length - 1; i++) {
    let part = split[i]
    result.push(<span key={`${part}-${i}`}>{part}</span>)
    result.push(<strong key={`query-${i}`}>{query}</strong>)
  }
  result.push(
    <span key={'last' + split[split.length - 1]}>
      {split[split.length - 1]}
    </span>
  )

  return <>{result}</>
}

function SuggestionItem(
  items,
  { categoryIndex, highlight, onHighlight, suggestions, query }
) {
  let result = items.map((item, itemIndex) => {
    const highlightIndex = itemToHighlight(
      categoryIndex,
      itemIndex,
      suggestions
    )
    return (
      <ItemStyle
        className={highlightIndex == highlight ? 'highlight' : ''}
        onMouseEnter={() => {
          onHighlight(highlightIndex)
        }}
        onClick={item.onClick}
        key={item.name + itemIndex}
      >
        <ItemName>{markMatch(item.name, query)}</ItemName>
        {item.description ? (
          <Description>
            {item.description.length > 90
              ? item.description.slice(0, 90) + '...'
              : item.description}
          </Description>
        ) : null}
      </ItemStyle>
    )
  })

  return result
}

export default function getSuggestionCategory({
  category,
  categoryIndex,
  highlight,
  onHighlight,
  suggestions,
  query,
}) {
  if (!(category.items && category.items.length > 0)) {
    return null
  }

  let items = SuggestionItem(category.items, {
    categoryIndex,
    highlight,
    onHighlight,
    suggestions,
    query,
  })

  let itemsElement = items ? <ItemContainer>{items}</ItemContainer> : null

  return (
    <Category
      className={category.type}
      key={category.name + category.title + category.type + categoryIndex}
    >
      <Title className={category.type}>{category.name}</Title>
      {itemsElement}
    </Category>
  )
}
