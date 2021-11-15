# @salable/paddle-checkout-react

## Table of Contents

-   [Installation](#Installation)
-   [Getting Started](#Getting-Started)
-   [License](#License)

## Installation

Using [npm](https://www.npmjs.com/)

```bash
 npm install @salable/paddle-checkout-react
```

## Getting Started

Configure your SDK by wrapping your application in `CheckoutProvider`:

```js
// src/index.js
Import React from 'react';
import ReactDOM from 'react-dom';
import { CheckoutProvider } from '@salable/paddle-checkout-react';
import App from './App';

const paddleComponentId = 'paddle-wrapper'

ReactDOM.render(
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
      <App />
    </CheckoutProvider>,
    document.getElementById('app')
)
```

```js
// src/components/[x].js
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
        Pro <button onClick={handleBuy(paddlePlanId)}>Buy</button>
      </p>
      <p>
        Lite <button onClick={handleBuy(paddlePlanId)}>Buy</button>
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
```

## License

This project is licensed under the MIT license. See the [LICENSE](https://github.com/joshokoro/paddle-checkout-react//blob/main/LICENSE) file for more info.
