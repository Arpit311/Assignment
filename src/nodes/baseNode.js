// baseNode.js

import { useMemo, useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';

const positionMap = {
  top: Position.Top,
  bottom: Position.Bottom,
  left: Position.Left,
  right: Position.Right,
};

const getPosition = (position) => {
  if (!position) return Position.Right;
  const key = typeof position === 'string' ? position.toLowerCase() : position;
  return positionMap[key] || position;
};

const defaultStyle = {
  width: 240,
  minHeight: 100,
  border: '2px solid #D1D5DB',
  borderRadius: 10,
  padding: '12px',
  backgroundColor: '#FFFFFF',
  color: '#111827',
  fontFamily: 'inherit',
  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  transition: 'all 150ms ease-in-out',
};

const fieldStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  marginBottom: '8px',
};

const labelStyle = {
  fontSize: '11px',
  color: '#6B7280',
  fontWeight: '600',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
};

const inputStyle = {
  width: '100%',
  borderRadius: 6,
  border: '1px solid #D1D5DB',
  padding: '6px 8px',
  backgroundColor: '#F9FAFB',
  color: '#111827',
  fontSize: '12px',
  transition: 'all 150ms ease-in-out',
};

export const BaseNode = ({
  id,
  data = {},
  title = 'Node',
  subtitle,
  fields = [],
  handles = [],
  renderBody,
  style,
}) => {
  const initialValues = useMemo(() => {
    return fields.reduce((acc, field) => {
      acc[field.key] = data[field.key] ?? field.default ?? '';
      return acc;
    }, {});
  }, [fields]); // eslint-disable-line react-hooks/exhaustive-deps

  const [values, setValues] = useState(initialValues);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current) {
      setValues(initialValues);
      hasInitialized.current = true;
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onFieldChange = (key, val) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  };

  return (
    <div style={{ ...defaultStyle, ...style }}>
      <div style={{ fontWeight: '700', marginBottom: '8px', fontSize: '13px', color: '#F59E0B' }}>{title}</div>
      {subtitle && <div style={{ fontSize: '11px', color: '#6B7280', marginBottom: 10, fontWeight: '500' }}>{subtitle}</div>}
      <div style={{ marginBottom: '4px' }}>
        {fields.map((field) => (
          <div key={field.key} style={fieldStyle}>
            <label style={labelStyle}>
              {field.label}
              {field.type === 'text' && (
                <input
                  style={inputStyle}
                  type="text"
                  value={values[field.key] ?? ''}
                  onChange={(e) => onFieldChange(field.key, e.target.value)}
                />
              )}
              {field.type === 'select' && (
                <select
                  style={inputStyle}
                  value={values[field.key] ?? ''}
                  onChange={(e) => onFieldChange(field.key, e.target.value)}
                >
                  {(field.options || []).map((opt) => (
                    <option key={opt.value ?? opt} value={opt.value ?? opt}>
                      {opt.label ?? opt}
                    </option>
                  ))}
                </select>
              )}
            </label>
          </div>
        ))}
      </div>
      {renderBody && <div style={{ marginTop: 6, fontSize: '11px', color: '#6B7280', fontStyle: 'italic' }}>{renderBody(values)}</div>}

      {handles.map((handle) => (
        <Handle
          key={handle.id}
          id={handle.id}
          type={handle.type}
          position={getPosition(handle.position)}
          style={handle.style}
        />
      ))}
    </div>
  );
};
