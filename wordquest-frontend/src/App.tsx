import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import WorldMap from './pages/WorldMap'
import Chapter from './pages/Chapter'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/world/:slug" element={<WorldMap />} />
      <Route path="/chapter/:id" element={<Chapter />} />
    </Routes>
  )
}

export default App