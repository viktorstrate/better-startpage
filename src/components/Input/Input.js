import React from 'react'
import styled from 'styled-components'

import { urlFormat } from './suggestions/helpers'
import { getUrl } from './suggestions/urls'
import { hookSuggestions } from './suggestions'
import Results from './Results/Results'

const Container = styled.div`
  width: 100%;
  height: 100%;
  /* align-items: center; */
`

const Window = styled.div`
  margin: 0 auto 32px;
  width: 600px;
  /* max-height: calc(100% - 42px); */
  background-color: white;
  border-radius: 2px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
  overflow: hidden;
`

const InputField = styled.input`
  width: calc(100% - 36px);
  height: 40px;
  border: none;
  border-radius: ${props => (props.scrolled ? '2px 2px 0 0;' : '2px')};
  padding: 4px 18px;
  font-size: 18px;
  font-weight: 200;
  color: #363a3c;
  ${props =>
    props.scrolled ? `box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);` : ''}

  &:focus {
    outline: none;
  }
`

export default class Input extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      query: '',
      suggestions: [],
      highlight: -1,
      scrolled: false,
    }

    this.inputElement = null

    this.queryChange = this.queryChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  queryChange(event) {
    const query = event.target.value
    this.setState({ query, highlight: -1 })

    if (query != '') {
      hookSuggestions(query, suggestions => {
        this.setState({ suggestions })
      })
    } else {
      this.setState({ suggestions: [] })
    }
  }

  componentDidMount() {
    window.focus()
    this.inputElement.focus()

    setTimeout(() => {
      this.inputElement.focus()
    }, 1000)
  }

  handleKeyDown(event) {
    if (event.key == 'ArrowUp' && this.state.highlight >= 0) {
      this.setState({
        highlight: this.state.highlight - 1,
      })
      event.preventDefault()
    }

    if (event.key == 'ArrowDown') {
      this.setState({
        highlight: this.state.highlight + 1,
      })
      event.preventDefault()
    }

    if (event.key == 'Enter') {
      if (this.state.highlight == -1) {
        if (
          this.state.suggestions.length > 0 &&
          typeof this.state.suggestions[0].onClick == 'function'
        ) {
          this.state.suggestions[0].onClick()
        } else {
          let url = getUrl(this.state.query)

          if (url) {
            location.href = url.href
          } else {
            location.href =
              'https://www.google.com/search?q=' + urlFormat(this.state.query)
          }
        }
      } else {
        let count = 0

        for (let suggestion of this.state.suggestions) {
          if (suggestion.items == undefined) continue
          if (this.state.highlight < count + suggestion.items.length) {
            let item = suggestion.items[this.state.highlight - count]
            item.onClick()
            break
          } else {
            count += suggestion.items.length
          }
        }

        console.log('click end')
      }
    }
  }

  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  render() {
    return (
      <Container className={this.props.className}>
        <Window>
          <InputField
            scrolled={this.state.scrolled}
            ref={el => {
              this.inputElement = el
            }}
            value={this.state.query}
            onChange={this.queryChange}
            placeholder="Search..."
          />
          <Results
            query={this.state.query}
            suggestions={this.state.suggestions}
            highlight={this.state.highlight}
            onHighlight={index => {
              this.setState({ highlight: index })
            }}
            updateScroll={scrolled => {
              this.setState({ scrolled })
            }}
          />
        </Window>
      </Container>
    )
  }
}
