import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface FooterProps {
  editorZoomLevel?: number;
  editorSelectionInfo?: string;
  editorQuickHelpMessage?: string;
}

const Footer: React.FC<FooterProps> = ({
  editorZoomLevel,
  editorSelectionInfo,
  editorQuickHelpMessage,
}) => {
  const location = useLocation();
  const currentYear = new Date().getFullYear();
  console.log('Footer component loaded for path:', location.pathname);

  const isEditorPage = location.pathname === '/editor';

  return (
    <footer className="bg-muted/40 border-t text-muted-foreground text-sm">
      <div className="container mx-auto px-4 py-3">
        {isEditorPage ? (
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4">
            <div className="text-xs">
              <span>{editorQuickHelpMessage || 'Tip: Use Shift+Click to select multiple objects.'}</span>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span>Zoom: {editorZoomLevel !== undefined ? `${editorZoomLevel}%` : '100%'}</span>
              <span>{editorSelectionInfo || 'No selection'}</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="text-center sm:text-left">
              &copy; {currentYear} DesignApp Inc. All rights reserved.
            </p>
            <nav className="flex gap-4 sm:gap-6">
              <Link to="/terms" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/help" className="hover:text-foreground transition-colors">
                Help Center
              </Link>
            </nav>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;