import './App.css'
import { Navbar } from './components/Navbar'
import { AllSpaces } from './pages/AllSpaces'
import { LevelSpace } from './pages/LevelSpace'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { PublicRoute } from './routes/PublicRoute'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { authSync } from './utils/authSync'
import { login } from './features/auth/authSlice'

function App(){
  const dispatch=useDispatch()

  useEffect(() => {
    const syncAuth=async () => {
      try{
        const response=await authSync()

        if(response.data.success){
          dispatch(login(response.data.data))
        }
      }
      catch(error){
        console.log(`Sync auth app: ${error.message}`)
      }
    }
  }, [dispatch])

  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />

        <Route
          path='/all-spaces'
          element={
            <ProtectedRoute>
              <AllSpaces />
            </ProtectedRoute>
          }
        />

        <Route
          path='/level-space'
          element={
            <ProtectedRoute>
              <LevelSpace />
            </ProtectedRoute>
          }
        />

        <Route
          path='/login'
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
      </Routes>
    </>
  )
}

export default App
