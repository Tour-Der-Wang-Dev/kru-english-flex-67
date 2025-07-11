import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, Building } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { BankTransferForm } from './BankTransferForm';

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  coursePlan: {
    id: string;
    name: string;
    price: number;
    period: string;
  } | null;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ 
  open, 
  onOpenChange, 
  coursePlan 
}) => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleStripePayment = async () => {
    if (!user || !coursePlan) {
      toast({
        title: "กรุณาเข้าสู่ระบบ",
        description: "คุณต้องเข้าสู่ระบบก่อนชำระเงิน",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          planId: coursePlan.id,
          planName: coursePlan.name,
          price: coursePlan.price,
          period: coursePlan.period
        }
      });

      if (error) throw error;
      
      if (data?.url) {
        window.open(data.url, '_blank');
        onOpenChange(false);
      }
    } catch (error: any) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: error.message || "ไม่สามารถสร้างลิงก์ชำระเงินได้",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!coursePlan) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center">
            เลือกวิธีการชำระเงิน
          </DialogTitle>
          <div className="text-center text-muted-foreground">
            <p className="font-semibold">{coursePlan.name}</p>
            <p>฿{coursePlan.price.toLocaleString()} / {coursePlan.period}</p>
          </div>
        </DialogHeader>
        
        <Tabs defaultValue="stripe" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="stripe" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              บัตรเครดิต/เดบิต
            </TabsTrigger>
            <TabsTrigger value="bank" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              โอนเงินธนาคาร
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="stripe" className="space-y-4 mt-6">
            <div className="text-sm text-muted-foreground text-center">
              ชำระเงินด้วยบัตรเครดิตหรือเดบิตผ่าน Stripe
              <br />
              ปลอดภัย รวดเร็ว และเริ่มใช้งานได้ทันที
            </div>
            <Button 
              onClick={handleStripePayment}
              disabled={loading || !user}
              className="w-full"
              size="lg"
            >
              {loading ? "กำลังเตรียมการชำระเงิน..." : "ชำระเงินด้วย Stripe"}
            </Button>
            {!user && (
              <p className="text-sm text-destructive text-center">
                กรุณาเข้าสู่ระบบก่อนชำระเงิน
              </p>
            )}
          </TabsContent>
          
          <TabsContent value="bank" className="space-y-4 mt-6">
            <BankTransferForm 
              coursePlan={coursePlan}
              onSuccess={() => onOpenChange(false)}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};