import React from 'react'

export const defaultSettings = {
  footerLinks: [
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
        {
          name: '',
          href: '',
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
        {
          name: '',
          href: '',
        },
        {
          name: '',
          href: '',
        },
      ],
    },
    {
      name: '',
      color: '#A2C44B',
      links: [
        {
          name: '',
          href: '',
        },
        {
          name: '',
          href: '',
        },
        {
          name: '',
          href: '',
        },
      ],
    },
  ],
}

export const SettingsContext = React.createContext()
export const SettingsConsumer = SettingsContext.Consumer

let internalUpdate = null
export const updateSettings = newSettings => {
  if (internalUpdate) {
    internalUpdate(newSettings)
  } else {
    throw new Error('Settings is still loading')
  }
}

export default class SettingsProvider extends React.Component {
  constructor(props) {
    super(props)

    let saved = window.localStorage.getItem('settings')
    if (saved) {
      saved = JSON.parse(saved)

      this.state = saved
    } else {
      this.state = {
        ...defaultSettings,
      }
    }

    this.updateSettings = this.updateSettings.bind(this)
  }

  updateSettings(newSettings) {
    this.setState(newSettings, () => {
      window.localStorage.setItem('settings', JSON.stringify(this.state))
    })
  }

  componentDidMount() {
    internalUpdate = this.updateSettings
  }

  render() {
    return (
      <SettingsContext.Provider value={this.state}>
        {this.props.children}
      </SettingsContext.Provider>
    )
  }
}
