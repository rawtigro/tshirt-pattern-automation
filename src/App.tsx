import { useState } from 'react';
import Layout from './components/Layout';
import TopBar from './components/TopBar';
import TabNav from './components/TabNav';
import type { TabId } from './components/TabNav';
import ThemesView from './views/ThemesView';
import PatternsView from './views/PatternsView';
import BundlesView from './views/BundlesView';
import AutomationView from './views/AutomationView';
import LoginPage from './views/LoginPage';
import { AppProvider } from './context/AppContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('themes');

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <AppProvider>
      <Layout>
        <TopBar />
        <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="px-8 pb-12">
          {activeTab === 'themes' && <ThemesView />}
          {activeTab === 'patterns' && <PatternsView />}
          {activeTab === 'bundles' && <BundlesView />}
          {activeTab === 'automation' && <AutomationView />}
        </div>
      </Layout>
    </AppProvider>
  );
}

export default App;
