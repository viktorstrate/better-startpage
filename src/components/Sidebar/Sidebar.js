import React from 'react'
import styled from 'styled-components'
import FooterLinks from './FooterLinks'
import { updateSettings, defaultSettings } from '../Settings'

const arrow = require('./arrow.svg')

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: ${props => (props.shown ? 250 : 0)}px;
  background-color: white;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);

  transition: width 100ms ease-in;
`

const Arrow = styled.div`
  background-image: url('${arrow}');
  background-repeat: no-repeat;
  background-position: center left;
  transform: scale(${props => (props.shown ? -1 : 1)}, 1);
  width: 60px;
  height: calc(100% - 120px);
  position: absolute;
  left: -60px;
  top: 0;
  cursor: pointer;

  &:hover {
    background-color: rgba(0,0,0,0.05);
  }

  transition: transform 200ms;
`

const Content = styled.div`
  padding: 16px;
  font-size: 14px;
  font-weight: 300;
  display: ${props => (props.shown ? 'inherit' : 'none')};
  overflow: scroll;
  height: calc(100% - 48px);
`

export const Title = styled.h2`
  font-size: 14px;
  margin: 0;
`

const Header = styled.h1`
  font-size: 16px;
`

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      shown: false,
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    console.log('toggle sidebar', !this.state.shown)
    this.setState({ shown: !this.state.shown })
  }

  render() {
    return (
      <Container shown={this.state.shown}>
        <Arrow shown={this.state.shown} onClick={this.toggle} />
        <Content shown={this.state.shown}>
          <Header>Settings</Header>
          <button
            onClick={() => {
              updateSettings(defaultSettings)
            }}
          >
            Clear saved settings
          </button>
          <FooterLinks />
        </Content>
      </Container>
    )
  }
}
