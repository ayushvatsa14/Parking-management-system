import './App.css'
import { Navbar } from './components/Navbar'
import { AllSpaces } from './pages/AllSpaces'
import { LevelSpace } from './pages/LevelSpace'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { EmptySpaces } from './pages/EmptySpaces'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { PublicRoute } from './routes/PublicRoute'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { authSync } from './utils/authSync'
import { login } from './features/auth/authSlice'
import { FullCapacityAlert } from './components/FullCapacityAlert'

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

    syncAuth()
  }, [dispatch])

  return (
    <div className="min-h-screen bg-richblack-900 text-gray-200">
      <Navbar />
      <FullCapacityAlert />

      <main className="max-w-7xl mx-auto px-6">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/all-spaces"
            element={
              <ProtectedRoute>
                <AllSpaces />
              </ProtectedRoute>
            }
          />

          <Route
            path="/level-space"
            element={
              <ProtectedRoute>
                <LevelSpace />
              </ProtectedRoute>
            }
          />

          <Route
            path="/empty-spaces"
            element={
              <ProtectedRoute>
                <EmptySpaces />
              </ProtectedRoute>
            }
          />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
