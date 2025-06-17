import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import EditorCanvas, { DesignElement } from '@/components/EditorCanvas';
import { UserCircle } from 'lucide-react'; // For fallback avatar

// Mock user for Header display in prototype view
const mockUser = {
  id: 'viewer01',
  name: 'Prototype User',
  email: 'prototype@example.com',
  avatarUrl: `https://avatar.vercel.sh/prototype-viewer.png?text=PU`, // Generic avatar
};

// Sample elements to display on the prototype canvas
const samplePrototypeElements: DesignElement[] = [
  {
    id: 'frame1',
    type: 'rectangle',
    x: 50,
    y: 50,
    width: 700,
    height: 400,
    fill: '#e9ecef', // Light gray background for a frame
    stroke: '#adb5bd',
  },
  {
    id: 'titleText',
    type: 'text',
    x: 70,
    y: 80,
    width: 300,
    height: 40,
    fill: '#212529', // Dark text
    text: 'Interactive Prototype Demo',
    // Assuming text styling would be part of a more complex DesignElement or rendering
  },
  {
    id: 'button1',
    type: 'rectangle',
    x: 70,
    y: 150,
    width: 180,
    height: 50,
    fill: '#0d6efd', // Blue button
  },
  {
    id: 'button1Text',
    type: 'text',
    x: 80, // Centered within button1 (approx)
    y: 165, // Centered within button1 (approx)
    width: 160,
    height: 20,
    fill: '#ffffff', // White text
    text: 'Click Me!',
  },
  {
    id: 'imagePlaceholder',
    type: 'rectangle',
    x: 300,
    y: 220,
    width: 250,
    height: 150,
    fill: '#6c757d', // Gray placeholder
    stroke: '#495057',
  },
  {
    id: 'imagePlaceholderText',
    type: 'text',
    x: 310,
    y: 280,
    width: 230,
    height: 20,
    fill: '#ffffff',
    text: 'Placeholder Image',
  }
];

const PrototypeViewPage = () => {
  console.log('PrototypeViewPage loaded');

  const handleElementClick = (id: string | null, multiSelect?: boolean) => {
    if (id) {
      console.log(`Prototype element clicked: ${id}, Multi-select: ${multiSelect}`);
      // In a real prototype, this could trigger navigation to another state/frame,
      // or show/hide elements based on the clicked element's defined interaction.
      // For example: if (id === 'button1') { navigateToNextScreen(); }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-100 dark:bg-slate-800">
      {/* The Header component will use its internal logic for paths like /prototype-view */}
      {/* It's expected to render a more generic header here. */}
      <Header 
        user={mockUser}
        fileName="Customer Journey Map - Prototype" // Example file name
        // No editor-specific actions like onShareClick, onPresentClick for this view's header
      />

      <main className="flex-1 overflow-hidden relative">
        {/* EditorCanvas takes up the main space */}
        <EditorCanvas
          elements={samplePrototypeElements}
          selectedElementIds={[]} // No elements are "selected" for editing in prototype view
          onSelectElement={handleElementClick} // Handle clicks for potential prototype interactions
        />
      </main>
      
      {/* The Footer component will use its internal logic based on the path */}
      {/* It's expected to render a generic footer here. */}
      <Footer 
        editorQuickHelpMessage="Click on interactive elements to navigate the prototype."
      />
    </div>
  );
};

export default PrototypeViewPage;