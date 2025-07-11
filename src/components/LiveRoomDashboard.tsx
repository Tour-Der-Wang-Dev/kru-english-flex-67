import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Users, Lock, CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface LiveRoom {
  id: string;
  course_plan_id: string;
  course_plan_name: string;
  room_name: string;
  room_url: string;
  is_active: boolean;
  max_participants?: number;
}

export const LiveRoomDashboard: React.FC = () => {
  const { user, subscriber, checkSubscription } = useAuth();
  const [rooms, setRooms] = useState<LiveRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      loadRooms();
      checkSubscription();
    }
  }, [user]);

  const loadRooms = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('live_rooms')
        .select('*')
        .eq('is_active', true)
        .order('course_plan_name');

      if (error) throw error;
      setRooms(data || []);
    } catch (error: any) {
      console.error('Error loading rooms:', error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถโหลดข้อมูลห้องเรียนได้",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRoom = async (room: LiveRoom) => {
    if (!subscriber?.can_access_room) {
      toast({
        title: "ไม่สามารถเข้าห้องได้",
        description: "กรุณาสมัครสมาชิกหรือชำระเงินเพื่อเข้าถึงห้องเรียน",
        variant: "destructive",
      });
      return;
    }

    // Update last room access
    try {
      await (supabase as any)
        .from('subscribers')
        .update({ 
          last_room_access: new Date().toISOString() 
        })
        .eq('user_id', user?.id);
    } catch (error) {
      console.error('Error updating room access:', error);
    }

    // Open room in new tab
    window.open(room.room_url, '_blank');
    
    toast({
      title: "เข้าห้องเรียนแล้ว",
      description: `กำลังเปิดห้อง ${room.room_name}`,
    });
  };

  const canAccessRoom = (room: LiveRoom) => {
    if (!subscriber) return false;
    
    return subscriber.can_access_room && (
      subscriber.subscription_plan === room.course_plan_id ||
      subscriber.subscription_plan === 'combo-english' ||
      subscriber.subscription_plan === 'small-group'
    );
  };

  if (!user) {
    return (
      <div className="container mx-auto px-6 py-20">
        <Card>
          <CardContent className="text-center py-20">
            <Lock className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">เข้าสู่ระบบเพื่อดูห้องเรียน</h2>
            <p className="text-muted-foreground">กรุณาเข้าสู่ระบบเพื่อเข้าถึงห้องเรียนสด</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">กำลังโหลดห้องเรียน...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">ห้องเรียนสด</h1>
        <p className="text-xl text-muted-foreground">
          เข้าร่วมห้องเรียนสดของคุณ
        </p>
      </div>

      {/* Subscription Status */}
      {subscriber && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-success" />
              สถานะการสมัครสมาชิก
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">แผนการเรียน</p>
                <p className="font-semibold">{subscriber.subscription_tier || 'ไม่มี'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">สถานะ</p>
                <Badge variant={subscriber.subscribed ? "default" : "secondary"}>
                  {subscriber.subscribed ? 'ใช้งานได้' : 'ไม่ได้ใช้งาน'}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">หมดอายุ</p>
                <p className="font-semibold">
                  {subscriber.subscription_end 
                    ? new Date(subscriber.subscription_end).toLocaleDateString('th-TH')
                    : 'ไม่มีข้อมูล'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Live Rooms */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => {
          const hasAccess = canAccessRoom(room);
          
          return (
            <Card 
              key={room.id}
              className={`transition-all duration-300 hover:shadow-medium ${
                hasAccess ? 'hover:-translate-y-1' : 'opacity-60'
              }`}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{room.room_name}</span>
                  {hasAccess ? (
                    <CheckCircle className="w-5 h-5 text-success" />
                  ) : (
                    <Lock className="w-5 h-5 text-muted-foreground" />
                  )}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{room.course_plan_name}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {room.max_participants && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>สูงสุด {room.max_participants} คน</span>
                  </div>
                )}
                
                <Button 
                  onClick={() => handleJoinRoom(room)}
                  disabled={!hasAccess}
                  className="w-full"
                >
                  {hasAccess ? (
                    <>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      เข้าห้องเรียน
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      ต้องสมัครสมาชิก
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {!subscriber?.subscribed && (
        <Card className="mt-12">
          <CardContent className="text-center py-16">
            <Clock className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-2xl font-bold mb-4">ยังไม่ได้สมัครสมาชิก</h3>
            <p className="text-muted-foreground mb-6">
              สมัครสมาชิกเพื่อเข้าถึงห้องเรียนสดและคุณสมบัติพิเศษต่างๆ
            </p>
            <Button 
              onClick={() => {
                const element = document.getElementById('courses');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              ดูแผนการเรียน
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};