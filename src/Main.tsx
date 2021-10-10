import React, {Component} from 'react';
// import {connect} from 'react-redux';
// import * as NavigationService from './NavigationService';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './screens/Login';
import DrawerNavigator from './screens/DrawerNavigator';
import ProductDetails from './screens/ProductDetails';
const Stack = createStackNavigator();

export interface OwnProps {
  //no-op
}

interface StateProps {
  //no-op
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
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={'Drawer'}
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Drawer" component={DrawerNavigator} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} />
          {/*<Stack.Screen name="Drawer" component={DrawerNavigator} />*/}
          {/*<Stack.Screen name="Drawer" component={DrawerNavigator} />*/}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Main;
