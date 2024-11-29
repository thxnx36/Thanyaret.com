import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { LuEye } from "react-icons/lu";
import AboutText from '@/components/about/about-text';
import GitHubStats from '@/components/about/github-stats';
import TechStack from '@/components/about/tech-stack';
import LifeStyles from '@/components/about/life-styles';
import PageHeader from '@/components/page-header';
import AboutHeader from '@/components/about/about-header';
import MarkdownRenderer from "@/components/markdown/markdown-renderer";
import { FaRegPenToSquare } from "react-icons/fa6";
import SeeMoreButton from "@/components/about/see-more-btn";
import { getBlogPosts } from "@/lib/db/blog";
import config from '@/config';

import "@/styles/about/latest-posts.css";

const { about } = config;
const { subHeader, pronouns } = about;
const { firstName, lastName } = about;
const { preferredName } = about;
const { title } = config;
const { introduction } = config.about;
const { lifestyles } = about;
const { programmingLanguage, devOps } = about;

export const metadata: Metadata = {
  title: title,
};

const header =
  preferredName === ''
    ? `About ${firstName} ${lastName} 👨🏻‍💻`
    : `About ${preferredName} 👨🏻‍💻`;

const About = async () => {
  let allBlogs = await getBlogPosts();

  let selectedPosts = allBlogs
    .map(post => ({
      ...post,
      metadata: {
        ...post.metadata,
        category: post.metadata.category || 'Uncategorized',
      },
    }))
    .sort((a, b) => {
      if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
        return -1;
      }
      return 1;
    });

  if (selectedPosts.length > 5) {
    selectedPosts = selectedPosts.slice(0, 5);
  }

  return (
    <article>
      <PageHeader header={header} />
      <AboutHeader text={`${subHeader} (${pronouns})`} />
      <AboutText introduction={introduction} />
      <AboutHeader text="$ ls -al Latest Articles" />
      <section>
        <ul className="latest-post-list has-scrollbar">
          {selectedPosts.map((post, index) => (
            <li
              key={index}
              className="latest-post-item active"
              data-category={post.metadata.category}
            >
              <Link href={`/blog/${post.slug}`} rel="noopener noreferrer">
                <figure className="latest-post-img">
                  <div className="latest-post-item-icon-box">
                    <LuEye />
                  </div>
                  <Image
                    src={post.metadata.banner}
                    alt={post.metadata.alt || "Blog post image"}
                    width={1600}
                    height={900}
                    priority={true}
                    placeholder="empty"
                    loading="eager"
                  />
                </figure>
                <h3 className="latest-post-title"><MarkdownRenderer content={post.metadata.title} /></h3>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <SeeMoreButton badge="See All Articles" path="/blog" icon={FaRegPenToSquare} />
      <AboutHeader text="$ ls -al GitHub Stats" />
      <GitHubStats />
      <AboutHeader text="$ ls -al Tech Stack" />
      <TechStack techStack={programmingLanguage}/>
      <TechStack techStack={devOps}/>
      <AboutHeader text="$ ls -al Life Style" />
      <LifeStyles lifestyles={lifestyles} />
    </article>
  );
}

export default About
