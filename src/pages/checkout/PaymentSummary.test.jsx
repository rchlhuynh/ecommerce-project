import { it, expect, describe, vi, beforeEach } from 'vitest';
import { PaymentSummary } from './PaymentSummary';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router'; 


describe('PaymentSummary component', () => {
  let loadCart;
  let paymentSummary;

    beforeEach(() => {
      paymentSummary =  {
        totalItems: 3,
        productCostCents: 5280,
        shippingCostCents: 0,
        totalCostBeforeTaxCents: 5280,
        taxCents: 528,
        totalCostCents: 5808
      };
      loadCart = vi.fn();
    })
      

      beforeEach(() => {
        loadCart = vi.fn();
      })
    

  it('displays the correct details', async () => {
    render(
      <MemoryRouter>
        <PaymentSummary loadCart={loadCart} 
        paymentSummary={paymentSummary} />
    </MemoryRouter>
    );
    // 1.within() + getByText() + toBeInTheDocument()
    // 2. getByTestId() + toHaveTextContent()
    const paymentSummaryShippingCost = screen.getByTestId('payment-summary-shipping-cost');
    const paymentSummarySubtotalCost = screen.getByTestId(
      'payment-summary-subtotal-cost'
    );
    const paymentSummaryTaxCost = screen.getByTestId(
      'payment-summary-tax-cost'
    );
    const paymentSummaryTotalCost = screen.getByTestId(
      'payment-summary-total-cost'
    )
    expect(
      screen.getByText('Items (3):')
    ).toBeInTheDocument();

    expect(
      within(screen.getByTestId('payment-summary-product-cost'))
        .getByText('$52.80')
    ).toBeInTheDocument();

    expect(
      await paymentSummaryShippingCost
    ).toHaveTextContent('$0.00');

    expect(
      await paymentSummarySubtotalCost
    ).toHaveTextContent('$52.80')

    expect(
      await paymentSummaryTaxCost
    ).toHaveTextContent('$5.28');

    expect(
      await paymentSummaryTotalCost
    ).toHaveTextContent('$58.08')
  })
})
