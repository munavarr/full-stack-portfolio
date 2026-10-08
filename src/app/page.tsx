"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { TypingIntro } from "@/components/typing-intro";
import styles from "./page.module.css";
import SkillCards from "@/components/skill-card";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <a className={styles.wordmark} href="#top" aria-label="Munavark home">munavark<span>.</span></a>
        <nav className={styles.nav} aria-label="Main navigation"><a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a></nav>
      </header>
      <main className={styles.main} id="top">
        <section className={styles.hero} aria-labelledby="intro-title">
          <div className={styles.content}>
            <motion.h1 id="intro-title" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: "easeOut" }}>Hi, I’m Munavark.</motion.h1>
            <TypingIntro />
            <motion.p className='typingLine' initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.45 }}>I design thoughtful interfaces and build the systems behind them.</motion.p>
            <motion.div className={styles.actions} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.45 }}>
              <a className={styles.primaryAction} href="#work">View my work <ArrowDownRight aria-hidden="true" /></a>
              <a className={styles.secondaryAction} href="mailto:hello@munavark.dev">Let’s talk <ArrowUpRight aria-hidden="true" /></a>
            </motion.div>
          </div>
          <motion.div className={styles.artwork} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.18, duration: 0.75, ease: "easeOut" }}>
            {/* <Image src="/images/munavark-code-mark.png" alt="Abstract M monogram assembled from code panels" fill priority sizes="(max-width: 780px) 88vw, 48vw" /> */}
          </motion.div>
        </section>
        <SkillCards />
        <section className={styles.about} id="about" aria-labelledby="about-title">
          <p className={styles.sectionLabel}>ABOUT</p>
          <div>
            <h2 id="about-title">A product-minded developer who enjoys both sides of the stack.</h2>
            <p>I turn complex requirements into clear, durable digital experiences—from the interface a person uses to the APIs and data flows that make it work.</p>
          </div>
        </section>
        <section className={styles.contact} id="contact" aria-labelledby="contact-title">
          <p className={styles.sectionLabel}>LET’S BUILD</p>
          <div>
            <h2 id="contact-title">Have a project in mind?</h2>
            <a href="mailto:hello@munavark.dev">hello@munavark.dev <ArrowUpRight aria-hidden="true" /></a>
          </div>
        </section>
      </main>
      <footer className={styles.footer}><span className={styles.statusDot} aria-hidden="true" />Available for select collaborations</footer>
    </div>
  );
}
