import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X, Eye } from 'lucide-react';

const designWorks = [
    {
        title: 'Brand Identity — Aurora',
        category: 'Branding',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=800&fit=crop',
    },
    {
        title: 'Mobile App UI — Fitness',
        category: 'UI/UX',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop',
    },
    {
        title: 'Poster Design — Neon',
        category: 'Print',
        image: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=600&h=700&fit=crop',
    },
    {
        title: 'Dashboard UI — Analytics',
        category: 'UI/UX',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    },
    {
        title: 'Typography — Experimental',
        category: 'Type Design',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=600&fit=crop',
    },
    {
        title: 'Movie Poster — Midnight',
        category: 'Print',
        image: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=600&h=800&fit=crop',
    },
    {
        title: 'Web Design — Portfolio',
        category: 'Web',
        image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop',
    },
    {
        title: 'Logo Design — Minimal',
        category: 'Branding',
        image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=500&fit=crop',
    },
];

function DesignCard({ work, index, isInView, onOpen }) {
    return (
        <motion.div
            className="group relative cursor-pointer overflow-hidden rounded-lg"
            style={{
                border: '1px solid rgba(124, 58, 237, 0.15)',
                breakInside: 'avoid',
                marginBottom: '16px',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08 * index }}
            onClick={() => onOpen(work)}
            whileHover={{ scale: 1.01 }}
        >
            <img
                src={work.image}
                alt={work.title}
                className="w-full h-auto block transition-transform duration-150 group-hover:scale-[1.03]"
                loading="lazy"
            />

            {/* Hover Overlay */}
            <div
                className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-100"
                style={{
                    background: 'rgba(5, 5, 8, 0.8)',
                    backdropFilter: 'blur(4px)',
                }}
            >
                <Eye size={24} style={{ color: 'var(--color-cyan)', marginBottom: '12px' }} />
                <h4
                    className="text-sm font-semibold text-center px-4"
                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text)' }}
                >
                    {work.title}
                </h4>
                <span
                    className="text-xs mt-2 px-3 py-1 rounded"
                    style={{
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--color-purple)',
                        background: 'rgba(124, 58, 237, 0.15)',
                        border: '1px solid rgba(124, 58, 237, 0.2)',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        fontSize: '0.65rem',
                    }}
                >
                    {work.category}
                </span>
            </div>
        </motion.div>
    );
}

function Lightbox({ work, onClose }) {
    if (!work) return null;

    return (
        <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0"
                style={{ background: 'rgba(0, 0, 0, 0.92)', backdropFilter: 'blur(8px)' }}
            />

            {/* Content */}
            <motion.div
                className="relative z-10 max-w-3xl w-full"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute -top-12 right-0 p-2 rounded-md transition-all duration-100 hover:bg-white/10"
                    style={{ color: 'var(--color-muted)' }}
                >
                    <X size={24} />
                </button>

                <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-auto rounded-lg"
                    style={{
                        maxHeight: '80vh',
                        objectFit: 'contain',
                        border: '1px solid var(--color-border)',
                        boxShadow: '0 0 60px rgba(124, 58, 237, 0.1)',
                    }}
                />

                <div className="mt-4 text-center">
                    <h3
                        className="text-lg font-bold"
                        style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text)' }}
                    >
                        {work.title}
                    </h3>
                    <span
                        className="inline-block text-xs mt-2 px-3 py-1 rounded"
                        style={{
                            fontFamily: 'var(--font-mono)',
                            color: 'var(--color-purple)',
                            background: 'rgba(124, 58, 237, 0.15)',
                            border: '1px solid rgba(124, 58, 237, 0.2)',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            fontSize: '0.65rem',
                        }}
                    >
                        {work.category}
                    </span>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function Design() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [activeWork, setActiveWork] = useState(null);

    return (
        <>
            <section
                id="design"
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
                        <p
                            className="section-label"
                            style={{ color: '#7c3aed' }}
                        >
                            {'// DESIGN_WORK'}
                        </p>
                        <h2
                            className="text-3xl md:text-4xl font-bold mb-12"
                            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
                        >
                            visual_gallery<span style={{ color: '#7c3aed' }}>()</span>
                        </h2>
                    </motion.div>

                    {/* Masonry Grid */}
                    <div
                        style={{
                            columnCount: 3,
                            columnGap: '16px',
                        }}
                        className="masonry-grid"
                    >
                        {designWorks.map((work, i) => (
                            <DesignCard
                                key={work.title}
                                work={work}
                                index={i}
                                isInView={isInView}
                                onOpen={setActiveWork}
                            />
                        ))}
                    </div>

                    {/* Responsive override */}
                    <style>{`
                        @media (max-width: 1024px) {
                            .masonry-grid { column-count: 2 !important; }
                        }
                        @media (max-width: 640px) {
                            .masonry-grid { column-count: 1 !important; }
                        }
                    `}</style>
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {activeWork && (
                    <Lightbox work={activeWork} onClose={() => setActiveWork(null)} />
                )}
            </AnimatePresence>
        </>
    );
}
