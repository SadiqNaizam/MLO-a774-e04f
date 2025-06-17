import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { Mail, Users, Link as LinkIcon, Copy, Settings2, Trash2, UserPlus } from 'lucide-react';

// Define User interface for Header and collaborators
interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

// Define Collaborator interface for the list
interface Collaborator extends User {
  permission: 'view' | 'edit';
}

const shareFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  permission: z.enum(["view", "edit"], {
    required_error: "You need to select a permission level.",
  }),
});

type ShareFormValues = z.infer<typeof shareFormSchema>;

const ShareModalPage = () => {
  console.log('ShareModalPage loaded');
  const navigate = useNavigate();

  const [fileName] = useState<string>("Project Alpha Design"); // Placeholder file name
  const [collaborators, setCollaborators] = useState<Collaborator[]>([
    { id: 'collab1', name: 'Alice Wonderland', email: 'alice@example.com', permission: 'edit', avatarUrl: 'https://i.pravatar.cc/40?u=alice@example.com' },
    { id: 'collab2', name: 'Bob The Builder', email: 'bob@example.com', permission: 'view', avatarUrl: 'https://i.pravatar.cc/40?u=bob@example.com' },
  ]);
  const [shareableLink, setShareableLink] = useState<string>(`https://app.zenith.design/file/xyz123abc?token=${Math.random().toString(36).substring(7)}`);
  const [linkPermission, setLinkPermission] = useState<'view' | 'edit'>('view');

  const form = useForm<ShareFormValues>({
    resolver: zodResolver(shareFormSchema),
    defaultValues: {
      email: "",
      permission: "view",
    },
  });

  const onSubmit = (data: ShareFormValues) => {
    console.log("Invite collaborator:", data);
    // Mock adding collaborator
    const newCollaborator: Collaborator = {
      id: `collab${collaborators.length + 1}`,
      name: data.email.split('@')[0], // Simple name from email
      email: data.email,
      permission: data.permission,
      avatarUrl: `https://i.pravatar.cc/40?u=${data.email}`
    };
    setCollaborators(prev => [...prev, newCollaborator]);
    toast.success(`Invitation sent to ${data.email} with ${data.permission} access.`);
    form.reset();
  };

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(shareableLink)
      .then(() => toast.success("Link copied to clipboard!"))
      .catch(err => toast.error("Failed to copy link: " + err));
  };

  const removeCollaborator = (id: string) => {
    setCollaborators(prev => prev.filter(c => c.id !== id));
    toast.success("Collaborator removed.");
  }

  // Placeholder user for the Header component
  const currentUser: User = {
    id: 'user_current_123',
    name: 'Demo User',
    email: 'demo@example.com',
    avatarUrl: 'https://i.pravatar.cc/40?u=demouser'
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <Header user={currentUser} fileName={fileName} onShareClick={() => console.log("Share clicked from header - already on share page")} />
      
      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <Card className="w-full max-w-2xl shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Users className="mr-3 h-7 w-7 text-primary" /> Share "{fileName}"
            </CardTitle>
            <CardDescription>
              Invite people to collaborate or create a shareable link for this file.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Section 1: Invite Collaborators */}
            <section>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <UserPlus className="mr-2 h-5 w-5" /> Invite Collaborators
              </h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="flex-grow">
                          <FormLabel>Email address</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input placeholder="name@example.com" {...field} className="pl-10" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="permission"
                      render={({ field }) => (
                        <FormItem className="sm:w-40">
                          <FormLabel>Permission</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select permission" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="view">Can view</SelectItem>
                              <SelectItem value="edit">Can edit</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="w-full sm:w-auto">
                    Send Invite
                  </Button>
                </form>
              </Form>
            </section>

            <Separator />

            {/* Section 2: Existing Collaborators */}
            <section>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Users className="mr-2 h-5 w-5" /> People with Access
              </h3>
              {collaborators.length > 0 ? (
                <ul className="space-y-3 max-h-60 overflow-y-auto pr-2">
                  {collaborators.map((collab) => (
                    <li key={collab.id} className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={collab.avatarUrl} alt={collab.name} />
                          <AvatarFallback>{collab.name.substring(0, 1).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{collab.name}</p>
                          <p className="text-xs text-muted-foreground">{collab.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Select defaultValue={collab.permission} onValueChange={(value) => {
                          // Mock permission change
                          setCollaborators(prev => prev.map(c => c.id === collab.id ? {...c, permission: value as 'view' | 'edit'} : c));
                          toast.info(`${collab.name}'s permission updated to ${value}.`);
                        }}>
                          <SelectTrigger className="h-8 text-xs w-[100px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="view">Can view</SelectItem>
                            <SelectItem value="edit">Can edit</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => removeCollaborator(collab.id)}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No one else has access yet. Invite someone above!</p>
              )}
            </section>

            <Separator />

            {/* Section 3: Shareable Link */}
            <section>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <LinkIcon className="mr-2 h-5 w-5" /> General Access
              </h3>
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-sm text-muted-foreground">Anyone with the link:</span>
                <Select value={linkPermission} onValueChange={(value) => {
                    setLinkPermission(value as 'view' | 'edit');
                    toast.info(`Link permission updated to ${value}.`);
                  }}>
                  <SelectTrigger className="h-9 text-sm w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="view">Can view</SelectItem>
                    <SelectItem value="edit">Can edit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2 p-2 border rounded-md bg-muted/30">
                <LinkIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <Input
                  readOnly
                  value={shareableLink}
                  className="text-sm flex-grow bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto"
                />
                <Button variant="outline" size="sm" onClick={copyLinkToClipboard}>
                  <Copy className="mr-2 h-4 w-4" /> Copy link
                </Button>
              </div>
              <FormDescription className="mt-2">
                {linkPermission === 'view' ? 'Anyone with this link can view the file.' : 'Anyone with this link can edit the file.'}
              </FormDescription>
            </section>
          </CardContent>

          <CardFooter className="flex justify-end border-t pt-6">
            <Button variant="default" size="lg" onClick={() => navigate('/')}> {/* Navigate to Dashboard */}
              Done
            </Button>
          </CardFooter>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default ShareModalPage;