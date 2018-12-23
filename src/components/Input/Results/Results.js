import React from 'react'
import styled from 'styled-components'
import getCategories from './categories'

const Container = styled.div`
  padding: 0;
  max-height: 300px;
  overflow-y: scroll;
`

export default class Results extends React.Component {
  constructor(props) {
    super(props)

    this.handleScroll = this.handleScroll.bind(this)
  }

  handleScroll(event) {
    this.props.updateScroll(event.target.scrollTop > 0)
  }

  render() {
    const { onHighlight } = this.props

    let categories = getCategories({ ...this.props })

    if (categories.length > 0) {
      return (
        <Container
          onScroll={this.handleScroll}
          onMouseLeave={() => {
            onHighlight(-1)
          }}
        >
          {categories}
        </Container>
      )
    } else {
      return null
    }
  }
}
