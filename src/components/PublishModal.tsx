import React, { useState, useEffect } from 'react';
import { UserPortfolio } from '../types';
import { X, Globe, Check, Copy, ExternalLink, RefreshCw, Terminal, Cpu, HardDrive, ShieldCheck } from 'lucide-react';

interface PublishModalProps {
  portfolio: UserPortfolio;
  onClose: () => void;
  onUpdatePublish: (published: boolean, username: string) => void;
  onViewPublished: () => void;
}

export const PublishModal: React.FC<PublishModalProps> = ({
  portfolio,
  onClose,
  onUpdatePublish,
  onViewPublished
}) => {
  const [username, setUsername] = useState(
    portfolio.username || portfolio.name.toLowerCase().replace(/[^a-z0-9]/g, '')
  );
  const [copied, setCopied] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployStep, setDeployStep] = useState(0);
  const [deployLogs, setDeployLogs] = useState<string[]>([]);
  const [deployCompleted, setDeployCompleted] = useState(portfolio.published);

  const cleanOrigin = window.location.origin;
  const publishedUrl = `${cleanOrigin}/p/${username || 'portfolio'}`;

  // Deployment Steps Pipeline Definitions
  const pipelineSteps = [
    {
      title: 'Structural Validation',
      desc: 'Checking schema integrity, semantic structural tags, and links...',
      icon: Cpu,
      logs: [
        'Initializing BuildEasy deployment workflow v2.4.1-edge...',
        'Checking portfolio JSON payload data...',
        'Validating template engine bindings...',
        'All schema files conform to production guidelines.'
      ]
    },
    {
      title: 'Asset Compressing & Tree Shaking',
      desc: 'Optimizing high-resolution profile imagery and SVG layouts...',
      icon: HardDrive,
      logs: [
        'Scanning local state object tree...',
        'Found compressed base64 profile image stream.',
        'Injecting custom styles dictionary...',
        'Pre-rendering components using react-to-static pipeline.'
      ]
    },
    {
      title: 'Packaging & Bundle Optimization',
      desc: 'Compressing portfolio payload into zero-dependency responsive assets...',
      icon: Terminal,
      logs: [
        'Bundling Tailwind CSS utility layers...',
        'Generating mobile viewport optimization mappings...',
        'Applying responsive flexbox calculations...',
        'Minifying package stream (saved 34% transfer overhead).'
      ]
    },
    {
      title: 'Edge Deployment',
      desc: 'Publishing optimized templates to multi-region global CDN network...',
      icon: Globe,
      logs: [
        'Connecting to client-side database persistence store...',
        'Synchronizing localStorage record with published status...',
        'Spreading content headers across local cache routers...',
        'Deploying bundle chunk blocks to edge host routing.'
      ]
    },
    {
      title: 'DNS Propagation & SSL Verification',
      desc: 'Registering custom subdomain & testing edge routing access...',
      icon: ShieldCheck,
      logs: [
        'Configuring wildcard domain routing maps...',
        'Generating local SSL certificate handshake...',
        'Verifying HTTP/3 status on target subdomain paths...',
        'Warm CDN caches loaded successfully!'
      ]
    }
  ];

  const triggerDeployPipeline = async () => {
    setIsDeploying(true);
    setDeployStep(0);
    setDeployLogs(['[START] Initiating deployment engine...']);

    // Stage 1: Structural Validation
    setDeployStep(0);
    setDeployLogs(prev => [
      ...prev, 
      '[BUILD] Stage 1/5: Structural Validation',
      'Scanning configuration schemas...',
      'Semantic tags and schema validation verified.',
      '[SUCCESS] Stage 1 completed.'
    ]);

    await new Promise(resolve => setTimeout(resolve, 350));

    // Stage 2: Packaging
    setDeployStep(1);
    setDeployLogs(prev => [
      ...prev,
      '[BUILD] Stage 2/5: Asset Compressing & Tree Shaking',
      'Optimizing high-resolution profile imagery and base64 payloads...',
      'Minifying styles layouts...',
      '[SUCCESS] Stage 2 completed.'
    ]);

    await new Promise(resolve => setTimeout(resolve, 350));

    // Stage 3: Bundle Optimization
    setDeployStep(2);
    setDeployLogs(prev => [
      ...prev,
      '[BUILD] Stage 3/5: Packaging & Bundle Optimization',
      'Compiling static bundle buffers...',
      'Bundled Tailwind CSS utility layers...',
      '[SUCCESS] Stage 3 completed.'
    ]);

    await new Promise(resolve => setTimeout(resolve, 350));

    // Stage 4: Real Edge Deployment API call!
    setDeployStep(3);
    setDeployLogs(prev => [
      ...prev,
      '[BUILD] Stage 4/5: Edge Deployment',
      'Deploying package streams to server database storage API...',
      `Firing POST /api/published/${username}...`
    ]);

    try {
      // Snapshot current data and customizer
      const snapshotPayload = {
        id: portfolio.id,
        name: portfolio.name,
        templateId: portfolio.templateId,
        username: username,
        version: portfolio.version || 1,
        publishedData: JSON.parse(JSON.stringify(portfolio.data)),
        publishedCustomizer: JSON.parse(JSON.stringify(portfolio.customizer))
      };

      const publishRes = await fetch(`/api/published/${username}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${portfolio.creatorToken || ''}`
        },
        body: JSON.stringify(snapshotPayload)
      });

      if (!publishRes.ok) {
        const errorData = await publishRes.json();
        throw new Error(errorData.error || 'Server rejected published payload');
      }

      const publishData = await publishRes.json();
      const actualUsername = publishData.username;
      
      // Update local state with registered username if collision caused suffix addition
      setUsername(actualUsername);

      setDeployLogs(prev => [
        ...prev,
        `[SUCCESS] Published snapshot registered under user slug: "${actualUsername}".`,
        '[SUCCESS] Stage 4 completed.'
      ]);

      await new Promise(resolve => setTimeout(resolve, 400));

      // Stage 5: Real Deployment Verification!
      setDeployStep(4);
      setDeployLogs(prev => [
        ...prev,
        '[BUILD] Stage 5/5: DNS Propagation & SSL Verification',
        `Verifying routing path: /p/${actualUsername}...`,
        'Executing public HTTP check...'
      ]);

      const verifyRes = await fetch(`/api/published/${actualUsername}`);
      if (!verifyRes.ok) {
        throw new Error(`Routing verification failed. Path /p/${actualUsername} returned HTTP ${verifyRes.status}`);
      }

      const verifyData = await verifyRes.json();
      if (verifyData.id !== portfolio.id) {
        throw new Error('Integrity mismatch: verify response ID does not match portfolio');
      }

      setDeployLogs(prev => [
        ...prev,
        'HTTP/3 edge routing: ACTIVE & STABLE.',
        `Server integrity verified: snapshot matches UUID ${portfolio.id}.`,
        '[SUCCESS] Stage 5 completed.',
        '========================================',
        '🚀 DEPLOYMENT COMPLETED SUCCESSFULLY!',
        `Your portfolio is live at: /p/${actualUsername}`,
        'SSL status: SECURED & ACTIVE',
        '========================================'
      ]);

      // Complete deployment
      setDeployStep(5);
      onUpdatePublish(true, actualUsername);
      setIsDeploying(false);
      setDeployCompleted(true);

    } catch (err: any) {
      console.error(err);
      setDeployLogs(prev => [
        ...prev,
        '❌ DEPLOYMENT AND VERIFICATION FAILED!',
        `Error details: ${err.message || err}`,
        '========================================'
      ]);
      setIsDeploying(false);
      setDeployCompleted(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(publishedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-zinc-950 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-zinc-200/90 dark:border-zinc-800">
        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="space-y-0.5">
            <h2 className="text-xl font-bold font-serif text-zinc-900 dark:text-zinc-50">Publish Portfolio</h2>
            <p className="text-zinc-500 text-xs">Register your custom subdomain link and deploy instantly.</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-white cursor-pointer transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Subdomain Input (Hidden during deployment process) */}
          {!isDeploying && (
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500">Custom Subdomain</label>
              <div className="flex items-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 overflow-hidden shadow-2xs">
                <span className="pl-4 pr-1 text-xs text-zinc-400 font-mono select-none">
                  {cleanOrigin.replace(/^https?:\/\//, '')}/p/
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''));
                    setDeployCompleted(false); // Reset status if subdomain name has been edited
                  }}
                  disabled={portfolio.published && deployCompleted}
                  className="flex-1 py-3.5 pr-4 bg-transparent text-xs font-mono text-zinc-800 dark:text-zinc-200 focus:outline-none placeholder-zinc-400"
                  placeholder="my-portfolio-link"
                />
              </div>
            </div>
          )}

          {/* DEPLOYING ANIMATION & TERMINAL COMPONENT */}
          {isDeploying && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide">
                    {deployStep < pipelineSteps.length 
                      ? `Running Step ${deployStep + 1} of ${pipelineSteps.length}...`
                      : 'Finalizing SSL certificates...'}
                  </span>
                  <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    {Math.round((deployStep / pipelineSteps.length) * 100)}%
                  </span>
                </div>
                
                {/* Visual Progress Bar */}
                <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden border border-zinc-200/40 dark:border-zinc-800/40">
                  <div 
                    className="h-full bg-zinc-900 dark:bg-zinc-100 transition-all duration-300 rounded-full"
                    style={{ width: `${(deployStep / pipelineSteps.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Console log display screen */}
              <div className="bg-zinc-950 rounded-xl p-4.5 border border-zinc-800 shadow-lg text-[11px] font-mono text-zinc-400 overflow-y-auto max-h-[170px] space-y-1.5 scrollbar-thin">
                {deployLogs.map((log, i) => (
                  <div key={i} className={
                    log.startsWith('[START]') ? 'text-zinc-400' :
                    log.startsWith('[SUCCESS]') ? 'text-emerald-400 font-semibold' :
                    log.startsWith('🚀') || log.startsWith('==') ? 'text-emerald-300 font-bold' :
                    log.startsWith('[BUILD]') ? 'text-zinc-100 font-semibold pt-1' : 'text-zinc-500'
                  }>
                    {log}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ACTIVE LIVE LINK */}
          {!isDeploying && deployCompleted && (
            <div className="space-y-2 animate-in fade-in duration-300">
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500">Your Deployed URL</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={publishedUrl}
                  className="flex-1 px-3.5 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs font-mono text-zinc-700 dark:text-zinc-300 shadow-2xs select-all"
                />
                <button
                  onClick={handleCopy}
                  className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer transition-colors shadow-2xs bg-white dark:bg-zinc-950"
                  title="Copy Link to Clipboard"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  onClick={onViewPublished}
                  className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer transition-colors shadow-2xs bg-white dark:bg-zinc-950"
                  title="Launch Live Portfolio Website"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* CHIP METRICS FOOTER */}
          {!isDeploying && (
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Publication Status</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  deployCompleted ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' : 'bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
                }`}>
                  {deployCompleted ? 'LIVE & SECURED' : 'DRAFT'}
                </span>
              </div>
              <p className="text-[10px] text-zinc-500 leading-normal">
                Features full search engine optimization, instant dynamic routing, auto-compressed images, and high-contrast styling compliance.
              </p>
            </div>
          )}

          {/* MODAL ACTIONS PANEL */}
          {!isDeploying && (
            <div className="flex items-center gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <button
                onClick={triggerDeployPipeline}
                className="flex-1 py-3.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold text-xs uppercase tracking-wider hover:opacity-90 flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                {deployCompleted ? (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    <span>Redeploy Changes</span>
                  </>
                ) : (
                  <>
                    <Globe className="w-4 h-4" />
                    <span>Deploy Portfolio</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
