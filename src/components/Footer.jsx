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
        { icon: <Linkedin size={20} />, url: 'https://www.linkedin.com/in/heybajpai/' },
        { icon: <Github size={20} />, url: 'https://github.com/heyabhishekbajpai' },
        { icon: <Youtube size={20} />, url: 'https://www.youtube.com/@abhishek.bajpai' },
        { icon: <Mail size={20} />, url: 'mailto:bajpai.connect@gmail.com' },
    ];

    return (
        <footer className="relative bg-gradient-to-t from-black via-gray-900 to-black py-12 border-t border-white/10">
            <div className="container mx-auto px-4 md:px-6">

                {/* Main Footer Content */}
                <div className="max-w-6xl mx-auto">

                    {/* Top Section */}
                    <div className="grid md:grid-cols-3 gap-8 mb-8">

                        {/* Brand */}
                        <div>
                            <h3 className="text-2xl font-bold gradient-text mb-3">
                                Abhishek Bajpai
                            </h3>
                            <p className="text-white/60 text-sm">
                                Aspiring Full Stack Developer passionate about creating digital experiences with code, design, and storytelling.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
                            <ul className="space-y-2 text-white/60 text-sm">
                                <li>
                                    <a href="#about" className="hover:text-white transition-colors duration-300">About</a>
                                </li>
                                <li>
                                    <a href="#skills" className="hover:text-white transition-colors duration-300">Skills</a>
                                </li>
                                <li>
                                    <a href="#projects" className="hover:text-white transition-colors duration-300">Projects</a>
                                </li>
                                <li>
                                    <a href="#contact" className="hover:text-white transition-colors duration-300">Contact</a>
                                </li>
                            </ul>
                        </div>

                        {/* Social Links */}
                        <div>
                            <h4 className="text-white font-semibold mb-3">Connect</h4>
                            <div className="flex gap-3">
                                {socialLinks.map((social, idx) => (
                                    <a
                                        key={idx}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 glass rounded-lg hover:bg-white/20 hover:scale-110 transition-all duration-300"
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

                    {/* Bottom Section */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white/60 text-sm">
                        <p className="flex items-center gap-1">
                            © {new Date().getFullYear()} Abhishek Bajpai. Made with <Heart size={16} className="text-red-500 fill-red-500" /> and React.
                        </p>
                        <p>
                            All rights reserved.
                        </p>
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
                    className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-primary to-secondary rounded-full shadow-lg hover:shadow-primary/50 transition-all duration-300 z-40 group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <ChevronUp size={24} className="text-white group-hover:animate-bounce" />
                </motion.button>
            )}
        </footer>
    );
}
