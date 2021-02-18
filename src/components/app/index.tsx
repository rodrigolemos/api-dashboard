import Layout from '../layout';
import { APIDataProvider } from '../../hooks/logs'
import { APIInfoProvider } from '../../hooks/api-info'
import { APIDetailContextProvider } from '../../hooks/api-detail'

function App() {
  return (
    <div className="App">
      <APIDataProvider>
        <APIInfoProvider>
          <APIDetailContextProvider>
            <Layout />
          </APIDetailContextProvider>
        </APIInfoProvider>
      </APIDataProvider>
    </div>
  );
}

export default App
