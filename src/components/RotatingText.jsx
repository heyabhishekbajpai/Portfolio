import { useEffect, useState } from 'react';

export default function RotatingText({ words, className = '' }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, 2500); // Change word every 2.5 seconds

        return () => clearInterval(interval);
    }, [words.length]);

    return (
        <span style={{ display: 'inline-block', position: 'relative', verticalAlign: 'top' }}>
            <span
                key={index}
                style={{
                    display: 'inline-block',
                    animation: 'rotateWord 0.6s ease-in-out',
                    background: 'linear-gradient(to right, #3915ac, #785bec, #21a2f2)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontWeight: 600
                }}
            >
                {words[index]}
            </span>
            <style>{`
        @keyframes rotateWord {
          0% {
            opacity: 0;
            transform: translateY(20px) rotateX(-90deg);
          }
          50% {
            opacity: 0.5;
            transform: translateY(0) rotateX(-45deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
          }
        }
      `}</style>
        </span>
    );
}
