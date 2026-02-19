import { useEffect, useState } from 'react';

/**
 * LoadingScreen
 * Shows on every initial page load.
 * Sequence:
 *  0–200ms   : fade-in of overlay
 *  200–800ms : logo scales + fades in
 *  800–1600ms: progress bar sweeps left→right
 *  1600–2000ms: hold
 *  2000–2600ms: logo fades out, overlay slides up
 *
 * `onDone` is called after the exit animation so App can unmount it.
 */
export default function LoadingScreen({ onDone }) {
    const [phase, setPhase] = useState('enter'); // 'enter' | 'exit'

    useEffect(() => {
        // Start exit animation after 2000ms
        const exitTimer = setTimeout(() => setPhase('exit'), 2000);
        // Unmount after exit animation completes (600ms)
        const doneTimer = setTimeout(() => onDone?.(), 2600);
        return () => { clearTimeout(exitTimer); clearTimeout(doneTimer); };
    }, [onDone]);

    return (
        <>
            <style>{`
                @keyframes ls-fadein {
                    from { opacity: 0; }
                    to   { opacity: 1; }
                }
                @keyframes ls-logo-in {
                    0%   { opacity: 0; transform: scale(0.82) translateY(12px); }
                    100% { opacity: 1; transform: scale(1)    translateY(0);    }
                }
                @keyframes ls-bar {
                    from { width: 0%; }
                    to   { width: 100%; }
                }
                @keyframes ls-overlay-out {
                    from { transform: translateY(0);     opacity: 1; }
                    to   { transform: translateY(-100%); opacity: 0; }
                }
                @keyframes ls-logo-out {
                    from { opacity: 1; transform: scale(1); }
                    to   { opacity: 0; transform: scale(1.06); }
                }

                .ls-overlay {
                    position: fixed;
                    inset: 0;
                    z-index: 9999;
                    background: #000;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    animation: ls-fadein 0.2s ease forwards;
                }
                .ls-overlay.exit {
                    animation: ls-overlay-out 0.6s cubic-bezier(0.76, 0, 0.24, 1) forwards;
                }

                .ls-logo {
                    width: clamp(100px, 20vw, 200px);
                    animation: ls-logo-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both;
                }
                .ls-overlay.exit .ls-logo {
                    animation: ls-logo-out 0.35s ease forwards;
                }

                .ls-bar-track {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 2px;
                    background: rgba(255,255,255,0.06);
                    overflow: hidden;
                }
                .ls-bar-fill {
                    height: 100%;
                    background: linear-gradient(to right, #785bec, #21a2f2);
                    animation: ls-bar 1.4s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both;
                }
            `}</style>

            <div className={`ls-overlay${phase === 'exit' ? ' exit' : ''}`}>
                <img
                    src="/bajpailogo.png"
                    alt="Bajpai"
                    className="ls-logo"
                    draggable={false}
                />

                {/* Thin progress bar at the very bottom */}
                <div className="ls-bar-track">
                    <div className="ls-bar-fill" />
                </div>
            </div>
        </>
    );
}
