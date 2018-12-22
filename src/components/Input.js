import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Window = styled.div`
  width: 600px;
  height: 400px;
  /* background-color: white;
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); */
`

const InputField = styled.input`
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 2px;
  padding: 4px 18px;
  font-size: 18px;
  font-weight: 200;
  color: #363a3c;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`

export default class Input extends React.Component {
  render() {
    return (
      <Container className={this.props.className}>
        <Window>
          <InputField ref={el => el.focus()} placeholder="Search..." />
        </Window>
      </Container>
    )
  }
}
