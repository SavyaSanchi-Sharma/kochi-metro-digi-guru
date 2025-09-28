import { useState } from 'react';
import Layout from '@/components/Layout';
import ChatInterface from '@/components/ChatInterface';
import DocumentViewer from '@/components/DocumentViewer';
import DocumentUpload from '@/components/DocumentUpload';
import Groups from '@/components/Groups';
import Metrics from '@/components/Metrics';
import AIWorkspace from '@/components/AIWorkspace';

const Index = () => {
  const [activeSection, setActiveSection] = useState('chat');

  const renderContent = () => {
    switch (activeSection) {
      case 'chat': return <ChatInterface />;
      case 'documents': return <DocumentViewer />;
      case 'upload': return <DocumentUpload />;
      case 'groups': return <Groups />;
      case 'metrics': return <Metrics />;
      case 'workspace': return <AIWorkspace />;
      default: return <ChatInterface />;
    }
  };

  return (
    <Layout>
      {renderContent()}
    </Layout>
  );
};

export default Index;
