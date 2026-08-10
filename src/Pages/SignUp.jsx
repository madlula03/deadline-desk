import { Link } from 'react-router-dom'
import { useState } from 'react'

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e){
     e.preventDefault()
    console.log('Name:', name)
    console.log('Email:', email)
    console.log('Password:', password)
    }
  return (
    <div className="bg-black min-h-screen text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md border border-gold/30 rounded-lg p-8 bg-white/5">
        <h1 className="text-3xl font-bold text-gold mb-6 text-center">Create your account</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-black border border-gold/30 rounded px-4 py-2 text-white focus:outline-none focus:border-gold"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input
              type="email"
              value={email}
               onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black border border-gold/30 rounded px-4 py-2 text-white focus:outline-none focus:border-gold"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Password</label>
            <input
              type="password"
              value={password}
                onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-gold/30 rounded px-4 py-2 text-white focus:outline-none focus:border-gold"
            />
          </div>

          <button
            type="submit"
            className="bg-gold text-black font-bold py-3 rounded mt-2 hover:bg-white transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-gold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup