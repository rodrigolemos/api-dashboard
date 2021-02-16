import Layout from '../layout';
import { APIDataProvider } from '../../hooks/logs'
import { APIInfoProvider } from '../../hooks/api-info'

function App() {
  return (
    <div className="App">
      <APIDataProvider>
        <APIInfoProvider>
          <Layout />
        </APIInfoProvider>
      </APIDataProvider>
    </div>
  );
}

export default App
