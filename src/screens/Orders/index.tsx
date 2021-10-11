import React from 'react';
import styles from './styles';
import {connect} from 'react-redux';
import {View} from 'react-native';
import showPopup from '../../components/Popup';
import getOrdersFromApi from '../../data/order/GetOrders';
import {DispatchProps, State, Props} from './Types';
import OrdersList from './OrdersList';
import Order from '../../data/order/Order';
import CentralMessage from '../products/CentralMessage';
import Header from '../../components/Header';
import OrderDetails from '../order_details/OrderDetails';

class Index extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      error: null,
      allOrders: null,
    };
  }

  componentDidMount() {
    (async () => {
      const products = await this.getOrders();
      if (!products) {
        this.props.exit();
        return;
      }

      if (products.length == 0) {
        this.setState({
          error: 'No products found',
          allOrders: products,
        });
      } else {
        this.setState({
          error: null,
          allOrders: products,
        });
      }
    })();
  }

  getOrders = async (): Promise<Order[] | null> => {
    try {
      this.props.showProgressBar('Fetching products');
      return await getOrdersFromApi();
    } catch (e) {
      const title = e.message ? 'Failed to fetch products' : null;
      const message = e.message ?? 'Failed to fetch products';
      const shouldRetry = await showPopup({
        title: title,
        message: message,
        positiveButtonText: 'Retry',
        negativeButtonText: 'Cancel',
      });
      if (shouldRetry) {
        return await this.getOrders();
      } else {
        return Promise.resolve(null);
      }
    } finally {
      this.props.hideProgressBar();
    }
  };

  onBackButtonPress = () => {
    this.props.exit();
  };

  renderOrderDetailsScreen = (order: Order) => {
    return (
      <OrderDetails
        order={order}
        pickList={null}
        exit={this.props.navigation}
      />
    );
  };

  showOrdersScreen = () => {
    this.setState({
      navigationState: new NavigationStateHere(),
    });
  };
  };

  // render() {
  //   const vm = this.state;
  //   switch (this.state.navigationState.type) {
  //     case NavigationStateType.Here:
  //       return this.renderContent();
  //     case NavigationStateType.OrderDetails:
  //       const navigationStateOrderDetails =
  //         vm.navigationState as NavigationStateOrderDetails;
  //       return this.renderOrderDetailsScreen(navigationStateOrderDetails.order);
  //   }
  // }

  render() {
    return (
      <View style={styles.screenContainer}>
        <Header
          title="Orders"
          subtitle={'All Outbound Orders'}
          backButtonVisible={true}
          onBackButtonPress={this.onBackButtonPress}
        />
        <View style={styles.content}>
          <OrdersList
            orders={this.state.allOrders}
            onOrderTapped={this.props.navigation.navigate('OrderDetails')}
          />
          {/*<CentralMessage message={this.state.centralErrorMessage}/>*/}
        </View>
      </View>
    );
  }
}

const mapDispatchToProps: DispatchProps = {};

export default connect(null, mapDispatchToProps)(Index);
