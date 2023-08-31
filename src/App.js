import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import Form from './components/Form';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Form />
      </div>
    </Provider>
  );
};

export default App;
