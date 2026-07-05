import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Chat from './components/Chat'
import Skills from './components/Skills'
import Background from './components/Background'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Chat />
        <Skills />
        <Background />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
