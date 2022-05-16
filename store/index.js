import * as React from 'react';
import bucket from './bucket/reducer';
import info from './info/reducer';
import products from './products/reducer';
import user from './user/reducer';
import initialState from './initialState';
import {combineReducers} from '../utils';


const Context = React.createContext();
const combinedReducers = combineReducers({
  bucket,
  info,
  products,
  user,
});

function ContextProvider({children}) {
  const [state, dispatch] = React.useReducer(combinedReducers, initialState);
  const context = React.useMemo(() => [state, dispatch], [state, dispatch]);

  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  )
}

const connectContext = (Component, select) => {
  return (props) => {
    const [store, dispatch] = React.useContext(Context)
    const data = {...(select ? select(store) : {})}
    return React.useMemo(
      () => (
        <Component
          {...data}
          {...props}
          dispatch={dispatch}
        />),
      [JSON.stringify(data), JSON.stringify(props)],
    );
  };
};

export {Context, ContextProvider, connectContext};
