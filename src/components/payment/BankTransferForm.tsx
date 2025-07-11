import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Upload } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface BankTransferFormProps {
  coursePlan: {
    id: string;
    name: string;
    price: number;
    period: string;
  };
  onSuccess: () => void;
}

export const BankTransferForm: React.FC<BankTransferFormProps> = ({ 
  coursePlan, 
  onSuccess 
}) => {
  const [transferDate, setTransferDate] = useState('');
  const [transferTime, setTransferTime] = useState('');
  const [transferAmount, setTransferAmount] = useState(coursePlan.price.toString());
  const [transferRef, setTransferRef] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "กรุณาเข้าสู่ระบบ",
        description: "คุณต้องเข้าสู่ระบบก่อนส่งข้อมูลการโอนเงิน",
        variant: "destructive",
      });
      return;
    }

    if (!transferDate || !transferTime || !transferAmount) {
      toast({
        title: "กรุณากรอกข้อมูลให้ครบ",
        description: "วันที่ เวลา และจำนวนเงินเป็นข้อมูลที่จำเป็น",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await (supabase as any)
        .from('payment_confirmations')
        .insert({
          user_id: user.id,
          email: user.email,
          course_plan_id: coursePlan.id,
          course_plan_name: coursePlan.name,
          amount: parseFloat(transferAmount),
          transfer_date: transferDate,
          transfer_time: transferTime,
          transfer_ref: transferRef,
          note: note,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "ส่งข้อมูลการโอนเงินแล้ว",
        description: "เราได้รับข้อมูลการโอนเงินของคุณแล้ว และจะตรวจสอบภายใน 24 ชั่วโมง",
      });

      onSuccess();
    } catch (error: any) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: error.message || "ไม่สามารถบันทึกข้อมูลได้",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Building className="h-5 w-5" />
            ข้อมูลบัญชีธนาคาร
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <strong>ชื่อบริษัท:</strong> บริษัท เทรนนิ่งดีดี จำกัด
          </div>
          <div>
            <strong>ชื่อภาษาอังกฤษ:</strong> Training DD Co., Ltd
          </div>
          <div>
            <strong>ธนาคาร:</strong> ไทยพาณิชย์ (SCB)
          </div>
          <div>
            <strong>เลขที่บัญชี:</strong> 640-265-8196
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="transfer-date">วันที่โอน *</Label>
            <Input
              id="transfer-date"
              type="date"
              value={transferDate}
              onChange={(e) => setTransferDate(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="transfer-time">เวลาโอน *</Label>
            <Input
              id="transfer-time"
              type="time"
              value={transferTime}
              onChange={(e) => setTransferTime(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="transfer-amount">จำนวนเงิน (บาท) *</Label>
          <Input
            id="transfer-amount"
            type="number"
            value={transferAmount}
            onChange={(e) => setTransferAmount(e.target.value)}
            placeholder="จำนวนเงินที่โอน"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="transfer-ref">หมายเลขอ้างอิง (ถ้ามี)</Label>
          <Input
            id="transfer-ref"
            value={transferRef}
            onChange={(e) => setTransferRef(e.target.value)}
            placeholder="หมายเลขอ้างอิงจากธนาคาร"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="note">หมายเหตุเพิ่มเติม</Label>
          <Textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="ข้อมูลเพิ่มเติม หรือคำถาม"
            rows={3}
          />
        </div>

        <div className="text-sm text-muted-foreground">
          <p>* ข้อมูลจำเป็น</p>
          <p>หลังจากส่งข้อมูลแล้ว ทีมงานจะตรวจสอบและอนุมัติภายใน 24 ชั่วโมง</p>
        </div>

        <Button 
          type="submit" 
          disabled={loading || !user}
          className="w-full"
          size="lg"
        >
          {loading ? "กำลังส่งข้อมูล..." : "ส่งข้อมูลการโอนเงิน"}
        </Button>
      </form>
    </div>
  );
};