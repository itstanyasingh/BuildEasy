import React, { useState, useEffect, useRef } from 'react';
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
import { TemplateRenderer } from './components/templates/TemplateRenderer';
import { validateAndCleanPortfolio } from './lib/recovery';

const STORAGE_KEY_PORTFOLIOS = 'buildeasy_portfolios_v2';
const STORAGE_KEY_ACTIVE_ID = 'buildeasy_active_id_v2';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'gallery' | 'builder' | 'dash' | 'published' | 'public_portfolio'>(() => {
    try {
      const path = window.location.pathname;
      if (path.startsWith('/p/') || path.startsWith('/portfolio/')) {
        return 'public_portfolio';
      }
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
    const listKey = 'buildeasy_portfolios_list_v2';
    const oldKey = STORAGE_KEY_PORTFOLIOS;
    
    try {
      let metadataList: any[] = [];
      const savedList = localStorage.getItem(listKey);
      
      if (savedList) {
        metadataList = JSON.parse(savedList);
      } else {
        // Try old key for migration
        const savedOld = localStorage.getItem(oldKey);
        if (savedOld) {
          try {
            const parsedOld = JSON.parse(savedOld);
            if (Array.isArray(parsedOld)) {
              // Migrate each
              parsedOld.forEach((p: any) => {
                const cleaned = validateAndCleanPortfolio(p);
                localStorage.setItem(`buildeasy_portfolio_data_${cleaned.id}`, JSON.stringify(cleaned));
                metadataList.push({
                  id: cleaned.id,
                  name: cleaned.name,
                  templateId: cleaned.templateId,
                  updatedAt: cleaned.updatedAt,
                  published: cleaned.published,
                  username: cleaned.username,
                  version: cleaned.version || 1
                });
              });
              // Save metadata list
              localStorage.setItem(listKey, JSON.stringify(metadataList));
              // Remove old key so we don't migrate again
              localStorage.removeItem(oldKey);
            }
          } catch (migrationError) {
            console.error('Migration failed:', migrationError);
          }
        }
      }
      
      if (Array.isArray(metadataList) && metadataList.length > 0) {
        const fullyLoaded: UserPortfolio[] = [];
        metadataList.forEach(entry => {
          try {
            const payloadStr = localStorage.getItem(`buildeasy_portfolio_data_${entry.id}`);
            if (payloadStr) {
              const parsedPayload = JSON.parse(payloadStr);
              fullyLoaded.push(validateAndCleanPortfolio(parsedPayload));
            } else {
              // Fallback to demo data if payload key is missing
              const tDef = getTemplateById(entry.templateId);
              const demoData = getDemoDataForTemplate(tDef.id);
              const fallbackPort: UserPortfolio = {
                id: entry.id,
                name: entry.name,
                templateId: entry.templateId,
                data: demoData,
                customizer: tDef.defaultConfig,
                updatedAt: entry.updatedAt,
                published: entry.published,
                username: entry.username,
                version: entry.version || 1
              };
              fullyLoaded.push(fallbackPort);
            }
          } catch (itemError) {
            console.error(`Failed to load individual portfolio data for ${entry.id}:`, itemError);
            const tDef = getTemplateById(entry.templateId || 'github-codebucks-001');
            const demoData = getDemoDataForTemplate(tDef.id);
            fullyLoaded.push({
              id: entry.id || `port-${Date.now()}`,
              name: entry.name || tDef.name,
              templateId: tDef.id,
              data: demoData,
              customizer: tDef.defaultConfig,
              updatedAt: entry.updatedAt || new Date().toISOString().split('T')[0],
              published: entry.published || false,
              username: entry.username || `user-${Date.now().toString().slice(-4)}`,
              version: 1
            });
          }
        });
        
        if (fullyLoaded.length > 0) {
          return fullyLoaded;
        }
      }
    } catch (e) {
      console.error('Failed to parse portfolios or list:', e);
    }
    
    // Default brand-new portfolios if nothing is found anywhere
    const defaultCodebucksPort = validateAndCleanPortfolio({
      id: 'port-codebucks-demo',
      name: 'CodeBucks — Developer Portfolio',
      templateId: 'github-codebucks-001',
      data: getDemoDataForTemplate('github-codebucks-001'),
      customizer: templatesRegistry.find(t => t.id === 'github-codebucks-001')?.defaultConfig || defaultConfig,
      updatedAt: new Date().toISOString().split('T')[0],
      published: true,
      username: 'codebucks',
      version: 1
    });

    const defaultFolioPort = validateAndCleanPortfolio({
      id: 'port-folio-demo',
      name: 'Ayush Singh — Creative UI Engineer',
      templateId: 'github-folio-003',
      data: getDemoDataForTemplate('github-folio-003'),
      customizer: templatesRegistry.find(t => t.id === 'github-folio-003')?.defaultConfig || defaultConfig,
      updatedAt: new Date().toISOString().split('T')[0],
      published: true,
      username: 'ayushsingh',
      version: 1
    });

    // Write defaults to isolated storage
    try {
      localStorage.setItem(`buildeasy_portfolio_data_${defaultCodebucksPort.id}`, JSON.stringify(defaultCodebucksPort));
      localStorage.setItem(`buildeasy_portfolio_data_${defaultFolioPort.id}`, JSON.stringify(defaultFolioPort));
      localStorage.setItem('buildeasy_portfolios_list_v2', JSON.stringify([
        { id: defaultCodebucksPort.id, name: defaultCodebucksPort.name, templateId: defaultCodebucksPort.templateId, updatedAt: defaultCodebucksPort.updatedAt, published: defaultCodebucksPort.published, username: defaultCodebucksPort.username, version: 1 },
        { id: defaultFolioPort.id, name: defaultFolioPort.name, templateId: defaultFolioPort.templateId, updatedAt: defaultFolioPort.updatedAt, published: defaultFolioPort.published, username: defaultFolioPort.username, version: 1 }
      ]));
    } catch (err) {
      console.error('Failed to write default portfolios to localStorage on boot:', err);
    }

    return [
      defaultCodebucksPort,
      defaultFolioPort
    ];
  });

  const [activePortfolioId, setActivePortfolioId] = useState<string>(() => {
    try {
      const path = window.location.pathname;
      if (path.startsWith('/p/')) {
        const u = path.slice(3).split('/')[0];
        return `port-${u}`;
      }
      if (path.startsWith('/portfolio/')) {
        const u = path.slice(11).split('/')[0];
        return `port-${u}`;
      }
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
        const path = window.location.pathname;
        if (path.startsWith('/p/') || path.startsWith('/portfolio/')) {
          setCurrentView('public_portfolio');
          return;
        }

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
        } else {
          const viewParam = urlParams.get('view') || 'landing';
          if (viewParam === 'gallery' || viewParam === 'builder' || viewParam === 'dash' || viewParam === 'published') {
            setCurrentView(viewParam as any);
          } else {
            setCurrentView('landing');
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

  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'failed' | 'offline'>('saved');
  const pendingSaveTimeoutRef = useRef<any>(null);
  const portfoliosRef = useRef<UserPortfolio[]>(portfolios);

  // Sync ref to avoid closure capture issues
  useEffect(() => {
    portfoliosRef.current = portfolios;
  }, [portfolios]);

  // Keep track of active portfolio ID in localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ACTIVE_ID, activePortfolioId);
    } catch (e) {
      console.error('Failed to save active ID to localStorage:', e);
    }
  }, [activePortfolioId]);

  // Network offline detection
  useEffect(() => {
    const updateOnlineStatus = () => {
      if (!navigator.onLine) {
        setSaveStatus('offline');
      } else {
        setSaveStatus('saved');
      }
    };
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  // Flush save immediately to guarantee disk persistence
  const flushSave = (): boolean => {
    if (pendingSaveTimeoutRef.current) {
      clearTimeout(pendingSaveTimeoutRef.current);
      pendingSaveTimeoutRef.current = null;
    }

    try {
      const currentPortfolios = portfoliosRef.current;
      
      // Save each portfolio to its own isolated key
      currentPortfolios.forEach(p => {
        localStorage.setItem(`buildeasy_portfolio_data_${p.id}`, JSON.stringify(p));
      });

      // Save the metadata list index
      const listMetadata = currentPortfolios.map(p => ({
        id: p.id,
        name: p.name,
        templateId: p.templateId,
        updatedAt: p.updatedAt,
        published: p.published,
        username: p.username,
        version: p.version || 1
      }));
      localStorage.setItem('buildeasy_portfolios_list_v2', JSON.stringify(listMetadata));

      setSaveStatus('saved');
      return true;
    } catch (err) {
      console.error('Failed to flush save portfolios:', err);
      setSaveStatus('failed');
      return false;
    }
  };

  // Debounced Autosave Effect
  useEffect(() => {
    // Detect if we have actual changes compared to disk to prevent redundant writes
    let hasActualChanges = false;
    try {
      portfolios.forEach(p => {
        const cached = localStorage.getItem(`buildeasy_portfolio_data_${p.id}`);
        if (!cached || cached !== JSON.stringify(p)) {
          hasActualChanges = true;
        }
      });
      const cachedList = localStorage.getItem('buildeasy_portfolios_list_v2');
      const currentListMetadata = portfolios.map(p => ({
        id: p.id,
        name: p.name,
        templateId: p.templateId,
        updatedAt: p.updatedAt,
        published: p.published,
        username: p.username,
        version: p.version || 1
      }));
      if (!cachedList || cachedList !== JSON.stringify(currentListMetadata)) {
        hasActualChanges = true;
      }
    } catch (e) {
      hasActualChanges = true;
    }

    if (!hasActualChanges) {
      return;
    }

    // Edits are in progress
    if (navigator.onLine) {
      setSaveStatus('saving');
    } else {
      setSaveStatus('offline');
    }

    if (pendingSaveTimeoutRef.current) {
      clearTimeout(pendingSaveTimeoutRef.current);
    }

    pendingSaveTimeoutRef.current = setTimeout(() => {
      try {
        if (!navigator.onLine) {
          setSaveStatus('offline');
          return;
        }

        // Save each portfolio to its own isolated key
        portfolios.forEach(p => {
          localStorage.setItem(`buildeasy_portfolio_data_${p.id}`, JSON.stringify(p));
        });

        // Save metadata list index
        const listMetadata = portfolios.map(p => ({
          id: p.id,
          name: p.name,
          templateId: p.templateId,
          updatedAt: p.updatedAt,
          published: p.published,
          username: p.username,
          version: p.version || 1
        }));
        localStorage.setItem('buildeasy_portfolios_list_v2', JSON.stringify(listMetadata));

        setSaveStatus('saved');
      } catch (err) {
        console.error('Failed to autosave portfolios:', err);
        setSaveStatus('failed');
      }
    }, 1000); // 1-second typing debounce

    return () => {};
  }, [portfolios]);

  // Unsaved Changes Leave Warning Protection
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (saveStatus === 'saving') {
        const msg = 'Some portfolio edits are still saving. Are you sure you want to exit?';
        e.returnValue = msg;
        return msg;
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [saveStatus]);

  // Cross-tab Synchronization and Conflict Resolution
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key && e.key.startsWith('buildeasy_portfolio_data_')) {
        const portId = e.key.replace('buildeasy_portfolio_data_', '');
        try {
          const newValueStr = e.newValue;
          if (newValueStr) {
            const freshPort = JSON.parse(newValueStr);
            setPortfolios(prev => {
              const matched = prev.find(p => p.id === portId);
              if (matched && JSON.stringify(matched) !== newValueStr) {
                // Merge if the incoming portfolio is newer or modified by another tab
                return prev.map(p => p.id === portId ? validateAndCleanPortfolio(freshPort) : p);
              }
              return prev;
            });
          }
        } catch (err) {
          console.error('Failed to parse cross-tab storage synchronizer:', err);
        }
      } else if (e.key === 'buildeasy_portfolios_list_v2') {
        try {
          const listStr = e.newValue;
          if (listStr) {
            const freshList = JSON.parse(listStr);
            if (Array.isArray(freshList)) {
              // Reload fully populated array if index list has changed
              setPortfolios(prev => {
                const updated = freshList.map((entry: any) => {
                  const localCached = prev.find(p => p.id === entry.id);
                  if (localCached) return localCached;
                  const payloadStr = localStorage.getItem(`buildeasy_portfolio_data_${entry.id}`);
                  if (payloadStr) return validateAndCleanPortfolio(JSON.parse(payloadStr));
                  return validateAndCleanPortfolio(entry);
                });
                return updated;
              });
            }
          }
        } catch (err) {
          console.error('Failed to parse list storage updates:', err);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const [previewTemplate, setPreviewTemplate] = useState<TemplateDefinition | null>(null);
  const [publishPortfolioTarget, setPublishPortfolioTarget] = useState<UserPortfolio | null>(null);
  const [showImportModal, setShowImportModal] = useState<boolean>(false);

  // Server-side published portfolio states
  const [publicPortfolioData, setPublicPortfolioData] = useState<any | null>(null);
  const [publicPortfolioLoading, setPublicPortfolioLoading] = useState<boolean>(false);
  const [publicPortfolioError, setPublicPortfolioError] = useState<{ code: string; message: string } | null>(null);

  // Load public portfolio snapshot dynamically from Express backend
  useEffect(() => {
    if (currentView !== 'public_portfolio') {
      return;
    }

    const path = window.location.pathname;
    let uName = '';
    if (path.startsWith('/p/')) {
      uName = path.slice(3).split('/')[0];
    } else if (path.startsWith('/portfolio/')) {
      uName = path.slice(11).split('/')[0];
    }

    if (!uName) {
      setPublicPortfolioError({ code: 'NOT_FOUND', message: 'No portfolio link specified.' });
      return;
    }

    setPublicPortfolioLoading(true);
    setPublicPortfolioError(null);
    setPublicPortfolioData(null);

    fetch(`/api/published/${uName.toLowerCase()}`)
      .then(res => {
        if (!res.ok) {
          if (res.status === 404) {
            throw { code: 'NOT_FOUND', message: 'The portfolio link you are trying to visit does not exist or has been unpublished by the creator.' };
          } else if (res.status === 403) {
            throw { code: 'UNPUBLISHED', message: 'This portfolio has been unpublished by the creator.' };
          } else {
            throw { code: 'SERVER_ERROR', message: 'An unexpected database error occurred.' };
          }
        }
        return res.json();
      })
      .then(data => {
        setPublicPortfolioData(data);
        setPublicPortfolioLoading(false);
        
        // Update browser document metadata dynamically (Requirement 18)
        try {
          const profileName = data.data?.profile?.name || data.name;
          const userTitle = data.data?.profile?.title || 'Portfolio';
          document.title = `${profileName} — ${userTitle}`;

          // Update description meta tag
          const bioText = data.data?.profile?.bio || data.data?.about?.aboutText || '';
          if (bioText) {
            let metaDesc = document.querySelector('meta[name="description"]');
            if (!metaDesc) {
              metaDesc = document.createElement('meta');
              metaDesc.setAttribute('name', 'description');
              document.head.appendChild(metaDesc);
            }
            metaDesc.setAttribute('content', bioText.slice(0, 160));
          }
        } catch (metadataError) {
          console.error('Failed to set document metadata:', metadataError);
        }
      })
      .catch(err => {
        console.error('Failed to fetch published portfolio snapshot:', err);
        setPublicPortfolioError({
          code: err.code || 'CONNECTION_ERROR',
          message: err.message || 'Unable to connect to BuildEasy server database.'
        });
        setPublicPortfolioLoading(false);
      });
  }, [currentView]);

  const activePortfolio = portfolios.find(p => p.id === activePortfolioId) || portfolios[0];
  const activeTemplate = getTemplateById(activePortfolio?.templateId);

  // Synchronize browser history and URL search params whenever currentView or activePortfolioId changes
  useEffect(() => {
    try {
      const path = window.location.pathname;
      if (path.startsWith('/p/') || path.startsWith('/portfolio/')) {
        return;
      }

      const newUrl = new URL(window.location.href);
      if (currentView === 'landing') {
        newUrl.pathname = '/';
        newUrl.search = '';
      } else if (currentView === 'gallery') {
        newUrl.pathname = '/';
        newUrl.searchParams.set('view', 'gallery');
        newUrl.searchParams.delete('template');
        newUrl.searchParams.delete('t');
      } else if (currentView === 'builder') {
        newUrl.pathname = '/';
        newUrl.searchParams.set('view', 'builder');
        if (activePortfolio) {
          newUrl.searchParams.set('template', activePortfolio.templateId);
        }
      } else if (currentView === 'dash') {
        newUrl.pathname = '/';
        newUrl.searchParams.set('view', 'dash');
        newUrl.searchParams.delete('template');
        newUrl.searchParams.delete('t');
      } else if (currentView === 'published') {
        newUrl.pathname = '/';
        newUrl.searchParams.set('view', 'published');
      }
      
      if (window.location.search !== newUrl.search || window.location.pathname !== newUrl.pathname) {
        window.history.pushState({}, '', newUrl.toString());
      }
    } catch (e) {
      console.error('Failed to sync URL with active view:', e);
    }
  }, [currentView, activePortfolioId, activePortfolio]);

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

  const handleUpdatePublish = (
    published: boolean, 
    username: string, 
    metadata?: { publicUrl?: string; version?: number; publishedAt?: string }
  ) => {
    setPortfolios(prev => prev.map(p => {
      if (publishPortfolioTarget && p.id === publishPortfolioTarget.id) {
        return { 
          ...p, 
          published, 
          username,
          publicUrl: metadata?.publicUrl || p.publicUrl,
          version: metadata?.version || (p.version ? p.version + 1 : 1),
          publishedAt: metadata?.publishedAt || p.publishedAt || new Date().toISOString(),
          publishedData: published ? JSON.parse(JSON.stringify(p.data)) : p.publishedData,
          publishedCustomizer: published ? JSON.parse(JSON.stringify(p.customizer)) : p.publishedCustomizer
        };
      }
      return p;
    }));
    if (publishPortfolioTarget) {
      setPublishPortfolioTarget(prev => {
        if (!prev) return null;
        return {
          ...prev,
          published,
          username,
          publicUrl: metadata?.publicUrl || prev.publicUrl,
          version: metadata?.version || (prev.version ? prev.version + 1 : 1),
          publishedAt: metadata?.publishedAt || prev.publishedAt || new Date().toISOString(),
          publishedData: published ? JSON.parse(JSON.stringify(prev.data)) : prev.publishedData,
          publishedCustomizer: published ? JSON.parse(JSON.stringify(prev.customizer)) : prev.publishedCustomizer
        };
      });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased overflow-x-hidden w-full max-w-full">
      {currentView !== 'published' && currentView !== 'public_portfolio' && (
        <Navbar
          currentView={currentView}
          onNavigate={setCurrentView}
          onOpenImport={() => setShowImportModal(true)}
          onNewPortfolio={handleCreateNewPortfolio}
          portfolioCount={portfolios.length}
        />
      )}

      <main className="w-full max-w-full overflow-x-hidden">
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
            onOpenPublish={() => {
              flushSave(); // Flush any pending save queues before opening the publish dialog
              setPublishPortfolioTarget(activePortfolio);
            }}
            onOpenTemplateGallery={() => setCurrentView('gallery')}
            saveStatus={saveStatus}
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
              const target = portfolios.find(p => p.id === id);
              if (target && target.published && target.username) {
                fetch(`/api/unpublish/${target.username.toLowerCase()}`, { 
                  method: 'POST',
                  headers: {
                    'Authorization': `Bearer ${target.creatorToken || ''}`
                  }
                })
                  .then(() => console.log('Successfully deleted/unpublished portfolio from server database.'))
                  .catch(err => console.error('Failed to unpublish deleted portfolio from server:', err));
              }
              setPortfolios(portfolios.filter(p => p.id !== id));
            }}
            onCreateNew={handleCreateNewPortfolio}
            onOpenPublish={(port) => {
              flushSave();
              setPublishPortfolioTarget(port);
            }}
          />
        )}

        {currentView === 'published' && (
          <PublishedView
            portfolio={activePortfolio}
            template={activeTemplate}
            onBackToBuilder={() => setCurrentView('builder')}
          />
        )}

        {currentView === 'public_portfolio' && (() => {
          if (publicPortfolioLoading) {
            return (
              <div className="min-h-screen bg-[#FAF9F6] dark:bg-zinc-950 flex flex-col items-center justify-center p-6 text-center select-none">
                <div className="w-8 h-8 rounded-full border-2 border-zinc-200 border-t-zinc-800 dark:border-t-zinc-200 animate-spin mb-4" />
                <p className="text-zinc-500 dark:text-zinc-400 font-serif text-xs tracking-wide">Retrieving published portfolio...</p>
              </div>
            );
          }

          if (publicPortfolioError || !publicPortfolioData) {
            const errorMsg = publicPortfolioError?.message || 'The portfolio you are looking for does not exist or has been unpublished.';
            return (
              <div className="min-h-screen bg-[#FAF9F6] dark:bg-zinc-950 flex flex-col items-center justify-center p-6 text-center">
                <div className="max-w-md bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-4">
                  <h1 className="font-serif text-2xl font-bold text-zinc-950 dark:text-zinc-50">Portfolio Not Found</h1>
                  <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed">{errorMsg}</p>
                  <button 
                    onClick={() => {
                      window.history.pushState({}, '', '/');
                      setCurrentView('landing');
                    }}
                    className="px-5 py-2.5 bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 rounded-xl text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer inline-block"
                  >
                    Go to BuildEasy Homepage
                  </button>
                </div>
              </div>
            );
          }

          // Safe fallback strategy if template no longer exists
          let tDef = templatesRegistry.find(t => t.id === publicPortfolioData.templateId);
          if (!tDef) {
            tDef = templatesRegistry.find(t => t.id === 'github-codebucks-001') || templatesRegistry[0];
          }

          return (
            <div className="min-h-screen relative bg-white dark:bg-zinc-950">
              <TemplateRenderer 
                data={publicPortfolioData.data} 
                config={publicPortfolioData.customizer} 
                rendererType={tDef.rendererType} 
              />
              
              {/* Subtle Floating Badge linking back to BuildEasy */}
              <div className="fixed bottom-4 right-4 z-50">
                <button
                  onClick={() => {
                    window.history.pushState({}, '', '/');
                    setCurrentView('landing');
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 dark:bg-zinc-900/95 text-[10px] font-semibold text-zinc-800 dark:text-zinc-200 shadow-md border border-zinc-200/90 dark:border-zinc-800 backdrop-blur-xs hover:scale-105 transition-transform cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Powered by BuildEasy</span>
                </button>
              </div>
            </div>
          );
        })()}
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
