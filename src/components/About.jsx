import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Film, Lightbulb, Zap } from 'lucide-react';

const ABOUT_TEXT = `// Hey there! I'm Abhishek — a developer, designer,
// and filmmaker who loves building things that
// live at the intersection of technology and art.
//
// I code full-stack apps, direct short films,
// and design interfaces that feel alive.
// Currently exploring the space where
// creativity meets engineering.`;

const stats = [
    { value: '03+', label: 'Years Coding', icon: Code2 },
    { value: '10+', label: 'Films Made', icon: Film },
    { value: '20+', label: 'Projects Built', icon: Lightbulb },
    { value: '∞', label: 'Ideas Brewing', icon: Zap },
];

function TypewriterText({ text, speed = 25, startTyping }) {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!startTyping) return;
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, speed);
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, text, speed, startTyping]);

    return (
        <span>
            {displayedText}
            {currentIndex < text.length && startTyping && <span className="cursor-blink" />}
            {currentIndex >= text.length && <span className="cursor-blink" />}
        </span>
    );
}

export default function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section
            id="about"
            className="relative py-24 md:py-32 noise-overlay"
            style={{ background: 'var(--color-bg)' }}
        >
            <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6" ref={ref}>
                {/* Section Label */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    <p className="section-label" style={{ color: 'var(--color-cyan)' }}>
                        {'// ABOUT_ME'}
                    </p>
                    <h2
                        className="text-3xl md:text-4xl font-bold mb-12"
                        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
                    >
                        who_am_i<span style={{ color: 'var(--color-cyan)' }}>()</span>
                    </h2>
                </motion.div>

                {/* Two Column Layout */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
                    {/* Left: Terminal Card Bio */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="terminal-window">
                            <div className="terminal-titlebar">
                                <div className="terminal-dot red" />
                                <div className="terminal-dot yellow" />
                                <div className="terminal-dot green" />
                                <span className="terminal-title">about.md — ~/portfolio</span>
                            </div>
                            <div className="terminal-body" style={{ minHeight: '280px' }}>
                                <pre
                                    style={{
                                        whiteSpace: 'pre-wrap',
                                        wordBreak: 'break-word',
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '0.85rem',
                                        lineHeight: '1.9',
                                        color: '#8b949e',
                                        margin: 0,
                                    }}
                                >
                                    <TypewriterText text={ABOUT_TEXT} speed={18} startTyping={isInView} />
                                </pre>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Stat Grid */}
                    <motion.div
                        className="grid grid-cols-2 gap-4"
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        {stats.map((stat, i) => {
                            const Icon = stat.icon;
                            return (
                                <motion.div
                                    key={stat.label}
                                    className="cyber-panel p-5 md:p-6 flex flex-col items-center justify-center text-center gap-3 glow-border"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                                    whileHover={{ scale: 1.03 }}
                                >
                                    <div
                                        className="relative z-10 p-2 rounded-md"
                                        style={{ background: 'rgba(0, 212, 255, 0.08)' }}
                                    >
                                        <Icon size={20} style={{ color: 'var(--color-cyan)' }} />
                                    </div>
                                    <span
                                        className="relative z-10 text-2xl md:text-3xl font-bold"
                                        style={{
                                            fontFamily: 'var(--font-mono)',
                                            color: 'var(--color-cyan)',
                                            textShadow: '0 0 20px rgba(0, 212, 255, 0.3)',
                                        }}
                                    >
                                        {stat.value}
                                    </span>
                                    <span
                                        className="relative z-10 text-xs uppercase tracking-wider"
                                        style={{
                                            fontFamily: 'var(--font-mono)',
                                            color: 'var(--color-muted)',
                                            letterSpacing: '0.15em',
                                        }}
                                    >
                                        {stat.label}
                                    </span>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
