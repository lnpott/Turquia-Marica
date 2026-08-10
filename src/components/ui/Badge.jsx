const TONES = {
  secondary: 'bg-secondary-container text-on-background',
  primary: 'bg-primary text-on-primary',
}

function Badge({ children, tone = 'secondary', className = '', ...rest }) {
  return (
    <span
      className={`inline-flex items-center gap-1 ${TONES[tone]} font-label-bold text-label-bold uppercase tracking-wider rounded-full px-3 py-1 ${className}`}
      {...rest}
    >
      {children}
    </span>
  )
}

export default Badge
