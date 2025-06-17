import React from 'react';
import { Link } from 'react-router-dom'; // Link might be used for some actions
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Shadcn/ui Components
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

// Icons
import { UserCircle, Bell, Palette, CreditCard, LogOut, Settings } from 'lucide-react';

// Mock user data for demonstration
const mockUser = {
  id: 'usr_123abc',
  name: 'Alex Chen',
  email: 'alex.chen@example.com',
  avatarUrl: 'https://i.pravatar.cc/150?u=alexchen',
};

// Zod Schemas for Form Validation
const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(50, { message: "Name must not exceed 50 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  // avatarFile: z.instanceof(File).optional(), // Actual file upload needs more setup
});
type ProfileFormValues = z.infer<typeof profileFormSchema>;

const passwordFormSchema = z.object({
  currentPassword: z.string().min(8, { message: "Password must be at least 8 characters." }),
  newPassword: z.string().min(8, { message: "New password must be at least 8 characters." }),
  confirmNewPassword: z.string().min(8, { message: "Confirm password must be at least 8 characters." }),
}).refine(data => data.newPassword === data.confirmNewPassword, {
  message: "New passwords do not match.",
  path: ["confirmNewPassword"],
});
type PasswordFormValues = z.infer<typeof passwordFormSchema>;

const preferencesFormSchema = z.object({
  darkMode: z.boolean().default(false),
  emailNotifications: z.boolean().default(true),
});
type PreferencesFormValues = z.infer<typeof preferencesFormSchema>;


const UserProfilePage = () => {
  console.log('UserProfilePage loaded');

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: mockUser.name,
      email: mockUser.email,
    },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const preferencesForm = useForm<PreferencesFormValues>({
    resolver: zodResolver(preferencesFormSchema),
    defaultValues: {
      darkMode: false, // Default to light mode
      emailNotifications: true,
    },
  });

  function onProfileSubmit(data: ProfileFormValues) {
    console.log('Profile form submitted:', data);
    // API call to update profile
  }

  function onPasswordSubmit(data: PasswordFormValues) {
    console.log('Password form submitted:', data);
    // API call to update password
  }
  
  function onPreferencesSubmit(data: PreferencesFormValues) {
    console.log('Preferences form submitted:', data);
    // API call to update preferences
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted/20 dark:bg-background">
      <Header user={mockUser} />
      
      <main className="flex-1 py-8 px-4 md:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              User Profile & Settings
            </h1>
            {/* Optional: A button like "View Public Profile" or "Go to Dashboard" */}
            <Button variant="outline" asChild className="mt-4 sm:mt-0">
              <Link to="/">Back to Dashboard</Link>
            </Button>
          </div>

          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 gap-2 mb-6">
              <TabsTrigger value="account" className="flex items-center gap-2"><UserCircle className="h-4 w-4"/>Account</TabsTrigger>
              <TabsTrigger value="preferences" className="flex items-center gap-2"><Settings className="h-4 w-4"/>Preferences</TabsTrigger>
              <TabsTrigger value="billing" className="flex items-center gap-2"><CreditCard className="h-4 w-4"/>Billing</TabsTrigger>
            </TabsList>

            {/* Account Tab Content */}
            <TabsContent value="account" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details and email address.</CardDescription>
                </CardHeader>
                <Form {...profileForm}>
                  <form id="profileForm" onSubmit={profileForm.handleSubmit(onProfileSubmit)}>
                    <CardContent className="space-y-6">
                      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={mockUser.avatarUrl || undefined} alt={mockUser.name} />
                          <AvatarFallback>{mockUser.name.substring(0, 1).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex-grow">
                          <Label htmlFor="avatar-upload" className="cursor-pointer text-sm font-medium text-primary hover:underline">
                            Change Avatar
                          </Label>
                          <Input id="avatar-upload" type="file" className="mt-1" 
                            accept="image/png, image/jpeg, image/gif"
                            onChange={(e) => console.log("Avatar file selected:", e.target.files?.[0])}
                          />
                          <p className="text-xs text-muted-foreground mt-1">PNG, JPG, GIF up to 5MB.</p>
                        </div>
                      </div>
                      <Separator />
                      <FormField
                        control={profileForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your.email@example.com" {...field} />
                            </FormControl>
                            <FormDescription>
                              This is the email associated with your account.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                    <CardFooter>
                      <Button type="submit">Save Changes</Button>
                    </CardFooter>
                  </form>
                </Form>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>Update your account password. Choose a strong one!</CardDescription>
                </CardHeader>
                <Form {...passwordForm}>
                  <form id="passwordForm" onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}>
                    <CardContent className="space-y-4">
                      <FormField
                        control={passwordForm.control}
                        name="currentPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={passwordForm.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={passwordForm.control}
                        name="confirmNewPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm New Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                    <CardFooter>
                      <Button type="submit">Update Password</Button>
                    </CardFooter>
                  </form>
                </Form>
              </Card>
            </TabsContent>

            {/* Preferences Tab Content */}
            <TabsContent value="preferences" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Application Preferences</CardTitle>
                  <CardDescription>Customize your experience within Zenith Design.</CardDescription>
                </CardHeader>
                <Form {...preferencesForm}>
                  <form id="preferencesForm" onSubmit={preferencesForm.handleSubmit(onPreferencesSubmit)}>
                    <CardContent className="space-y-6">
                       <FormField
                        control={preferencesForm.control}
                        name="darkMode"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base flex items-center">
                                <Palette className="mr-2 h-5 w-5 text-muted-foreground" />
                                Dark Mode
                              </FormLabel>
                              <FormDescription>
                                Enable dark theme for the application interface.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={preferencesForm.control}
                        name="emailNotifications"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base flex items-center">
                                <Bell className="mr-2 h-5 w-5 text-muted-foreground" />
                                Email Notifications
                              </FormLabel>
                              <FormDescription>
                                Receive email updates for important account activity.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </CardContent>
                    <CardFooter>
                      <Button type="submit">Save Preferences</Button>
                    </CardFooter>
                  </form>
                </Form>
              </Card>
            </TabsContent>

            {/* Billing Tab Content */}
            <TabsContent value="billing" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Subscription & Billing</CardTitle>
                  <CardDescription>Manage your subscription plan and view billing history.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 border rounded-md bg-accent/30 dark:bg-accent/10">
                    <h4 className="font-semibold text-lg">Current Plan: Pro Tier</h4>
                    <p className="text-sm text-muted-foreground">Your Pro Tier subscription is active and renews on January 1, 2025.</p>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border rounded-md">
                      <CreditCard className="h-6 w-6 text-muted-foreground flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Payment Method</p>
                        <p className="text-sm text-muted-foreground">Visa ending in •••• 1234</p>
                      </div>
                  </div>
                  <div className="space-y-2 sm:space-y-0 sm:flex sm:space-x-3">
                    <Button variant="outline" className="w-full sm:w-auto">Manage Subscription</Button>
                    <Button variant="link" className="w-full sm:w-auto justify-start sm:justify-center px-0 sm:px-4">View Billing History</Button>
                  </div>
                </CardContent>
                 <CardFooter className="border-t pt-6">
                    <p className="text-xs text-muted-foreground">
                        For any billing inquiries, please contact <Link to="/support" className="underline hover:text-primary">support</Link>.
                    </p>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>

          <Separator />
          <div className="flex justify-end">
            <Button variant="destructive" onClick={() => console.log("Log out action from profile page")} asChild>
              <Link to="/login"><LogOut className="mr-2 h-4 w-4" /> Log Out</Link>
            </Button>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserProfilePage;