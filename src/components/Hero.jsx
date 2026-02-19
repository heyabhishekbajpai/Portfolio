import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import Aurora from './Aurora';

const TOTAL_FRAMES = 94;
const SCALE = 0.65;
const GLOW_SCALE = 1.4;
const GLOW_BLUR = 40;
const GLOW_OPACITY = 0.6;
// 600vh gives smooth scroll runway for 94 frames
const HERO_HEIGHT_VH = 300;

function getFramePath(index) {
    const padded = String(index).padStart(2, '0');
    return `/video_portfolio/portfolio_video${padded}.png`;
}

export default function Hero() {
    const heroRef = useRef(null);       // the tall outer section
    const wrapperRef = useRef(null);    // the 100vh panel we want to "pin"
    const mainCanvasRef = useRef(null);
    const glowCanvasRef = useRef(null);
    const framesRef = useRef([]);
    const currentFrameRef = useRef(0);
    const rafRef = useRef(null);

    const [loaded, setLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

    const scrollToNext = () => {
        document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
    };

    // ─── Preload frames ───────────────────────────────────────────────────────
    useEffect(() => {
        let cancelled = false;
        let loadedCount = 0;
        const images = new Array(TOTAL_FRAMES);

        const onLoad = () => {
            loadedCount++;
            if (!cancelled) setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
            if (loadedCount === TOTAL_FRAMES && !cancelled) {
                framesRef.current = images;
                const sample = images[1] || images[0];
                if (sample.naturalWidth && sample.naturalHeight) {
                    let w = Math.round(sample.naturalWidth * SCALE);
                    let h = Math.round(sample.naturalHeight * SCALE);
                    if (window.innerWidth < 768) {
                        const mw = Math.round(window.innerWidth * 0.9);
                        h = Math.round(mw * (h / w));
                        w = mw;
                    }
                    setCanvasSize({ width: w, height: h });
                }
                setLoaded(true);
            }
        };

        for (let i = 0; i < TOTAL_FRAMES; i++) {
            const img = new Image();
            img.src = getFramePath(i);
            img.onload = onLoad;
            img.onerror = onLoad;
            images[i] = img;
        }
        return () => { cancelled = true; };
    }, []);

    // ─── Draw a frame ─────────────────────────────────────────────────────────
    const drawFrame = useCallback((index) => {
        const frames = framesRef.current;
        if (!frames.length || !frames[index]) return;
        const frame = frames[index];
        if (!frame.naturalWidth) return;

        const main = mainCanvasRef.current;
        const glow = glowCanvasRef.current;
        if (!main || !glow) return;

        const mCtx = main.getContext('2d');
        mCtx.clearRect(0, 0, main.width, main.height);
        mCtx.drawImage(frame, 0, 0, main.width, main.height);

        const gCtx = glow.getContext('2d');
        gCtx.clearRect(0, 0, glow.width, glow.height);
        gCtx.drawImage(frame, 0, 0, glow.width, glow.height);
    }, []);

    // ─── JS-polyfilled sticky + frame scrubbing ───────────────────────────────
    // CSS `position: sticky` is broken when ANY ancestor has overflow:hidden/auto.
    // The parent `.app` div has `overflow-x: hidden`, so we mimic sticky manually.
    useEffect(() => {
        if (!loaded) return;
        drawFrame(0);

        const pin = () => {
            const hero = heroRef.current;
            const wrapper = wrapperRef.current;
            if (!hero || !wrapper) return;

            const heroTop = hero.offsetTop;
            const heroH = hero.offsetHeight;
            const vh = window.innerHeight;
            const sy = window.scrollY;
            const scrollable = heroH - vh;

            // ── Polyfill sticky ──
            if (sy <= heroTop) {
                // Above hero: sit at the natural top of the section
                wrapper.style.position = 'absolute';
                wrapper.style.top = '0px';
                wrapper.style.bottom = '';
            } else if (sy >= heroTop + scrollable) {
                // Beyond hero: anchor to bottom of section
                wrapper.style.position = 'absolute';
                wrapper.style.top = `${scrollable}px`;
                wrapper.style.bottom = '';
            } else {
                // Inside hero scroll range: fix to viewport
                wrapper.style.position = 'fixed';
                wrapper.style.top = '0px';
                wrapper.style.bottom = '';
            }

            // ── Frame index ──
            if (scrollable <= 0) return;
            const progress = Math.max(0, Math.min(1, (sy - heroTop) / scrollable));
            const frameIndex = Math.min(93, Math.floor(progress * 93));
            if (frameIndex !== currentFrameRef.current) {
                currentFrameRef.current = frameIndex;
                drawFrame(frameIndex);
            }
        };

        const onScroll = () => {
            if (rafRef.current) return;
            rafRef.current = requestAnimationFrame(() => {
                rafRef.current = null;
                pin();
            });
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', pin, { passive: true });
        pin(); // run once on mount

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', pin);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [loaded, drawFrame]);

    return (
        /*
         * Outer section: provides the 600vh scroll runway.
         * position: relative so the JS-polyfilled wrapper can be absolute inside it.
         */
        <section
            id="home"
            ref={heroRef}
            style={{
                position: 'relative',
                width: '100%',
                height: `${HERO_HEIGHT_VH}vh`,
                background: '#000',
            }}
        >
            {/*
             * wrapperRef: the 100vh panel that looks "pinned".
             * Starts as position:absolute top:0; scroll handler switches it to
             * position:fixed while the user is inside the hero scroll range,
             * then back to absolute anchored at the bottom of the section.
             */}
            <div
                ref={wrapperRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    overflow: 'hidden',
                }}
            >
                {/* Aurora — fills the pinned panel */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 1,
                    pointerEvents: 'none',
                    display: 'none', // temporarily hidden — change to 'block' to restore
                }}>
                    <Aurora
                        colorStops={['#3915ac', '#785bec', '#21a2f2']}
                        amplitude={0.40}
                        blend={0.45}
                        speed={1.0}
                    />
                </div>

                {!loaded ? (
                    /* Loading spinner — centred */
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1rem',
                    }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            border: '3px solid rgba(255,255,255,0.15)',
                            borderTopColor: '#785bec',
                            borderRadius: '50%',
                            animation: 'heroSpinner 0.8s linear infinite',
                        }} />
                        <span style={{
                            color: 'rgba(255,255,255,0.6)',
                            fontSize: '0.875rem',
                            fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                            letterSpacing: '0.05em',
                        }}>
                            {loadProgress}%
                        </span>
                    </div>
                ) : (
                    <>
                        {/* Fullscreen ambient glow — draws current frame blurred across entire viewport */}
                        <canvas
                            ref={glowCanvasRef}
                            width={canvasSize.width}
                            height={canvasSize.height}
                            style={{
                                position: 'absolute',
                                inset: 0,
                                width: '100%',
                                height: '100%',
                                filter: 'blur(60px) brightness(2) saturate(2.5)',
                                opacity: 1,
                                pointerEvents: 'none',
                                zIndex: 2,
                            }}
                        />

                        {/* Canvas stack — absolutely centred */}
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 3,
                        }}>
                            {/* Side-only glow — LEFT: 80px wide, 60% canvas height, centred vertically */}
                            <div style={{
                                position: 'absolute',
                                left: '-80px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                width: '80px',
                                height: '60%',
                                background: 'linear-gradient(to left, #785bec, #3915ac)',
                                filter: 'blur(60px)',
                                opacity: 0.5,
                                pointerEvents: 'none',
                                zIndex: 1,
                                display: 'none', // temporarily hidden
                            }} />

                            {/* Side-only glow — RIGHT */}
                            <div style={{
                                position: 'absolute',
                                right: '-80px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                width: '80px',
                                height: '60%',
                                background: 'linear-gradient(to right, #785bec, #21a2f2)',
                                filter: 'blur(60px)',
                                opacity: 0.5,
                                pointerEvents: 'none',
                                zIndex: 1,
                                display: 'none', // temporarily hidden
                            }} />

                            {/* Main canvas — no borders, with 4-edge fade mask */}
                            <canvas
                                ref={mainCanvasRef}
                                width={canvasSize.width}
                                height={canvasSize.height}
                                style={{
                                    position: 'relative',
                                    display: 'block',
                                    zIndex: 3,
                                    maxWidth: '90vw',
                                    height: 'auto',
                                    border: 'none',
                                    outline: 'none',
                                    boxShadow: 'none',
                                    WebkitMaskImage: `linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%),
                                                      linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)`,
                                    WebkitMaskComposite: 'destination-in',
                                    maskImage: `linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%),
                                                linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)`,
                                    maskComposite: 'intersect',
                                }}
                            />
                        </div>
                    </>
                )}

                {/* Scroll Down indicator */}
                <div
                    onClick={scrollToNext}
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
                        gap: '0.5rem',
                        opacity: loaded ? 1 : 0,
                        transition: 'opacity 0.5s ease 0.5s',
                        color: 'rgba(255,255,255,0.6)',
                    }}
                >
                    <span style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        Scroll Down
                    </span>
                    <ChevronDown size={24} />
                </div>
            </div>

            <style>{`@keyframes heroSpinner { to { transform: rotate(360deg); } }`}</style>
        </section>
    );
}
