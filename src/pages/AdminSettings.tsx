import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

// Login credentials schema
const credentialsSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  currentPassword: z.string().min(1, { message: "Current password is required" }),
  newPassword: z.string().min(6, { message: "New password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Confirm password must be at least 6 characters" }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type CredentialsFormValues = z.infer<typeof credentialsSchema>;

const AdminSettings = () => {
  const { toast } = useToast();
  // In a real app, this would be fetched from a secure backend or context
  const [adminCredentials, setAdminCredentials] = useState({
    username: "admin",
    password: "password", // This is just for demo
  });

  // Initialize form
  const form = useForm<CredentialsFormValues>({
    resolver: zodResolver(credentialsSchema),
    defaultValues: {
      username: adminCredentials.username,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Handle form submission
  const onSubmit = (data: CredentialsFormValues) => {
    // Verify current password
    if (data.currentPassword !== adminCredentials.password) {
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "Current password is incorrect",
      });
      return;
    }

    // Update credentials
    setAdminCredentials({
      username: data.username,
      password: data.newPassword,
    });

    // Reset password fields but keep username
    form.reset({
      username: data.username,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    toast({
      title: "Credentials Updated",
      description: "Your admin username and password have been updated successfully.",
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Admin Settings</h1>

      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Update Admin Credentials</CardTitle>
          <CardDescription>
            Change your username and password for accessing the admin area.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      This will be your new admin username.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormDescription>
                      Password must be at least 6 characters.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Update Credentials</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;
