import React from 'react'
import { useGetData } from '../helpers/firebase';
import Blog from './BlogForm';

const BlogCard = () => {

  const {blogList}=useGetData()
  
  return (
    <div className='row container m-auto  d-flex justify-content-center align-items-center mt-3 gap-2'>
      {
        blogList?.map((item)=>{
          return(
            <Blog key={item.id} item={item}/>
          )
        })
      }
    </div>
  )
}

export default BlogCard