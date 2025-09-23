import { useState, useCallback, useEffect } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(12)
  const [includeNumber, setIncludeNumber] = useState(true)
  const [includeCharacter, setIncludeCharacter] = useState(true)
  const [password, setPassword] = useState("")
  const [copied, setCopied] = useState(false)

  const passwordGenerator = () => {
    let pass = ""
    let str: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (includeNumber) str += "0123456789"
    if (includeCharacter) str += "!@#$%^&*"
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }
    setPassword(pass)}
  // }, [length, includeNumber, includeCharacter,setPassword])

  useEffect(() => {
    passwordGenerator()
  }, [length, includeNumber, includeCharacter,setPassword])

  // Animation for copy confirmation
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 1500)
      return () => clearTimeout(timer)
    }
  }, [copied])

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center"
      style={{
        background:
          'repeating-linear-gradient(135deg, #18181b 0px, #18181b 8px, #23232a 8px, #23232a 16px)',
        fontFamily: "'Press Start 2P', 'VT323', 'Fira Mono', 'monospace', monospace",
        letterSpacing: '0.03em',
      }}
    >
      <div
        className="w-full max-w-md mx-auto px-4 sm:px-6 py-6 sm:py-8 my-4 sm:my-8 border-4"
        style={{
          borderRadius: '0.5rem',
          borderColor: '#222',
          background:
            'repeating-linear-gradient(90deg, #18181b 0px, #18181b 12px, #23232a 12px, #23232a 24px)',
          boxShadow: '0 0 0 4px #000, 0 8px 32px #000a',
          fontFamily: "'Press Start 2P', 'VT323', 'Fira Mono', 'monospace', monospace",
        }}
      >
        <h1
          className="text-xl sm:text-2xl text-center mb-6 sm:mb-8 animate-fade-in"
          style={{
            color: '#fff',
            fontFamily: "'Press Start 2P', 'VT323', 'Fira Mono', 'monospace', monospace",
            textShadow: '0 2px 0 #000, 0 0 8px #0ff8',
            letterSpacing: '0.05em',
            fontWeight: 400,
          }}
        >
          PASSWORD GENERATOR
        </h1>
        <div
          className="flex flex-col sm:flex-row items-stretch sm:items-center mb-6 sm:mb-8 px-2 py-2 gap-2"
          style={{
            background:
              'repeating-linear-gradient(0deg, #23232a 0px, #23232a 6px, #18181b 6px, #18181b 12px)',
            border: '2px solid #333',
            borderRadius: '0.25rem',
            boxShadow: '0 0 0 2px #000, 0 2px 8px #000a',
          }}
        >
          <input
            type="text"
            value={password}
            className="w-full px-2 sm:px-3 py-2 text-base sm:text-lg select-all"
            style={{
              background: 'transparent',
              color: '#ffb86c',
              fontFamily: "'VT323', 'Fira Mono', 'monospace', monospace",
              fontSize: '1.1rem',
              border: 'none',
              outline: 'none',
              letterSpacing: '0.08em',
              textShadow: '0 1px 0 #000, 0 0 4px #ffb86c44',
              borderRadius: 0,
              minWidth: 0,
              flex: 1,
            }}
            placeholder="Password"
            readOnly
            aria-label="Generated password"
          />
          <button
            className="sm:ml-2 mt-2 sm:mt-0 px-2 sm:px-3 py-2"
            style={{
              background:
                'repeating-linear-gradient(135deg, #0ff 0px, #0ff 6px, #00f 6px, #00f 12px)',
              color: '#fff',
              fontFamily: "'Press Start 2P', 'VT323', 'Fira Mono', 'monospace', monospace",
              fontSize: '0.85rem',
              border: '2px solid #222',
              borderRadius: '0.15rem',
              boxShadow: '0 0 0 2px #000, 0 2px 8px #000a',
              cursor: 'pointer',
              outline: 'none',
              transition: 'filter 0.1s',
              filter: copied ? 'brightness(1.2)' : 'none',
              minWidth: '90px',
            }}
            onClick={() => {
              if (password) {
                navigator.clipboard.writeText(password)
                setCopied(true)
              }
            }}
            aria-label="Copy password"
          >
            {copied ? (
              <span
                className="flex items-center gap-1 animate-bounce"
                style={{
                  color: '#0f0',
                  fontFamily: "'Press Start 2P', 'VT323', 'Fira Mono', 'monospace', monospace",
                  fontSize: '0.8rem',
                  textShadow: '0 1px 0 #000, 0 0 4px #0f04',
                }}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  style={{ color: '#0f0', filter: 'drop-shadow(0 0 2px #0f0)' }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                COPIED!
              </span>
            ) : (
              <span
                className="flex items-center gap-1"
                style={{
                  fontFamily: "'Press Start 2P', 'VT323', 'Fira Mono', 'monospace', monospace",
                  fontSize: '0.8rem',
                }}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  style={{ color: '#fff' }}
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                COPY
              </span>
            )}
          </button>
        </div>
        <div className="flex flex-col gap-4 sm:gap-6">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-2 sm:mb-4 gap-2">
            <label
              htmlFor="length"
              className="font-medium"
              style={{
                color: '#b8b8b8',
                fontFamily: "'Press Start 2P', 'VT323', 'Fira Mono', 'monospace', monospace",
                fontSize: '0.8rem',
              }}
            >
              LENGTH: <span style={{ color: '#ffb86c', fontWeight: 700 }}>{length}</span>
            </label>
            <input
              id="length"
              type="range"
              min={6}
              max={32}
              value={length}
              className="accent-orange-400 w-full sm:w-[60%] mt-2 sm:mt-0"
              style={{
                accentColor: '#ffb86c',
                background: 'transparent',
                outline: 'none',
                height: '2px',
                borderRadius: 0,
                boxShadow: '0 1px 0 #000',
              }}
              onChange={e => setLength(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between mb-2 gap-2">
            <label
              htmlFor="numberInput"
              className="font-medium flex items-center gap-2 cursor-pointer"
              style={{
                color: '#b8b8b8',
                fontFamily: "'Press Start 2P', 'VT323', 'Fira Mono', 'monospace', monospace",
                fontSize: '0.8rem',
                userSelect: 'none',
              }}
            >
              <input
                type="checkbox"
                checked={includeNumber}
                id="numberInput"
                className="accent-blue-500"
                style={{
                  width: '1.1em',
                  height: '1.1em',
                  accentColor: '#0ff',
                  border: '2px solid #222',
                  borderRadius: 0,
                  marginRight: '0.5em',
                  background: '#18181b',
                  boxShadow: '0 0 0 1px #000',
                }}
                onChange={() => setIncludeNumber(prev => !prev)}
              />
              <span>NUMBERS</span>
            </label>
            <label
              htmlFor="characterInput"
              className="font-medium flex items-center gap-2 cursor-pointer"
              style={{
                color: '#b8b8b8',
                fontFamily: "'Press Start 2P', 'VT323', 'Fira Mono', 'monospace', monospace",
                fontSize: '0.8rem',
                userSelect: 'none',
              }}
            >
              <input
                type="checkbox"
                checked={includeCharacter}
                id="characterInput"
                className="accent-blue-500"
                style={{
                  width: '1.1em',
                  height: '1.1em',
                  accentColor: '#0ff',
                  border: '2px solid #222',
                  borderRadius: 0,
                  marginRight: '0.5em',
                  background: '#18181b',
                  boxShadow: '0 0 0 1px #000',
                }}
                onChange={() => setIncludeCharacter(prev => !prev)}
              />
              <span>SYMBOLS</span>
            </label>
          </div>
        </div>
        <div className="mt-6 sm:mt-8 flex justify-center">
          <button
            className="animate-fade-in w-full sm:w-auto"
            style={{
              background:
                'repeating-linear-gradient(135deg, #ffb86c 0px, #ffb86c 6px, #ff79c6 6px, #ff79c6 12px)',
              color: '#18181b',
              fontFamily: "'Press Start 2P', 'VT323', 'Fira Mono', 'monospace', monospace",
              fontSize: '1rem',
              padding: '0.7em 2.5em',
              border: '2px solid #222',
              borderRadius: '0.2rem',
              boxShadow: '0 0 0 2px #000, 0 2px 8px #000a',
              fontWeight: 700,
              cursor: 'pointer',
              outline: 'none',
              letterSpacing: '0.08em',
              textShadow: '0 1px 0 #fff4',
              transition: 'filter 0.1s',
            }}
            onClick={passwordGenerator}
            aria-label="Regenerate password"
          >
            GENERATE
          </button>
        </div>
        <p
          className="text-xs text-center mt-6 sm:mt-8 animate-fade-in"
          style={{
            color: '#666',
            fontFamily: "'VT323', 'Fira Mono', 'monospace', monospace",
            fontSize: '0.7rem',
            marginTop: '2.5em',
            textShadow: '0 1px 0 #000',
            letterSpacing: '0.04em',
            wordBreak: 'break-word',
          }}
        >
          Passwords are generated locally in your browser.<br className="hidden sm:block" />
          Use strong, unique passwords for your accounts.
        </p>
      </div>
      {/* Pixel font import */}
      <link
        href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap"
        rel="stylesheet"
      />
      <style>
        {`
          .animate-fade-in {
            animation: fadeIn 0.8s cubic-bezier(.4,0,.2,1) both;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(16px);}
            to { opacity: 1; transform: translateY(0);}
          }
          input[type="range"]::-webkit-slider-thumb {
            appearance: none;
            width: 18px;
            height: 18px;
            background: #ffb86c;
            border: 2px solid #222;
            box-shadow: 0 0 0 2px #000;
            border-radius: 0;
            cursor: pointer;
          }
          input[type="range"]::-moz-range-thumb {
            width: 18px;
            height: 18px;
            background: #ffb86c;
            border: 2px solid #222;
            box-shadow: 0 0 0 2px #000;
            border-radius: 0;
            cursor: pointer;
          }
          input[type="range"]::-ms-thumb {
            width: 18px;
            height: 18px;
            background: #ffb86c;
            border: 2px solid #222;
            box-shadow: 0 0 0 2px #000;
            border-radius: 0;
            cursor: pointer;
          }
          input[type="range"] {
            background: transparent;
          }
          @media (max-width: 640px) {
            .text-xs {
              font-size: 0.65rem !important;
            }
            .text-xl {
              font-size: 1.1rem !important;
            }
            .text-lg {
              font-size: 1rem !important;
            }
            .text-base {
              font-size: 0.95rem !important;
            }
            .sm\\:text-2xl {
              font-size: 1.3rem !important;
            }
            .sm\\:mb-8 {
              margin-bottom: 1.5rem !important;
            }
            .sm\\:py-8 {
              padding-top: 1.5rem !important;
              padding-bottom: 1.5rem !important;
            }
            .sm\\:px-6 {
              padding-left: 1.25rem !important;
              padding-right: 1.25rem !important;
            }
            .sm\\:w-\\[60\\%\\] {
              width: 100% !important;
            }
            .sm\\:w-auto {
              width: 100% !important;
            }
            .sm\\:mt-8 {
              margin-top: 1.5rem !important;
            }
            .sm\\:flex-row {
              flex-direction: column !important;
            }
            .sm\\:items-center {
              align-items: stretch !important;
            }
            .sm\\:ml-2 {
              margin-left: 0 !important;
            }
            .sm\\:mt-0 {
              margin-top: 0 !important;
            }
          }
        `}
      </style>
    </div>
  )
}

export default App
