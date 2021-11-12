import { FC, useEffect } from 'react';

import { CheckoutProvider, useCheckout } from '@adaptavist-commerce/paddle-checkout-lib';

const paddleComponentId = 'paddle-wrapper';

const App = () => {
  return (
    <CheckoutProvider
      passthroughData={{ purchaserId: '', granteeId: '' }}
      setPassthroughData={() => {}}
      environmentConfig={{
        vendor: 752,
        environment: 'sandbox',
        eventCallback: (data) => {
          switch (data.event) {
            case 'Checkout.Complete':
              console.log(data.eventData);
              break;
            case 'Checkout.Close':
              console.log(data.eventData);
              break;
          }
        },
      }}
      checkoutConfig={{
        frameInitialHeight: 416,
        frameStyle: 'width:100%; min-width:312px; background-color: transparent; border: none;',
      }}
      targetComponent={paddleComponentId}
    >
      <ProductsDemo />
    </CheckoutProvider>
  );
};

const ProductsDemo = () => {
  const { paddle, selectedProductId, setSelectedProductId } = useCheckout();

  useEffect(() => {}, [paddle, selectedProductId]);

  const handleBuy = (id: string) => () => {
    setSelectedProductId!(id);
  };

  const handleCancel = () => {
    setSelectedProductId!(null);
  };

  return (
    <>
      <h2>Products</h2>
      <p>
        PC4J Cloud Pro <button onClick={handleBuy('7528')}>Buy</button>
      </p>
      <p>
        PC4J Cloud Lite <button onClick={handleBuy('7527')}>Buy</button>
      </p>
      {selectedProductId ? <StoreDemo handleCancel={handleCancel} /> : null}
    </>
  );
};

const StoreDemo: FC<{ handleCancel: () => void }> = ({ handleCancel }) => {
  return (
    <div>
      <div className={paddleComponentId} />
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default App;
