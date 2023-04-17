import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer>
      <div className="my-8 flex items-center">
        <div className="flex items-center justify-center ml-0 mr-auto leading-12 space-x-4">
          <SocialIcon kind="github" href={siteMetadata.github} size={6}/>
          <SocialIcon kind="facebook" href={siteMetadata.facebook} size={6} />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
        </div>
        <div className="flex mr-0 ml-auto text-md leading-12 text-amber-400">
          {"Feito com <3 por Marina Santos e Vinicius Alves"}
        </div>
      </div>
    </footer>
  )
}
