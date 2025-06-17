import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Search,
  PlusCircle,
  Users,
  Share2,
  Play,
  UserCircle,
  Settings,
  LogOut,
  FileText,
  Edit3,
  Eye,
  Maximize,
  Minimize,
  ZoomIn,
  ZoomOut,
  Grid as GridIcon,
  Ruler,
  ChevronsUpDown,
  AppWindow, // Placeholder for Logo
  FileIcon,
  FolderOpenIcon,
  SaveIcon,
  UploadCloudIcon,
  HistoryIcon,
  UndoIcon,
  RedoIcon,
  CopyIcon,
  ScissorsIcon,
  ClipboardPasteIcon,
  Trash2Icon
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

interface HeaderProps {
  user?: User;
  fileName?: string;
  collaborators?: User[];
  onNewFileClick?: () => void;
  onShareClick?: () => void;
  onPresentClick?: () => void;
  onSaveFile?: () => void;
  onLogout?: () => void;
  // Add more specific callbacks for menu items as needed
}

const Header: React.FC<HeaderProps> = ({
  user,
  fileName = "Untitled Document",
  collaborators = [],
  onNewFileClick,
  onShareClick,
  onPresentClick,
  onSaveFile,
  onLogout,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  console.log('Header loaded on path:', location.pathname);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Search term submitted:", searchTerm);
    // Implement search logic here, e.g., navigate to search results page
    // navigate(`/search?q=${searchTerm}`);
  };
  
  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout();
    } else {
      console.log("Logout action triggered");
      // Basic fallback: navigate to login, clear user state (if managed here or context)
      navigate('/login');
    }
  };

  const renderUserAccountMenu = () => {
    if (!user) {
      return (
        <Button variant="outline" asChild>
          <Link to="/login">Login</Link>
        </Button>
      );
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-9 w-9">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>{user.name?.substring(0, 1).toUpperCase() || <UserCircle />}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to="/user-profile">
              <UserCircle className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log("Settings clicked")}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogoutClick}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const renderEditorMenus = () => (
    <Menubar className="border-none bg-transparent shadow-none p-0">
      <MenubarMenu>
        <MenubarTrigger className="font-medium">File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={onNewFileClick}><FileIcon className="mr-2 h-4 w-4" /> New File</MenubarItem>
          <MenubarItem onClick={() => console.log("Open File")}><FolderOpenIcon className="mr-2 h-4 w-4" /> Open...</MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={onSaveFile}><SaveIcon className="mr-2 h-4 w-4" /> Save</MenubarItem>
          <MenubarItem onClick={() => console.log("Save As")}><SaveIcon className="mr-2 h-4 w-4" /> Save As...</MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={() => console.log("Export")}><UploadCloudIcon className="mr-2 h-4 w-4" /> Export</MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={() => console.log("Version History")}><HistoryIcon className="mr-2 h-4 w-4" /> Version History</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="font-medium">Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => console.log("Undo")}><UndoIcon className="mr-2 h-4 w-4" /> Undo <MenubarShortcut>⌘Z</MenubarShortcut></MenubarItem>
          <MenubarItem onClick={() => console.log("Redo")}><RedoIcon className="mr-2 h-4 w-4" /> Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut></MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={() => console.log("Cut")}><ScissorsIcon className="mr-2 h-4 w-4" /> Cut <MenubarShortcut>⌘X</MenubarShortcut></MenubarItem>
          <MenubarItem onClick={() => console.log("Copy")}><CopyIcon className="mr-2 h-4 w-4" /> Copy <MenubarShortcut>⌘C</MenubarShortcut></MenubarItem>
          <MenubarItem onClick={() => console.log("Paste")}><ClipboardPasteIcon className="mr-2 h-4 w-4" /> Paste <MenubarShortcut>⌘V</MenubarShortcut></MenubarItem>
          <MenubarSeparator />
           <MenubarItem onClick={() => console.log("Delete")} className="text-red-600"><Trash2Icon className="mr-2 h-4 w-4" /> Delete <MenubarShortcut>Del</MenubarShortcut></MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="font-medium">View</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => console.log("Zoom In")}><ZoomIn className="mr-2 h-4 w-4" /> Zoom In</MenubarItem>
          <MenubarItem onClick={() => console.log("Zoom Out")}><ZoomOut className="mr-2 h-4 w-4" /> Zoom Out</MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={() => console.log("Fit to Screen (Maximize)")}><Maximize className="mr-2 h-4 w-4" /> Fit to Screen</MenubarItem>
          <MenubarItem onClick={() => console.log("Toggle Rulers")}><Ruler className="mr-2 h-4 w-4" /> Show Rulers</MenubarItem>
          <MenubarItem onClick={() => console.log("Toggle Grid")}><GridIcon className="mr-2 h-4 w-4" /> Show Grid</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      {/* Add more menus: Insert, Arrange, Plugins, Help as needed */}
    </Menubar>
  );

  const renderCollaborators = () => {
    if (!collaborators || collaborators.length === 0) return null;
    const maxVisible = 3;
    const visibleCollaborators = collaborators.slice(0, maxVisible);
    const hiddenCount = collaborators.length - maxVisible;

    return (
      <TooltipProvider delayDuration={100}>
        <div className="flex items-center -space-x-2">
          {visibleCollaborators.map((collab) => (
            <Tooltip key={collab.id}>
              <TooltipTrigger asChild>
                <Avatar className="h-8 w-8 border-2 border-background">
                  <AvatarImage src={collab.avatarUrl} alt={collab.name} />
                  <AvatarFallback>{collab.name?.substring(0,1).toUpperCase()}</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <p>{collab.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
          {hiddenCount > 0 && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="h-8 w-8 border-2 border-background">
                  <AvatarFallback>+{hiddenCount}</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <p>{hiddenCount} more collaborator(s)</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </TooltipProvider>
    );
  };


  const renderDashboardHeader = () => (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
          <AppWindow className="h-6 w-6 text-primary" />
          <span>Zenith Design</span>
        </Link>
      </div>
      <div className="flex-1 px-4 lg:px-8">
        <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search files..."
            className="w-full pl-10"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </form>
      </div>
      <div className="flex items-center gap-3">
        <Button onClick={onNewFileClick}>
          <PlusCircle className="mr-2 h-4 w-4" /> New File
        </Button>
        {renderUserAccountMenu()}
      </div>
    </div>
  );

  const renderEditorHeader = () => (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        <Link to="/" aria-label="Back to Dashboard">
          <AppWindow className="h-7 w-7 text-primary hover:text-primary/80 transition-colors" />
        </Link>
        {renderEditorMenus()}
      </div>
      <div className="flex-1 text-center">
        <span className="font-medium text-sm truncate" title={fileName}>{fileName}</span>
        {/* Potentially make file name editable: <Input value={fileName} onChange={...} className="text-center ..."/> */}
      </div>
      <div className="flex items-center gap-3">
        {renderCollaborators()}
        {onShareClick && (
          <Button variant="outline" size="sm" onClick={onShareClick}>
            <Share2 className="mr-2 h-4 w-4" /> Share
          </Button>
        )}
        {onPresentClick && (
          <Button variant="default" size="sm" onClick={onPresentClick}>
            <Play className="mr-2 h-4 w-4" /> Present
          </Button>
        )}
        {renderUserAccountMenu()}
      </div>
    </div>
  );
  
  const renderGenericHeader = () => (
    <div className="flex items-center justify-between w-full">
      <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
        <AppWindow className="h-6 w-6 text-primary" />
        <span>Zenith Design</span>
      </Link>
      {renderUserAccountMenu()}
    </div>
  );


  let headerContent;
  if (location.pathname === '/editor') {
    headerContent = renderEditorHeader();
  } else if (location.pathname === '/') {
    headerContent = renderDashboardHeader();
  } else if (location.pathname === '/login' || location.pathname === '/registration') {
    // No header or minimal logo-only header for login/registration pages if desired.
    // For now, returning null, assuming parent layout handles this.
    // If Header is unconditionally rendered, it might show a logo.
    return null; 
  } else {
    // Fallback for other pages like /user-profile
    headerContent = renderGenericHeader();
  }

  if (!headerContent) return null; // Explicitly return null if no content decided

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4 md:px-6">
        {headerContent}
      </div>
    </header>
  );
};

export default Header;