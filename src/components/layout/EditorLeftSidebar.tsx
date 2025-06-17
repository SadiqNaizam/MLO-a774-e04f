import React from 'react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Layers, Library } from 'lucide-react';

interface EditorLeftSidebarProps {
  className?: string;
}

const EditorLeftSidebar: React.FC<EditorLeftSidebarProps> = ({ className }) => {
  console.log('EditorLeftSidebar loaded');

  // Assuming a header height of 4rem (64px), which is 'h-16' in Tailwind default spacing.
  const headerHeight = '4rem'; // Equivalent to h-16 or 64px

  return (
    <aside
      className={cn(
        "fixed left-0 z-30 flex h-full w-72 flex-col border-r border-border bg-background",
        "flex flex-col", // Ensures flex container behavior
        className
      )}
      style={{ top: headerHeight, height: `calc(100vh - ${headerHeight})` }}
    >
      <ScrollArea className="flex-grow p-4">
        <div className="space-y-6">
          {/* Layers Panel Placeholder */}
          <div>
            <h3 className="mb-3 flex items-center text-base font-semibold text-foreground">
              <Layers className="mr-2 h-4 w-4 text-muted-foreground" />
              Layers
            </h3>
            <div className="flex h-56 items-center justify-center rounded-md border border-dashed border-muted-foreground/30 bg-muted/20 p-4 text-center text-sm text-muted-foreground">
              <p>Layers panel content will appear here. (e.g., object hierarchy)</p>
            </div>
          </div>

          {/* Assets Panel Placeholder */}
          <div>
            <h3 className="mb-3 flex items-center text-base font-semibold text-foreground">
              <Library className="mr-2 h-4 w-4 text-muted-foreground" />
              Assets
            </h3>
            <div className="flex h-56 items-center justify-center rounded-md border border-dashed border-muted-foreground/30 bg-muted/20 p-4 text-center text-sm text-muted-foreground">
              <p>Assets panel content will appear here. (e.g., components, images)</p>
            </div>
          </div>

          {/* Add more panels or content here as needed */}
        </div>
      </ScrollArea>
    </aside>
  );
};

export default EditorLeftSidebar;