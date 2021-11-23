import React from 'react'

const Notification = ({ type, message}) => {
  if (message === null) {
    return null;
  }

  return (
    <h1 className={'notification ' + type}>
      {message}
    </h1>
  )
}

export default Notification;