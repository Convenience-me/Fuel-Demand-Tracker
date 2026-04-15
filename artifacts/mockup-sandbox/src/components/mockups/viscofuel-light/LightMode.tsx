import React, { useState } from "react";
import { Clock, ShieldAlert, Calendar, ArrowRight, CheckCircle2, Sun, Moon } from "lucide-react";

const NEIGHBORHOODS = [
  "Kilimani", "Westlands", "Karen", "Lavington",
  "Kileleshwa", "Langata", "South B", "South C"
];

export function LightMode() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [neighborhood, setNeighborhood] = useState("");
  const [phone, setPhone] = useState("");

  const isLight = mode === "light";

  const bg = isLight ? "#FAF9F7" : "#0D0D0D";
  const card = isLight ? "#FFFFFF" : "#161616";
  const border = isLight ? "#E5E0D8" : "#262626";
  const primaryText = isLight ? "#111111" : "#FFFFFF";
  const mutedText = isLight ? "#6B6560" : "#888";
  const accent = "#F97316";
  const accentLight = isLight ? "#FFF3EC" : "rgba(249,115,22,0.1)";
  const navBg = isLight ? "rgba(250,249,247,0.9)" : "rgba(13,13,13,0.85)";
  const featuresBg = isLight ? "#F3F0EB" : "#111";
  const sectionBorder = isLight ? "#E5E0D8" : "#222";
  const inputBg = isLight ? "#FFFFFF" : "#111";
  const inputBorder = isLight ? "#D4CFC8" : "#333";

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', Inter, sans-serif", background: bg, color: primaryText, minHeight: "100vh" }}>
      {/* Navbar */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        borderBottom: `1px solid ${border}`,
        background: navBg,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontWeight: 800, fontSize: 22, letterSpacing: "-0.02em" }}>
            VISCO<span style={{ color: accent }}>FUEL</span>
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Mode toggle */}
            <button
              onClick={() => setMode(m => m === "light" ? "dark" : "light")}
              style={{
                display: "flex", alignItems: "center", gap: 6, padding: "8px 14px",
                borderRadius: 8, border: `1px solid ${border}`, background: card,
                color: primaryText, cursor: "pointer", fontSize: 13, fontWeight: 500
              }}
            >
              {isLight ? <Moon size={14} /> : <Sun size={14} />}
              {isLight ? "Dark" : "Light"}
            </button>
            <button style={{
              padding: "9px 20px", borderRadius: 8,
              border: `1.5px solid ${accent}`, background: "transparent",
              color: accent, cursor: "pointer", fontSize: 14, fontWeight: 600
            }}>
              Join Beta
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ position: "relative", paddingTop: 160, paddingBottom: 80, overflow: "hidden" }}>
        {/* Background glow */}
        <div style={{
          position: "absolute", top: "-10%", right: "-5%",
          width: "45%", height: "50%", borderRadius: "50%",
          background: isLight ? "rgba(249,115,22,0.12)" : "rgba(249,115,22,0.18)",
          filter: "blur(100px)", pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute", top: "40%", left: "-5%",
          width: "35%", height: "40%", borderRadius: "50%",
          background: isLight ? "rgba(249,115,22,0.06)" : "rgba(249,115,22,0.1)",
          filter: "blur(90px)", pointerEvents: "none"
        }} />

        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px", textAlign: "center", position: "relative" }}>
          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 14px", borderRadius: 999,
            background: accentLight, border: `1px solid rgba(249,115,22,0.25)`,
            fontSize: 13, fontWeight: 600, color: accent, marginBottom: 28
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: accent, display: "inline-block" }} />
            Launching soon in Nairobi
          </div>

          <h1 style={{
            fontSize: "clamp(42px, 7vw, 80px)", fontWeight: 800,
            lineHeight: 1.1, letterSpacing: "-0.025em", marginBottom: 24
          }}>
            Fuel your car{" "}
            <br />
            <span style={{
              background: `linear-gradient(135deg, ${accent}, #FBBF24)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              anywhere, anytime.
            </span>
          </h1>

          <p style={{ fontSize: 18, color: mutedText, maxWidth: 520, margin: "0 auto" }}>
            On-demand fuel delivery directly to your car. Skip the petrol station queues and get moving in minutes.
          </p>
        </div>
      </section>

      {/* Waitlist Form */}
      <section style={{ padding: "20px 24px 80px" }}>
        <div style={{
          maxWidth: 440, margin: "0 auto",
          background: card,
          border: `1px solid ${border}`,
          borderRadius: 20,
          padding: "36px 40px",
          boxShadow: isLight
            ? "0 4px 32px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)"
            : "0 4px 32px rgba(0,0,0,0.4)"
        }}>
          <h2 style={{ fontWeight: 800, fontSize: 26, marginBottom: 6, letterSpacing: "-0.01em" }}>Get early access</h2>
          <p style={{ color: mutedText, marginBottom: 28, fontSize: 14 }}>Join the waitlist to be among the first to experience ViscoFuel.</p>

          <div style={{ marginBottom: 18 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6, color: primaryText }}>Neighborhood</label>
            <select
              value={neighborhood}
              onChange={e => setNeighborhood(e.target.value)}
              style={{
                width: "100%", height: 48, padding: "0 14px",
                background: inputBg, border: `1px solid ${inputBorder}`,
                borderRadius: 8, fontSize: 14, color: neighborhood ? primaryText : mutedText,
                outline: "none", cursor: "pointer"
              }}
            >
              <option value="" disabled>Select your area</option>
              {NEIGHBORHOODS.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6, color: primaryText }}>Phone Number</label>
            <input
              type="tel"
              placeholder="07XX XXX XXX"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              style={{
                width: "100%", height: 48, padding: "0 14px",
                background: inputBg, border: `1px solid ${inputBorder}`,
                borderRadius: 8, fontSize: 14, color: primaryText,
                outline: "none", boxSizing: "border-box"
              }}
            />
          </div>

          <button style={{
            width: "100%", height: 48,
            background: accent, color: "#fff",
            border: "none", borderRadius: 8,
            fontSize: 15, fontWeight: 700, letterSpacing: "0.03em",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8
          }}>
            JOIN WAITLIST
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: "64px 24px", background: featuresBg, borderTop: `1px solid ${sectionBorder}`, borderBottom: `1px solid ${sectionBorder}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(28px,4vw,44px)", letterSpacing: "-0.02em", marginBottom: 10 }}>Why ViscoFuel?</h2>
            <p style={{ color: mutedText, fontSize: 16 }}>We're reimagining how Nairobi refuels. No more detours, no more queues.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[
              { icon: Clock, title: "Save 20+ Minutes", desc: "Let us top up your car while it's parked at the office or in your driveway. Your time is better spent elsewhere." },
              { icon: ShieldAlert, title: "Roadside Support", desc: "Don't leave your car unattended. We bring high-quality fuel to you during emergencies, ensuring you're never stranded." },
              { icon: Calendar, title: "Scheduled Refills", desc: "Choose when you need us — right away or even overnight delivery. Wake up to a full tank every morning." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} style={{
                background: card,
                border: `1px solid ${border}`,
                borderRadius: 16, padding: "32px 28px"
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 12,
                  background: accentLight, color: accent,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 20
                }}>
                  <Icon size={24} />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: 17, marginBottom: 10, letterSpacing: "-0.01em" }}>{title}</h3>
                <p style={{ color: mutedText, fontSize: 14, lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "40px 24px", textAlign: "center", borderTop: `1px solid ${sectionBorder}`, color: mutedText, fontSize: 13 }}>
        <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 8, opacity: 0.5 }}>VISCOFUEL</div>
        <p>Visco Fuel Nairobi - Beta Test Phase - Not live yet</p>
      </footer>
    </div>
  );
}
