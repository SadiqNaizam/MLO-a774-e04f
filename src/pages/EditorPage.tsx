import React, { useState, useEffect, useCallback } from 'react';

// Custom Components
import Header from '@/components/layout/Header';
import Toolbar, { DesignToolId } from '@/components/Toolbar';
import EditorLeftSidebar from '@/components/layout/EditorLeftSidebar';
import EditorCanvas, { DesignElement } from '@/components/EditorCanvas';
import EditorRightSidebar from '@/components/layout/EditorRightSidebar';
import Footer from '@/components/layout/Footer';

// Constants for layout
// EditorLeftSidebar uses an internal '4rem' (64px) constant for headerHeight.
// Our Header component is h-14 (56px). This will result in a small visual gap.
const EDITOR_LEFT_SIDEBAR_WIDTH = '288px'; // Corresponds to w-72

const EditorPage: React.FC = () => {
  console.log('EditorPage loaded');

  const [fileName, setFileName] = useState<string>('Untitled Design Project');
  const [activeTool, setActiveTool] = useState<DesignToolId | null>('select');
  const [elements, setElements] = useState<DesignElement[]>([]);
  const [selectedElementIds, setSelectedElementIds] = useState<string[]>([]);
  
  // Example: zoom state could be lifted from EditorCanvas or managed here
  const [currentZoom, setCurrentZoom] = useState(1); // Represents 100% zoom

  // Mock user and collaborators for Header props
  const mockUser = { 
    id: 'user-123', 
    name: 'Alex Designer', 
    email: 'alex.designer@example.com', 
    avatarUrl: 'https://source.unsplash.com/random/100x100/?person' 
  };
  const mockCollaborators = [
    { id: 'collab-1', name: 'Casey Developer', email: 'casey.dev@example.com', avatarUrl: 'https://source.unsplash.com/random/100x100/?woman' },
    { id: 'collab-2', name: 'Jordan PM', email: 'jordan.pm@example.com', avatarUrl: 'https://source.unsplash.com/random/100x100/?man' },
  ];

  // Initialize with some sample elements for demonstration
  useEffect(() => {
    setElements([
      { id: 'rect-guide', type: 'rectangle', x: 50, y: 50, width: 200, height: 120, fill: 'rgba(59, 130, 246, 0.5)', stroke: '#3B82F6' },
      { id: 'ellipse-guide', type: 'ellipse', x: 300, y: 100, width: 100, height: 100, fill: 'rgba(16, 185, 129, 0.5)', stroke: '#10B981' },
      { id: 'text-sample', type: 'text', x: 80, y: 220, width:150, height:30, fill: '#1F2937', text: 'Design Canvas' },
    ]);
  }, []);

  const handleToolSelect = useCallback((toolId: DesignToolId | null) => {
    setActiveTool(toolId);
    // If a drawing tool is selected, it's common to deselect elements
    if (toolId && toolId !== 'select' && toolId !== 'hand' && toolId !== 'comment') {
      setSelectedElementIds([]);
    }
  }, []);

  const handleSelectElement = useCallback((id: string | null, multiSelect: boolean = false) => {
    setSelectedElementIds(prevSelected => {
      if (id === null) return []; // Click on canvas background deselects all

      // If a drawing tool is active, switch to 'select' tool first
      if (activeTool && activeTool !== 'select' && activeTool !== 'hand' && activeTool !== 'comment') {
        setActiveTool('select');
      }

      if (multiSelect) {
        return prevSelected.includes(id) 
          ? prevSelected.filter(sid => sid !== id) // Toggle: deselect if already selected
          : [...prevSelected, id]; // Add to selection
      }
      return [id]; // Single select: replace current selection
    });
  }, [activeTool]);
  
  const handleElementsChange = useCallback((updatedElements: DesignElement[]) => {
    setElements(updatedElements);
  }, []);

  // Placeholder functions for Header actions
  const handleNewFile = useCallback(() => alert('Action: Create New File'), []);
  const handleShare = useCallback(() => alert('Action: Share File (would typically open modal or navigate)'), []);
  const handleSave = useCallback(() => alert('Action: Save File'), []);
  const handlePresent = useCallback(() => alert('Action: Present File (would typically navigate to prototype view)'), []);

  const renderRightSidebarContent = () => {
    if (selectedElementIds.length === 0) {
      return <p className="p-4 text-sm text-center text-muted-foreground">Select an element to inspect its properties.</p>;
    }
    if (selectedElementIds.length === 1) {
      const selectedElement = elements.find(el => el.id === selectedElementIds[0]);
      if (!selectedElement) {
        return <p className="p-4 text-sm text-center text-muted-foreground">Selected element data not found.</p>;
      }
      return (
        <div className="p-4 space-y-4">
          <h3 className="text-base font-semibold border-b pb-2 mb-3">Element Properties</h3>
          <div><strong className="text-xs font-medium text-muted-foreground">Type:</strong> <span className="text-sm capitalize ml-1">{selectedElement.type}</span></div>
          <div><strong className="text-xs font-medium text-muted-foreground">ID:</strong> <span className="text-sm ml-1">{selectedElement.id}</span></div>
          <div><strong className="text-xs font-medium text-muted-foreground">Position:</strong> <span className="text-sm ml-1">X: {selectedElement.x}, Y: {selectedElement.y}</span></div>
          <div><strong className="text-xs font-medium text-muted-foreground">Size:</strong> <span className="text-sm ml-1">W: {selectedElement.width}, H: {selectedElement.height}</span></div>
          <div className="flex items-center"><strong className="text-xs font-medium text-muted-foreground mr-2">Fill:</strong> <div className="w-4 h-4 rounded border" style={{backgroundColor: selectedElement.fill}}></div> <span className="text-sm ml-1">{selectedElement.fill}</span></div>
          {selectedElement.stroke && <div><strong className="text-xs font-medium text-muted-foreground">Stroke:</strong> <span className="text-sm ml-1">{selectedElement.stroke}</span></div>}
          {selectedElement.text && <div><strong className="text-xs font-medium text-muted-foreground">Text:</strong> <span className="text-sm ml-1 break-all">{selectedElement.text}</span></div>}
          {/* Placeholder for more detailed property editors */}
        </div>
      );
    }
    return <p className="p-4 text-sm text-center text-muted-foreground">Multiple elements selected. Bulk editing TBD.</p>;
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <Header
        user={mockUser}
        fileName={fileName}
        collaborators={mockCollaborators}
        onNewFileClick={handleNewFile}
        onShareClick={handleShare}
        onSaveFile={handleSave}
        onPresentClick={handlePresent}
      />

      {/* EditorLeftSidebar is fixed positioned by its own internal styles.
          It uses an internal 'headerHeight' of '4rem' (64px) for its 'top' style.
          Our Header is 56px, so there will be an 8px gap below the Header and above the LeftSidebar. */}
      <EditorLeftSidebar />

      {/* Main content area (Toolbar, Canvas, Right Sidebar) needs margin-left for the fixed Left Sidebar */}
      <div className="flex flex-1 overflow-hidden" style={{ marginLeft: EDITOR_LEFT_SIDEBAR_WIDTH }}>
        
        {/* Center Area: Toolbar + Canvas */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="p-1.5 flex justify-center items-center border-b bg-card shadow-sm z-10">
            <Toolbar
              activeTool={activeTool}
              onToolSelect={handleToolSelect}
            />
          </div>
          <div className="flex-1 relative bg-gray-100 dark:bg-zinc-800 overflow-hidden"> {/* EditorCanvas manages its own scrolling/panning */}
            <EditorCanvas
              elements={elements}
              selectedElementIds={selectedElementIds}
              onSelectElement={handleSelectElement}
              onElementsChange={handleElementsChange}
              // activeTool={activeTool} // Could be passed if canvas needs to react to tool changes directly
            />
          </div>
        </main>

        {/* Right Sidebar */}
        <EditorRightSidebar className="w-72 border-l flex-shrink-0"> {/* flex-shrink-0 is important */}
          {renderRightSidebarContent()}
        </EditorRightSidebar>
      </div>

      {/* Footer also needs margin-left to not be overlapped by fixed EditorLeftSidebar */}
      <div style={{ marginLeft: EDITOR_LEFT_SIDEBAR_WIDTH }}>
        <Footer
          editorZoomLevel={Math.round(currentZoom * 100)}
          editorSelectionInfo={
            selectedElementIds.length > 0
              ? `${selectedElementIds.length} object(s) selected`
              : "No selection"
          }
          editorQuickHelpMessage="Tip: Use toolbar to select tools. Click canvas to draw."
        />
      </div>
    </div>
  );
};

export default EditorPage;