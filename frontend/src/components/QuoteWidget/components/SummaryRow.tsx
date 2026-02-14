export const SummaryRow = ({ label, value, className = "" }: { label: string, value: string, className?: string }) => (
  <div className={`quote-widget__row ${className}`}>
    <span>{label}:</span>
    <span>{value}</span>
  </div>
);