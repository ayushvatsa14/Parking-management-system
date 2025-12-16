import './App.css'
import { Navbar } from './components/Navbar'
import { AllSpaces } from './pages/AllSpaces'
import { LevelSpace } from './pages/LevelSpace'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Routes, Route } from 'react-router-dom'

function App(){
  retrun (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/all-spaces' element={<AllSpaces />} />
        <Route path='/level-space' element={<LevelSpace />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App
