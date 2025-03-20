import type { Metadata } from "next";
import Script from "next/script";
import PageHeader from "@/components/page-header";
import CodeHeader from "@/components/section/about/code-header";
import MarkdownRenderer from "@/components/markdown/markdown-renderer";
import { getBlogPosts } from "@/lib/db/v1/post";
import { BlurFade } from "@/components/magicui/blur-fade";
import config from "@/config";
import LatestArticles from "@/components/about/latest-articles";
import LifeStyles from "@/components/about/life-styles";
import CodingStats from "@/components/about/coding-stats";

const { about, title, description, author, keywords, openGraph, siteURL } =
  config;
const {
  firstName,
  lastName,
  preferredName,
  introduction,
  lifestyles,
  techStacks,
  githubUsername,
} = about;

export const metadata: Metadata = {
  title: title,
  description: description,
  authors: [{ name: author }],
  creator: author,
  keywords: keywords,
  openGraph: {
    url: openGraph.url,
    type: "website",
    siteName: openGraph.siteName,
    title: openGraph.title,
    description: openGraph.description,
    images: openGraph.images,
  },
  manifest: "/manifest.webmanifest",
  twitter: {
    card: "summary_large_image",
    title: "Hugo ChunHo Lin (1chooo) | Open Source Enthusiast",
    description:
      "I'm Chun-Ho (Hugo) Lin, a graduate with a Bachelor's degree from National Central University (NCU) 🐿️, driven by a sincere passion for Software Engineering 💻.",
    images: "https://docs.1chooo.com/images/cover-with-1chooo-com.png",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: [
      {
        url: "/logo192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  },
};

const addJsonLd = () => {
  return {
    __html: `{
      "@context": "http://schema.org",
      "@type": "Person",
      "@id": "${siteURL}#person",
      "givenName": ${firstName},
      "familyName": ${lastName},
      "additionalName": ${preferredName},
      "gender": "male",
      "birthPlace": "New Taipei, TW",
      "nationality": "Taiwan",
      "alumniOf":[
        {
          "@type": "CollegeOrUniversity",
          "name": "National Central University",
          "sameAs": "https://www.ncu.edu.tw/"
        },
      ],
      "jobTitle": "Software Engineer",
      "skills": "Software Engineering, Web Development, Open Source",
      "image": "https://www.1chooo.com/images/profile.webp",
      "url": ${siteURL},
      "sameAs": [
        "https://www.linkedin.com/in/1chooo/",
        "http://github.com/1chooo",
        "https://medium.com/@1chooo",
      ]
    }
  `,
  };
};

async function About() {
  let allBlogs = await getBlogPosts();

  let selectedPosts = allBlogs.map((post: any) => ({
    ...post,
    metadata: {
      ...post.metadata,
      category: post.metadata.category || "Uncategorized",
    },
  }));

  let header = preferredName
    ? `About ${preferredName} 👨🏻‍💻`
    : `About ${firstName} ${lastName} 👨🏻‍💻`;

  return (
    <article>
      <Script
        id="application/ld+json"
        type="application/ld+json"
        dangerouslySetInnerHTML={addJsonLd()}
        key="1chooo-website-jsonld"
      />
      <BlurFade inView>
        <PageHeader header={header} />
      </BlurFade>
      <BlurFade inView delay={0.2}>
        <CodeHeader id="introduction" text="$ ls -al Thanyaret 👨🏻‍💻" />
        <MarkdownRenderer
          className="text-light-gray leading-relaxed"
          content={introduction}
        />
      </BlurFade>

      <BlurFade inView delay={0.6}>
        <CodingStats techStacks={techStacks} githubUsername={githubUsername} />
      </BlurFade>
      <LifeStyles lifestyles={lifestyles} />
    </article>
  );
}

export default About;
