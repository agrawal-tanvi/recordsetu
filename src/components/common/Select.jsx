import React from 'react';

export const Select = ({
  label,
  options = [],
  value,
  onChange,
  name,
  id,
  required = false,
  error,
  placeholder = 'Select an option',
  disabled = false,
  className = '',
  ...props
}) => {
  const selectId = id || name;

  return (
    <div className={`form-group ${error ? 'has-error' : ''} ${className}`}>
      {label && (
        <label htmlFor={selectId} className="form-label">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      <div className="select-wrapper">
        <select
          id={selectId}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`form-select ${error ? 'is-invalid' : ''}`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled={required}>
              {placeholder}
            </option>
          )}
          {options.map((opt, idx) => {
            const optVal = typeof opt === 'object' ? opt.value : opt;
            const optLabel = typeof opt === 'object' ? opt.label : opt;
            return (
              <option key={`${optVal}-${idx}`} value={optVal}>
                {optLabel}
              </option>
            );
          })}
        </select>
      </div>
      {error && <span className="form-error-msg">{error}</span>}
    </div>
  );
};

export default Select;