import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X, BookOpen } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-md border-b z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-success flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">Kru English</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('courses')}
              className="text-foreground hover:text-primary transition-colors"
            >
              แผนการเรียน
            </button>
            <button 
              onClick={() => scrollToSection('features')}
              className="text-foreground hover:text-primary transition-colors"
            >
              คุณสมบัติ
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-foreground hover:text-primary transition-colors"
            >
              ติดต่อเรา
            </button>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button 
              variant="outline"
              onClick={() => window.open('https://lin.ee/yOEJxmF', '_blank')}
            >
              ติดต่อสอบถาม
            </Button>
            <Button 
              variant="default"
              onClick={() => scrollToSection('courses')}
            >
              เริ่มเรียนเลย
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-4">
              <button 
                onClick={() => scrollToSection('courses')}
                className="text-left px-4 py-2 text-foreground hover:text-primary transition-colors"
              >
                แผนการเรียน
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className="text-left px-4 py-2 text-foreground hover:text-primary transition-colors"
              >
                คุณสมบัติ
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-left px-4 py-2 text-foreground hover:text-primary transition-colors"
              >
                ติดต่อเรา
              </button>
              <div className="flex flex-col gap-2 px-4 pt-4 border-t">
                <Button 
                  variant="outline"
                  onClick={() => {
                    window.open('https://lin.ee/yOEJxmF', '_blank');
                    setIsMenuOpen(false);
                  }}
                >
                  ติดต่อสอบถาม
                </Button>
                <Button 
                  variant="default"
                  onClick={() => scrollToSection('courses')}
                >
                  เริ่มเรียนเลย
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}