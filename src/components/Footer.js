import React from 'react'
import styled from 'styled-components'
import { SettingsConsumer } from './Settings'

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.1);
  width: 100%;
`

const Category = styled.div`
  width: 120px;
  margin: 14px;
  text-align: center;

  & a {
    display: block;
    color: white;
    text-decoration: none;
    font-weight: 200;
    font-size: 14px;

    &:hover {
      color: #eee;
    }
  }

  & .name {
    color: ${props => props.color};
    font-size: 20px;
    font-weight: 300;
    border-bottom: solid 1px ${props => props.color};
    margin-bottom: 10px;
  }
`

const Footer = ({ links, className }) => {
  const Categories = links
    .filter(category => category.name)
    .map((category, catIndex) => {
      const links = category.links.map((link, linkIndex) => (
        <a key={linkIndex} href={link.href}>
          {link.name}
        </a>
      ))

      return (
        <Category className={className} color={category.color} key={catIndex}>
          <div className="name">{category.name}</div>
          {links}
        </Category>
      )
    })
  return <Container>{Categories}</Container>
}

export default ({ className }) => (
  <SettingsConsumer>
    {settings => <Footer className={className} links={settings.footerLinks} />}
  </SettingsConsumer>
)
