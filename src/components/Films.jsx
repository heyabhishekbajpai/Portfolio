import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const CHANNEL_ID = 'UClCF9-LRiLuPjXa_oynUYmA';
const HIDDEN_VIDEO_IDS = ['Nl4fLbFrCWA'];

/* ─── VIDEO MODAL ─── */
function VideoModal({ film, onClose }) {
    return (
        <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
        >
            <div
                className="absolute inset-0"
                style={{ background: 'rgba(2, 2, 5, 0.95)', backdropFilter: 'blur(10px)' }}
            />

            <motion.div
                className="relative z-10 w-full max-w-4xl"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute -top-12 right-0 p-2 rounded-md transition-all duration-100 hover:bg-white/10"
                    style={{ color: 'var(--color-muted)', cursor: 'pointer' }}
                >
                    <X size={24} />
                </button>

                {/* Player */}
                <div
                    className="w-full rounded-lg overflow-hidden"
                    style={{
                        aspectRatio: '16/9',
                        border: '1px solid var(--color-border)',
                        boxShadow: '0 0 60px rgba(0, 212, 255, 0.1)',
                    }}
                >
                    <iframe
                        src={`https://www.youtube.com/embed/${film.videoId}?autoplay=1&rel=0`}
                        title={film.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                        style={{ border: 'none' }}
                    />
                </div>

                {/* Title below */}
                <p
                    className="mt-4 text-center text-sm"
                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text)' }}
                >
                    {film.title}
                </p>
            </motion.div>
        </motion.div>
    );
}

/* ─── FILM CARD ─── */
function FilmCard({ film, index, isInView, onPlay }) {
    return (
        <motion.div
            className="group cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => onPlay(film)}
        >
            {/* Thumbnail */}
            <div
                className="relative rounded-lg overflow-hidden mb-3"
                style={{
                    aspectRatio: '16/9',
                    border: '1px solid var(--color-border)',
                }}
            >
                <img
                    src={film.thumbnail}
                    alt={film.title}
                    className="w-full h-full object-cover transition-transform duration-150 group-hover:scale-105"
                    loading="lazy"
                />

                {/* Hover overlay */}
                <div
                    className="absolute inset-0 transition-all duration-100"
                    style={{
                        background: 'rgba(0, 0, 0, 0.5)',
                        opacity: 0,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
                >
                    <div className="flex items-center justify-center h-full">
                        <div
                            className="p-4 rounded-full transition-all duration-100"
                            style={{
                                background: 'rgba(0, 212, 255, 0.15)',
                                border: '1px solid rgba(0, 212, 255, 0.4)',
                            }}
                        >
                            <Play size={24} style={{ color: 'var(--color-cyan)' }} />
                        </div>
                    </div>
                </div>

                {/* Film grain overlay */}
                <div className="film-grain" />

                {/* Duration badge */}
                {film.duration && (
                    <div
                        className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-xs"
                        style={{
                            background: 'rgba(0, 0, 0, 0.8)',
                            color: 'var(--color-text)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.65rem',
                        }}
                    >
                        {film.duration}
                    </div>
                )}
            </div>

            {/* Title */}
            <h3
                className="text-sm font-semibold mb-1 transition-colors duration-100 group-hover:text-cyan-400"
                style={{
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-text)',
                    lineHeight: '1.4',
                }}
            >
                {film.title}
            </h3>

            {/* Published date */}
            {film.publishedAt && (
                <p
                    className="text-xs"
                    style={{
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--color-muted)',
                        fontSize: '0.7rem',
                    }}
                >
                    {new Date(film.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    })}
                </p>
            )}
        </motion.div>
    );
}

/* ─── FORMAT DURATION ─── */
function formatDuration(isoDuration) {
    if (!isoDuration) return null;
    const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return null;
    const hours = match[1] ? `${match[1]}:` : '';
    const mins = match[2] ? match[2].padStart(hours ? 2 : 1, '0') : '0';
    const secs = match[3] ? match[3].padStart(2, '0') : '00';
    return `${hours}${mins}:${secs}`;
}

/* ─── FILMS SECTION ─── */
export default function Films() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeFilm, setActiveFilm] = useState(null);

    useEffect(() => {
        async function fetchVideos() {
            try {
                // Step 1: Get video list from channel
                const searchRes = await fetch(
                    `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=12&order=date&type=video&key=${YOUTUBE_API_KEY}`
                );
                const searchData = await searchRes.json();

                if (!searchData.items || searchData.items.length === 0) {
                    setFilms([]);
                    setLoading(false);
                    return;
                }

                // Step 2: Get video durations
                const videoIds = searchData.items.map(item => item.id.videoId).join(',');
                const detailsRes = await fetch(
                    `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoIds}&key=${YOUTUBE_API_KEY}`
                );
                const detailsData = await detailsRes.json();

                // Map durations by ID
                const durationMap = {};
                if (detailsData.items) {
                    detailsData.items.forEach(item => {
                        durationMap[item.id] = formatDuration(item.contentDetails.duration);
                    });
                }

                // Combine data
                const videoList = searchData.items
                    .filter(item => !HIDDEN_VIDEO_IDS.includes(item.id.videoId))
                    .map(item => ({
                        videoId: item.id.videoId,
                        title: item.snippet.title,
                        description: item.snippet.description,
                        thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
                        publishedAt: item.snippet.publishedAt,
                        duration: durationMap[item.id.videoId] || null,
                    }));

                setFilms(videoList);
            } catch (err) {
                console.error('Failed to fetch YouTube videos:', err);
                setError('Failed to load videos');
            } finally {
                setLoading(false);
            }
        }

        fetchVideos();
    }, []);

    return (
        <>
            <section
                id="films"
                className="relative py-24 md:py-32 noise-overlay"
                style={{ background: 'var(--color-surface)' }}
            >
                <div className="section-divider" />

                <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 pt-16" ref={ref}>
                    {/* Section Label */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="section-label" style={{ color: 'var(--color-cyan)' }}>
                            {'// FILMS'}
                        </p>
                        <h2
                            className="text-3xl md:text-4xl font-bold mb-12"
                            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
                        >
                            🎬 play_reel<span style={{ color: 'var(--color-cyan)' }}>()</span>
                        </h2>
                    </motion.div>

                    {/* Loading State */}
                    {loading && (
                        <div className="flex items-center justify-center py-20">
                            <div className="text-center">
                                <motion.div
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    style={{
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '0.85rem',
                                        color: 'var(--color-cyan)',
                                    }}
                                >
                                    {'>'} fetching videos from YouTube...
                                    <span className="cursor-blink" />
                                </motion.div>
                            </div>
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <div
                            className="text-center py-20"
                            style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.85rem',
                                color: '#ff6b6b',
                            }}
                        >
                            {'>'} error: {error}
                        </div>
                    )}

                    {/* Video Grid */}
                    {!loading && !error && films.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {films.map((film, i) => (
                                <FilmCard
                                    key={film.videoId}
                                    film={film}
                                    index={i}
                                    isInView={isInView}
                                    onPlay={setActiveFilm}
                                />
                            ))}
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && !error && films.length === 0 && (
                        <div
                            className="text-center py-20"
                            style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.85rem',
                                color: 'var(--color-muted)',
                            }}
                        >
                            {'>'} no videos found.
                        </div>
                    )}
                </div>
            </section>

            {/* Video Modal */}
            <AnimatePresence>
                {activeFilm && (
                    <VideoModal film={activeFilm} onClose={() => setActiveFilm(null)} />
                )}
            </AnimatePresence>
        </>
    );
}
