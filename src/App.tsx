import { useMemo, useState, type ReactNode } from "react"

type Role = "host" | "teacher"
type Tone = "open" | "pending" | "cancelled" | "neutral"

const hostNav = [
  ["dashboard", "Dashboard", "grid"],
  ["create", "Create event", "plus"],
  ["events", "My events", "calendar"],
  ["allocations", "Allocations", "users"],
]

const teacherNav = [
  ["dashboard", "Dashboard", "grid"],
  ["class", "My class", "users"],
  ["browse", "Browse events", "search"],
  ["allocate", "Allocate students", "check"],
  ["my-allocations", "My allocations", "clipboard"],
]

const events = [
  {
    title: "Inter-College Tech Symposium",
    date: "28 Mar 2025",
    time: "10:00 AM",
    venue: "Main Auditorium",
    type: "Volunteer",
    filled: 12,
    total: 20,
    status: "Open",
  },
  {
    title: "Annual Sports Meet",
    date: "02 Apr 2025",
    time: "8:30 AM",
    venue: "College Ground",
    type: "Participant",
    filled: 36,
    total: 40,
    status: "Few slots left",
  },
  {
    title: "Cultural Fest — Aurora",
    date: "12 Apr 2025",
    time: "4:00 PM",
    venue: "Open Air Theatre",
    type: "Volunteer",
    filled: 18,
    total: 30,
    status: "Open",
  },
]

const students = [
  {
    name: "Aarav Menon",
    roll: "22CS001",
    dept: "Computer Science",
    contact: "+91 98765 43210",
  },
  {
    name: "Diya Nair",
    roll: "22CS007",
    dept: "Computer Science",
    contact: "+91 98234 56781",
  },
  {
    name: "Ishaan Rao",
    roll: "22CS012",
    dept: "Computer Science",
    contact: "+91 97123 45678",
  },
  {
    name: "Meera Shah",
    roll: "22CS018",
    dept: "Computer Science",
    contact: "+91 96543 21876",
  },
  {
    name: "Nikhil Kumar",
    roll: "22CS024",
    dept: "Computer Science",
    contact: "+91 99876 54321",
  },
]

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const paths: Record<string, ReactNode> = {
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="2" />
        <rect x="14" y="3" width="7" height="7" rx="2" />
        <rect x="3" y="14" width="7" height="7" rx="2" />
        <rect x="14" y="14" width="7" height="7" rx="2" />
      </>
    ),
    plus: (
      <>
        <path d="M12 5v14M5 12h14" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </>
    ),
    check: (
      <>
        <path d="m20 6-11 11-5-5" />
      </>
    ),
    clipboard: (
      <>
        <rect x="5" y="4" width="14" height="17" rx="2" />
        <path d="M9 4V2h6v2M9 11h6M9 15h6" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14m-6-6 6 6-6 6" />
      </>
    ),
    back: (
      <>
        <path d="m15 18-6-6 6-6" />
      </>
    ),
    location: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    more: (
      <>
        <circle cx="5" cy="12" r="1" />
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
      </>
    ),
    edit: (
      <>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
      </>
    ),
    trash: (
      <>
        <path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v6M14 11v6" />
      </>
    ),
    upload: (
      <>
        <path d="M12 16V4m-5 5 5-5 5 5M4 20h16" />
      </>
    ),
    filter: (
      <>
        <path d="M4 5h16M7 12h10M10 19h4" />
      </>
    ),
    download: (
      <>
        <path d="M12 4v12m-5-5 5 5 5-5M4 20h16" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    logout: (
      <>
        <path d="M10 17l5-5-5-5M15 12H3M15 4h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-5" />
      </>
    ),
    eye: (
      <>
        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
        <circle cx="12" cy="12" r="2.5" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
  }
  return (
    <svg
      className="icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

function Button({
  children,
  variant = "primary",
  icon,
  disabled,
  onClick,
  type = "button",
}: {
  children: ReactNode
  variant?: "primary" | "secondary" | "ghost" | "danger"
  icon?: string
  disabled?: boolean
  onClick?: () => void
  type?: "button" | "submit"
}) {
  return (
    <button
      type={type}
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && <Icon name={icon} size={18} />}
      <span>{children}</span>
    </button>
  )
}

function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode
  tone?: Tone
}) {
  return (
    <span className={`badge badge-${tone}`}>
      <span className="badge-dot" />
      {children}
    </span>
  )
}

function Field({
  label,
  placeholder,
  type = "text",
  error,
  defaultValue,
}: {
  label: string
  placeholder?: string
  type?: string
  error?: string
  defaultValue?: string
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
      {error && <small>{error}</small>}
    </label>
  )
}

function SelectField({
  label,
  options,
  defaultValue,
}: {
  label: string
  options: string[]
  defaultValue?: string
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <select defaultValue={defaultValue}>
        {options.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
    </label>
  )
}

function Progress({
  value,
  total,
  compact = false,
}: {
  value: number
  total: number
  compact?: boolean
}) {
  const percent = Math.round((value / total) * 100)
  return (
    <div className={`progress-wrap ${compact ? "compact" : ""}`}>
      <div className="progress-label">
        <span>
          {value} of {total} slots filled
        </span>
        <strong>{percent}%</strong>
      </div>
      <div className="progress">
        <span style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}

function StatCard({
  icon,
  value,
  label,
  note,
}: {
  icon: string
  value: string
  label: string
  note: string
}) {
  return (
    <div className="stat-card">
      <div className="stat-icon">
        <Icon name={icon} />
      </div>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
        <small>{note}</small>
      </div>
    </div>
  )
}

function EmptyState({ onAction }: { onAction?: () => void }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <Icon name="calendar" size={28} />
      </div>
      <h3>No events yet</h3>
      <p>
        Create your first event and start bringing your campus community
        together.
      </p>
      <Button icon="plus" onClick={onAction}>
        Create event
      </Button>
    </div>
  )
}

function Modal({
  title,
  children,
  action,
  destructive,
  onClose,
}: {
  title: string
  children: ReactNode
  action: string
  destructive?: boolean
  onClose: () => void
}) {
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <button className="icon-btn modal-close" onClick={onClose}>
          <Icon name="close" />
        </button>
        <div className="modal-icon">
          <Icon name={destructive ? "trash" : "upload"} size={24} />
        </div>
        <h2>{title}</h2>
        {children}
        <div className="modal-actions">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant={destructive ? "danger" : "primary"}
            onClick={onClose}
          >
            {action}
          </Button>
        </div>
      </div>
    </div>
  )
}

function EventCard({
  event,
  onAllocate,
}: {
  event: typeof events[number]
  onAllocate?: () => void
}) {
  return (
    <article className="event-card">
      <div className="event-card-top">
        <div className="event-date">
          <strong>{event.date.split(" ")[0]}</strong>
          <span>{event.date.split(" ")[1]}</span>
        </div>
        <Badge tone={event.status === "Open" ? "open" : "pending"}>
          {event.status}
        </Badge>
      </div>
      <h3>{event.title}</h3>
      <div className="event-meta">
        <span>
          <Icon name="calendar" size={16} />
          {event.date} · {event.time}
        </span>
        <span>
          <Icon name="location" size={16} />
          {event.venue}
        </span>
      </div>
      <div className="event-type">
        <span>{event.type}</span>
        <span>{event.total - event.filled} slots remaining</span>
      </div>
      <Progress value={event.filled} total={event.total} compact />
      {onAllocate && (
        <Button onClick={onAllocate}>
          Allocate students <Icon name="arrow" size={17} />
        </Button>
      )}
    </article>
  )
}

function Landing({ goLogin }: { goLogin: (role: Role) => void }) {
  return (
    <div className="landing">
      <header className="landing-nav">
        <Logo dark />
        <nav>
          <a href="#roles">How it works</a>
          <a href="#features">Features</a>
          <Button variant="secondary" onClick={() => goLogin("teacher")}>
            Teacher login
          </Button>
          <Button onClick={() => goLogin("host")}>Host login</Button>
        </nav>
      </header>
      <main>
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">Campus events, in sync</span>
            <h1>Organize college events without the coordination chaos.</h1>
            <p>
              EventSync brings hosts and class teachers together in one calm
              workspace—so every event gets the right students, right on time.
            </p>
            <div className="hero-actions">
              <Button onClick={() => goLogin("host")}>
                Get started as host <Icon name="arrow" />
              </Button>
              <Button variant="secondary" onClick={() => goLogin("teacher")}>
                Continue as teacher
              </Button>
            </div>
            <div className="hero-proof">
              <div className="avatars">
                <span>AM</span>
                <span>DN</span>
                <span>IR</span>
              </div>
              <p>
                <strong>1,200+ students</strong>
                <br />
                coordinated this semester
              </p>
            </div>
          </div>
          <div className="hero-visual">
            <div className="visual-glow" />
            <div className="mock-window">
              <div className="mock-top">
                <div className="mock-logo">E</div>
                <div className="mock-search" />
                <div className="mock-avatar" />
              </div>
              <div className="mock-body">
                <div className="mock-side">
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
                <div className="mock-content">
                  <span>EVENT OVERVIEW</span>
                  <h3>Bring every campus moment together.</h3>
                  <div className="mock-stats">
                    <b>
                      24<small>Open events</small>
                    </b>
                    <b>
                      86%<small>Slots filled</small>
                    </b>
                  </div>
                  <div className="mock-event">
                    <div className="date-tile">
                      28<small>MAR</small>
                    </div>
                    <p>
                      <strong>Tech Symposium</strong>
                      <small>Main Auditorium · 10:00 AM</small>
                    </p>
                    <Badge tone="open">Open</Badge>
                  </div>
                  <div className="mock-progress">
                    <i />
                  </div>
                </div>
              </div>
            </div>
            <div className="floating-card float-one">
              <div className="success-mark">
                <Icon name="check" size={16} />
              </div>
              <p>
                <strong>Allocation complete</strong>
                <small>8 students confirmed</small>
              </p>
            </div>
            <div className="floating-card float-two">
              <Icon name="users" />
              <p>
                <strong>12 / 20</strong>
                <small>slots filled</small>
              </p>
            </div>
          </div>
        </section>
        <section className="role-section" id="roles">
          <div className="section-heading">
            <span className="eyebrow">One platform, two focused roles</span>
            <h2>Everyone knows what to do next.</h2>
            <p>
              Simple tools for the people who create opportunities and the
              people who connect students to them.
            </p>
          </div>
          <div className="role-cards">
            <article>
              <div className="role-number">01</div>
              <div className="role-icon">
                <Icon name="calendar" size={28} />
              </div>
              <h3>For event hosts</h3>
              <p>
                Publish events, set volunteer needs, monitor every slot, and
                export final allocation lists.
              </p>
              <button onClick={() => goLogin("host")}>
                Explore host tools <Icon name="arrow" size={17} />
              </button>
            </article>
            <article>
              <div className="role-number">02</div>
              <div className="role-icon">
                <Icon name="users" size={28} />
              </div>
              <h3>For class teachers</h3>
              <p>
                Browse opportunities, manage your class roster, and allocate the
                right students in minutes.
              </p>
              <button onClick={() => goLogin("teacher")}>
                Explore teacher tools <Icon name="arrow" size={17} />
              </button>
            </article>
          </div>
        </section>
      </main>
      <footer>
        <Logo />
        <p>Built for better campus coordination.</p>
        <span>© 2025 EventSync</span>
      </footer>
    </div>
  )
}

function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`logo ${dark ? "logo-dark" : ""}`}>
      <span>
        <Icon name="check" size={17} />
      </span>
      <strong>EventSync</strong>
    </div>
  )
}

function Login({
  role,
  setRole,
  onLogin,
  onBack,
}: {
  role: Role
  setRole: (r: Role) => void
  onLogin: () => void
  onBack: () => void
}) {
  return (
    <div className="login-page">
      <section className="login-panel">
        <button className="back-link" onClick={onBack}>
          <Icon name="back" />
          Back to home
        </button>
        <div className="login-form">
          <Logo dark />
          <div>
            <h1>Welcome back</h1>
            <p>Sign in to keep your campus events moving.</p>
          </div>
          <div className="role-switch">
            <button
              className={role === "host" ? "active" : ""}
              onClick={() => setRole("host")}
            >
              <Icon name="calendar" />
              Host
            </button>
            <button
              className={role === "teacher" ? "active" : ""}
              onClick={() => setRole("teacher")}
            >
              <Icon name="users" />
              Teacher
            </button>
          </div>
          <Field
            label="College email"
            type="email"
            placeholder="name@college.edu"
          />
          <Field
            label="Password"
            type="password"
            placeholder="Enter your password"
          />
          <div className="form-row">
            <label className="check-label">
              <input type="checkbox" />
              Remember me
            </label>
            <button className="text-link">Forgot password?</button>
          </div>
          <Button onClick={onLogin}>
            Sign in as {role === "host" ? "Host" : "Teacher"}{" "}
            <Icon name="arrow" />
          </Button>
          <p className="login-help">
            Need access?{" "}
            <button className="text-link">Contact your administrator</button>
          </p>
        </div>
      </section>
      <aside className="login-art">
        <div className="art-grid" />
        <div className="art-content">
          <span className="art-label">EVENTSYNC</span>
          <h2>
            Every event.
            <br />
            Every student.
            <br />
            <em>Perfectly aligned.</em>
          </h2>
          <p>
            A single source of truth for campus opportunities and student
            participation.
          </p>
        </div>
        <div className="orbit orbit-one">
          <span>
            <Icon name="calendar" />
          </span>
        </div>
        <div className="orbit orbit-two">
          <span>
            <Icon name="users" />
          </span>
        </div>
        <div className="art-quote">
          <p>“We filled every volunteer slot two days early.”</p>
          <small>— Student Affairs Office</small>
        </div>
      </aside>
    </div>
  )
}

function Shell({
  role,
  page,
  setPage,
  children,
  onLogout,
}: {
  role: Role
  page: string
  setPage: (p: string) => void
  children: ReactNode
  onLogout: () => void
}) {
  const nav = role === "host" ? hostNav : teacherNav
  const name = role === "host" ? "Priya Sharma" : "Dr. Anjali Menon"
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Logo />
        <div className="workspace">
          <span>
            {role === "host" ? "HOST WORKSPACE" : "TEACHER WORKSPACE"}
          </span>
          <strong>
            {role === "host" ? "Student Affairs" : "III BSc CS — A"}
          </strong>
        </div>
        <nav>
          {nav.map(([id, label, icon]) => (
            <button
              key={id}
              className={page === id ? "active" : ""}
              onClick={() => setPage(id)}
            >
              <Icon name={icon} />
              <span>{label}</span>
              {id === "browse" && <b>8</b>}
            </button>
          ))}
        </nav>
        <div className="side-bottom">
          <button
            className={page === "notifications" ? "active" : ""}
            onClick={() => setPage("notifications")}
          >
            <Icon name="bell" />
            Notifications
            <span className="notice-dot" />
          </button>
          <button
            className={page === "profile" ? "active" : ""}
            onClick={() => setPage("profile")}
          >
            <Icon name="user" />
            My profile
          </button>
          <button onClick={onLogout}>
            <Icon name="logout" />
            Sign out
          </button>
        </div>
      </aside>
      <div className="main-area">
        <header className="topbar">
          <div className="mobile-logo">
            <Logo dark />
          </div>
          <div className="top-search">
            <Icon name="search" />
            <input placeholder="Search events, students..." />
            <kbd>⌘ K</kbd>
          </div>
          <div className="top-actions">
            <button
              className="notification-btn"
              onClick={() => setPage("notifications")}
            >
              <Icon name="bell" />
              <span />
            </button>
            <button className="user-menu" onClick={() => setPage("profile")}>
              <span className="avatar">{role === "host" ? "PS" : "AM"}</span>
              <span>
                <strong>{name}</strong>
                <small>
                  {role === "host" ? "Event Host" : "Class Teacher"}
                </small>
              </span>
              <Icon name="more" />
            </button>
          </div>
        </header>
        <main className="page-content">{children}</main>
      </div>
    </div>
  )
}

function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string
  title: string
  description: string
  children?: ReactNode
}) {
  return (
    <div className="page-header">
      <div>
        {eyebrow && <span>{eyebrow}</span>}
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {children && <div className="page-actions">{children}</div>}
    </div>
  )
}

function HostDashboard({ setPage }: { setPage: (p: string) => void }) {
  return (
    <>
      <PageHeader
        eyebrow="THURSDAY, 20 MARCH"
        title="Good morning, Priya"
        description="Here’s what’s happening with your events today."
      >
        <Button icon="plus" onClick={() => setPage("create")}>
          Create event
        </Button>
      </PageHeader>
      <div className="stats-grid">
        <StatCard
          icon="calendar"
          value="24"
          label="Total events"
          note="+3 this month"
        />
        <StatCard
          icon="clock"
          value="8"
          label="Open events"
          note="142 slots available"
        />
        <StatCard
          icon="users"
          value="184"
          label="Slots filled"
          note="86% fill rate"
        />
        <StatCard
          icon="check"
          value="16"
          label="Completed"
          note="This academic year"
        />
      </div>
      <div className="dashboard-grid">
        <section className="card">
          <div className="card-heading">
            <div>
              <h2>Upcoming events</h2>
              <p>Your next events and allocation progress</p>
            </div>
            <button className="text-link" onClick={() => setPage("events")}>
              View all <Icon name="arrow" size={16} />
            </button>
          </div>
          <div className="upcoming-list">
            {events.map((event) => (
              <div className="upcoming-row" key={event.title}>
                <div className="event-date">
                  <strong>{event.date.split(" ")[0]}</strong>
                  <span>{event.date.split(" ")[1]}</span>
                </div>
                <div className="upcoming-info">
                  <h3>{event.title}</h3>
                  <p>
                    <Icon name="clock" size={15} />
                    {event.time}
                    <i /> <Icon name="location" size={15} />
                    {event.venue}
                  </p>
                </div>
                <div className="upcoming-progress">
                  <Progress value={event.filled} total={event.total} compact />
                </div>
                <Badge tone={event.status === "Open" ? "open" : "pending"}>
                  {event.status}
                </Badge>
                <button className="icon-btn">
                  <Icon name="more" />
                </button>
              </div>
            ))}
          </div>
        </section>
        <aside className="card quick-card">
          <div className="card-heading">
            <div>
              <h2>Quick overview</h2>
              <p>Allocation health</p>
            </div>
          </div>
          <div className="donut">
            <div>
              <strong>86%</strong>
              <span>filled</span>
            </div>
          </div>
          <div className="legend">
            <p>
              <span className="legend-filled" />
              184 filled
            </p>
            <p>
              <span className="legend-open" />
              30 remaining
            </p>
          </div>
          <hr />
          <div className="mini-callout">
            <Icon name="clock" />
            <div>
              <strong>3 deadlines this week</strong>
              <span>Review events nearing registration close.</span>
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}

function TeacherDashboard({ setPage }: { setPage: (p: string) => void }) {
  return (
    <>
      <PageHeader
        eyebrow="THURSDAY, 20 MARCH"
        title="Good morning, Dr. Anjali"
        description="Your class and event allocations at a glance."
      >
        <Button onClick={() => setPage("browse")}>
          Browse open events <Icon name="arrow" />
        </Button>
      </PageHeader>
      <div className="stats-grid">
        <StatCard
          icon="users"
          value="42"
          label="Students in my class"
          note="III BSc CS — A"
        />
        <StatCard
          icon="calendar"
          value="8"
          label="Open events"
          note="142 slots available"
        />
        <StatCard
          icon="check"
          value="26"
          label="My allocations"
          note="Across 6 events"
        />
        <StatCard
          icon="clock"
          value="3"
          label="Upcoming events"
          note="Next 14 days"
        />
      </div>
      <div className="dashboard-grid teacher-dash">
        <section>
          <div className="section-row">
            <div>
              <h2>Events needing students</h2>
              <p>Open opportunities for your class</p>
            </div>
            <button className="text-link" onClick={() => setPage("browse")}>
              Browse all <Icon name="arrow" size={16} />
            </button>
          </div>
          <div className="compact-event-grid">
            {events.slice(0, 2).map((e) => (
              <EventCard
                key={e.title}
                event={e}
                onAllocate={() => setPage("allocate")}
              />
            ))}
          </div>
        </section>
        <aside className="card activity-card">
          <div className="card-heading">
            <div>
              <h2>Recent activity</h2>
              <p>Latest from your allocations</p>
            </div>
          </div>
          <div className="timeline">
            {[
              ["check", "8 students confirmed", "Tech Symposium · 2h ago"],
              [
                "calendar",
                "Event date updated",
                "Annual Sports Meet · Yesterday",
              ],
              ["users", "Allocation submitted", "Cultural Fest · 2 days ago"],
            ].map((a) => (
              <div key={a[1]}>
                <span>
                  <Icon name={a[0]} size={17} />
                </span>
                <p>
                  <strong>{a[1]}</strong>
                  <small>{a[2]}</small>
                </p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </>
  )
}

function CreateEvent({ done }: { done: () => void }) {
  const [toast, setToast] = useState(false)
  return (
    <>
      <PageHeader
        title="Create a new event"
        description="Share the details teachers need to allocate the right students."
      />
      <div className="form-layout">
        <form
          className="card event-form"
          onSubmit={(e) => {
            e.preventDefault()
            setToast(true)
            setTimeout(done, 900)
          }}
        >
          <div className="form-section">
            <div className="form-section-title">
              <span>01</span>
              <div>
                <h2>Event details</h2>
                <p>Give your event a clear name and description.</p>
              </div>
            </div>
            <Field
              label="Event title"
              placeholder="e.g. Inter-College Tech Symposium"
            />
            <label className="field">
              <span>Description</span>
              <textarea
                placeholder="Describe the event, student responsibilities, and any requirements..."
                rows={5}
              />
              <small className="char-count">0 / 500</small>
            </label>
          </div>
          <div className="form-section">
            <div className="form-section-title">
              <span>02</span>
              <div>
                <h2>Schedule & venue</h2>
                <p>Set when and where the event takes place.</p>
              </div>
            </div>
            <div className="form-grid">
              <Field label="Event date" type="date" />
              <Field label="Start time" type="time" />
              <Field label="Venue" placeholder="e.g. Main Auditorium" />
              <Field label="Registration deadline" type="date" />
            </div>
          </div>
          <div className="form-section">
            <div className="form-section-title">
              <span>03</span>
              <div>
                <h2>Student requirements</h2>
                <p>Tell teachers who and how many students you need.</p>
              </div>
            </div>
            <div className="form-grid">
              <Field
                label="Number of students needed"
                type="number"
                placeholder="20"
              />
              <SelectField
                label="Role type"
                options={["Volunteer", "Participant"]}
              />
            </div>
          </div>
          <div className="form-footer">
            <Button variant="secondary" onClick={() => setToast(true)}>
              Save draft
            </Button>
            <Button type="submit">
              Publish event <Icon name="arrow" />
            </Button>
          </div>
        </form>
        <aside className="card tips-card">
          <div className="tips-icon">
            <Icon name="check" />
          </div>
          <h3>Tips for faster allocations</h3>
          <ul>
            <li>Use a specific, recognizable event title.</li>
            <li>Clearly describe what students will do.</li>
            <li>Set the deadline at least 3 days early.</li>
            <li>Double-check the venue and start time.</li>
          </ul>
        </aside>
      </div>
      {toast && (
        <div className="toast">
          <span>
            <Icon name="check" />
          </span>
          <div>
            <strong>Event saved successfully</strong>
            <small>Your changes are now up to date.</small>
          </div>
        </div>
      )}
    </>
  )
}

function MyEvents({ setPage }: { setPage: (p: string) => void }) {
  const [modal, setModal] = useState(false)
  const rows = [
    ...events,
    {
      title: "Community Clean-up Drive",
      date: "08 Mar 2025",
      time: "7:00 AM",
      venue: "City Park",
      type: "Volunteer",
      filled: 25,
      total: 25,
      status: "Completed",
    },
  ]
  return (
    <>
      <PageHeader
        title="My events"
        description="Manage every event you’ve created in one place."
      >
        <Button icon="plus" onClick={() => setPage("create")}>
          Create event
        </Button>
      </PageHeader>
      <div className="toolbar">
        <div className="search-box">
          <Icon name="search" />
          <input placeholder="Search events..." />
        </div>
        <Button variant="secondary" icon="filter">
          All statuses
        </Button>
        <SelectField label="" options={["Newest first", "Oldest first"]} />
      </div>
      <div className="card table-card">
        <table>
          <thead>
            <tr>
              <th>Event</th>
              <th>Date & venue</th>
              <th>Role</th>
              <th>Allocation</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((e) => (
              <tr key={e.title} onClick={() => setPage("allocations")}>
                <td>
                  <strong>{e.title}</strong>
                  <span>Created 12 Mar 2025</span>
                </td>
                <td>
                  <strong>{e.date}</strong>
                  <span>{e.venue}</span>
                </td>
                <td>
                  <span className="type-pill">{e.type}</span>
                </td>
                <td>
                  <Progress value={e.filled} total={e.total} compact />
                </td>
                <td>
                  <Badge
                    tone={
                      e.status === "Open" || e.status === "Completed"
                        ? "open"
                        : "pending"
                    }
                  >
                    {e.status}
                  </Badge>
                </td>
                <td>
                  <div className="row-actions">
                    <button className="icon-btn" title="Edit">
                      <Icon name="edit" size={18} />
                    </button>
                    <button
                      className="icon-btn danger"
                      title="Cancel"
                      onClick={(ev) => {
                        ev.stopPropagation()
                        setModal(true)
                      }}
                    >
                      <Icon name="close" size={18} />
                    </button>
                    <button className="icon-btn">
                      <Icon name="more" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <Modal
          title="Cancel this event?"
          action="Cancel event"
          destructive
          onClose={() => setModal(false)}
        >
          <p>
            This will notify all teachers with allocated students. This action
            cannot be undone.
          </p>
        </Modal>
      )}
    </>
  )
}

function EventAllocation() {
  return (
    <>
      <PageHeader
        eyebrow="EVENT DETAILS"
        title="Inter-College Tech Symposium"
        description="Published 12 March 2025"
      >
        <Button variant="secondary" icon="edit">
          Edit event
        </Button>
        <Button icon="download">Export list</Button>
      </PageHeader>
      <div className="detail-strip card">
        <div>
          <span>DATE & TIME</span>
          <strong>28 Mar 2025 · 10:00 AM</strong>
        </div>
        <div>
          <span>VENUE</span>
          <strong>Main Auditorium</strong>
        </div>
        <div>
          <span>ROLE TYPE</span>
          <strong>Volunteer</strong>
        </div>
        <div>
          <span>STATUS</span>
          <Badge tone="open">Open</Badge>
        </div>
        <div className="detail-progress">
          <Progress value={12} total={20} />
        </div>
      </div>
      <div className="section-row allocation-title">
        <div>
          <h2>Allocated students</h2>
          <p>12 students from 3 classes, allocated by 3 teachers</p>
        </div>
        <div className="search-box">
          <Icon name="search" />
          <input placeholder="Search students..." />
        </div>
      </div>
      <div className="card table-card">
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Roll number</th>
              <th>Department</th>
              <th>Class</th>
              <th>Allocated by</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => (
              <tr key={s.roll}>
                <td>
                  <div className="student-cell">
                    <span className="mini-avatar">
                      {s.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                    <strong>{s.name}</strong>
                  </div>
                </td>
                <td>{s.roll}</td>
                <td>{s.dept}</td>
                <td>III BSc CS — A</td>
                <td>Dr. Anjali Menon</td>
                <td>
                  <span className="type-pill">
                    {i > 2 ? "Participant" : "Volunteer"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

function StudentManagement() {
  const [modal, setModal] = useState<"upload" | "delete" | null>(null)
  return (
    <>
      <PageHeader
        title="My class"
        description="III BSc Computer Science — Section A · 42 students"
      >
        <Button
          variant="secondary"
          icon="upload"
          onClick={() => setModal("upload")}
        >
          Bulk upload
        </Button>
        <Button icon="plus">Add student</Button>
      </PageHeader>
      <div className="toolbar">
        <div className="search-box">
          <Icon name="search" />
          <input placeholder="Search by name or roll number..." />
        </div>
        <Button variant="secondary" icon="filter">
          All students
        </Button>
        <span className="table-count">42 students</span>
      </div>
      <div className="card table-card">
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Roll number</th>
              <th>Department</th>
              <th>Contact</th>
              <th>Events joined</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => (
              <tr key={s.roll}>
                <td>
                  <div className="student-cell">
                    <span className="mini-avatar">
                      {s.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                    <strong>{s.name}</strong>
                  </div>
                </td>
                <td>{s.roll}</td>
                <td>{s.dept}</td>
                <td>{s.contact}</td>
                <td>{i + 1} events</td>
                <td>
                  <div className="row-actions">
                    <button className="icon-btn">
                      <Icon name="edit" size={18} />
                    </button>
                    <button
                      className="icon-btn danger"
                      onClick={() => setModal("delete")}
                    >
                      <Icon name="trash" size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal === "upload" && (
        <Modal
          title="Bulk upload students"
          action="Upload file"
          onClose={() => setModal(null)}
        >
          <p>
            Upload a CSV or Excel file with student name, roll number,
            department, and contact number.
          </p>
          <div className="drop-zone">
            <Icon name="upload" size={28} />
            <strong>Drop your file here</strong>
            <span>or click to browse · CSV, XLSX up to 5 MB</span>
          </div>
        </Modal>
      )}
      {modal === "delete" && (
        <Modal
          title="Delete this student?"
          action="Delete student"
          destructive
          onClose={() => setModal(null)}
        >
          <p>
            The student will be removed from your class list. Existing event
            allocations won’t be affected.
          </p>
        </Modal>
      )}
    </>
  )
}

function BrowseEvents({ setPage }: { setPage: (p: string) => void }) {
  return (
    <>
      <PageHeader
        title="Browse events"
        description="Find open opportunities and allocate students from your class."
      />
      <div className="toolbar">
        <div className="search-box">
          <Icon name="search" />
          <input placeholder="Search by event, venue..." />
        </div>
        <Button variant="secondary" icon="filter">
          Role type
        </Button>
        <Button variant="secondary" icon="calendar">
          Date
        </Button>
        <span className="table-count">8 open events</span>
      </div>
      <div className="event-grid">
        {[
          ...events,
          {
            ...events[0],
            title: "College Literary Conclave",
            date: "18 Apr 2025",
            venue: "Seminar Hall",
          },
        ].map((e) => (
          <EventCard
            key={e.title}
            event={e}
            onAllocate={() => setPage("allocate")}
          />
        ))}
      </div>
    </>
  )
}

function AllocateStudents({ done }: { done: () => void }) {
  const [selected, setSelected] = useState<string[]>(["22CS001", "22CS007"])
  const [toast, setToast] = useState(false)
  const remaining = 8
  const toggle = (roll: string) =>
    setSelected((s) =>
      s.includes(roll) ? s.filter((x) => x !== roll) : [...s, roll],
    )
  return (
    <>
      <PageHeader
        title="Allocate students"
        description="Select students from your class for this event."
      />
      <div className="allocate-layout">
        <aside className="card allocation-event">
          <span className="eyebrow">SELECTED EVENT</span>
          <div className="event-date large">
            <strong>28</strong>
            <span>MAR</span>
          </div>
          <h2>Inter-College Tech Symposium</h2>
          <div className="event-meta">
            <span>
              <Icon name="clock" />
              10:00 AM — 4:00 PM
            </span>
            <span>
              <Icon name="location" />
              Main Auditorium
            </span>
            <span>
              <Icon name="users" />
              Volunteer role
            </span>
          </div>
          <hr />
          <Progress value={12 + selected.length} total={20} />
          <div className="slot-counter">
            <span>Slots remaining after allocation</span>
            <strong>{remaining - selected.length}</strong>
          </div>
          <div className="info-note">
            <Icon name="check" />
            <p>Students will receive a confirmation after you submit.</p>
          </div>
        </aside>
        <section className="card student-select">
          <div className="select-heading">
            <div>
              <h2>Select students</h2>
              <p>III BSc CS — A · {selected.length} selected</p>
            </div>
            <SelectField
              label="Assign role"
              options={["Volunteer", "Participant"]}
            />
          </div>
          <div className="toolbar select-tools">
            <div className="search-box">
              <Icon name="search" />
              <input placeholder="Search students..." />
            </div>
            <label className="check-label">
              <input
                type="checkbox"
                checked={selected.length === students.length}
                onChange={() =>
                  setSelected(
                    selected.length === students.length
                      ? []
                      : students.map((s) => s.roll),
                  )
                }
              />
              Select all
            </label>
          </div>
          <div className="student-options">
            {students.map((s) => (
              <label
                className={`student-option ${
                  selected.includes(s.roll) ? "selected" : ""
                }`}
                key={s.roll}
              >
                <input
                  type="checkbox"
                  checked={selected.includes(s.roll)}
                  onChange={() => toggle(s.roll)}
                />
                <span className="mini-avatar">
                  {s.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <span>
                  <strong>{s.name}</strong>
                  <small>
                    {s.roll} · {s.dept}
                  </small>
                </span>
                <Badge tone="neutral">Available</Badge>
              </label>
            ))}
          </div>
          {selected.length > remaining && (
            <div className="warning">
              <strong>Too many students selected</strong>
              <span>
                Remove {selected.length - remaining} student(s) to fit the
                remaining slots.
              </span>
            </div>
          )}
          <div className="confirm-bar">
            <p>
              <strong>{selected.length} students selected</strong>
              <span>{remaining - selected.length} slots will remain</span>
            </p>
            <Button
              disabled={!selected.length || selected.length > remaining}
              onClick={() => {
                setToast(true)
                setTimeout(done, 1000)
              }}
            >
              Confirm allocation
            </Button>
          </div>
        </section>
      </div>
      {toast && (
        <div className="toast">
          <span>
            <Icon name="check" />
          </span>
          <div>
            <strong>Allocation confirmed</strong>
            <small>
              {selected.length} students have been added to the event.
            </small>
          </div>
        </div>
      )}
    </>
  )
}

function MyAllocations() {
  const [modal, setModal] = useState(false)
  return (
    <>
      <PageHeader
        title="My allocations"
        description="Review and manage students you’ve assigned to events."
      />
      <div className="toolbar">
        <div className="search-box">
          <Icon name="search" />
          <input placeholder="Search events..." />
        </div>
        <Button variant="secondary" icon="filter">
          All statuses
        </Button>
      </div>
      <div className="card table-card">
        <table>
          <thead>
            <tr>
              <th>Event</th>
              <th>Event date</th>
              <th>Students allocated</th>
              <th>Role</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {events.map((e, i) => (
              <tr key={e.title}>
                <td>
                  <strong>{e.title}</strong>
                  <span>{e.venue}</span>
                </td>
                <td>
                  <strong>{e.date}</strong>
                  <span>{e.time}</span>
                </td>
                <td>
                  <div className="student-stack">
                    <span>AM</span>
                    <span>DN</span>
                    <span>IR</span>
                    <strong>+{i + 2}</strong>
                  </div>
                </td>
                <td>
                  <span className="type-pill">{e.type}</span>
                </td>
                <td>
                  <Badge tone={i === 1 ? "pending" : "open"}>
                    {i === 1 ? "Pending" : "Confirmed"}
                  </Badge>
                </td>
                <td>
                  <div className="row-actions">
                    <Button variant="ghost">Modify</Button>
                    <button
                      className="text-danger"
                      onClick={() => setModal(true)}
                    >
                      Withdraw
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <Modal
          title="Withdraw allocation?"
          action="Withdraw students"
          destructive
          onClose={() => setModal(false)}
        >
          <p>
            The selected students will be removed from this event and the host
            will be notified.
          </p>
        </Modal>
      )}
    </>
  )
}

function Notifications() {
  const alerts = [
    [
      "calendar",
      "New event needs volunteers",
      "Inter-College Tech Symposium needs 20 volunteers.",
      "10 min ago",
      true,
    ],
    [
      "check",
      "All slots have been filled",
      "Annual Sports Meet has reached its allocation target.",
      "2 hours ago",
      true,
    ],
    [
      "clock",
      "Event time was updated",
      "Cultural Fest now begins at 4:00 PM on 12 April.",
      "Yesterday",
      false,
    ],
    [
      "close",
      "Event cancelled",
      "The Community Outreach Workshop has been cancelled.",
      "2 days ago",
      false,
    ],
    [
      "bell",
      "Reminder: registration closes soon",
      "Tech Symposium registration closes in 2 days.",
      "3 days ago",
      false,
    ],
  ]
  return (
    <>
      <PageHeader
        title="Notifications"
        description="Updates about events, allocations, and reminders."
      >
        <Button variant="secondary">Mark all as read</Button>
      </PageHeader>
      <div className="notification-tabs">
        <button className="active">
          All <span>5</span>
        </button>
        <button>
          Unread <span>2</span>
        </button>
      </div>
      <div className="card notification-list">
        {alerts.map((a) => (
          <article className={a[4] ? "unread" : ""} key={a[1] as string}>
            <div className="notification-icon">
              <Icon name={a[0] as string} />
            </div>
            <div>
              <h3>{a[1] as string}</h3>
              <p>{a[2] as string}</p>
              <small>{a[3] as string}</small>
            </div>
            {a[4] && <span className="unread-dot" />}
            <button className="icon-btn">
              <Icon name="more" />
            </button>
          </article>
        ))}
      </div>
    </>
  )
}

function Profile({ role }: { role: Role }) {
  const [saved, setSaved] = useState(false)
  return (
    <>
      <PageHeader
        title="My profile"
        description="Manage your personal information and preferences."
      />
      <div className="profile-layout">
        <aside className="card profile-card">
          <div className="profile-avatar">
            {role === "host" ? "PS" : "AM"}
            <button>
              <Icon name="edit" size={15} />
            </button>
          </div>
          <h2>{role === "host" ? "Priya Sharma" : "Dr. Anjali Menon"}</h2>
          <p>
            {role === "host"
              ? "Event Host · Student Affairs"
              : "Class Teacher · Computer Science"}
          </p>
          <hr />
          <div className="profile-stat">
            <strong>{role === "host" ? "24" : "42"}</strong>
            <span>
              {role === "host" ? "Events hosted" : "Students in class"}
            </span>
          </div>
          <div className="profile-stat">
            <strong>{role === "host" ? "184" : "26"}</strong>
            <span>
              {role === "host" ? "Students engaged" : "Event allocations"}
            </span>
          </div>
        </aside>
        <div className="profile-main">
          <section className="card profile-form">
            <div className="card-heading">
              <div>
                <h2>Personal information</h2>
                <p>Update your contact and role details.</p>
              </div>
            </div>
            <div className="form-grid">
              <Field
                label="Full name"
                defaultValue={
                  role === "host" ? "Priya Sharma" : "Dr. Anjali Menon"
                }
              />
              <Field
                label="Email address"
                type="email"
                defaultValue={
                  role === "host"
                    ? "priya.sharma@college.edu"
                    : "anjali.menon@college.edu"
                }
              />
              <Field label="Phone number" defaultValue="+91 98765 43210" />
              <Field
                label={role === "host" ? "Position" : "Department"}
                defaultValue={
                  role === "host"
                    ? "Student Affairs Coordinator"
                    : "Computer Science"
                }
              />
              <Field
                label={role === "host" ? "Department / club" : "Class handled"}
                defaultValue={
                  role === "host" ? "Student Affairs" : "III BSc CS — A"
                }
              />
              {role === "teacher" && (
                <Field label="Total students" defaultValue="42" />
              )}
            </div>
            <div className="form-footer">
              <Button onClick={() => setSaved(true)}>Save changes</Button>
            </div>
          </section>
          <section className="card preferences">
            <div className="card-heading">
              <div>
                <h2>Notification preferences</h2>
                <p>Choose the updates you want to receive.</p>
              </div>
            </div>
            {[
              ["Event updates", "Changes, cancellations, and reminders"],
              ["Allocation activity", "New or modified student allocations"],
              ["Email digest", "A weekly summary every Monday"],
            ].map((p, i) => (
              <label key={p[0]}>
                <span>
                  <strong>{p[0]}</strong>
                  <small>{p[1]}</small>
                </span>
                <input type="checkbox" defaultChecked={i < 2} />
              </label>
            ))}
          </section>
          <section className="card password-row">
            <div>
              <h2>Password</h2>
              <p>Last changed 3 months ago</p>
            </div>
            <Button variant="secondary">Change password</Button>
          </section>
        </div>
      </div>
      {saved && (
        <div className="toast">
          <span>
            <Icon name="check" />
          </span>
          <div>
            <strong>Profile updated</strong>
            <small>Your changes were saved successfully.</small>
          </div>
          <button onClick={() => setSaved(false)}>
            <Icon name="close" />
          </button>
        </div>
      )}
    </>
  )
}

export default function App() {
  const [view, setView] = useState<"landing" | "login" | "app">("landing")
  const [role, setRole] = useState<Role>("host")
  const [page, setPage] = useState("dashboard")
  const loginAs = (r: Role) => {
    setRole(r)
    setView("login")
  }
  const current = useMemo(() => {
    if (page === "notifications") return <Notifications />
    if (page === "profile") return <Profile role={role} />
    if (role === "host") {
      if (page === "create")
        return <CreateEvent done={() => setPage("events")} />
      if (page === "events") return <MyEvents setPage={setPage} />
      if (page === "allocations") return <EventAllocation />
      return <HostDashboard setPage={setPage} />
    }
    if (page === "class") return <StudentManagement />
    if (page === "browse") return <BrowseEvents setPage={setPage} />
    if (page === "allocate")
      return <AllocateStudents done={() => setPage("my-allocations")} />
    if (page === "my-allocations") return <MyAllocations />
    return <TeacherDashboard setPage={setPage} />
  }, [page, role])
  if (view === "landing") return <Landing goLogin={loginAs} />
  if (view === "login")
    return (
      <Login
        role={role}
        setRole={setRole}
        onBack={() => setView("landing")}
        onLogin={() => {
          setPage("dashboard")
          setView("app")
        }}
      />
    )
  return (
    <Shell
      role={role}
      page={page}
      setPage={setPage}
      onLogout={() => setView("landing")}
    >
      {current}
    </Shell>
  )
}
