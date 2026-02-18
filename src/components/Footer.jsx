import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, Heart, Linkedin, Github, Youtube, Mail } from 'lucide-react';

export default function Footer() {
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 500);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const socialLinks = [
        { icon: <Linkedin size={16} />, url: 'https://www.linkedin.com/in/heybajpai/' },
        { icon: <Github size={16} />, url: 'https://github.com/heyabhishekbajpai' },
        { icon: <Youtube size={16} />, url: 'https://www.youtube.com/@abhishek.bajpai' },
        { icon: <Mail size={16} />, url: 'mailto:bajpai.connect@gmail.com' },
    ];

    return (
        <footer
            className="relative py-8"
            style={{
                background: 'var(--color-surface)',
                borderTop: '1px solid var(--color-border)',
            }}
        >
            <div className="max-w-6xl mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* Left — Brand */}
                    <p
                        className="flex items-center gap-2 text-xs"
                        style={{
                            fontFamily: 'var(--font-mono)',
                            color: 'var(--color-muted)',
                        }}
                    >
                        © {new Date().getFullYear()} Abhishek Bajpai
                        <span style={{ color: 'var(--color-border)' }}>|</span>
                        Built with <Heart size={12} style={{ color: '#ff5f57' }} /> & React
                    </p>

                    {/* Right — Socials */}
                    <div className="flex items-center gap-2">
                        {socialLinks.map((social, idx) => (
                            <a
                                key={idx}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded transition-all duration-100 hover:bg-white/5"
                                style={{ color: 'var(--color-muted)' }}
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Back to Top Button */}
            {showBackToTop && (
                <motion.button
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 p-3 rounded-lg z-40 transition-all duration-100"
                    style={{
                        background: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-cyan)',
                        cursor: 'pointer',
                    }}
                    whileHover={{
                        borderColor: 'rgba(0, 212, 255, 0.4)',
                        boxShadow: '0 0 20px rgba(0, 212, 255, 0.15)',
                        scale: 1.05,
                    }}
                    whileTap={{ scale: 0.95 }}
                >
                    <ChevronUp size={20} />
                </motion.button>
            )}
        </footer>
    );
}
