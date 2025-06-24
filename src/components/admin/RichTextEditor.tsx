'use client'

import React, { useEffect, useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import 'react-quill-new/dist/quill.snow.css'

// Types for Quill
interface QuillEditor {
  getHTML(): string
}

interface QuillDelta {
  ops?: unknown[]
}

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false,
  loading: () => (
    <div className="aerospace-editor-loading">
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-cyan-400 animate-pulse">🚀 Loading editor...</div>
      </div>
    </div>
  )
})

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  height?: number
}

export function RichTextEditor({ 
  value, 
  onChange, 
  placeholder = "Write your mission report here...",
  height = 400
}: RichTextEditorProps) {
  const [editorValue, setEditorValue] = useState(value)

  // Update internal state when value prop changes
  useEffect(() => {
    if (value !== editorValue) {
      setEditorValue(value)
    }
  }, [value, editorValue])

  // Handle editor changes
  const handleChange = (content: string, delta: QuillDelta, source: string, editor: QuillEditor) => {
    const html = editor.getHTML()
    setEditorValue(html)
    onChange(html)
  }

  // Quill modules configuration
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        // Single Row: All tools in one line
        [
          { 'header': [1, 2, 3, false] },
          'bold', 'italic', 'underline', 'strike',
          { 'color': [] }, 
          { 'background': [] },
          { 'list': 'ordered' }, 
          { 'list': 'bullet' },
          { 'align': [] },
          { 'indent': '-1' }, 
          { 'indent': '+1' },
          'blockquote', 
          'code-block',
          'link', 
          'image',
          'clean'
        ]
      ],
      handlers: {
        // Custom handlers can be added here if needed
      }
    },
    clipboard: {
      matchVisual: false
    }
  }), [])

  // Quill formats
  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'list', 'bullet', 'indent',
    'align', 'direction',
    'link', 'image', 'video',
    'blockquote', 'code-block'
  ]

  // Get word count and read time
  const getStats = () => {
    const text = editorValue.replace(/<[^>]*>/g, '').trim()
    const words = text.split(/\s+/).filter(w => w.length > 0).length
    const readTime = Math.max(1, Math.ceil(words / 200))
    return { words, readTime }
  }

  const stats = getStats()

  return (
    <div className="rich-text-editor-wrapper relative">
      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
        <div className="absolute top-[20%] left-[15%] w-1 h-1 bg-cyan-400 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-[60%] right-[20%] w-1 h-1 bg-purple-400 rounded-full opacity-40 animate-pulse delay-1000"></div>
        <div className="absolute bottom-[30%] left-[70%] w-0.5 h-0.5 bg-cyan-300 rounded-full opacity-50 animate-pulse delay-500"></div>
      </div>
      
      <style jsx global>{`
        /* Minimal Aerospace theme for Quill editor - mostly use default styles */
        
        /* Basic container styling */
        .ql-snow {
          background: rgba(15, 23, 42, 0.95) !important;
          border: 1px solid rgba(6, 182, 212, 0.3) !important;
          border-radius: 0.75rem !important;
          backdrop-filter: blur(16px) !important;
          box-shadow: 
            0 0 20px rgba(6, 182, 212, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.05) !important;
          display: flex !important;
          flex-direction: column !important;
        }
        
        /* Container structure fixes */
        .ql-container {
          border: none !important;
          background: transparent !important;
          flex: 1 !important;
          display: flex !important;
          flex-direction: column !important;
        }
        
        /* Editor area styling */
        .ql-editor {
          background: rgba(15, 23, 42, 0.4) !important;
          color: #e2e8f0 !important;
          min-height: ${height}px !important;
          border: none !important;
          padding: 1rem !important;
          flex: 1 !important;
        }
        
        .ql-editor.ql-blank::before {
          color: #64748b !important;
          opacity: 0.7 !important;
        }
        
        /* Toolbar styling - keep it minimal but aerospace themed */
        .ql-toolbar {
          background: linear-gradient(135deg, rgba(51, 65, 85, 0.8), rgba(71, 85, 105, 0.7)) !important;
          border: none !important;
          border-bottom: 1px solid rgba(6, 182, 212, 0.3) !important;
          border-radius: 0.75rem 0.75rem 0 0 !important;
          position: relative !important;
          flex-shrink: 0 !important;
          z-index: 10 !important;
        }
        
        /* Button styling - aerospace theme with default spacing */
        .ql-toolbar button,
        .ql-toolbar .ql-picker-label {
          color: #f1f5f9 !important;
          background: rgba(30, 41, 59, 0.7) !important;
          border: 1px solid rgba(148, 163, 184, 0.5) !important;
          border-radius: 0.25rem !important;
          transition: all 0.2s ease-in-out !important;
        }
        
        .ql-toolbar button:hover,
        .ql-toolbar .ql-picker-label:hover {
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.4), rgba(139, 92, 246, 0.3)) !important;
          color: #ffffff !important;
          border-color: rgba(6, 182, 212, 0.7) !important;
          box-shadow: 0 2px 8px rgba(6, 182, 212, 0.3) !important;
        }
        
        .ql-toolbar button.ql-active,
        .ql-toolbar .ql-picker-label.ql-active {
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.5), rgba(139, 92, 246, 0.4)) !important;
          color: #ffffff !important;
          border-color: rgba(6, 182, 212, 0.8) !important;
          box-shadow: 0 0 8px rgba(6, 182, 212, 0.4) !important;
        }
        
        /* Icon and text visibility improvements - minimal override */
        .ql-toolbar .ql-stroke {
          stroke: #f1f5f9 !important;
        }
        
        .ql-toolbar .ql-fill {
          fill: #f1f5f9 !important;
        }
        
        .ql-toolbar button:hover .ql-stroke {
          stroke: #ffffff !important;
        }
        
        .ql-toolbar button:hover .ql-fill {
          fill: #ffffff !important;
        }
        
        .ql-toolbar button.ql-active .ql-stroke {
          stroke: #ffffff !important;
        }
        
        .ql-toolbar button.ql-active .ql-fill {
          fill: #ffffff !important;
        }
        
        /* Button text and icons - minimal override */
        .ql-toolbar button svg,
        .ql-toolbar .ql-picker-label svg {
          opacity: 1 !important;
        }
        
        .ql-toolbar .ql-picker-label {
          font-weight: 500 !important;
        }
        
        /* Text formatting for picker labels */
        .ql-toolbar .ql-picker-label::before {
          color: inherit !important;
          opacity: 1 !important;
        }
        
        /* Use default Quill spacing and sizing */
        
        /* Color picker button visibility */
        .ql-toolbar .ql-color .ql-picker-label svg,
        .ql-toolbar .ql-background .ql-picker-label svg {
          opacity: 1 !important;
          filter: brightness(1.2) !important;
        }
        
        /* Ensure all button content is visible */
        .ql-toolbar button * {
          pointer-events: none !important;
        }
        
        .ql-toolbar .ql-picker-label * {
          pointer-events: none !important;
        }
        
        /* Button focus states */
        .ql-toolbar button:focus,
        .ql-toolbar .ql-picker-label:focus {
          outline: 2px solid rgba(6, 182, 212, 0.5) !important;
          outline-offset: 2px !important;
        }
        
        /* Z-index fixes for dropdowns */
        .ql-toolbar .ql-picker-options {
          z-index: 999999 !important;
          background: rgba(30, 41, 59, 0.95) !important;
          border: 1px solid rgba(6, 182, 212, 0.4) !important;
          border-radius: 0.5rem !important;
          backdrop-filter: blur(12px) !important;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5) !important;
        }
        
        .ql-toolbar .ql-picker-options .ql-picker-item {
          color: #ffffff !important;
        }
        
        .ql-toolbar .ql-picker-options .ql-picker-item:hover {
          background: rgba(6, 182, 212, 0.2) !important;
        }
        
        .ql-toolbar .ql-picker-options .ql-picker-item.ql-selected {
          background: rgba(6, 182, 212, 0.4) !important;
        }
        
        /* Ensure proper z-index layering */
        .ql-toolbar .ql-picker.ql-expanded {
          z-index: 999999 !important;
        }
        
        .rich-text-editor-wrapper {
          overflow: visible !important;
          position: relative !important;
          z-index: 100 !important;
        }
        
        /* Basic content styling */
        .ql-editor h1, .ql-editor h2, .ql-editor h3, 
        .ql-editor h4, .ql-editor h5, .ql-editor h6 {
          color: #06b6d4 !important;
        }
        
        .ql-editor a {
          color: #06b6d4 !important;
        }
        
        .ql-editor blockquote {
          border-left: 4px solid #06b6d4 !important;
          background-color: rgba(6, 182, 212, 0.1) !important;
        }
        
        /* Tooltips */
        .ql-tooltip {
          background: rgba(30, 41, 59, 0.95) !important;
          border: 1px solid rgba(6, 182, 212, 0.3) !important;
          border-radius: 0.5rem !important;
          color: #e2e8f0 !important;
        }
        
        .ql-tooltip input {
          background: rgba(15, 23, 42, 0.8) !important;
          border: 1px solid rgba(6, 182, 212, 0.3) !important;
          color: #e2e8f0 !important;
        }
      `}</style>
      
      <div className="space-y-3 relative z-10">
        <div className="flex items-center justify-between bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-cyan-500/20">
          <div className="flex items-center gap-3 text-sm text-cyan-400">
            <span className="text-lg animate-pulse">🚀</span>
            <span className="font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Advanced Rich Text Editor
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1 text-emerald-400">
              <span>📝</span>
              <span>Words: <span className="font-mono font-bold">{stats.words}</span></span>
            </div>
            <div className="flex items-center gap-1 text-amber-400">
              <span>⏱️</span>
              <span>Read: <span className="font-mono font-bold">{stats.readTime}</span> min</span>
            </div>
          </div>
        </div>
        
        <div className="relative">
          <ReactQuill
            theme="snow"
            value={editorValue}
            onChange={handleChange}
            modules={modules}
            formats={formats}
            placeholder={placeholder}
            style={{
              height: `${height}px`,
            }}
          />
        </div>
        
        <div className="bg-gradient-to-r from-slate-800/30 to-slate-700/30 backdrop-blur-sm rounded-lg px-4 py-3 border border-purple-500/20">
          <div className="flex items-start gap-3 text-xs text-slate-300">
            <span className="text-lg">💡</span>
            <div>
              <p className="font-semibold text-purple-300 mb-1">Pro Tips:</p>
              <ul className="space-y-1 text-slate-400 leading-relaxed">
                <li>• Use the comprehensive toolbar for rich formatting</li>
                <li>• Supports images, links, lists, code blocks, and more</li>
                <li>• Perfect for creating detailed aerospace mission reports! 🚀</li>
                <li>• <span className="text-cyan-400">Ctrl/Cmd + B</span> for bold, <span className="text-cyan-400">Ctrl/Cmd + I</span> for italic</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 