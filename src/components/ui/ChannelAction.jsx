import { BUSINESS_STATUS } from '../../data/contact'

function ChannelAction({ channel, icon: Icon, className = '', unavailableClassName = '', iconClassName = 'h-5 w-5 shrink-0', children, 'aria-label': ariaLabel, iconOnly = false }) {
  const content = (
    <>
      {Icon ? <Icon className={iconClassName} aria-hidden="true" /> : null}
      {iconOnly ? null : children ?? channel.label}
    </>
  )

  if (channel.status === BUSINESS_STATUS.AVAILABLE && channel.url) {
    return (
      <a
        href={channel.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className={className}
      >
        {content}
      </a>
    )
  }

  return (
    <span className={unavailableClassName || className} aria-disabled="true" title={channel.note}>
      {content}
    </span>
  )
}

export default ChannelAction
