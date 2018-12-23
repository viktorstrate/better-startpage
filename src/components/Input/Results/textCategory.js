import React from 'react'
import styled from 'styled-components'

const Category = styled.div`
  padding: 0 18px;
  margin-bottom: 12px;
`

const Text = styled.div`
  font-size: 16px;
  font-weight: 200;
`

export default function getTextCategory({ category }) {
  return (
    <Category key={category.type + category.value}>
      <Text>{category.value}</Text>
    </Category>
  )
}
