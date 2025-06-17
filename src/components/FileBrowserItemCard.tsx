import React from 'react';
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { FileText, Folder, MoreHorizontal, ExternalLink, Share2, Edit, Trash2 } from 'lucide-react';

interface FileBrowserItemCardProps {
  id: string;
  name: string;
  type: 'file' | 'folder';
  thumbnailUrl?: string; // Optional, for files
  lastModified: Date | string; // Date object or ISO string
  onOpen: (id: string, type: 'file' | 'folder') => void;
  onShare?: (id: string) => void; // Optional, as folders might not be directly sharable or share action is different
  onRename: (id: string, currentName: string) => void;
  onDelete: (id: string, type: 'file' | 'folder') => void;
}

const FileBrowserItemCard: React.FC<FileBrowserItemCardProps> = ({
  id,
  name,
  type,
  thumbnailUrl,
  lastModified,
  onOpen,
  onShare,
  onRename,
  onDelete,
}) => {
  console.log(`FileBrowserItemCard loaded for: ${name} (ID: ${id})`);

  const formattedLastModified = new Date(lastModified).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const handleRename = () => {
    // The parent component will typically open a dialog for name input
    onRename(id, name);
  };

  return (
    <Card className="w-full overflow-hidden group transition-all duration-200 ease-in-out hover:shadow-xl border border-transparent hover:border-primary/20 flex flex-col">
      <div className="relative">
        <AspectRatio
          ratio={16 / 9}
          className="bg-muted group-hover:bg-muted/80 transition-colors cursor-pointer"
          onClick={() => onOpen(id, type)}
        >
          {type === 'file' && thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={`Preview of ${name}`}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400 group-hover:text-slate-500 transition-colors">
              {type === 'folder' ? (
                <Folder className="w-16 h-16 sm:w-20 sm:h-20" strokeWidth={1.5} />
              ) : (
                <FileText className="w-16 h-16 sm:w-20 sm:h-20" strokeWidth={1.5} />
              )}
            </div>
          )}
        </AspectRatio>
        {/* Example of potential hover control: Quick open button
        <Button
          variant="secondary"
          size="sm"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => onOpen(id, type)}
        >
          <ExternalLink className="mr-1 h-4 w-4" /> Open
        </Button>
        */}
      </div>

      <CardContent className="p-3 sm:p-4 flex-grow flex flex-col justify-between">
        <div>
          <CardTitle
            className="text-sm sm:text-md font-medium leading-tight hover:text-primary transition-colors cursor-pointer line-clamp-2"
            onClick={() => onOpen(id, type)}
            title={name}
          >
            {name}
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            {formattedLastModified}
          </p>
        </div>

        <div className="mt-2 flex justify-end items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                <MoreHorizontal className="h-5 w-5" />
                <span className="sr-only">More actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => onOpen(id, type)} className="cursor-pointer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Open
              </DropdownMenuItem>
              {type === 'file' && onShare && (
                <DropdownMenuItem onClick={() => onShare(id)} className="cursor-pointer">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={handleRename} className="cursor-pointer">
                <Edit className="mr-2 h-4 w-4" />
                Rename
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(id, type)}
                className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileBrowserItemCard;