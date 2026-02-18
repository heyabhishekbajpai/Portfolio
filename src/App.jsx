import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Design from './components/Design'
import Films from './components/Films'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BlobCursor from './components/Cursor/Cursor'
import './App.css'

function App() {
    return (
        <div className="app bg-black min-h-screen">
            <BlobCursor
                trailCount={10}
                sizes={[2.5, 100]}
                innerSizes={[1, 20]}
                opacities={[1, 0.5]}
            />
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
