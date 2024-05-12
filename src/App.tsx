import { RouterProvider } from 'react-router-dom';

import AppRoutes from '@Src/app/routes';

function App() {
  return (
    <RouterProvider router={AppRoutes} />
  );
}

export default App;
