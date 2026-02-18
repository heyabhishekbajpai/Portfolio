import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const skillCategories = [
    {
        label: 'DEV',
        skills: ['React', 'Next.js', 'Node.js', 'Python', 'Git', 'JavaScript', 'HTML/CSS'],
    },
    {
        label: 'DESIGN',
        skills: ['Figma', 'Adobe XD', 'Premiere Pro', 'After Effects', 'Photoshop'],
    },
    {
        label: 'FILM',
        skills: ['Directing', 'Cinematography', 'Color Grading', 'Sound Design', 'Editing'],
    },
    {
        label: 'TOOLS',
        skills: ['VS Code', 'Linux', 'Docker', 'Blender', 'DaVinci Resolve'],
    },
];

/* ─── FUNNY RESPONSES ─── */
const funnyResponses = [
    "lmao nice try, this ain't a real terminal 💀",
    "bro really thought this was bash 😭",
    "sir this is a portfolio, not AWS",
    "command not found. try 'hire abhishek' instead 😏",
    "error 404: patience not found. go scroll the site.",
    "nah fam, this terminal is just for vibes ✨",
    "you really typed that huh... bold move 🗿",
    "segfault (core dumped)... jk, I don't even have a kernel",
    "access denied. you need at least 500 IQ to use this 🧠",
    "bruh. just click around like a normal person 😤",
    "I see you're a person of culture. still no though.",
    "this terminal runs on hopes and dreams, not your commands 🌙",
    "imagine if this actually worked... couldn't be me",
    "your command has been noted and promptly ignored 📝",
    "runtime error: too much swagger in the input 😎",
];

const specialCommands = {
    'help': "available commands: literally none. this is a portfolio, not your linux box 🐧",
    'ls': "about.jsx  skills.jsx  projects.jsx  films.jsx  vibes.txt  README.md",
    'pwd': "/home/abhishek/portfolio/you-fell-for-it",
    'whoami': "a curious visitor with great taste in portfolios 😎",
    'sudo': "nice try. sudo won't save you here 🔒",
    'exit': "you can check out any time you like, but you can never leave 🎸",
    'clear': "__CLEAR__",
    'hire abhishek': "now THAT's a valid command! 🎉 sending resume... jk, DM me on LinkedIn",
    'hire': "incomplete command. did you mean 'hire abhishek'? 😏",
    'hello': "hey! 👋 welcome to my portfolio terminal. it does nothing useful btw.",
    'hi': "sup! try scrolling down instead of typing here 😄",
    'cd': "bro where do you wanna go? this is a single page app 💀",
    'rm': "absolutely not. I like my files where they are, thanks.",
    'cat': "🐱 meow. that's all you get.",
    'neofetch': "OS: PortfolioOS v3.0 | Host: bajpai.tech | Shell: FakeBash | Theme: Cyberpunk 🖥️",
    'npm install': "installing... just kidding, node_modules would crash this browser 📦",
    'git': "git commit -m 'visitor tried using fake terminal' 😂",
};

/* ─── INTERACTIVE PROMPT ─── */
function InteractivePrompt({ isReady }) {
    const [history, setHistory] = useState([]);
    const [currentInput, setCurrentInput] = useState('');
    const inputRef = useRef(null);
    const bottomRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const cmd = currentInput.trim().toLowerCase();
        if (!cmd) return;

        let response;
        if (specialCommands[cmd]) {
            if (specialCommands[cmd] === '__CLEAR__') {
                setHistory([]);
                setCurrentInput('');
                return;
            }
            response = specialCommands[cmd];
        } else {
            response = funnyResponses[Math.floor(Math.random() * funnyResponses.length)];
        }

        setHistory(prev => [...prev, { cmd: currentInput.trim(), response }]);
        setCurrentInput('');
    };

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [history]);

    if (!isReady) return null;

    const promptPrefix = (
        <>
            <span style={{ color: '#28c840' }}>abhishek</span>
            <span style={{ color: 'var(--color-muted)' }}>@</span>
            <span style={{ color: 'var(--color-cyan)' }}>portfolio</span>
            <span style={{ color: 'var(--color-muted)' }}>:~$ </span>
        </>
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
            className="mt-6"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
        >
            <p style={{ color: 'var(--color-muted)', fontSize: '0.75rem', marginBottom: '8px' }}>
                ─── {skillCategories.reduce((acc, c) => acc + c.skills.length, 0)} skills loaded ───
            </p>

            {/* Command History */}
            {history.map((entry, i) => (
                <div key={i} className="mb-3">
                    <div>
                        {promptPrefix}
                        <span style={{ color: 'var(--color-text)' }}>{entry.cmd}</span>
                    </div>
                    <div
                        className="mt-1 pl-0 md:pl-2"
                        style={{ color: '#ff6b6b', fontSize: '0.8rem', lineHeight: '1.6' }}
                    >
                        {entry.response}
                    </div>
                </div>
            ))}

            {/* Active Input Line */}
            <form onSubmit={handleSubmit} className="flex items-center flex-wrap">
                {promptPrefix}
                <input
                    ref={inputRef}
                    type="text"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    className="flex-1 min-w-[100px] outline-none"
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--color-text)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.85rem',
                        caretColor: 'var(--color-cyan)',
                        paddingLeft: '6px',
                    }}
                    placeholder=" type a command..."
                    autoComplete="off"
                    spellCheck="false"
                />
            </form>
            <div ref={bottomRef} />
        </motion.div>
    );
}

/* ─── TERMINAL LINE ─── */
function TerminalLine({ category, delay, isInView }) {
    const [visible, setVisible] = useState(false);
    const [typedSkills, setTypedSkills] = useState('');
    const fullText = category.skills.join(', ');

    useEffect(() => {
        if (!isInView) return;
        const showTimer = setTimeout(() => {
            setVisible(true);
        }, delay);
        return () => clearTimeout(showTimer);
    }, [isInView, delay]);

    useEffect(() => {
        if (!visible) return;
        let idx = 0;
        const interval = setInterval(() => {
            if (idx <= fullText.length) {
                setTypedSkills(fullText.slice(0, idx));
                idx++;
            } else {
                clearInterval(interval);
            }
        }, 20);
        return () => clearInterval(interval);
    }, [visible, fullText]);

    if (!visible) return null;

    return (
        <motion.div
            className="flex flex-wrap items-start gap-x-2 mb-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
        >
            <span
                style={{
                    color: 'var(--color-cyan)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    minWidth: '80px',
                    flexShrink: 0,
                }}
            >
                [{category.label}]
            </span>
            <span
                style={{
                    color: 'var(--color-text)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    lineHeight: '1.8',
                }}
            >
                {typedSkills}
                {typedSkills.length < fullText.length && (
                    <span className="cursor-blink" />
                )}
            </span>
        </motion.div>
    );
}

/* ─── SKILLS SECTION ─── */
export default function Skills() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [showPrompt, setShowPrompt] = useState(false);
    const [showOutput, setShowOutput] = useState(false);
    const [promptText, setPromptText] = useState('');
    const fullPrompt = 'list --skills --all';

    useEffect(() => {
        if (!isInView) return;
        const timer = setTimeout(() => setShowPrompt(true), 300);
        return () => clearTimeout(timer);
    }, [isInView]);

    useEffect(() => {
        if (!showPrompt) return;
        let idx = 0;
        const interval = setInterval(() => {
            if (idx <= fullPrompt.length) {
                setPromptText(fullPrompt.slice(0, idx));
                idx++;
            } else {
                clearInterval(interval);
                setTimeout(() => setShowOutput(true), 400);
            }
        }, 50);
        return () => clearInterval(interval);
    }, [showPrompt]);

    return (
        <section
            id="skills"
            className="relative py-24 md:py-32 scanline-overlay"
            style={{ background: 'var(--color-bg)' }}
        >
            <div className="section-divider" />

            <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 pt-16" ref={ref}>
                {/* Section Label */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    <p className="section-label" style={{ color: 'var(--color-cyan)' }}>
                        {'// SKILLS'}
                    </p>
                    <h2
                        className="text-3xl md:text-4xl font-bold mb-12"
                        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
                    >
                        tech_stack<span style={{ color: 'var(--color-cyan)' }}>()</span>
                    </h2>
                </motion.div>

                {/* Terminal Window */}
                <motion.div
                    className="terminal-window"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {/* Title Bar */}
                    <div className="terminal-titlebar">
                        <div className="terminal-dot red" />
                        <div className="terminal-dot yellow" />
                        <div className="terminal-dot green" />
                        <span className="terminal-title">● ● ●  bash — skills.sh</span>
                    </div>

                    {/* Terminal Body */}
                    <div className="terminal-body" style={{ minHeight: '300px' }}>
                        {/* Prompt Line */}
                        <div className="mb-4" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                            <span style={{ color: '#28c840' }}>abhishek</span>
                            <span style={{ color: 'var(--color-muted)' }}>@</span>
                            <span style={{ color: 'var(--color-cyan)' }}>portfolio</span>
                            <span style={{ color: 'var(--color-muted)' }}>:~$ </span>
                            <span style={{ color: 'var(--color-text)' }}>
                                {promptText}
                                {!showOutput && showPrompt && (
                                    <span className="cursor-blink" />
                                )}
                            </span>
                        </div>

                        {/* Output Header */}
                        {showOutput && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="mb-4"
                            >
                                <p
                                    style={{
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '0.75rem',
                                        color: 'var(--color-muted)',
                                        marginBottom: '12px',
                                    }}
                                >
                                    ─── loading skills.json ─── ✓
                                </p>
                            </motion.div>
                        )}

                        {/* Skill Lines */}
                        {showOutput && (
                            <div className="pl-0 md:pl-2">
                                {skillCategories.map((cat, i) => (
                                    <TerminalLine
                                        key={cat.label}
                                        category={cat}
                                        delay={i * 600}
                                        isInView={showOutput}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Interactive Prompt */}
                        <InteractivePrompt isReady={showOutput} />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
