import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import octofitLogo from './octofitapp-small.png';

const sections = [
  {
    title: 'Users',
    description: 'View student profiles and track each participant.',
    to: '/users',
  },
  {
    title: 'Teams',
    description: 'See team standings and coaches for each squad.',
    to: '/teams',
  },
  {
    title: 'Activities',
    description: 'Review recent logged workouts and fitness sessions.',
    to: '/activities',
  },
  {
    title: 'Leaderboard',
    description: 'Compare points and rankings across the challenge.',
    to: '/leaderboard',
  },
  {
    title: 'Workouts',
    description: 'Browse personalized workout suggestions and goals.',
    to: '/workouts',
  },
];

function Home() {
  return (
    <section className="container py-4">
      <div className="row g-4">
        {sections.map((section) => (
          <div className="col-md-6 col-xl-4" key={section.title}>
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h2 className="h5">{section.title}</h2>
                <p className="text-secondary">{section.description}</p>
                <NavLink className="btn btn-primary" to={section.to}>
                  Open {section.title}
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function App() {
  return (
    <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <div className="app-shell">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
          <div className="container">
            <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/">
              <img alt="OctoFit Tracker logo" className="app-logo" src={octofitLogo} />
              <span>OctoFit Tracker</span>
            </NavLink>
            <div className="navbar-nav flex-row flex-wrap gap-2">
              {sections.map((section) => (
                <NavLink
                  className={({ isActive }) =>
                    `nav-link px-2 ${isActive ? 'fw-semibold text-white' : 'text-white-50'}`
                  }
                  key={section.title}
                  to={section.to}
                >
                  {section.title}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>

        <header className="hero-section">
          <div className="container py-4">
            <h1 className="display-6 fw-bold">Fitness tracking for students, teams, and challenges</h1>
            <p className="lead mb-0">
              Monitor activity, compare team scores, and keep everyone moving with friendly
              competition.
            </p>
          </div>
        </header>

        <main>
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Users />} path="/users" />
            <Route element={<Teams />} path="/teams" />
            <Route element={<Activities />} path="/activities" />
            <Route element={<Leaderboard />} path="/leaderboard" />
            <Route element={<Workouts />} path="/workouts" />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
