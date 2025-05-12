type LogoProps = {
  src: string
  alt: string
  className?: string
  href: string
}

export const Logo = ({ src, alt, className, href }: LogoProps) => (
  <a href={href} target="_blank" rel="noreferrer">
    <img src={src} className={className} alt={alt} />
  </a>
)
