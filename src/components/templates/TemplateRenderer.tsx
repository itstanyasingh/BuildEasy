import React from 'react';
import { PortfolioData, LayoutConfiguration } from '../../types';
import { CodeBucksDeveloperPortfolioTemplate } from './CodeBucksDeveloperPortfolioTemplate';
import { Interactive3DDeveloperPortfolioTemplate } from './Interactive3DDeveloperPortfolioTemplate';
import { FolioTemplate } from './FolioTemplate';
import { HamishPortfolioTemplate } from './HamishPortfolioTemplate';
import { MagicUIPortfolioTemplate } from './MagicUIPortfolioTemplate';
import { NixPortfolioTemplate } from './NixPortfolioTemplate';
import { VSCodePortfolioTemplate } from './VSCodePortfolioTemplate';
import { YujiPortfolioTemplate } from './YujiPortfolioTemplate';
import { CleanfolioPortfolioTemplate } from './CleanfolioPortfolioTemplate';
import { DanielCinematicPortfolioTemplate } from './DanielCinematicPortfolioTemplate';
import { KalvinMountainPortfolioTemplate } from './KalvinMountainPortfolioTemplate';
import { AlexEditorialBentoPortfolioTemplate } from './AlexEditorialBentoPortfolioTemplate';

interface TemplateRendererProps {
  data: PortfolioData;
  config: LayoutConfiguration;
  rendererType: string;
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({ data, config, rendererType }) => {
  const typeLower = (rendererType || '').toLowerCase();

  switch (typeLower) {
    case 'interactive3d':
    case 'interactive-3d':
    case 'threejs':
    case 'threejs-portfolio':
    case 'github-adrian-002':
    case 'interactive-3d-developer-portfolio':
      return <Interactive3DDeveloperPortfolioTemplate data={data} config={config} />;

    case 'github-folio-003':
    case 'folio':
    case 'folio-template':
    case 'folio-portfolio':
      return <FolioTemplate data={data} config={config} />;

    case 'github-hamish-004':
    case 'cyberpunk':
    case 'cyberpunk-portfolio':
    case 'hamish':
    case 'hamish-portfolio':
      return <HamishPortfolioTemplate data={data} config={config} />;

    case 'github-magicui-005':
    case 'magicui':
    case 'magic-ui':
    case 'magicui-portfolio':
    case 'magic-ui-minimal-portfolio':
      return <MagicUIPortfolioTemplate data={data} config={config} />;

    case 'github-nixrajput-007':
    case 'nixrajput':
    case 'nixrajput-portfolio':
    case 'aceternity':
    case 'aceternity-portfolio':
      return <NixPortfolioTemplate data={data} config={config} />;

    case 'github-vscode-008':
    case 'vscode':
    case 'vscode-portfolio':
    case 'vscode-developer-portfolio':
      return <VSCodePortfolioTemplate data={data} config={config} />;

    case 'github-yuji-009':
    case 'yuji':
    case 'yuji-portfolio':
    case 'yuji-developer-portfolio':
    case 'classic-react-developer-portfolio':
      return <YujiPortfolioTemplate data={data} config={config} />;

    case 'github-cleanfolio-010':
    case 'cleanfolio':
    case 'cleanfolio-portfolio':
    case 'cleanfolio-developer-portfolio':
    case 'clean-developer-portfolio':
      return <CleanfolioPortfolioTemplate data={data} config={config} />;

    case 'github-daniel-011':
    case 'daniel':
    case 'daniel-cinematic':
    case 'daniel-portfolio':
    case 'daniel-cinematic-portfolio':
    case 'cinematic-portfolio':
      return <DanielCinematicPortfolioTemplate data={data} config={config} />;

    case 'github-kalvin-012':
    case 'kalvin':
    case 'kalvin-mountain':
    case 'kalvin-portfolio':
    case 'mountain-creative':
    case 'mountain-portfolio':
      return <KalvinMountainPortfolioTemplate data={data} config={config} />;

    case 'github-alex-013':
    case 'alex':
    case 'alex-editorial-bento':
    case 'alex-bento':
    case 'editorial-bento':
    case 'alex-portfolio':
      return <AlexEditorialBentoPortfolioTemplate data={data} config={config} />;

    case 'codebucks':
    case 'codebucksportfolio':
    case 'codebucks-developer-portfolio':
    case 'github-codebucks-001':
    default:
      return <CodeBucksDeveloperPortfolioTemplate data={data} config={config} />;
  }
};
