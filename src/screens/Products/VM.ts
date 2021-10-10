import Product from '../../data/product/Product';
import {NavigationState} from './State';

export interface VM {
  barcodeNo: string;
  subtitle: string;
  searchBoxVisible: boolean;
  searchBoxProductCodeVisible: boolean;
  categoryPickerPopupVisible: boolean;
  list: Product[] | null;
  floatingActionButtonVisible: boolean;
  centralErrorMessage: string | null;
  navigationState: NavigationState;
}
