import {CheckoutProvider,
  CheckoutContext,
  useCheckout,
  usePaddle} from ".";

describe('Sanity Check', () => {
  it('is truthy', () => {
    expect(CheckoutProvider).toBeTruthy();
    expect(CheckoutContext).toBeTruthy();
    expect(useCheckout).toBeTruthy();
    expect(usePaddle).toBeTruthy();
  })
})
