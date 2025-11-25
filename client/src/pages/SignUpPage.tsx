// src/pages/SignUpPage.tsx (or wherever you want to create it)

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { APP_LOGO, APP_TITLE } from "@/const";
import { Link, useLocation } from "wouter";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function SignUpPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [, setLocation] = useLocation();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Sign up failed.');
      }

      setMessage(data.message);
      // Optional: redirect to login page after a short delay
      setTimeout(() => setLocation('/login'), 5000);

    } catch (err: any) {
      setError(err.message);
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
          <CardTitle className="text-3xl font-bold text-[#6B3A00]">Create an Account</CardTitle>
          <CardDescription className="text-[#6B3A00] opacity-80">Join {APP_TITLE} today!</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[#6B3A00]">I am a...</Label>
              <ToggleGroup
                type="single"
                defaultValue="user"
                onValueChange={(value: 'user' | 'admin') => value && setRole(value)}
                className="grid grid-cols-2 gap-2"
              >
                <ToggleGroupItem value="user" className="py-4 text-base data-[state=on]:bg-[#F7941D] data-[state=on]:text-white">
                  Client
                </ToggleGroupItem>
                <ToggleGroupItem value="admin" className="py-4 text-base data-[state=on]:bg-[#F7941D] data-[state=on]:text-white">
                  Business Owner
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} disabled={isLoading} placeholder="e.g., Taherah Leslieann" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} placeholder="info@lashbyroyal.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} placeholder="Create a secure password" />
            </div>
            
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            {message && <p className="text-sm text-green-600 text-center">{message}</p>}

            <Button type="submit" className="w-full bg-[#F7941D] hover:bg-[#E86E1B] text-white py-6 text-lg" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </Button>
            
            <div className="text-center text-sm">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-[#E86E1B] hover:underline">
                Sign In
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
