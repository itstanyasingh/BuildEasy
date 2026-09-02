import React from 'react';
import { TemplatePreview } from './TemplatePreview';

export interface MiniPortfolioWebsiteProps {
  id: string;
  category?: string;
  name?: string;
}

/**
 * Renders the actual live portfolio website template scaled down inside card previews.
 */
export const MiniPortfolioPreview: React.FC<MiniPortfolioWebsiteProps> = ({ id }) => {
  return <TemplatePreview id={id} />;
};
