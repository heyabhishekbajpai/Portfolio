import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Database, Palette, GitBranch, Laptop } from 'lucide-react';

export default function Skills() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const skillCategories = [
        {
            title: 'Frontend Development',
            icon: <Code2 size={32} />,
            skills: [
                { name: 'React', level: 75 },
                { name: 'JavaScript', level: 80 },
                { name: 'HTML/CSS', level: 90 },
                { name: 'Tailwind CSS', level: 85 },
            ],
            color: 'from-blue-500 to-cyan-500',
        },
        {
            title: 'Backend & DSA',
            icon: <Database size={32} />,
            skills: [
                { name: 'Java', level: 85 },
                { name: 'Node.js', level: 70 },
                { name: 'DSA (Java)', level: 80 },
                { name: 'Problem Solving', level: 75 },
            ],
            color: 'from-green-500 to-emerald-500',
        },
        {
            title: 'Design & Creative',
            icon: <Palette size={32} />,
            skills: [
                { name: 'Canva', level: 90 },
                { name: 'UI/UX Basics', level: 70 },
                { name: 'Video Editing', level: 85 },
                { name: 'Filmmaking', level: 80 },
            ],
            color: 'from-purple-500 to-pink-500',
        },
        {
            title: 'Tools & Technologies',
            icon: <GitBranch size={32} />,
            skills: [
                { name: 'Git & GitHub', level: 85 },
                { name: 'VS Code', level: 90 },
                { name: 'Supabase', level: 65 },
                { name: 'Vite', level: 75 },
            ],
            color: 'from-orange-500 to-red-500',
        },
    ];

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
        <section id="skills" className="relative py-20 md:py-32 bg-black">
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
                            <span className="gradient-text">Skills & Expertise</span>
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto rounded-full" />
                    </div>

                    {/* Skills Grid */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
                    >
                        {skillCategories.map((category, idx) => (
                            <motion.div
                                key={category.title}
                                variants={itemVariants}
                                className="glass p-6 md:p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 group"
                            >
                                {/* Category Header */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`p-3 rounded-lg bg-gradient-to-br ${category.color} text-white`}>
                                        {category.icon}
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold text-white">
                                        {category.title}
                                    </h3>
                                </div>

                                {/* Skills List */}
                                <div className="space-y-4">
                                    {category.skills.map((skill, skillIdx) => (
                                        <div key={skill.name}>
                                            <div className="flex justify-between mb-2">
                                                <span className="text-white/90 font-medium">{skill.name}</span>
                                                <span className="text-white/60 text-sm">{skill.level}%</span>
                                            </div>
                                            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                                                <motion.div
                                                    className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                                                    initial={{ width: 0 }}
                                                    animate={isInView ? { width: `${skill.level}%` } : {}}
                                                    transition={{ duration: 1, delay: idx * 0.2 + skillIdx * 0.1 }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
