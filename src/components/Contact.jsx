import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, Mail, Linkedin, Github, Youtube, Instagram, Twitter, MessageCircle } from 'lucide-react';

export default function Contact() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState({ type: '', message: '' });

    const socialLinks = [
        {
            name: 'LinkedIn',
            icon: <Linkedin size={24} />,
            url: 'https://www.linkedin.com/in/heybajpai/',
            color: 'hover:text-blue-500'
        },
        {
            name: 'GitHub',
            icon: <Github size={24} />,
            url: 'https://github.com/heyabhishekbajpai',
            color: 'hover:text-gray-400'
        },
        {
            name: 'YouTube',
            icon: <Youtube size={24} />,
            url: 'https://www.youtube.com/@abhishek.bajpai',
            color: 'hover:text-red-500'
        },
        {
            name: 'Email',
            icon: <Mail size={24} />,
            url: 'mailto:bajpai.connect@gmail.com',
            color: 'hover:text-green-500'
        },
        {
            name: 'Twitter',
            icon: <Twitter size={24} />,
            url: 'https://x.com/BajpaiX',
            color: 'hover:text-blue-400'
        },
        {
            name: 'Instagram',
            icon: <Instagram size={24} />,
            url: 'https://www.instagram.com/hey.bajpai/',
            color: 'hover:text-pink-500'
        },
        {
            name: 'WhatsApp',
            icon: <MessageCircle size={24} />,
            url: 'https://wa.me/917307457138?text=Hey%20Abhishek',
            color: 'hover:text-green-500'
        },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            setStatus({ type: 'error', message: 'Please fill in all fields' });
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setStatus({ type: 'error', message: 'Please enter a valid email' });
            return;
        }

        // Simulated success (replace with actual backend call)
        setStatus({ type: 'success', message: 'Message sent successfully! I\'ll get back to you soon.' });
        setFormData({ name: '', email: '', message: '' });

        setTimeout(() => setStatus({ type: '', message: '' }), 5000);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section id="contact" className="relative py-20 md:py-32 bg-black">
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
                            <span className="gradient-text">Let's Connect</span>
                        </h2>
                        <p className="text-white/70 text-lg max-w-2xl mx-auto mb-4">
                            Have a project in mind or just want to chat? Feel free to reach out!
                        </p>
                        <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto rounded-full" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-white/80 font-medium mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white/5 text-white placeholder-white/40"
                                        placeholder="Enter your name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-white/80 font-medium mb-2">
                                        Your Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white/5 text-white placeholder-white/40"
                                        placeholder="your.email@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-white/80 font-medium mb-2">
                                        Your Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="6"
                                        className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white/5 text-white placeholder-white/40 resize-none"
                                        placeholder="Tell me about your project or just say hi..."
                                    />
                                </div>

                                {/* Status Message */}
                                {status.message && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`p-4 rounded-lg ${status.type === 'success'
                                                ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                                                : 'bg-red-500/20 text-red-400 border border-red-500/50'
                                            }`}
                                    >
                                        {status.message}
                                    </motion.div>
                                )}

                                <button
                                    type="submit"
                                    className="w-full px-6 py-4 bg-gradient-to-r from-primary to-secondary rounded-lg font-medium hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 flex items-center justify-center gap-2 group"
                                >
                                    <Send size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                                    Send Message
                                </button>
                            </form>
                        </motion.div>

                        {/* Social Links & Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="space-y-8"
                        >
                            {/* Call to Action */}
                            <div className="glass p-8 rounded-2xl">
                                <h3 className="text-2xl font-bold text-white mb-4">
                                    Let's Build Something Amazing!
                                </h3>
                                <p className="text-white/70 mb-6">
                                    I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                                </p>
                                <div className="space-y-3 text-white/80">
                                    <p className="flex items-center gap-3">
                                        <Mail size={20} className="text-accent" />
                                        bajpai.connect@gmail.com
                                    </p>
                                    <p className="flex items-center gap-3">
                                        <Linkedin size={20} className="text-accent" />
                                        Active on LinkedIn
                                    </p>
                                </div>
                            </div>

                            {/* Social Media Links */}
                            <div className="glass p-8 rounded-2xl">
                                <h3 className="text-xl font-bold text-white mb-6">
                                    Connect With Me
                                </h3>
                                <div className="grid grid-cols-4 gap-4">
                                    {socialLinks.map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`flex items-center justify-center p-4 glass rounded-lg hover:bg-white/20 transition-all duration-300 ${social.color} group`}
                                            title={social.name}
                                        >
                                            <span className="transform group-hover:scale-110 transition-transform duration-300">
                                                {social.icon}
                                            </span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
