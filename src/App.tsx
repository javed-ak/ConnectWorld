import React, { useState } from 'react';
import { AuthForm } from './components/AuthForm';
import { Navbar } from './components/Navbar';
import { Feed } from './components/Feed';
import { Profile } from './components/Profile';
import { CreatePost } from './components/CreatePost';
import { useAuth } from './hooks/useAuth';
import { Loader2 } from 'lucide-react';

type View = 'feed' | 'profile' | 'create';

function App() {
  const { user, loading } = useAuth();
  const [currentView, setCurrentView] = useState<View>('feed');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  const renderContent = () => {
    switch (currentView) {
      case 'feed':
        return <Feed />;
      case 'profile':
        return <Profile />;
      case 'create':
        return (
          <div className="max-w-2xl mx-auto p-4">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Create a Post</h1>
              <p className="text-gray-600">Share your thoughts with the community</p>
            </div>
            <CreatePost onPostCreated={() => setCurrentView('feed')} />
          </div>
        );
      default:
        return <Feed />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentView={currentView} onViewChange={setCurrentView} />
      <main className="pt-6 pb-12">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;