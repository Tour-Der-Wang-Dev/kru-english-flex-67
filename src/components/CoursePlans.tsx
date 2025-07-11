import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Users, Clock, Award, Zap } from "lucide-react";

const coursePlans = [
  {
    id: 'general',
    name: 'General English',
    price: 390,
    period: 'เดือน',
    level: 'A1-B1',
    description: 'เหมาะสำหรับผู้เริ่มต้น เน้นทักษะพื้นฐาน',
    features: [
      'เรียนผ่าน Zoom แบบสด',
      'วิดีโอบันทึกทบทวน',
      'แบบฝึกหัดออนไลน์',
      'ทักษะ 4 ด้าน (ฟัง พูด อ่าน เขียน)',
      'เหมาะสำหรับชีวิตประจำวัน'
    ],
    stripeUrl: 'https://buy.stripe.com/eVqeVe3s7fol9s46pvdby03',
    popular: false,
    icon: <Users className="w-6 h-6" />,
    color: 'from-blue-400 to-blue-600'
  },
  {
    id: 'cefr',
    name: 'CEFR English',
    price: 590,
    period: 'เดือน',
    level: 'A1, A2+',
    description: 'ออกแบบตามมาตรฐาน CEFR สากล',
    features: [
      'เรียนผ่าน Zoom แบบสด',
      'การสอนตามมาตรฐาน CEFR',
      'แบบทดสอบวัดระดับ',
      'เหมาะสำหรับงานวิชาการ',
      'ใช้ในการสอบวัดระดับ'
    ],
    stripeUrl: 'https://buy.stripe.com/3cIcN63s7dgd33G3djdby02',
    popular: true,
    icon: <Award className="w-6 h-6" />,
    color: 'from-green-400 to-green-600'
  },
  {
    id: 'combo',
    name: 'Combo Package',
    price: 1500,
    period: 'แพ็กเกจ',
    level: 'ครบทุกระดับ',
    description: 'รวมคอร์ส General และ CEFR ในแพ็กเกจเดียว',
    features: [
      'General English + CEFR English',
      'เรียนออนไลน์และสอนสด',
      'ความยืดหยุ่นสูงสุด',
      'เหมาะสำหรับพัฒนาครบด้าน',
      'คุ้มค่าที่สุด'
    ],
    stripeUrl: 'https://buy.stripe.com/cNi6oI9Qv6RP1ZCdRXdby01',
    popular: false,
    icon: <Star className="w-6 h-6" />,
    color: 'from-purple-400 to-purple-600'
  },
  {
    id: 'small_group',
    name: 'Small Group',
    price: 4680,
    period: 'แพ็กเกจ',
    level: 'ทุกระดับ',
    description: 'เรียนแบบกลุ่มย่อยเพื่อเพิ่มการปฏิสัมพันธ์',
    features: [
      'เรียนกลุ่มเล็ก เฉพาะเจาะจง',
      'การปฏิสัมพันธ์สูง',
      'ฝึกพูดเน้นหนัก',
      'ผ่าน Zoom หรือ In-person',
      'ความใส่ใจเป็นพิเศษ'
    ],
    stripeUrl: 'https://buy.stripe.com/8x214o9QvgspdIk4hndby00',
    popular: false,
    icon: <Zap className="w-6 h-6" />,
    color: 'from-orange-400 to-orange-600'
  }
];

export default function CoursePlans() {
  const handlePayment = (stripeUrl: string) => {
    window.open(stripeUrl, '_blank');
  };

  return (
    <section id="courses" className="py-20 bg-gradient-to-br from-background to-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            แผนการเรียนและราคา
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            เลือกแผนการเรียนที่เหมาะกับคุณ พร้อมส่วนลด 10-20% สำหรับการสมัครระยะยาว
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coursePlans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-strong hover:-translate-y-2 ${
                plan.popular ? 'ring-2 ring-primary shadow-medium' : ''
              }`}
            >
              {plan.popular && (
                <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
                  แนะนำ
                </Badge>
              )}
              
              <CardHeader className="text-center pb-2">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center text-white`}>
                  {plan.icon}
                </div>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="flex items-baseline justify-center mt-4">
                  <span className="text-4xl font-bold text-primary">
                    ฿{plan.price.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground ml-2">/{plan.period}</span>
                </div>
                <Badge variant="outline" className="mt-2">
                  ระดับ {plan.level}
                </Badge>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-center text-muted-foreground">
                  {plan.description}
                </p>
                
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  variant={plan.popular ? "hero" : "default"}
                  className="w-full mt-6"
                  onClick={() => handlePayment(plan.stripeUrl)}
                >
                  เลือกแผนนี้
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-6 py-3 rounded-full">
            <Clock className="w-5 h-5" />
            <span className="font-medium">ส่วนลดพิเศษ 10-20% สำหรับการสมัครระยะยาว 3 เดือนขึ้นไป</span>
          </div>
        </div>
      </div>
    </section>
  );
}