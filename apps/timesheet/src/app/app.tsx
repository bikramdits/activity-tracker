// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {  Route, Routes} from 'react-router-dom';


import Layout from './Layout';

export function App() {
  return (
<Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route path='people' element={<People />} /> */}
        </Route>
      </Routes>
  );
}

export default App;
