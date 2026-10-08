import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import BackendSkillExplorer from "@/components/backend-skill-explorer";
import { getSkillCategory, skillTypes } from "@/lib/skills";
import pageStyles from "../../page.module.css";
import styles from "./skill-page.module.css";

export function generateStaticParams() {
  return skillTypes.map((type) => ({ type }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const category = getSkillCategory(type);

  if (!category) {
    return { title: "Skills" };
  }

  return {
    title: `${category.heading} skills — Munavark`,
    description: category.description,
  };
}

export default async function SkillPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const category = getSkillCategory(type);

  if (!category) {
    notFound();
  }

  return (
    <div className={pageStyles.page}>
      <header className={pageStyles.header}>
        <Link className={pageStyles.wordmark} href="/" aria-label="Munavark home">
          munavark<span>.</span>
        </Link>
        <nav className={pageStyles.nav} aria-label="Main navigation">
          <Link href="/#work">Work</Link>
          <Link href="/#about">About</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
      </header>
      <main className={`${pageStyles.main} ${styles.page}`}>
        <section className={styles.hero} aria-labelledby="skill-title">
          <Link className={styles.back} href="/">
            <ArrowLeft aria-hidden="true" />
            Back home
          </Link>
          <p className={styles.eyebrow}>{category.heading}</p>
          <h1 id="skill-title">{category.title}</h1>
          <p className={styles.description}>{category.description}</p>
        </section>
        {category.type === "backend" && category.groups ? (
          category.groups.map((group) => (
            <BackendSkillExplorer
              key={group.id}
              title={group.title}
              titleId={group.id}
              skills={group.skills}
            />
          ))
        ) : (
          <ul className={styles.grid}>
            {category.skills.map((skill) => (
              <li key={skill.name} className={styles.skill}>
                <h2 className={styles.skillName}>{skill.name}</h2>
                <p className={styles.skillDetail}>{skill.detail}</p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
