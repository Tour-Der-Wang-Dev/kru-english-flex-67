import { Card, CardContent } from "@/components/ui/card";
import { Video, Clock, Users, BookOpen, Smartphone, Globe } from "lucide-react";

const features = [
  {
    icon: <Video className="w-8 h-8" />,
    title: "เรียนผ่าน Zoom Live",
    description: "เรียนแบบสดผ่าน Zoom พร้อมการปฏิสัมพันธ์แบบเรียลไทม์กับอาจารย์และเพื่อนร่วมชั้น"
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: "วิดีโอบันทึกทบทวน",
    description: "เข้าถึงวิดีโอบันทึกการสอนได้ตลอดเวลา สามารถทบทวนบทเรียนได้ไม่จำกัด"
  },
  {
    icon: <Smartphone className="w-8 h-8" />,
    title: "TikTok Live สอนสด",
    description: "เรียนผ่าน TikTok Live ในรูปแบบที่สนุกและทันสมัย เข้าถึงได้ง่ายบนมือถือ"
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "เรียนได้ทุกเวลา",
    description: "ความยืดหยุ่นในการเรียน เลือกเวลาที่เหมาะกับตัวคุณ ไม่มีข้อจำกัดเรื่องเวลา"
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "กลุ่มเรียนเล็ก",
    description: "เรียนแบบกลุ่มเล็กเพื่อการดูแลเป็นพิเศษ และเพิ่มโอกาสในการฝึกพูด"
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "LINE OA Support",
    description: "ติดต่อสอบถามและรับการสนับสนุนผ่าน LINE OA @kruenglish ตลอด 24 ชั่วโมง"
  }
];

export default function Features() {
  return (
    <section className="py-20 bg-gradient-to-br from-secondary/30 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            คุณสมบัติเด่น
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            แพลตฟอร์มการเรียนรู้ที่ออกแบบมาเพื่อให้คุณเรียนภาษาอังกฤษได้อย่างมีประสิทธิภาพ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-0"
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-success flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}