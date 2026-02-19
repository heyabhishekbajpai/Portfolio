/**
 * LoopingLoader.jsx
 *
 * Standalone looping animation — does NOT affect LoadingScreen.jsx.
 *
 * Cycle (5 s loop):
 *   0 – 25%  → "bajpai" text fully visible
 *   25 – 38% → text shrinks + fades out
 *   38 – 62% → spinner visible + spinning
 *   62 – 75% → spinner shrinks + fades out
 *   75 – 100% → text grows + fades in
 */

export default function LoopingLoader() {
    return (
        <>
            <style>{`
                /* ── root ── */
                .ll-root {
                    position: fixed;
                    inset: 0;
                    background: #000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                }

                /* ── text ── */
                .ll-text {
                    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                    font-size: clamp(36px, 7vw, 72px);
                    font-weight: 700;
                    color: #fff;
                    letter-spacing: -0.03em;
                    user-select: none;
                    position: absolute;
                    animation: ll-text 5s cubic-bezier(0.65, 0, 0.35, 1) infinite;
                }

                @keyframes ll-text {
                    0%   { opacity: 1; transform: scale(1);    }
                    22%  { opacity: 1; transform: scale(1);    }
                    35%  { opacity: 0; transform: scale(0.35); }
                    65%  { opacity: 0; transform: scale(0.35); }
                    78%  { opacity: 1; transform: scale(1);    }
                    100% { opacity: 1; transform: scale(1);    }
                }

                /* ── spinner wrapper — handles scale + opacity ── */
                .ll-spinner-wrap {
                    position: absolute;
                    animation: ll-spinner-wrap 5s cubic-bezier(0.65, 0, 0.35, 1) infinite;
                }

                @keyframes ll-spinner-wrap {
                    0%   { opacity: 0; transform: scale(0.35); }
                    35%  { opacity: 0; transform: scale(0.35); }
                    48%  { opacity: 1; transform: scale(1);    }
                    52%  { opacity: 1; transform: scale(1);    }
                    65%  { opacity: 0; transform: scale(0.35); }
                    100% { opacity: 0; transform: scale(0.35); }
                }

                /* ── spinner ring — handles rotation only ── */
                .ll-spinner-ring {
                    width: 56px;
                    height: 56px;
                    border-radius: 50%;
                    border: 2.5px solid rgba(255, 255, 255, 0.18);
                    border-top-color: #fff;
                    animation: ll-spin 0.9s linear infinite;
                }

                @keyframes ll-spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>

            <div className="ll-root">
                <span className="ll-text">bajpai</span>

                <div className="ll-spinner-wrap">
                    <div className="ll-spinner-ring" />
                </div>
            </div>
        </>
    );
}
