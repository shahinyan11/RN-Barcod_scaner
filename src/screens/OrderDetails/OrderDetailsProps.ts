import PickList from '../../data/picklist/PickList';
import {Order} from '../../data/order/Order';
import Item from '../../data/picklist/Item';
import {getPickListAction} from '../../redux/actions/orders';

export interface PicklistOwnProps {
  exit: () => void;
  pickList: PickList | null;
  order: Order;
  pickListItem: Item[] | [];
}

export interface StateProps {
  //no-op
}

export interface DispatchProps {
  showScreenLoading: (message?: string) => void;
  hideScreenLoading: () => void;
  getPickListAction: (id: any, callback: () => void) => void;
}

export type Props = PicklistOwnProps & StateProps & DispatchProps;
