"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { SkillItem } from "@/lib/skills";
import styles from "./backend-skill-explorer.module.css";

const LEFT_COLUMN_COUNT = 4;
const MOVE_MS = 780;
const CLOSE_MS = 720;
const STAGGER_MS = 52;
const FADE_MS = 280;
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const postgresBranches = [
  {
    title: "Performance",
    items: ["Indexing", "Query plans", "EXPLAIN", "Pooling"],
  },
  {
    title: "Consistency",
    items: ["Transactions", "Isolation", "Locking", "Concurrency"],
  },
  {
    title: "Data design",
    items: ["Schema design", "Constraints", "Relationships", "JSONB"],
  },
];

function PostgresDiagram() {
  return (
    <figure className={styles.map}>
      <p className={styles.mapRoot}>PostgreSQL</p>
      <div className={styles.mapRail} aria-hidden="true" />
      <div className={styles.mapCols}>
        {postgresBranches.map((branch) => (
          <div key={branch.title} className={styles.mapCol}>
            <h4 className={styles.mapColTitle}>{branch.title}</h4>
            <ul className={styles.mapList}>
              {branch.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className={styles.mapRail} aria-hidden="true" />
      <p className={styles.mapResult}>Production data</p>
      <p className={styles.mapTagline}>Fast · Consistent · Scalable</p>
    </figure>
  );
}

const nodePaths = [
  { title: "Async I/O", note: null },
  { title: "Streams", note: "Backpressure" },
  { title: "Network", note: null },
];

type DetailBlock =
  | { kind: "subtitle" | "subhead" | "copy" | "tags" | "flow" | "lead" | "diagram"; text: string };

function parseDetail(detail: string): DetailBlock[] {
  const chunks = detail.trim().split(/\n{2,}/);
  const blocks: DetailBlock[] = [];
  let nested = false;

  for (const chunk of chunks) {
    const text = chunk.trim();
    if (!text) continue;

    const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
    if (lines.length > 1 && lines[0] && !lines[0].includes("·") && lines.slice(1).every((line) => line.includes("·"))) {
      const heading = lines[0];
      if (/^technical depth$/i.test(heading)) nested = true;
      const kind = nested && !/^technical depth$/i.test(heading) ? "subhead" : "subtitle";
      blocks.push({ kind, text: heading });
      blocks.push({ kind: "tags", text: lines.slice(1).join(" ") });
      continue;
    }

    if (/^\[\[.+\]\]$/.test(text)) {
      blocks.push({ kind: "diagram", text });
      continue;
    }

    if (text.includes("·")) {
      blocks.push({ kind: "tags", text: text.replace(/\n/g, " ") });
      continue;
    }

    if (text.includes("→")) {
      blocks.push({ kind: "flow", text });
      continue;
    }

    if (text.endsWith(":") && text.length < 40 && !text.includes(".")) {
      blocks.push({ kind: "lead", text });
      continue;
    }

    const heading =
      !text.includes("\n") &&
      text.length <= 90 &&
      !/[.!?]$/.test(text);

    if (heading) {
      if (/^technical depth$/i.test(text)) nested = true;
      const kind = nested && !/^technical depth$/i.test(text) ? "subhead" : "subtitle";
      blocks.push({ kind, text });
      continue;
    }

    blocks.push({ kind: "copy", text });
  }

  return blocks;
}

function InlineText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={index} className={styles.detailStrong}>
              {part.slice(2, -2)}
            </strong>
          );
        }

        return <span key={index}>{part}</span>;
      })}
    </>
  );
}

const nestLifecycle = [
  "Request",
  "Middleware",
  "Guards",
  "Interceptors",
  "Pipes",
  "Controller",
  "Service",
  "Repository",
  "Response",
];

function NestLifecycleDiagram() {
  return (
    <figure className={styles.stack}>
      {nestLifecycle.map((step, index) => (
        <div key={step} className={styles.stackItem}>
          <p className={index === 0 || index === nestLifecycle.length - 1 ? styles.stackEnds : styles.stackStep}>
            {step}
          </p>
          {index < nestLifecycle.length - 1 ? <div className={styles.stackRail} aria-hidden="true" /> : null}
        </div>
      ))}
    </figure>
  );
}

function NestAsyncDiagram() {
  return (
    <figure className={styles.asyncMap}>
      <p className={styles.mapRoot}>HTTP request</p>
      <div className={styles.mapRail} aria-hidden="true" />
      <div className={styles.flowBox}>
        <p className={styles.flowBoxTitle}>NestJS service</p>
      </div>
      <div className={styles.asyncBranch}>
        <div className={styles.asyncSpine} aria-hidden="true" />
        <div className={styles.asyncArm} aria-hidden="true" />
        <p className={styles.asyncSide}>Immediate response</p>
      </div>
      <p className={styles.flowStep}>Event</p>
      <div className={styles.mapRail} aria-hidden="true" />
      <p className={styles.flowStep}>Message broker</p>
      <div className={styles.mapRail} aria-hidden="true" />
      <div className={styles.flowBox}>
        <p className={styles.flowBoxTitle}>Consumer / Worker</p>
      </div>
      <div className={styles.mapRail} aria-hidden="true" />
      <p className={styles.mapResult}>Background processing</p>
    </figure>
  );
}

const NestArchitecture = () => {
  return (
    <section className={styles.architecture} aria-label="NestJS backend architecture">
      <div className={styles.architectureHeader}>
        <span>NESTJS</span>
        <p>Backend Architecture</p>
      </div>

      <div className={styles.architectureFlow}>

        {/* Request + Domain */}
        <div className={styles.topLayers}>

          <div className={styles.layer}>
            <div className={styles.layerTitle}>
              <span>01</span>
              REQUEST LAYER
            </div>

            <div className={styles.nodes}>
              <div className={styles.node}>Middleware</div>
              <div className={styles.node}>Guards</div>
              <div className={styles.node}>Pipes</div>
              <div className={styles.node}>Interceptors</div>
            </div>
          </div>

          <div className={styles.layer}>
            <div className={styles.layerTitle}>
              <span>02</span>
              DOMAIN LAYER
            </div>

            <div className={styles.nodes}>
              <div className={styles.node}>Controllers</div>
              <div className={styles.node}>Services</div>
            </div>
          </div>

        </div>

        <div className={styles.connector} aria-hidden="true" />

        {/* DI */}
        <div className={styles.coreNode}>
          <small>CORE</small>
          <strong>Dependency Injection</strong>
        </div>

        <div className={styles.connector} aria-hidden="true" />

        {/* Infrastructure */}
        <div className={styles.infrastructure}>

          <div className={styles.infraNode}>
            <span>01</span>
            <strong>Database</strong>
            <small>Persistence</small>
          </div>

          <div className={styles.infraNode}>
            <span>02</span>
            <strong>Cache</strong>
            <small>Performance</small>
          </div>

          <div className={styles.infraNode}>
            <span>03</span>
            <strong>External APIs</strong>
            <small>Integrations</small>
          </div>

        </div>

        <div className={styles.connector} aria-hidden="true" />

        {/* Events */}
        <div className={styles.eventLayer}>
          <small>ASYNC / EVENT-DRIVEN</small>
          <strong>Event / Message Layer</strong>

          <div className={styles.messageBrokers}>
            <div className={styles.broker}>
              <span>01</span>
              Kafka
            </div>

            <div className={styles.broker}>
              <span>02</span>
              RabbitMQ
            </div>
          </div>
        </div>

        <div className={styles.connector} aria-hidden="true" />

        {/* Services */}
        <div className={styles.servicesNode}>
          <small>DISTRIBUTED SYSTEM</small>
          <strong>Other Services</strong>
        </div>

      </div>
    </section>
  );
};

function SkillDetail({ detail }: { detail: string }) {
  const blocks = parseDetail(detail);

  return (
    <div className={styles.detail}>
      {blocks.map((block, index) => {
        if (block.kind === "subtitle") {
          return (
            <h4 key={`${block.text}-${index}`} className={styles.detailSubtitle}>
              {block.text}
            </h4>
          );
        }

        if (block.kind === "subhead") {
          return (
            <h5 key={`${block.text}-${index}`} className={styles.detailSubhead}>
              {block.text}
            </h5>
          );
        }

        if (block.kind === "tags") {
          return (
            <p key={`${block.text}-${index}`} className={styles.detailTags}>
              {block.text}
            </p>
          );
        }

        if (block.kind === "flow") {
          return (
            <p key={`${block.text}-${index}`} className={styles.detailFlow}>
              {block.text}
            </p>
          );
        }

        if (block.kind === "lead") {
          return (
            <p key={`${block.text}-${index}`} className={styles.detailLead}>
              {block.text}
            </p>
          );
        }

        if (block.kind === "diagram") {
          if (block.text === "[[NEST_LIFECYCLE]]") {
            return <NestLifecycleDiagram key={`diagram-${index}`} />;
          }

          if (block.text === "[[NEST_ASYNC]]") {
            return <NestAsyncDiagram key={`diagram-${index}`} />;
          }

          return null;
        }

        return (
          <p key={`${block.text.slice(0, 24)}-${index}`} className={styles.detailCopy}>
            <InlineText text={block.text} />
          </p>
        );
      })}
    </div>
  );
}

function NodeDiagram() {
  return (
    <figure className={styles.map}>
      <p className={styles.mapRoot}>Incoming work</p>
      <div className={styles.mapRail} aria-hidden="true" />
      <div className={styles.flowBox}>
        <p className={styles.flowBoxTitle}>Node.js</p>
        <p className={styles.flowBoxNote}>Event loop</p>
      </div>
      <div className={styles.mapRail} aria-hidden="true" />
      <div className={`${styles.mapCols} ${styles.flowCols}`}>
        {nodePaths.map((path) => (
          <div key={path.title} className={styles.mapCol}>
            <h4 className={styles.mapColTitle}>{path.title}</h4>
            {path.note ? <p className={styles.flowPathNote}>{path.note}</p> : null}
          </div>
        ))}
      </div>
      <div className={styles.mapRail} aria-hidden="true" />
      <p className={styles.flowQuestion}>CPU-heavy work?</p>
      <div className={styles.mapRail} aria-hidden="true" />
      <div className={styles.flowBox}>
        <p className={styles.flowBoxTitle}>Worker threads</p>
        <p className={styles.flowBoxNote}>/ Processes</p>
      </div>
      <div className={styles.mapRail} aria-hidden="true" />
      <p className={styles.flowStep}>Multiple processes</p>
      <div className={styles.mapRail} aria-hidden="true" />
      <p className={styles.flowStep}>Load balancer</p>
      <div className={styles.mapRail} aria-hidden="true" />
      <p className={styles.mapResult}>Scalable service</p>
    </figure>
  );
}




type BackendSkillExplorerProps = {
  title: string;
  titleId: string;
  skills: SkillItem[];
};

export default function BackendSkillExplorer({
  title,
  titleId,
  skills,
}: BackendSkillExplorerProps) {
  const [activeName, setActiveName] = useState<string | null>(null);
  const [detailReady, setDetailReady] = useState(false);
  const [motionTick, setMotionTick] = useState(0);
  const bubbleRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const positions = useRef<(DOMRect | null)[]>([]);
  const layoutSettled = useRef(false);
  const runId = useRef(0);
  const startedRun = useRef(0);
  const closing = useRef(false);
  const closeTimer = useRef<number | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const stageHeight = useRef<number | null>(null);
  const [detailLeaving, setDetailLeaving] = useState(false);
  const expanded = activeName !== null;
  const active = skills.find((skill) => skill.name === activeName);

  function rememberPositions() {
    positions.current = bubbleRefs.current.map((element) =>
      element ? element.getBoundingClientRect() : null,
    );
    stageHeight.current = stageRef.current?.getBoundingClientRect().height ?? null;
  }

  function beginMotion(nextName: string | null) {
    rememberPositions();
    runId.current += 1;
    layoutSettled.current = false;
    setDetailReady(false);
    setDetailLeaving(false);
    setActiveName(nextName);
    setMotionTick((tick) => tick + 1);
  }

  function select(name: string) {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (closing.current) {
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
      closing.current = false;
      setDetailLeaving(false);

      if (name === activeName) {
        beginMotion(null);
        return;
      }

      setActiveName(name);
      setDetailReady(true);
      return;
    }

    if (name !== activeName && activeName !== null) {
      setActiveName(name);
      if (layoutSettled.current) setDetailReady(true);
      return;
    }

    if (name === activeName) {
      if (reduced || !detailReady) {
        beginMotion(null);
        return;
      }

      closing.current = true;
      setDetailLeaving(true);
      closeTimer.current = window.setTimeout(() => {
        closing.current = false;
        beginMotion(null);
      }, FADE_MS);
      return;
    }

    beginMotion(name);
  }

  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = runId.current;

    if (id === 0) return;

    if (reduced) {
      if (expanded) {
        layoutSettled.current = true;
        setDetailReady(true);
      }
      return;
    }

    if (startedRun.current === id) return;
    startedRun.current = id;

    bubbleRefs.current.forEach((element) => {
      element?.getAnimations().forEach((animation) => animation.cancel());
    });

    const animations: Animation[] = [];

    const duration = expanded ? MOVE_MS : CLOSE_MS;

    bubbleRefs.current.forEach((element, index) => {
      const previous = positions.current[index];
      if (!element || !previous) return;

      const next = element.getBoundingClientRect();
      const fromLeft = index < LEFT_COLUMN_COUNT;
      const row = fromLeft ? index : index - LEFT_COLUMN_COUNT;
      const delay = expanded ? row * STAGGER_MS : (LEFT_COLUMN_COUNT - 1 - row) * STAGGER_MS;
      const dx = previous.left - next.left;
      const dy = previous.top - next.top;

      animations.push(
        element.animate(
          [
            { transform: `translate3d(${dx}px, ${dy}px, 0)` },
            { transform: "translate3d(0, 0, 0)" },
          ],
          {
            duration,
            easing: EASE,
            delay,
            fill: "backwards",
          },
        ),
      );
    });

    const stage = stageRef.current;
    const previousHeight = stageHeight.current;

    if (stage && previousHeight) {
      stage.getAnimations().forEach((animation) => animation.cancel());
      const nextHeight = stage.getBoundingClientRect().height;

      if (Math.abs(previousHeight - nextHeight) > 1) {
        stage.animate(
          [
            { height: `${previousHeight}px`, minHeight: "0px" },
            { height: `${nextHeight}px`, minHeight: "0px" },
          ],
          {
            duration: duration + (LEFT_COLUMN_COUNT - 1) * STAGGER_MS,
            easing: EASE,
            fill: "backwards",
          },
        );
      }
    }

    if (!expanded) return;

    const settleMs = animations.length
      ? MOVE_MS + (LEFT_COLUMN_COUNT - 1) * STAGGER_MS + 40
      : 0;

    window.setTimeout(() => {
      if (runId.current !== id) return;
      layoutSettled.current = true;
      setDetailReady(true);
    }, settleMs);
  }, [expanded, motionTick]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    };
  }, []);

  return (
    <section className={styles.explorer} aria-labelledby={titleId}>
      <h2 id={titleId} className={styles.title}>
        {title}
      </h2>

      <div ref={stageRef} className={expanded ? styles.stageExpanded : styles.stage}>
        <div className={styles.bubbles}>
          {skills.map((skill, index) => {
            const selected = skill.name === activeName;

            return (
              <button
                key={skill.name}
                type="button"
                ref={(node) => {
                  bubbleRefs.current[index] = node;
                }}
                className={selected ? `${styles.bubble} ${styles.bubbleActive}` : styles.bubble}
                aria-pressed={selected}
                onClick={() => select(skill.name)}
              >
                {skill.name}
              </button>
            );
          })}
        </div>

        <div className={styles.explain} aria-live="polite">
          {active && (detailReady || detailLeaving) ? (
            <div key={active.name} className={detailLeaving ? styles.explainLeave : styles.explainCopy}>
              <>
                <p className={styles.explainLabel}>In practice</p>
                <h3 className={styles.explainTitle}>{active.name}</h3>
                <SkillDetail detail={active.detail} />
                {active.name === "PostgreSQL" ? <PostgresDiagram /> : null}
                {active.name === "Node.js" ? <NodeDiagram /> : null}
                {active.name === "NestJS" ? <NestArchitecture /> : null}
              </>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
