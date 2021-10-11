import Order from '../../data/order/Order';

export interface OwnProps {
  exit: () => void;
  navigation: any;
}

export interface StateProps {
  //no-op
}

export interface DispatchProps {}

export type Props = OwnProps & StateProps & DispatchProps;

export interface State {
  error: string | null;
  allOrders: Order[] | null;
}
