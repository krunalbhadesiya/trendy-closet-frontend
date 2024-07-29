// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { CodeIcon, CompassIcon, DiscIcon, LeafyGreenIcon, MountainIcon } from "lucide-react"
// import Link from "react-router-dom"

export default function AboutUs() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <section className="relative h-[70vh] w-full overflow-hidden">
        <img src="/hero-bg.jpeg" alt="T-shirt designs" className="h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.5)]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 px-4 text-center text-primary-foreground">
          <MountainIcon className="h-12 w-12" />
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Crafting the Perfect Tee</h1>
          <p className="max-w-[600px] text-lg">
            At our t-shirt store, we're passionate about creating high-quality, ethically-sourced apparel that
            celebrates individuality and self-expression.
          </p>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid gap-8 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Meet the Founders</h2>
            <p className="text-muted-foreground">
              Our journey began with a shared vision to create a brand that empowers individuals and celebrates
              diversity.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col items-center space-y-2">
              {/* <Avatar>
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar> */}
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-primary-foreground text-sm">
                JD
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-sm text-muted-foreground">Co-Founder</p>
              </div>
              <p className="text-sm text-muted-foreground">
                John is a passionate designer with a keen eye for detail and a commitment to sustainable fashion.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-primary-foreground text-sm">
                JA
              </div>
              {/* <Avatar>
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JA</AvatarFallback>
              </Avatar> */}
              <div className="text-center">
                <p className="text-sm font-medium">Jane Appleseed</p>
                <p className="text-sm text-muted-foreground">Co-Founder</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Jane is a seasoned entrepreneur with a deep understanding of the fashion industry and a passion for
                empowering communities.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container grid gap-8 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Crafted with Care</h2>
            <p className="text-muted-foreground">
              Our t-shirts are made with the highest quality materials and attention to detail, ensuring a comfortable
              and long-lasting wear.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col items-center space-y-2">
              <LeafyGreenIcon className="h-8 w-8 text-primary" />
              <h3 className="text-lg font-medium">Organic Cotton</h3>
              <p className="text-sm text-muted-foreground">
                Our t-shirts are made from 100% organic cotton, ensuring a soft and breathable feel.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <DiscIcon className="h-8 w-8 text-primary" />
              <h3 className="text-lg font-medium">Durable Construction</h3>
              <p className="text-sm text-muted-foreground">
                Reinforced seams and high-quality stitching ensure our t-shirts last through wear and wash.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <CodeIcon className="h-8 w-8 text-primary" />
              <h3 className="text-lg font-medium">Ethical Production</h3>
              <p className="text-sm text-muted-foreground">
                Our t-shirts are produced in fair-trade facilities with sustainable and ethical practices.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <CompassIcon className="h-8 w-8 text-primary" />
              <h3 className="text-lg font-medium">Comfortable Fit</h3>
              <p className="text-sm text-muted-foreground">
                Our t-shirts are designed with a relaxed, comfortable fit that moves with you.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container flex flex-col items-center justify-center space-y-4 px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Discover Our Collection</h2>
          <p className="max-w-[600px] text-muted-foreground">
            Explore our latest designs and find the perfect t-shirt to express your style.
          </p>
          {/* <Link to="" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
            Shop Now
          </Link> */}
        </div>
      </section>
    </div>
  )
}
