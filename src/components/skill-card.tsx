"use client";

import Link from "next/link";
import { skillCategories, type SkillType } from "@/lib/skills";
import styles from "./skill-cards.module.css";

type SkillCardProps = {
  type: SkillType;
};

function SkillCard({ type }: SkillCardProps) {
  const category = skillCategories[type];

  return (
    <Link
      href={`/skills/${type}`}
      className={`${styles.card} ${styles[type]}`}
      aria-label={`View ${category.heading} skills`}
    >
      <div className={styles.cardGlow} />

      <h3 className={styles.title}>{category.title}</h3>

      <div className={styles.hoverContent}>
        <p className={styles.description}>{category.description}</p>

        <div className={styles.skills}>
          {category.skills.map((skill, index) => {
            const direction = index % 2 === 0 ? styles.fromLeft : styles.fromRight;

            return (
              <span
                key={skill.name}
                className={`${styles.skill} ${direction}`}
                style={
                  {
                    "--delay": `${index * 70}ms`,
                  } as React.CSSProperties
                }
              >
                {skill.name}
              </span>
            );
          })}
        </div>
      </div>
    </Link>
  );
}

export default function SkillCards() {
  return (
    <section className={styles.section} id="work">
      <div className={styles.heading}>
        <span className={styles.eyebrow}>TECHNICAL EXPERTISE</span>

        <h2>
          Built across <span>the stack.</span>
        </h2>
      </div>

      <div className={styles.cards}>
        <SkillCard type="frontend" />
        <SkillCard type="backend" />
      </div>
    </section>
  );
}
