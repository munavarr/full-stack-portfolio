"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const roles = ["Front-end developer", "Back-end builder", "Full-stack problem solver"];

export function TypingIntro() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const reduceMotion = useReducedMotion();
  const role = roles[roleIndex];
  const displayedText = reduceMotion ? role : text;

  useEffect(() => {
    if (reduceMotion) {
      return;
    }
    if (!isDeleting && text === role) {
      const pause = window.setTimeout(() => setIsDeleting(true), 1700);
      return () => window.clearTimeout(pause);
    }
    if (isDeleting && text === "") {
      const transition = window.setTimeout(() => {
        setIsDeleting(false);
        setRoleIndex((current) => (current + 1) % roles.length);
      }, 0);
      return () => window.clearTimeout(transition);
    }
    const timeout = window.setTimeout(
      () => setText(role.slice(0, text.length + (isDeleting ? -1 : 1))),
      isDeleting ? 38 : 70,
    );
    return () => window.clearTimeout(timeout);
  }, [isDeleting, reduceMotion, role, text]);

  return <motion.p className="typingLine" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.45 }} aria-label={role}><span aria-hidden="true">{displayedText}</span><span className="caret" aria-hidden="true" /></motion.p>;
}
