function App() {
  return (
    <div className="bg-black min-h-screen text-white">
      <nav className="flex justify-between items-center p-6 border-b border-gold">
       <div className="text-2xl font-bold text-gold">Deadline Desk</div>
       <div className="flex gap-6 items-center">
        <a href="#" className="text-white hover:text-gold">Log in</a>
        <a href="#" className="bg-gold text-black font-bold px-4 py-2 rounded">Sign up</a>
       </div>
      </nav>

      <section className="relative overflow-hidden flex flex-col items-center justify-center text-center px-6 py-32">
        <div className="absolute inset-0">
          <div className="particle w-2 h-2 bg-gold rounded-full absolute top-1/4 left-1/4"></div>
          <div className="particle w-1 h-1 bg-gold rounded-full absolute top-1/3 left-3/4"></div>
          <div className="particle w-2 h-2 bg-gold rounded-full absolute top-2/3 left-1/2"></div>
          <div className="particle w-1 h-1 bg-gold rounded-full absolute top-1/2 left-1/5"></div>
          <div className="particle w-2 h-2 bg-gold rounded-full absolute top-3/4 left-2/3"></div>
        </div>

        <h1 className="text-5xl font-bold mb-4">Never miss a<span className="text-gold"> deadline </span>AGAIN!!</h1>
        <p className="text-lg text-gray-400 mb-8 max-w-xl">Track your modules, assignments, and due dates in one place</p>
        <a href="#" className="bg-gold text-black font-bold px-8 py-4 rounded text-lg hover:bg-white transition">Get Started</a>
      </section>

      <footer className="text-center py-6 text-gray-500 text-sm border-t border-gold">
        © 2026 Sphesihle Mdlalose. All rights reserved.
      </footer>
    </div>
  )
}

export default App