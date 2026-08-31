import React, { useState, useEffect } from 'react';
import { templatesRegistry, getTemplateById } from './data/templatesRegistry';
import { defaultPortfolioData, defaultConfig } from './data/defaultData';
import { UserPortfolio, TemplateDefinition, PortfolioData } from './types';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { TemplateGallery } from './components/TemplateGallery';
import { TemplatePreviewModal } from './components/TemplatePreviewModal';
import { BuilderEditor } from './components/BuilderEditor';
import { MyPortfolios } from './components/MyPortfolios';
import { PublishModal } from './components/PublishModal';
import { ImportModal } from './components/ImportModal';
import { PublishedView } from './components/PublishedView';

const STORAGE_KEY_PORTFOLIOS = 'buildeasy_portfolios_v2';
const STORAGE_KEY_ACTIVE_ID = 'buildeasy_active_id_v2';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'gallery' | 'builder' | 'dash' | 'published'>('landing');
  
  // Load portfolios from localStorage or fall back to default
  const [portfolios, setPortfolios] = useState<UserPortfolio[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PORTFOLIOS);
      if (saved) {
        let parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Safeguard fallback: replace any deleted template ID with github-codebucks-001
          const allowedIds = ['github-codebucks-001', 'github-adrian-002', 'github-folio-003', 'github-hamish-004', 'github-magicui-005', 'github-nixrajput-007', 'github-vscode-008', 'github-yuji-009', 'github-cleanfolio-010', 'github-daniel-011', 'daniel-cinematic', 'github-kalvin-012', 'kalvin-mountain', 'github-alex-013', 'alex-editorial-bento'];
          parsed = parsed.map(p => {
            if (!allowedIds.includes(p.templateId)) {
              return {
                ...p,
                templateId: 'github-codebucks-001',
                customizer: templatesRegistry.find(t => t.id === 'github-codebucks-001')?.defaultConfig || defaultConfig
              };
            }
            return p;
          });
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse portfolios from localStorage:', e);
    }
    
    const defaultCodebucksPort: UserPortfolio = {
      id: 'port-codebucks-demo',
      name: 'CodeBucks — Developer Portfolio',
      templateId: 'github-codebucks-001',
      data: defaultPortfolioData,
      customizer: templatesRegistry.find(t => t.id === 'github-codebucks-001')?.defaultConfig || defaultConfig,
      updatedAt: new Date().toISOString().split('T')[0],
      published: true,
      username: 'codebucks'
    };

    const defaultFolioPort: UserPortfolio = {
      id: 'port-folio-demo',
      name: 'Ayush Singh — Creative UI Engineer',
      templateId: 'github-folio-003',
      data: defaultPortfolioData,
      customizer: templatesRegistry.find(t => t.id === 'github-folio-003')?.defaultConfig || defaultConfig,
      updatedAt: new Date().toISOString().split('T')[0],
      published: true,
      username: 'ayushsingh'
    };

    return [
      defaultCodebucksPort,
      defaultFolioPort
    ];
  });

  const [activePortfolioId, setActivePortfolioId] = useState<string>(() => {
    try {
      const savedId = localStorage.getItem(STORAGE_KEY_ACTIVE_ID);
      if (savedId) {
        // Fallback or force activation of the new CodeBucks template if stored ID is invalid
        const allowedIds = ['port-codebucks-demo', 'port-folio-demo'];
        if (allowedIds.includes(savedId)) return savedId;
      }
    } catch (e) {
      console.error('Failed to parse active ID from localStorage:', e);
    }
    return 'port-codebucks-demo';
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PORTFOLIOS, JSON.stringify(portfolios));
    } catch (e) {
      console.error('Failed to save portfolios to localStorage:', e);
    }
  }, [portfolios]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ACTIVE_ID, activePortfolioId);
    } catch (e) {
      console.error('Failed to save active ID to localStorage:', e);
    }
  }, [activePortfolioId]);

  const [previewTemplate, setPreviewTemplate] = useState<TemplateDefinition | null>(null);
  const [publishPortfolioTarget, setPublishPortfolioTarget] = useState<UserPortfolio | null>(null);
  const [showImportModal, setShowImportModal] = useState<boolean>(false);

  const activePortfolio = portfolios.find(p => p.id === activePortfolioId) || portfolios[0];
  const activeTemplate = getTemplateById(activePortfolio?.templateId);

  const handleCreateNewPortfolio = () => {
    const newId = `port-${Date.now()}`;
    const newPort: UserPortfolio = {
      id: newId,
      name: `My Portfolio ${portfolios.length + 1}`,
      templateId: 'github-codebucks-001',
      data: defaultPortfolioData,
      customizer: templatesRegistry[0].defaultConfig,
      updatedAt: new Date().toISOString().split('T')[0],
      published: false,
      username: `portfolio-${Date.now().toString().slice(-4)}`
    };
    const updated = [newPort, ...portfolios];
    setPortfolios(updated);
    setActivePortfolioId(newId);
    setCurrentView('builder');
  };

  const handleSelectTemplate = (templateId: string) => {
    // Template switching: keep portfolio data intact, update templateId & defaultConfig
    const tDef = getTemplateById(templateId);
    
    setPortfolios(prev => prev.map(p => {
      if (p.id === activePortfolioId) {
        return {
          ...p,
          templateId: tDef.id,
          customizer: {
            ...tDef.defaultConfig
          },
          updatedAt: new Date().toISOString().split('T')[0]
        };
      }
      return p;
    }));

    setCurrentView('builder');
  };

  const handleUpdatePortfolio = (updated: UserPortfolio) => {
    setPortfolios(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const handleImportData = (newData: Partial<PortfolioData>) => {
    setPortfolios(prev => prev.map(p => {
      if (p.id === activePortfolioId) {
        return {
          ...p,
          data: {
            ...p.data,
            ...newData,
            profile: { ...p.data.profile, ...(newData.profile || {}) },
            about: { ...p.data.about, ...(newData.about || {}) },
            projects: newData.projects || p.data.projects,
            socialLinks: { ...p.data.socialLinks, ...(newData.socialLinks || {}) }
          },
          updatedAt: new Date().toISOString().split('T')[0]
        };
      }
      return p;
    }));
  };

  const handleUpdatePublish = (published: boolean, username: string) => {
    setPortfolios(prev => prev.map(p => {
      if (publishPortfolioTarget && p.id === publishPortfolioTarget.id) {
        return { ...p, published, username };
      }
      return p;
    }));
    if (publishPortfolioTarget) {
      setPublishPortfolioTarget({ ...publishPortfolioTarget, published, username });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        onOpenImport={() => setShowImportModal(true)}
        onNewPortfolio={handleCreateNewPortfolio}
        portfolioCount={portfolios.length}
      />

      <main>
        {currentView === 'landing' && (
          <LandingPage
            onExploreTemplates={() => setCurrentView('gallery')}
            onOpenBuilder={() => setCurrentView('builder')}
            onOpenImport={() => setShowImportModal(true)}
            onSelectTemplate={handleSelectTemplate}
          />
        )}

        {currentView === 'gallery' && (
          <TemplateGallery
            templates={templatesRegistry}
            currentTemplateId={activePortfolio?.templateId || 'github-codebucks-001'}
            onSelectTemplate={handleSelectTemplate}
            onPreviewTemplate={(tmpl) => setPreviewTemplate(tmpl)}
          />
        )}

        {currentView === 'builder' && (
          <BuilderEditor
            portfolio={activePortfolio}
            templates={templatesRegistry}
            onUpdatePortfolio={handleUpdatePortfolio}
            onOpenPublish={() => setPublishPortfolioTarget(activePortfolio)}
            onOpenTemplateGallery={() => setCurrentView('gallery')}
          />
        )}

        {currentView === 'dash' && (
          <MyPortfolios
            portfolios={portfolios}
            templates={templatesRegistry}
            onEditPortfolio={(id) => {
              setActivePortfolioId(id);
              setCurrentView('builder');
            }}
            onDuplicatePortfolio={(id) => {
              const target = portfolios.find(p => p.id === id);
              if (!target) return;
              const dup: UserPortfolio = {
                ...target,
                id: `port-${Date.now()}`,
                name: `${target.name} (Copy)`,
                updatedAt: new Date().toISOString().split('T')[0]
              };
              setPortfolios([dup, ...portfolios]);
            }}
            onDeletePortfolio={(id) => {
              if (portfolios.length <= 1) {
                alert('You must keep at least one portfolio.');
                return;
              }
              setPortfolios(portfolios.filter(p => p.id !== id));
            }}
            onCreateNew={handleCreateNewPortfolio}
            onOpenPublish={(port) => setPublishPortfolioTarget(port)}
          />
        )}

        {currentView === 'published' && (
          <PublishedView
            portfolio={activePortfolio}
            template={activeTemplate}
            onBackToBuilder={() => setCurrentView('builder')}
          />
        )}
      </main>

      {/* Modals */}
      {previewTemplate && (
        <TemplatePreviewModal
          template={previewTemplate}
          portfolioData={activePortfolio.data}
          onClose={() => setPreviewTemplate(null)}
          onUseTemplate={(id) => {
            handleSelectTemplate(id);
            setPreviewTemplate(null);
          }}
        />
      )}

      {publishPortfolioTarget && (
        <PublishModal
          portfolio={publishPortfolioTarget}
          onClose={() => setPublishPortfolioTarget(null)}
          onUpdatePublish={handleUpdatePublish}
          onViewPublished={() => {
            setActivePortfolioId(publishPortfolioTarget.id);
            setPublishPortfolioTarget(null);
            setCurrentView('published');
          }}
        />
      )}

      {showImportModal && (
        <ImportModal
          onClose={() => setShowImportModal(false)}
          onImportData={handleImportData}
        />
      )}
    </div>
  );
}
