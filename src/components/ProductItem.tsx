'use client';

import { useRef, useState } from 'react';
import type { Product } from '@/types/products';
import Image from 'next/image';
import affirmIcon from '@/assets/images/icon-affirm.svg';
import dayjs from 'dayjs';

type ProductItemProps = {
  product: Product;
  onDragMove: (newX: number) => void;
};

const typeTexts: Record<
  Product['type'],
  {
    badge: string;
    shippingDesc: string;
    dateFormat: string;
    purchaseButton: string;
  }
> = {
  prebuilt: {
    badge: 'Prebuilt',
    shippingDesc: 'Delivery By ',
    dateFormat: 'dddd, MMM d',
    purchaseButton: 'Buy Now',
  },
  custom: {
    badge: 'Custom',
    shippingDesc: 'Estimate Ship By ',
    dateFormat: 'MM/DD/YYYY',
    purchaseButton: 'Custom',
  },
};

export function ProductItem({ product, onDragMove }: ProductItemProps) {
  const [isDragging, setIsDragging] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  const discount = product.officialPrice - product.salePrice;

  const texts = typeTexts[product.type];

  return (
    <div
      className="w-full rounded-[15px] shadow-[0_0_20px_#00000029]"
      ref={itemRef}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={(e) => {
        if (isDragging) {
          console.log({ e });
          onDragMove(e.movementX);
        }
      }}
    >
      <div className="px-5 pb-3 pt-4">
        <p className="w-fit rounded-e-full rounded-s-full border border-solid border-ib-gray px-[10px] py-[5px] text-[8px] leading-[1] text-ib-gray">{`${texts.badge} PC`}</p>
        <img
          src={product.img}
          alt={product.name}
          width={172}
          height={172}
          className="mx-auto mb-4"
        />
        <p className="mb-7 font-bold">{product.name}</p>
        {product.specs.map((spec) => (
          <p key={spec} className="mb-3 text-xs">
            {spec}
          </p>
        ))}
      </div>
      <div className="bg-[#F2F6FA] px-5 pb-4 pt-[8px]">
        <p className="mb-[6px] h-[23px] w-fit rounded-e-full rounded-s-full bg-ib-red px-2 text-[10px] leading-[23px] text-white">{`SAVE $${discount.toLocaleString()}`}</p>
        <p className="mb-[6px] text-xl font-bold leading-[22px]">
          {`$${product.salePrice.toLocaleString()}`}
          <span className="ml-3 text-xs font-normal leading-[13px] text-ib-gray line-through">
            {`$${product.officialPrice.toLocaleString()}`}
          </span>
        </p>
        <div className="mb-3 flex items-center">
          <p className="text-xs">
            Starting at
            <a className="text-[#004CFF]">{` $${product.installmentPrice.toLocaleString()}/mo `}</a>
            with
          </p>
          <img
            src={affirmIcon}
            alt="Affirm"
            width={53}
            className="h-[13px] w-[45px] object-cover"
          />
        </div>
        <div className="flex justify-between py-[10px]">
          <div className="flex flex-col justify-between">
            <p className="text-xs font-bold">Free Shipping</p>
            <p className="text-xs">{`${texts.shippingDesc}${dayjs(
              product.shippingDate,
            ).format(texts.dateFormat)}`}</p>
          </div>
          <button className="h-[35px] w-[102px] rounded-e-full rounded-s-full border border-solid border-ib-red text-sm text-ib-red">
            {texts.purchaseButton}
          </button>
        </div>
      </div>
    </div>
  );
}
