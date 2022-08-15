import React from 'react'
import BlogCard from '../components/BlogCard'

const Dashboard = () => {  
  const myHeader = {
    header : {color: "#09779E" , fontSize:"50px ", fontWeight:"bold",}
  }
    return (
    <div>    
    <h1 style={myHeader.header} className='text-center  h1 dashboard mt-3'>DASHBOARD</h1>   
    <div className='text-light'>    
      <BlogCard/>
    </div>
    </div>

    
  )
}

export default Dashboard