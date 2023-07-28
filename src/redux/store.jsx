import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import PropTypes from 'prop-types';

import rootReducer from './reducers/index';

import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore( rootReducer, composeWithDevTools(applyMiddleware(thunk)));



const DataProvider = ({children}) => {
    return(
        <Provider store={store}>
            {children}
        </Provider>
    )
}

DataProvider.propTypes = {
    children: PropTypes.node, // Define the children prop with PropTypes
  };

export default DataProvider;