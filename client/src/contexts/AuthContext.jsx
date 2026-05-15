import { createContext, useState, useCallback, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          const response = await axios.get('/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` }
          })
          setUser(response.data)
        } catch (error) {
          localStorage.removeItem('token')
          setToken(null)
        }
      }
      setLoading(false)
    }

    verifyToken()
  }, [token])

  const login = useCallback(async (email, password) => {
    const response = await axios.post('/api/auth/login', { email, password })
    const { token, user } = response.data
    localStorage.setItem('token', token)
    setToken(token)
    setUser(user)
    return response.data
  }, [])

  const signup = useCallback(async (email, password, name) => {
    const response = await axios.post('/api/auth/signup', { email, password, name })
    const { token, user } = response.data
    localStorage.setItem('token', token)
    setToken(token)
    setUser(user)
    return response.data
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
