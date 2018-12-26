import React from 'react'
import styled from 'styled-components'
import { Title } from './Sidebar'
import { SettingsConsumer, updateSettings } from '../Settings'

const LinkItem = styled.div`
  margin-bottom: 8px;
`

const LinkKey = styled.span`
  width: 50px;
  display: inline-block;
`

const CategoryInput = styled.input`
  font-size: 14px;
  font-weight: 600;
`

function updateLink(footerLinks, link, name, href) {
  for (let category of footerLinks) {
    for (let otherLink of category.links) {
      if (otherLink == link) {
        otherLink.name = name
        otherLink.href = href
        updateSettings({ footerLinks })
        return
      }
    }
  }

  throw new Error('Did not find link to update')
}

function updateCategory(footerLinks, category, name) {
  for (let otherCategory of footerLinks) {
    if (otherCategory == category) {
      otherCategory.name = name
      updateSettings({ footerLinks })
      return
    }
  }

  throw new Error('Did not find category to update')
}

export default () => (
  <SettingsConsumer>
    {settings => {
      let categories = settings.footerLinks.map(category => {
        let links = category.links.map((link, index) => (
          <LinkItem key={index}>
            <LinkKey>Name</LinkKey>
            <input
              onChange={e =>
                updateLink(
                  settings.footerLinks,
                  link,
                  e.target.value,
                  link.href
                )
              }
              value={link.name}
            />
            <br />
            <LinkKey>URL</LinkKey>
            <input
              onChange={e =>
                updateLink(
                  settings.footerLinks,
                  link,
                  link.name,
                  e.target.value
                )
              }
              value={link.href}
            />
          </LinkItem>
        ))

        return (
          <div key={category.color}>
            <CategoryInput
              maxLength={14}
              onChange={e =>
                updateCategory(settings.footerLinks, category, e.target.value)
              }
              value={category.name}
            />
            {links}
          </div>
        )
      })

      return <div>{categories}</div>
    }}
  </SettingsConsumer>
)
