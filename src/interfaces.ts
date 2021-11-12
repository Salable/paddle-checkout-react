import { Dispatch, SetStateAction } from 'react';

export interface ICheckoutContext {
  environmentConfig?: {
    vendor: number;
    environment?: string;
    eventCallback?: (data: any) => void;
  };
  paddle?: any;
  targetComponent?: string;
  selectedProductId?: string | null;
  setSelectedProductId?: Dispatch<SetStateAction<string | null>>;
  userData?: any;
  setUserData?: Dispatch<SetStateAction<IPaddleUserData>>;
  checkoutConfig?: any;
  passthroughData: IPassthroughData;
  setPassthroughData: Dispatch<SetStateAction<IPassthroughData>>;
}

export interface IPaddleUserData {
  sub: string | null;
  email?: string;
  country?: string;
  postcode?: string;
}

export interface IPassthroughData {
  granteeId: string;
  purchaserId: string;
  [x: string]: string;
}
