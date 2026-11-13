import CursorGrid from "./components/CursorGrid";
import StrokeText from "./components/StrokeText";

const projects = [
  {
    id: 1,
    title: "Title Title Title",
    description:
      "lorem ipsum dolor sit amet consectetur adipiscing elit dolor esse dolore iusto voluptas accusamus dolorum",
  },
  {
    id: 2,
    title: "Title Title Title",
    description:
      "lorem ipsum dolor sit amet consectetur adipiscing elit dolor esse dolore iusto voluptas accusamus dolorum",
  },
];

function Navbar() {
  return (
    <nav
      className="floating-nav"
      aria-label="Primary navigation"
      style={{
        overflow: "hidden",
        border: "1px solid rgba(233, 241, 255, 0.48)",
        background:
          "linear-gradient(115deg, rgba(255,255,255,.22), rgba(182,205,238,.1) 38%, rgba(255,255,255,.18) 68%, rgba(152,182,226,.12))",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,.72), inset 0 -1px 0 rgba(255,255,255,.12), 0 18px 50px rgba(0,0,0,.34), 0 0 34px rgba(174,204,255,.14)",
        backdropFilter: "blur(24px) saturate(165%)",
        WebkitBackdropFilter: "blur(24px) saturate(165%)",
      }}
    >
      <svg
        viewBox="0 0 1000 90"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          opacity: 0.72,
        }}
      >
        <defs>
          <linearGradient id="navLight" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#b8d5ff" stopOpacity="0" />
            <stop offset=".5" stopColor="#ffffff" stopOpacity=".55" />
            <stop offset="1" stopColor="#c6ddff" stopOpacity="0" />
          </linearGradient>
          <filter id="navBlur">
            <feGaussianBlur stdDeviation="12" />
          </filter>
        </defs>
        <ellipse
          cx="-120"
          cy="20"
          rx="260"
          ry="58"
          fill="#c9ddff"
          opacity=".16"
          filter="url(#navBlur)"
        >
          <animate attributeName="cx" values="-120;1120;-120" dur="12s" repeatCount="indefinite" />
        </ellipse>
        <path
          d="M-180 76 Q80 -10 330 46 T850 35 T1180 25"
          fill="none"
          stroke="url(#navLight)"
          strokeWidth="13"
          opacity=".38"
          filter="url(#navBlur)"
        >
          <animate
            attributeName="d"
            values="M-180 76 Q80 -10 330 46 T850 35 T1180 25;M-180 28 Q110 105 360 37 T850 54 T1180 58;M-180 76 Q80 -10 330 46 T850 35 T1180 25"
            dur="9s"
            repeatCount="indefinite"
          />
        </path>
      </svg>

      <a
        className="brand-link"
        href="#top"
        aria-label="Back to top"
        style={{
          position: "relative",
          zIndex: 2,
          borderColor: "rgba(232, 241, 255, .72)",
          boxShadow:
            "0 0 0 2px rgba(10,14,22,.62), 0 7px 20px rgba(8,14,25,.38), inset 0 1px 0 rgba(255,255,255,.62)",
        }}
      >
        <img
          src="/assets/lm-logo.png"
          alt=""
          style={{
            width: "72%",
            height: "72%",
            objectFit: "contain",
            transform: "none",
            filter: "grayscale(1) brightness(0)",
          }}
        />
      </a>

      <div
        role="list"
        aria-label="Page sections"
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          width: "min(70vw, 880px)",
          maxWidth: "880px",
          flex: "1 1 720px",
          alignItems: "center",
          gap: 0,
          margin: "0 clamp(8px, 3vw, 44px)",
          padding: "5px",
          overflow: "hidden",
          border: "1px solid rgba(239, 245, 255, .28)",
          borderRadius: "999px",
          background: "linear-gradient(180deg, rgba(8,12,20,.35), rgba(255,255,255,.08))",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,.22), 0 8px 24px rgba(3,7,14,.2)",
        }}
      >
        <span
          data-active-pill
          aria-hidden="true"
          style={{
            position: "absolute",
            zIndex: 0,
            top: "5px",
            bottom: "5px",
            left: "5px",
            width: "calc((100% - 10px) / 4)",
            border: "1px solid rgba(255,255,255,.46)",
            borderRadius: "999px",
            background: "linear-gradient(180deg, rgba(255,255,255,.32), rgba(192,215,248,.14))",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,.52), 0 6px 18px rgba(4,8,16,.28), 0 0 18px rgba(182,209,255,.1)",
            transform:
              typeof window !== "undefined" && window.location.hash === "#dashboard-title"
                ? "translateX(100%)"
                : "translateX(0%)",
            transition: "transform 520ms cubic-bezier(.22, 1, .36, 1), width 240ms ease",
            pointerEvents: "none",
          }}
        />
        {[
          ["Overview", "#top"],
          ["Metrics", "#dashboard-title"],
          ["Projects", ".project-grid"],
          ["Activity", ".project-grid"],
        ].map(([label, destination], index) => {
          const activate = (event) => {
            const list = event.currentTarget.closest('[aria-label="Page sections"]');
            const pill = list?.querySelector("[data-active-pill]");
            if (pill) pill.style.transform = `translateX(${index * 100}%)`;

            list?.querySelectorAll("[data-nav-tab]").forEach((tab) => {
              if (tab === event.currentTarget) {
                tab.setAttribute("aria-current", "page");
                tab.style.color = "#ffffff";
              } else {
                tab.removeAttribute("aria-current");
                tab.style.color = "rgba(235, 240, 248, .76)";
              }
            });
          };

          const tabStyle = {
            position: "relative",
            zIndex: 1,
            display: "block",
            minWidth: 0,
            flex: "1 1 25%",
            padding: "9px clamp(5px, 1.25vw, 18px)",
            overflow: "hidden",
            border: "1px solid transparent",
            borderRadius: "999px",
            background: "transparent",
            color:
              (index === 0 &&
                (typeof window === "undefined" || window.location.hash !== "#dashboard-title")) ||
              (index === 1 &&
                typeof window !== "undefined" &&
                window.location.hash === "#dashboard-title")
                ? "#ffffff"
                : "rgba(235, 240, 248, .76)",
            fontSize: "clamp(10px, 1.1vw, 14px)",
            lineHeight: 1,
            textAlign: "center",
            textDecoration: "none",
            textOverflow: "ellipsis",
            textShadow: "0 1px 7px rgba(0,0,0,.7)",
            whiteSpace: "nowrap",
            cursor: "pointer",
            transition: "color 260ms ease",
          };

          return destination.startsWith("#") ? (
            <a
              data-nav-tab
              key={label}
              role="listitem"
              href={destination}
              aria-current={
                (index === 0 &&
                  (typeof window === "undefined" || window.location.hash !== "#dashboard-title")) ||
                (index === 1 &&
                  typeof window !== "undefined" &&
                  window.location.hash === "#dashboard-title")
                  ? "page"
                  : undefined
              }
              onClick={activate}
              style={tabStyle}
            >
              {label}
            </a>
          ) : (
            <button
              data-nav-tab
              key={label}
              role="listitem"
              type="button"
              onClick={(event) => {
                activate(event);
                document.querySelector(destination)?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              style={tabStyle}
            >
              {label}
            </button>
          );
        })}
      </div>

      <a
        className="github-link"
        href="https://github.com/"
        target="_blank"
        rel="noreferrer"
        aria-label="Open GitHub"
        style={{
          position: "relative",
          zIndex: 2,
          border: "1px solid rgba(235,242,255,.55)",
          background: "linear-gradient(145deg, rgba(32,39,54,.92), rgba(2,4,9,.98))",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,.35), 0 7px 20px rgba(4,8,16,.42), 0 0 18px rgba(182,209,255,.17)",
        }}
      >
        <img src="/assets/github-mark.png" alt="" />
      </a>
    </nav>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-preview" aria-hidden="true" />
      <div className="project-copy">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
    </article>
  );
}

export default function App() {
  return (
    <div className="site-shell" id="top" style={{ background: "#171a1c" }}>
      <CursorGrid
        cellSize={60}
        color="#dfe8ff"
        gridColor="#ffffff"
        highlight="area"
        gridStyle="lines"
        radius={130}
        holdTime={400}
        fadeDuration={1750}
        fillOpacity={0.018}
        gridOpacity={0.11}
        spotlight={0.62}
        maxOpacity={0.78}
        edgeFade={0.08}
        clickPulse={false}
        ambient={0.035}
        style={{
          position: "absolute",
          zIndex: 0,
          inset: 0,
          width: "100%",
          height: "100%",
          minHeight: "100dvh",
          pointerEvents: "none",
          background: "#171a1c",
        }}
      />
      <Navbar />

      <main>
        <header
          className="intro-panel"
          style={{
            height: "auto",
            minHeight: "350px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
            alignItems: "stretch",
            gap: "clamp(24px, 4vw, 58px)",
            padding: "clamp(28px, 3.2vw, 46px) clamp(28px, 4vw, 58px)",
            background: "linear-gradient(125deg, rgba(44,47,49,.96), rgba(30,33,35,.97))",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,.08), 0 24px 60px rgba(0,0,0,.14)",
          }}
        >
          <style>
            {`@import url('https://fonts.googleapis.com/css2?family=Bagel+Fat+One&display=swap');`}
          </style>

          <div
            style={{
              display: "flex",
              minWidth: 0,
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "9px",
                marginBottom: "9px",
                color: "#b8bbc0",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "1.8px",
                textTransform: "uppercase",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: "23px",
                  height: "1px",
                  background: "#8fa8ff",
                  boxShadow: "0 0 8px rgba(143,168,255,.75)",
                }}
              />
              Personal infrastructure lab
            </div>

            <h1
              style={{
                margin: 0,
                fontFamily: "'Bagel Fat One', sans-serif",
                fontSize: "clamp(55px, 5.2vw, 78px)",
                fontWeight: 400,
                lineHeight: 0.95,
                letterSpacing: "0.2px",
              }}
            >
              LucaJMazz
            </h1>

            <p
              className="domain"
              style={{
                width: "100%",
                maxWidth: "460px",
                margin: "7px 0 0",
                lineHeight: 1,
              }}
            >
              <StrokeText
                text="runs-on.dev"
                strokeColor="#8fa8ff"
                strokeStyle="solid"
                strokeWidth={1.4}
                dashLength={10}
                drawDuration={1.6}
                fillDelay={0.2}
                stagger={0.05}
                ease="power2.out"
                trigger="mount"
                fillMode="wipe"
                wipeFrom="left"
                fontSize={63}
                fontWeight={400}
                letterSpacing={0.3}
                marching={false}
                hoverRedraw
                shadow={false}
                fillColor="#f0f1f4"
                shadowColor="#220f5a"
                fontFamily="'Courier Prime', 'Courier New', monospace"
                style={{ maxWidth: "460px" }}
              />
            </p>

            <p
              className="tagline"
              style={{
                maxWidth: "650px",
                margin: "18px 0 0",
                color: "#d2d4d7",
                fontSize: "clamp(17px, 1.6vw, 22px)",
                lineHeight: 1.42,
                letterSpacing: 0,
              }}
            >
              A live control room for my self-hosted VMs, services, deployments, and side
              projects—built to keep every experiment observable and within reach.
            </p>

            <div
              aria-label="Platform features"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginTop: "20px",
              }}
            >
              {["Self-hosted", "Realtime metrics", "VM lab"].map((feature) => (
                <span
                  key={feature}
                  style={{
                    padding: "7px 11px",
                    border: "1px solid rgba(220,224,232,.22)",
                    borderRadius: "999px",
                    background: "rgba(255,255,255,.045)",
                    color: "#c6c9ce",
                    fontSize: "12px",
                    lineHeight: 1,
                  }}
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          <aside
            aria-label="Infrastructure summary"
            style={{
              display: "flex",
              minWidth: 0,
              padding: "20px",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "24px",
              border: "1px solid rgba(232,238,248,.18)",
              borderRadius: "22px",
              background: "linear-gradient(145deg, rgba(255,255,255,.075), rgba(5,8,12,.15))",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,.08), 0 14px 32px rgba(0,0,0,.12)",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                }}
              >
                <span
                  style={{
                    color: "#aeb2b8",
                    fontSize: "12px",
                    letterSpacing: "1.4px",
                    textTransform: "uppercase",
                  }}
                >
                  Lab overview
                </span>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    color: "#9ee8c4",
                    fontSize: "11px",
                    fontWeight: 700,
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      background: "#78e2b4",
                      boxShadow: "0 0 10px #78e2b4",
                    }}
                  />
                  OPERATIONAL
                </span>
              </div>

              <p
                style={{
                  margin: "18px 0 0",
                  fontSize: "clamp(21px, 2vw, 28px)",
                  fontWeight: 700,
                  lineHeight: 1.15,
                }}
              >
                Built, deployed, and monitored from one place.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: "8px",
              }}
            >
              {[
                ["06", "VMs"],
                ["12", "Services"],
                ["24/7", "Monitoring"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  style={{
                    minWidth: 0,
                    padding: "13px 9px",
                    border: "1px solid rgba(255,255,255,.1)",
                    borderRadius: "13px",
                    background: "rgba(7,10,14,.2)",
                    textAlign: "center",
                  }}
                >
                  <strong
                    style={{
                      display: "block",
                      fontSize: "clamp(16px, 1.7vw, 23px)",
                      lineHeight: 1,
                    }}
                  >
                    {value}
                  </strong>
                  <span
                    style={{
                      display: "block",
                      marginTop: "6px",
                      overflow: "hidden",
                      color: "#aeb2b8",
                      fontSize: "10px",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </aside>
        </header>

        <section
          className="dashboard-panel"
          aria-labelledby="dashboard-title"
          style={{
            height: "auto",
            minHeight: "522px",
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
            }}
          >
            <h2 id="dashboard-title">Dashboard</h2>
            <div
              role="status"
              aria-label="Server is live"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "9px",
                padding: "7px 13px",
                border: "1px solid #89d6b7",
                borderRadius: "999px",
                color: "#b8f5d9",
                background: "rgba(65, 150, 115, 0.13)",
                fontSize: "15px",
                fontWeight: 700,
                letterSpacing: "1.5px",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                <circle cx="6" cy="6" r="6" fill="#78e2b4" opacity=".25">
                  <animate attributeName="r" values="4;6;4" dur="1.8s" repeatCount="indefinite" />
                  <animate
                    attributeName="opacity"
                    values=".45;.12;.45"
                    dur="1.8s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="6" cy="6" r="3" fill="#78e2b4" />
              </svg>
              LIVE
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
              gap: "12px",
            }}
          >
            {[
              ["Uptime", "99.99%", "30 days"],
              ["Requests", "24.8k", "+12.4%"],
              ["Latency", "38ms", "-4.2%"],
              ["Active VMs", "06", "all healthy"],
            ].map(([label, value, detail]) => (
              <div
                key={label}
                style={{
                  minWidth: 0,
                  padding: "13px 15px",
                  border: "1px solid rgba(220, 221, 222, 0.25)",
                  borderRadius: "14px",
                  background: "rgba(26, 27, 28, 0.46)",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    color: "#b9bbbd",
                    fontSize: "13px",
                    lineHeight: 1.2,
                  }}
                >
                  {label}
                </p>
                <p
                  style={{
                    margin: "7px 0 3px",
                    fontSize: "25px",
                    fontWeight: 700,
                    lineHeight: 1,
                    whiteSpace: "nowrap",
                  }}
                >
                  {value}
                </p>
                <p
                  style={{
                    margin: 0,
                    color: detail.startsWith("-") ? "#8fe2bd" : "#9fa2a4",
                    fontSize: "12px",
                  }}
                >
                  {detail}
                </p>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
              gap: "12px",
              flex: 1,
              minHeight: "210px",
            }}
          >
            <div
              style={{
                minWidth: 0,
                padding: "15px 16px 11px",
                overflow: "hidden",
                border: "1px solid rgba(220, 221, 222, 0.25)",
                borderRadius: "14px",
                background: "rgba(26, 27, 28, 0.46)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  gap: "12px",
                }}
              >
                <div>
                  <p style={{ margin: 0, fontSize: "14px" }}>Network traffic</p>
                  <p
                    style={{
                      margin: "5px 0 0",
                      fontSize: "25px",
                      fontWeight: 700,
                      lineHeight: 1,
                    }}
                  >
                    1.42 TB
                  </p>
                </div>
                <span style={{ color: "#9fa2a4", fontSize: "12px" }}>Last 24 hours</span>
              </div>

              <svg
                viewBox="0 0 620 125"
                preserveAspectRatio="none"
                role="img"
                aria-label="Network traffic increased over the last 24 hours"
                style={{
                  display: "block",
                  width: "100%",
                  height: "125px",
                  marginTop: "11px",
                }}
              >
                <defs>
                  <linearGradient id="trafficFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#aeb0ba" stopOpacity=".42" />
                    <stop offset="100%" stopColor="#aeb0ba" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[18, 50, 82, 114].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    y1={y}
                    x2="620"
                    y2={y}
                    stroke="#ffffff"
                    strokeOpacity=".09"
                    strokeDasharray="4 7"
                  />
                ))}
                <path
                  d="M0 105 C36 99 50 72 86 81 S143 104 176 77 S225 43 262 59 S323 89 360 61 S413 21 449 39 S508 80 541 52 S588 16 620 24 L620 125 L0 125 Z"
                  fill="url(#trafficFill)"
                />
                <path
                  d="M0 105 C36 99 50 72 86 81 S143 104 176 77 S225 43 262 59 S323 89 360 61 S413 21 449 39 S508 80 541 52 S588 16 620 24"
                  fill="none"
                  stroke="#e1e2e8"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="620" cy="24" r="5" fill="#78e2b4" />
              </svg>
            </div>

            <div
              style={{
                display: "flex",
                minWidth: 0,
                padding: "15px 16px",
                flexDirection: "column",
                border: "1px solid rgba(220, 221, 222, 0.25)",
                borderRadius: "14px",
                background: "rgba(26, 27, 28, 0.46)",
              }}
            >
              <p style={{ margin: 0, fontSize: "14px" }}>System load</p>
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "space-around",
                  gap: "14px",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ position: "relative", width: "116px", height: "116px" }}>
                  <svg
                    viewBox="0 0 120 120"
                    role="img"
                    aria-label="CPU usage is 62 percent"
                    style={{ width: "116px", height: "116px", transform: "rotate(-90deg)" }}
                  >
                    <circle cx="60" cy="60" r="48" fill="none" stroke="#505253" strokeWidth="11" />
                    <circle
                      cx="60"
                      cy="60"
                      r="48"
                      fill="none"
                      stroke="#d9dae0"
                      strokeWidth="11"
                      strokeLinecap="round"
                      strokeDasharray="187 302"
                    />
                  </svg>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "grid",
                      placeContent: "center",
                      textAlign: "center",
                    }}
                  >
                    <strong style={{ fontSize: "24px", lineHeight: 1 }}>62%</strong>
                    <span style={{ marginTop: "4px", color: "#a9abad", fontSize: "11px" }}>
                      CPU
                    </span>
                  </div>
                </div>
                <div style={{ minWidth: "96px", fontSize: "12px" }}>
                  {[
                    ["Memory", "4.8 / 8 GB", "60%"],
                    ["Storage", "218 / 500 GB", "44%"],
                  ].map(([label, value, width]) => (
                    <div key={label} style={{ marginBottom: "15px" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: "8px",
                        }}
                      >
                        <span>{label}</span>
                        <span style={{ color: "#a9abad" }}>{value}</span>
                      </div>
                      <div
                        style={{
                          height: "5px",
                          marginTop: "7px",
                          overflow: "hidden",
                          borderRadius: "99px",
                          background: "#505253",
                        }}
                      >
                        <div
                          style={{
                            width,
                            height: "100%",
                            borderRadius: "99px",
                            background: "#d9dae0",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="project-grid" aria-label="Projects" style={{ perspective: "1400px" }}>
          <div
            style={{
              display: "flex",
              gridColumn: "1 / -1",
              alignItems: "end",
              justifyContent: "space-between",
              gap: "20px",
              padding: "0 8px",
            }}
          >
            <div>
              <p
                style={{
                  margin: 0,
                  color: "#9da1a6",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "1.7px",
                  textTransform: "uppercase",
                }}
              >
                Selected deployments
              </p>
              <h2
                style={{
                  margin: "7px 0 0",
                  fontSize: "clamp(26px, 3vw, 40px)",
                  fontWeight: 400,
                  lineHeight: 1,
                }}
              >
                Projects running now
              </h2>
            </div>
            <span
              style={{
                flex: "0 0 auto",
                color: "#9da1a6",
                fontSize: "12px",
              }}
            >
              02 systems
            </span>
          </div>

          {[
            {
              id: "control-plane",
              title: "VM Control Plane",
              description:
                "A unified command center for provisioning, inspecting, and maintaining the virtual machines that power this lab.",
              image: "/assets/projects/control-plane.webp",
              imageAlt: "A rack of servers in a server room",
              status: "Production",
              stack: ["React", "Docker", "Proxmox"],
              href: "https://github.com/",
            },
            {
              id: "network-observer",
              title: "Network Observatory",
              description:
                "Live traffic, latency, and service-health telemetry collected across the private network in one focused view.",
              image: "/assets/projects/network-observatory.webp",
              imageAlt: "Blue network cables connected to server hardware",
              status: "Live",
              stack: ["Grafana", "Prometheus", "Nginx"],
              href: "https://github.com/",
            },
          ].map((project) => (
            <article
              className="project-card"
              key={project.id}
              onPointerMove={(event) => {
                if (event.pointerType === "touch") return;
                const card = event.currentTarget;
                const bounds = card.getBoundingClientRect();
                const x = (event.clientX - bounds.left) / bounds.width;
                const y = (event.clientY - bounds.top) / bounds.height;
                const rotateX = (0.5 - y) * 7;
                const rotateY = (x - 0.5) * 9;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-7px)`;
                card.style.borderColor = "rgba(225, 232, 244, .68)";

                const image = card.querySelector("[data-parallax-image]");
                if (image) {
                  image.style.transform = `scale(1.14) translate(${(0.5 - x) * 15}px, ${(0.5 - y) * 15}px)`;
                }
              }}
              onPointerLeave={(event) => {
                const card = event.currentTarget;
                card.style.transform =
                  "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
                card.style.borderColor = "rgba(180, 188, 201, .4)";

                const image = card.querySelector("[data-parallax-image]");
                if (image) {
                  image.style.transform = "scale(1.08) translate(0, 0)";
                }
              }}
              style={{
                position: "relative",
                height: "auto",
                minHeight: "558px",
                padding: "16px",
                overflow: "visible",
                border: "1px solid rgba(180, 188, 201, .4)",
                background: "linear-gradient(145deg, rgba(69,72,75,.94), rgba(42,44,47,.98))",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,.08), 0 24px 50px rgba(0,0,0,.18)",
                transformStyle: "preserve-3d",
                transition:
                  "transform 180ms ease-out, border-color 180ms ease, box-shadow 180ms ease",
                willChange: "transform",
              }}
            >
              <div
                className="project-preview"
                style={{
                  position: "relative",
                  height: "340px",
                  overflow: "hidden",
                  background: "#111518",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,.12), 0 10px 28px rgba(0,0,0,.22)",
                  transform: "translateZ(18px)",
                }}
              >
                <img
                  data-parallax-image
                  src={project.image}
                  alt={project.imageAlt}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: "scale(1.08) translate(0, 0)",
                    filter: "saturate(.72) contrast(1.1) brightness(.75)",
                    transition: "transform 220ms ease-out",
                    willChange: "transform",
                  }}
                />
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(10,13,17,.05), rgba(8,11,14,.12) 50%, rgba(8,11,14,.72))",
                    pointerEvents: "none",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: "14px",
                    right: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    padding: "7px 10px",
                    border: "1px solid rgba(219, 255, 237, .35)",
                    borderRadius: "999px",
                    background: "rgba(8, 15, 13, .62)",
                    color: "#b7f3d5",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: ".5px",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "#78e2b4",
                      boxShadow: "0 0 8px #78e2b4",
                    }}
                  />
                  {project.status}
                </span>
                <div
                  style={{
                    position: "absolute",
                    right: "14px",
                    bottom: "13px",
                    left: "14px",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px",
                  }}
                >
                  {project.stack.map((technology) => (
                    <span
                      key={technology}
                      style={{
                        padding: "6px 8px",
                        border: "1px solid rgba(255,255,255,.18)",
                        borderRadius: "8px",
                        background: "rgba(8,11,14,.58)",
                        color: "#d5d8dc",
                        fontSize: "10px",
                        lineHeight: 1,
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>

              <div
                className="project-copy"
                style={{
                  padding: "22px 9px 8px",
                  transform: "translateZ(26px)",
                }}
              >
                <h3 style={{ margin: 0, whiteSpace: "normal" }}>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${project.title}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "18px",
                      color: "#f3f4f6",
                      textDecoration: "none",
                    }}
                  >
                    <span>{project.title}</span>
                    <span
                      aria-hidden="true"
                      style={{
                        display: "grid",
                        width: "38px",
                        height: "38px",
                        flex: "0 0 auto",
                        placeItems: "center",
                        border: "1px solid rgba(232,237,246,.28)",
                        borderRadius: "50%",
                        background: "rgba(255,255,255,.06)",
                        fontSize: "21px",
                        lineHeight: 1,
                      }}
                    >
                      ↗
                    </span>
                  </a>
                </h3>
                <p
                  style={{
                    maxWidth: "560px",
                    margin: "12px 0 0",
                    color: "#c3c6ca",
                    fontSize: "16px",
                    lineHeight: 1.45,
                  }}
                >
                  {project.description}
                </p>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
