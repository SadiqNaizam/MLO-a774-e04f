import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FileBrowserItemCard from '@/components/FileBrowserItemCard';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';

// Lucide Icons for Sidebar and Empty State
import { FileText, Clock, Users2, FolderKanban, Trash2, Share2Icon, FileArchiveIcon } from 'lucide-react';

// Mock User Data (matching expected structure for Header component)
interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

const mockUser: User = {
  id: 'user-zenith-001',
  name: 'Alex Chen',
  email: 'alex.chen@zenithdesign.io',
  avatarUrl: 'https://i.pravatar.cc/150?u=alexchen',
};

// Mock File/Folder Data Type
type FileItem = {
  id: string;
  name: string;
  type: 'file' | 'folder';
  thumbnailUrl?: string;
  lastModified: Date | string;
};

const mockFilesAndFolders: FileItem[] = [
  { id: 'file-abc-123', name: 'Zenith OS - UI Kit Design.fig', type: 'file', lastModified: new Date('2024-07-28T10:30:00Z'), thumbnailUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwJTIwZGVzaWdufGVufDB8fDB8fHww&auto=format&fit=crop&w=300&h=150&q=60' },
  { id: 'folder-proj-xyz', name: 'Project Phoenix', type: 'folder', lastModified: new Date('2024-07-27T15:00:00Z') },
  { id: 'file-def-456', name: 'Mobile App Splash Screens V2', type: 'file', lastModified: new Date('2024-07-26T09:15:00Z'), thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGRhc2hib2FyZHxlbnwwfHwwfHx8MA&auto=format&fit=crop&w=300&h=150&q=60' },
  { id: 'file-ghi-789', name: 'Brand Guidelines Update', type: 'file', lastModified: new Date('2024-07-25T14:00:00Z'), thumbnailUrl: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnJhbmRpbmdfZ3VpZGVsaW5lc3xlbnwwfHwwfHx8MA&auto=format&fit=crop&w=300&h=150&q=60' },
  { id: 'folder-team-alpha', name: 'Team Alpha Assets', type: 'folder', lastModified: new Date('2024-07-24T11:00:00Z') },
];

const DashboardPage = () => {
  const navigate = useNavigate();
  console.log('DashboardPage loaded');

  // State for files - initialized with mock data
  const [files, setFiles] = React.useState<FileItem[]>(mockFilesAndFolders);
  // In a real app, this would be fetched or managed via a global state/context.

  const handleNewFile = () => {
    console.log('New File button clicked, navigating to /editor');
    navigate('/editor'); // Path from App.tsx
  };

  const handleOpenFile = (id: string, type: 'file' | 'folder') => {
    console.log(`Opening item: ${id}, type: ${type}`);
    if (type === 'file') {
      navigate('/editor'); // Path from App.tsx. Could be /editor/${id} if routes supported it.
    } else {
      // For folders, could navigate to a sub-route or update local state to show folder contents.
      console.log(`Folder ${id} clicked. Implement folder navigation or view update.`);
      // Example: navigate(`/dashboard/folder/${id}`) or setFiles(newFolderContent)
    }
  };

  const handleShareFile = (id: string) => {
    console.log(`Sharing file: ${id}, navigating to /share-modal`);
    navigate(`/share-modal?fileId=${id}`); // Path from App.tsx, passing fileId as example query param.
  };

  const handleRenameItem = (id: string, currentName: string) => {
    console.log(`Rename action for item: ${id}, current name: "${currentName}". Implement rename modal/logic.`);
    // const newName = prompt("Enter new name:", currentName);
    // if (newName && newName !== currentName) { /* update logic */ }
  };

  const handleDeleteItem = (id: string, type: 'file' | 'folder') => {
    console.log(`Delete action for item: ${id}, type: ${type}. Implement delete confirmation and logic.`);
    // if (window.confirm(`Are you sure you want to delete ${type} "${id}"?`)) {
    //   setFiles(prevFiles => prevFiles.filter(item => item.id !== id));
    // }
  };

  const sidebarNavItems = [
    { name: 'My Files', icon: FileText, path: '/', exact: true },
    { name: 'Recents', icon: Clock, path: '/dashboard#recents' }, // Using hash for non-implemented sections
    { name: 'Drafts', icon: FileArchiveIcon, path: '/dashboard#drafts' },
    { name: 'Shared with me', icon: Share2Icon, path: '/dashboard#shared' },
    { name: 'Projects', icon: FolderKanban, path: '/dashboard#projects' },
    { name: 'Teams', icon: Users2, path: '/dashboard#teams' },
    { name: 'Trash', icon: Trash2, path: '/dashboard#trash' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header user={mockUser} onNewFileClick={handleNewFile} />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-56 lg:w-64 border-r border-border bg-muted/40 p-4 hidden md:flex flex-col space-y-4">
          <h2 className="text-lg font-semibold px-2 text-foreground">Workspace</h2>
          <NavigationMenu orientation="vertical" className="w-full">
            <NavigationMenuList className="flex flex-col space-y-1 w-full">
              {sidebarNavItems.map((item) => (
                <NavigationMenuItem key={item.name} className="w-full">
                  <Link
                    to={item.path}
                    className={`${navigationMenuTriggerStyle()} w-full justify-start text-sm font-normal text-muted-foreground hover:text-foreground`}
                    // Basic active state for "/"
                    style={location.pathname === item.path && item.exact ? { backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)'} : {}}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </aside>

        {/* Main Content Area */}
        <ScrollArea className="flex-1">
          <main className="p-4 md:p-6 lg:p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-foreground">My Files</h1>
              {/* Future: Add filter/sort controls here */}
            </div>

            {files.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[calc(100vh-250px)] text-center">
                <FolderKanban className="w-20 h-20 text-muted-foreground/50 mb-6" strokeWidth={1.5} />
                <h2 className="text-xl font-semibold text-foreground mb-2">No files or folders yet</h2>
                <p className="text-muted-foreground mb-6 max-w-xs">
                  Your workspace is empty. Create your first design file or project folder to get started.
                </p>
                <Button onClick={handleNewFile} size="lg">
                  <FileText className="mr-2 h-5 w-5" /> Create New File
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
                {files.map((item) => (
                  <FileBrowserItemCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    type={item.type}
                    thumbnailUrl={item.thumbnailUrl}
                    lastModified={item.lastModified}
                    onOpen={handleOpenFile}
                    onShare={item.type === 'file' ? handleShareFile : undefined}
                    onRename={handleRenameItem}
                    onDelete={handleDeleteItem}
                  />
                ))}
              </div>
            )}
          </main>
        </ScrollArea>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;