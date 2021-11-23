
import React from 'react'
import Blog from './Blog'

const Blogs = ({ blogs }) => {

  return (
    <>
      <br/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )
  
}

export default Blogs;