interface HamburgerButtonProps {
    isOpen: boolean;
    onClick: () => void;
}

export default function HamburgerButton({ isOpen, onClick }: HamburgerButtonProps) {
    return (
        <button
            onClick={onClick}
            className="inline-flex items-center justify-center p-2 rounded-md text-foreground/90 hover:text-foreground cursor-pointer"
            aria-label="Toggle menu">
            <div className="relative w-5 h-5 flex items-center justify-center">
                <span
                    className={`absolute h-[2px] w-5 bg-current transform transition-all duration-300 ease-in-out ${
                        isOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'
                    }`}/>
                <span
                    className={`absolute h-[2px] w-5 bg-current transform transition-all duration-300 ease-in-out ${
                        isOpen ? 'opacity-0' : 'opacity-100'
                    }`}/>
                <span
                    className={`absolute h-[2px] w-5 bg-current transform transition-all duration-300 ease-in-out ${
                        isOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'
                    }`}/>
            </div>
        </button>
    );
}