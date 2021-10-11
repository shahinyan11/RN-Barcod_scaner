import {DispatchProps, PicklistOwnProps, Props} from './OrderDetailsProps';
import {NavigationStatePickItemDetails, State} from './State';
import React, {ReactElement} from 'react';
import styles from './styles';
import {
  dispatchHideProgressBarAction as hideProgressBar,
  dispatchShowProgressBarAction as showProgressBar,
} from '../../redux/Dispatchers';
import {OwnProps, StateProps} from '../ProductDetails/Props';
import {connect} from 'react-redux';
import {orderDetailsVMMapper} from './OrderDetailsVMMapper';
import ScreenContainer from '../../ScreenContainer';
import Header from '../../Header';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PickList from '../../data/picklist/PickList';
import getPickListApi from '../../data/picklist/GetPickList';
import getProductsFromApi from '../../data/product/GetProducts';
import Item from '../../data/picklist/Item';
import Product from '../../data/product/Product';
import Order from '../../data/order/Order';
import PickOrderItem from '../picklist/PickOrderItem';
import {
  NavigationStateHere,
  NavigationStateOrderDetails,
  NavigationStateType,
} from '../Orders/State';

class OrderDetails extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      pickList: null,
      error: null,
      pickListItems: [],
      navigationState: new NavigationStateHere(),
    };
    this.getPickList = this.getPickList.bind(this);
    this.renderPickOrderItemScreen = this.renderPickOrderItemScreen.bind(this);
    this.showOrderDetailsScreen = this.showOrderDetailsScreen.bind(this);
  }

  componentDidMount() {
    (async () => {
      console.debug('this.props.order.id::' + this.props.order.id);
      const items = await this.getPickList(this.props.order.id);
      // if (!pickList) {
      //   this.setState({
      //     error: "No Picklist found",
      //     pickList: pickList
      //   })
      //   // this.props.exit()
      //   // return
      // }

      if (items?.length == 0) {
        this.setState({
          pickList: null,
          error: 'No Picklist found',
          pickListItems: items,
        });
      } else {
        this.setState({
          pickList: null,
          error: null,
          pickListItems: items ? items : [],
        });
      }
    })();
  }

  // @ts-ignore
  async getPickList(id: string): Promise<Item[] | null> {
    try {
      return await getPickListApi(id);
    } catch (e) {}
  }

  render() {
    const vm = orderDetailsVMMapper(this.props, this.state);
    switch (this.state.navigationState.type) {
      case NavigationStateType.Here:
        return (
          <ScreenContainer>
            <Header
              title={vm.header}
              backButtonVisible={true}
              onBackButtonPress={this.props.exit}
            />
            <View style={styles.contentContainer}>
              <Text style={styles.name}>{vm.name}</Text>
              <FlatList
                data={this.state.pickListItems}
                renderItem={(item: ListRenderItemInfo<Item>) =>
                  renderPickListItem(item.item, () =>
                    this.onItemTapped(this.props.order, item.item),
                  )
                }
                keyExtractor={item => item.id}
                style={styles.list}
              />
            </View>
          </ScreenContainer>
        );
      case NavigationStateType.OrderDetails:
        const navigationStatePickItemDetails = this.state
          .navigationState as NavigationStatePickItemDetails;
        return this.renderPickOrderItemScreen(
          navigationStatePickItemDetails.order,
          navigationStatePickItemDetails.item,
        );
    }
  }

  renderPickOrderItemScreen(order: Order, item: Item) {
    return (
      <PickOrderItem
        order={order}
        pickListItem={item}
        exit={this.showOrderDetailsScreen}
      />
    );
  }

  showOrderDetailsScreen() {
    this.setState({
      navigationState: new NavigationStateHere(),
    });
  }

  onItemTapped(order: Order, item: Item) {
    this.setState({
      navigationState: new NavigationStatePickItemDetails(order, item),
    });
  }
}

function renderPickListItem(
  item: Item,
  onItemTapped: () => void,
): ReactElement {
  return (
    <TouchableOpacity
      style={styles.listItemContainer}
      onPress={() => onItemTapped()}>
      <View style={styles.row}>
        <View style={styles.col50}>
          <Text style={styles.label}>Product Code</Text>
          <Text style={styles.value}>{item.productCode}</Text>
        </View>
        <View style={styles.col50}>
          <Text style={styles.label}>Product Name</Text>
          <Text style={styles.value}>{item.product.name}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.col50}>
          <Text style={styles.label}>Lot</Text>
          <Text style={styles.value}>{item.lotNumber}</Text>
        </View>
        <View style={styles.col50}>
          <Text style={styles.label}>Expiry</Text>
          <Text style={styles.value}>{item.expirationDate}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.col50}>
          <Text style={styles.label}>Qty Required</Text>
          <Text style={styles.value}>{item.quantityRequired}</Text>
        </View>
        <View style={styles.col50}>
          <Text style={styles.label}>Qty Picked</Text>
          <Text style={styles.value}>{item.quantityPicked}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const mapDispatchToProps: DispatchProps = {
  showProgressBar,
  hideProgressBar,
};

export default connect(null, mapDispatchToProps)(OrderDetails);
