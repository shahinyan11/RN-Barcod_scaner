export interface OwnProps {
  exit: () => void;
  navigation: any;
}

export interface StateProps {
  products: any;
}

export interface DispatchProps {
  showProgressBar: (message?: string) => void;
  hideProgressBar: () => void;
  getProductsAction: () => void;
}

export type Props = OwnProps & StateProps & DispatchProps;
