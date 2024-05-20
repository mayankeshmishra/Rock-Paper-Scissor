import React from "react";

import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import AppRoutes from "@Routes/routes";
import appStore from "@State/store";

let persistor = persistStore(appStore);

const App: React.FC = () => {
  return (
    <Provider store={appStore}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={AppRoutes} />
      </PersistGate>
    </Provider>
  );
};

export default App;
