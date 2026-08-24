import './Button.css';

/**
 * Button — reusable button component.
 *
 * Props:
 *   children    node     — button label / content
 *   variant     string   — "primary" | "outline" | "ghost" | "danger"  (default: "primary")
 *   size        string   — "sm" | "md" | "lg"  (default: "md")
 *   type        string   — "button" | "submit" | "reset"  (default: "button")
 *   onClick     fn       — click handler
 *   disabled    bool
 *   fullWidth   bool     — stretches to 100% width
 *   loading     bool     — shows a spinner and disables the button
 *   as          string   — render as "a" tag instead of button (e.g. for links styled as buttons)
 *   href        string   — used when as="a"
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  onClick,
  disabled = false,
  fullWidth = false,
  loading = false,
  as: Tag = 'button',
  href,
  className = '',
  ...rest
}) {
  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth ? 'btn--full' : '',
    loading ? 'btn--loading' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const isDisabled = disabled || loading;

  if (Tag === 'a') {
    return (
      <a href={href} className={classes} aria-disabled={isDisabled} {...rest}>
        {loading && <span className="btn__spinner" aria-hidden="true" />}
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={isDisabled}
      aria-busy={loading}
      {...rest}
    >
      {loading && <span className="btn__spinner" aria-hidden="true" />}
      {children}
    </button>
  );
}
