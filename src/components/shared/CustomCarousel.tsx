import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"

interface CustomeCarouselProps {
    imagePaths: string[];
}

export default function CustomCarousel({imagePaths}:CustomeCarouselProps) {

  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])
      return (
      <Carousel setApi={setApi} className="w-full" dir='rtl' opts={{
        direction: "rtl",
      }}>
        <CarouselContent>
          {imagePaths.map((imagePath, index) => (
            <CarouselItem key={index}>
                <div className="group/card relative aspect-square overflow-hidden border-0 p-0">
                  <img
                    src={imagePath}
                    alt={`Slide ${index + 1}`}
                    width={800}
                    height={800}
                    className="absolute inset-0 size-full scale-100 object-cover transition-transform duration-500 ease-in-out group-hover/card:scale-105"
                  />
                  {/* Background fade effects */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/80 to-transparent" />
  
                </div>
              
            </CarouselItem>
          ))}
        </CarouselContent>
  
        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 py-3 absolute bottom-2 inset-x-0">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={cn(
                "h-2 cursor-pointer rounded-full transition-all duration-500 ease-in-out",
                index === current
                  ? "bg-gradient w-4 opacity-100"
                  : "bg-muted w-2 opacity-30 hover:opacity-50"
              )}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    )
}
