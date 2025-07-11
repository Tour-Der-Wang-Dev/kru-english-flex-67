import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-banner.jpg";
import { BookOpen, Users, Video, TrendingUp } from "lucide-react";

export default function Hero() {
  const scrollToCourses = () => {
    document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Kru English Learning Platform" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-success/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="block">เรียนภาษาอังกฤษ</span>
            <span className="block bg-gradient-to-r from-accent to-white bg-clip-text text-transparent">
              ออนไลน์
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
            แพลตฟอร์มเรียนภาษาอังกฤษออนไลน์ที่ออกแบบมาเพื่อคนไทย<br />
            เรียนแบบยืดหยุ่น ผ่าน Zoom, วิดีโอบันทึก และ TikTok Live
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <BookOpen className="w-5 h-5" />
              <span>เนื้อหาครบถ้วน</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Video className="w-5 h-5" />
              <span>สอนสดออนไลน์</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Users className="w-5 h-5" />
              <span>เรียนกลุ่มเล็ก</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <TrendingUp className="w-5 h-5" />
              <span>พัฒนาอย่างต่อเนื่อง</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={scrollToCourses}
              className="text-lg px-8 py-6"
            >
              เลือกแผนการเรียน
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-primary"
              onClick={() => window.open('https://lin.ee/yOEJxmF', '_blank')}
            >
              ติดต่อสอบถาม
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">300+</div>
              <div className="text-sm opacity-80">เป้าหมายผู้เรียน</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">75%</div>
              <div className="text-sm opacity-80">อัตราความพึงพอใจ</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">4</div>
              <div className="text-sm opacity-80">แผนการเรียน</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-sm opacity-80">เรียนได้ตลอดเวลา</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}