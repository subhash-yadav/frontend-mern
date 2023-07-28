import React from 'react'
import UserProfile from '../features/user/components/UserProfile'
import Navbar from '../features/navbar/Navbar'

const UserProfilePage = () => {
  return (
    <Navbar>
        <h2 className="text-3xl mx-auto max-w-7xl py-2 sm:px-0 lg:px-0">
            My Profile
          </h2>
        <UserProfile/>
    </Navbar>
  )
}

export default UserProfilePage