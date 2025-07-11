import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Phone, Mail, MapPin, Clock, CreditCard } from "lucide-react";

export default function Contact() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-success/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            ติดต่อเรา
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            พร้อมให้คำปรึกษาและตอบคำถามเกี่ยวกับการเรียนภาษาอังกฤษ
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="border-0 bg-gradient-card shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-success to-primary flex items-center justify-center text-white">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">LINE Official Account</h3>
                    <p className="text-muted-foreground">@kruenglish</p>
                  </div>
                </div>
                <Button 
                  variant="success" 
                  className="w-full"
                  onClick={() => window.open('https://lin.ee/yOEJxmF', '_blank')}
                >
                  เพิ่มเพื่อน LINE
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-card shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-accent to-primary flex items-center justify-center text-white">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">ช่องทางการชำระเงิน</h3>
                    <p className="text-muted-foreground">ธนาคารไทยพาณิชย์ (SCB)</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">เลขที่บัญชี:</span>
                    <span className="font-mono">640-265-8196</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ชื่อบัญชี:</span>
                    <span>บริษัท เทรนนิ่งดีดี จำกัด</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-0 bg-gradient-card shadow-soft">
                <CardContent className="p-4 text-center">
                  <Clock className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <h4 className="font-semibold mb-1">เวลาทำการ</h4>
                  <p className="text-sm text-muted-foreground">24/7 ออนไลน์</p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-card shadow-soft">
                <CardContent className="p-4 text-center">
                  <MapPin className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <h4 className="font-semibold mb-1">พื้นที่ให้บริการ</h4>
                  <p className="text-sm text-muted-foreground">ทั่วประเทศไทย</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              ทำไมต้องเลือก Kru English?
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-white/50 rounded-lg backdrop-blur-sm">
                <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center text-white flex-shrink-0 mt-1">
                  <span className="text-sm font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">เหมาะสำหรับคนไทยโดยเฉพาะ</h4>
                  <p className="text-sm text-muted-foreground">
                    ออกแบบหลักสูตรและวิธีการสอนให้เหมาะกับผู้เรียนชาวไทยอายุ 18-40 ปี
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white/50 rounded-lg backdrop-blur-sm">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white flex-shrink-0 mt-1">
                  <span className="text-sm font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">ความยืดหยุ่นสูง</h4>
                  <p className="text-sm text-muted-foreground">
                    เรียนได้หลายรูปแบบ ผ่าน Zoom, วิดีโอบันทึก, TikTok Live ตามสะดวก
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white/50 rounded-lg backdrop-blur-sm">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white flex-shrink-0 mt-1">
                  <span className="text-sm font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">เป้าหมายชัดเจน</h4>
                  <p className="text-sm text-muted-foreground">
                    มุ่งเป้าการรักษาการมีส่วนร่วมของผู้เรียน 75% ภายในสองเดือน
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white/50 rounded-lg backdrop-blur-sm">
                <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center text-white flex-shrink-0 mt-1">
                  <span className="text-sm font-bold">4</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">ราคาเหมาะสม</h4>
                  <p className="text-sm text-muted-foreground">
                    เริ่มต้นเพียง 390 บาท/เดือน พร้อมส่วนลดสำหรับการสมัครระยะยาว
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}