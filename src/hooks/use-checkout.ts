import {useContext} from "react";
import {CheckoutContext} from "../context/checkout-context";
import {ICheckoutContext} from "../interfaces";

const useCheckout = (): ICheckoutContext => useContext(CheckoutContext) as ICheckoutContext;

export default useCheckout;
