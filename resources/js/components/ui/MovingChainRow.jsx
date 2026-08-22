import React, { useRef, useState } from 'react';

export const MovingChainRow = ({
    children,
    speedSeconds = 320,
    className = ''
}) => {
    if (!children || children.length === 0) return null;

    const scrollRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    // Quadruple children array to guarantee 100% seamless infinite loop without empty space
    const quadChildren = [...children, ...children, ...children, ...children];

    return (
        <div 
            className={`relative overflow-hidden w-full py-3 group/row ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Gradient Mask Edge Fades */}
            <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-r from-[#F7FAFC] via-[#F7FAFC]/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-l from-[#F7FAFC] via-[#F7FAFC]/80 to-transparent z-10 pointer-events-none" />

            {/* Hardware-Accelerated Infinite Seamless Loop Container */}
            <div 
                ref={scrollRef}
                className="overflow-x-auto no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch'
                }}
            >
                <div 
                    className="flex items-stretch gap-5 w-max animate-marquee-slow transform-gpu group-hover/row:[animation-play-state:paused]"
                    style={{ animationDuration: `${speedSeconds}s` }}
                >
                    {quadChildren.map((child, index) => (
                        <div 
                            key={index} 
                            className="shrink-0 transition-transform duration-300 transform-gpu hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg flex flex-col"
                        >
                            {child}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
