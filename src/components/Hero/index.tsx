interface HeroProps {
  title: string
}

export function Hero({ title }: HeroProps) {
  return (
    <div>
      <h1 className='text-2xl py-4 text-center font-bold'>{title}</h1>
    </div>
  )
}

export default Hero
