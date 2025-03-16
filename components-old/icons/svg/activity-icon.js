export default function ActivityIcon({ size, className }) {
    return (
        <div className={className}>
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
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
        </div>
    );
}
