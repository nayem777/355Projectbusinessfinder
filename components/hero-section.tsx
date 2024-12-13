import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-[url('/nyc-skyline.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/50" />
      <div className="container relative flex h-full flex-col items-center justify-center text-center text-white">
        <h1 className="mb-4 text-5xl font-bold">Discover New York City</h1>
        <p className="mb-8 text-xl">
          Discover the best things to do in NYC, scored by public reviews, expert recommendations and social signals.
        </p>
        <div className="flex space-x-4">
          <Button variant="secondary">Fine Dining</Button>
          <Button variant="secondary">Broadway Shows</Button>
          <Button variant="secondary">Top Attractions</Button>
        </div>
      </div>
    </div>
  )
}

