import React from 'react'
import styled from 'styled-components'

const Category = styled.div`
  padding: 0 18px;
  margin-bottom: 12px;
`

const Bang = styled.div`
  font-size: 12px;
  font-weight: 200;
`

export default function getBangCategory({ category }) {
  return (
    <Category key={category.type + category.value}>
      <Bang>{category.value}</Bang>
    </Category>
  )
}
