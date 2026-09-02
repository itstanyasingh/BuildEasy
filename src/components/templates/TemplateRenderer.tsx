import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
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
import { CinematicSarangPortfolioTemplate } from './CinematicSarangPortfolioTemplate';

// Helper to normalize image sources so they work across different hostnames, protocols, and absolute/relative boundaries
const normalizeImgSrc = (src: string): string => {
  if (!src) return '';
  if (src.startsWith('data:')) return src;
  
  try {
    const url = new URL(src, window.location.origin);
    if (url.origin === window.location.origin) {
      return url.pathname + url.search;
    }
    return url.href;
  } catch (err) {
    return src;
  }
};

// Recursively walks the PortfolioData state to update target values (normalized or exact matches) with the new base64 data URL
const updateValueInObject = (obj: any, targetValue: string, newValue: string): any => {
  if (!obj) return obj;
  if (typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    return obj.map(item => updateValueInObject(item, targetValue, newValue));
  }

  const newObj = { ...obj };
  let modified = false;

  const targetNorm = normalizeImgSrc(targetValue);

  for (const key in newObj) {
    if (Object.prototype.hasOwnProperty.call(newObj, key)) {
      const val = newObj[key];
      if (typeof val === 'string') {
        const valNorm = normalizeImgSrc(val);
        // Direct match, normalized match, or partial URL match (if it's a long external Unsplash URL)
        const isMatch = val === targetValue || 
                        valNorm === targetNorm || 
                        (val.includes(targetValue) && targetValue.length > 15) || 
                        (targetValue.includes(val) && val.length > 15);
        if (isMatch) {
          newObj[key] = newValue;
          modified = true;
        }
      } else if (typeof val === 'object' && val !== null) {
        const updatedVal = updateValueInObject(val, targetValue, newValue);
        if (updatedVal !== val) {
          newObj[key] = updatedVal;
          modified = true;
        }
      }
    }
  }

  return modified ? newObj : obj;
};

interface ImageEditWrapperProps {
  children: React.ReactNode;
  data: PortfolioData;
  isEditable: boolean;
  onUpdateData?: (updater: (prev: PortfolioData) => PortfolioData) => void;
}

export const ImageEditWrapper: React.FC<ImageEditWrapperProps> = ({
  children,
  data,
  isEditable,
  onUpdateData
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);
  const [activeTarget, setActiveTarget] = useState<{ element: HTMLElement; src: string } | null>(null);
  const [overlayStyle, setOverlayStyle] = useState<React.CSSProperties | null>(null);
  const [errorToast, setErrorToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setErrorToast(message);
    setTimeout(() => {
      setErrorToast((prev) => prev === message ? null : prev);
    }, 4500);
  };

  // Helper to extract the editable target element & its original source from any hover or click target
  const getEditableTarget = (target: HTMLElement): { element: HTMLElement; src: string } | null => {
    if (!target) return null;

    let current: HTMLElement | null = target;
    let level = 0;

    while (current && level < 4) {
      // 1. Is it an IMG tag directly?
      if (current.tagName === 'IMG') {
        const img = current as HTMLImageElement;
        if (img.offsetWidth >= 30 && img.offsetHeight >= 30) {
          const src = img.getAttribute('data-original-src') || img.src;
          if (src && !src.startsWith('data:')) {
            return { element: img, src };
          }
        }
      }

      // 2. Does it have a child IMG?
      const childImg = current.querySelector('img');
      if (childImg) {
        if (childImg.offsetWidth >= 30 && childImg.offsetHeight >= 30) {
          const src = childImg.getAttribute('data-original-src') || childImg.src;
          if (src && !src.startsWith('data:')) {
            return { element: childImg, src };
          }
        }
      }

      // 3. Does it have background-image style directly?
      if (current.style && current.style.backgroundImage) {
        const bg = current.style.backgroundImage;
        const match = bg.match(/url\(["']?([^"']+)["']?\)/);
        if (match) {
          const src = current.getAttribute('data-original-bg') || match[1];
          if (src && !src.startsWith('data:')) {
            return { element: current, src };
          }
        }
      }

      // 4. Does it have a child with background-image style?
      const childBg = current.querySelector('[style*="background-image"]');
      if (childBg) {
        const el = childBg as HTMLElement;
        const bg = el.style.backgroundImage;
        const match = bg.match(/url\(["']?([^"']+)["']?\)/);
        if (match) {
          const src = el.getAttribute('data-original-bg') || match[1];
          if (src && !src.startsWith('data:')) {
            return { element: el, src };
          }
        }
      }

      current = current.parentElement;
      level++;
    }

    return null;
  };

  // Helper to update img sources and background-images in the DOM
  const updateImages = () => {
    if (!containerRef.current) return;

    // A. Update regular img tags
    const imgs = containerRef.current.querySelectorAll('img');
    imgs.forEach((img) => {
      if (img.closest('.image-edit-overlay-container')) return;

      let originalSrc = img.getAttribute('data-original-src');
      if (!originalSrc) {
        originalSrc = img.src;
        if (originalSrc && !originalSrc.startsWith('data:')) {
          img.setAttribute('data-original-src', originalSrc);
        }
      }

      if (originalSrc) {
        const normOriginal = normalizeImgSrc(originalSrc);
        const replacement = data?.imageReplacements?.[normOriginal] || data?.imageReplacements?.[originalSrc];
        const targetSrc = replacement || originalSrc;
        if (img.src !== targetSrc) {
          img.src = targetSrc;
        }
      }
    });

    // B. Update inline styles with background-images
    const bgs = containerRef.current.querySelectorAll('[style*="background-image"]');
    bgs.forEach((bgEl) => {
      if (bgEl.closest('.image-edit-overlay-container')) return;
      const el = bgEl as HTMLElement;

      const bgStyle = el.style.backgroundImage;
      const match = bgStyle.match(/url\(["']?([^"']+)["']?\)/);
      if (match) {
        let originalBg = el.getAttribute('data-original-bg');
        if (!originalBg) {
          originalBg = match[1];
          if (originalBg && !originalBg.startsWith('data:')) {
            el.setAttribute('data-original-bg', originalBg);
          }
        }

        if (originalBg) {
          const normOriginal = normalizeImgSrc(originalBg);
          const replacement = data?.imageReplacements?.[normOriginal] || data?.imageReplacements?.[originalBg];
          const expectedBg = replacement ? `url("${replacement}")` : `url("${originalBg}")`;
          if (el.style.backgroundImage !== expectedBg) {
            el.style.backgroundImage = expectedBg;
          }
        }
      }
    });
  };

  // Sync state to DOM on render/changes
  useLayoutEffect(() => {
    updateImages();

    const observer = new MutationObserver((mutations) => {
      let shouldUpdate = false;
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          shouldUpdate = true;
          break;
        } else if (mutation.type === 'attributes') {
          const target = mutation.target as HTMLElement;
          if (target.closest && target.closest('.image-edit-overlay-container')) continue;
          shouldUpdate = true;
          break;
        }
      }
      if (shouldUpdate) {
        updateImages();
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['src', 'style'],
      });
    }

    return () => observer.disconnect();
  }, [data?.imageReplacements]);

  // Handle position tracking of the screen-space overlay
  useEffect(() => {
    if (!isEditable || !hoveredElement || !containerRef.current) {
      setOverlayStyle(null);
      return;
    }

    const handleScrollAndResize = () => {
      if (!hoveredElement) return;
      const rect = hoveredElement.getBoundingClientRect();
      const style = window.getComputedStyle(hoveredElement);

      setOverlayStyle({
        position: 'fixed',
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        borderRadius: style.borderRadius,
        pointerEvents: 'auto',
        zIndex: 99999,
      });
    };

    // Use capturing to listen to scroll events inside any nested scroll containers
    window.addEventListener('scroll', handleScrollAndResize, { capture: true });
    window.addEventListener('resize', handleScrollAndResize);

    handleScrollAndResize();

    return () => {
      window.removeEventListener('scroll', handleScrollAndResize, { capture: true });
      window.removeEventListener('resize', handleScrollAndResize);
    };
  }, [hoveredElement, isEditable]);

  // Global mousemove tracker to cleanly tear down hovers when exiting boundary
  useEffect(() => {
    if (!isEditable || !hoveredElement) return;

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const editable = getEditableTarget(target);
      const isOverOverlay = target.closest('.image-edit-overlay-container');

      if (!isOverOverlay && (!editable || editable.element !== hoveredElement)) {
        setHoveredElement(null);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [hoveredElement, isEditable]);

  const handleMouseOver = (e: React.MouseEvent) => {
    if (!isEditable) return;
    const target = e.target as HTMLElement;
    const editable = getEditableTarget(target);
    if (editable) {
      setHoveredElement(editable.element);
    }
  };

  const handleContainerClickCapture = (e: React.MouseEvent) => {
    if (!isEditable) return;
    const target = e.target as HTMLElement;
    const editable = getEditableTarget(target);

    if (editable) {
      // Intercept and handle click immediately, preventing default link/button actions
      e.preventDefault();
      e.stopPropagation();

      setActiveTarget(editable);
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (hoveredElement) {
      const isImg = hoveredElement.tagName === 'IMG';
      const src = isImg 
        ? hoveredElement.getAttribute('data-original-src') || (hoveredElement as HTMLImageElement).src 
        : hoveredElement.getAttribute('data-original-bg') || '';

      setActiveTarget({ element: hoveredElement, src });
    }

    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Helpers relocated to file-level scope

  const handleResetClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const target = activeTarget || (hoveredElement ? {
      element: hoveredElement,
      src: hoveredElement.tagName === 'IMG'
        ? hoveredElement.getAttribute('data-original-src') || (hoveredElement as HTMLImageElement).src
        : hoveredElement.getAttribute('data-original-bg') || ''
    } : null);

    if (target && onUpdateData) {
      const originalSrc = target.src;
      const normOriginal = normalizeImgSrc(originalSrc);

      onUpdateData((prev) => {
        // 1. Remove from replacements dictionary
        const imageReplacements = { ...(prev.imageReplacements || {}) };
        const currentDataUrl = imageReplacements[originalSrc] || imageReplacements[normOriginal];

        delete imageReplacements[originalSrc];
        delete imageReplacements[normOriginal];

        // 2. Perform deep traversal replacement to restore the original URL
        let updatedData = prev;
        if (currentDataUrl) {
          updatedData = updateValueInObject(updatedData, currentDataUrl, originalSrc);
        }

        // 3. Preserve imageReplacements
        updatedData.imageReplacements = imageReplacements;

        return updatedData;
      });
      setHoveredElement(null);
      setActiveTarget(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file.');
      e.target.value = '';
      return;
    }

    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_SIZE) {
      showToast('Image is too large. Please choose an image under 10 MB.');
      e.target.value = '';
      return;
    }

    compressImage(file, (dataUrl) => {
      const target = activeTarget || (hoveredElement ? {
        element: hoveredElement,
        src: hoveredElement.tagName === 'IMG'
          ? hoveredElement.getAttribute('data-original-src') || (hoveredElement as HTMLImageElement).src
          : hoveredElement.getAttribute('data-original-bg') || ''
      } : null);

      if (target && onUpdateData) {
        const originalSrc = target.src;
        const normOriginal = normalizeImgSrc(originalSrc);

        onUpdateData((prev) => {
          // 1. Update in the imageReplacements dictionary
          const imageReplacements = { ...(prev.imageReplacements || {}) };
          imageReplacements[originalSrc] = dataUrl;
          imageReplacements[normOriginal] = dataUrl;

          // 2. Perform deep traversal replacement inside the structure
          let updatedData = updateValueInObject(prev, originalSrc, dataUrl);
          updatedData = updateValueInObject(updatedData, normOriginal, dataUrl);

          // 3. Make sure to preserve imageReplacements inside the updated structure
          updatedData.imageReplacements = imageReplacements;

          return updatedData;
        });
      }
      setHoveredElement(null);
      setActiveTarget(null);
    }, () => {
      showToast('Failed to process image. Please try another file.');
    });

    e.target.value = '';
  };

  const compressImage = (file: File, callback: (dataUrl: string) => void, onError: () => void) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const MAX_DIM = 1600;
        let width = img.width;
        let height = img.height;

        if (width > MAX_DIM || height > MAX_DIM) {
          if (width > height) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          } else {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          callback(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
        callback(dataUrl);
      };
      img.onerror = onError;
      img.src = e.target?.result as string;
    };
    reader.onerror = onError;
    reader.readAsDataURL(file);
  };

  const currentOriginalSrc = activeTarget?.src || (hoveredElement 
    ? (hoveredElement.tagName === 'IMG' 
        ? hoveredElement.getAttribute('data-original-src') || (hoveredElement as HTMLImageElement).src
        : hoveredElement.getAttribute('data-original-bg') || '')
    : '');

  const hasReplacement = !!(currentOriginalSrc && data?.imageReplacements?.[currentOriginalSrc]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full"
      onMouseOver={handleMouseOver}
      onClickCapture={handleContainerClickCapture}
    >
      {children}

      {/* Hidden File Input */}
      {isEditable && (
        <input 
          type="file" 
          ref={fileInputRef} 
          accept="image/*" 
          onChange={handleFileChange} 
          className="hidden" 
        />
      )}

      {/* Screen-Space Overlay */}
      {isEditable && overlayStyle && (
        <div 
          style={overlayStyle}
          className="group overflow-hidden transition-all duration-200 image-edit-overlay-container"
        >
          {/* Transparent click target that goes semi-dark on hover */}
          <div 
            onClick={handleOverlayClick}
            className="w-full h-full bg-black/0 hover:bg-black/55 flex flex-col items-center justify-center text-white cursor-pointer transition-all duration-200"
          >
            {/* Minimal edit icon only shown on hover */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center gap-1.5 p-2.5 text-center select-none bg-black/45 rounded-xl backdrop-blur-xs">
              <svg className="w-5 h-5 text-white drop-shadow-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs font-bold tracking-wide text-white font-sans drop-shadow-sm uppercase">
                Change Photo
              </span>
            </div>
          </div>

          {/* Minimal Floating Delete button */}
          {hasReplacement && (
            <button
              onClick={handleResetClick}
              className="absolute top-2 right-2 w-7.5 h-7.5 rounded-full bg-zinc-950/95 hover:bg-zinc-900 text-white shadow-md flex items-center justify-center transition-all hover:scale-105 z-50 cursor-pointer border border-white/10"
              title="Reset to default demo image"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      )}

      {/* Visual Toast Notification Banner */}
      {errorToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-zinc-950/95 text-white px-5 py-3 rounded-xl shadow-xl border border-zinc-800 z-[999999] flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <svg className="w-5 h-5 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="text-xs font-bold tracking-wide font-sans">{errorToast}</span>
          <button 
            onClick={() => setErrorToast(null)}
            className="text-zinc-400 hover:text-white text-xs font-bold pl-2 font-sans"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
};

// Helper to sanitize external links and social URLs safely (Requirements 11 & 12)
const sanitizeUrl = (url: string | null | undefined, isEmail = false): string => {
  if (!url) return '';
  const trimmed = url.trim();
  if (!trimmed || trimmed === '#' || trimmed.toLowerCase().startsWith('javascript:')) {
    return '';
  }

  if (isEmail) {
    if (trimmed.toLowerCase().startsWith('mailto:')) {
      return trimmed;
    }
    return `mailto:${trimmed}`;
  }

  // Ensure it has a protocol if it's an external link
  if (/^(https?:\/\/|\/\/)/i.test(trimmed)) {
    return trimmed;
  }

  // If it is a relative anchor or path, let it pass
  if (trimmed.startsWith('#') || trimmed.startsWith('/')) {
    return trimmed;
  }

  // Fallback: prepend https://
  return `https://${trimmed}`;
};

// Recursively clones and sanitizes links in PortfolioData on the fly
const sanitizePortfolioLinks = (data: PortfolioData): PortfolioData => {
  if (!data) return data;

  // Deep clone data to avoid mutating original state
  const cloned = JSON.parse(JSON.stringify(data)) as PortfolioData;

  // Sanitize main profile links
  if (cloned.profile) {
    if (cloned.profile.email) {
      cloned.profile.email = cloned.profile.email.trim();
    }
    if (cloned.profile.website) {
      cloned.profile.website = sanitizeUrl(cloned.profile.website);
    }
  }

  // Sanitize social links
  if (cloned.socialLinks) {
    const keys = Object.keys(cloned.socialLinks) as Array<keyof typeof cloned.socialLinks>;
    keys.forEach(key => {
      const val = cloned.socialLinks[key];
      cloned.socialLinks[key] = sanitizeUrl(val);
    });
  }

  // Sanitize project links
  if (Array.isArray(cloned.projects)) {
    cloned.projects = cloned.projects.map(proj => {
      if (proj) {
        return {
          ...proj,
          liveUrl: sanitizeUrl(proj.liveUrl),
          githubUrl: sanitizeUrl(proj.githubUrl),
        };
      }
      return proj;
    });
  }

  return cloned;
};

interface TemplateRendererProps {
  data: PortfolioData;
  config: LayoutConfiguration;
  rendererType: string;
  isEditable?: boolean;
  onUpdateData?: (updater: (prev: PortfolioData) => PortfolioData) => void;
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({ 
  data: rawOriginalData, 
  config, 
  rendererType, 
  isEditable = false, 
  onUpdateData 
}) => {
  const typeLower = (rendererType || '').toLowerCase();

  // Memoized sanitized portfolio data ensuring 100% URL safety across all templates
  const data = React.useMemo(() => {
    return sanitizePortfolioLinks(rawOriginalData);
  }, [rawOriginalData]);

  const renderActiveTemplate = () => {

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

    case 'cinematic-sarang-portfolio':
    case 'sarang':
    case 'cinematic-sarang':
      return <CinematicSarangPortfolioTemplate data={data} config={config} />;

    case 'codebucks':
    case 'codebucksportfolio':
    case 'codebucks-developer-portfolio':
    case 'github-codebucks-001':
    default:
      return <CodeBucksDeveloperPortfolioTemplate data={data} config={config} />;
  }
  };

  return (
    <ImageEditWrapper 
      data={data} 
      isEditable={isEditable} 
      onUpdateData={onUpdateData}
    >
      {renderActiveTemplate()}
    </ImageEditWrapper>
  );
};
