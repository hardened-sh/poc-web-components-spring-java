import { ComponentType } from 'react';
import r2wc from '@r2wc/react-to-web-component';
import { QuoteWidget, R2WCErrorBoundary, TaxCalculator } from './components';


import themeStyles from './theme/shadow-theme.css?inline';

const withTheme = <P extends object>(Component: ComponentType<P>) => (props: P) => (
  <R2WCErrorBoundary>
    <style>{themeStyles}</style>
    <Component {...props} />
  </R2WCErrorBoundary>
);

customElements.define('tax-widget', r2wc(withTheme(TaxCalculator), {
  props: {
    value: 'number',
    rate: 'number',
  },
  shadow: 'open',
}));

customElements.define('quote-widget', r2wc(withTheme(QuoteWidget), {
  props: {
    productName: 'string',
    basePrice: 'number',
  },
  shadow: 'open',
}));
