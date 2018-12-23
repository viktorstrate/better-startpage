import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.05);
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

export default ({ elements, className }) => {
  const Categories = elements.map(category => {
    const links = category.links.map(link => (
      <a key={link.href} href={link.href}>
        {link.name}
      </a>
    ))

    return (
      <Category
        className={className}
        color={category.color}
        key={category.name}
      >
        <div className="name">{category.name}</div>
        {links}
      </Category>
    )
  })
  return <Container>{Categories}</Container>
}
