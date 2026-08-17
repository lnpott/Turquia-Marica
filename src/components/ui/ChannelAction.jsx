import { BUSINESS_STATUS } from '../../data/contact'

function ChannelAction({ channel, icon: Icon, className = '', unavailableClassName = '', children, 'aria-label': ariaLabel }) {
  const content = (
    <>
      {Icon ? <Icon className="h-5 w-5" aria-hidden="true" /> : null}
      {children ?? channel.label}
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
