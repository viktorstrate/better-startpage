import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  text-align: center;
  padding-top: 42px;
  font-size: 48px;
  font-weight: 200;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  color: white;
`

export default () => {
  let prevTimeText = ''

  const updateClock = el => {
    const update = () => {
      const now = new Date()
      const timeText =
        ('00' + now.getHours()).slice(-2) +
        ':' +
        ('00' + now.getMinutes()).slice(-2)

      if (timeText != prevTimeText) {
        el.innerText = timeText
        prevTimeText = timeText
      }
    }
    setInterval(update, 1000)
    update()
  }

  return <Container ref={updateClock} />
}
