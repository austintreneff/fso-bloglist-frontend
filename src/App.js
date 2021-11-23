import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Blogs from './components/Blogs'
import Login from './components/Login'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notificationType, setNotificationType] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      setUser(JSON.parse(loggedUserJSON))
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  if (user === null) {
    return (
      <Login setUser={setUser} username={username} setUsername={setUsername} password={password} setPassword={setPassword} notificationMessage={notificationMessage} notificationType={notificationType} setNotificationMessage={setNotificationMessage} setNotificationType={setNotificationType}/>
    )
  } else {
    blogService.setToken(user.token)
  }

  return (
    <>
      <h2>blogs</h2>

      <Notification type={notificationType} message={notificationMessage} />

      <div>
        {user.name} logged in<button onClick={handleLogout}>log out</button>
      </div> 
      <CreateBlogForm blogs={blogs} setBlogs={setBlogs} setNotificationMessage={setNotificationMessage} setNotificationType={setNotificationType}/>
      <Blogs blogs={blogs}/>
    </>
  )
}

export default App