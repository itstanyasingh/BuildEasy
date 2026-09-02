import React, { useState, useEffect } from 'react';
import { templatesRegistry, getTemplateById } from './data/templatesRegistry';
import { defaultPortfolioData, defaultConfig } from './data/defaultData';
import { getDemoDataForTemplate } from './data/demoDataByTemplate';
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
  const [currentView, setCurrentView] = useState<'landing' | 'gallery' | 'builder' | 'dash' | 'published'>(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('template') || urlParams.get('t')) {
        return 'builder';
      }
      const viewParam = urlParams.get('view');
      if (viewParam === 'gallery' || viewParam === 'builder' || viewParam === 'dash' || viewParam === 'published') {
        return viewParam as any;
      }
    } catch (e) {}
    return 'landing';
  });
  
  // Load portfolios from localStorage or fall back to defaults
  const [portfolios, setPortfolios] = useState<UserPortfolio[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PORTFOLIOS);
      if (saved) {
        let parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          parsed = parsed.map(p => {
            const tDef = getTemplateById(p.templateId);
            return {
              ...p,
              templateId: tDef.id,
              customizer: p.customizer || tDef.defaultConfig,
              data: p.data || getDemoDataForTemplate(tDef.id)
            };
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
      data: getDemoDataForTemplate('github-codebucks-001'),
      customizer: templatesRegistry.find(t => t.id === 'github-codebucks-001')?.defaultConfig || defaultConfig,
      updatedAt: new Date().toISOString().split('T')[0],
      published: true,
      username: 'codebucks'
    };

    const defaultFolioPort: UserPortfolio = {
      id: 'port-folio-demo',
      name: 'Ayush Singh — Creative UI Engineer',
      templateId: 'github-folio-003',
      data: getDemoDataForTemplate('github-folio-003'),
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
      const urlParams = new URLSearchParams(window.location.search);
      const urlTemplate = urlParams.get('template') || urlParams.get('t');
      if (urlTemplate) {
        const tDef = getTemplateById(urlTemplate);
        if (tDef) return `port-${tDef.id}`;
      }
      const savedId = localStorage.getItem(STORAGE_KEY_ACTIVE_ID);
      if (savedId) return savedId;
    } catch (e) {
      console.error('Failed to parse active ID:', e);
    }
    return 'port-codebucks-demo';
  });

  // URL sync handler on mount & navigation
  useEffect(() => {
    const handleUrlSync = () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const urlTemplate = urlParams.get('template') || urlParams.get('t');
        if (urlTemplate) {
          const tDef = getTemplateById(urlTemplate);
          if (tDef) {
            const demoData = getDemoDataForTemplate(tDef.id);
            setPortfolios(prev => {
              const existingIndex = prev.findIndex(p => p.templateId === tDef.id || p.id === `port-${tDef.id}`);
              if (existingIndex >= 0) {
                setActivePortfolioId(prev[existingIndex].id);
                return prev;
              } else {
                const newPort: UserPortfolio = {
                  id: `port-${tDef.id}`,
                  name: tDef.name,
                  templateId: tDef.id,
                  data: demoData,
                  customizer: { ...tDef.defaultConfig },
                  updatedAt: new Date().toISOString().split('T')[0],
                  published: false,
                  username: `user-${tDef.id}`
                };
                setActivePortfolioId(newPort.id);
                return [newPort, ...prev];
              }
            });
            setCurrentView('builder');
          }
        }
      } catch (e) {
        console.error('Error syncing URL parameters:', e);
      }
    };

    handleUrlSync();
    window.addEventListener('popstate', handleUrlSync);
    return () => window.removeEventListener('popstate', handleUrlSync);
  }, []);

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
    const tDef = getTemplateById(templateId);
    const demoData = getDemoDataForTemplate(tDef.id);
    
    setPortfolios(prev => {
      const activeExists = prev.some(p => p.id === activePortfolioId);
      if (activeExists) {
        return prev.map(p => {
          if (p.id === activePortfolioId) {
            return {
              ...p,
              name: tDef.name,
              templateId: tDef.id,
              data: demoData,
              customizer: {
                ...tDef.defaultConfig
              },
              updatedAt: new Date().toISOString().split('T')[0]
            };
          }
          return p;
        });
      } else {
        const newPort: UserPortfolio = {
          id: `port-${tDef.id}`,
          name: tDef.name,
          templateId: tDef.id,
          data: demoData,
          customizer: { ...tDef.defaultConfig },
          updatedAt: new Date().toISOString().split('T')[0],
          published: false,
          username: `user-${tDef.id}`
        };
        setActivePortfolioId(newPort.id);
        return [newPort, ...prev];
      }
    });

    try {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('template', tDef.id);
      newUrl.searchParams.set('view', 'builder');
      window.history.pushState({}, '', newUrl.toString());
    } catch (e) {
      console.error('Failed to update URL search params:', e);
    }

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
