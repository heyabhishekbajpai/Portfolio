import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, Filter } from 'lucide-react';

/**
 * PROJECTS SECTION - READY FOR SUPABASE INTEGRATION
 * 
 * To connect to Supabase:
 * 1. Install: npm install @supabase/supabase-js
 * 2. Create Supabase client in src/lib/supabase.js
 * 3. Replace 'dummyProjects' with data fetched from Supabase
 * 4. Add CRUD operations for managing projects
 */

export default function Projects() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [activeFilter, setActiveFilter] = useState('All');

    // DUMMY DATA - Replace with Supabase data
    const dummyProjects = [
        {
            id: 1,
            title: 'Urban Setu',
            description: 'AI-powered urban problem reporting application with real-time geolocation and Teachable Machine integration.',
            image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop',
            techStack: ['React', 'Supabase', 'AI/ML', 'Geolocation'],
            category: 'Full Stack',
            demoUrl: '#',
            githubUrl: 'https://github.com/heyabhishekbajpai',
        },
        {
            id: 2,
            title: 'Portfolio Website',
            description: 'Personal portfolio showcasing projects, designs, and films with stunning Aurora background animation.',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
            techStack: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
            category: 'Full Stack',
            demoUrl: '#',
            githubUrl: 'https://github.com/heyabhishekbajpai/Portfolio',
        },
        {
            id: 3,
            title: 'DSA Problem Solver',
            description: 'Collection of optimized Data Structures and Algorithms solutions in Java with detailed explanations.',
            image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=500&fit=crop',
            techStack: ['Java', 'Algorithms', 'Problem Solving'],
            category: 'DSA',
            demoUrl: '#',
            githubUrl: 'https://github.com/heyabhishekbajpai',
        },
    ];

    const filters = ['All', 'Full Stack', 'DSA', 'Other'];

    const filteredProjects = activeFilter === 'All'
        ? dummyProjects
        : dummyProjects.filter(project => project.category === activeFilter);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

    return (
        <section id="projects" className="relative py-20 md:py-32 bg-gradient-to-b from-black via-gray-900 to-black">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    {/* Section Title */}
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                            <span className="gradient-text">Featured Projects</span>
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto rounded-full" />
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${activeFilter === filter
                                        ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/50'
                                        : 'glass text-white/70 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    {/* Projects Grid */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
                    >
                        {filteredProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                variants={itemVariants}
                                className="glass rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 group"
                            >
                                {/* Project Image */}
                                <div className="relative overflow-hidden h-48 bg-gray-800">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>

                                {/* Project Content */}
                                <div className="p-6 space-y-4">
                                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text transition-all duration-300">
                                        {project.title}
                                    </h3>

                                    <p className="text-white/70 text-sm md:text-base line-clamp-3">
                                        {project.description}
                                    </p>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.techStack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 text-xs font-medium bg-white/10 text-white/80 rounded-full"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3 pt-4">
                                        <a
                                            href={project.demoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary rounded-lg font-medium hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
                                        >
                                            <ExternalLink size={16} />
                                            View Demo
                                        </a>
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 px-4 py-2 glass rounded-lg font-medium hover:bg-white/20 transition-all duration-300"
                                        >
                                            <Github size={16} />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
