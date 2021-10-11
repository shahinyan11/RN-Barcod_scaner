import React, {Component} from 'react';
// import {connect} from 'react-redux';
// import * as NavigationService from './NavigationService';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './screens/Login';
// import DrawerNavigator from './screens/DrawerNavigator';
// import ProductDetails from './screens/ProductDetails';
import ChooseCurrentLocation from './screens/ChooseCurrentLocation';
import {RootState} from './redux/reducers';
import {connect} from 'react-redux';
const Stack = createStackNavigator();

export interface OwnProps {
  //no-op
}

interface StateProps {
  loggidIn: boolean;
}

interface DispatchProps {
  // auth: (data: any) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

interface State {}

class Main extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  render() {
    const {loggidIn} = this.props;
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={loggidIn ? 'ChooseCurrentLocation' : 'Login'}
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen
            name="ChooseCurrentLocation"
            component={ChooseCurrentLocation}
          />
          {/*<Stack.Screen name="Drawer" component={DrawerNavigator} />*/}
          {/*<Stack.Screen name="ProductDetails" component={ProductDetails} />*/}
          {/*<Stack.Screen name="Drawer" component={DrawerNavigator} />*/}
          {/*<Stack.Screen name="Drawer" component={DrawerNavigator} />*/}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  loggidIn: state.mainReducer,
});

export default connect(mapStateToProps, null)(Main);
