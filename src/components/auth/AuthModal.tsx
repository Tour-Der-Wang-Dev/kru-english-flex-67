import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ open, onOpenChange }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  const handleSignIn = async () => {
    if (!email || !password) {
      toast({
        title: "กรุณากรอกข้อมูลให้ครบ",
        description: "อีเมลและรหัสผ่านจำเป็นต้องระบุ",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
      onOpenChange(false);
      setEmail('');
      setPassword('');
    } catch (error: any) {
      toast({
        title: "เข้าสู่ระบบไม่สำเร็จ",
        description: error.message || "กรุณาตรวจสอบอีเมลและรหัสผ่าน",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!email || !password) {
      toast({
        title: "กรุณากรอกข้อมูลให้ครบ",
        description: "อีเมลและรหัสผ่านจำเป็นต้องระบุ",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "รหัสผ่านสั้นเกินไป",
        description: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      await signUp(email, password);
      onOpenChange(false);
      setEmail('');
      setPassword('');
    } catch (error: any) {
      toast({
        title: "สมัครสมาชิกไม่สำเร็จ",
        description: error.message || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">เข้าสู่ระบบ / สมัครสมาชิก</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">เข้าสู่ระบบ</TabsTrigger>
            <TabsTrigger value="signup">สมัครสมาชิก</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signin-email">อีเมล</Label>
              <Input
                id="signin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signin-password">รหัสผ่าน</Label>
              <Input
                id="signin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="รหัสผ่าน"
              />
            </div>
            <Button 
              onClick={handleSignIn} 
              disabled={loading}
              className="w-full"
            >
              {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
            </Button>
          </TabsContent>
          
          <TabsContent value="signup" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signup-email">อีเมล</Label>
              <Input
                id="signup-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-password">รหัสผ่าน</Label>
              <Input
                id="signup-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="รหัสผ่าน (อย่างน้อย 6 ตัวอักษร)"
              />
            </div>
            <Button 
              onClick={handleSignUp} 
              disabled={loading}
              className="w-full"
            >
              {loading ? "กำลังสมัครสมาชิก..." : "สมัครสมาชิก"}
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};