import clsx from "clsx"

function Button({ className: propClasses, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "block h-[30px] min-w-[96px] rounded bg-opacity-10 font-roboto text-sm tracking-wide hover:font-bold",
        propClasses
      )}
    >
      {children}
    </button>
  )
}

export default Button
