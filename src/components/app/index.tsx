import Layout from '../layout';
import { LogDataProvider } from '../../hooks/logs'
import { APIInfoProvider } from '../../hooks/api-info'
import { APIDetailContextProvider } from '../../hooks/api-detail'

function App() {
  return (
    <div className="App">
      <LogDataProvider>
        <APIInfoProvider>
          <APIDetailContextProvider>
            <Layout />
          </APIDetailContextProvider>
        </APIInfoProvider>
      </LogDataProvider>
    </div>
  );
}

export default App
