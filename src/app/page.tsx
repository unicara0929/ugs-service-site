import {
  Header,
  Footer,
  Hero,
  About,
  Numbers,
  Stories,
  Business,
  Events,
  Recruit,
} from "@/components";
import content from "../../content/ja.json";

export default function Home() {
  return (
    <>
      <Header logo={content.header.logo} nav={content.header.nav} />
      <main>
        <Hero
          catchCopy={content.hero.catchCopy}
          subCopy={content.hero.subCopy}
          cta={content.hero.cta}
          scrollText={content.hero.scrollText}
        />
        <About
          label={content.about.label}
          title={content.about.title}
          description={content.about.description}
          points={content.about.points}
        />
        <Numbers
          label={content.numbers.label}
          title={content.numbers.title}
          items={content.numbers.items}
        />
        <Stories
          label={content.stories.label}
          title={content.stories.title}
          description={content.stories.description}
          members={content.stories.members}
        />
        <Business
          label={content.business.label}
          title={content.business.title}
          description={content.business.description}
          services={content.business.services}
        />
        <Events
          label={content.events.label}
          title={content.events.title}
          description={content.events.description}
          list={content.events.list}
        />
        <Recruit
          label={content.recruit.label}
          title={content.recruit.title}
          description={content.recruit.description}
          positions={content.recruit.positions}
          cta={content.recruit.cta}
        />
      </main>
      <Footer
        nav={content.footer.nav}
        social={content.footer.social}
        copyright={content.footer.copyright}
      />
    </>
  );
}
