import { Route, Routes } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import OverviewPage from './pages/OverviewPage'
import MapPage from './pages/MapPage'
import SecurityPage from './pages/SecurityPage'
import ArrivalsPage from './pages/ArrivalsPage'
import JourneyPage from './pages/JourneyPage'
import AnalyticsPage from './pages/AnalyticsPage'
import DecisionPage from './pages/DecisionPage'
import SensorsPage from './pages/SensorsPage'
import RouteControlPage from './pages/RouteControlPage'
import ArchitecturePage from './pages/ArchitecturePage'
import PilotPage from './pages/PilotPage'
import KpisPage from './pages/KpisPage'
import PresentationPage from './pages/PresentationPage'
import PresentationLive from './pages/PresentationLive'
import AboutPage from './pages/AboutPage'

export default function App() {
  return (
    <Routes>
      <Route path="/presentation/live" element={<PresentationLive />} />
      <Route element={<AppLayout />}>
        <Route path="/" element={<OverviewPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/arrivals" element={<ArrivalsPage />} />
        <Route path="/journey" element={<JourneyPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/decision" element={<DecisionPage />} />
        <Route path="/sensors" element={<SensorsPage />} />
        <Route path="/route-control" element={<RouteControlPage />} />
        <Route path="/architecture" element={<ArchitecturePage />} />
        <Route path="/pilot" element={<PilotPage />} />
        <Route path="/kpis" element={<KpisPage />} />
        <Route path="/presentation" element={<PresentationPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<OverviewPage />} />
      </Route>
    </Routes>
  )
}
