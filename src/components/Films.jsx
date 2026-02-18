import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Youtube, Play } from 'lucide-react';

export default function Films() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    // Dummy video data - Replace with your actual YouTube videos
    const featuredVideos = [
        {
            id: 1,
            title: 'Cinematic Short Film',
            thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=450&fit=crop',
            videoUrl: 'https://www.youtube.com/@abhishek.bajpai',
            views: '10K',
        },
        {
            id: 2,
            title: 'Behind The Scenes',
            thumbnail: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&h=450&fit=crop',
            videoUrl: 'https://www.youtube.com/@abhishek.bajpai',
            views: '5K',
        },
        {
            id: 3,
            title: 'Travel Vlog',
            thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop',
            videoUrl: 'https://www.youtube.com/@abhishek.bajpai',
            views: '8K',
        },
    ];

    return (
        <section id="films" className="relative py-20 md:py-32 bg-gradient-to-b from-black via-gray-900 to-black">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    {/* Section Title */}
                    <div className="text-center mb-12 md:mb-16">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Youtube className="text-red-500" size={40} />
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                                <span className="gradient-text">Filmmaking & Content</span>
                            </h2>
                        </div>
                        <p className="text-white/70 text-lg max-w-2xl mx-auto mb-4">
                            Telling stories through the lens
                        </p>
                        <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto rounded-full" />
                    </div>

                    {/* YouTube Channel Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-4xl mx-auto mb-16"
                    >
                        <div className="glass p-6 md:p-8 rounded-2xl flex flex-col md:flex-row items-center gap-6 hover:bg-white/10 transition-all duration-300">
                            <div className="flex-shrink-0">
                                <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                                    <Youtube size={48} className="text-white" />
                                </div>
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                    Abhishek Bajpai
                                </h3>
                                <p className="text-white/70 mb-4">
                                    Cinematic vlogs, short films, and creative content
                                </p>
                                <a
                                    href="https://www.youtube.com/@abhishek.bajpai"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-red-600/50"
                                >
                                    <Youtube size={20} />
                                    Subscribe on YouTube
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Featured Videos Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {featuredVideos.map((video, idx) => (
                            <motion.a
                                key={video.id}
                                href={video.videoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
                                className="group glass rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300"
                            >
                                {/* Video Thumbnail */}
                                <div className="relative aspect-video bg-gray-800 overflow-hidden">
                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />

                                    {/* Play Button Overlay */}
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                            <Play size={28} className="text-white ml-1" fill="white" />
                                        </div>
                                    </div>

                                    {/* Views Badge */}
                                    <div className="absolute bottom-3 right-3 px-3 py-1 bg-black/80 rounded-lg text-white text-sm font-medium">
                                        {video.views} views
                                    </div>
                                </div>

                                {/* Video Info */}
                                <div className="p-4">
                                    <h3 className="text-white font-bold text-lg group-hover:text-red-400 transition-colors duration-300">
                                        {video.title}
                                    </h3>
                                </div>
                            </motion.a>
                        ))}
                    </div>

                    {/* View Channel Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="text-center mt-12"
                    >
                        <a
                            href="https://www.youtube.com/@abhishek.bajpai"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-4 glass hover:bg-white/20 rounded-lg font-medium transition-all duration-300 text-lg"
                        >
                            <Youtube size={24} className="text-red-500" />
                            View Full Channel
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
