import Layout from '../layout';
import { APIDataProvider } from '../../hooks/logs'

function App() {
  return (
    <div className="App">
      <APIDataProvider>
        <Layout />
      </APIDataProvider>
    </div>
  );
}

export default App
