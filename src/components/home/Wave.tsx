import "@/styles/Wave.css";

export default function Wave() {
    return <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="198"
        viewBox="0 0 1600 198"
        preserveAspectRatio="none"
        style={{position: 'absolute', bottom: 0, left: 0, zIndex: 0}}
    >
        <defs>
            <linearGradient id="gradient1" x1="50%" x2="50%" y1="-10.959%" y2="100%">
                <stop offset="0%" stopColor="#57BBC1" stopOpacity=".25"/>
                <stop offset="100%" stopColor="#015871"/>
            </linearGradient>
            <linearGradient id="gradient2" x1="50%" x2="50%" y1="-10.959%" y2="100%">
                <stop offset="0%" stopColor="#57BBC1" stopOpacity=".1"/>
                <stop offset="100%" stopColor="#015871" stopOpacity=".5"/>
            </linearGradient>
        </defs>
        {/* First wave group */}
        <g className="wave-group wave-group-1">
            <g transform="matrix(-1 0 0 1 1600 0)">
                <path fill="url(#gradient1)" fillRule="evenodd"
                      d="M.005 121C311 121 409.898-.25 811 0c400 0 500 121 789 121v77H0s.005-48 .005-77z"/>
            </g>
            <g transform="matrix(-1 0 0 1 3200 0)">
                <path fill="url(#gradient1)" fillRule="evenodd"
                      d="M.005 121C311 121 409.898-.25 811 0c400 0 500 121 789 121v77H0s.005-48 .005-77z"/>
            </g>
        </g>
        {/* Second wave group */}
        <g className="wave-group wave-group-2">
            <g transform="matrix(-1 0 0 1 1600 0)">
                <path fill="url(#gradient2)" fillRule="evenodd"
                      d="M.005 121C311 121 409.898-.25 811 0c400 0 500 121 789 121v77H0s.005-48 .005-77z"/>
            </g>
            <g transform="matrix(-1 0 0 1 3200 0)">
                <path fill="url(#gradient2)" fillRule="evenodd"
                      d="M.005 121C311 121 409.898-.25 811 0c400 0 500 121 789 121v77H0s.005-48 .005-77z"/>
            </g>
        </g>
    </svg>;
}