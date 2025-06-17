import React from 'react';
import {
  MousePointer2,
  Frame as FrameIcon, // Alias to avoid conflict if Frame component is used
  RectangleHorizontal,
  Circle,
  Minus,
  Shapes,
  PenTool,
  Type,
  Hand,
  MessageSquare,
  Spline, // For a slightly more distinct Line tool icon
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { Separator } from '@/components/ui/separator';

export type DesignToolId =
  | 'select'
  | 'frame'
  | 'rectangle'
  | 'ellipse'
  | 'line'
  | 'polygon' // Represents general shape tool, could be a dropdown later
  | 'pen'
  | 'text'
  | 'hand'
  | 'comment';

interface ToolDefinition {
  id: DesignToolId;
  label: string;
  icon: React.ElementType;
}

const tools: ToolDefinition[] = [
  { id: 'select', label: 'Select', icon: MousePointer2 },
  { id: 'frame', label: 'Frame', icon: FrameIcon },
  { id: 'rectangle', label: 'Rectangle', icon: RectangleHorizontal },
  { id: 'ellipse', label: 'Ellipse', icon: Circle },
  { id: 'line', label: 'Line', icon: Spline }, // Using Spline for a more distinct line
  { id: 'polygon', label: 'Polygon', icon: Shapes },
  { id: 'pen', label: 'Pen Tool', icon: PenTool },
  { id: 'text', label: 'Text Tool', icon: Type },
];

const utilityTools: ToolDefinition[] = [
  { id: 'hand', label: 'Hand (Pan)', icon: Hand },
  { id: 'comment', label: 'Comment', icon: MessageSquare },
];

interface ToolbarProps {
  activeTool: DesignToolId | null;
  onToolSelect: (toolId: DesignToolId | null) => void;
  className?: string;
}

const Toolbar: React.FC<ToolbarProps> = ({ activeTool, onToolSelect, className }) => {
  console.log('Toolbar loaded');

  const handleValueChange = (value: string) => {
    // ToggleGroup returns empty string if deselected, null if type="single" and item is re-clicked
    // We want to allow deselecting or pass the new tool id.
    if (value === '') {
      onToolSelect(null);
    } else {
      onToolSelect(value as DesignToolId);
    }
  };

  return (
    <div className={`flex items-center gap-1 p-1.5 bg-card border rounded-lg shadow-md ${className}`}>
      <ToggleGroup
        type="single"
        value={activeTool || ''}
        onValueChange={handleValueChange}
        className="flex flex-wrap gap-1"
        aria-label="Design tools"
      >
        {tools.map((tool) => (
          <Tooltip key={tool.id} delayDuration={100}>
            <TooltipTrigger asChild>
              <ToggleGroupItem
                value={tool.id}
                aria-label={tool.label}
                className="p-2 data-[state=on]:bg-primary/20 data-[state=on]:text-primary-foreground"
              >
                <tool.icon className="h-5 w-5" />
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{tool.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </ToggleGroup>

      <Separator orientation="vertical" className="h-8 mx-1" />
      
      <ToggleGroup
        type="single"
        value={activeTool || ''}
        onValueChange={handleValueChange}
        className="flex flex-wrap gap-1"
        aria-label="Utility tools"
      >
        {utilityTools.map((tool) => (
          <Tooltip key={tool.id} delayDuration={100}>
            <TooltipTrigger asChild>
               <ToggleGroupItem
                value={tool.id}
                aria-label={tool.label}
                className="p-2 data-[state=on]:bg-primary/20 data-[state=on]:text-primary-foreground"
              >
                <tool.icon className="h-5 w-5" />
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{tool.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </ToggleGroup>
    </div>
  );
};

export default Toolbar;