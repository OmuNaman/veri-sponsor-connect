
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Layout from "@/components/Layout";
import { toast } from "@/hooks/use-toast";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Demo credentials
  const demoYouTuberCreds = {
    email: "youtuber@example.com",
    password: "password123",
  };

  const demoSponsorCreds = {
    email: "sponsor@example.com",
    password: "password123",
  };

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    setError(null);
    
    try {
      await login(data.email, data.password);
      toast({
        title: "Login successful",
        description: "Welcome back to VeriSponsor!",
      });
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loginAsDemoYouTuber = async () => {
    setLoading(true);
    setError(null);
    form.setValue("email", demoYouTuberCreds.email);
    form.setValue("password", demoYouTuberCreds.password);
    
    try {
      await login(demoYouTuberCreds.email, demoYouTuberCreds.password);
      toast({
        title: "Demo login successful",
        description: "You're logged in as a YouTuber for demo purposes.",
      });
      navigate("/dashboard");
    } catch (err) {
      setError("Demo login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loginAsDemoSponsor = async () => {
    setLoading(true);
    setError(null);
    form.setValue("email", demoSponsorCreds.email);
    form.setValue("password", demoSponsorCreds.password);
    
    try {
      await login(demoSponsorCreds.email, demoSponsorCreds.password);
      toast({
        title: "Demo login successful",
        description: "You're logged in as a Sponsor for demo purposes.",
      });
      navigate("/dashboard");
    } catch (err) {
      setError("Demo login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="bg-white p-8 shadow-sm rounded-lg border border-gray-100">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-verisponsor-blue to-verisponsor-purple bg-clip-text text-transparent">
                Welcome Back to VeriSponsor
              </h1>
              <p className="text-gray-600 mt-2">
                Log in to your account to continue
              </p>
            </div>

            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your@email.com" {...field} />
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
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Logging in..." : "Log In"}
                </Button>
              </form>
            </Form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or try a demo account</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={loginAsDemoYouTuber} disabled={loading}>
                  Demo YouTuber
                </Button>
                <Button variant="outline" onClick={loginAsDemoSponsor} disabled={loading}>
                  Demo Sponsor
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center text-sm">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link to="/register" className="font-medium text-verisponsor-blue hover:text-verisponsor-blue/80">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
