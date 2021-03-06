import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { Helmet } from 'react-helmet'

import Settings from './Settings'
import Clock from './Clock'
import Input from './Input/Input'
import Sidebar from './Sidebar/Sidebar'
import Footer from './Footer'

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    width: 100%;
    height: 100%;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    background-color: #C6C6C4;
  }

  #app {
    width: 100%;
    height: 100%;
  }
`

const Background = styled.div`
  background: linear-gradient(
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.1)
    ),
    url(${require('./background.jpg')});
  /* filter: blur(4px); */
  background-size: cover;
  background-position: center;
  width: 100%;
  min-height: 100%;
`

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 120px 1fr 120px;
  grid-template-areas:
    'clock'
    'input'
    'footer';
`

const ClockStyled = styled(Clock)`
  grid-area: clock;
`

const InputStyled = styled(Input)`
  grid-area: input;
`

const FooterStyled = styled(Footer)`
  grid-area: footer;
`

function isNewTab() {
  return window.location.search
    .substr(1)
    .split('&')
    .map(item => item.split('='))
    .find(param => param[0] == 'newtab' && param[1] == 1)
}

export default () => (
  <Settings>
    <Background>
      <Helmet>
        <title>{isNewTab() ? 'New Tab' : 'Better Start Page'}</title>
      </Helmet>
      <GlobalStyle />
      <Container>
        <ClockStyled />
        <InputStyled />
        <Sidebar />
        <FooterStyled />
      </Container>
    </Background>
  </Settings>
)
