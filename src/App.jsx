import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Design from './components/Design'
import Films from './components/Films'
import Contact from './components/Contact'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import './App.css'

function App() {
    const [loading, setLoading] = useState(true);

    return (
        <div className="app min-h-screen" style={{ background: 'var(--color-bg, #050508)' }}>
            {loading && <LoadingScreen onDone={() => setLoading(false)} />}
            <Navbar />
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Design />
            <Films />
            <Contact />
            <Footer />
        </div>
    )
}

export default App
