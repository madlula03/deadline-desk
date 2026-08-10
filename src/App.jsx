import { Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './Pages/Dashboard'

function Landing() {
  return (
    <div className="relative bg-black min-h-screen text-white overflow-hidden">

      <div className="absolute inset-0">
        <div className="particle w-2 h-2 bg-gold rounded-full absolute top-[10%] left-[15%]"></div>
        <div className="particle w-1 h-1 bg-gold rounded-full absolute top-[20%] left-[80%]"></div>
        <div className="particle w-2 h-2 bg-gold rounded-full absolute top-[35%] left-[45%]"></div>
        <div className="particle w-1 h-1 bg-gold rounded-full absolute top-[50%] left-[10%]"></div>
        <div className="particle w-2 h-2 bg-gold rounded-full absolute top-[60%] left-[70%]"></div>
        <div className="particle w-1 h-1 bg-gold rounded-full absolute top-[75%] left-[30%]"></div>
        <div className="particle w-2 h-2 bg-gold rounded-full absolute top-[85%] left-[85%]"></div>
        <div className="particle w-1 h-1 bg-gold rounded-full absolute top-[90%] left-[50%]"></div>
        <div className="particle w-2 h-2 bg-gold rounded-full absolute top-[5%] left-[60%]"></div>
        <div className="particle w-1 h-1 bg-gold rounded-full absolute top-[65%] left-[20%]"></div>
      </div>

      <nav className="relative flex justify-between items-center p-6 border-b border-gold">
       <div className="text-2xl font-bold text-gold">Deadline Desk</div>
       <div className="flex gap-6 items-center">
        <Link to="/login" className="text-white hover:text-gold">Log in</Link>
        <Link to="/signup" className="bg-gold text-black font-bold px-4 py-2 rounded">Sign up</Link>
       </div>
      </nav>

      <section className="relative flex flex-col items-center justify-center text-center px-6 py-32">
        <h1 className="text-5xl font-bold mb-4">Never miss a<span className="text-gold"> deadline </span>AGAIN!!</h1>
        <p className="text-lg text-gray-400 mb-8 max-w-xl">Track your modules, assignments, and due dates in one place</p>
        <Link to="/signup" className="bg-gold text-black font-bold px-8 py-4 rounded text-lg hover:bg-white transition">Get Started</Link>
      </section>

      <section className="relative grid grid-cols-1 md:grid-cols-3 gap-8 px-6 py-20 max-w-5xl mx-auto">
        <div className="bg-white/5 border border-gold/30 rounded-lg p-6 hover:border-gold transition shadow-lg shadow-gold/10">
          <h3 className="italic font-bold text-lg mb-2">Track your modules</h3>
          <p className="italic text-gray-400">Add your course you're taking and keep them organized in one place.</p>
        </div>
        <div className="bg-white/5 border border-gold/30 rounded-lg p-6 hover:border-gold transition shadow-lg shadow-gold/10">
          <h3 className="italic font-bold text-lg mb-2">Never miss a due date</h3>
          <p className="italic text-gray-400">See every assignment sorted by what's due soonest</p>
        </div>
        <div className="bg-white/5 border border-gold/30 rounded-lg p-6 hover:border-gold transition shadow-lg shadow-gold/10">
          <h3 className="italic font-bold text-lg mb-2">Make your progress</h3>
          <p className="italic text-gray-400">Update status as you go - not started, in progress, or done.</p>
        </div>
      </section>

      <footer className="relative text-center py-6 text-gray-500 text-sm border-t border-gold">
        © 2026 Sphesihle Mdlalose. All rights reserved.
      </footer>

    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default App