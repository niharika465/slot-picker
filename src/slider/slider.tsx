import React, { useEffect, useId, useRef, useState } from 'react';
import classNames from 'classnames';

import './slider.scss';

import { DateInfo } from 'types';

import { grey } from '@mui/material/colors';

import Icons from '../icons/icons';

// defined the type of props , this component will be getting
type SliderProps = {
  cards: DateInfo[];
  setSelectedSlot: (slot: string) => void;
  heading: string;
  selectedSlot: string;
};

const Slider: React.FC<SliderProps> = ({
  cards,
  setSelectedSlot,
  heading,
  selectedSlot,
}) => {
  const [isScrollAtInitial, setIsScrollAtInitial] = useState<boolean>(false); // this state will hold true if the cards have not been scrolled at all
  const [isScrollAtLast, setIsScrollAtLast] = useState<boolean>(false); // this state will hold true if the cards have been scrolled to the last
  const [lastVisibleIndex, setLastVisibleIndex] = useState<number | null>(null); // to store the last fully visible card index

  const cardsRef = useRef<(HTMLDivElement | null)[]>([]); // will store references to each card's DOM element
  const observer = useRef<IntersectionObserver | null>(null); // will help detect when cards are visible in the viewport
  const containerRef = useRef<HTMLDivElement | null>(null); //  this will allow us to reference the scrollable container

  const updateScrollPositionDetails = () => {
    // this will be update based on weather the scroll bar has been touched

    let index: number | null = null;
    const containerRect = containerRef.current?.getBoundingClientRect();
    // initialize index to null and get the bounding rectangle of the container to know its position
    cardsRef.current.forEach((card, i) => {
      // loop through the cards stored in cardsRef
      if (card) {
        const rect = card.getBoundingClientRect();
        const isFullyVisible =
          rect.left >= (containerRect?.left || 0) &&
          rect.right <= (containerRect?.right || 0);
        // if the card is fully visible by checking if its left and right edges are within the container's edges
        if (isFullyVisible) {
          index = i; // Update last visible index
        }
      }
    });
    setLastVisibleIndex(index);
    const { scrollLeft, scrollWidth, clientWidth } =
      containerRef.current as HTMLDivElement;
    setIsScrollAtInitial(containerRef.current?.scrollLeft === 0);
    setIsScrollAtLast(scrollLeft + clientWidth >= scrollWidth);
  };

  //   Intersection Observer will monitor the visibility of the cards as they enter or exit the viewport.
  useEffect(() => {
    // This hook runs when the component mounts and when cards changes.
    observer.current = new IntersectionObserver(
      () => {
        // will call updateScrollPositionDetails when it detects changes in visibility
        updateScrollPositionDetails();
      },
      { threshold: 1.0 }
      // threshold: 1.0 means it will trigger when 100% of the card is visible
    );

    cardsRef.current.forEach((card) => {
      if (card) {
        observer.current?.observe(card);
      }
      //  the observer will watch all the cards
    });

    return () => {
      // When the component will unmount, we will stop observing each card to prevent memory leaks
      cardsRef.current.forEach((card) => {
        if (card) {
          observer.current?.unobserve(card);
        }
      });
    };
  }, [cards]);

  useEffect(() => {
    const handleResize = () => {
      // this will re-observes the cards whenever the window resizes
      cardsRef.current.forEach((card) => {
        if (card) {
          observer.current?.unobserve(card);
          observer.current?.observe(card);
        }
      });
    };
    // resize event listener to the window
    window.addEventListener('resize', handleResize);

    return () => {
      // remove the event listener when the component unmounts
      window.removeEventListener('resize', handleResize);
    };
  }, [cards]);

  useEffect(() => {
    const handleScroll = () => {
      // this will the scroll states , whenever user scrolls through the cards
      updateScrollPositionDetails();
    };

    containerRef.current?.addEventListener('scroll', handleScroll);
    // scroll event listener to the scrollable container

    return () => {
      containerRef.current?.removeEventListener('scroll', handleScroll);
      // remove the scroll event listener when the component unmounts
    };
  }, [cards]);

  const scrollToCard = (direction: 'next' | 'prev') => {
    // this will allow to scroll to the next or previous card based on the direction provided.
    if (containerRef.current) {
      // width of the first card
      const cardWidth = cardsRef.current[0]?.offsetWidth || 0;
      // current scroll position
      const currentScroll = containerRef.current.scrollLeft;
      const newScrollPosition =
        direction === 'next'
          ? currentScroll + cardWidth
          : currentScroll - cardWidth;
      // scroll smoothly to the updated scroll position
      containerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div>
      <div className="heading">{heading}</div>
      <div className="slider">
        <div
          className={classNames('navigation-btn', {
            'navigation-btn--disabled': isScrollAtInitial,
          })}
          onClick={() => {
            if (!isScrollAtInitial) scrollToCard('prev');
          }}
        >
          <Icons.backIcon
            sx={{
              color: grey[500],
              marginTop: '8px',
            }}
          />
        </div>

        <div className="slide-container" ref={containerRef}>
          {cards.map(({ day, weekday, date }, i) => (
            <div
              key={useId()}
              className={classNames('slide-item', {
                'slide-item--selected': selectedSlot === date,
              })}
              ref={(el) => (cardsRef.current[i] = el)}
              onClick={() => setSelectedSlot(date)}
            >
              <div
                className={classNames({
                  'slide-item__date': selectedSlot === date,
                })}
              >
                {day}
              </div>
              <div className="slide-item__day">{weekday}</div>
            </div>
          ))}
        </div>

        <div
          className={classNames('navigation-btn', {
            'navigation-btn--disabled':
              lastVisibleIndex === cards.length - 1 || isScrollAtLast,
          })}
          onClick={() => {
            if (lastVisibleIndex !== cards.length - 1 || isScrollAtLast)
              scrollToCard('next');
          }}
        >
          <Icons.forwardIcon
            sx={{
              color: grey[500],
              marginTop: '8px',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Slider;
