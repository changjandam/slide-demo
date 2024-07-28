'use client';

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import type { Products } from '@/types/products';
import { ProductItem } from './ProductItem';

type ProductCarouselProps = {
  products: Products;
};

export function ProductCarousel({ products }: ProductCarouselProps) {
  const [disableLeft, setDisableLeft] = useState(true);
  const [disableRight, setDisableRight] = useState(false);

  const carouselRef = useRef<HTMLDivElement>(null);

  console.log(carouselRef.current);

  useEffect(() => {
    const handleResize = () => {
      console.log('resize');
      if (!carouselRef.current) return;

      const container = carouselRef.current;
      const containerScrollPosition = container.scrollLeft;
      const containerWidth = container.clientWidth;
      const scrollWidth = container.scrollWidth;

      if (containerScrollPosition === 0) {
        setDisableLeft(true);
      } else {
        setDisableLeft(false);
      }

      if (containerScrollPosition + containerWidth >= scrollWidth) {
        setDisableRight(true);
      } else {
        setDisableRight(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const checkPosition = (position: number) => {
    if (!carouselRef.current) return;

    const container = carouselRef.current;
    const containerWidth = container.clientWidth;
    const scrollWidth = container.scrollWidth;
    if (position <= 0) {
      setDisableLeft(true);
    } else {
      setDisableLeft(false);
    }
    if (position >= scrollWidth - containerWidth) {
      setDisableRight(true);
    } else {
      setDisableRight(false);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;

    const scrollAmount = 375;
    const container = carouselRef.current;
    const containerScrollPosition = container.scrollLeft;
    const containerWidth = container.clientWidth;
    const scrollWidth = container.scrollWidth;

    let newPosition = 0;

    if (direction === 'left') {
      newPosition = containerScrollPosition - scrollAmount;

      container.scrollTo({
        top: 0,
        left: newPosition < 0 ? 0 : newPosition,
        behavior: 'smooth',
      });
    } else {
      newPosition = containerScrollPosition + scrollAmount;
      container.scrollTo({
        top: 0,
        left:
          newPosition > scrollWidth - containerWidth
            ? scrollWidth
            : newPosition,
        behavior: 'smooth',
      });
    }
    checkPosition(newPosition);
  };

  return (
    <div className="w-full max-w-[1500px]">
      <div className="flex justify-end gap-2 p-5 lg:flex">
        <button
          className="aspect-square w-[45px] text-[22px] shadow-[0_0_6px_#00000029] disabled:opacity-50"
          onClick={() => scroll('left')}
          disabled={disableLeft}
        >
          {'<'}
        </button>
        <button
          className="aspect-square w-[45px] text-[22px] shadow-[0_0_6px_#00000029] disabled:opacity-50"
          onClick={() => scroll('right')}
          disabled={disableRight}
        >
          {'>'}
        </button>
      </div>
      <div
        className="flex w-full snap-x snap-mandatory overflow-auto"
        ref={carouselRef}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-full max-w-[375px] shrink-0 cursor-grabbing snap-start snap-always p-5"
          >
            <ProductItem
              product={product}
              onDragMove={(newX) => {
                if (!carouselRef.current) return;
                console.log({ newX, current: carouselRef.current.scrollLeft });
                const container = carouselRef.current;
                const newPosition = container.scrollLeft - newX;
                container.scrollTo({
                  top: 0,
                  left: newPosition,
                  behavior: 'smooth',
                });
                console.log({ newPosition });
                checkPosition(newPosition);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
