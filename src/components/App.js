import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import Input from './Input'
import Footer from './Footer'

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    width: 100%;
    height: 100%;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif
  }

  #app {
    width: 100%;
    height: 100%;
  }
`

const Background = styled.div`
  background-image: url(${require('./background.jpg')});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 120px;
  grid-template-areas:
    'input'
    'footer';
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
    ],
  },
]

export default () => (
  <Background>
    <GlobalStyle />
    <InputStyled />
    <FooterStyled elements={footerElements} />
  </Background>
)
