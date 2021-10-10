import Location from '../../data/location/Location';
import {Session} from '../../data/auth/Session';
import {SHOW_SCREEN_LOADING, HIDE_SCREEN_LOADING} from '../actions/main';

export interface AppState {
  loggedIn: boolean;
  fullScreenLoadingIndicator: {
    visible: boolean;
    message?: string | null;
  };
  currentLocation?: Location | null;
  session?: Session | null;
}

const initialState: AppState = {
  loggedIn: false,
  fullScreenLoadingIndicator: {
    visible: false,
    message: null,
  },
  currentLocation: null,
  session: null,
};

function reducer(state = initialState, action: any) {
  switch (action.type) {
    case SHOW_SCREEN_LOADING: {
      const {message} = action.payload;
      return {
        ...state,
        fullScreenLoadingIndicator: {
          visible: true,
          message,
        },
      };
    }
    case HIDE_SCREEN_LOADING: {
      return {
        ...state,
        fullScreenLoadingIndicator: {
          visible: false,
          message: null,
        },
      };
    }

    default: {
      return state;
    }
  }
}

export default reducer;
