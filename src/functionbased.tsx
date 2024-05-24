import React, { useState, useEffect, FC } from 'react'

interface User {
  name: string
  email: string
}

interface Props {
  userId: string
}

const UserData: FC<Props> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null)
  const [seconds, setSeconds] = useState<number>(0)

  useEffect(() => {
    fetchUserData()
    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [userId])

  const fetchUserData = () => {
    fetch(`https://secret.url/user/${userId}`)
      .then(response => response.json())
      .then((data: User) => setUser(data))
      .catch(error => console.error('Error fetching user data:', error))
  }

  return (
    <div>
      <h1>User Data Component</h1>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <p>Timer: {seconds} seconds</p>
    </div>
  )
}

export default UserData
