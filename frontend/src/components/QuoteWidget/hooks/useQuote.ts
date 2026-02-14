import { useState, useMemo, useEffect, useRef } from 'react';

const DISCOUNT_RULES = [
  { threshold: 10, percentage: 15 },
  { threshold: 5, percentage: 10 },
  { threshold: 3, percentage: 5 },
];

export const useQuote = (basePrice: number) => {
  const [quantity, setQuantity] = useState<number>(1);

  const discount = useMemo(() => {
    const rule = DISCOUNT_RULES.find(r => quantity >= r.threshold);
    return rule ? rule.percentage : 0;
  }, [quantity]);

  const totals = useMemo(() => {
    const subtotal = basePrice * quantity;
    const discountAmount = subtotal * (discount / 100);
    return {
      subtotal,
      discountAmount,
      total: subtotal - discountAmount
    };
  }, [basePrice, quantity, discount]);

  const containerRef = useRef<HTMLElement | null>(null);

  const setContainerRef = (el: HTMLElement | null) => {
    containerRef.current = el;
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const event = new CustomEvent('quote-updated', {
      detail: {
        total: totals.total,
        quantity,
        discount,
        subtotal: totals.subtotal,
      },
      bubbles: true,
      composed: true,
    });

    containerRef.current.dispatchEvent(event);
  }, [totals.total, quantity, discount, totals.subtotal]);

  const updateQuantity = (val: number) => {
    const sanitized = Math.max(1, Math.min(val, 999));
    setQuantity(sanitized);
  };

  return { quantity, discount, ...totals, updateQuantity, setContainerRef };
};