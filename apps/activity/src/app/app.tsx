// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Screenshots from './screenshot/components/index';



export function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path='screenshot' element={<Screenshots />} />
      
      </Route>
    </Routes>
  );
}

export default App;
