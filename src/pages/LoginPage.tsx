import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Mail, Lock, LogIn, Eye, EyeOff } from 'lucide-react'; // Added Eye/EyeOff for password visibility

// Custom Components
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AppWindow } from 'lucide-react'; // For Logo

const loginFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  console.log('LoginPage loaded');

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log('Login form submitted:', data);
    // Simulate successful login
    // In a real app, you would call an API, then navigate.
    alert(`Simulating login for: ${data.email}`);
    navigate('/'); // Navigate to DashboardPage as per App.tsx and user journey
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-slate-800">
      <Header user={undefined} /> {/* Header component handles not rendering on /login */}
      
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <AppWindow className="w-8 h-8 mr-2 text-primary" />
            Zenith Design   
        </div>
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl">Welcome Back!</CardTitle>
            <CardDescription>Enter your credentials to access your account.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <FormControl>
                          <Input id="email" type="email" placeholder="your@email.com" {...field} className="pl-10" />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Link to="#" className="text-sm font-medium text-primary hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <FormControl>
                          <Input 
                            id="password" 
                            type={showPassword ? 'text' : 'password'} 
                            placeholder="••••••••" 
                            {...field} 
                            className="pl-10 pr-10" /* Add pr-10 for the icon button */
                          />
                        </FormControl>
                        <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 px-0" 
                            onClick={togglePasswordVisibility}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? 'Logging in...' : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" /> Login
                    </>
                  )}
                </Button>
              </form>
            </Form>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" disabled> {/* Placeholder */}
                {/* <GitHubLogo className="mr-2 h-4 w-4" /> */}
                GitHub
              </Button>
              <Button variant="outline" disabled> {/* Placeholder */}
                {/* <GoogleLogo className="mr-2 h-4 w-4" /> */}
                Google
              </Button>
            </div>
          </CardContent>
          <CardFooter className="text-center text-sm">
            <p className="w-full">
              Don&apos;t have an account?{' '}
              <Link to="/registration" className="font-medium text-primary hover:underline">
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;