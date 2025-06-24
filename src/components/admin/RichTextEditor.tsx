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
        /* Aerospace theme for Quill editor */
        .ql-editor {
          background: rgba(15, 23, 42, 0.6) !important;
          color: #e2e8f0 !important;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif !important;
          font-size: 14px !important;
          line-height: 1.6 !important;
          min-height: ${height}px !important;
          padding: 1.5rem !important;
          border: none !important;
        }
        
        .ql-editor.ql-blank::before {
          color: #64748b !important;
          font-style: italic !important;
          opacity: 0.7 !important;
        }
        
        .ql-container {
          border: none !important;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif !important;
        }
        
        .ql-snow {
          border: none !important;
          background: rgba(15, 23, 42, 0.95) !important;
          background-image: 
            radial-gradient(circle at 25% 25%, rgba(6, 182, 212, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.05) 0%, transparent 50%) !important;
          border-radius: 0.75rem !important;
          backdrop-filter: blur(16px) !important;
          box-shadow: 
            0 0 30px rgba(6, 182, 212, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
          overflow: hidden !important;
          transition: all 0.3s ease-in-out !important;
        }
        
        .ql-snow:focus-within {
          box-shadow: 
            0 0 30px rgba(6, 182, 212, 0.25),
            0 0 60px rgba(139, 92, 246, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;
          transform: translateY(-2px) !important;
        }
        
        .ql-toolbar {
          background: linear-gradient(135deg, rgba(51, 65, 85, 0.95), rgba(71, 85, 105, 0.9)) !important;
          border: 1px solid rgba(6, 182, 212, 0.4) !important;
          border-bottom: 2px solid rgba(6, 182, 212, 0.5) !important;
          backdrop-filter: blur(12px) !important;
          padding: 0.75rem 1rem !important;
          border-radius: 0.75rem 0.75rem 0 0 !important;
          box-shadow: 
            0 2px 8px rgba(0, 0, 0, 0.2),
            0 0 20px rgba(6, 182, 212, 0.15) !important;
          display: flex !important;
          flex-wrap: nowrap !important;
          align-items: center !important;
          overflow-x: auto !important;
          gap: 0.25rem !important;
          min-height: 50px !important;
        }
        
        .ql-toolbar .ql-formats {
          margin-right: 0.375rem !important;
          margin-bottom: 0 !important;
          padding: 0.125rem !important;
          border-radius: 0.375rem !important;
          background: rgba(15, 23, 42, 0.2) !important;
          border: 1px solid rgba(6, 182, 212, 0.15) !important;
          position: relative !important;
          display: flex !important;
          align-items: center !important;
          gap: 0.125rem !important;
          flex-shrink: 0 !important;
          height: auto !important;
        }
        
        .ql-toolbar button,
        .ql-toolbar .ql-picker-label {
          color: #f1f5f9 !important;
          background: rgba(30, 41, 59, 0.6) !important;
          border: 1px solid rgba(148, 163, 184, 0.4) !important;
          border-radius: 0.375rem !important;
          transition: all 0.2s ease-in-out !important;
          padding: 0.25rem !important;
          margin: 0.125rem !important;
          font-size: 12px !important;
          height: 30px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          flex-shrink: 0 !important;
          vertical-align: middle !important;
          cursor: pointer !important;
          line-height: 1 !important;
        }
        
        .ql-toolbar button {
          width: 30px !important;
        }
        
        .ql-toolbar .ql-picker-label {
          min-width: 70px !important;
          padding-left: 0.5rem !important;
          padding-right: 0.5rem !important;
          text-align: left !important;
          white-space: nowrap !important;
        }
        
        .ql-toolbar button:hover,
        .ql-toolbar .ql-picker-label:hover {
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.25), rgba(139, 92, 246, 0.25)) !important;
          color: #00d4ff !important;
          border-color: rgba(6, 182, 212, 0.6) !important;
          transform: translateY(-2px) !important;
          box-shadow: 
            0 4px 12px rgba(6, 182, 212, 0.3),
            0 0 20px rgba(6, 182, 212, 0.2) !important;
        }
        
        .ql-toolbar button.ql-active,
        .ql-toolbar .ql-picker-label.ql-active {
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.4), rgba(139, 92, 246, 0.3)) !important;
          color: #00ff88 !important;
          border-color: rgba(6, 182, 212, 0.8) !important;
          box-shadow: 
            0 2px 8px rgba(6, 182, 212, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
          transform: translateY(-1px) !important;
        }
        
        .ql-toolbar .ql-picker-options {
          background: rgba(30, 41, 59, 0.98) !important;
          border: 1px solid #06b6d4 !important;
          border-radius: 0.375rem !important;
          backdrop-filter: blur(10px) !important;
          box-shadow: 
            0 8px 25px rgba(0, 0, 0, 0.6),
            0 0 15px rgba(6, 182, 212, 0.4) !important;
          max-height: 180px !important;
          overflow-y: auto !important;
          overflow-x: hidden !important;
          z-index: 2147483647 !important;
          position: absolute !important;
          top: calc(100% + 2px) !important;
          left: 0 !important;
          min-width: 120px !important;
          width: auto !important;
          padding: 0.25rem 0 !important;
          margin: 0 !important;
          display: none !important;
        }
        
        .ql-toolbar .ql-picker-options .ql-picker-item {
          color: #ffffff !important;
          transition: all 0.2s ease-in-out !important;
          padding: 0.5rem 0.75rem !important;
          cursor: pointer !important;
          border: none !important;
          background: transparent !important;
          display: block !important;
          width: 100% !important;
          text-align: left !important;
          font-size: 12px !important;
          line-height: 1.4 !important;
          min-height: 24px !important;
        }
        
        .ql-toolbar .ql-picker-options .ql-picker-item:hover {
          background: rgba(6, 182, 212, 0.3) !important;
          color: #ffffff !important;
        }
        
        .ql-toolbar .ql-picker-options .ql-picker-item.ql-selected {
          background: rgba(6, 182, 212, 0.5) !important;
          color: #ffffff !important;
          font-weight: 600 !important;
        }
        
        /* Color picker specific fixes */
        .ql-toolbar .ql-color .ql-picker-options,
        .ql-toolbar .ql-background .ql-picker-options {
          padding: 0.5rem !important;
          display: grid !important;
          grid-template-columns: repeat(8, 1fr) !important;
          gap: 0.25rem !important;
          width: 200px !important;
          max-height: none !important;
        }
        
        .ql-toolbar .ql-color .ql-picker-options .ql-picker-item,
        .ql-toolbar .ql-background .ql-picker-options .ql-picker-item {
          width: 20px !important;
          height: 20px !important;
          border-radius: 0.25rem !important;
          padding: 0 !important;
          margin: 0 !important;
          border: 2px solid rgba(255, 255, 255, 0.3) !important;
        }
        
        .ql-toolbar .ql-color .ql-picker-options .ql-picker-item:hover,
        .ql-toolbar .ql-background .ql-picker-options .ql-picker-item:hover {
          border-color: #06b6d4 !important;
          transform: scale(1.1) !important;
        }
        
        .ql-toolbar .ql-picker {
          position: relative !important;
          z-index: 1000 !important;
        }
        
        .ql-toolbar .ql-picker.ql-expanded {
          z-index: 10000000 !important;
          position: relative !important;
        }
        
        .ql-toolbar .ql-picker.ql-expanded .ql-picker-options {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          top: 100% !important;
          left: 0 !important;
          transform: translateY(2px) !important;
        }
        
        /* Prevent overlap by adjusting specific pickers */
        .ql-toolbar .ql-color.ql-expanded .ql-picker-options {
          left: -50px !important;
        }
        
        .ql-toolbar .ql-background.ql-expanded .ql-picker-options {
          left: -80px !important;
        }
        
        .ql-toolbar .ql-align.ql-expanded .ql-picker-options {
          left: -30px !important;
        }
        
        /* Header dropdown specific styling */
        .ql-toolbar .ql-header .ql-picker-options {
          min-width: 140px !important;
        }
        
        .ql-toolbar .ql-header .ql-picker-options .ql-picker-item {
          padding: 0.4rem 0.75rem !important;
          font-size: 13px !important;
          color: #ffffff !important;
          background: transparent !important;
        }
        
        .ql-toolbar .ql-header .ql-picker-options .ql-picker-item[data-value="1"] {
          font-size: 18px !important;
          font-weight: bold !important;
        }
        
        .ql-toolbar .ql-header .ql-picker-options .ql-picker-item[data-value="2"] {
          font-size: 16px !important;
          font-weight: bold !important;
        }
        
        .ql-toolbar .ql-header .ql-picker-options .ql-picker-item[data-value="3"] {
          font-size: 14px !important;
          font-weight: bold !important;
        }
        
        .ql-toolbar .ql-header .ql-picker-options .ql-picker-item:not([data-value]) {
          font-size: 13px !important;
        }
        
        .ql-toolbar .ql-picker:not(.ql-expanded) .ql-picker-options {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
        }
        
        /* Force show dropdown when expanded - fallback */
        .ql-toolbar .ql-picker[aria-expanded="true"],
        .ql-toolbar .ql-picker.ql-active,
        .ql-toolbar .ql-picker:hover {
          z-index: 10000000 !important;
          position: relative !important;
        }
        
        .ql-toolbar .ql-picker[aria-expanded="true"] .ql-picker-options,
        .ql-toolbar .ql-picker.ql-active .ql-picker-options,
        .ql-toolbar .ql-picker:hover .ql-picker-options {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          position: absolute !important;
          top: 100% !important;
          left: 0 !important;
          transform: translateY(2px) !important;
        }
        
        .ql-container {
          position: relative !important;
          z-index: 1 !important;
          overflow: visible !important;
        }
        
        .ql-snow {
          position: relative !important;
          z-index: 10 !important;
          overflow: visible !important;
        }
        
        .ql-toolbar {
          overflow: visible !important;
          position: relative !important;
          z-index: 1000 !important;
        }
        
        /* Parent wrapper should not clip */
        .rich-text-editor-wrapper {
          overflow: visible !important;
          position: relative !important;
          z-index: 100 !important;
        }
        
        /* Create a portal-like container for dropdown */
        body .ql-toolbar .ql-picker-options {
          position: fixed !important;
          z-index: 2147483647 !important;
          top: auto !important;
          left: auto !important;
          transform: none !important;
        }
        
        /* Ensure dropdown positioning works */
        .ql-toolbar .ql-picker {
          overflow: visible !important;
        }
        
        /* Content styling */
        .ql-editor h1,
        .ql-editor h2,
        .ql-editor h3,
        .ql-editor h4,
        .ql-editor h5,
        .ql-editor h6 {
          color: #06b6d4 !important;
          background: linear-gradient(135deg, #06b6d4, #8b5cf6) !important;
          -webkit-background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
          background-clip: text !important;
          font-weight: 600 !important;
          margin: 1.5rem 0 1rem 0 !important;
        }
        
        .ql-editor h1 { font-size: 2rem !important; }
        .ql-editor h2 { font-size: 1.75rem !important; }
        .ql-editor h3 { font-size: 1.5rem !important; }
        .ql-editor h4 { font-size: 1.25rem !important; }
        .ql-editor h5 { font-size: 1.125rem !important; }
        .ql-editor h6 { font-size: 1rem !important; }
        
        .ql-editor p {
          margin: 0.75rem 0 !important;
        }
        
        .ql-editor a {
          color: #06b6d4 !important;
          text-decoration: underline !important;
        }
        
        .ql-editor a:hover {
          color: #8b5cf6 !important;
        }
        
        .ql-editor blockquote {
          border-left: 4px solid #06b6d4 !important;
          background-color: rgba(6, 182, 212, 0.1) !important;
          margin: 1rem 0 !important;
          padding: 1rem !important;
          border-radius: 0 0.5rem 0.5rem 0 !important;
          font-style: italic !important;
        }
        
        .ql-editor .ql-code-block-container {
          background-color: rgba(30, 41, 59, 0.8) !important;
          border: 1px solid rgba(6, 182, 212, 0.3) !important;
          border-radius: 0.5rem !important;
          margin: 1rem 0 !important;
          padding: 1rem !important;
        }
        
        .ql-editor ul,
        .ql-editor ol {
          padding-left: 1.5rem !important;
          margin: 1rem 0 !important;
        }
        
        .ql-editor li {
          margin: 0.5rem 0 !important;
        }
        
        .ql-editor img {
          max-width: 100% !important;
          height: auto !important;
          border-radius: 0.5rem !important;
          margin: 1rem 0 !important;
          box-shadow: 0 8px 32px rgba(6, 182, 212, 0.2) !important;
        }
        
        /* Tooltip styling */
        .ql-tooltip {
          background: rgba(30, 41, 59, 0.95) !important;
          border: 1px solid rgba(6, 182, 212, 0.3) !important;
          border-radius: 0.5rem !important;
          backdrop-filter: blur(16px) !important;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3) !important;
          color: #e2e8f0 !important;
        }
        
        .ql-tooltip input {
          background: rgba(15, 23, 42, 0.8) !important;
          border: 1px solid rgba(6, 182, 212, 0.3) !important;
          border-radius: 0.375rem !important;
          color: #e2e8f0 !important;
          padding: 0.5rem !important;
        }
        
        .ql-tooltip input:focus {
          border-color: rgba(6, 182, 212, 0.6) !important;
          box-shadow: 0 0 0 2px rgba(6, 182, 212, 0.2) !important;
        }
        
        .ql-tooltip a {
          color: #06b6d4 !important;
          text-decoration: none !important;
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(139, 92, 246, 0.15)) !important;
          border: 1px solid rgba(6, 182, 212, 0.3) !important;
          border-radius: 0.375rem !important;
          padding: 0.375rem 0.75rem !important;
          transition: all 0.2s ease-in-out !important;
        }
        
        .ql-tooltip a:hover {
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(139, 92, 246, 0.2)) !important;
          border-color: rgba(6, 182, 212, 0.5) !important;
          transform: translateY(-1px) !important;
        }
        
        /* Loading state */
        .aerospace-editor-loading {
          background: rgba(15, 23, 42, 0.95) !important;
          background-image: 
            radial-gradient(circle at 25% 25%, rgba(6, 182, 212, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.05) 0%, transparent 50%) !important;
          border-radius: 0.75rem !important;
          backdrop-filter: blur(16px) !important;
          box-shadow: 
            0 0 30px rgba(6, 182, 212, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
        }
        
        /* Scrollbar styling */
        .ql-editor::-webkit-scrollbar {
          width: 8px !important;
        }
        
        .ql-editor::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.5) !important;
          border-radius: 4px !important;
        }
        
        .ql-editor::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.5), rgba(139, 92, 246, 0.5)) !important;
          border-radius: 4px !important;
        }
        
        .ql-editor::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.7), rgba(139, 92, 246, 0.7)) !important;
        }
        
        /* Custom icons visibility fix */
        .ql-toolbar .ql-stroke {
          stroke: #f1f5f9 !important;
          stroke-width: 1.5 !important;
        }
        
        .ql-toolbar .ql-fill {
          fill: #f1f5f9 !important;
        }
        
        .ql-toolbar button:hover .ql-stroke {
          stroke: #00d4ff !important;
        }
        
        .ql-toolbar button:hover .ql-fill {
          fill: #00d4ff !important;
        }
        
        .ql-toolbar button.ql-active .ql-stroke {
          stroke: #00ff88 !important;
        }
        
        .ql-toolbar button.ql-active .ql-fill {
          fill: #00ff88 !important;
        }
        
        /* Icon sizing */
        .ql-toolbar button svg,
        .ql-toolbar .ql-picker-label svg {
          width: 16px !important;
          height: 16px !important;
        }
        
        .ql-toolbar button .ql-icon {
          font-size: 12px !important;
        }
        
        /* Enhanced visibility for text inside buttons */
        .ql-toolbar .ql-picker-label::before,
        .ql-toolbar button::before {
          color: inherit !important;
        }
        
        .ql-toolbar .ql-formats:last-child {
          margin-right: 0 !important;
        }
        
        /* Custom scrollbar for toolbar */
        .ql-toolbar::-webkit-scrollbar {
          height: 6px !important;
        }
        
        .ql-toolbar::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.5) !important;
          border-radius: 3px !important;
        }
        
        .ql-toolbar::-webkit-scrollbar-thumb {
          background: linear-gradient(90deg, rgba(6, 182, 212, 0.6), rgba(139, 92, 246, 0.6)) !important;
          border-radius: 3px !important;
        }
        
        .ql-toolbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(90deg, rgba(6, 182, 212, 0.8), rgba(139, 92, 246, 0.8)) !important;
        }
        
        /* Dropdown scrollbar */
        .ql-toolbar .ql-picker-options::-webkit-scrollbar {
          width: 6px !important;
        }
        
        .ql-toolbar .ql-picker-options::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5) !important;
          border-radius: 3px !important;
        }
        
        .ql-toolbar .ql-picker-options::-webkit-scrollbar-thumb {
          background: rgba(6, 182, 212, 0.6) !important;
          border-radius: 3px !important;
        }
        
        .ql-toolbar .ql-picker-options::-webkit-scrollbar-thumb:hover {
          background: rgba(6, 182, 212, 0.8) !important;
        }
        
        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .ql-toolbar {
            padding: 0.5rem !important;
            overflow-x: auto !important;
            overflow-y: hidden !important;
            white-space: nowrap !important;
            min-height: 45px !important;
          }
          
          .ql-toolbar .ql-formats {
            margin-right: 0.25rem !important;
            margin-bottom: 0 !important;
            flex-shrink: 0 !important;
            padding: 0.0625rem !important;
          }
          
          .ql-toolbar button,
          .ql-toolbar .ql-picker-label {
            padding: 0.2rem !important;
            margin: 0.0625rem !important;
            height: 28px !important;
            font-size: 11px !important;
            flex-shrink: 0 !important;
          }
          
          .ql-toolbar button {
            width: 28px !important;
          }
          
          .ql-toolbar .ql-picker-label {
            min-width: 60px !important;
          }
          
          .ql-editor {
            min-height: 300px !important;
            font-size: 16px !important;
            padding: 1rem !important;
          }
          
          .ql-toolbar .ql-picker-options {
            max-height: 150px !important;
            font-size: 12px !important;
          }
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
              height: `${height + 70}px`, // Account for toolbar height
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