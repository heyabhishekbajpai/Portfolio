import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Aurora from './Aurora';
import RotatingText from './RotatingText';

export default function Hero() {
    const scrollToNext = () => {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" style={{ position: 'relative', width: '100%', minHeight: '100vh', background: '#000', color: '#fff', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Aurora Background Layer */}
            <Aurora
                colorStops={['#3915ac', '#785bec', '#21a2f2']}
                amplitude={0.40}
                blend={0.45}
                speed={1.0}
            />

            {/* Hero Content Layer */}
            <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', width: '100%' }}>
                {/* Grid Layout: Text Left, Image Right */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>

                    {/* Left Side - Text Content */}
                    <motion.div
                        style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left' }}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {/* Greeting */}
                        <motion.p
                            style={{
                                fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
                                fontWeight: '500',
                                color: '#ffffff',
                                fontFamily: 'ui-sans-serif, system-ui, -apple-system, sans-serif',
                                margin: 0
                            }}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Hi, I'm
                        </motion.p>

                        {/* Main Heading */}
                        <motion.h1
                            style={{
                                fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                                fontWeight: 'bold',
                                background: 'linear-gradient(to right, #3915ac, #785bec, #21a2f2)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                margin: 0,
                                lineHeight: 1.2
                            }}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            Abhishek Bajpai
                        </motion.h1>

                        {/* Subtitle with Rotating Text */}
                        <motion.h2
                            style={{
                                fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
                                fontWeight: '500',
                                color: '#e5e5e5',
                                fontFamily: 'ui-sans-serif, system-ui, -apple-system, sans-serif',
                                margin: 0
                            }}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            What am I? <RotatingText words={['Developer', 'Designer', 'Filmmaker']} />
                        </motion.h2>

                        {/* Tagline */}
                        <motion.p
                            style={{
                                fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                                color: '#b3b3b3',
                                maxWidth: '600px',
                                margin: 0,
                                lineHeight: 1.6,
                                fontFamily: 'ui-sans-serif, system-ui, -apple-system, sans-serif'
                            }}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                        >
                            Building digital experiences with code, design, and storytelling
                        </motion.p>
                    </motion.div>

                    {/* Right Side - Profile Image with Creative Cutout */}
                    <motion.div
                        style={{ display: 'flex', justifyContent: 'center' }}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <div style={{ position: 'relative', width: '512px', height: '640px', maxWidth: '90vw' }}>
                            {/* Glow effect behind */}
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to bottom, #3915ac, #785bec, #21a2f2)',
                                filter: 'blur(60px)',
                                opacity: 0.3,
                                borderRadius: '1.5rem'
                            }} />

                            {/* Image with creative polygon mask - Octagon shape */}
                            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                <img
                                    src="/bajpai.png"
                                    alt="Abhishek Bajpai"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        objectPosition: 'top',
                                        clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                                        filter: 'drop-shadow(0 25px 50px rgba(57, 21, 172, 0.5))'
                                    }}
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Down Indicator */}
            <motion.div
                style={{
                    position: 'absolute',
                    bottom: '2rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 10,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                onClick={scrollToNext}
            >
                <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Scroll Down
                </span>
                <ChevronDown style={{ color: 'rgba(255, 255, 255, 0.6)' }} size={24} />
            </motion.div>
        </section>
    );
}
