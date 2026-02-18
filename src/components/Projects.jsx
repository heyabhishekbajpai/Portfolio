import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ExternalLink, X, Globe, Terminal, Cpu, Layers, ChevronRight } from 'lucide-react';

const projects = [
    {
        name: 'UrbanSetu',
        description: 'Smart city infrastructure monitoring and reporting platform with AI-powered road condition analysis.',
        longDescription: `UrbanSetu is a comprehensive smart city platform that empowers citizens to report and track urban infrastructure issues. Using TensorFlow-based image classification, the app automatically detects road conditions from uploaded photos. Built with React on the frontend and Supabase for real-time backend services, it integrates OpenStreetMap for geolocation-based reporting. The platform features user authentication, issue tracking dashboards, and admin panels for municipal authorities.`,
        tags: ['React', 'Supabase', 'TensorFlow', 'OpenStreetMap'],
        type: 'Full Stack Web App',
        typeIcon: Globe,
        features: [
            'AI-powered road condition detection using Teachable Machine',
            'Real-time issue reporting with geolocation',
            'Interactive map view with OpenStreetMap integration',
            'Admin dashboard for municipal authorities',
            'User authentication and profile management',
        ],
        link: 'https://urbansetu.co.in',
        featured: true,
        gridClass: 'md:col-span-2 md:row-span-2',
    },
    {
        name: 'Portfolio v3',
        description: 'This cyberpunk-themed developer portfolio built with React and Framer Motion.',
        longDescription: `A dark, cyberpunk-inspired portfolio website designed to feel like a developer's personal OS. Features terminal-style UI components, typewriter animations, bento grid layouts, and a comprehensive design system with custom noise textures, scanline overlays, and neon glow effects. Built with React + Vite for blazing fast performance and Framer Motion for scroll-triggered animations.`,
        tags: ['React', 'Vite', 'Framer Motion', 'Tailwind CSS'],
        type: 'Frontend Web App',
        typeIcon: Globe,
        features: [
            'Cyberpunk terminal-style design system',
            'Scroll-triggered animations with Framer Motion',
            'Typewriter effect and fake terminal outputs',
            'Bento grid project showcase',
            'Fully responsive design',
        ],
        link: 'https://bajpai.tech',
        featured: false,
        gridClass: 'md:col-span-1',
    },
    {
        name: 'Film Reel',
        description: 'A curated gallery of short films and video projects with embedded playback.',
        longDescription: `Film Reel is a personal archive and showcase of short films, music videos, and visual storytelling projects. Each project is documented with behind-the-scenes details, crew credits, and embedded video playback. The gallery features a film-grain aesthetic with lightbox modals for inline viewing.`,
        tags: ['Premiere Pro', 'After Effects', 'DaVinci Resolve'],
        type: 'Film / Video',
        typeIcon: Layers,
        features: [
            'Curated gallery of short films and videos',
            'Inline playback with lightbox modal',
            'Behind-the-scenes documentation',
            'Film-grain aesthetic CSS overlays',
        ],
        link: null,
        featured: false,
        gridClass: 'md:col-span-1',
    },
    {
        name: 'CodePen Labs',
        description: 'Collection of creative frontend experiments, animations, and UI components.',
        longDescription: `A playground of creative frontend experiments built purely with HTML, CSS, and vanilla JavaScript. Includes CSS art, interactive animations, UI micro-interactions, and experimental layout techniques. Each experiment is self-contained and designed to push the boundaries of what's possible with web technologies.`,
        tags: ['HTML', 'CSS', 'JavaScript'],
        type: 'Frontend Experiments',
        typeIcon: Terminal,
        features: [
            'CSS art and creative animations',
            'UI micro-interaction prototypes',
            'Experimental layout techniques',
            'Pure vanilla JS — no frameworks',
        ],
        link: null,
        featured: false,
        gridClass: 'md:col-span-1',
    },
    {
        name: 'Design System',
        description: 'A modular design system for consistent UI across personal projects.',
        longDescription: `A comprehensive design system built in Figma and implemented in React, featuring reusable components, color tokens, typography scales, and spacing systems. Ensures visual consistency across all personal projects while maintaining flexibility for different design contexts.`,
        tags: ['Figma', 'React', 'CSS Variables'],
        type: 'Design / Frontend',
        typeIcon: Layers,
        features: [
            'Reusable React component library',
            'Design tokens for colors, spacing, and typography',
            'Figma component library with variants',
            'Dark mode support built-in',
        ],
        link: null,
        featured: false,
        gridClass: 'md:col-span-1',
    },
    {
        name: 'CLI Tools',
        description: 'Custom command-line utilities for workflow automation and dev tooling.',
        longDescription: `A collection of custom CLI tools built with Python and Node.js for automating repetitive development workflows. Includes scripts for project scaffolding, batch file processing, git workflow automation, and deployment helpers. Designed to run on Linux and integrate with existing shell workflows.`,
        tags: ['Python', 'Node.js', 'Bash'],
        type: 'Backend / Automation',
        typeIcon: Cpu,
        features: [
            'Project scaffolding automation',
            'Git workflow helpers',
            'Batch file processing utilities',
            'Deployment scripts for various platforms',
            'Linux-native shell integration',
        ],
        link: null,
        featured: false,
        gridClass: 'md:col-span-2',
    },
];

/* ─── PROJECT DETAIL MODAL ─── */
function ProjectDetailModal({ project, onClose }) {
    if (!project) return null;
    const TypeIcon = project.typeIcon;

    return (
        <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0"
                style={{ background: 'rgba(2, 2, 5, 0.92)', backdropFilter: 'blur(10px)' }}
            />

            {/* Modal */}
            <motion.div
                className="relative z-10 w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-lg"
                style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    boxShadow: '0 0 60px rgba(0, 212, 255, 0.08)',
                }}
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div
                    className="flex items-start justify-between p-6 md:p-8"
                    style={{ borderBottom: '1px solid var(--color-border)' }}
                >
                    <div>
                        {/* Type Badge */}
                        <div className="flex items-center gap-2 mb-3">
                            <TypeIcon size={14} style={{ color: 'var(--color-cyan)' }} />
                            <span
                                className="text-xs uppercase tracking-wider"
                                style={{
                                    fontFamily: 'var(--font-mono)',
                                    color: 'var(--color-cyan)',
                                    fontSize: '0.65rem',
                                    letterSpacing: '0.15em',
                                }}
                            >
                                {project.type}
                            </span>
                        </div>

                        {/* Title */}
                        <h2
                            className="text-2xl md:text-3xl font-bold"
                            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text)' }}
                        >
                            {project.name}
                        </h2>
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="p-2 rounded-md transition-all duration-100 hover:bg-white/10 flex-shrink-0 ml-4"
                        style={{ color: 'var(--color-muted)', cursor: 'pointer' }}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 md:p-8">
                    {/* Description */}
                    <div className="mb-8">
                        <p
                            className="section-label mb-3"
                            style={{ color: 'var(--color-cyan)' }}
                        >
                            {'// DESCRIPTION'}
                        </p>
                        <p
                            className="text-sm leading-relaxed"
                            style={{
                                fontFamily: 'var(--font-body)',
                                color: 'var(--color-muted)',
                                lineHeight: '1.8',
                            }}
                        >
                            {project.longDescription}
                        </p>
                    </div>

                    {/* Features */}
                    {project.features && project.features.length > 0 && (
                        <div className="mb-8">
                            <p
                                className="section-label mb-3"
                                style={{ color: 'var(--color-cyan)' }}
                            >
                                {'// FEATURES'}
                            </p>
                            <ul className="space-y-2">
                                {project.features.map((feature, i) => (
                                    <motion.li
                                        key={i}
                                        className="flex items-start gap-2 text-sm"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + i * 0.05 }}
                                    >
                                        <ChevronRight
                                            size={14}
                                            className="mt-0.5 flex-shrink-0"
                                            style={{ color: 'var(--color-cyan)' }}
                                        />
                                        <span
                                            style={{
                                                fontFamily: 'var(--font-body)',
                                                color: '#a0a0b0',
                                                lineHeight: '1.6',
                                            }}
                                        >
                                            {feature}
                                        </span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Tech Stack */}
                    <div className="mb-8">
                        <p
                            className="section-label mb-3"
                            style={{ color: 'var(--color-cyan)' }}
                        >
                            {'// TECH_STACK'}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs px-3 py-1.5 rounded"
                                    style={{
                                        fontFamily: 'var(--font-mono)',
                                        color: 'var(--color-cyan)',
                                        background: 'rgba(0, 212, 255, 0.08)',
                                        border: '1px solid rgba(0, 212, 255, 0.15)',
                                        fontSize: '0.72rem',
                                        letterSpacing: '0.05em',
                                    }}
                                >
                                    [ {tag} ]
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Link / CTA */}
                    {project.link ? (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-visit-btn inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm"
                            style={{
                                fontFamily: 'var(--font-mono)',
                                textDecoration: 'none',
                            }}
                        >
                            <Globe size={16} />
                            Visit Project
                            <ArrowUpRight size={14} />
                        </a>
                    ) : (
                        <div
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-xs"
                            style={{
                                fontFamily: 'var(--font-mono)',
                                color: 'var(--color-muted)',
                                background: 'rgba(255, 255, 255, 0.03)',
                                border: '1px solid var(--color-border)',
                                letterSpacing: '0.05em',
                            }}
                        >
                            <Terminal size={14} />
                            This project is not hosted publicly
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Styles for Visit button */}
            <style>{`
                .project-visit-btn {
                    color: #00d4ff;
                    background: rgba(0, 212, 255, 0.08);
                    border: 1px solid rgba(0, 212, 255, 0.25);
                    transition: all 0.1s ease;
                }
                .project-visit-btn:hover {
                    background: rgba(0, 212, 255, 0.15);
                    border-color: #00d4ff;
                    box-shadow: 0 0 20px rgba(0, 212, 255, 0.3), 0 0 40px rgba(0, 212, 255, 0.1);
                    color: #fff;
                }
            `}</style>
        </motion.div>
    );
}

/* ─── PROJECT CARD ─── */
function ProjectCard({ project, index, isInView, onSelect }) {
    return (
        <motion.div
            className={`bento-card group cursor-pointer flex flex-col justify-between ${project.gridClass} ${project.featured ? 'min-h-[320px] md:min-h-[400px]' : 'min-h-[180px]'}`}
            style={project.featured ? {
                backgroundImage: 'linear-gradient(135deg, rgba(0, 212, 255, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%)',
            } : {}}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            whileHover={{ y: -4 }}
            onClick={() => onSelect(project)}
        >
            {/* Top Row */}
            <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                    <h3
                        className="text-lg md:text-xl font-bold"
                        style={{
                            fontFamily: 'var(--font-mono)',
                            color: 'var(--color-text)',
                        }}
                    >
                        {project.name}
                    </h3>
                    <div
                        className="p-1.5 rounded-md transition-all duration-100 group-hover:bg-cyan-500/10"
                    >
                        <ArrowUpRight
                            size={18}
                            className="transition-transform duration-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            style={{ color: 'var(--color-muted)' }}
                        />
                    </div>
                </div>
                <p
                    className="text-sm mb-4 leading-relaxed"
                    style={{
                        fontFamily: 'var(--font-body)',
                        color: 'var(--color-muted)',
                        maxWidth: '500px',
                    }}
                >
                    {project.description}
                </p>
            </div>

            {/* Tags */}
            <div className="relative z-10 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                    <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded"
                        style={{
                            fontFamily: 'var(--font-mono)',
                            color: 'var(--color-cyan)',
                            background: 'rgba(0, 212, 255, 0.08)',
                            border: '1px solid rgba(0, 212, 255, 0.15)',
                            fontSize: '0.7rem',
                            letterSpacing: '0.05em',
                        }}
                    >
                        [ {tag} ]
                    </span>
                ))}
            </div>

            {/* Featured badge */}
            {project.featured && (
                <div
                    className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded"
                    style={{
                        background: 'rgba(0, 212, 255, 0.1)',
                        border: '1px solid rgba(0, 212, 255, 0.2)',
                    }}
                >
                    <ExternalLink size={12} style={{ color: 'var(--color-cyan)' }} />
                    <span
                        className="text-xs uppercase tracking-wider"
                        style={{
                            fontFamily: 'var(--font-mono)',
                            color: 'var(--color-cyan)',
                            fontSize: '0.65rem',
                            letterSpacing: '0.15em',
                        }}
                    >
                        Featured
                    </span>
                </div>
            )}
        </motion.div>
    );
}

/* ─── PROJECTS SECTION ─── */
export default function Projects() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <>
            <section
                id="projects"
                className="relative py-24 md:py-32 noise-overlay"
                style={{ background: 'var(--color-bg)' }}
            >
                <div className="section-divider" />

                <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 pt-16" ref={ref}>
                    {/* Section Label */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="section-label" style={{ color: 'var(--color-cyan)' }}>
                            {'// PROJECTS'}
                        </p>
                        <h2
                            className="text-3xl md:text-4xl font-bold mb-12"
                            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
                        >
                            build_log<span style={{ color: 'var(--color-cyan)' }}>()</span>
                        </h2>
                    </motion.div>

                    {/* Bento Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {projects.map((project, i) => (
                            <ProjectCard
                                key={project.name}
                                project={project}
                                index={i}
                                isInView={isInView}
                                onSelect={setSelectedProject}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Project Detail Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectDetailModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
