export const cvData = {
  name: "Jorge Rosas",
  email: "jorgetouriga@gmail.com",
  phone: "+351 914 043 611",
  linkedin: "https://www.linkedin.com/in/-jorge-rosas/",
  cv: "/CV_Jorge_Rosas.pdf",
  workAuthorization: "EU Citizen (Portuguese)",
  hero: {
    eyebrow: "BSc Management · Nova SBE · Lisbon",
    headline: "Structured problem-solver across strategy and investing.",
    subtitle:
      "I led the customer discovery behind a lead proposal to NOS leadership, and built the industry analysis behind a Magnite pitch that returned +104.6%. Looking for summer internships in London, Madrid, Lisbon and Dublin.",
    proof: [
      { value: "Tuition scholarship", label: "Santander Excellence Award 2025, Nova SBE" },
      { value: "+104.6%", label: "realised return, Magnite pitch (PMC)", positive: true },
      { value: "18th / 90", label: "Morgan Stanley Amplify ME Markets" },
    ],
  },
  cases: {
    nos: {
      tag: "Strategy case",
      title: "NOS: why customers don’t know about its sustainability efforts",
      meta: "Nova SBE × NOS Project X Innovation Sprint · Sep–Nov 2025",
      steps: [
        {
          label: "Situation",
          text: "Selected as the sole bachelor’s student on Nova SBE’s flagship innovation sprint with NOS (€3.74B EV), tasked with a sustainability strategy for the core business and customer app.",
        },
        {
          label: "Insight",
          text: "Led 11 customer interviews. Near-universal unawareness of NOS’s sustainability initiatives, even among long-tenure customers.",
        },
        {
          label: "Recommendation",
          text: "Active in-app engagement instead of passive communication: a gamification-driven strategy spanning sustainability challenges, rewards and ESG initiatives.",
        },
        {
          label: "Outcome",
          text: "Presented the lead proposal to NOS sustainability and product leadership. Received an internship offer from NOS.",
        },
      ],
    },
    magnite: {
      tag: "Investment case",
      title: "Magnite (MGNI): pitch to full exit",
      meta: "Portfolio Management Club · Communication Services",
      returnLabel: "Realised return",
      returnValue: "+104.64%",
      summary:
        "I built the industry and competitive analysis behind the team’s valuation ($17.4–25.3 DCF fair value; recommended at $13.42, bought at $13.00) and presented the thesis to the Investment Committee. Sized at 4% of the $1.49M fund.",
      footnote:
        "Line: MGNI daily close (Yahoo Finance).",
    },
  },
  experience: [
    {
      org: "Portfolio Management Club",
      role: "Investment Analyst",
      date: "Jan 2026 – Present",
      image: "/pmc-logo-new.png",
      logo: true,
      bullets: [
        "Built the industry and competitive analysis for a Magnite pitch ($17.4–$25.3 DCF fair value vs $13.42 share price) and presented the thesis to the Investment Committee",
        "Evaluated 10+ investment proposals within a $1.49M simulated fund, defending assumptions in committee and voting alongside portfolio managers",
        "Building the DCF for an EnerSys pitch (industrial batteries and energy storage) using Bloomberg",
        "Worked on a Verizon company analysis and Nomad Foods earnings coverage",
      ],
    },
    {
      org: "Growth Partners Capital",
      role: "Club Project (upcoming)",
      date: "Oct 2026 – Nov 2026",
      image: "/gpc-logo.png",
      logoDark: true,
      bullets: [
        "Will search for a target company for the club’s blue economy fund, with a midterm presentation in late October and a final presentation in November",
      ],
    },
    {
      org: "Personal Project",
      role: "AI Website Development",
      date: "Jun 2026 – Present",
      bullets: [
        "Used AI development tools to build and ship two live websites, a commercial site for a family wine business and this portfolio, managing scope, design direction and deployment",
      ],
    },
  ],
  education: [
    {
      institution: "Nova School of Business and Economics",
      degree: "Bachelor of Science in Management",
      date: "Sep 2025 – Jun 2028",
      bullets: ["Santander Excellence Award 2025, tuition scholarship"],
      note: "Nova SBE’s Master’s in Management ranks #4 worldwide (FT 2025)",
    },
    {
      institution: "Lycée Français International de Porto",
      degree: "French Baccalauréat",
      date: "Sep 2022 – Jun 2025",
      bullets: [
        "Mention Très Bien",
        "19/20 Economics, 19.4/20 Further Economics",
      ],
    },
  ],
  skills: [
    {
      group: "Analysis",
      items: [
        "Financial statement analysis",
        "DCF valuation",
        "Industry and competitive analysis",
        "Comparable company analysis",
      ],
    },
    {
      group: "Tools",
      items: ["Excel", "PowerPoint", "Word", "Bloomberg", "AI tools (Claude)"],
    },
    {
      group: "Languages",
      items: ["Portuguese (native)", "English (fluent)", "French (fluent)", "Spanish (B2)"],
    },
    {
      group: "Certifications",
      items: [
        "Morgan Stanley Amplify ME Markets (ranked 18th/90)",
        "Morgan Stanley Amplify ME M&A Finance Accelerator",
      ],
    },
  ],
  contact: {
    heading: "Let’s talk.",
    text: "Open to summer internships in consulting, investing and tech across London, Madrid, Lisbon and Dublin.",
    facts: "Lisbon · Available summer 2027 · EU citizen",
  },
};
