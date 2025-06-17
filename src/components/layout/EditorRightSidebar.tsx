import React from 'react';
import { cn } from '@/lib/utils';
import { ScrollArea } from "@/components/ui/scroll-area";

interface EditorRightSidebarProps {
  children?: React.ReactNode;
  className?: string;
}

const EditorRightSidebar: React.FC<EditorRightSidebarProps> = ({ children, className }) => {
  console.log('EditorRightSidebar loaded');

  return (
    <aside
      className={cn(
        "h-full w-72 bg-background border-l border-border flex flex-col",
        "flex-shrink-0", // Prevents shrinking in a flex container
        className
      )}
      aria-label="Properties sidebar"
    >
      <ScrollArea className="flex-1"> {/* Use flex-1 to make ScrollArea take available space */}
        <div className="p-4 h-full"> {/* Padding applied to an inner div for proper scroll behavior */}
          {children ? children : (
            <div className="text-sm text-muted-foreground flex items-center justify-center h-full text-center">
              Select an element on the canvas or a tool to see its properties.
            </div>
          )}
        </div>
      </ScrollArea>
    </aside>
  );
};

export default EditorRightSidebar;