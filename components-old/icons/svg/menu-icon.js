export default function MenuIcon({ onClick, className, size }) {
    return (
        <div className={className} onClick={onClick}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={size || "24"}
                height={size || "24"}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
        </div>
    );
}
