import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { Helmet } from 'react-helmet'

import Clock from './Clock'
import Input from './Input/Input'
import Footer from './Footer'

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    width: 100%;
    height: 100%;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
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

const footerElements = [
  {
    name: 'Social',
    color: '#FFB640',
    links: [
      {
        name: 'Facebook',
        href: 'https://facebook.com',
      },
      {
        name: 'Twitter',
        href: 'https://twitter.com',
      },
    ],
  },
  {
    name: 'Media',
    color: '#FF5840',
    links: [
      {
        name: 'Youtube',
        href: 'https://youtube.com',
      },
      {
        name: 'Netflix',
        href: 'https://netflix.com',
      },
      {
        name: 'Vimeo',
        href: 'https://vimeo.com',
      },
    ],
  },
  {
    name: 'Development',
    color: '#55B4DC',
    links: [
      {
        name: 'Github',
        href: 'https://github.com',
      },
    ],
  },
]

export default () => (
  <Background>
    <Helmet>
      <title>Start Page</title>
    </Helmet>
    <GlobalStyle />
    <Container>
      <ClockStyled />
      <InputStyled />
      <FooterStyled elements={footerElements} />
    </Container>
  </Background>
)
