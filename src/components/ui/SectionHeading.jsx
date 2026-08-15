function SectionHeading({ eyebrow, title, description, className = '', titleClassName = '' }) {
  return (
    <header className={className}>
      <span className="section-eyebrow">{eyebrow}</span>
      <h2 className={`display-balance text-[clamp(2.7rem,6vw,5.5rem)] font-extrabold leading-[0.94] tracking-[-0.055em] text-on-surface ${titleClassName}`}>
        {title}
      </h2>
      {description ? <p className="mt-6 max-w-2xl text-base leading-relaxed text-on-surface/65 md:text-lg">{description}</p> : null}
    </header>
  )
}

export default SectionHeading
