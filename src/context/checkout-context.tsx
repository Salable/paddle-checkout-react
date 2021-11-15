import React, {FC, useEffect, useState} from 'react';
import usePaddle from '../hooks/use-paddle';
import {ICheckoutContext, IPaddleUserData} from '../interfaces';

const stub = (): never => {
    throw new Error('You forgot to wrap your component in <CheckoutProvider>.');
};

const CheckoutContext = React.createContext<ICheckoutContext>({
    environmentConfig: {
        vendor: 0,
        environment: '',
        eventCallback: stub,
    },
    paddle: null,
    targetComponent: '',
    selectedProductId: '',
    setSelectedProductId: stub,
    userData: null,
    setUserData: stub,
    checkoutConfig: null,
    passthroughData: {
        purchaserId: '',
        granteeId: '',
    },
});

const CheckoutProvider: FC<ICheckoutContext> = ({
    environmentConfig,
    checkoutConfig,
    passthroughData,
    targetComponent,
    children,
}) => {
    if (!environmentConfig) throw new Error('Must provide environmentConfig');
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
    const [userData, setUserData] = useState<IPaddleUserData>({sub: null});

    const {paddle} = usePaddle(environmentConfig!);

    useEffect(() => {
        if (!paddle || !selectedProductId) return;
        const {sub, ...user} = userData;
        let checkoutParams: any = {
            method: 'inline',
            product: selectedProductId,
            ...checkoutConfig,
            ...user,
        };
        if (passthroughData) {
            checkoutParams = {
                ...checkoutParams,
                passthrough: JSON.stringify(passthroughData),
            };
        }
        if (targetComponent) checkoutParams.frameTarget = targetComponent;
        paddle.Checkout.open(checkoutParams);
    }, [paddle, selectedProductId]);

    return (
        <CheckoutContext.Provider
            value={{
                paddle,
                selectedProductId,
                setSelectedProductId,
                userData,
                setUserData,
                passthroughData,
            }}
        >
            {children}
        </CheckoutContext.Provider>
    );
};

export {CheckoutProvider, CheckoutContext};
