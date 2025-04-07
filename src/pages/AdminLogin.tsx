
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Lock, AlertCircle, Google } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Login form schema
const loginSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

// Add your authorized Google email here
const AUTHORIZED_EMAIL = "your.email@gmail.com";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // In a real app, these would be fetched from a secure backend
  // This is just for demo purposes - it would normally use a backend authentication system
  const [adminCredentials, setAdminCredentials] = useState({
    username: "admin",
    password: "password", 
  });

  // Initialize form
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Function to handle Google Sign In
  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setError("");
    
    // Simulate Google authentication
    setTimeout(() => {
      // In a real implementation, this would be the response from Google OAuth
      const mockGoogleResponse = {
        email: AUTHORIZED_EMAIL, // Replace this with actual Google auth response
        name: "Admin User",
      };
      
      // Check if the email is authorized
      if (mockGoogleResponse.email === AUTHORIZED_EMAIL) {
        toast({
          title: "Login successful",
          description: `Welcome back, ${mockGoogleResponse.name}!`,
        });
        navigate("/admin/projects");
      } else {
        setError("Unauthorized Google account. Only the owner has access to the admin area.");
      }
      setIsLoading(false);
    }, 1500);
  };

  // Handle form submission for username/password login
  const onSubmit = (data: LoginFormValues) => {
    setIsLoading(true);
    setError("");
    
    // In a real application, you would validate credentials against a backend
    setTimeout(() => {
      if (data.username === adminCredentials.username && data.password === adminCredentials.password) {
        toast({
          title: "Login successful",
          description: "Welcome back to your admin dashboard!",
        });
        navigate("/admin/projects");
      } else {
        setError("Invalid username or password");
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="text-muted-foreground">Enter your credentials to continue</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col space-y-4">
          <Button 
            onClick={handleGoogleSignIn} 
            className="w-full" 
            variant="outline"
            disabled={isLoading}
          >
            <Google className="mr-2 h-4 w-4" />
            Sign in with Google
          </Button>
          
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>Default credentials (unless changed):</p>
          <p>Username: admin</p>
          <p>Password: password</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
