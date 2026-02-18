import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Copy, Check, Github, Linkedin, Youtube, Instagram, Twitter, ArrowRight } from 'lucide-react';

const EMAIL = 'bajpai.connect@gmail.com';

const socials = [
    {
        icon: Github,
        url: 'https://github.com/heyabhishekbajpai',
        label: 'GitHub',
    },
    {
        icon: Linkedin,
        url: 'https://www.linkedin.com/in/heybajpai/',
        label: 'LinkedIn',
    },
    {
        icon: Youtube,
        url: 'https://www.youtube.com/@abhishek.bajpai',
        label: 'YouTube',
    },
    {
        icon: Instagram,
        url: 'https://www.instagram.com/hey.bajpai/',
        label: 'Instagram',
    },
    {
        icon: Twitter,
        url: 'https://x.com/BajpaiX',
        label: 'X / Twitter',
    },
];

export default function Contact() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [copied, setCopied] = useState(false);

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            // Fallback
            const textArea = document.createElement('textarea');
            textArea.value = EMAIL;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <section
            id="contact"
            className="relative py-32 md:py-44 noise-overlay"
            style={{ background: 'var(--color-bg)' }}
        >
            <div className="section-divider" />

            <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-6 pt-16 text-center" ref={ref}>
                {/* Section Label */}
                <motion.p
                    className="section-label mb-6"
                    style={{ color: 'var(--color-cyan)' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    {'// CONTACT'}
                </motion.p>

                {/* Main Heading */}
                <motion.h2
                    className="text-4xl md:text-6xl font-bold mb-6"
                    style={{
                        fontFamily: 'var(--font-display)',
                        color: 'var(--color-text)',
                        lineHeight: 1.2,
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    Let's make
                    <br />
                    <span style={{ color: 'var(--color-cyan)' }}>something.</span>
                </motion.h2>

                {/* Subtext */}
                <motion.p
                    className="text-sm mb-10"
                    style={{
                        fontFamily: 'var(--font-body)',
                        color: 'var(--color-muted)',
                        maxWidth: '400px',
                        margin: '0 auto 2.5rem',
                    }}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    Got a project in mind? Want to collaborate on something cool?
                    Drop me a line.
                </motion.p>

                {/* Email CTA Button */}
                <motion.button
                    onClick={copyEmail}
                    className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-lg transition-all duration-100 mb-12"
                    style={{
                        background: copied
                            ? 'rgba(40, 200, 64, 0.1)'
                            : 'rgba(0, 212, 255, 0.08)',
                        border: `1px solid ${copied ? 'rgba(40, 200, 64, 0.3)' : 'rgba(0, 212, 255, 0.25)'}`,
                        fontFamily: 'var(--font-mono)',
                        color: copied ? '#28c840' : 'var(--color-cyan)',
                        fontSize: '0.95rem',
                        cursor: 'pointer',
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    whileHover={{
                        boxShadow: '0 0 40px rgba(0, 212, 255, 0.15)',
                        borderColor: 'rgba(0, 212, 255, 0.5)',
                    }}
                    whileTap={{ scale: 0.98 }}
                >
                    {copied ? (
                        <>
                            <Check size={18} />
                            Copied!
                        </>
                    ) : (
                        <>
                            <ArrowRight size={18} className="transition-transform duration-100 group-hover:translate-x-1" />
                            {EMAIL}
                            <Copy size={14} style={{ color: 'var(--color-muted)', marginLeft: '4px' }} />
                        </>
                    )}
                </motion.button>

                {/* Terminal send_message */}
                <motion.div
                    className="mb-12"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <a
                        href={`mailto:${EMAIL}`}
                        className="inline-block transition-all duration-100 hover:text-cyan-400"
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.8rem',
                            color: 'var(--color-muted)',
                            textDecoration: 'none',
                        }}
                    >
                        {'>'} send_message()<span className="cursor-blink" />
                    </a>
                </motion.div>

                {/* Neon hover styles */}
                <style>{`
                    .social-neon {
                        border: 1px solid #1a1a2e;
                        color: #6b7280;
                        background: transparent;
                        transition: all 0.1s ease;
                    }
                    .social-neon:hover {
                        color: #00d4ff !important;
                        border-color: #00d4ff !important;
                        box-shadow: 0 0 15px rgba(0, 212, 255, 0.4), 0 0 30px rgba(0, 212, 255, 0.2), inset 0 0 10px rgba(0, 212, 255, 0.1) !important;
                        background: rgba(0, 212, 255, 0.06) !important;
                        transform: translateY(-3px);
                    }
                    .social-neon:hover svg {
                        filter: drop-shadow(0 0 6px rgba(0, 212, 255, 0.8));
                    }
                `}</style>

                {/* Social Icons */}
                <motion.div
                    className="flex items-center justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    {socials.map((social, i) => {
                        const Icon = social.icon;
                        return (
                            <motion.a
                                key={social.label}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-neon p-3 rounded-lg"
                                initial={{ opacity: 0, y: 10 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.3, delay: 0.7 + i * 0.1 }}
                                aria-label={social.label}
                            >
                                <Icon size={20} />
                            </motion.a>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
