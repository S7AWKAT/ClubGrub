import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Loader2, Shield } from "lucide-react";

export default function AdminAuth() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");

  useEffect(() => {
    // Check if already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        checkAdminRole(session.user.id);
      }
    });
  }, []);

  const checkAdminRole = async (userId: string) => {
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .single();

    if (data && !error) {
      navigate("/admin/dashboard");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        // Check if user has admin role
        const { data: roleData, error: roleError } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", data.user.id)
          .eq("role", "admin")
          .single();

        if (roleError || !roleData) {
          await supabase.auth.signOut();
          toast.error("Access denied. Admin privileges required.");
          return;
        }

        toast.success("Welcome back, admin!");
        navigate("/admin/dashboard");
      }
    } catch (error: any) {
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/admin/dashboard`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
        },
      });

      if (error) throw error;

      toast.success("Account created! Please check your email to verify.");
      toast.info("Note: You'll need admin privileges to access the dashboard.");
    } catch (error: any) {
      toast.error(error.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-overlay p-6">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--club-gold)) 2px, transparent 2px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <Card className="w-full max-w-md p-8 relative z-10 bg-white">
        <div className="flex items-center justify-center mb-6">
          <div className="p-3 bg-gradient-to-br from-club-gold to-club-navy rounded-2xl">
            <Shield className="w-8 h-8 text-white" />
          </div>
        </div>

        <h1 className="heading-card text-center text-text-primary mb-2">
          Admin Portal
        </h1>
        <p className="text-text-secondary text-center mb-8">
          Secure access to ClubGrub management
        </p>

        <Tabs value={mode} onValueChange={(v) => setMode(v as "login" | "signup")}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@clubgrub.com"
                  required
                />
              </div>

              <div>
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full btn-hero">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@clubgrub.com"
                  required
                />
              </div>

              <div>
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  minLength={6}
                  required
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full btn-hero">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>

              <p className="text-xs text-text-secondary text-center">
                Note: Admin access must be granted by a system administrator
              </p>
            </form>
          </TabsContent>
        </Tabs>

        <div className="mt-6 pt-6 border-t border-border-muted">
          <p className="text-xs text-center text-text-secondary">
            **IMPORTANT SECURITY NOTE:** This system uses Supabase authentication with role-based access control. 
            Never use hardcoded credentials as they can be easily compromised. After signing up, 
            contact your system administrator to grant admin privileges.
          </p>
        </div>
      </Card>
    </div>
  );
}
