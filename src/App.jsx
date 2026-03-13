import { useState } from "react";

const BLOCKS = [
  {
    id: "keyPartners", label: "Key Partners", abbr: "KP", icon: "🤝", color: "#6B5B9E", light: "#f0edf8",
    description: "Who helps you operate more efficiently and reduce risk?",
    types: ["Strategic Alliances", "Co-operation", "Joint Venture", "Buyer–Supplier Relationship"],
    reasons: ["Economies of scale", "Risk & Uncertainty reduction", "Acquisition of specialist resources"],
    questions: ["Who are our key partners?", "Who are our key suppliers?", "Which key resources are we acquiring from partners?", "Which key activities do partners perform?"],
    tips: ["Partnerships should reduce costs, risk, or unlock resources you couldn't build alone.", "Don't list every supplier — focus on relationships that are truly strategic.", "Consider: what would break if you lost this partner tomorrow?", "Buyer–supplier relationships can be just as strategic as formal alliances."],
    example: "e.g. Manufacturing partners, Technology providers, Distribution networks, Joint ventures",
  },
  {
    id: "keyActivities", label: "Key Activities", abbr: "KA", icon: "⚙️", color: "#D4713A", light: "#fdf0ea",
    description: "What must your business DO to deliver its value proposition?",
    types: ["Production", "Problem Solving", "Platform / Network"],
    questions: ["What key activities does our value proposition require?", "What activities do our distribution channels require?", "What activities maintain customer relationships?", "What activities generate revenue streams?"],
    tips: ["Activities are verbs — things you must actively DO, not just own.", "Production activities dominate manufacturing businesses.", "Problem-solving activities dominate consulting or service businesses.", "Platform businesses must constantly maintain and develop their network."],
    example: "e.g. Software development, Manufacturing, Problem-solving, Network management",
  },
  {
    id: "keyResources", label: "Key Resources", abbr: "KR", icon: "🏗️", color: "#3A8FA4", light: "#eaf4f7",
    description: "What critical assets does your business need to own or access?",
    types: ["Physical", "Intellectual (patents, data, brand)", "Human", "Financial"],
    questions: ["What key resources does our value proposition require?", "What resources do our distribution channels require?", "What resources maintain customer relationships?", "What resources generate revenue streams?"],
    tips: ["Physical resources: facilities, machines, distribution networks.", "Intellectual resources (brand, patents, data) are often the most valuable.", "Human resources are critical in creative, knowledge, and service businesses.", "Financial resources: credit lines, cash reserves, investor capital."],
    example: "e.g. Brand reputation, Patent portfolio, Expert team, Equipment, Capital",
  },
  {
    id: "valuePropositions", label: "Value Propositions", abbr: "VP", icon: "💎", color: "#2A7A5B", light: "#e8f5ef",
    description: "What bundle of products/services creates value for each customer segment?",
    types: ["Newness", "Performance", "Customisation", "Getting the job done", "Design", "Brand/Status", "Price", "Cost Reduction", "Risk Reduction", "Accessibility", "Convenience/Usability"],
    questions: ["What value do we deliver to our customers?", "Which customer problems are we helping to solve?", "What bundles of products/services do we offer each segment?", "Which customer needs are we satisfying?"],
    tips: ["Great VPs focus on the jobs, pains & gains that matter MOST to customers.", "Go beyond functional jobs — address emotional and social jobs too.", "Differentiate on dimensions customers actually care about.", "The best value propositions are difficult for competitors to copy.", "Be specific — 'better quality' is not a value proposition."],
    example: "e.g. We help [customer] who struggles with [pain] to [gain] unlike [competitor] because [differentiator]",
  },
  {
    id: "customerRelationships", label: "Customer Relationships", abbr: "CR", icon: "💬", color: "#B85A28", light: "#fdf2ea",
    description: "What type of relationship does each customer segment expect?",
    types: ["Personal Assistance", "Dedicated Personal Assistance", "Self-Service", "Automated Service", "Communities", "Co-creation"],
    questions: ["What type of relationship does each segment expect?", "Which type have we established so far?", "How are they integrated with the rest of our business model?", "How costly are they?"],
    tips: ["Relationships serve acquisition, retention, and upselling goals.", "Communities shift some relationship responsibility to customers themselves.", "Co-creation (reviews, UGC) can create enormous value at low cost.", "Mismatched relationships cause churn — budget customers don't want a dedicated assistant."],
    example: "e.g. 24/7 live chat, Onboarding community, Self-service portal, Dedicated account manager",
  },
  {
    id: "channels", label: "Channels", abbr: "CH", icon: "📡", color: "#5A8B5E", light: "#eef4ef",
    description: "How do you reach your customer segments to deliver your value proposition?",
    types: ["Sales force", "Web-selling", "Own Store", "Partner Store", "Wholesaler", "Web partners"],
    reasons: ["Awareness", "Evaluation", "Purchase", "Delivery", "Aftersales"],
    questions: ["Through which channels do our customers want to be reached?", "How do we reach them now?", "How are our channels integrated?", "Which channels work best? Which are most cost-efficient?"],
    tips: ["Channels cover 5 phases: Awareness → Evaluation → Purchase → Delivery → Aftersales.", "Direct channels give higher margins but are more expensive to run.", "Partner channels grow reach quickly but reduce margin and control.", "Always ask: which channel is cheapest per acquisition?"],
    example: "e.g. Website, App store, Retail partners, Direct sales team, Social media",
  },
  {
    id: "customerSegments", label: "Customer Segments", abbr: "CS", icon: "👥", color: "#8B4DB8", light: "#f5edfb",
    description: "Who are you creating value for? Who are your most important customers?",
    types: ["Mass Market", "Niche Market", "Segmented", "Diversified", "Multi-sided Platform", "Bespoke / Mass Customisation"],
    questions: ["For whom are we creating value?", "Who are our most important customers?", "What are their key jobs, pains, and gains?", "What are their daily contexts and routines?"],
    tips: ["Start here — understanding customers drives everything else in the canvas.", "Be specific: 'everyone' is not a customer segment.", "Think about functional, social AND emotional jobs your customers have.", "Multi-sided platforms serve two distinct but interdependent segments simultaneously.", "Consider: what do they currently use to get these jobs done?"],
    example: "e.g. Urban freelancers aged 25–35, or B2B HR teams in companies with 50–500 employees",
  },
  {
    id: "costStructure", label: "Cost Structure", abbr: "CS", icon: "💸", color: "#B03A3A", light: "#fceaea",
    description: "What are the most important costs in operating your business model?",
    types: ["Cost-Driven", "Value-Driven", "Fixed Costs", "Variable Costs", "Economies of Scale", "Economies of Scope"],
    questions: ["What are the most important costs in our business model?", "Which key resources are most expensive?", "Which key activities are most expensive?", "Are we cost-driven or value-driven?"],
    tips: ["Cost-driven models obsess over low cost at every point (e.g. budget airlines).", "Value-driven models focus on premium delivery and worry less about cost (e.g. luxury hotels).", "Fixed costs stay constant regardless of volume (salaries, rent).", "Variable costs scale with production or sales (materials, commissions).", "Can you earn revenues BEFORE incurring costs? That's a powerful model."],
    example: "e.g. Staff salaries £250k/yr, Cloud hosting £2k/mo, Marketing £50k/yr, COGS 40% of revenue",
  },
  {
    id: "revenueStreams", label: "Revenue Streams", abbr: "RS", icon: "💰", color: "#1E7A55", light: "#e5f4ed",
    description: "How does your business capture value from each customer segment?",
    types: ["Asset Sale", "Usage Fee", "Subscription Fees", "Lending/Renting/Leasing", "Licensing", "Brokerage Fees", "Advertising", "Reselling", "Dynamic Pricing", "Fixed Menu Pricing"],
    questions: ["What value are customers willing to pay for?", "What do they currently pay for?", "How are they currently paying?", "How would they prefer to pay?", "How much does each revenue stream contribute overall?"],
    tips: ["Multiple revenue streams reduce risk — don't rely on one source.", "Recurring revenues (subscriptions) are far more valuable than one-off transactions.", "Consider whether you can earn revenue BEFORE delivering value.", "Could you give away the core product free and charge for something else?", "Pricing strategy is as important as the revenue model itself."],
    example: "e.g. £29/month SaaS subscription, 15% marketplace commission, one-off setup fee £500",
  },
];

const BLOCK_ORDER = ["customerSegments","valuePropositions","customerRelationships","channels","revenueStreams","keyPartners","keyActivities","keyResources","costStructure"];

const ASSESSMENT_QUESTIONS = [
  { id: "switching", label: "1. Switching Costs", low: "Nothing holds customers back from leaving me", high: "Customers are locked in for several years" },
  { id: "recurring", label: "2. Recurring Revenues", low: "100% of sales are one-off/transactional", high: "100% of sales lead to automatically recurring revenues" },
  { id: "earning", label: "3. Earning vs. Spending", low: "I incur 100% of costs before earning revenues", high: "I earn 100% of revenues before incurring costs (COGs)" },
  { id: "cost", label: "4. Game-changing Cost Structure", low: "My cost structure is 30%+ higher than competitors", high: "My cost structure is 30%+ lower than competitors" },
  { id: "others", label: "5. Others Who Do the Work", low: "I incur costs for all the value created", high: "All value is created for free by external parties" },
  { id: "scale", label: "6. Scalability", low: "Growing requires substantial resources and effort", high: "My business model has virtually no limits to growth" },
  { id: "protection", label: "7. Protection from Competition", low: "No moats — I'm vulnerable to competition", high: "Substantial moats that are hard to overcome" },
];

const VP_ITEMS = {
  left: [
    { id: "products", label: "Products & Services", icon: "📦", color: "#2A7A5B", tip: "List all the products and services your value proposition is built around. Every gain creator and pain reliever must be linked to one of these." },
    { id: "gainCreators", label: "Gain Creators", icon: "✨", color: "#3A8FA4", tip: "How do your products/services create outcomes your customer expects, desires, or would be surprised by? Think: functional utility, social gains, positive emotions, cost savings." },
    { id: "painRelievers", label: "Pain Relievers", icon: "💊", color: "#D4713A", tip: "How do your products/services eliminate or reduce specific customer pains? Think: things that annoy customers before, during, or after completing a job." },
  ],
  right: [
    { id: "customerJobs", label: "Customer Jobs", icon: "🎯", color: "#6B5B9E", tip: "What tasks are customers trying to perform? What problems are they solving? Include functional jobs (tasks), social jobs (how they want to be seen), and emotional jobs (how they want to feel)." },
    { id: "gains", label: "Gains", icon: "😊", color: "#2A7A5B", tip: "What outcomes and benefits does your customer want? What would delight them — even if they don't explicitly expect it? Rank from essential to nice-to-have." },
    { id: "pains", label: "Pains", icon: "😟", color: "#B03A3A", tip: "What annoys your customer? What risks do they fear? What stops them getting a job done? Think: obstacles, frustrations, and feared bad outcomes. Rank from extreme to moderate." },
  ],
};

const PIVOT_TYPES = [
  { name: "Zoom-in", desc: "A single feature becomes the whole product — focus on your MVP." },
  { name: "Zoom-out", desc: "Your whole product becomes one feature of a much larger offering." },
  { name: "Customer Segment", desc: "Same product, more appreciative audience — reposition for them." },
  { name: "Customer Need", desc: "The problem isn't important enough — find a better problem to solve." },
  { name: "Platform", desc: "Shift between a standalone app and a multi-sided platform." },
  { name: "Business Architecture", desc: "Switch between high-margin/low-volume vs low-margin/high-volume." },
  { name: "Value Capture", desc: "Change your entire revenue or monetisation model." },
  { name: "Engine of Growth", desc: "Switch between viral, sticky, or paid growth models." },
  { name: "Channel", desc: "Change how you reach customers — adjust pricing and positioning." },
  { name: "Technology", desc: "Achieve the same solution with completely different technology." },
];

// ── Components ────────────────────────────────────────────────────────────────

const Tip = ({ text, color }) => {
  const [show, setShow] = useState(false);
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <button onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}
        onClick={() => setShow(v => !v)}
        style={{ width: 17, height: 17, borderRadius: "50%", background: color + "20", border: `1px solid ${color}55`, color, fontSize: 9, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>?</button>
      {show && (
        <div style={{ position: "absolute", top: 20, right: 0, background: "#1a1a2e", color: "#f0ede8", borderRadius: 10, padding: "10px 13px", width: 230, zIndex: 300, fontSize: 11, lineHeight: 1.55, boxShadow: "0 8px 28px rgba(0,0,0,.45)", border: "1px solid rgba(255,255,255,.08)" }}>
          {text}
        </div>
      )}
    </span>
  );
};

const Tag = ({ label, color }) => (
  <span style={{ display: "inline-block", background: color + "15", border: `1px solid ${color}40`, color, borderRadius: 999, padding: "1px 7px", fontSize: 9.5, fontWeight: 600, margin: "2px 2px 0 0" }}>{label}</span>
);

const BlockCard = ({ block, value, isActive, onClick, isComplete, hyp }) => (
  <div onClick={onClick} style={{
    background: isActive ? "#fff" : block.light, border: `2px solid ${isActive ? block.color : "transparent"}`,
    borderRadius: 10, padding: "10px 12px", cursor: "pointer", height: "100%",
    display: "flex", flexDirection: "column", minHeight: 108,
    transition: "all .2s", boxShadow: isActive ? `0 4px 18px ${block.color}30` : "0 1px 3px rgba(0,0,0,.05)",
    transform: isActive ? "scale(1.01)" : "scale(1)", position: "relative",
  }}>
    {hyp && hyp !== "unknown" && (
      <div style={{ position: "absolute", top: 5, left: 5, background: hyp === "validated" ? "#2A7A5B22" : "#f0c04022", border: `1px solid ${hyp === "validated" ? "#2A7A5B55" : "#f0c04066"}`, borderRadius: 4, fontSize: 8.5, fontWeight: 700, color: hyp === "validated" ? "#2A7A5B" : "#9a7000", padding: "1px 5px", textTransform: "uppercase", letterSpacing: ".04em" }}>
        {hyp === "validated" ? "✓ validated" : "assumption"}
      </div>
    )}
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4, marginTop: (hyp && hyp !== "unknown") ? 13 : 0 }}>
      <span style={{ fontSize: 9.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".07em", color: block.color }}>{block.icon} {block.label}</span>
      <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
        {isComplete && <span style={{ fontSize: 10 }}>✅</span>}
        <Tip text={block.tips[0]} color={block.color} />
      </div>
    </div>
    <div style={{ fontSize: 9.5, color: "#999", fontStyle: "italic", marginBottom: 4, lineHeight: 1.3 }}>{block.description}</div>
    <div style={{ fontSize: 10, color: value ? "#333" : "#bbb", fontStyle: value ? "normal" : "italic", flex: 1, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", lineHeight: 1.45 }}>
      {value || block.example}
    </div>
  </div>
);

const EditPanel = ({ block, value, onChange, hyp, onHypChange, onAdvice, loading, advice }) => (
  <div style={{ background: "#fff", borderRadius: 14, padding: 22, boxShadow: "0 4px 28px rgba(0,0,0,.09)", border: `2px solid ${block.color}20` }}>
    <div style={{ display: "flex", gap: 11, alignItems: "flex-start", marginBottom: 14 }}>
      <div style={{ width: 42, height: 42, borderRadius: 9, background: block.light, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, border: `2px solid ${block.color}20`, flexShrink: 0 }}>{block.icon}</div>
      <div>
        <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: block.color, fontFamily: "'Playfair Display', Georgia, serif" }}>{block.label}</h2>
        <p style={{ margin: 0, fontSize: 10.5, color: "#888", fontStyle: "italic" }}>{block.description}</p>
      </div>
    </div>

    {block.types && (
      <div style={{ marginBottom: 11 }}>
        <div style={{ fontSize: 9.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: "#bbb", marginBottom: 4 }}>Types to consider</div>
        <div>{block.types.map(t => <Tag key={t} label={t} color={block.color} />)}</div>
        {block.reasons && <div style={{ marginTop: 4 }}>{block.reasons.map(r => <Tag key={r} label={"→ " + r} color="#888" />)}</div>}
      </div>
    )}

    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 9.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: "#bbb", marginBottom: 5 }}>Guiding Questions</div>
      {block.questions.map((q, i) => (
        <div key={i} style={{ padding: "5px 10px", background: block.light, borderRadius: 6, marginBottom: 4, fontSize: 10.5, color: "#555", borderLeft: `3px solid ${block.color}`, lineHeight: 1.4 }}>{q}</div>
      ))}
    </div>

    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 9.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: "#bbb", marginBottom: 5 }}>💡 Tips</div>
      {block.tips.map((t, i) => (
        <div key={i} style={{ fontSize: 10.5, color: "#666", paddingLeft: 13, position: "relative", marginBottom: 4, lineHeight: 1.4 }}>
          <span style={{ position: "absolute", left: 0, color: block.color, fontWeight: 700 }}>→</span>{t}
        </div>
      ))}
    </div>

    <textarea value={value} onChange={e => onChange(e.target.value)}
      placeholder={`Write your response here...\n\n${block.example}`}
      style={{ width: "100%", minHeight: 120, padding: "11px 13px", border: `2px solid ${value ? block.color + "55" : "#e5e5e5"}`, borderRadius: 8, fontSize: 11.5, lineHeight: 1.6, resize: "vertical", outline: "none", fontFamily: "inherit", color: "#333", background: value ? "#fff" : "#fafafa", transition: "border .2s", boxSizing: "border-box" }} />

    <div style={{ display: "flex", gap: 5, marginTop: 8, marginBottom: 10, alignItems: "center", flexWrap: "wrap" }}>
      <span style={{ fontSize: 9.5, fontWeight: 700, color: "#bbb", textTransform: "uppercase", letterSpacing: ".06em", marginRight: 2 }}>Lean status:</span>
      {["assumption", "validated", "unknown"].map(h => (
        <button key={h} onClick={() => onHypChange(h)} style={{
          padding: "3px 9px", borderRadius: 999, fontSize: 9.5, fontWeight: 700, cursor: "pointer", transition: "all .15s", border: "none",
          background: hyp === h ? (h === "validated" ? "#2A7A5B" : h === "assumption" ? "#c09000" : "#666") : "#f0f0f0",
          color: hyp === h ? "#fff" : "#999",
        }}>{h}</button>
      ))}
      <Tip text="Lean Startup: mark each block as 'assumption' until you have real customer evidence, then mark as 'validated'." color="#888" />
    </div>

    <button onClick={onAdvice} disabled={loading || !value.trim()} style={{
      background: loading || !value.trim() ? "#eee" : `linear-gradient(135deg, ${block.color}, ${block.color}bb)`,
      color: loading || !value.trim() ? "#bbb" : "#fff", border: "none", borderRadius: 8, padding: "10px 20px",
      fontSize: 11.5, fontWeight: 700, cursor: loading || !value.trim() ? "not-allowed" : "pointer",
      display: "flex", alignItems: "center", gap: 7, transition: "all .2s",
    }}>
      {loading ? <><span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>⟳</span> Getting feedback...</> : <><span>✨</span> Get AI Feedback</>}
    </button>

    {advice && (
      <div style={{ marginTop: 14, padding: "13px 15px", background: `linear-gradient(135deg, ${block.light}, #fff)`, borderRadius: 9, border: `1.5px solid ${block.color}33`, fontSize: 11.5, lineHeight: 1.7, color: "#333", animation: "fadeIn .35s ease" }}>
        <div style={{ fontSize: 9.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: block.color, marginBottom: 7 }}>✨ AI Feedback</div>
        <div style={{ whiteSpace: "pre-wrap" }}>{advice}</div>
      </div>
    )}
  </div>
);

const VPCanvas = ({ vpData, onVPChange, onCheck, loading, result }) => (
  <div>
    <div style={{ textAlign: "center", marginBottom: 22 }}>
      <h2 style={{ margin: 0, fontSize: 21, fontWeight: 800, fontFamily: "'Playfair Display', Georgia, serif", color: "#1a1a2e" }}>Value Proposition Canvas</h2>
      <p style={{ margin: "5px 0 0", color: "#888", fontSize: 12 }}>Map the fit between what you OFFER and what your customer NEEDS — based on Osterwalder & Pigneur</p>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, maxWidth: 880, margin: "0 auto" }}>
      {[["left","Value Map","📦","What you CREATE","#2A7A5B"],["right","Customer Profile","👤","What customers NEED","#8B4DB8"]].map(([side, title, icon, sub, col]) => (
        <div key={side} style={{ background: "#fff", borderRadius: 13, padding: 18, boxShadow: "0 2px 14px rgba(0,0,0,.08)", border: `2px solid ${col}20` }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 22, marginBottom: 3 }}>{icon}</div>
            <h3 style={{ margin: 0, fontSize: 13, fontWeight: 800, color: col, textTransform: "uppercase", letterSpacing: ".07em" }}>{title}</h3>
            <p style={{ margin: "3px 0 0", fontSize: 10.5, color: "#888" }}>{sub}</p>
          </div>
          {VP_ITEMS[side].map(item => (
            <div key={item.id} style={{ marginBottom: 13 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}>
                <span style={{ fontSize: 13 }}>{item.icon}</span>
                <span style={{ fontSize: 10.5, fontWeight: 700, color: item.color, textTransform: "uppercase", letterSpacing: ".06em" }}>{item.label}</span>
                <Tip text={item.tip} color={item.color} />
              </div>
              <textarea value={vpData[item.id] || ""} onChange={e => onVPChange(item.id, e.target.value)}
                placeholder={`Describe your ${item.label.toLowerCase()}...`}
                style={{ width: "100%", minHeight: 68, padding: "8px 11px", border: `1.5px solid ${vpData[item.id] ? item.color + "55" : "#e0e0e0"}`, borderRadius: 7, fontSize: 10.5, lineHeight: 1.5, resize: "vertical", outline: "none", fontFamily: "inherit", boxSizing: "border-box", background: vpData[item.id] ? "#fff" : "#fafafa" }} />
            </div>
          ))}
        </div>
      ))}
    </div>
    <div style={{ textAlign: "center", marginTop: 18 }}>
      <button onClick={onCheck} disabled={loading || !vpData.products}
        style={{ background: loading || !vpData.products ? "#eee" : "linear-gradient(135deg, #2A7A5B, #1a5c40)", color: loading || !vpData.products ? "#bbb" : "#fff", border: "none", borderRadius: 9, padding: "11px 26px", fontSize: 12, fontWeight: 700, cursor: loading || !vpData.products ? "not-allowed" : "pointer", display: "inline-flex", alignItems: "center", gap: 7 }}>
        {loading ? <><span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>⟳</span> Checking fit...</> : "✨ Check Value-Customer Fit"}
      </button>
    </div>
    {result && (
      <div style={{ marginTop: 18, maxWidth: 880, margin: "18px auto 0", padding: "16px 20px", background: "linear-gradient(135deg, #e8f5ef, #fff)", borderRadius: 11, border: "1.5px solid #2A7A5B44", fontSize: 12.5, lineHeight: 1.7, color: "#333", animation: "fadeIn .35s ease" }}>
        <div style={{ fontSize: 9.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: "#2A7A5B", marginBottom: 8 }}>✨ Fit Analysis</div>
        <div style={{ whiteSpace: "pre-wrap" }}>{result}</div>
      </div>
    )}
  </div>
);

const Assessment = ({ scores, onScore, onAnalyse, loading, result }) => {
  const total = Object.values(scores).reduce((a, b) => a + (b || 0), 0);
  const max = ASSESSMENT_QUESTIONS.length * 10;
  const pct = Math.round((total / max) * 100);
  return (
    <div style={{ maxWidth: 760, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <h2 style={{ margin: 0, fontSize: 21, fontWeight: 800, fontFamily: "'Playfair Display', Georgia, serif", color: "#1a1a2e" }}>Business Model Assessment</h2>
        <p style={{ margin: "5px 0 0", color: "#888", fontSize: 12 }}>7 Questions from Osterwalder & Pigneur — rate your model from 0 (weak) to 10 (excellent)</p>
      </div>
      {ASSESSMENT_QUESTIONS.map(q => (
        <div key={q.id} style={{ background: "#fff", borderRadius: 11, padding: "14px 18px", marginBottom: 10, boxShadow: "0 1px 7px rgba(0,0,0,.07)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: "#1a1a2e" }}>{q.label}</span>
            <span style={{ fontSize: 19, fontWeight: 900, color: (scores[q.id] || 0) >= 7 ? "#2A7A5B" : (scores[q.id] || 0) >= 4 ? "#D4713A" : "#B03A3A" }}>{scores[q.id] || 0}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 9.5, color: "#B03A3A", maxWidth: "45%", lineHeight: 1.3 }}>0 — {q.low}</span>
            <span style={{ fontSize: 9.5, color: "#2A7A5B", maxWidth: "45%", textAlign: "right", lineHeight: 1.3 }}>10 — {q.high}</span>
          </div>
          <input type="range" min={0} max={10} value={scores[q.id] || 0} onChange={e => onScore(q.id, parseInt(e.target.value))}
            style={{ width: "100%", accentColor: (scores[q.id] || 0) >= 7 ? "#2A7A5B" : (scores[q.id] || 0) >= 4 ? "#D4713A" : "#B03A3A" }} />
        </div>
      ))}
      <div style={{ background: "#1a1a2e", borderRadius: 11, padding: "16px 20px", marginBottom: 18, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ color: "#888", fontSize: 10, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 3 }}>Total Score</div>
          <div style={{ color: "#f0c040", fontSize: 28, fontWeight: 900 }}>{total} <span style={{ fontSize: 13, color: "#666" }}>/ {max}</span></div>
        </div>
        <div style={{ width: 110 }}>
          <div style={{ width: "100%", height: 7, background: "rgba(255,255,255,.1)", borderRadius: 999, overflow: "hidden", marginBottom: 3 }}>
            <div style={{ width: `${pct}%`, height: "100%", background: "linear-gradient(90deg, #f0c040, #e8a020)", borderRadius: 999, transition: "width .4s" }} />
          </div>
          <span style={{ color: "#666", fontSize: 10, float: "right" }}>{pct}%</span>
        </div>
      </div>
      <div style={{ textAlign: "center", marginBottom: 18 }}>
        <button onClick={onAnalyse} disabled={loading || total === 0}
          style={{ background: loading || total === 0 ? "#eee" : "linear-gradient(135deg, #1a1a2e, #0f3460)", color: loading || total === 0 ? "#bbb" : "#f0c040", border: "none", borderRadius: 9, padding: "11px 26px", fontSize: 12, fontWeight: 700, cursor: loading || total === 0 ? "not-allowed" : "pointer", display: "inline-flex", alignItems: "center", gap: 7 }}>
          {loading ? <><span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>⟳</span> Analysing...</> : "✨ Get AI Analysis"}
        </button>
      </div>
      {result && (
        <div style={{ padding: "16px 20px", background: "linear-gradient(135deg, #f8f5f0, #fff)", borderRadius: 11, border: "1.5px solid #e0d8cc", fontSize: 12.5, lineHeight: 1.7, color: "#333", marginBottom: 24, animation: "fadeIn .35s ease" }}>
          <div style={{ fontSize: 9.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: "#1a1a2e", marginBottom: 8 }}>✨ Assessment Results</div>
          <div style={{ whiteSpace: "pre-wrap" }}>{result}</div>
        </div>
      )}
      <div style={{ marginTop: 4 }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: "#1a1a2e", marginBottom: 12 }}>🔄 10 Pivot Types to Consider (Lean Startup)</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
          {PIVOT_TYPES.map(p => (
            <div key={p.name} style={{ background: "#fff", borderRadius: 8, padding: "9px 13px", boxShadow: "0 1px 5px rgba(0,0,0,.06)" }}>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: "#1a1a2e", marginBottom: 2 }}>{p.name} Pivot</div>
              <div style={{ fontSize: 10, color: "#666", lineHeight: 1.4 }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Supabase config ───────────────────────────────────────────────────────────
const SUPABASE_URL = "https://ptrujelnkeijagzdhzrl.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0cnVqZWxua2VpamFnemRoenJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0MDA3NDIsImV4cCI6MjA4ODk3Njc0Mn0.jgNw1Y01H8KqQu4W1UgXff_8HQ2RqpAUhO80ov_j6SQ";

async function sbFetch(path, opts = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1${path}`, {
    ...opts,
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`,
      "Prefer": opts.prefer || "return=representation",
      ...opts.headers,
    },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

// ── Module-level save timer (persists across renders) ────────────────────────
const saveTimer = { current: null };

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [canvas, setCanvas] = useState({});
  const [hyps, setHyps] = useState({});
  const [vpData, setVPData] = useState({});
  const [scores, setScores] = useState({});
  const [bizName, setBizName] = useState("");
  const [studentName, setStudentName] = useState("");
  const [rowId, setRowId] = useState(null); // Supabase row id for this session

  const [active, setActive] = useState("valuePropositions");
  const [advice, setAdvice] = useState({});
  const [advLoading, setAdvLoading] = useState(false);
  const [vpResult, setVPResult] = useState("");
  const [vpLoading, setVPLoading] = useState(false);
  const [assessResult, setAssessResult] = useState("");
  const [assessLoading, setAssessLoading] = useState(false);
  const [plan, setPlan] = useState("");
  const [planLoading, setPlanLoading] = useState(false);
  const [view, setView] = useState("canvas");
  const [editName, setEditName] = useState(false);
  const [saveStatus, setSaveStatus] = useState("idle"); // "idle"|"saving"|"saved"|"error"
  const [importError, setImportError] = useState("");
  const [showNameModal, setShowNameModal] = useState(true);
  const [nameInput, setNameInput] = useState("");
  const [loadingSession, setLoadingSession] = useState(false);
  const [showTeacher, setShowTeacher] = useState(false);
  const [teacherRows, setTeacherRows] = useState([]);
  const [teacherLoading, setTeacherLoading] = useState(false);
  const [teacherPassword, setTeacherPassword] = useState("");
  const [teacherPwInput, setTeacherPwInput] = useState("");
  const TEACHER_PW = "bmc2026";

  // ── Session init: load existing row for this student or create new ─────────
  async function startSession(name) {
    setLoadingSession(true);
    setStudentName(name);
    setShowNameModal(false);
    try {
      const rows = await sbFetch(`/bmc_canvases?student_name=eq.${encodeURIComponent(name)}&order=updated_at.desc&limit=1`);
      if (rows && rows.length > 0) {
        const r = rows[0];
        setRowId(r.id);
        setCanvas(r.canvas || {});
        setHyps(r.hyps || {});
        setVPData(r.vp_data || {});
        setScores(r.scores || {});
        setBizName(r.biz_name || "");
        setPlan(r.plan || "");
        setSaveStatus("saved");
      } else {
        const created = await sbFetch("/bmc_canvases", {
          method: "POST",
          prefer: "return=representation",
          body: JSON.stringify({ student_name: name, canvas: {}, hyps: {}, vp_data: {}, scores: {}, biz_name: "" }),
        });
        setRowId(created[0].id);
        setSaveStatus("saved");
      }
    } catch (e) {
      setImportError("Could not connect to database. Check your connection and try again.");
      setSaveStatus("error");
    }
    setLoadingSession(false);
  }

  // ── Save to Supabase (debounced via module-level timer) ──────────────────

  function scheduleSave(patch) {
    setSaveStatus("saving");
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      if (!rowId) return;
      try {
        await sbFetch(`/bmc_canvases?id=eq.${rowId}`, {
          method: "PATCH",
          prefer: "return=minimal",
          body: JSON.stringify(patch),
        });
        setSaveStatus("saved");
      } catch {
        setSaveStatus("error");
      }
    }, 800);
  }

  function updateCanvas(val) {
    const next = { ...canvas, ...val };
    setCanvas(next);
    scheduleSave({ canvas: next });
  }
  function updateHyps(val) {
    const next = { ...hyps, ...val };
    setHyps(next);
    scheduleSave({ hyps: next });
  }
  function updateVP(val) {
    const next = { ...vpData, ...val };
    setVPData(next);
    scheduleSave({ vp_data: next });
  }
  function updateScores(val) {
    const next = { ...scores, ...val };
    setScores(next);
    scheduleSave({ scores: next });
  }
  function updateBizName(val) {
    setBizName(val);
    scheduleSave({ biz_name: val });
  }

  // ── Export ────────────────────────────────────────────────────────────────
  function exportCanvas() {
    const data = { version: 1, exportedAt: new Date().toISOString(), studentName, bizName, canvas, hyps, vpData, scores, plan };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${bizName || studentName || "canvas"}-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // ── Import ────────────────────────────────────────────────────────────────
  function handleImport(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImportError("");
    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (!data.canvas && !data.bizName) throw new Error("Invalid");
        const nc = data.canvas || {}; const nh = data.hyps || {};
        const nv = data.vpData || {}; const ns = data.scores || {};
        const nb = data.bizName || ""; const np = data.plan || "";
        setCanvas(nc); setHyps(nh); setVPData(nv); setScores(ns); setBizName(nb); setPlan(np);
        scheduleSave({ canvas: nc, hyps: nh, vp_data: nv, scores: ns, biz_name: nb, plan: np });
      } catch { setImportError("Could not read file. Make sure it's a canvas export (.json)."); }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  function clearCanvas() {
    if (!window.confirm("Clear all canvas data and start fresh?")) return;
    setCanvas({}); setHyps({}); setVPData({}); setScores({}); setBizName(""); setPlan(""); setAdvice({});
    scheduleSave({ canvas: {}, hyps: {}, vp_data: {}, scores: {}, biz_name: "", plan: "" });
  }

  // ── Teacher view ──────────────────────────────────────────────────────────
  async function loadTeacherView() {
    if (teacherPwInput !== TEACHER_PW) { setImportError("Incorrect teacher password."); return; }
    setTeacherPassword(teacherPwInput);
    setTeacherLoading(true);
    try {
      const rows = await sbFetch("/bmc_canvases?order=updated_at.desc&limit=100");
      setTeacherRows(rows || []);
      setShowTeacher(true);
    } catch { setImportError("Could not load submissions."); }
    setTeacherLoading(false);
  }

  const complete = BLOCKS.filter(b => canvas[b.id]?.trim()).length;
  const progress = Math.round((complete / BLOCKS.length) * 100);
  const block = BLOCKS.find(b => b.id === active);
  const activeIdx = BLOCK_ORDER.indexOf(active);

  const callClaude = async (system, user) => {
    const res = await fetch("https://bmc-tool-54zhcdy7l-doctorhirsts-projects.vercel.app/api/claude", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system, messages: [{ role: "user", content: user }] }),
    });
    return (await res.json()).content?.[0]?.text || "";
  };

  const getAdvice = async () => {
    setAdvLoading(true);
    const ctx = BLOCKS.filter(b => canvas[b.id]).map(b => `${b.label}: ${canvas[b.id]}`).join("\n");
    const r = await callClaude(
      "You are a business strategy coach using the Business Model Canvas (Osterwalder & Pigneur) and Lean Startup methodology. Be encouraging, specific, and practical. Keep feedback to 4–6 concise sentences.",
      `Student working on Business Model Canvas${bizName ? ` for "${bizName}"` : ""}.\n\n"${block.label}" section:\n"${canvas[active]}"\n\nOther completed sections:\n${ctx || "None yet"}\n\nLean status: ${hyps[active] || "unknown"}\n\nGive specific feedback: what's strong, what needs more depth, 1–2 concrete improvements. If marked 'assumption', suggest what customer evidence to seek.`
    );
    setAdvice(p => ({ ...p, [active]: r }));
    setAdvLoading(false);
  };

  const checkVPFit = async () => {
    setVPLoading(true);
    const summary = [...VP_ITEMS.left, ...VP_ITEMS.right].map(i => `${i.label}: ${vpData[i.id] || "Not filled"}`).join("\n");
    const r = await callClaude(
      "You are a value proposition design expert. Assess fit between the value map and customer profile using Osterwalder's framework. Be specific and constructive.",
      `Analyse this Value Proposition Canvas${bizName ? ` for "${bizName}"` : ""}:\n\n${summary}\n\nAre pain relievers addressing real pains? Are gain creators matching desired gains? What's missing? What should be strengthened? Suggest the single most important improvement.`
    );
    setVPResult(r);
    setVPLoading(false);
  };

  const runAssessment = async () => {
    setAssessLoading(true);
    const scoreStr = ASSESSMENT_QUESTIONS.map(q => `${q.label}: ${scores[q.id] || 0}/10`).join("\n");
    const canvasCtx = BLOCKS.filter(b => canvas[b.id]).map(b => `${b.label}: ${canvas[b.id]}`).join("\n");
    const r = await callClaude(
      "You are a business model design expert. Use Osterwalder's 7 business model design questions to give actionable feedback.",
      `Business model assessment${bizName ? ` for "${bizName}"` : ""}:\n\nScores:\n${scoreStr}\n\nCanvas:\n${canvasCtx || "Not yet completed"}\n\nFor each score below 5, explain why it matters and suggest 1–2 concrete improvements. Identify the single biggest structural weakness and strength.`
    );
    setAssessResult(r);
    setAssessLoading(false);
  };

  const generatePlan = async () => {
    setPlanLoading(true);
    setView("plan");
    const canvasSummary = BLOCKS.map(b => `**${b.label}**: ${canvas[b.id] || "Not completed"}`).join("\n");
    const hypStr = Object.entries(hyps).map(([k, v]) => `${BLOCKS.find(b => b.id === k)?.label}: ${v}`).join(", ");
    const r = await callClaude(
      "You are a business plan consultant and entrepreneurship educator. Use Lean Startup principles — acknowledge what is validated vs assumption. Be specific, professional, and action-oriented. For each section of the plan, include a brief real-world company example (2–3 sentences) showing how a well-known business made a similar decision — for instance how Airbnb validated their customer segment, how Spotify structured their revenue streams, how Netflix pivoted their channels, how Apple defines their value proposition, how Amazon structures key partnerships, etc. Label these examples clearly as 'Real-world example:' so students can learn by comparison.",
      `Write a structured business plan${bizName ? ` for "${bizName}"` : ""} based on this Business Model Canvas:\n\n${canvasSummary}\n\nLean hypothesis statuses: ${hypStr || "Not tracked"}\n\nStructure:\n1. Executive Summary\n2. Business Concept & Value Proposition — include a real company example of a strong VP\n3. Target Customer Segments — include a real company example of smart segmentation\n4. Revenue Model & Pricing — include a real company example of an innovative revenue model\n5. Go-to-Market Strategy (Channels & Relationships) — include a real company example of effective channel strategy\n6. Operations Plan (Key Activities & Resources) — include a real company example of key resource leverage\n7. Key Partnerships — include a real company example of a strategic partnership\n8. Financial Considerations (Cost Structure) — include a real company example of cost structure design\n9. Key Assumptions to Validate (Lean next steps) — include a real company example of hypothesis validation\n10. 90-Day Action Plan\n\nMake the plan specific to the canvas content. For each 'Real-world example:' choose a company whose situation genuinely mirrors the student's canvas choices. For assumptions, note what customer evidence is needed.`
    );
    setPlan(r);
    setPlanLoading(false);
  };

  const TABS = [{ id: "canvas", label: "🗺️ Canvas" }, { id: "vp", label: "💎 VP Canvas" }, { id: "assess", label: "📊 Assessment" }, { id: "resources", label: "🌐 Resources" }];

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", minHeight: "100vh", background: "linear-gradient(135deg, #f8f5f0, #efe9e0)", paddingBottom: 60 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800&family=Playfair+Display:wght@700;800&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        * { box-sizing: border-box; }
        textarea:focus { outline: none; }
        button { font-family: inherit; }
        button:hover:not(:disabled) { opacity:.88; transform:translateY(-1px); }
      `}</style>

      {/* ── NAME MODAL ── */}
      {showNameModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.55)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: "40px 44px", maxWidth: 420, width: "90%", textAlign: "center", boxShadow: "0 20px 60px rgba(0,0,0,.3)" }}>
            <div style={{ fontSize: 36, marginBottom: 14 }}>🗺️</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 800, color: "#1a1a2e", margin: "0 0 8px" }}>Business Model Canvas</h2>
            <p style={{ fontSize: 13, color: "#888", margin: "0 0 24px", lineHeight: 1.6 }}>Enter your name to load or create your canvas. Your work saves automatically to a shared database.</p>
            <input
              autoFocus
              value={nameInput}
              onChange={e => setNameInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && nameInput.trim() && startSession(nameInput.trim())}
              placeholder="Your full name..."
              style={{ width: "100%", padding: "12px 16px", borderRadius: 9, border: "2px solid #e0d8cc", fontSize: 14, fontFamily: "inherit", outline: "none", marginBottom: 12, boxSizing: "border-box" }}
            />
            <button
              onClick={() => nameInput.trim() && startSession(nameInput.trim())}
              disabled={!nameInput.trim()}
              style={{ width: "100%", padding: "12px", background: nameInput.trim() ? "linear-gradient(135deg, #1a1a2e, #0f3460)" : "#eee", color: nameInput.trim() ? "#f0c040" : "#aaa", border: "none", borderRadius: 9, fontSize: 14, fontWeight: 800, cursor: nameInput.trim() ? "pointer" : "not-allowed", fontFamily: "inherit", marginBottom: 16 }}>
              {loadingSession ? "Loading your canvas…" : "Start →"}
            </button>
            <div style={{ borderTop: "1px solid #eee", paddingTop: 16 }}>
              <p style={{ fontSize: 11, color: "#bbb", margin: "0 0 8px" }}>Teacher access</p>
              <div style={{ display: "flex", gap: 8 }}>
                <input type="password" value={teacherPwInput} onChange={e => setTeacherPwInput(e.target.value)} onKeyDown={e => e.key === "Enter" && loadTeacherView()} placeholder="Teacher password..." style={{ flex: 1, padding: "8px 12px", borderRadius: 7, border: "1px solid #e0d8cc", fontSize: 12, fontFamily: "inherit", outline: "none" }} />
                <button onClick={loadTeacherView} style={{ padding: "8px 14px", background: "#1a1a2e", color: "#f0c040", border: "none", borderRadius: 7, fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>View all</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TEACHER DASHBOARD ── */}
      {showTeacher && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.6)", zIndex: 1000, overflowY: "auto", padding: "40px 20px" }}>
          <div style={{ background: "#fff", borderRadius: 16, maxWidth: 900, margin: "0 auto", padding: "32px 36px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 800, color: "#1a1a2e", margin: 0 }}>📋 All Canvas Submissions ({teacherRows.length})</h2>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <a
                  href="https://supabase.com/dashboard/project/ptrujelnkeijagzdhzrl/editor"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ background: "#1a1a2e", color: "#f0c040", border: "none", borderRadius: 8, padding: "8px 14px", cursor: "pointer", fontWeight: 700, fontSize: 12, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
                  🗄️ Open in Supabase ↗
                </a>
                <button onClick={() => setShowTeacher(false)} style={{ background: "#f5f5f5", border: "none", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontWeight: 700, fontSize: 12 }}>✕ Close</button>
              </div>
            </div>
            {teacherLoading ? <div style={{ textAlign: "center", padding: 40, color: "#888" }}>Loading…</div> : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {teacherRows.map(r => {
                  const filled = Object.values(r.canvas || {}).filter(v => v?.trim()).length;
                  return (
                    <div key={r.id} style={{ border: "1px solid #e8e0d8", borderRadius: 10, padding: "14px 18px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 14, color: "#1a1a2e" }}>{r.student_name || "Anonymous"}</div>
                          <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{r.biz_name || "No business name"} · {filled}/9 blocks · Last updated {new Date(r.updated_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</div>
                        </div>
                        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                          <div style={{ width: 80, height: 6, background: "#f0ece6", borderRadius: 999, overflow: "hidden" }}>
                            <div style={{ width: `${Math.round((filled/9)*100)}%`, height: "100%", background: filled >= 7 ? "#2A7A5B" : filled >= 4 ? "#c8940a" : "#D85A30", borderRadius: 999 }} />
                          </div>
                          <span style={{ fontSize: 10, color: "#888" }}>{Math.round((filled/9)*100)}%</span>
                        </div>
                      </div>
                      {Object.entries(r.canvas || {}).filter(([,v]) => v?.trim()).length > 0 && (
                        <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 5 }}>
                          {BLOCKS.filter(b => r.canvas?.[b.id]?.trim()).map(b => (
                            <span key={b.id} style={{ fontSize: 9.5, padding: "2px 8px", borderRadius: 999, background: b.light || "#f0f0f0", color: b.color, fontWeight: 700 }}>{b.icon} {b.label}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
                {teacherRows.length === 0 && <div style={{ textAlign: "center", padding: 40, color: "#bbb", fontSize: 14 }}>No submissions yet.</div>}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── HEADER ── */}
      <input type="file" accept=".json" onChange={handleImport} style={{ display: "none" }} id="import-input" />
      <div style={{ background: "linear-gradient(135deg, #1a1a2e, #0f3460)", padding: "18px 30px", color: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 4px 20px rgba(0,0,0,.25)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ background: "linear-gradient(135deg, #f0c040, #e8a020)", borderRadius: 9, padding: "7px 11px", fontSize: 18 }}>🗺️</div>
          <div>
            {editName
              ? <input autoFocus value={bizName} onChange={e => updateBizName(e.target.value)} onBlur={() => setEditName(false)} onKeyDown={e => e.key === "Enter" && setEditName(false)} placeholder="Enter business name..." style={{ background: "rgba(255,255,255,.15)", border: "2px solid rgba(255,255,255,.35)", borderRadius: 7, padding: "5px 11px", color: "#fff", fontSize: 17, fontWeight: 800, fontFamily: "'Playfair Display', serif", outline: "none", width: 300 }} />
              : <h1 onClick={() => setEditName(true)} style={{ margin: 0, fontSize: 18, fontWeight: 800, fontFamily: "'Playfair Display', serif", cursor: "pointer" }}>{bizName || "My Business Model Canvas"} <span style={{ fontSize: 11, opacity: .35 }}>✎</span></h1>
            }
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 2 }}>
              <p style={{ margin: 0, fontSize: 10, opacity: .5 }}>{studentName && `${studentName} · `}{complete}/{BLOCKS.length} sections · Osterwalder & Lean Startup</p>
              <span style={{
                fontSize: 9, fontWeight: 700, padding: "1px 7px", borderRadius: 999,
                background: saveStatus === "saved" ? "rgba(42,122,91,.35)" : saveStatus === "saving" ? "rgba(240,192,64,.25)" : saveStatus === "error" ? "rgba(176,58,58,.35)" : "rgba(255,255,255,.1)",
                color: saveStatus === "saved" ? "#7fe8be" : saveStatus === "saving" ? "#f0c040" : saveStatus === "error" ? "#f08080" : "rgba(255,255,255,.4)",
                border: `1px solid ${saveStatus === "saved" ? "rgba(42,122,91,.4)" : saveStatus === "saving" ? "rgba(240,192,64,.4)" : saveStatus === "error" ? "rgba(176,58,58,.4)" : "rgba(255,255,255,.15)"}`,
                textTransform: "uppercase", letterSpacing: ".06em",
              }}>
                {saveStatus === "saved" ? "☁ Saved" : saveStatus === "saving" ? "Saving…" : saveStatus === "error" ? "⚠ Error" : "·"}
              </span>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
          <div>
            <div style={{ width: 130, height: 4, background: "rgba(255,255,255,.12)", borderRadius: 999, overflow: "hidden", marginBottom: 2 }}>
              <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg, #f0c040, #e8a020)", borderRadius: 999, transition: "width .5s" }} />
            </div>
            <span style={{ fontSize: 9.5, opacity: .45 }}>{progress}% complete</span>
          </div>

          {/* Data controls */}
          <div style={{ display: "flex", gap: 5, alignItems: "center", padding: "0 6px", borderLeft: "1px solid rgba(255,255,255,.12)", borderRight: "1px solid rgba(255,255,255,.12)" }}>
            <button onClick={() => document.getElementById("import-input").click()}
              title="Import a previously saved canvas JSON file"
              style={{ background: "rgba(255,255,255,.08)", border: "1.5px solid rgba(255,255,255,.15)", borderRadius: 7, padding: "5px 10px", color: "rgba(255,255,255,.7)", cursor: "pointer", fontSize: 10, fontWeight: 700 }}>
              📂 Import
            </button>
            <button onClick={exportCanvas}
              title="Export your canvas as a JSON file to save or share"
              style={{ background: "rgba(255,255,255,.08)", border: "1.5px solid rgba(255,255,255,.15)", borderRadius: 7, padding: "5px 10px", color: "rgba(255,255,255,.7)", cursor: "pointer", fontSize: 10, fontWeight: 700 }}>
              💾 Export
            </button>
            <button onClick={clearCanvas}
              title="Clear all data and start fresh"
              style={{ background: "rgba(176,58,58,.18)", border: "1.5px solid rgba(176,58,58,.3)", borderRadius: 7, padding: "5px 10px", color: "rgba(255,160,160,.8)", cursor: "pointer", fontSize: 10, fontWeight: 700 }}>
              🗑 Clear
            </button>
          </div>

          {TABS.map(t => (
            <button key={t.id} onClick={() => setView(t.id)} style={{ background: view === t.id ? "rgba(240,192,64,.18)" : "rgba(255,255,255,.07)", border: `1.5px solid ${view === t.id ? "#f0c040" : "rgba(255,255,255,.15)"}`, borderRadius: 7, padding: "6px 12px", color: view === t.id ? "#f0c040" : "rgba(255,255,255,.6)", cursor: "pointer", fontSize: 10.5, fontWeight: 700 }}>{t.label}</button>
          ))}
          <button onClick={generatePlan} disabled={complete < 3} title={complete < 3 ? "Complete at least 3 sections first" : "Generate business plan"} style={{ background: complete >= 3 ? "linear-gradient(135deg, #f0c040, #e8a020)" : "rgba(255,255,255,.07)", border: "none", borderRadius: 7, padding: "6px 12px", color: complete >= 3 ? "#1a1a2e" : "rgba(255,255,255,.25)", cursor: complete >= 3 ? "pointer" : "not-allowed", fontSize: 10.5, fontWeight: 800 }}>📄 Business Plan</button>
        </div>
      </div>
      {importError && (
        <div style={{ background: "#fceaea", borderBottom: "2px solid #f09595", padding: "10px 30px", fontSize: 12, color: "#A32D2D", display: "flex", alignItems: "center", gap: 10 }}>
          ⚠️ {importError} <button onClick={() => setImportError("")} style={{ background: "none", border: "none", color: "#A32D2D", cursor: "pointer", fontWeight: 700, fontSize: 13 }}>✕</button>
        </div>
      )}

      <div style={{ padding: "24px 30px" }}>

        {/* ── CANVAS ── */}
        {view === "canvas" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 350px", gap: 22, animation: "fadeIn .3s ease" }}>
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 7 }}>
                <div style={{ gridColumn: "1", gridRow: "1/3" }}><BlockCard block={BLOCKS[0]} value={canvas.keyPartners||""} isActive={active==="keyPartners"} onClick={()=>setActive("keyPartners")} isComplete={!!canvas.keyPartners?.trim()} hyp={hyps.keyPartners} /></div>
                <div style={{ gridColumn: "2", gridRow: "1" }}><BlockCard block={BLOCKS[1]} value={canvas.keyActivities||""} isActive={active==="keyActivities"} onClick={()=>setActive("keyActivities")} isComplete={!!canvas.keyActivities?.trim()} hyp={hyps.keyActivities} /></div>
                <div style={{ gridColumn: "3", gridRow: "1/3" }}><BlockCard block={BLOCKS[3]} value={canvas.valuePropositions||""} isActive={active==="valuePropositions"} onClick={()=>setActive("valuePropositions")} isComplete={!!canvas.valuePropositions?.trim()} hyp={hyps.valuePropositions} /></div>
                <div style={{ gridColumn: "4", gridRow: "1" }}><BlockCard block={BLOCKS[4]} value={canvas.customerRelationships||""} isActive={active==="customerRelationships"} onClick={()=>setActive("customerRelationships")} isComplete={!!canvas.customerRelationships?.trim()} hyp={hyps.customerRelationships} /></div>
                <div style={{ gridColumn: "5", gridRow: "1/3" }}><BlockCard block={BLOCKS[6]} value={canvas.customerSegments||""} isActive={active==="customerSegments"} onClick={()=>setActive("customerSegments")} isComplete={!!canvas.customerSegments?.trim()} hyp={hyps.customerSegments} /></div>
                <div style={{ gridColumn: "2", gridRow: "2" }}><BlockCard block={BLOCKS[2]} value={canvas.keyResources||""} isActive={active==="keyResources"} onClick={()=>setActive("keyResources")} isComplete={!!canvas.keyResources?.trim()} hyp={hyps.keyResources} /></div>
                <div style={{ gridColumn: "4", gridRow: "2" }}><BlockCard block={BLOCKS[5]} value={canvas.channels||""} isActive={active==="channels"} onClick={()=>setActive("channels")} isComplete={!!canvas.channels?.trim()} hyp={hyps.channels} /></div>
                <div style={{ gridColumn: "1/4", gridRow: "3" }}><BlockCard block={BLOCKS[7]} value={canvas.costStructure||""} isActive={active==="costStructure"} onClick={()=>setActive("costStructure")} isComplete={!!canvas.costStructure?.trim()} hyp={hyps.costStructure} /></div>
                <div style={{ gridColumn: "3/6", gridRow: "3" }}><BlockCard block={BLOCKS[8]} value={canvas.revenueStreams||""} isActive={active==="revenueStreams"} onClick={()=>setActive("revenueStreams")} isComplete={!!canvas.revenueStreams?.trim()} hyp={hyps.revenueStreams} /></div>
              </div>
              {/* Nav */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
                {activeIdx > 0 ? (
                  <button onClick={() => setActive(BLOCK_ORDER[activeIdx-1])} style={{ background: "#fff", border: "2px solid #e0e0e0", borderRadius: 8, padding: "7px 14px", cursor: "pointer", fontSize: 10.5, fontWeight: 700, color: "#555", display: "flex", alignItems: "center", gap: 5 }}>
                    ← {BLOCKS.find(b=>b.id===BLOCK_ORDER[activeIdx-1])?.icon} {BLOCKS.find(b=>b.id===BLOCK_ORDER[activeIdx-1])?.label}
                  </button>
                ) : <div />}
                <span style={{ fontSize: 10, color: "#bbb" }}>{activeIdx+1} / {BLOCK_ORDER.length}</span>
                {activeIdx < BLOCK_ORDER.length-1 ? (
                  <button onClick={() => setActive(BLOCK_ORDER[activeIdx+1])} style={{ background: "#fff", border: "2px solid #e0e0e0", borderRadius: 8, padding: "7px 14px", cursor: "pointer", fontSize: 10.5, fontWeight: 700, color: "#555", display: "flex", alignItems: "center", gap: 5 }}>
                    {BLOCKS.find(b=>b.id===BLOCK_ORDER[activeIdx+1])?.icon} {BLOCKS.find(b=>b.id===BLOCK_ORDER[activeIdx+1])?.label} →
                  </button>
                ) : <div />}
              </div>
              <div style={{ marginTop: 10, display: "flex", gap: 10, alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 9.5, color: "#bbb", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em" }}>Lean status legend:</span>
                {[["assumption","#9a7000","#f0c04020"],["validated","#2A7A5B","#2A7A5B20"],["unknown","#888","#88888818"]].map(([l,c,bg])=>(
                  <span key={l} style={{ fontSize: 8.5, fontWeight: 700, textTransform: "uppercase", padding: "2px 7px", borderRadius: 4, background: bg, border: `1px solid ${c}44`, color: c }}>{l}</span>
                ))}
              </div>
            </div>

            {/* Side panel */}
            <div>
              {block && <EditPanel block={block} value={canvas[active]||""} onChange={v=>updateCanvas({[active]:v})} hyp={hyps[active]||"unknown"} onHypChange={h=>updateHyps({[active]:h})} onAdvice={getAdvice} loading={advLoading} advice={advice[active]} />}
              <div style={{ marginTop: 14, background: "linear-gradient(135deg, #1a1a2e, #0f3460)", borderRadius: 11, padding: "15px 17px", color: "#fff" }}>
                <div style={{ fontSize: 9.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", opacity: .5, marginBottom: 9 }}>📚 Recommended Order (Lean Startup)</div>
                {[["1","👥 Customer Segments — understand your customer first"],["2","💎 Value Propositions — address their jobs, pains & gains"],["3","💬 Relationships + 📡 Channels — how you reach & retain them"],["4","💰 Revenue Streams — what will they pay for and how?"],["5","⚙️ Activities + 🏗️ Resources + 🤝 Partners — left side"],["6","💸 Cost Structure — fills in last once you know everything"]].map(([n,t])=>(
                  <div key={n} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}>
                    <span style={{ minWidth: 16, height: 16, borderRadius: "50%", background: "rgba(240,192,64,.18)", border: "1px solid rgba(240,192,64,.3)", color: "#f0c040", fontSize: 8.5, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{n}</span>
                    <span style={{ fontSize: 10, lineHeight: 1.5, opacity: .7 }}>{t}</span>
                  </div>
                ))}
                <div style={{ marginTop: 9, paddingTop: 9, borderTop: "1px solid rgba(255,255,255,.08)", fontSize: 9.5, opacity: .45, lineHeight: 1.5 }}>💡 All blocks start as assumptions until validated with real customer evidence.</div>
              </div>
            </div>
          </div>
        )}

        {view === "vp" && <div style={{ animation: "fadeIn .3s ease" }}><VPCanvas vpData={vpData} onVPChange={(k,v)=>updateVP({[k]:v})} onCheck={checkVPFit} loading={vpLoading} result={vpResult} /></div>}

        {view === "assess" && <div style={{ animation: "fadeIn .3s ease" }}><Assessment scores={scores} onScore={(k,v)=>updateScores({[k]:v})} onAnalyse={runAssessment} loading={assessLoading} result={assessResult} /></div>}

        {view === "resources" && (
          <div style={{ animation: "fadeIn .3s ease", maxWidth: 920, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, fontFamily: "'Playfair Display', Georgia, serif", color: "#1a1a2e" }}>Internet Resources</h2>
              <p style={{ margin: "6px 0 0", color: "#888", fontSize: 13 }}>Curated tools, videos, articles and communities to deepen your business model thinking</p>
            </div>

            {[
              {
                category: "📖 Foundational Reading", color: "#2A7A5B", light: "#e8f5ef",
                items: [
                  { title: "Strategyzer — Business Model Canvas explained", url: "https://www.strategyzer.com/library/the-business-model-canvas", desc: "The official guide from Osterwalder's team. Covers all 9 blocks with examples and a free downloadable canvas template.", tag: "Free" },
                  { title: "Business Model Generation (book summary)", url: "https://www.businessmodelgeneration.com/canvas/bmc", desc: "Overview of the landmark book by Osterwalder & Pigneur that introduced the BMC. Includes pattern examples from real companies.", tag: "Free" },
                  { title: "Value Proposition Design — Strategyzer", url: "https://www.strategyzer.com/library/the-value-proposition-canvas", desc: "Deep dive into the VP Canvas: customer jobs, pains, gains, gain creators and pain relievers with trigger question worksheets.", tag: "Free" },
                  { title: "Lean Startup — Eric Ries (official site)", url: "http://theleanstartup.com/principles", desc: "The core Lean Startup principles: Build–Measure–Learn, MVPs, and pivoting. Essential background for the hypothesis tracking in this tool.", tag: "Free" },
                ]
              },
              {
                category: "🎬 Video Lectures & Courses", color: "#6B5B9E", light: "#f0edf8",
                items: [
                  { title: "Steve Blank — How to Build a Startup (Udacity)", url: "https://www.udacity.com/course/how-to-build-a-startup--ep245", desc: "Free 7-week course based on the Lean LaunchPad curriculum. Covers customer discovery, the BMC, and evidence-based entrepreneurship.", tag: "Free course" },
                  { title: "Strategyzer YouTube — Business Model Canvas tutorials", url: "https://www.youtube.com/@strategyzer", desc: "Short explainer videos on each block of the canvas, VP Canvas deep dives, and real company case studies including Nespresso and Netflix.", tag: "YouTube" },
                  { title: "Stanford eCorner — Entrepreneurship lectures", url: "https://ecorner.stanford.edu/", desc: "Free video library of entrepreneurship talks from Stanford. Includes Steve Blank, Reid Hoffman, and dozens of founders on building business models.", tag: "Free" },
                  { title: "Coursera — Innovation & Entrepreneurship (HEC Paris)", url: "https://www.coursera.org/learn/innovative-finance", desc: "Covers business model design and innovation using the canvas framework. Taught by a top European business school.", tag: "Paid/Audit" },
                ]
              },
              {
                category: "🏢 Real Company Canvas Examples", color: "#D4713A", light: "#fdf0ea",
                items: [
                  { title: "Airbnb Business Model Canvas — analysed", url: "https://www.businessmodelsinc.com/business-model/airbnb/", desc: "Detailed breakdown of how Airbnb structured its two-sided marketplace, value propositions for both hosts and guests, and its asset-light revenue model.", tag: "Case study" },
                  { title: "Netflix BMC evolution — from DVD to streaming", url: "https://www.strategyzer.com/blog/how-netflix-reinvented-itself", desc: "How Netflix pivoted its entire business model three times. A masterclass in recognising when your canvas needs to change and being willing to cannibalise yourself.", tag: "Case study" },
                  { title: "Spotify BMC — freemium and music industry partnerships", url: "https://businessmodelanalyst.com/spotify-business-model/", desc: "Covers how Spotify's freemium model, ad-supported free tier, and complex licensing partnerships with record labels shaped every block of its canvas.", tag: "Case study" },
                  { title: "Amazon BMC — multiple business models in one", url: "https://businessmodelanalyst.com/amazon-business-model/", desc: "Amazon runs at least 5 distinct business models simultaneously (retail, marketplace, AWS, Prime, advertising). A fascinating study in diversified revenue streams.", tag: "Case study" },
                ]
              },
              {
                category: "🛠️ Free Tools & Templates", color: "#3A8FA4", light: "#eaf4f7",
                items: [
                  { title: "Canvanizer — free collaborative BMC tool", url: "https://canvanizer.com/new/business-model-canvas", desc: "Simple browser-based canvas tool. Great for team workshops — share a link and fill it in together in real time.", tag: "Free tool" },
                  { title: "Miro BMC template", url: "https://miro.com/templates/business-model-canvas/", desc: "Digital whiteboard template with sticky notes. Best for visual thinkers and team brainstorming sessions. Free tier available.", tag: "Free tier" },
                  { title: "Lean Canvas (Ash Maurya) — startup-focused variant", url: "https://leanstack.com/lean-canvas", desc: "A startup-optimised version of the BMC that replaces some blocks with 'Problem', 'Solution', 'Unfair Advantage' and 'Key Metrics'. Better for pre-product startups.", tag: "Free tool" },
                  { title: "IDEO Design Thinking toolkit", url: "https://www.designkit.org/methods", desc: "Human-centred design methods that complement the customer segment and VP canvas work — empathy maps, persona creation, customer journey mapping.", tag: "Free" },
                ]
              },
              {
                category: "💡 Customer Research & Validation", color: "#B03A3A", light: "#fceaea",
                items: [
                  { title: "The Mom Test — how to talk to customers (Rob Fitzpatrick)", url: "https://www.momtestbook.com/", desc: "The best guide to running customer interviews without leading the witness. Essential for validating your canvas assumptions before building anything.", tag: "Book" },
                  { title: "Strategyzer — Testing Business Ideas", url: "https://www.strategyzer.com/books/testing-business-ideas-david-j-bland", desc: "44 experiment types for validating business model assumptions — from customer interviews to landing page tests to smoke tests. Directly linked to Lean hypothesis tracking.", tag: "Book" },
                  { title: "Survey Monkey — free customer research surveys", url: "https://www.surveymonkey.com/", desc: "Quick way to gather quantitative data from potential customers to validate or invalidate canvas assumptions about segments, pains, and willingness to pay.", tag: "Free tier" },
                  { title: "UserTesting.com — watch real users use your product", url: "https://www.usertesting.com/", desc: "Commission short video sessions of real users interacting with your product or prototype. Powerful for validating channel and customer relationship assumptions.", tag: "Paid" },
                ]
              },
              {
                category: "🌍 Startup Communities & Support", color: "#5A8B5E", light: "#eef4ef",
                items: [
                  { title: "Y Combinator Startup School — free online programme", url: "https://www.startupschool.org/", desc: "Free 8-week online programme from the world's most famous accelerator. Covers ideation, talking to users, building an MVP, and fundraising.", tag: "Free" },
                  { title: "Founders Forum (UK)", url: "https://foundersforum.co/", desc: "UK-based network for founders at all stages. Events, resources, and community support for early-stage and growth entrepreneurs.", tag: "Community" },
                  { title: "Reddit r/startups", url: "https://www.reddit.com/r/startups/", desc: "Active community for founders sharing real experiences — customer discovery struggles, pivot stories, and BMC feedback. No-fluff peer learning.", tag: "Community" },
                  { title: "GOV.UK — Start a business official guidance", url: "https://www.gov.uk/browse/business/setting-up", desc: "UK government's official resource for registering a business, understanding tax obligations, grants available, and legal requirements.", tag: "UK official" },
                ]
              },
            ].map(section => (
              <div key={section.category} style={{ marginBottom: 28 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 4, height: 20, background: section.color, borderRadius: 2 }} />
                  <h3 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: "#1a1a2e", fontFamily: "'Playfair Display', Georgia, serif" }}>{section.category}</h3>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {section.items.map(item => (
                    <a key={item.title} href={item.url} target="_blank" rel="noopener noreferrer"
                      style={{ display: "block", background: "#fff", borderRadius: 11, padding: "14px 16px", border: `1.5px solid ${section.color}22`, textDecoration: "none", transition: "all .18s", boxShadow: "0 1px 4px rgba(0,0,0,.06)" }}
                      onMouseEnter={e => { e.currentTarget.style.border = `1.5px solid ${section.color}88`; e.currentTarget.style.boxShadow = `0 4px 16px ${section.color}22`; }}
                      onMouseLeave={e => { e.currentTarget.style.border = `1.5px solid ${section.color}22`; e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,.06)"; }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 5 }}>
                        <span style={{ fontSize: 12.5, fontWeight: 700, color: section.color, lineHeight: 1.35, flex: 1, paddingRight: 8 }}>{item.title} ↗</span>
                        <span style={{ fontSize: 9.5, fontWeight: 700, padding: "2px 7px", borderRadius: 999, background: section.light, color: section.color, flexShrink: 0, textTransform: "uppercase", letterSpacing: ".05em" }}>{item.tag}</span>
                      </div>
                      <p style={{ margin: 0, fontSize: 11, color: "#666", lineHeight: 1.5 }}>{item.desc}</p>
                    </a>
                  ))}
                </div>
              </div>
            ))}

            <div style={{ background: "linear-gradient(135deg, #1a1a2e, #0f3460)", borderRadius: 13, padding: "20px 24px", color: "#fff", marginTop: 8 }}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", opacity: .5, marginBottom: 10 }}>📌 Suggested learning path for students</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                {[["Week 1","Read the BMC overview on Strategyzer. Watch the canvas tutorial videos. Complete the Canvas blocks in this tool."],["Week 2","Run 5–10 customer interviews using The Mom Test approach. Update your hypothesis statuses."],["Week 3","Fill in the VP Canvas. Use the Assessment tool to score your model. Identify your weakest block."],["Week 4","Generate your business plan. Study the real company examples. Identify 3 assumptions still to validate."]].map(([w,t]) => (
                  <div key={w}>
                    <div style={{ fontSize: 10, fontWeight: 800, color: "#f0c040", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 5 }}>{w}</div>
                    <div style={{ fontSize: 11, opacity: .7, lineHeight: 1.5 }}>{t}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {view === "plan" && (
          <div style={{ animation: "fadeIn .3s ease" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
              <button onClick={() => setView("canvas")} style={{ background: "#fff", border: "2px solid #e0e0e0", borderRadius: 8, padding: "8px 15px", cursor: "pointer", fontSize: 11.5, fontWeight: 700, color: "#555" }}>← Back to Canvas</button>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, fontFamily: "'Playfair Display', serif", color: "#1a1a2e" }}>{bizName ? `${bizName} — Business Plan` : "Your Business Plan"}</h2>
            </div>
            <div style={{ background: "#fff", borderRadius: 13, padding: "32px 40px", boxShadow: "0 4px 28px rgba(0,0,0,.08)", maxWidth: 840, lineHeight: 1.85, fontSize: 13, color: "#333" }}>
              {planLoading
                ? <div style={{ textAlign: "center", padding: 50, color: "#888" }}><div style={{ fontSize: 32, animation: "spin 2s linear infinite", display: "inline-block", marginBottom: 12 }}>⟳</div><p style={{ fontSize: 14 }}>Generating your business plan...</p></div>
                : <div style={{ whiteSpace: "pre-wrap" }}>{plan}</div>
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
