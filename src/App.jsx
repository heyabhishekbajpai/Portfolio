import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Design from './components/Design'
import Films from './components/Films'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'

function App() {
    return (
        <div className="app min-h-screen" style={{ background: 'var(--color-bg, #050508)' }}>
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
