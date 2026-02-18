import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { X, Palette } from 'lucide-react';

export default function Design() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [selectedImage, setSelectedImage] = useState(null);
    const [activeCategory, setActiveCategory] = useState('All');

    // Dummy design portfolio - Replace with your actual Canva designs
    const designs = [
        {
            id: 1,
            title: 'Social Media Post 1',
            category: 'Social Media',
            image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=800&fit=crop',
        },
        {
            id: 2,
            title: 'Brand Poster',
            category: 'Posters',
            image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&h=800&fit=crop',
        },
        {
            id: 3,
            title: 'Logo Design',
            category: 'Branding',
            image: 'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=800&h=800&fit=crop',
        },
        {
            id: 4,
            title: 'Event Flyer',
            category: 'Posters',
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop',
        },
        {
            id: 5,
            title: 'Instagram Story',
            category: 'Social Media',
            image: 'https://images.unsplash.com/photo-1621609764180-2ca554a9d6f2?w=800&h=800&fit=crop',
        },
        {
            id: 6,
            title: 'Business Card',
            category: 'Branding',
            image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&h=800&fit=crop',
        },
    ];

    const categories = ['All', 'Posters', 'Social Media', 'Branding'];

    const filteredDesigns = activeCategory === 'All'
        ? designs
        : designs.filter(design => design.category === activeCategory);

    return (
        <section id="design" className="relative py-20 md:py-32 bg-black">
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
                            <Palette className="text-accent" size={40} />
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                                <span className="gradient-text">Design Portfolio</span>
                            </h2>
                        </div>
                        <p className="text-white/70 text-lg max-w-2xl mx-auto mb-4">
                            Creating visual experiences with Canva
                        </p>
                        <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto rounded-full" />
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${activeCategory === category
                                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                                        : 'glass text-white/70 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Design Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                        {filteredDesigns.map((design, idx) => (
                            <motion.div
                                key={design.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl glass"
                                onClick={() => setSelectedImage(design)}
                            >
                                <img
                                    src={design.image}
                                    alt={design.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                                    <h3 className="text-white font-bold text-xl mb-2">{design.title}</h3>
                                    <span className="text-accent text-sm font-medium">{design.category}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.button
                            className="absolute top-4 right-4 p-2 glass rounded-full hover:bg-white/20 transition-all duration-300"
                            onClick={() => setSelectedImage(null)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <X className="text-white" size={24} />
                        </motion.button>

                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", damping: 20 }}
                            className="max-w-4xl max-h-[90vh] relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedImage.image}
                                alt={selectedImage.title}
                                className="w-full h-full object-contain rounded-2xl shadow-2xl"
                            />
                            <div className="glass mt-4 p-4 rounded-lg text-center">
                                <h3 className="text-white font-bold text-xl">{selectedImage.title}</h3>
                                <p className="text-accent text-sm mt-1">{selectedImage.category}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
