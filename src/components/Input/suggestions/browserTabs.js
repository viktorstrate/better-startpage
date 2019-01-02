import React from 'react'
import browser from 'webextension-polyfill'

export default async function browserTabsSuggestions(query) {
  let results = await browser.tabs.query({})

  results = results.filter(tab => {
    let q = query.toLowerCase()
    let pass = false

    pass = pass || tab.title.toLowerCase().includes(q)
    pass = pass || (tab.url.toLowerCase().includes(q) && query.length > 4)

    return pass
  })

  if (results.length == 0) {
    return null
  }

  console.log('tabs', results)

  let items = results.slice(0, 3).map(item => ({
    name: item.title,
    description: item.url,
    onClick: async () => {
      await browser.tabs.update(item.id, { active: true })
      let thisTab = await browser.tabs.getCurrent()
      await browser.tabs.remove(thisTab.id)
    },
  }))

  if (items.length == 0) {
    return null
  }

  return {
    type: 'suggestions',
    name: 'Open Tabs',
    items,
  }
}
