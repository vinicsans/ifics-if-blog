import Link from "./Link";
import siteMetadata from "@/data/siteMetadata";
import SocialIcon from "@/components/social-icons";

export default function Footer() {
  return (
    <footer>
      <div className="my-8 flex items-center">
        <div className="ml-0 mr-auto flex items-center justify-center space-x-4 leading-12">
          <SocialIcon kind="github" href={siteMetadata.github} size={6} />
          <SocialIcon kind="facebook" href={siteMetadata.facebook} size={6} />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
        </div>
        <div className="text-md ml-auto mr-0 flex leading-12 text-amber-400 max-sm:text-sm">
          {"Feito com <3 por Marina Santos e Vinicius Alves"}
        </div>
      </div>
    </footer>
  );
}
