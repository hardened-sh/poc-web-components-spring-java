import { TaxCalculator } from '../components';
import './CheckoutPage.styles.css';

export const CheckoutPage = () => {
  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <span className="checkout-badge">PÁGINA REACT PURA</span>
        
        <h1 className="checkout-title">Checkout Moderno</h1>
        
        <p className="checkout-description">
          Aqui o componente roda nativamente, sem Shadow DOM ou Wrappers.
        </p>
        
        <div className="checkout-calculator">
          <TaxCalculator value={10000} rate={15} />
        </div>

        <div className="checkout-info-box">
           <strong className="checkout-info-title">Vantagem da Estratégia:</strong><br/>
           <span className="checkout-info-text">O código React (<code>TaxCalculator.tsx</code>) é importado diretamente pelo <code>CheckoutPage.tsx</code>.</span>
        </div>
        
        <a href="/produto/1" className="checkout-back-link">
            ← Voltar para Página Legado
        </a>
      </div>
    </div>
  );
};

