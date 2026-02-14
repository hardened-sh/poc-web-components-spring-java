import { useEffect, useState, useMemo, useRef } from 'react';

import { ITaxCalculatorProps } from './TaxCalculator.types';
import styles from './TaxCalculator.css?inline'; 
import { currencyFormatter } from '../../utils';

export const TaxCalculator = ({ value = 0, rate = 0 }: ITaxCalculatorProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [dynamicValue, setDynamicValue] = useState<number | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  const baseValue = dynamicValue ?? (Number(value) || 0);

  const { taxAmount, finalPrice } = useMemo(() => {
    const numRate = Number(rate) || 0;
    const tax = baseValue * (numRate / 100);
    return {
      taxAmount: tax,
      finalPrice: baseValue + tax
    };
  }, [baseValue, rate]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.total != null) {
        setDynamicValue(detail.total);
      }
    };

    document.body.addEventListener('quote-updated', handler);
    return () => document.body.removeEventListener('quote-updated', handler);
  }, []);

  useEffect(() => {
    if (!elementRef.current) return;

    const event = new CustomEvent('tax-calculated', {
      detail: {
        baseValue,
        taxRate: rate,
        taxAmount,
        finalPrice,
        timestamp: new Date().toISOString()
      },
      bubbles: true,
      composed: true,
    });

    elementRef.current.dispatchEvent(event);
  }, [finalPrice, taxAmount, baseValue, rate]);

  return (
    <>
      <style>{styles}</style>
      <div className="tax-calculator" ref={elementRef}>
        <header className="tax-calculator__header">
          <h3 className="tax-calculator__title">Simulador de Impostos</h3>
          {isMounted && (
            <span className="tax-calculator__badge" aria-hidden="true">
              (React Component)
            </span>
          )}
        </header>
        
        <main className="tax-calculator__content">
          <DataRow label="Valor Base" value={currencyFormatter.format(baseValue)} />
          
          <DataRow 
            label={`Alíquota (${rate}%)`} 
            value={currencyFormatter.format(taxAmount)} 
            valueClassName="tax-calculator__value--tax"
          />
          
          <hr className="tax-calculator__divider" role="separator" />
          
          <DataRow 
            label="Preço Final" 
            value={currencyFormatter.format(finalPrice)} 
            rowClassName="tax-calculator__row--total"
            valueClassName="tax-calculator__value--final"
          />
        </main>
        
        <footer className="tax-calculator__footer">
          <small>Cálculo automático de impostos em tempo real</small>
        </footer>
      </div>
    </>
  );
};

const DataRow = ({ 
  label, 
  value, 
  rowClassName = "", 
  valueClassName = "" 
}: { 
  label: string; 
  value: string; 
  rowClassName?: string;
  valueClassName?: string;
}) => (
  <div className={`tax-calculator__row ${rowClassName}`}>
    <span className="tax-calculator__label">{label}:</span>
    <span className={`tax-calculator__value ${valueClassName}`}>{value}</span>
  </div>
);