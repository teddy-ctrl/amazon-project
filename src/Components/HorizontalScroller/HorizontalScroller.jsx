import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styles from './HorizontalScroller.module.css'; // We'll create this next

const HorizontalScroller = ({ title, items, renderItem }) => {
    const scrollRef = useRef(null);
    const [showPrev, setShowPrev] = useState(false);
    const [showNext, setShowNext] = useState(true);

    const handleScroll = useCallback(() => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setShowPrev(scrollLeft > 5); // Add a small buffer
        setShowNext(scrollLeft < scrollWidth - clientWidth - 5);
    }, []);

    const scroll = (scrollOffset) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const scrollElement = scrollRef.current;
        if (scrollElement) {
            scrollElement.addEventListener('scroll', handleScroll, { passive: true });
            handleScroll(); // Initial check

            // Use ResizeObserver to re-check when window size changes
            const resizeObserver = new ResizeObserver(handleScroll);
            resizeObserver.observe(scrollElement);

            return () => {
                scrollElement.removeEventListener('scroll', handleScroll);
                resizeObserver.unobserve(scrollElement);
            };
        }
    }, [items, handleScroll]);

    if (!items || items.length === 0) {
        return null; // Don't render if there are no items
    }

    return (
        <section className={`${styles.scrollerSection} ${styles.spacing}`}>
            <div className={styles.header}>
                <h2 className={styles.title}>{title}</h2>
                <Link to="/deals" className={styles.seeAllLink}>See all deals</Link>
            </div>
            <div className={styles.scrollerContainer}>
                {showPrev && (
                    <button
                        className={`${styles.scrollButton} ${styles.prevButton}`}
                        onClick={() => scroll(-500)}
                        aria-label="Previous items"
                    >
                        ❮
                    </button>
                )}
                <div className={styles.scrollArea} ref={scrollRef}>
                    {items.map((item, index) => renderItem(item, index))}
                </div>
                {showNext && (
                    <button
                        className={`${styles.scrollButton} ${styles.nextButton}`}
                        onClick={() => scroll(500)}
                        aria-label="Next items"
                    >
                        ❯
                    </button>
                )}
            </div>
        </section>
    );
};

export default HorizontalScroller;