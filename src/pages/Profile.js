import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

const Profile = () => {
  const {currentUser}=useContext(AuthContext);
  
  let temp= currentUser.displayName 
  temp=String(temp).split(" ");
  let firstName=temp[0]
  let lastName=temp[1]

  return (
    <div className='bg-light table-div m-auto table'>
      <table className='table table-striped table-bordered border-dark'>
        <tbody>
           <tr className='table-primary table-bordered border-dark'>
          <th >First Name</th>
          <td >{firstName}</td>
        </tr>
        <tr>
          <th >Last Name</th>
          <td >{lastName}</td>
        </tr >
        <tr className='table-primary table-bordered border-dark'>
          <th >Email Address</th>
          <td >{currentUser.email}</td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Profile