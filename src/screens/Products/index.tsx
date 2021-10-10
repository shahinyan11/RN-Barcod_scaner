import React from 'react';
import {Platform, StatusBar, StyleSheet, TextInput, View} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import Product from '../../data/product/Product';
import getProductsFromApi from '../../data/product/GetProducts';
import showPopup from '../../components/Popup';
import {
  searchProductsByName as searchProductsByNameFromApi,
  searchProductsByProductCode as searchProductCodeFromApi,
  searchProducts as searchProductsApi,
  searchProductsByCategory as searchProductsByCategoryFromApi,
} from '../../data/product/SearchProducts';
// import {
//   dispatchHideProgressBarAction as hideProgressBar,
//   dispatchShowProgressBarAction as showProgressBar,
// } from '../../../redux/Dispatchers';
import ProductsSearchHeader from './ProductsSearchHeader';
import ProductsList from './ProductsList';
import CentralMessage from './CentralMessage';
import FloatingActionButtonMenu from './FloatingActionButtonMenu';
import ProductCategoryPickerPopup from './ProductCategoryPickerPopup';
import {ProductCategory} from '../../data/product/category/ProductCategory';
import {DispatchProps, OwnProps, Props, StateProps} from './Props';
import {
  NavigationStateHere,
  NavigationStateProductDetails,
  NavigationStateType,
  State,
} from './State';
import {VM} from './VM';
import vmMapper from './VMMapper';
import ProductsSearchCodeHeader from './ProductsSearchCodeHeader';
import BarCodeSearchHeader from './BarCodeSearchHeader';
import {getProductsAction} from '../../redux/actions/products';
import {RootState} from '../../redux/reducers';

class Products extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchGlobally: null,
      error: null,
      allProducts: null,
      searchBoxVisible: false,
      searchBoxProductCodeVisible: false,
      categoryPickerPopupVisible: false,
      searchByName: null,
      searchByProductCode: null,
      searchByCategory: null,
      navigationState: new NavigationStateHere(),
      barcodeNo: '',
    };

    this.props.getProductsAction();
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    if(this.props.pr)
  }
  componentDidMount = () => {
    // if (!products) {
    //   this.props.exit();
    //   return;
    // }
    // if (products.length == 0) {
    //   this.setState({
    //     error: 'No products found',
    //     allProducts: products,
    //   });
    // } else {
    //   this.setState({
    //     error: null,
    //     allProducts: products,
    //   });
    // }
  };

  // onSearchByProductNamePress = () => {
  //   this.setState({
  //     searchBoxVisible: true,
  //   });
  // };
  //
  // onSearchByProductCodePress = () => {
  //   this.setState({
  //     searchBoxProductCodeVisible: true,
  //   });
  // };
  //
  // onSearchByCategoryPress = () => {
  //   this.showCategoryPickerPopup();
  // };
  //
  // onSearchBoxVisibilityChange = (visible: boolean) => {
  //   if (!visible) {
  //     const error =
  //       !this.state.allProducts || this.state.allProducts.length == 0
  //         ? 'No products found'
  //         : null;
  //     this.setState({
  //       error: error,
  //       searchBoxVisible: false,
  //       searchBoxProductCodeVisible: false,
  //       searchByName: null,
  //       searchByProductCode: null,
  //     });
  //   }
  // };
  //
  onSearchQuerySubmitted = (query: string) => {
      if (!query) {
        showPopup({
          message: 'Search query is empty',
          positiveButtonText: 'Ok',
        });
        return;
      }

      if (this.state.searchByName?.query == query) {
        return;
      }

      const searchedProducts = await this.searchProducts(query);
      if (!searchedProducts) {
        return;
      }

      if (searchedProducts.length == 0) {
        this.setState({
          searchByName: {
            query: query,
            results: null,
          },
          error: `No search results found for product name "${query}"`,
        });
      } else {
        this.setState({
          searchByName: {
            query: query,
            results: searchedProducts,
          },
          error: null,
        });
      }
  };
  //
  searchProducts = async (query: string): Promise<Product[] | null> => {
    try {
      this.props.showProgressBar(`Searching for products with name "${query}"`);
      return await searchProductsByNameFromApi(query);
    } catch (e) {
      const title = e.message
        ? `Failed to load search results with name = "${query}"`
        : null;
      const message =
        e.message ?? `Failed to load search results with name = "${query}"`;
      const shouldRetry = await showPopup({
        title: title,
        message: message,
        positiveButtonText: 'Retry',
        negativeButtonText: 'Cancel',
      });
      if (shouldRetry) {
        return await this.searchProducts(query);
      } else {
        return Promise.resolve(null);
      }
    } finally {
      this.props.hideProgressBar();
    }
  };
  //
  // onSearchProductCodeQuerySubmitted = (query: string) => {
  //   (async () => {
  //     if (!query) {
  //       await showPopup({
  //         message: 'Search query is empty',
  //         positiveButtonText: 'Ok',
  //       });
  //       return;
  //     }
  //
  //     if (this.state.searchByProductCode?.query == query) {
  //       return;
  //     }
  //
  //     const searchedProducts = await this.searchProductByProductCode(query);
  //     if (!searchedProducts) {
  //       return;
  //     }
  //
  //     if (searchedProducts.length == 0) {
  //       this.setState({
  //         searchByProductCode: {
  //           query: query,
  //           results: null,
  //         },
  //         error: `No search results found for product code "${query}"`,
  //       });
  //     } else {
  //       this.setState({
  //         searchByProductCode: {
  //           query: query,
  //           results: searchedProducts,
  //         },
  //         error: null,
  //       });
  //     }
  //   })();
  // };
  //
  // searchProductByProductCode = async (
  //   query: string,
  // ): Promise<Product[] | null> => {
  //   try {
  //     this.props.showProgressBar(
  //       `Searching for products with product code "${query}"`,
  //     );
  //     return await searchProductCodeFromApi(query);
  //   } catch (e) {
  //     const title = e.message
  //       ? `Failed to load search results with code = "${query}"`
  //       : null;
  //     const message =
  //       e.message ?? `Failed to load search results with code = "${query}"`;
  //     const shouldRetry = await showPopup({
  //       title: title,
  //       message: message,
  //       positiveButtonText: 'Retry',
  //       negativeButtonText: 'Cancel',
  //     });
  //     if (shouldRetry) {
  //       return await this.searchProductByProductCode(query);
  //     } else {
  //       return Promise.resolve(null);
  //     }
  //   } finally {
  //     this.props.hideProgressBar();
  //   }
  // };
  //
  // getProducts = () => {
  //   this.props.showProgressBar('Fetching products');
  //   this.props.getProductsAction();
  //
  //   // showPopup({
  //   //   title: title,
  //   //   message: message,
  //   //   positiveButtonText: 'Retry',
  //   //   negativeButtonText: 'Cancel',
  //   // });
  //
  //   // this.props.hideProgressBar();
  // };
  //
  // onCategoryChosen = (category: ProductCategory) => {
  //   this.hideCategoryPickerPopup();
  //   (async () => {
  //     const searchedProducts = await this.searchProductsByCategory(category);
  //     if (!searchedProducts) {
  //       return;
  //     }
  //
  //     if (searchedProducts.length == 0) {
  //       this.setState({
  //         error: `No products found in category "${category.name}"`,
  //         searchByCategory: {
  //           category: category,
  //           results: null,
  //         },
  //       });
  //     } else {
  //       this.setState({
  //         error: null,
  //         searchByCategory: {
  //           category: category,
  //           results: searchedProducts,
  //         },
  //       });
  //     }
  //   })();
  // };
  //
  // searchProductsByCategory = async (
  //   category: ProductCategory,
  // ): Promise<Product[] | null> => {
  //   try {
  //     this.props.showProgressBar(
  //       `Searching for products in category "${category.name}"`,
  //     );
  //     return await searchProductsByCategoryFromApi(category);
  //   } catch (e) {
  //     const title = e.message
  //       ? `Failed to load search results for products in category = ${category.name}`
  //       : null;
  //     const message =
  //       e.message ??
  //       `Failed to load search results for products in category = ${category.name}`;
  //     const shouldRetry = await showPopup({
  //       title: title,
  //       message: message,
  //       positiveButtonText: 'Retry',
  //       negativeButtonText: 'Cancel',
  //     });
  //     if (shouldRetry) {
  //       return await this.searchProductsByCategory(category);
  //     } else {
  //       return Promise.resolve(null);
  //     }
  //   } finally {
  //     this.props.hideProgressBar();
  //   }
  // };
  //
  // showCategoryPickerPopup = () => {
  //   this.setState({
  //     categoryPickerPopupVisible: true,
  //   });
  // };
  //
  // hideCategoryPickerPopup = () => {
  //   this.setState({
  //     categoryPickerPopupVisible: false,
  //   });
  // };
  //
  onBackButtonPress = () => {
    const currState = this.state;
    if (currState.searchByCategory) {
      this.setState({
        error: null,
        searchByCategory: null,
      });
    } else {
      this.props.navigation.back();
    }
  };
  //
  // onBarCodeSearchQuerySubmitted = (query: string) => {
  //   // handleBarcodeScan(barcodeNo);
  //   (async () => {
  //     if (!query) {
  //       await showPopup({
  //         message: 'Search query is empty',
  //         positiveButtonText: 'Ok',
  //       });
  //       return;
  //     }
  //
  //     const searchedProducts = await this.searchProductGlobally(query);
  //     if (!searchedProducts) {
  //       return;
  //     }
  //
  //     if (searchedProducts.length == 0) {
  //       this.setState({
  //         searchGlobally: {
  //           query: query,
  //           results: null,
  //         },
  //         error: `No search results found for query "${query}"`,
  //       });
  //     } else {
  //       this.setState({
  //         searchGlobally: {
  //           query: query,
  //           results: searchedProducts,
  //         },
  //         error: null,
  //       });
  //     }
  //   })();
  // };
  //
  // searchProductGlobally = async (query: string): Promise<Product[] | null> => {
  //   try {
  //     this.props.showProgressBar(
  //       `Searching for products with value "${query}"`,
  //     );
  //     return await searchProductsApi(query);
  //   } catch (e) {
  //     const title = e.message
  //       ? `Failed to load search results with value = "${query}"`
  //       : null;
  //     const message =
  //       e.message ?? `Failed to load search results with value = "${query}"`;
  //     const shouldRetry = await showPopup({
  //       title: title,
  //       message: message,
  //       positiveButtonText: 'Retry',
  //       negativeButtonText: 'Cancel',
  //     });
  //     if (shouldRetry) {
  //       return await this.searchProductGlobally(query);
  //     } else {
  //       return Promise.resolve(null);
  //     }
  //   } finally {
  //     this.props.hideProgressBar();
  //   }
  // };

  // render() {
  //   const vm = vmMapper(this.state);
  //   switch (vm.navigationState.type) {
  //     case NavigationStateType.Here:
  //       return this.renderContent(vm);
  //     case NavigationStateType.ProductDetails:
  //       const navigationStateProductDetails =
  //         vm.navigationState as NavigationStateProductDetails;
  //       return this.renderProductDetailsScreen(
  //         navigationStateProductDetails.product,
  //       );
  //   }
  // }

  render() {
    const vm = vmMapper(this.state)
    return (
      <View style={styles.screenContainer}>
        <ProductsSearchHeader
          subtitle={vm.subtitle}
          searchBoxVisible={vm.searchBoxVisible}
          onBackButtonPress={this.onBackButtonPress}
          onSearchQuerySubmitted={this.onSearchQuerySubmitted}
          onSearchBoxVisibilityChange={this.onSearchBoxVisibilityChange}
        />
        {/*<ProductsSearchCodeHeader*/}
        {/*  subtitle={vm.subtitle}*/}
        {/*  searchBoxProductCodeVisible={vm.searchBoxProductCodeVisible}*/}
        {/*  onBackButtonPress={this.onBackButtonPress}*/}
        {/*  onSearchProductCodeQuerySubmitted={*/}
        {/*    this.onSearchProductCodeQuerySubmitted*/}
        {/*  }*/}
        {/*  onSearchBoxVisibilityChange={this.onSearchBoxVisibilityChange}*/}
        {/*/>*/}
        {/*<BarCodeSearchHeader*/}
        {/*  subtitle={vm.subtitle}*/}
        {/*  onBarCodeSearchQuerySubmitted={this.onBarCodeSearchQuerySubmitted}*/}
        {/*  searchBox={false}*/}
        {/*/>*/}
        {/*<View style={styles.content}>*/}
        {/*  <ProductsList*/}
        {/*    products={vm.list}*/}
        {/*    onProductTapped={this.props.navigation.navigate('ProductDetails')}*/}
        {/*  />*/}
        {/*  <CentralMessage message={vm.centralErrorMessage} />*/}
        {/*  <FloatingActionButtonMenu*/}
        {/*    visible={vm.floatingActionButtonVisible}*/}
        {/*    onSearchByProductNamePress={this.onSearchByProductNamePress}*/}
        {/*    onSearchByProductCodePress={this.onSearchByProductCodePress}*/}
        {/*    onSearchByCategoryPress={this.onSearchByCategoryPress}*/}
        {/*  />*/}
        {/*  <ProductCategoryPickerPopup*/}
        {/*    visible={vm.categoryPickerPopupVisible}*/}
        {/*    onCategoryChosen={this.onCategoryChosen}*/}
        {/*    onCancelPressed={this.hideCategoryPickerPopup}*/}
        {/*  />*/}
        </View>
    );
  }

  showProductsScreen() {
    this.setState({
      navigationState: new NavigationStateHere(),
    });
  }
}

const mapStateToProps = (state: RootState) => ({
  products: state.productsReducer,
});

const mapDispatchToProps: DispatchProps = {
  getProductsAction,
  // showProgressBar,
  // hideProgressBar
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
