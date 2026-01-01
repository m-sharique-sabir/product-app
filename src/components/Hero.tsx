import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';

const SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    headline: "Summer Collection 2026",
    subtext: "Discover the latest trends in fashion. Elevate your style with our premium collection.",
    cta: "Shop Collection"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    headline: "New Arrivals in Tech",
    subtext: "Upgrade your lifestyle with cutting-edge electronics and smart gadgets.",
    cta: "Explore Tech"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    headline: "Modern Home Aesthetics",
    subtext: "Transform your living space with our curated selection of home decor.",
    cta: "View Home"
  }
];

const Hero = () => {
  return (
    <div className="mx-4 mt-6 md:mx-6 lg:mx-8">
      <Carousel className="w-full relative rounded-xl overflow-hidden shadow-xl" opts={{ loop: true }}>
        <CarouselContent>
          {SLIDES.map((slide) => (
            <CarouselItem key={slide.id} className="relative h-[500px] md:h-[600px]">
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt={slide.headline}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-center px-8 md:px-16 max-w-4xl">
                <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4 animate-in slide-in-from-left duration-500">
                  {slide.headline}
                </h2>
                <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl animate-in fade-in duration-700 delay-200">
                  {slide.subtext}
                </p>
                <div className="animate-in fade-in slide-in-from-bottom duration-700 delay-300">
                  <Link to="/shop">
                    <Button 
                      size="lg" 
                      className="bg-white text-gray-900 hover:bg-gray-100 hover:text-indigo-600 rounded-full text-lg px-8 py-6 transition-all"
                    >
                      {slide.cta}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Navigation Controls */}
        <div className="hidden md:block">
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white text-white hover:text-gray-900 border-none h-12 w-12" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white text-white hover:text-gray-900 border-none h-12 w-12" />
        </div>
      </Carousel>
    </div>
  );
};

export default Hero;
