import React, { useRef, useState, useCallback } from 'react';

interface MovingChainRowProps {
    children: React.ReactNode;
    speedSeconds?: number;
    speed?: number;
    direction?: 'left' | 'right';
    className?: string;
    itemClassName?: string;
}

export const MovingChainRow: React.FC<MovingChainRowProps> = ({
    children,
    speedSeconds = 120,
    speed,
    direction = 'left',
    className = '',
    itemClassName
}) => {
    const childrenArray = React.Children.toArray(children);
    if (childrenArray.length === 0) return null;

    const scrollRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Drag detection — only use grab cursor/behavior when actually dragging
    const isDragging = useRef(false);
    const dragStartX = useRef(0);
    const scrollStartLeft = useRef(0);
    const dragDistance = useRef(0);

    const onMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const el = scrollRef.current;
        if (!el) return;
        isDragging.current = true;
        dragStartX.current = e.clientX;
        dragDistance.current = 0;
        scrollStartLeft.current = el.scrollLeft;
        el.style.cursor = 'grabbing';
        el.style.userSelect = 'none';
    }, []);

    const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const el = scrollRef.current;
        if (!isDragging.current || !el) return;
        const dx = dragStartX.current - e.clientX;
        dragDistance.current = Math.abs(dx);
        el.scrollLeft = scrollStartLeft.current + dx;
    }, []);

    const onMouseUp = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return;
        isDragging.current = false;
        el.style.cursor = 'grab';
        el.style.userSelect = '';
    }, []);

    // Prevent click from firing after a drag
    const onClickCapture = useCallback((e: React.MouseEvent) => {
        if (dragDistance.current > 5) {
            e.stopPropagation();
            e.preventDefault();
        }
    }, []);

    // Quadruple children for seamless infinite loop
    const quadChildren = [...childrenArray, ...childrenArray, ...childrenArray, ...childrenArray];

    return (
        <div
            className={`relative overflow-hidden w-full py-3 group/row ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); isDragging.current = false; }}
        >
            {/* Edge fade masks */}
            <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-r from-[#F7FAFC] via-[#F7FAFC]/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-l from-[#F7FAFC] via-[#F7FAFC]/80 to-transparent z-10 pointer-events-none" />

            {/* Scrollable marquee track */}
            <div
                ref={scrollRef}
                className="overflow-x-auto no-scrollbar scroll-smooth"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch',
                    cursor: 'grab',
                }}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
                onClickCapture={onClickCapture}
            >
                <div
                    className={`flex items-stretch gap-6 w-max transform-gpu group-hover/row:[animation-play-state:paused] ${
                        direction === 'right' ? 'animate-marquee-reverse' : 'animate-marquee-slow'
                    }`}
                    style={{ animationDuration: `${speed ? Math.max(120, Math.round(5000 / speed)) : speedSeconds}s` }}
                >
                    {quadChildren.map((child, index) => (
                        <div
                            key={index}
                            className={itemClassName || "w-[270px] sm:w-[300px] shrink-0 transition-transform duration-300 transform-gpu hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg"}
                        >
                            {child}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
