/* =============================================================================
   SHASHA NEXT STEP — CONTENT FILE
   =============================================================================
   Everything on this page that is actual TEXT, LINKS or STORIES lives in this
   file. The other files (index.html, styles.css, app.js) are about layout and
   behaviour — you shouldn't need to touch them to update content.

   Safe to edit here:
     - Any text in quotes, e.g. "Join a school club..."
     - Any link in quotes, e.g. "https://example.com"
     - Adding, removing or reordering items inside [ ] lists
   Be careful with (and leave alone if unsure):
     - Anything that is NOT in quotes (words like true, false, forObstacle)
     - Commas, brackets { } and [ ], and quote marks — these hold the file
       together. If you get a red error in the browser console after editing,
       the most common cause is a missing or extra comma.
   ========================================================================== */


/* -----------------------------------------------------------------------
   1. OPTIONAL FEEDBACK FORM
   -----------------------------------------------------------------------
   This lets you collect feedback through a Google Form, with the
   student's three answers already filled in when they click through.

   HOW TO SET THIS UP:
   1. Create a Google Form with exactly 3 short-answer questions, e.g.
      "Stage?", "Goal?", "What got in your way?" (wording is up to you).
   2. In Google Forms, open the ⋮ (three dots) menu and choose
      "Get pre-filled link".
   3. Type anything into the 3 answer boxes (the text doesn't matter,
      it's just so the link includes all 3 fields), then click "Get link".
   4. Copy the link it gives you. It will look like:
      https://docs.google.com/forms/d/e/XXXXXXX/viewform?usp=pp_url&entry.111=a&entry.222=b&entry.333=c
   5. Paste the part before the "?" into FORM_URL below (ending in /viewform).
   6. For each of the three "entry.NNNNNN" numbers in that link, match it
      to the question it belongs to and paste the full "entry.NNNNNN" text
      (including the word "entry.") into FORM_ENTRY below.

   If you leave FORM_URL as "" (empty), the page will show a plain
   "Form link coming soon" note instead of a broken button — nothing will
   look broken to students.

   CURRENT STATUS: FORM_URL below is your real, live form — the "Share your
   answers" button links straight to it. It just doesn't pre-fill the three
   answers yet, since that needs the form's entry.NNNNNN ids (steps 2-6
   above). If you want pre-filling later, get those three ids and paste
   them into FORM_ENTRY below; until then, leave FORM_ENTRY's values empty
   and the button will link to a blank form students fill in by hand.
   ----------------------------------------------------------------------- */
const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSecO3s_oi1Jcl5u73-TUmc1iAbg3adI7TPDUpX31fs4RW1TYQ/viewform";
const FORM_ENTRY = {
  stage: "",     // paste the entry.NNNNNN for your "stage" question here
  goal: "",      // paste the entry.NNNNNN for your "goal" question here
  obstacle: ""   // paste the entry.NNNNNN for your "obstacle" question here
};

// The contact email shown at the bottom of every results page.
const SITE = { contact: "tashianyamunama@gmail.com" };


/* -----------------------------------------------------------------------
   2. THE THREE QUESTIONS — answer choices
   ----------------------------------------------------------------------- */

// Question 1: "Where are you right now?"
const STAGES = [
  { id: "sec", label: "Finishing secondary school" },
  { id: "uni", label: "At university or college" },
  { id: "grad", label: "Recently graduated" },
  { id: "work", label: "Working or between steps" }
];

// If a "Finishing secondary school" student picks internship/job/skills as
// their goal, their first to-do is swapped for this one instead.
const SECONDARY_FIRST_TODO = { text: "Join a school club, volunteer or start a small project, so you have something to show." };

// Question 3: "What is getting in your way?" — shown per goal (see "goals"),
// with an optional custom wording per goal in "labels".
const OBSTACLES = [
  { id: "money", label: "Paying for it", goals: ["study", "build", "skills"], labels: { build: "Funding to get started", skills: "Paying for training or tools" } },
  { id: "start", label: "Not knowing where to start", goals: ["study", "intern", "job", "build", "skills"] },
  { id: "connect", label: "Not knowing the right people", goals: ["study", "intern", "job", "build", "skills"], labels: { build: "Finding customers and mentors", skills: "Finding clients" } },
  { id: "tests", label: "Tests and application documents", goals: ["study", "intern", "job"], labels: { intern: "My CV and applications", job: "My CV and applications" } }
];


/* -----------------------------------------------------------------------
   3. LINK HELPER
   -----------------------------------------------------------------------
   Shorthand so each link in the tables below is one short line instead of
   a big { } block. Use it like this:
     L("Name shown to students", "https://the-link.com", "Short description")
   ----------------------------------------------------------------------- */
const L = function (name, url, tag) { return { name: name, url: url, tag: tag }; };


/* -----------------------------------------------------------------------
   4. SHARED LINK TABLES
   -----------------------------------------------------------------------
   These lists are reused by more than one track below, so they are
   defined once here and plugged in by name further down.
   ----------------------------------------------------------------------- */
const VISA_SUB = { label: "Sponsorship data for international students in the US", items: [
  L("MyVisaJobs", "https://www.myvisajobs.com", "Employers that sponsor"),
  L("H1B Grader", "https://h1bgrader.com", "Sponsor data and wages"),
  L("H-1B Employer Data Hub", "https://www.uscis.gov/tools/reports-and-studies/h-1b-employer-data-hub", "Official sponsor records"),
  L("Interstride", "https://www.interstride.com", "Jobs by work authorization"),
  L("GoinGlobal", "https://www.goinglobal.com", "Often free through your school"),
  L("Handshake", "https://joinhandshake.com", "Filter for OPT and CPT") ] };

const PROGRAMS_SUB = { label: "Programs that place students in finance, tech and business (US)", items: [
  L("SEO Career", "https://www.seo-usa.org", "Finance, law and tech internships"),
  L("Girls Who Invest", "https://girlswhoinvest.org", "Women in asset management"),
  L("Rewriting the Code", "https://www.rewritingthecode.org", "Women in tech"),
  L("INROADS", "https://inroads.org", "Paid internships"),
  L("Management Leadership for Tomorrow", "https://mlt.org", "Career programs") ] };

// Trackers and boards by career field (used for internships and jobs)
const FIELD_SUBS = [
  { label: "Tech, software and quant", items: [
    L("Summer 2027 Internships (Simplify and Pitt CSC)", "https://github.com/SimplifyJobs/Summer2027-Internships", "Updated daily"),
    L("New Grad Positions (Simplify)", "https://github.com/SimplifyJobs/New-Grad-Positions", "Full-time, same maintainers"),
    L("Wellfound", "https://wellfound.com", "Startup roles") ] },
  { label: "Finance and banking", items: [
    L("Finance Internship Hub (Adventis)", "https://www.adventiscg.com/class-2028-recruiting-hub", "Internship database, by class year"),
    L("Wall Street Oasis", "https://www.wallstreetoasis.com", "Forums and internship trackers"),
    L("Street of Walls", "https://www.streetofwalls.com", "Banking and PE guides"),
    L("AmplifyME", "https://www.amplifyme.com", "Finance virtual experiences") ] },
  { label: "Consulting", items: [
    L("MBB application deadlines (Management Consulted)", "https://managementconsulted.com/mbb-application-deadlines/", "McKinsey, BCG, Bain deadlines"),
    L("Sophomore consulting programs", "https://managementconsulted.com/sophomore-summer-internships/", "Early programs and deadlines"),
    L("MBB deadlines (MyConsultingOffer)", "https://www.myconsultingoffer.org/mckinsey-bain-bcg-application-deadline/", "US and select global offices") ] },
  { label: "Policy, government and nonprofit", items: [
    L("Idealist", "https://www.idealist.org", "Nonprofit internships and jobs"),
    L("The Washington Center", "https://www.twc.edu", "DC internships with a course"),
    L("CSIS", "https://www.csis.org", "Think tank internships"),
    L("Bipartisan Policy Center", "https://bipartisanpolicy.org", "Paid DC internships"),
    L("Center on Budget and Policy Priorities", "https://www.cbpp.org", "Policy research internships"),
    L("PPIA Fellowship", "https://ppiaprogram.org", "Grad school prep, US citizens and residents"),
    L("USAJOBS Pathways", "https://www.usajobs.gov", "Federal internships, US citizens only") ] },
  { label: "International organizations and development", items: [
    L("UN Careers", "https://careers.un.org", "Each agency posts its own"),
    L("UN Volunteers", "https://www.unv.org", "Volunteer placements"),
    L("African Development Bank", "https://www.afdb.org", "Internship programme"),
    L("World Bank Group", "https://www.worldbank.org/en/about/careers", "Internships and early career"),
    L("ReliefWeb", "https://reliefweb.int/jobs", "Humanitarian jobs and internships"),
    L("Impactpool", "https://www.impactpool.org", "UN, NGO and multilateral roles"),
    L("Devex", "https://www.devex.com/jobs", "International development jobs"),
    L("Global Health Corps", "https://ghcorps.org", "Paid fellowships, Zimbabwe citizens eligible") ] },
  { label: "Research and science", items: [
    L("NSF REU site search", "https://new.nsf.gov/funding/initiatives/reu/search", "Most need US citizenship or residency"),
    L("Summer research beyond UW", "https://www.washington.edu/undergradresearch/summer/summer-beyond-uw/", "Marks programs open to international students"),
    L("Mitacs Globalink", "https://www.mitacs.ca", "Research placements in Canada"),
    L("IPAM RIPS", "https://www.ipam.ucla.edu", "Industry math projects") ] },
  { label: "Marketing, media and design", items: [
    L("Behance Job List", "https://www.behance.net/joblist", "Portfolio-based creative roles"),
    L("Dribbble Jobs", "https://dribbble.com/jobs", "Design roles"),
    L("AIGA Design Jobs", "https://designjobs.aiga.org", "Design internships and jobs"),
    L("The One Club: One ID", "https://www.oneclub.org/one-id/", "Diversity programs in advertising"),
    L("Creative Circle", "https://www.creativecircle.com", "Creative and marketing staffing") ] }
];

const BOARDS_SUBS = [
  { label: "Global", items: [
    L("LinkedIn", "https://www.linkedin.com/jobs", "Search and set alerts"),
    L("Indeed", "https://www.indeed.com", "Wide coverage"),
    L("Glassdoor", "https://www.glassdoor.com", "Jobs and company reviews") ] },
  { label: "Africa", items: [
    L("Fuzu", "https://www.fuzu.com", "Across Africa"),
    L("MyJobMag", "https://www.myjobmag.com", "Nigeria, Kenya, South Africa"),
    L("Jobberman", "https://www.jobberman.com", "Nigeria and Ghana"),
    L("BrighterMonday", "https://www.brightermonday.co.ke", "Kenya, Uganda, East Africa"),
    L("Careers24", "https://www.careers24.com", "South Africa"),
    L("Pnet", "https://www.pnet.co.za", "South Africa"),
    L("CareerJunction", "https://www.careerjunction.co.za", "South Africa"),
    L("Wuzzuf", "https://wuzzuf.net", "Egypt") ] },
  { label: "United States", items: [
    L("Handshake", "https://joinhandshake.com", "Through your school"),
    L("Parker Dewey", "https://www.parkerdewey.com", "Paid micro-internships") ] },
  { label: "Remote work", items: [
    L("We Work Remotely", "https://weworkremotely.com", "Tech, marketing and support"),
    L("Remote OK", "https://remoteok.com", "Remote jobs worldwide") ] }
];

const FELLOW_GROUP = {
  title: "Fellowships and leadership programs",
  why: "Funded programs that build skills and networks. Check age and country rules.",
  forObstacle: ["connect", "money"], skip: ["sec"],
  subs: [
    { label: "Leadership and exchange", items: [
      L("Mandela Washington Fellowship", "https://exchanges.state.gov/non-us/program/mandela-washington-fellowship-young-african-leaders", "Ages 25 to 35, funded, applications Sept to Oct"),
      L("Global Health Corps Africa Fellowship", "https://ghcorps.org", "13-month paid, under 30, Zimbabwe included"),
      L("Echoing Green", "https://echoinggreen.org", "Fellowship for social entrepreneurs"),
      L("Fulbright Foreign Student Program", "https://foreign.fulbrightonline.org", "Master’s study in the US") ] }
  ]
};

const CONF_GROUP = {
  title: "Funded conferences and summits",
  why: "Meet people who can open doors. These cover attendance for selected students.",
  forObstacle: ["connect"], skip: ["sec"],
  subs: [
    { label: "Tech and computing", items: [
      L("Grace Hopper Celebration scholarships", "https://ghc.anitab.org/attend/scholarships", "Women and non-binary in tech"),
      L("Google Conference Scholarships", "https://buildyourfuture.withgoogle.com/scholarships/google-conference-scholarships", "Covers travel and hotel for selected events"),
      L("Tapia Conference", "https://tapiaconference.org", "Diversity in computing, US students"),
      L("NSBE", "https://www.nsbe.org", "Black engineers"),
      L("SHPE", "https://www.shpe.org", "Hispanic STEM professionals"),
      L("AfroTech", "https://afrotech.com", "Black tech and business"),
      L("Great Minds in STEM", "https://www.greatmindsinstem.org", "Underrepresented STEM students") ] },
    { label: "Business and finance", items: [
      L("ALPFA", "https://www.alpfa.org", "Latino finance and business"),
      L("National Black MBA Association", "https://www.nbmbaa.org", "Black business professionals"),
      L("ADCOLOR", "https://adcolor.org", "Marketing and advertising") ] },
    { label: "Leadership and impact", items: [
      L("One Young World scholarships", "https://www.oneyoungworld.com", "Funded summit places, ages 18 to 30 mostly") ] }
    // Add your own funded conferences here: L("Name", "https://...", "Who it is for")
  ]
};


/* -----------------------------------------------------------------------
   5. TRACKS
   -----------------------------------------------------------------------
   One entry per goal a student can pick in Question 2. Each track has:
     id       — must match an obstacle's "goals" list above and the ICONS
                key in app.js; don't rename an existing id.
     enabled  — set to false to hide a track from the question choices.
     title    — shown as the heading on the results page.
     todos    — the starter pack (numbered list). "url"/"label" are optional.
     stories  — exactly 3 entries expected (see note on the sample story
                near the bottom of this file for how "link"/"audio" work).
     groups   — the link tables shown in "Where to look", tabbed by title.
                each group's "why" field is no longer shown on the page
                (removed as a wording simplification) — safe to ignore or
                delete, it has no effect either way.
     mistakes — the "Mistakes to avoid" list.
   ----------------------------------------------------------------------- */
const TRACKS = [
  {
    id: "study", enabled: true, title: "Study further",
    todos: [
      { text: "Shortlist 5 to 8 programs. Make a table with these columns: Program, Deadline, Tests required, Funding, Status.", url: "templates/program-shortlist.xlsx", label: "Shortlist template (spreadsheet)" },
      { text: "Find out which tests each program asks for. Common ones are IELTS or TOEFL for English, SAT for many US undergraduate programs, and GRE or GMAT for some graduate programs." },
      { text: "Build a funding list: scholarships, assistantships and awards from your home country." },
      { text: "Ask one person who has applied to a similar program to read your draft statement." },
      { text: "Keep every deadline and requirement in one place you can reopen later." }
    ],
    stories: [
      { tag: "Funding", obstacle: "money", title: "[Name]: how I paid for my degree", link: "", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" }, // PLACEHOLDER audio — remove when you add a real story
      { tag: "Tests and documents", obstacle: "tests", title: "[Name]: the requirements I almost missed", link: "", audio: "" },
      { tag: "Where to start", obstacle: "start", title: "[Name]: how I chose where to apply", link: "", audio: "" }
    ],
    groups: [
      { title: "Scholarship databases", why: "Sites that keep their own current lists.", forObstacle: ["money"], subs: [
        { label: "Worldwide", items: [
          L("Opportunity Desk", "https://opportunitydesk.org", "Scholarships, fellowships, exchanges"),
          L("Scholars4Dev", "https://www.scholars4dev.com", "For developing-country students"),
          L("ScholarshipPortal", "https://www.scholarshipportal.com", "Search by country and subject"),
          L("Fulbright Foreign Student Program", "https://foreign.fulbrightonline.org", "Study in the US") ] },
        { label: "Africa-focused", items: [
          L("Opportunities for Africans", "https://www.opportunitiesforafricans.com", "Scholarships and fellowships"),
          L("Opportunities for Youth", "https://opportunitiesforyouth.org", "Funded programs for young people"),
          L("After School Africa", "https://www.afterschoolafrica.com", "Scholarships and awards"),
          L("YouthOp", "https://www.youthop.com", "Opportunities for young Africans") ] } ] },
      { title: "Funded programs by destination", why: "Well-known programs, each with its own application page.", forObstacle: ["money"], subs: [
        { label: "Africa and partner universities", items: [
          L("Mastercard Foundation Scholars Program", "https://mastercardfdn.org", "Full scholarships"),
          L("Ashinaga Africa Initiative", "https://www.ashinaga.org", "Support for African students"),
          L("Mandela Rhodes Foundation", "https://www.mandelarhodes.org", "Postgraduate study in South Africa") ] },
        { label: "United States", items: [
          L("Fulbright Foreign Student Program", "https://foreign.fulbrightonline.org", "Full funding for master’s or PhD study"),
          L("Hubert H. Humphrey Fellowship", "https://www.humphreyfellowship.org", "Funded, non-degree year for mid-career professionals"),
          L("AAUW International Fellowships", "https://www.aauw.org/resources/programs/fellowships-grants/aauw-international-fellowships/", "Graduate study in the US, for women") ] },
        { label: "United Kingdom", items: [
          L("Chevening", "https://www.chevening.org", "One-year master’s, government funded"),
          L("Commonwealth Scholarships", "https://cscuk.fcdo.gov.uk", "For Commonwealth countries"),
          L("Gates Cambridge", "https://www.gatescambridge.org", "Postgraduate at Cambridge"),
          L("Rhodes Scholarship", "https://www.rhodeshouse.ox.ac.uk", "Postgraduate at Oxford") ] },
        { label: "Europe and Asia", items: [
          L("DAAD", "https://www.daad.de", "German government scholarships"),
          L("Erasmus Mundus", "https://erasmus-plus.ec.europa.eu", "Joint master’s across Europe"),
          L("Türkiye Scholarships", "https://turkiyeburslari.gov.tr", "Fully funded in Türkiye"),
          L("Schwarzman Scholars", "https://www.schwarzmanscholars.org", "Master’s in China") ] } ] },
      { title: "Advice, tests and requirements", why: "Official sources for what programs actually ask for.", forObstacle: ["tests", "start"], subs: [
        { label: "Advising and applications", items: [
          L("EducationUSA", "https://educationusa.state.gov", "Free, official US advising"),
          L("British Council", "https://www.britishcouncil.org", "UK study and exams"),
          L("Common App", "https://www.commonapp.org", "One application, many US colleges"),
          L("BigFuture", "https://bigfuture.collegeboard.org", "Search colleges") ] },
        { label: "Tests", items: [
          L("IELTS", "https://ielts.org", "English, UK and global"),
          L("TOEFL", "https://www.ets.org/toefl", "English, US focus"),
          L("Duolingo English Test", "https://englishtest.duolingo.com", "Accepted by many schools"),
          L("SAT", "https://satsuite.collegeboard.org/sat", "Undergraduate, US"),
          L("GRE", "https://www.ets.org/gre", "Graduate, US"),
          L("GMAT", "https://www.mba.com/exams/gmat-exam", "Business school"),
          L("Khan Academy", "https://www.khanacademy.org", "Free test prep") ] } ] },
      CONF_GROUP
    ],
    mistakes: [
      "Don’t pay for a test before checking whether your chosen programs actually require it. Rules differ between programs.",
      "Don’t apply to one program at a time. Send several applications in the same window so one rejection doesn’t cost you a year.",
      "Ask for recommendation letters and transcripts early. They take far longer than you think."
    ]
  },
  {
    id: "intern", enabled: true, title: "Land an internship",
    todos: [
      { text: "Write a one-page CV and a two-line pitch about who you are and what you want to learn.", url: "https://flowcv.com", label: "CV builder (FlowCV)" },
      { text: "List 10 organizations and one person at each you could contact. Columns: Organization, Person, Role, Date contacted, Reply.", url: "templates/outreach-tracker.xlsx", label: "Outreach tracker (spreadsheet)" },
      { text: "Send three short messages. Track every reply in a simple sheet." },
      { text: "Ask for one 15-minute conversation with someone doing the work you want." },
      { text: "Create a 30-second elevator pitch about who you are and what you're looking for.", url: "https://www.indeed.com/career-advice/interviewing/how-to-give-an-elevator-pitch-examples", label: "Elevator pitch guide (Indeed)" }
    ],
    stories: [
      { tag: "Connections", obstacle: "connect", title: "[Name]: how I got my first introduction", link: "https://example.com", audio: "" }, // PLACEHOLDER link — remove when you add a real story
      { tag: "Where to start", obstacle: "start", title: "[Name]: what I did first", link: "", audio: "" },
      { tag: "CV and applications", obstacle: "tests", title: "[Name]: my CV before and after", link: "", audio: "" }
    ],
    groups: [
      { title: "Trackers and boards by field", why: "Pick your field. Most of these are kept up to date by their maintainers.", forObstacle: ["start"], skip: ["sec"], subs: FIELD_SUBS },
      { title: "Boards by region", why: "Set alerts so openings come to you.", forObstacle: ["start"], subs: BOARDS_SUBS },
      { title: "International students in the US", why: "Find employers that sponsor visas.", forObstacle: ["tests"], skip: ["sec"], subs: [VISA_SUB] },
      { title: "Programs for underrepresented students", why: "Many are US-focused. Check international eligibility first.", forObstacle: ["connect"], skip: ["sec"], subs: [PROGRAMS_SUB] },
      { title: "Build experience first", why: "For when you have little to show yet.", forObstacle: ["start", "tests"], subs: [
        { label: "Real projects and simulations", items: [
          L("Forage", "https://www.theforage.com", "Free work simulations"),
          L("AmplifyME", "https://www.amplifyme.com", "Finance virtual experiences"),
          L("Parker Dewey", "https://www.parkerdewey.com", "Paid micro-internships"),
          L("Google Careers: Students", "https://careers.google.com/students", "Internships and programs") ] } ] },
      CONF_GROUP
    ],
    mistakes: [
      "Don’t wait until the holidays to apply. Many internships are filled months before they start.",
      "Go to career fairs, conferences and meetups in your first year, not your last. The people you meet early open doors later.",
      "Don’t be afraid to cold email. A short, specific message to the right person often beats an online portal."
    ]
  },
  {
    id: "job", enabled: true, title: "Find a full-time job",
    todos: [
      { text: "Pick two target roles and read five real job posts for each. Note the repeated skills." },
      { text: "Update your CV and profile to match those words honestly.", url: "https://flowcv.com", label: "CV builder (FlowCV)" },
      { text: "Practice two interview stories and ask one person to listen and react." },
      { text: "Apply to your first three roles and record each in a simple tracker. Columns: Company, Role, Date applied, Status, Follow-up date.", url: "templates/job-application-tracker.xlsx", label: "Application tracker (spreadsheet)" },
      { text: "Ask for feedback after any rejection." }
    ],
    stories: [
      { tag: "Where to start", obstacle: "start", title: "[Name]: from Bridge to my first job", link: "", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" }, // PLACEHOLDER audio — remove when you add a real story
      { tag: "Connections", obstacle: "connect", title: "[Name]: how a referral changed my search", link: "", audio: "" },
      { tag: "CV and applications", obstacle: "tests", title: "[Name]: what employers asked to see", link: "", audio: "" }
    ],
    groups: [
      { title: "Boards by region", why: "Filter by entry level and set alerts.", forObstacle: ["start", "tests"], subs: BOARDS_SUBS },
      { title: "Trackers and boards by field", why: "Pick your field.", skip: ["sec"], subs: FIELD_SUBS },
      { title: "International students in the US", why: "Find employers that sponsor visas.", forObstacle: ["tests"], skip: ["sec"], subs: [VISA_SUB] },
      { title: "Programs for underrepresented students", why: "Many are US-focused. Check international eligibility first.", forObstacle: ["connect"], skip: ["sec"], subs: [PROGRAMS_SUB] },
      FELLOW_GROUP,
      CONF_GROUP
    ],
    mistakes: [
      "Don’t send the same CV everywhere. Match it to the exact words in each job post.",
      "Don’t wait until you meet 100% of the requirements. If you meet most of them, apply.",
      "Follow up once, politely, about a week after applying. Many people never do, and it makes you memorable."
    ]
  },
  {
    id: "build", enabled: true, title: "Start a business or venture",
    todos: [
      { text: "Write the problem in one sentence and name three people who have it." },
      { text: "Talk to those three people and write down exactly what they say." },
      { text: "Run the smallest possible test. Write down what you did, who responded and what you learned." },
      { text: "Decide whether to continue, change or stop, based on what you learned." },
      { text: "Share the idea with one person who will be honest with you." }
    ],
    stories: [
      { tag: "Funding", obstacle: "money", title: "[Name]: how I started with very little", link: "https://example.com", audio: "" }, // PLACEHOLDER link — remove when you add a real story
      { tag: "Where to start", obstacle: "start", title: "[Name]: my first 90 days", link: "", audio: "" },
      { tag: "Customers", obstacle: "connect", title: "[Name]: how I found my first customers", link: "", audio: "" }
    ],
    groups: [
      { title: "Funding and prizes", why: "Money and mentoring for early-stage founders.", forObstacle: ["money"], subs: [
        { label: "Africa", items: [
          L("Tony Elumelu Foundation", "https://www.tonyelumelufoundation.org", "Seed capital and mentoring"),
          L("Anzisha Prize", "https://anzishaprize.org", "Founders aged 15 to 22"),
          L("Africa’s Business Heroes", "https://africabusinessheroes.org", "Jack Ma Foundation prize") ] },
        { label: "Global", items: [
          L("Echoing Green", "https://echoinggreen.org", "Fellowship for social entrepreneurs"),
          L("Y Combinator Startup School", "https://www.startupschool.org", "Free online course") ] } ] },
      { title: "Accelerators and programs", why: "Programs that back founders with support and introductions.", forObstacle: ["start"], subs: [
        { label: "Africa and emerging markets", items: [
          L("Google for Startups Accelerator: Africa", "https://startup.google.com", "Early-stage tech startups"),
          L("Seedstars", "https://www.seedstars.com", "Emerging-market startups"),
          L("Orange Corners", "https://www.orangecorners.com", "Young entrepreneurs") ] },
        { label: "Global", items: [
          L("Y Combinator", "https://www.ycombinator.com", "Top accelerator"),
          L("Techstars", "https://www.techstars.com", "Accelerators worldwide"),
          L("Antler", "https://www.antler.co", "Early-stage investor") ] } ] },
      { title: "Founder networks and learning", why: "Find investors, peers and free courses.", forObstacle: ["connect"], subs: [
        { label: "Networks", items: [
          L("VC4A", "https://vc4a.com", "Investors and programs in Africa"),
          L("YALI Network", "https://yali.state.gov", "Free business and leadership courses") ] } ] },
      FELLOW_GROUP,
      CONF_GROUP
    ],
    mistakes: [
      "Don’t build the product before talking to customers. Ten honest conversations save months of wasted work.",
      "Don’t spend money on logos, branding or registration before your first sale.",
      "Don’t wait for funding to start. Start with the smallest version you can sell this month."
    ]
  },
  {
    id: "skills", enabled: true, title: "Freelance or skilled work",
    todos: [
      { text: "Choose one skill and one small starter project you can finish." },
      { text: "Put the finished work where a client can see it." },
      { text: "Contact five people who might pay for it and track the replies. Columns: Name, Date contacted, Reply, Next step.", url: "templates/client-outreach-tracker.xlsx", label: "Client tracker (spreadsheet)" },
      { text: "Set a simple price and write down exactly what the client gets." },
      { text: "Ask your first client for a short testimonial." }
    ],
    stories: [
      { tag: "Where to start", obstacle: "start", title: "[Name]: how I got my first paid client", link: "https://example.com", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" }, // PLACEHOLDER link + audio — remove when you add a real story
      { tag: "Paying for training", obstacle: "money", title: "[Name]: learning a skill for free", link: "", audio: "" },
      { tag: "Clients", obstacle: "connect", title: "[Name]: finding work without a network", link: "", audio: "" }
    ],
    groups: [
      { title: "Free and low-cost training", why: "Build one skill you can sell.", forObstacle: ["money", "start"], subs: [
        { label: "Free", items: [
          L("ALX Africa", "https://www.alxafrica.com", "Tech and professional programs"),
          L("Google Digital Skills for Africa", "https://grow.google/intl/africa", "Digital and career courses"),
          L("freeCodeCamp", "https://www.freecodecamp.org", "Coding, free"),
          L("CS50", "https://cs50.harvard.edu", "Harvard intro to computer science"),
          L("Kaggle Learn", "https://www.kaggle.com/learn", "Data and machine learning"),
          L("Khan Academy", "https://www.khanacademy.org", "Math, economics, more") ] },
        { label: "Free to audit or with financial aid", items: [
          L("Coursera", "https://www.coursera.org", "Financial aid on most courses"),
          L("edX", "https://www.edx.org", "University courses") ] } ] },
      { title: "Skills by field", why: "Learn the tools your field expects.", forObstacle: ["start"], subs: [
        { label: "Finance", items: [
          L("Wall Street Prep", "https://www.wallstreetprep.com", "Financial modeling"),
          L("Breaking Into Wall Street", "https://breakingintowallstreet.com", "Modeling and interview guides"),
          L("Macabacus", "https://macabacus.com", "Excel and modeling resources"),
          L("Corporate Finance Institute", "https://corporatefinanceinstitute.com", "Finance courses") ] },
        { label: "Marketing and design", items: [
          L("HubSpot Academy", "https://academy.hubspot.com", "Free marketing courses"),
          L("Google Skillshop", "https://skillshop.withgoogle.com", "Analytics and ads certifications"),
          L("Google Career Certificates", "https://grow.google/certificates", "UX design, data, project management") ] },
        { label: "Cloud and tech", items: [
          L("Microsoft Learn", "https://learn.microsoft.com", "Free learning paths"),
          L("AWS Skill Builder", "https://skillbuilder.aws", "Cloud skills"),
          L("Cisco Networking Academy", "https://www.netacad.com", "Networking and cybersecurity") ] } ] },
      { title: "Certifications employers recognize", why: "Proof of skill for your CV.", forObstacle: ["tests"], subs: [
        { label: "Credentials", items: [
          L("Google Career Certificates", "https://grow.google/certificates", "Data, design, project management"),
          L("Microsoft credentials", "https://learn.microsoft.com/credentials", "Role-based certifications"),
          L("AWS Certification", "https://aws.amazon.com/certification", "Cloud credentials"),
          L("CFA Institute Investment Foundations", "https://www.cfainstitute.org/programs/investment-foundations", "Finance basics") ] } ] },
      { title: "Find your first clients", why: "Start with small jobs and collect reviews.", forObstacle: ["connect"], subs: [
        { label: "Marketplaces", items: [
          L("Upwork", "https://www.upwork.com", "General freelance"),
          L("Fiverr", "https://www.fiverr.com", "Sell a packaged service"),
          L("Freelancer", "https://www.freelancer.com", "Projects and contests") ] },
        { label: "Remote work boards", items: [
          L("We Work Remotely", "https://weworkremotely.com", "Remote jobs"),
          L("Remote OK", "https://remoteok.com", "Remote jobs worldwide"),
          L("Wellfound", "https://wellfound.com", "Startup jobs") ] } ] },
      CONF_GROUP
    ],
    mistakes: [
      "Don’t underprice to win your first clients. The cheapest clients are the hardest to keep.",
      "Agree the price and exactly what the client gets in writing before you start any work.",
      "Finish your first small jobs fast and well. Early reviews matter more than early earnings."
    ]
  }
];


/* -----------------------------------------------------------------------
   6. SAMPLE STORY — reference only, DELETE ME
   -----------------------------------------------------------------------
   This is not a real story and is not shown anywhere on the page — no
   track above references it. It exists purely so you can see, by reading
   it, how the two story fields behave:

     - "audio": a direct .mp3/.m4a/.wav/.ogg file plays inline on the page
       (example below is a freely-licensed test audio file, not a real
       alumni story).
     - "link": any other URL (YouTube, a podcast page, etc.) opens in a
       new browser tab instead (example below is the generic placeholder
       domain reserved for documentation, example.com — not a real link).

   To try it for real in a browser: copy this object into any track's
   "stories" list above, reload the page, then take it back out.
   Once you have real stories to add, delete this whole block.
   ----------------------------------------------------------------------- */
const SAMPLE_STORY = {
  tag: "Sample story",
  obstacle: "start",
  title: "[Sample Name]: delete this example once you have a real story",
  link: "https://example.com",
  audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
};
