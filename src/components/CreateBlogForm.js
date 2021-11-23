import React, { useState } from 'react'
import blogService from '../services/blogs'

const CreateBlogForm = ({ blogs, setBlogs, setNotificationMessage, setNotificationType }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const response = await blogService.create({title, author, url})
      setNotificationType('added')
      setNotificationMessage(`a new blog ${title} by ${author} added`)
      setBlogs(blogs.concat(response.data))
      setTimeout(() => {
        setNotificationMessage(null)
      }, 3000)
    } catch (exception) {
      console.log(exception)
    }


  }

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={handleCreate}>
        title:<input 
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          /><br/>
        author:<input 
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          /><br/>
        url:<input 
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          /><br/>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default CreateBlogForm