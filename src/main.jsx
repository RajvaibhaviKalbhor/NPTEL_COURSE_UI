import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { course } from "./data/course.js";
import "./styles.css";

const icons = {
  home: <><path d="m3 10 9-7 9 7"/><path d="M5 9v11h14V9M9 20v-7h6v7"/></>,
  list: <><path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6h.01M4 12h.01M4 18h.01"/></>,
  chart: <><path d="M4 20V11h4v9M10 20V4h4v16M16 20v-7h4v7"/></>,
  grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
  user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  award: <><circle cx="12" cy="8" r="5"/><path d="m8.5 12-1 9 4.5-2.5 4.5 2.5-1-9"/></>,
  check: <><path d="m5 12 4 4L19 6"/></>,
  arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
  chevron: <path d="m9 18 6-6-6-6"/>,
  certificate: <><path d="M12 3 15 5l4 1v4l2 3-2 3v4l-4 1-3 2-3-2-4-1v-4l-2-3 2-3V6l4-1z"/><path d="m9 12 2 2 4-4"/></>,
  close: <><path d="m18 6-12 12M6 6l12 12"/></>
};

function Icon({ name, size = 20 }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{icons[name]}</svg>;
}

function BrandMark() {
  return <span className="brand-mark" aria-hidden="true"><span>✺</span></span>;
}

const navItems = [
  { id: "overview", label: "Overview", icon: "home" },
  { id: "contents", label: "Contents", icon: "list" },
  { id: "grades", label: "Grades", icon: "chart" },
  { id: "more", label: "More", icon: "grid" },
  { id: "account", label: "Account", icon: "user" }
];

function Header({ page, setPage }) {
  return <>
    <div className="demo-strip"><span>DEMO</span> Personal frontend demonstration · Not an official NPTEL portal</div>
    <header className="site-header">
      <button className="brand" onClick={() => setPage("overview")} aria-label="NPTEL course overview">
        <BrandMark /><span className="brand-text"><strong>NPTEL</strong><small>Self-Paced Courses</small></span>
      </button>
      <div className="header-course">{course.title}</div>
      <div className="header-tools">{navItems.slice(0,4).map(item => <button key={item.id} className={`header-icon ${page === item.id ? "selected" : ""}`} onClick={() => setPage(item.id)} aria-label={item.label} aria-current={page === item.id ? "page" : undefined}><Icon name={item.icon} size={17}/></button>)}<button className="avatar" onClick={() => setPage("account")} aria-label="Open demo account">A</button></div>
    </header>
    <div className="section-bar"><BrandMark/><div><span className="section-label">{navItems.find(item => item.id === page)?.label ?? "Overview"}</span><span className="section-course">{course.title}</span></div></div>
  </>;
}

function CourseCard({ onContinue }) {
  return <section className="course-card">
    <div className="course-card-main">
      <div className="course-art"><div className="art-sun"/><div className="art-slope"/><span>CREST</span><small>CLIMATE · ENERGY · HEALTH</small></div>
      <div className="course-identity"><h1>{course.title}</h1><p className="instructor"><Icon name="user" size={18}/> Instructor: {course.instructor}</p><div className="tags"><span><Icon name="clock" size={16}/> {course.courseType}</span><span><Icon name="award" size={16}/> {course.certificateType}</span></div></div>
    </div>
    <div className="course-card-stats">
      <div className="date-stat"><span>ENROLLED ON</span><strong>{course.enrolledOn}</strong></div>
      <div className="date-stat access-stat"><span>ACCESS UNTIL</span><strong>{course.accessUntil}</strong></div>
      <div className="progress-stat"><div className="progress-label"><span>COURSE PROGRESS</span><strong>{course.progress}% complete</strong></div><div className="progress-track"><i/></div><small>{course.assignmentsSubmitted} of {course.assignmentsTotal} assignments submitted</small></div>
      <button className="button button-light continue-button" onClick={onContinue}>Continue learning <Icon name="arrow" size={19}/></button>
    </div>
  </section>;
}

function StatusPanel({ onCertificate }) {
  return <section className="completion-panel" aria-label="Course completion status">
    <div className="completion-copy"><span className="status-icon"><Icon name="check" size={19}/></span><div><h2>{course.courseStatus}</h2><p>You have completed the course and its certification examination.</p></div></div>
    <div className="completion-details"><div><span>EXAMINATION STATUS</span><strong className="passed"><Icon name="check" size={15}/> {course.examinationStatus}</strong></div><div><span>CERTIFICATION STATUS</span><strong>{course.certificationStatus}</strong></div><button className="button button-outline" onClick={onCertificate}>View Certificate <Icon name="arrow" size={17}/></button></div>
  </section>;
}

function CertificateModal({ onClose }) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={event => event.target === event.currentTarget && onClose()}>
    <section className="certificate-modal" role="dialog" aria-modal="true" aria-labelledby="certificate-title">
      <div className="modal-heading"><div><span className="eyebrow">CERTIFICATE</span><h2 id="certificate-title">Course completion certificate</h2></div><button className="icon-button" onClick={onClose} aria-label="Close certificate preview"><Icon name="close"/></button></div>
      <div className="certificate-placeholder"><div className="placeholder-seal"><BrandMark/></div><span className="eyebrow">DEMO PREVIEW</span><h3>Certificate preview unavailable</h3><p>No student certificate document was provided with the screenshots. This clearly labeled placeholder does not represent an official certificate.</p><div className="placeholder-course">{course.title}</div></div>
      <div className="modal-footer"><span>Demo only · No certificate identifier or score shown</span><button className="button button-light" onClick={onClose}>Close</button></div>
    </section>
  </div>;
}

function Criteria() {
  return <div className="reference-info"><section><h2>CRITERIA TO GET A CERTIFICATE</h2><ul><li>Exam score = 50% of the proctored certification exam score out of 100</li><li>Only the e-certificate will be made available. Hard copies will not be dispatched.</li></ul></section><section><h2>EXAM FEE</h2><ul><li>The fee for remote proctoring exam is Rs.1500 + GST.</li><li>An additional fee of Rs.1500 will apply for a non-standard time slot.</li></ul></section><p className="thank-you">Thank you for your interest in our online courses and certification. Happy learning.</p></div>;
}

function Modules({ expanded, toggle }) {
  return <div className="module-list">{course.modules.map((module, index) => {
    const isExpanded = expanded === index;
    return <section className={`module-card ${module.complete ? "is-complete" : ""}`} key={module.title}>
      <button className="module-trigger" aria-expanded={isExpanded} onClick={() => toggle(index)}>
        <span className="module-heading"><strong>{module.title}</strong><small>{module.subtitle}</small></span>
        <span className={module.complete ? "complete-badge" : "lesson-badge"}>{module.complete ? <><Icon name="check" size={13}/> Complete</> : "Lessons only"}</span><span className={`module-chevron ${isExpanded ? "turned" : ""}`}><Icon name="chevron"/></span>
      </button>
      {module.complete && <div className="module-progress"><div><i/></div><small>1 of 1 submitted</small></div>}
      {isExpanded && <div className="module-expanded">{module.complete ? <><span className="assignment-check"><Icon name="check" size={15}/></span><span><strong>Pre-requisite Assignment</strong><small>Submitted · Complete</small></span><span className="score-unavailable">Score not provided</span></> : <p>{module.count} lessons in this module. Individual lesson titles were not included in the supplied reference screenshots.</p>}</div>}
    </section>;
  })}</div>;
}

function Overview({ onContinue, onCertificate, expanded, toggle }) {
  return <><CourseCard onContinue={onContinue}/><StatusPanel onCertificate={onCertificate}/><Criteria/><ContentsSection expanded={expanded} toggle={toggle}/></>;
}

function ContentsSection({ expanded, toggle }) {
  return <section className="contents-section"><div className="section-title-row"><h2><Icon name="list" size={17}/> Course contents</h2><span>11 modules&nbsp; · &nbsp;105 lessons&nbsp; · &nbsp;1 assignment</span></div><Modules expanded={expanded} toggle={toggle}/></section>;
}

function GradesPage() {
  return <div className="page-content"><div className="page-heading"><span className="eyebrow">COURSE WORK</span><h1>Grades</h1><p>Assignment submission information for this course.</p></div><section className="grade-card"><div className="grade-card-heading"><div><span className="eyebrow">ASSIGNMENT</span><h2>Pre-requisite Assignment</h2></div><span className="complete-badge"><Icon name="check" size={13}/> Complete</span></div><div className="grade-row"><span>Submission status</span><strong>Submitted</strong></div><div className="grade-row"><span>Assignments submitted</span><strong>{course.assignmentsSubmitted} of {course.assignmentsTotal}</strong></div><div className="grade-row"><span>Score</span><strong className="muted-value">Not provided</strong></div></section><div className="notice"><Icon name="check" size={17}/> Course successfully completed · Examination passed</div></div>;
}

function MorePage({ onCertificate }) {
  return <div className="page-content"><div className="page-heading"><span className="eyebrow">COURSE DETAILS</span><h1>More</h1><p>Examination and certification information.</p></div><div className="more-grid"><section className="detail-card"><span className="detail-icon"><Icon name="certificate"/></span><div><span className="eyebrow">EXAMINATION</span><h2>Exam {course.examinationStatus}</h2><p>Your certification examination is complete.</p></div><span className="complete-badge"><Icon name="check" size={13}/> Passed</span></section><section className="detail-card"><span className="detail-icon"><Icon name="award"/></span><div><span className="eyebrow">CERTIFICATION</span><h2>{course.certificationStatus}</h2><p>Open the demo certificate preview.</p><button className="text-action" onClick={onCertificate}>View Certificate <Icon name="arrow" size={16}/></button></div></section></div><div className="notice">Demo data only · No exam score, certificate date, or certificate number was provided.</div></div>;
}

function AccountPage() {
  return <div className="page-content"><div className="page-heading"><span className="eyebrow">ACCOUNT</span><h1>Demo account</h1><p>Personal information is omitted from this frontend demonstration.</p></div><section className="grade-card account-card"><span className="account-avatar">A</span><div><strong>Student</strong><span>Course learner · Demo profile</span></div><span className="demo-chip">DEMO</span></section></div>;
}

function Footer() {
  return <footer className="site-footer"><span>Workshop related queries: <u>nptelplus-workshop@nptel.iitm.ac.in</u><br/>NPTEL Self-paced queries: <u>self-paced@nptel.iitm.ac.in</u></span><span>ADDRESS: NPTEL Office, 3rd Floor, ICSR<br/>Building, IIT Madras, Chennai - 600036</span><span>PHONE: (044) 2257 5908</span></footer>;
}

function App() {
  const [page, setPage] = useState("overview");
  const [expanded, setExpanded] = useState(null);
  const [certificateOpen, setCertificateOpen] = useState(false);
  const onContinue = () => { setPage("contents"); setExpanded(1); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const toggle = index => setExpanded(current => current === index ? null : index);
  return <div className="app-shell"><Header page={page} setPage={setPage}/><main className="main-content">
    {page === "overview" && <Overview onContinue={onContinue} onCertificate={() => setCertificateOpen(true)} expanded={expanded} toggle={toggle}/>} 
    {page === "contents" && <div className="page-content"><div className="page-heading"><span className="eyebrow">COURSE CONTENTS</span><h1>Course contents</h1><p>11 modules · 105 lessons · 1 assignment</p><div className="content-progress"><span>Course progress</span><strong>100% complete</strong><div className="progress-track"><i/></div></div></div><Modules expanded={expanded} toggle={toggle}/></div>}
    {page === "grades" && <GradesPage/>}{page === "more" && <MorePage onCertificate={() => setCertificateOpen(true)}/ >}{page === "account" && <AccountPage/>}
    <Footer/>
  </main><nav className="bottom-nav" aria-label="Course navigation">{navItems.map(item => <button key={item.id} className={page === item.id ? "active" : ""} onClick={() => {setPage(item.id); window.scrollTo({top:0,behavior:"smooth"});}} aria-current={page === item.id ? "page" : undefined}><span className="nav-icon"><Icon name={item.icon} size={22}/></span><span>{item.label}</span></button>)}</nav>{certificateOpen && <CertificateModal onClose={() => setCertificateOpen(false)}/>}</div>;
}

createRoot(document.getElementById("root")).render(<App/>);
