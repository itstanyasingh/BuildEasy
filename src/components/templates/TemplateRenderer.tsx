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
import { CyberOrganicDeveloperPortfolioTemplate } from './CyberOrganicDeveloperPortfolioTemplate';
import { InteractiveDeveloperPortfolioTemplate } from './InteractiveDeveloperPortfolioTemplate';
import { NikhilInteractivePortfolioTemplate } from './NikhilInteractivePortfolioTemplate';
import { ModernSoftwareDeveloperPortfolioTemplate } from './ModernSoftwareDeveloperPortfolioTemplate';
import { ReactDeveloperPortfolioTemplate } from './ReactDeveloperPortfolioTemplate';
import { ModernCreativeDeveloperPortfolioTemplate } from './ModernCreativeDeveloperPortfolioTemplate';
import { GitFolioCyberPortfolioTemplate } from './GitFolioCyberPortfolioTemplate';
import { BrittanyDeveloperPortfolioTemplate } from './BrittanyDeveloperPortfolioTemplate';
import { PersonalDeveloperPortfolioTemplate } from './PersonalDeveloperPortfolioTemplate';
import { MagicfolioPortfolioTemplate } from './MagicfolioPortfolioTemplate';
import { ThreeDCreativePortfolioTemplate } from './ThreeDCreativePortfolioTemplate';
import { MultiPageDeveloperPortfolioTemplate } from './MultiPageDeveloperPortfolioTemplate';
import { DeveloperShowcasePortfolioTemplate } from './DeveloperShowcasePortfolioTemplate';
import { HmbldvDocPortfolioTemplate } from './HmbldvDocPortfolioTemplate';
import { AstroGlassPortfolioTemplate } from './AstroGlassPortfolioTemplate';
import { KCSujeetPortfolioTemplate } from './KCSujeetPortfolioTemplate';
import { AppleStylePortfolioTemplate } from './AppleStylePortfolioTemplate';
import { OperatorPortfolioTemplate } from './OperatorPortfolioTemplate';
import { WindowedPortfolioTemplate } from './WindowedPortfolioTemplate';
import { X100VisualPortfolioTemplate } from './X100VisualPortfolioTemplate';
import { PaperframeEditorialTemplate } from './PaperframeEditorialTemplate';
import { RustfolioBrutalistTemplate } from './RustfolioBrutalistTemplate';
import { MaisonLuxuryPortfolioTemplate } from './MaisonLuxuryPortfolioTemplate';

interface TemplateRendererProps {
  data: PortfolioData;
  config: LayoutConfiguration;
  rendererType: string;
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({ data, config, rendererType }) => {
  const typeLower = (rendererType || '').toLowerCase();

  switch (typeLower) {
    case 'maison-luxury-portfolio':
    case 'maison':
    case 'maison-luxury':
      return <MaisonLuxuryPortfolioTemplate data={data} config={config} />;
    case 'rustfolio-brutalist':
    case 'rustfolio':
    case 'rust-portfolio':
      return <RustfolioBrutalistTemplate data={data} config={config} />;
    case 'paperframe-editorial':
    case 'paperframe':
    case 'paperframe-portfolio':
      return <PaperframeEditorialTemplate data={data} config={config} />;
    case 'x100-visual-portfolio':
    case 'x100':
    case 'x100-visual-story':
      return <X100VisualPortfolioTemplate data={data} config={config} />;
    case 'windowed-portfolio':
    case 'windowed':
      return <WindowedPortfolioTemplate data={data} config={config} />;
    case 'operator-portfolio':
    case 'operator':
    case 'github-operator-031':
      return <OperatorPortfolioTemplate data={data} config={config} />;
    case 'apple-style-portfolio':
    case 'apple-portfolio':
    case 'apple-style':
    case 'larryxue':
    case 'larry-xue':
    case 'github-apple-style-030':
      return <AppleStylePortfolioTemplate data={data} config={config} />;
    case 'kcsujeet-portfolio':
    case 'kcsujeet':
    case 'github-kcsujeet-029':
      return <KCSujeetPortfolioTemplate data={data} config={config} />;
    case 'astro-glass':
    case 'astro-portfolio':
    case 'mohammedaljer':
    case 'glassmorphic':
    case 'github-astro-glass-028':
      return <AstroGlassPortfolioTemplate data={data} config={config} />;
    case 'doc-portfolio':
    case 'hmbldv':
    case 'hmbldv-doc-portfolio':
    case 'documentation-portfolio':
    case 'github-hmbldv-027':
      return <HmbldvDocPortfolioTemplate data={data} config={config} />;
    case 'developer-showcase':
    case 'developershowcase':
    case 'developer-showcase-portfolio':
    case '1hanzla100':
    case '1hanzla100-portfolio':
    case 'github-1hanzla100-026':
      return <DeveloperShowcasePortfolioTemplate data={data} config={config} />;
    case 'multipage-developer':
    case 'multipage':
    case 'multipage-portfolio':
    case 'paytonjewell':
    case 'paytonjewell-portfolio':
    case 'github-paytonjewell-025':
      return <MultiPageDeveloperPortfolioTemplate data={data} config={config} />;
    case '3d-creative':
    case '3dcreative':
    case 'shaqdeff':
    case 'shaqdeff-portfolio':
    case 'creative-developer-3d':
    case 'github-shaqdeff-024':
      return <ThreeDCreativePortfolioTemplate data={data} config={config} />;
    case 'personal-developer':
    case 'personaldeveloper':
    case 'eluda':
    case 'eludadev':
    case 'eludadev-portfolio':
    case 'github-eludadev-022':
      return <PersonalDeveloperPortfolioTemplate data={data} config={config} />;
    case 'magicfolio':
    case 'magicfolio-portfolio':
    case 'minimal-modern-developer':
    case 'github-magicfolio-023':
      return <MagicfolioPortfolioTemplate data={data} config={config} />;
    case 'brittany-developer':
    case 'brittanydeveloper':
    case 'brittany':
    case 'bchiang7':
    case 'bchiang7-v4':
    case 'github-bchiang7-021':
      return <BrittanyDeveloperPortfolioTemplate data={data} config={config} />;
    case 'gitfolio-cyber':
    case 'gitfoliocyber':
    case 'gitfolio':
    case 'cyberpunk-developer':
    case 'github-gitfolio-020':
      return <GitFolioCyberPortfolioTemplate data={data} config={config} />;
    case 'modern-creative-developer':
    case 'moderncreativedeveloper':
    case 'chetanverma':
    case 'chetan':
    case 'github-chetanverma-019':
      return <ModernCreativeDeveloperPortfolioTemplate data={data} config={config} />;
    case 'react-developer':
    case 'reactdeveloper':
    case 'yujisato':
    case 'yujisatojr':
    case 'github-yujisato-018':
      return <ReactDeveloperPortfolioTemplate data={data} config={config} />;
    case 'modern-software-developer':
    case 'modernsoftwaredeveloper':
    case 'hanzla':
    case 'hanzla-developer':
    case 'github-hanzla-017':
      return <ModernSoftwareDeveloperPortfolioTemplate data={data} config={config} />;
    case 'nikhil':
    case 'nikhil-interactive':
    case 'nikhil-interactive-developer':
    case 'github-nixrajput-016':
    case 'nixrajput-portfolio':
    case 'interactive-creative':
    case 'interactive-creative-developer':
      return <NikhilInteractivePortfolioTemplate data={data} config={config} />;
    case 'interactive-developer':
    case 'interactivedeveloper':
    case 'github-sudhanva-015':
    case 'sudhanva-portfolio':
      return <InteractiveDeveloperPortfolioTemplate data={data} config={config} />;
    case 'cyber-organic':
    case 'cyberorganic':
    case 'cyber-organic-developer':
    case 'github-cyber-organic-014':
    case 'modern-portfolio-template':
    case 'terminal':
      return <CyberOrganicDeveloperPortfolioTemplate data={data} config={config} />;
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
