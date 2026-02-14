import { IQuoteWidgetProps } from './QuoteWidget.types';
import { useQuote } from './hooks';
import { SummaryRow } from './components';
import { formatCurrency } from '../../utils';
import styles from './QuoteWidget.styles.css?inline';

export const QuoteWidget = ({ productName, basePrice }: IQuoteWidgetProps) => {
  const { quantity, discount, subtotal, discountAmount, total, updateQuantity, setContainerRef } = useQuote(basePrice);

  return (
    <>
      <style>{styles}</style>
      <div className="quote-widget" ref={setContainerRef} role="region" aria-label="Calculadora de Cotação">
        <header className="quote-widget__header">
          <h4 className="quote-widget__title">📋 Cotação Rápida</h4>
        </header>

        <section className="quote-widget__product">
          <strong>{productName}</strong>
          <span className="quote-widget__price">{formatCurrency(basePrice)}</span>
        </section>

      <div className="quote-widget__quantity">
        <label htmlFor="qty">Quantidade:</label>
        <div className="quote-widget__quantity-control">
          <button onClick={() => updateQuantity(quantity - 1)} disabled={quantity <= 1}>-</button>
          <input
            id="qty"
            type="number"
            value={quantity}
            onChange={(e) => updateQuantity(parseInt(e.target.value) || 1)}
          />
          <button onClick={() => updateQuantity(quantity + 1)} disabled={quantity >= 999}>+</button>
        </div>
      </div>

      {discount > 0 && (
        <div className="quote-widget__discount" role="alert">
          Desconto de {discount}% aplicado!
        </div>
      )}

      <footer className="quote-widget__summary">
        <SummaryRow label="Subtotal" value={formatCurrency(subtotal)} />
        {discount > 0 && (
          <SummaryRow 
            label={`Desconto (${discount}%)`} 
            value={`- ${formatCurrency(discountAmount)}`} 
            className="quote-widget__row--discount" 
          />
        )}
        <SummaryRow label="Total" value={formatCurrency(total)} className="quote-widget__row--total" />
        
        <button className="quote-widget__button">Solicitar Cotação</button>
      </footer>
    </div>
    </>
  );
};