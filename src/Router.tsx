import { Routes, Route } from 'react-router-dom'
import { CycleContext, Home } from './pages/Home'
import { History } from './pages/History/History'
import { DefaultLayout } from './layouts/DefaultLayout'

export const Router = () => (
  <Routes>
    <Route path="/" element={<DefaultLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/history" element={<History />} />
    </Route>
  </Routes>
)
