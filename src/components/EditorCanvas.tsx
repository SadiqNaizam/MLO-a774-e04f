import React, { useState, useRef, useEffect, useCallback } from 'react';

// Define the structure for a design element
export interface DesignElement {
  id: string;
  type: 'rectangle' | 'ellipse' | 'text';
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  stroke?: string;
  text?: string; // For text elements
  // Add other properties like rotation, opacity, etc. as needed
}

// Define props for the EditorCanvas component
interface EditorCanvasProps {
  elements: DesignElement[];
  onElementsChange?: (elements: DesignElement[]) => void; // Callback for when elements are modified/added
  selectedElementIds?: string[];
  onSelectElement?: (id: string | null, multiSelect?: boolean) => void; // Callback for element selection
  // activeTool: string; // To determine current interaction mode (draw, select, pan, etc.)
  // onCanvasInteraction: (type: string, payload: any) => void; // Generic callback for various interactions
}

// A simple component to render individual design elements
const RenderedElement: React.FC<{
  element: DesignElement;
  isSelected: boolean;
  onClick: (id: string, shiftKey: boolean) => void;
}> = ({ element, isSelected, onClick }) => {
  const commonStyle: React.CSSProperties = {
    position: 'absolute',
    left: element.x,
    top: element.y,
    width: element.width,
    height: element.height,
    boxSizing: 'border-box',
    cursor: 'pointer',
    border: isSelected ? '2px solid #3b82f6' : (element.stroke ? `1px solid ${element.stroke}` : '1px solid #6b7280'),
  };

  if (element.type === 'rectangle') {
    return (
      <div
        style={{
          ...commonStyle,
          backgroundColor: element.fill,
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClick(element.id, e.shiftKey);
        }}
      />
    );
  }

  if (element.type === 'ellipse') {
    return (
      <div
        style={{
          ...commonStyle,
          backgroundColor: element.fill,
          borderRadius: '50%',
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClick(element.id, e.shiftKey);
        }}
      />
    );
  }
  
  if (element.type === 'text') {
    return (
      <div
        style={{
          ...commonStyle,
          backgroundColor: 'transparent', // Text elements might not have a fill
          border: isSelected ? '2px solid #3b82f6' : '1px dashed #cbd5e1', // Different border for text editing
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2px',
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClick(element.id, e.shiftKey);
        }}
      >
        <span style={{ color: element.fill }}>{element.text || 'Text'}</span>
      </div>
    );
  }

  return null;
};

const EditorCanvas: React.FC<EditorCanvasProps> = ({
  elements,
  // onElementsChange, // Placeholder for future use
  selectedElementIds = [],
  onSelectElement,
}) => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });

  const viewportRef = useRef<HTMLDivElement>(null);

  console.log('EditorCanvas loaded');

  useEffect(() => {
    // Placeholder for initial setup, e.g., centering content or loading state
  }, []);

  const handleWheel = useCallback((event: React.WheelEvent) => {
    event.preventDefault();
    if (!viewportRef.current) return;

    const viewportBounds = viewportRef.current.getBoundingClientRect();
    const mouseX = event.clientX - viewportBounds.left; // Mouse X relative to viewport
    const mouseY = event.clientY - viewportBounds.top;  // Mouse Y relative to viewport

    const newZoom = Math.max(0.1, Math.min(10, zoom - event.deltaY * 0.001 * zoom)); // Adjusted zoom sensitivity & clamping

    // Calculate mouse position in world coordinates before zoom
    const worldXBeforeZoom = (mouseX - pan.x) / zoom;
    const worldYBeforeZoom = (mouseY - pan.y) / zoom;

    // Calculate new pan to keep mouse position fixed relative to content
    const newPanX = mouseX - worldXBeforeZoom * newZoom;
    const newPanY = mouseY - worldYBeforeZoom * newZoom;
    
    setZoom(newZoom);
    setPan({ x: newPanX, y: newPanY });
  }, [zoom, pan]);

  const handleMouseDown = useCallback((event: React.MouseEvent) => {
    // Allow panning with middle mouse button or space + left click, for example
    // For simplicity, here we initiate pan on any mousedown on the canvas background
    if (event.target === viewportRef.current || event.target === viewportRef.current?.firstChild) {
        setIsPanning(true);
        setLastMousePosition({ x: event.clientX, y: event.clientY });
        if (onSelectElement) {
            onSelectElement(null); // Deselect elements when clicking canvas background
        }
    }
  }, [onSelectElement]);

  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    if (!isPanning) return;
    const dx = event.clientX - lastMousePosition.x;
    const dy = event.clientY - lastMousePosition.y;
    setPan(prevPan => ({ x: prevPan.x + dx, y: prevPan.y + dy }));
    setLastMousePosition({ x: event.clientX, y: event.clientY });
  }, [isPanning, lastMousePosition]);

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    // Optional: stop panning if mouse leaves canvas while button is pressed
    // setIsPanning(false);
  }, []);

  const handleElementClick = (id: string, shiftKey: boolean) => {
    if (onSelectElement) {
      onSelectElement(id, shiftKey);
    }
    console.log(`Element ${id} clicked. Shift: ${shiftKey}`);
  };
  
  // Placeholder for drawing logic:
  // - Based on activeTool, onMouseDown on canvas might start drawing a shape.
  // - onMouseMove would update the shape preview.
  // - onMouseUp would finalize the shape and call onElementsChange.

  // Placeholder for transformation logic (move, resize, rotate):
  // - If an element is selected, show transformation handles.
  // - Dragging handles or the element itself would modify its properties and call onElementsChange.

  return (
    <div
      ref={viewportRef}
      className={`relative w-full h-full bg-gray-100 dark:bg-gray-800 overflow-hidden ${isPanning ? 'cursor-grabbing' : 'cursor-grab'}`}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave} // Optional: handle mouse leaving canvas
      tabIndex={0} // Make it focusable for keyboard events if needed
    >
      {/* The "world" div that gets transformed for pan and zoom */}
      <div
        className="absolute top-0 left-0 origin-top-left" // Tailwind for transform-origin
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          width: '100%', // These might need to be very large for an "infinite" canvas
          height: '100%',
        }}
      >
        {elements.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-600 pointer-events-none">
            <p>Canvas is empty. Select a tool to start drawing.</p>
          </div>
        )}
        {elements.map(element => (
          <RenderedElement
            key={element.id}
            element={element}
            isSelected={selectedElementIds.includes(element.id)}
            onClick={handleElementClick}
          />
        ))}
        {/* More complex rendering logic would go here, potentially SVG based */}
      </div>
      
      {/* UI Overlays (e.g., zoom controls, selection dimensions) could be added here, outside the transformed world */}
      <div className="absolute bottom-2 left-2 bg-gray-700 text-white text-xs px-2 py-1 rounded">
        Zoom: {zoom.toFixed(2)}x | Pan: ({pan.x.toFixed(0)}, {pan.y.toFixed(0)})
      </div>
    </div>
  );
};

export default EditorCanvas;