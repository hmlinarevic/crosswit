type IconProps = {
  className?: string
  size: number
}

function IconCheck({ className, size }: IconProps) {
  return (
    <span className={className}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="inherit"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </span>
  )
}

export default IconCheck
