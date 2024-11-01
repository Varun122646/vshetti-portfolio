'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Code, Smartphone, Globe, Mail, ChevronRight, Folder, FolderOpen, Sun, Moon, Menu, X, Linkedin } from 'lucide-react'
import { useTheme } from "next-themes"

export default function Component() {
  const [activeTab, setActiveTab] = useState('about')
  const [typedWelcome, setTypedWelcome] = useState('')
  const [typedTitle, setTypedTitle] = useState('')
  const [typedDescription, setTypedDescription] = useState('')
  const [typedSkills, setTypedSkills] = useState<string[]>([])
  const [typedProjects, setTypedProjects] = useState<string[]>([])
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [currentInput, setCurrentInput] = useState('name')
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [cursorVisible, setCursorVisible] = useState(true)
  const [isHovering, setIsHovering] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const welcomeText = "Hi, I'm Varun Shetti. Welcome to my portfolio! I'm a passionate Full-Stack Developer specializing in React, Next.js, and API design. Let's build something amazing together!"
  const titleText = "Full-Stack Web & App Developer"
  const descriptionText = "Crafting beautiful, responsive, and functional web and mobile experiences."

  const skills = [
    { name: 'HTML', icon: <Code className="w-4 h-4" /> },
    { name: 'CSS', icon: <Code className="w-4 h-4" /> },
    { name: 'JavaScript', icon: <Code className="w-4 h-4" /> },
    { name: 'TypeScript', icon: <Code className="w-4 h-4" /> },
    { name: 'Next.js', icon: <Globe className="w-4 h-4" /> },
    { name: 'React Native', icon: <Smartphone className="w-4 h-4" /> },
    { name: 'Python', icon: <Code className="w-4 h-4" /> },
    { name: 'Bootstrap', icon: <Code className="w-4 h-4" /> },
    { name: 'Tailwind CSS', icon: <Code className="w-4 h-4" /> },
  ]

  const projects = [
    {
      name: 'E-commerce Platform',
      description: 'A full-stack e-commerce solution built with Next.js and Python backend.',
      details: 'Features include user authentication, product catalog, shopping cart, and payment integration.',
      image: '/placeholder.svg?height=200&width=300'
    },
    {
      name: 'Mobile Fitness App',
      description: 'A React Native app for tracking workouts and nutrition.',
      details: 'Includes workout planning, progress tracking, and integration with health APIs.',
      image: '/placeholder.svg?height=200&width=300'
    },
    {
      name: 'Portfolio Website',
      description: 'This responsive portfolio website built with Next.js and Tailwind CSS.',
      details: 'Showcases projects, skills, and contact information with a unique command-line interface.',
      image: '/placeholder.svg?height=200&width=300'
    },
  ]

  useEffect(() => {
    if (typedWelcome.length < welcomeText.length) {
      const timeout = setTimeout(() => {
        setTypedWelcome(welcomeText.slice(0, typedWelcome.length + 1))
      }, 50)
      return () => clearTimeout(timeout)
    } else if (typedTitle.length < titleText.length) {
      const timeout = setTimeout(() => {
        setTypedTitle(titleText.slice(0, typedTitle.length + 1))
      }, 50)
      return () => clearTimeout(timeout)
    } else if (typedDescription.length < descriptionText.length) {
      const timeout = setTimeout(() => {
        setTypedDescription(descriptionText.slice(0, typedDescription.length + 1))
      }, 50)
      return () => clearTimeout(timeout)
    }
  }, [typedWelcome, typedTitle, typedDescription])

  useEffect(() => {
    if (activeTab === 'skills' && typedSkills.length < skills.length) {
      const timeout = setTimeout(() => {
        setTypedSkills(prevSkills => [...prevSkills, skills[prevSkills.length].name])
      }, 200)
      return () => clearTimeout(timeout)
    }
  }, [activeTab, typedSkills])

  useEffect(() => {
    if (activeTab === 'projects' && typedProjects.length < projects.length) {
      const timeout = setTimeout(() => {
        setTypedProjects(prevProjects => [...prevProjects, projects[prevProjects.length].name])
      }, 200)
      return () => clearTimeout(timeout)
    }
  }, [activeTab, typedProjects])

  useEffect(() => {
    if (activeTab === 'contact' && inputRef.current) {
      inputRef.current.focus()
    }
  }, [activeTab, currentInput])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        setCursorPosition({ x: e.clientX, y: e.clientY })
      })
    }

    const handleMouseLeave = () => {
      setCursorVisible(false)
    }

    const handleMouseEnter = () => {
      setCursorVisible(true)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    document.body.style.cursor = 'none'

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.body.style.cursor = 'auto'
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleInputSubmit = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (currentInput === 'name') setCurrentInput('email')
      else if (currentInput === 'email') setCurrentInput('message')
      else if (currentInput === 'message') {
        console.log('Form submitted:', formData)
        setFormData({ name: '', email: '', message: '' })
        setCurrentInput('name')
      }
    }
  }

  const ParticleBackground = () => {
    return (
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              transition: { duration: 10 + Math.random() * 20, repeat: Infinity }
            }}
          />
        ))}
      </div>
    )
  }

  const menuVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "100%" },
  }

  if (!mounted) return null

  return (
    <div className={`min-h-screen bg-[#0a192f] text-[#8892b0] font-mono transition-colors duration-300`}>
      <ParticleBackground />
      <div
        className={`fixed w-6 h-6 bg-[#64ffda] pointer-events-none z-50 rounded-full mix-blend-difference ${cursorVisible ? 'opacity-100' : 'opacity-0'} ${isHovering ? 'scale-150' : 'scale-100'}`}
        style={{
          transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`,
          transition: 'transform 0.1s ease-out, opacity 0.3s ease, scale 0.3s ease',
        }}
      />
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        body {
          overflow-x: hidden;
        }
      `}</style>
      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-[#64ffda]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          <div className="hidden md:flex space-x-4">
            {['about', 'skills', 'projects', 'contact'].map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? 'default' : 'ghost'}
                onClick={() => {
                  setActiveTab(tab)
                  if (tab === 'skills') setTypedSkills([])
                  if (tab === 'projects') {
                    setTypedProjects([])
                    setSelectedProject(null)
                  }
                }}
                className="text-sm sm:text-lg hover:text-[#64ffda] transition-colors duration-300"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {tab}.exe
              </Button>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <Sun className="w-4 h-4 text-[#8892b0]" />
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            />
            <Moon className="w-4 h-4 text-[#8892b0]" />
          </div>
        </nav>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              transition={{ duration: 0.3 }}
              className="fixed inset-y-0 right-0 w-64 bg-[#112240] p-4 shadow-lg z-50 md:hidden"
            >
              <div className="flex flex-col space-y-4">
                {['about', 'skills', 'projects', 'contact'].map((tab) => (
                  <Button
                    key={tab}
                    variant={activeTab === tab ? 'default' : 'ghost'}
                    onClick={() => {
                      setActiveTab(tab)
                      setIsMenuOpen(false)
                      if (tab === 'skills') setTypedSkills([])
                      if (tab === 'projects') {
                        setTypedProjects([])
                        setSelectedProject(null)
                      }
                    }}
                    className="text-lg hover:text-[#64ffda] transition-colors duration-300"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    {tab}.exe
                  </Button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            {activeTab === 'about' && (
              <section className="text-center">
                <motion.div
                  className="bg-[#112240] p-6 rounded-lg mb-8 max-w-2xl mx-auto"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-[#64ffda] mb-2">C:\Users\Developer&gt; run portfolio.exe</p>
                  <p className="text-[#8892b0]">{typedWelcome}<span className="animate-pulse">|</span></p>
                </motion.div>
                <motion.h1
                  className="text-3xl sm:text-4xl font-bold mb-4 text-[#ccd6f6] h-12"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  {typedTitle}<span className="animate-pulse">|</span>
                </motion.h1>
                <motion.p
                  className="text-lg sm:text-xl mb-8 h-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {typedDescription}<span className="animate-pulse">|</span>

                </motion.p>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <Button
                    size="lg"
                    className="bg-[#64ffda] hover:bg-[#64ffda]/90 text-[#0a192f] transition-colors duration-300"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    asChild
                  >
                    <a href="/path-to-your-resume.pdf" download="YourName_Resume.pdf">
                      Download Resume.pdf
                    </a>
                  </Button>
                </motion.div>
              </section>
            )}

            {activeTab === 'skills' && (
              <section className="bg-[#112240] p-6 rounded-lg max-w-2xl mx-auto">
                <p className="text-[#64ffda] mb-4">C:\Users\Developer&gt; list_skills.exe</p>
                <div className="font-mono grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {typedSkills.map((skill, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-2 mb-1"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <span className="text-[#64ffda]">{'>'}</span>
                      <span className="text-[#8892b0]">{skill}</span>
                      {skills[index].icon}
                    </motion.div>
                  ))}
                </div>
                {typedSkills.length < skills.length && (
                  <span className="animate-pulse text-[#64ffda]">|</span>
                )}
              </section>
            )}

            {activeTab === 'projects' && (
              <section className="bg-[#112240] p-6 rounded-lg  max-w-2xl mx-auto">
                <p className="text-[#64ffda] mb-4">C:\Users\Developer&gt; list_projects.exe</p>
                <div className="font-mono space-y-4">
                  {typedProjects.map((project, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-[#64ffda]">{'>'}</span>
                        <Button
                          variant="ghost"
                          className="text-[#8892b0] p-0 h-auto font-mono hover:text-[#64ffda] transition-colors duration-300"
                          onClick={() => setSelectedProject(project)}
                          onMouseEnter={() => setIsHovering(true)}
                          onMouseLeave={() => setIsHovering(false)}
                        >
                          {selectedProject === project ? <FolderOpen className="w-4 h-4 mr-2" /> : <Folder className="w-4 h-4 mr-2" />}
                          {project}
                        </Button>
                      </div>
                      {selectedProject === project && (
                        <motion.div
                          className="mt-4 p-4 bg-[#0a192f]/50 rounded-lg"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <img src={projects[index].image} alt={project} className="w-full h-40 object-cover rounded-lg mb-4" />
                          <p className="text-[#8892b0] mb-2">{projects[index].description}</p>
                          <p className="text-[#8892b0]">{projects[index].details}</p>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
                {typedProjects.length < projects.length && (
                  <span className="animate-pulse text-[#64ffda]">|</span>
                )}
              </section>
            )}

            {activeTab === 'contact' && (
              <section className="bg-[#112240] p-6 rounded-lg max-w-2xl mx-auto">
                <p className="text-[#64ffda] mb-4">C:\Users\Developer&gt; contact.exe</p>
                <div className="font-mono space-y-4">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="text-[#64ffda]">{'> '}Enter your name:</p>
                    <div className="flex items-center">
                      <span className="text-[#64ffda] mr-2">$</span>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onKeyDown={handleInputSubmit}
                        className="bg-transparent border-none text-[#8892b0] focus:ring-0 p-0 font-mono"
                        ref={currentInput === 'name' ? inputRef : null}
                        disabled={currentInput !== 'name'}
                      />
                    </div>
                  </motion.div>
                  {currentInput !== 'name' && (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <p className="text-[#64ffda]">{'> '}Enter your email:</p>
                      <div className="flex items-center">
                        <span className="text-[#64ffda] mr-2">$</span>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          onKeyDown={handleInputSubmit}
                          className="bg-transparent border-none text-[#8892b0] focus:ring-0 p-0 font-mono"
                          ref={currentInput === 'email' ? inputRef : null}
                          disabled={currentInput !== 'email'}
                        />
                      </div>
                    </motion.div>
                  )}
                  {currentInput === 'message' && (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <p className="text-[#64ffda]">{'> '}Enter your message:</p>
                      <div className="flex items-start">
                        <span className="text-[#64ffda] mr-2">$</span>
                        <Textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          onKeyDown={handleInputSubmit}
                          className="bg-transparent border-none text-[#8892b0] focus:ring-0 p-0 font-mono resize-none"
                          rows={3}
                        />
                      </div>
                    </motion.div>
                  )}
                  {currentInput === 'message' && (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      <Button
                        onClick={() => {
                          console.log('Form submitted:', formData)
                          setFormData({ name: '', email: '', message: '' })
                          setCurrentInput('name')
                        }}
                        className="bg-[#64ffda] hover:bg-[#64ffda]/90 text-[#0a192f] transition-colors duration-300 mt-4"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                      >
                        Submit
                      </Button>
                    </motion.div>
                  )}
                </div>
              </section>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="container mx-auto px-4 py-8 text-center">
        <p className="text-[#8892b0]">&copy; 2024 Varun Pradeep Shetti. All rights reserved.</p>
        <p className="text-[#8892b0] mt-2">
          <a href="mailto:varunpshetti.2003@gmail.com" className="hover:text-[#64ffda] transition-colors duration-300">
            varunpshetti.2003@gmail.com
          </a>
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-[#8892b0] hover:text-[#64ffda] transition-colors duration-300"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            asChild
          >
            <a href="mailto:varunpshetti.2003@gmail.com">
              <Mail className="w-6 h-6" />
              <span className="sr-only">Email</span>
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-[#8892b0] hover:text-[#64ffda] transition-colors duration-300"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            asChild
          >
            <a href="https://github.com/Varun122646" target="_blank" rel="noopener noreferrer">
              <Code className="w-6 h-6" />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-[#8892b0] hover:text-[#64ffda] transition-colors duration-300"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            asChild
          >
            <a href="https://www.linkedin.com/in/vshettidev/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-6 h-6" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </Button>
        </div>
      </footer>
    </div>
  )
}