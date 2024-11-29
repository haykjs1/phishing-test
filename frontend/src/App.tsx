import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { RoutesWrapper, store } from "libraries";

const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <RoutesWrapper />
    </Provider>
  </BrowserRouter>
);

export default App;
