// textNode.js

import { useState, useMemo, useRef, useEffect } from 'react';
import { Handle, Position } from 'reactflow';

const parseVariables = (text) => {
  const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
  const variables = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (!variables.includes(match[1])) {
      variables.push(match[1]);
    }
  }
  return variables;
};

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || '{{input}}');
  const [textareaHeight, setTextareaHeight] = useState(80);
  const textareaRef = useRef(null);
  
  // Auto-adjust textarea height based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      setTextareaHeight(scrollHeight);
      textareaRef.current.style.height = scrollHeight + 'px';
    }
  }, [text]);
  
  // Parse variables from text
  const variables = useMemo(() => parseVariables(text), [text]);
  
  // Calculate dynamic height based on textarea and content
  const estimatedHeight = useMemo(() => {
    const labelHeight = 50; // title + label
    const variableHeight = variables.length > 0 ? 50 + variables.length * 15 : 0;
    const totalHeight = labelHeight + textareaHeight + variableHeight + 20; // 20px margins
    return Math.max(150, totalHeight);
  }, [textareaHeight, variables.length]);
  
  // Generate dynamic handles for variables
  const variableHandles = useMemo(() => {
    return variables.map((varName, idx) => ({
      id: `${id}-var-${varName}`,
      type: 'target',
      position: 'left',
      style: { top: `${30 + (idx * 20)}%` },
    }));
  }, [id, variables]);

  // Static output handle
  const outputHandle = {
    id: `${id}-output`,
    type: 'source',
    position: 'right',
  };

  const allHandles = [...variableHandles, outputHandle];

  const nodeStyle = {
    width: 280,
    minHeight: estimatedHeight,
    border: '2px solid #F59E0B',
    borderRadius: 10,
    padding: '12px',
    backgroundColor: '#FFFFFF',
    color: '#111827',
    fontFamily: 'inherit',
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    transition: 'all 150ms ease-in-out',
  };

  return (
    <div style={{ ...nodeStyle }}>
      <div style={{ fontWeight: '700', marginBottom: '8px', fontSize: '13px', color: '#F59E0B' }}>
        Text
      </div>
      <div style={{ marginBottom: '8px' }}>
        <label style={{ fontSize: '11px', color: '#6B7280', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '4px' }}>
          Text Content
        </label>
        <textarea
          ref={textareaRef}
          style={{
            width: '100%',
            borderRadius: 6,
            border: '1px solid #D1D5DB',
            padding: '8px',
            backgroundColor: '#F9FAFB',
            color: '#111827',
            fontSize: '12px',
            fontFamily: 'monospace',
            resize: 'none',
            minHeight: '80px',
            transition: 'all 150ms ease-in-out',
            overflowY: 'hidden',
          }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text with {{variable}} syntax"
        />
      </div>

      {variables.length > 0 && (
        <div style={{ fontSize: '10px', color: '#6B7280', marginBottom: '8px', padding: '6px', backgroundColor: '#F9FAFB', borderRadius: '4px' }}>
          <div style={{ fontWeight: '600', marginBottom: '4px', color: '#F59E0B' }}>Variables:</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {variables.map((v) => (
              <span
                key={v}
                style={{
                  backgroundColor: '#E5E7EB',
                  padding: '2px 6px',
                  borderRadius: '3px',
                  fontSize: '10px',
                  color: '#374151',
                }}
              >
                {v}
              </span>
            ))}
          </div>
        </div>
      )}

      {allHandles.map((handle) => (
        <Handle
          key={handle.id}
          id={handle.id}
          type={handle.type}
          position={Position[handle.position.charAt(0).toUpperCase() + handle.position.slice(1)]}
          style={handle.style}
        />
      ))}
    </div>
  );
};
