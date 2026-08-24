import './FormInput.css';

/**
 * FormInput — reusable labeled input field with optional error message.
 *
 * Props:
 *   id          string   — links <label> and <input> via htmlFor/id
 *   label       string   — visible label text
 *   type        string   — input type (text, email, password, date, number…) default "text"
 *   value       string   — controlled value
 *   onChange    fn       — change handler
 *   placeholder string   — optional placeholder
 *   error       string   — if provided, renders error message and invalid styling
 *   required    bool     — marks field as required
 *   autoComplete string  — browser autocomplete hint
 *   min/max     string   — for date/number inputs
 *   disabled    bool
 *   rightSlot   node     — optional element rendered inside the right side of the input (e.g. show/hide btn)
 */
export default function FormInput({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false,
  autoComplete,
  min,
  max,
  disabled = false,
  rightSlot,
}) {
  return (
    <div className={`form-input${error ? ' form-input--error' : ''}`}>
      <label htmlFor={id} className="form-input__label">
        {label}
        {required && (
          <span className="form-input__required" aria-hidden="true"> *</span>
        )}
      </label>

      <div className="form-input__wrap">
        <input
          id={id}
          type={type}
          className="form-input__field"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          min={min}
          max={max}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        {rightSlot && (
          <div className="form-input__right-slot">{rightSlot}</div>
        )}
      </div>

      {error && (
        <p id={`${id}-error`} className="form-input__error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
