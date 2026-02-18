import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Download, Linkedin } from 'lucide-react';

export default function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="about" className="relative py-20 md:py-32 bg-gradient-to-b from-black via-gray-900 to-black">
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
                            <span className="gradient-text">About Me</span>
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto rounded-full" />
                    </div>

                    {/* Content Grid */}
                    <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl mx-auto">

                        {/* Photo with Creative Cutout */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex justify-center"
                        >
                            <div className="relative w-64 h-80 md:w-80 md:h-96">
                                {/* Glow effect behind */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent blur-2xl opacity-30 rounded-3xl" />

                                {/* Image with creative polygon mask - Octagon shape */}
                                <div className="relative w-full h-full">
                                    <img
                                        src="/bajpai.png"
                                        alt="Abhishek Bajpai"
                                        className="w-full h-full object-cover object-top"
                                        style={{
                                            clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                                            filter: 'drop-shadow(0 20px 40px rgba(57, 21, 172, 0.4))'
                                        }}
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Text Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="space-y-6 text-white/80"
                            style={{ fontFamily: 'ui-sans-serif, system-ui, -apple-system, sans-serif' }}
                        >
                            <p className="text-lg md:text-xl leading-relaxed">
                                Hi! I'm <span className="text-white font-semibold">Abhishek Bajpai</span>, a Computer Science student with a passion for building full-stack applications and solving complex problems.
                            </p>

                            <p className="text-base md:text-lg leading-relaxed">
                                I'm deeply interested in <span className="text-secondary font-medium">Data Structures & Algorithms in Java</span>, constantly challenging myself to think critically and optimize solutions.
                            </p>

                            <p className="text-base md:text-lg leading-relaxed">
                                Beyond code, I love creating <span className="text-accent font-medium">visual designs on Canva</span> and telling stories through <span className="text-accent font-medium">cinematic filmmaking</span>. My creative side drives me to build experiences that are not just functional, but beautiful.
                            </p>

                            <p className="text-base md:text-lg leading-relaxed">
                                I'm <span className="text-primary font-medium">active on LinkedIn</span>, where I share my journey, connect with like-minded developers, and stay updated with the tech community.
                            </p>

                            {/* Buttons */}
                            <div className="flex flex-wrap gap-4 pt-4">
                                <a
                                    href="https://drive.google.com/file/d/15B5180ZwJdNb2vg9UqPUTQoKdpRtGi_D/view?usp=sharing"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="glass px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-all duration-300 flex items-center gap-2 group"
                                >
                                    <Download size={20} className="group-hover:animate-bounce" />
                                    Download Resume
                                </a>

                                <a
                                    href="https://www.linkedin.com/in/heybajpai/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-gradient-to-r from-primary to-secondary px-6 py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 flex items-center gap-2"
                                >
                                    <Linkedin size={20} />
                                    LinkedIn Profile
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
