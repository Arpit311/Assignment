// baseNode.js

import { useState, useEffect } from 'react';
import { Handle } from 'reactflow';

export const BaseNode = ({
  id,
  data,
  title,
  inputs = [],
  handles = [],
  style = { width: 200, height: 80, border: '1px solid black' },
  children
}) => {
  const [inputValues, setInputValues] = useState({});

  useEffect(() => {
    const initialValues = {};
    inputs.forEach(input => {
      const key = input.key || input.label.toLowerCase().replace(' ', '');
      initialValues[key] = data[key] || input.defaultValue || '';
    });
    setInputValues(initialValues);
  }, [data, inputs]);

  const handleInputChange = (key, value) => {
    setInputValues(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div style={style}>
      {handles.map(handle => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={`${id}-${handle.id}`}
          style={handle.style}
        />
      ))}
      <div>
        <span>{title}</span>
      </div>
      {inputs.map(input => {
        const key = input.key || input.label.toLowerCase().replace(' ', '');
        return (
          <div key={key}>
            <label>
              {input.label}:
              {input.type === 'select' ? (
                <select
                  value={inputValues[key]}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                >
                  {input.options.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={input.type}
                  value={inputValues[key]}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                />
              )}
            </label>
          </div>
        );
      })}
      {children}
    </div>
  );
};