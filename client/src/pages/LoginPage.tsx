import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useLocation } from "wouter";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { APP_LOGO, APP_TITLE } from "@/const";

export default function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<'client' | 'business_owner'>('client');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          role, // Send the selected role
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid email or password.');
      }

      // The useAuth hook will store the user data, including the role from the server
      await login(data.token, {
        id: data.id,
        email: data.email,
        name: data.name,
        role: data.role,
        businessId: data.businessId,
      });

      // Redirect based on the role received from the server
      if (data.role === 'business_owner') {
        setLocation("/owner/dashboard");
      } else {
        setLocation("/");
      }
    } catch (err: any) {
      setError(err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF9F3] p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <img src={APP_LOGO} alt="Logo" className="h-16 w-16 rounded-lg" />
          </div>
          <CardTitle className="text-3xl font-bold text-[#6B3A00]">{APP_TITLE}</CardTitle>
          <CardDescription className="text-[#6B3A00] opacity-80">Sign in to manage your appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-[#6B3A00]">I am a</Label>
              <ToggleGroup
                type="single"
                defaultValue="client"
                onValueChange={(value: 'client' | 'business_owner') => value && setRole(value)}
                className="grid grid-cols-2 gap-2"
              >
                <ToggleGroupItem value="client" className="py-4 text-base data-[state=on]:bg-[#F7941D] data-[state=on]:text-white">
                  Client
                </ToggleGroupItem>
                <ToggleGroupItem value="business_owner" className="py-4 text-base data-[state=on]:bg-[#F7941D] data-[state=on]:text-white">
                  Business Owner
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            {/* Animated section for form fields */}
            <div key={role} className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#6B3A00]">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#6B3A00]">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            <Button type="submit" className="w-full bg-[#F7941D] hover:bg-[#E86E1B] text-white py-6 text-lg" disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-[#E86E1B] hover:underline">
              Sign Up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}