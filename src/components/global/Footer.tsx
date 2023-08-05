import { type IMenuItem } from "@ali/src/types";
import {
  IconFacebook,
  IconInstagram,
  IconPinterest,
  IconTwitter,
} from "../elements";
import Button from "../elements/Button";
import Section from "../elements/Section";
import Text from "../elements/Text";
// RE-X_test-2

function Footer({ menuItems }: { menuItems: IMenuItem[] }): JSX.Element {
  const socialLinks: Array<{
    title: string;
    icon: React.FC;
    link: string;
  }> = [
    {
      title: "instagram",
      icon: IconInstagram,
      link: "https://www.instagram.com/",
    },
    {
      title: "facebook",
      icon: IconFacebook,
      link: "https://www.facebook.com/",
    },
    {
      title: "pinterest",
      icon: IconPinterest,
      link: "https://www.pinterest.ca/",
    },
    {
      title: "twitter",
      icon: IconTwitter,
      link: "https://twitter.com/",
    },
  ];

  return (
    <Section
      padding="all"
      display="flex"
      className=" w-screen flex-col justify-center items-center bottom-0 bg-primary"
    >
      <ul
        aria-label="social link menu"
        className="flex flex-row flex-wrap justify-center items-center gap-4"
      >
        {socialLinks?.map((link) => {
          const Icon = link.icon;
          return (
            <li key={link.title}>
              <Button as="a" variant="link" href={link.link}>
                <span className="sr-only">{link.title}</span>
                <Icon />
              </Button>
            </li>
          );
        })}
      </ul>
      <ul className="flex flex-col items-center justify-center gap-8 py-16">
        {menuItems?.map((link) => {
          return (
            <li key={link.cta}>
              <Button as="a" variant="link" href={link.link}>
                <Text
                  size="small"
                  className="text-accent"
                  fontWeight={"semibold"}
                >
                  {link.cta}
                </Text>
              </Button>
            </li>
          );
        })}
      </ul>
      <Text fontWeight="semibold" size="lead">
        {" "}
        &#169; CRIBS KGL
      </Text>
    </Section>
  );
}

export default Footer;
