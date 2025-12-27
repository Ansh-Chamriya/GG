// GearGuard Landing Page
// Intelligent Maintenance Management System

import {
  Settings,
  Users,
  ClipboardList,
  Kanban,
  Calendar,
  Zap,
  AlertTriangle,
  Eye,
  Timer,
  MessageSquare,
  ChevronRight,
  Check,
  BarChart3,
  Wrench,
  Shield,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

// ============ ICON COMPONENTS ============
function IconWrapper({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-xl bg-primary-50 p-3 ${className}`}
      style={{ backgroundColor: "var(--primary-50)" }}
    >
      {children}
    </div>
  );
}

// ============ HEADER COMPONENT ============
function Header() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)",
            }}
          >
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span
            className="font-semibold text-lg"
            style={{ color: "var(--foreground)" }}
          >
            GearGuard
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-sm font-medium transition-colors hover:text-primary"
            style={{ color: "var(--foreground-muted)" }}
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium transition-colors hover:text-primary"
            style={{ color: "var(--foreground-muted)" }}
          >
            How It Works
          </a>
          <a
            href="#analytics"
            className="text-sm font-medium transition-colors hover:text-primary"
            style={{ color: "var(--foreground-muted)" }}
          >
            Analytics
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/auth/login"
            className="hidden sm:inline-flex btn btn-ghost text-sm font-medium"
          >
            Log in
          </Link>
          <Link
            href="/auth/sign-up"
            className="btn btn-primary text-sm font-medium"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

// ============ HERO SECTION ============
function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-6 gradient-bg">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="animate-fade-in">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-6"
              style={{
                backgroundColor: "var(--primary-50)",
                color: "var(--primary)",
              }}
            >
              <Zap className="w-4 h-4" />
              Intelligent Maintenance Management
            </div>
            <h1
              className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-tight mb-6"
              style={{ color: "var(--foreground)" }}
            >
              Track, Maintain, and Protect Every Asset —{" "}
              <span className="gradient-text">Effortlessly.</span>
            </h1>
            <p
              className="text-lg mb-8 max-w-xl"
              style={{ color: "var(--foreground-muted)" }}
            >
              A smart maintenance management system that connects equipment,
              teams, and repair workflows in one place.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/auth/sign-up"
                className="btn btn-primary px-6 py-3 rounded-xl font-medium flex items-center gap-2 animate-pulse-glow"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#features"
                className="btn btn-secondary px-6 py-3 rounded-xl font-medium flex items-center gap-2"
              >
                How It Works
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div
              className="flex items-center gap-6 mt-10 pt-8"
              style={{ borderTop: "1px solid var(--border-light)" }}
            >
              <div className="text-center">
                <div
                  className="text-2xl font-bold"
                  style={{ color: "var(--foreground)" }}
                >
                  10k+
                </div>
                <div
                  className="text-sm"
                  style={{ color: "var(--foreground-muted)" }}
                >
                  Assets Tracked
                </div>
              </div>
              <div
                className="w-px h-10"
                style={{ backgroundColor: "var(--border)" }}
              ></div>
              <div className="text-center">
                <div
                  className="text-2xl font-bold"
                  style={{ color: "var(--foreground)" }}
                >
                  98%
                </div>
                <div
                  className="text-sm"
                  style={{ color: "var(--foreground-muted)" }}
                >
                  Uptime
                </div>
              </div>
              <div
                className="w-px h-10"
                style={{ backgroundColor: "var(--border)" }}
              ></div>
              <div className="text-center">
                <div
                  className="text-2xl font-bold"
                  style={{ color: "var(--foreground)" }}
                >
                  500+
                </div>
                <div
                  className="text-sm"
                  style={{ color: "var(--foreground-muted)" }}
                >
                  Teams
                </div>
              </div>
            </div>
          </div>

          {/* Right - Dashboard Mockup */}
          <div className="animate-float">
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ DASHBOARD MOCKUP ============
function DashboardMockup() {
  return (
    <div
      className="rounded-2xl mockup-shadow overflow-hidden bg-white"
      style={{ border: "1px solid var(--border)" }}
    >
      {/* Browser Bar */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{
          backgroundColor: "var(--background-secondary)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
        <div className="flex-1 ml-4">
          <div
            className="max-w-xs rounded-md px-3 py-1 text-xs"
            style={{
              backgroundColor: "var(--background)",
              color: "var(--foreground-muted)",
            }}
          >
            app.gearguard.io/dashboard
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="p-4 flex gap-4">
        {/* Kanban Board */}
        <div className="flex-1">
          <div
            className="text-xs font-medium mb-3"
            style={{ color: "var(--foreground-muted)" }}
          >
            Maintenance Requests
          </div>
          <div className="flex gap-3">
            {/* New Column */}
            <div
              className="flex-1 rounded-xl p-2"
              style={{ backgroundColor: "var(--background-secondary)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <span
                  className="text-xs font-medium"
                  style={{ color: "var(--foreground)" }}
                >
                  New
                </span>
                <span
                  className="text-xs px-1.5 py-0.5 rounded-md"
                  style={{
                    backgroundColor: "var(--border)",
                    color: "var(--foreground-muted)",
                  }}
                >
                  3
                </span>
              </div>
              <KanbanCard
                title="HVAC Unit #12"
                priority="high"
                team="Mechanics"
              />
              <KanbanCard title="Server Rack A" priority="medium" team="IT" />
            </div>
            {/* In Progress Column */}
            <div
              className="flex-1 rounded-xl p-2"
              style={{ backgroundColor: "var(--background-secondary)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                <span
                  className="text-xs font-medium"
                  style={{ color: "var(--foreground)" }}
                >
                  In Progress
                </span>
                <span
                  className="text-xs px-1.5 py-0.5 rounded-md"
                  style={{
                    backgroundColor: "var(--border)",
                    color: "var(--foreground-muted)",
                  }}
                >
                  2
                </span>
              </div>
              <KanbanCard
                title="Conveyor Belt"
                priority="high"
                team="Mechanics"
                hasAvatar
              />
            </div>
            {/* Repaired Column */}
            <div
              className="flex-1 rounded-xl p-2"
              style={{ backgroundColor: "var(--background-secondary)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span
                  className="text-xs font-medium"
                  style={{ color: "var(--foreground)" }}
                >
                  Repaired
                </span>
                <span
                  className="text-xs px-1.5 py-0.5 rounded-md"
                  style={{
                    backgroundColor: "var(--border)",
                    color: "var(--foreground-muted)",
                  }}
                >
                  5
                </span>
              </div>
              <KanbanCard
                title="Generator #3"
                priority="low"
                team="Electricians"
                completed
              />
            </div>
          </div>
        </div>

        {/* Mini Calendar */}
        <div className="w-36">
          <div
            className="text-xs font-medium mb-3"
            style={{ color: "var(--foreground-muted)" }}
          >
            Schedule
          </div>
          <div
            className="rounded-xl p-3"
            style={{ backgroundColor: "var(--background-secondary)" }}
          >
            <div
              className="text-xs font-medium mb-2"
              style={{ color: "var(--foreground)" }}
            >
              December 2024
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                <div
                  key={i}
                  className="text-[8px] font-medium"
                  style={{ color: "var(--foreground-subtle)" }}
                >
                  {day}
                </div>
              ))}
              {[...Array(31)].map((_, i) => (
                <div
                  key={i}
                  className={`text-[9px] py-0.5 rounded ${i === 26 ? "text-white" : ""
                    } ${[4, 11, 18].includes(i) ? "font-bold" : ""}`}
                  style={{
                    backgroundColor:
                      i === 26 ? "var(--primary)" : "transparent",
                    color:
                      i === 26
                        ? "white"
                        : [4, 11, 18].includes(i)
                          ? "var(--primary)"
                          : "var(--foreground-muted)",
                  }}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KanbanCard({
  title,
  priority,
  team,
  hasAvatar = false,
  completed = false,
}: {
  title: string;
  priority: "high" | "medium" | "low";
  team: string;
  hasAvatar?: boolean;
  completed?: boolean;
}) {
  const priorityColors = {
    high: "bg-red-100 text-red-600",
    medium: "bg-yellow-100 text-yellow-600",
    low: "bg-green-100 text-green-600",
  };

  return (
    <div
      className={`rounded-lg p-2 mb-2 bg-white shadow-sm ${completed ? "opacity-60" : ""
        }`}
      style={{ border: "1px solid var(--border-light)" }}
    >
      <div
        className="text-[10px] font-medium mb-1"
        style={{ color: "var(--foreground)" }}
      >
        {title}
      </div>
      <div className="flex items-center justify-between">
        <span
          className={`text-[8px] px-1.5 py-0.5 rounded ${priorityColors[priority]}`}
        >
          {priority}
        </span>
        {hasAvatar && (
          <div
            className="w-4 h-4 rounded-full"
            style={{
              backgroundColor: "var(--primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span className="text-[7px] text-white font-medium">JD</span>
          </div>
        )}
        {completed && <Check className="w-3 h-3 text-green-500" />}
      </div>
    </div>
  );
}

// ============ PROBLEMS SECTION ============
function ProblemsSection() {
  const problems = [
    {
      icon: (
        <MessageSquare
          className="w-5 h-5"
          style={{ color: "var(--primary)" }}
        />
      ),
      title: "Lost Requests",
      desc: "Maintenance requests get lost in emails and spreadsheets",
    },
    {
      icon: <Eye className="w-5 h-5" style={{ color: "var(--primary)" }} />,
      title: "No Visibility",
      desc: "No real-time insight into asset health and history",
    },
    {
      icon: (
        <AlertTriangle
          className="w-5 h-5"
          style={{ color: "var(--primary)" }}
        />
      ),
      title: "Unplanned Downtime",
      desc: "Reactive fixes instead of preventive maintenance",
    },
    {
      icon: <Users className="w-5 h-5" style={{ color: "var(--primary)" }} />,
      title: "Poor Coordination",
      desc: "Teams struggle with task assignment and updates",
    },
  ];

  return (
    <section
      className="py-20 px-6"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="text-3xl font-bold mb-4"
            style={{ color: "var(--foreground)" }}
          >
            Sound Familiar?
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--foreground-muted)" }}
          >
            Traditional maintenance processes create chaos. Here&apos;s what
            you&apos;re likely dealing with.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="card-hover rounded-2xl p-6 text-center"
              style={{
                backgroundColor: "var(--background-secondary)",
                border: "1px solid var(--border-light)",
              }}
            >
              <IconWrapper className="mx-auto mb-4">{problem.icon}</IconWrapper>
              <h3
                className="font-semibold mb-2"
                style={{ color: "var(--foreground)" }}
              >
                {problem.title}
              </h3>
              <p
                className="text-sm"
                style={{ color: "var(--foreground-muted)" }}
              >
                {problem.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ SOLUTION SECTION ============
function SolutionSection() {
  return (
    <section
      className="py-20 px-6"
      style={{ backgroundColor: "var(--background-secondary)" }}
    >
      <div className="max-w-7xl mx-auto text-center">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-6"
          style={{
            backgroundColor: "var(--primary-100)",
            color: "var(--primary-dark)",
          }}
        >
          <Shield className="w-4 h-4" />
          The Solution
        </div>
        <h2
          className="text-3xl md:text-4xl font-bold mb-6"
          style={{ color: "var(--foreground)" }}
        >
          One Platform. Complete Maintenance Control.
        </h2>
        <p
          className="text-lg max-w-3xl mx-auto mb-12"
          style={{ color: "var(--foreground-muted)" }}
        >
          GearGuard seamlessly connects{" "}
          <strong style={{ color: "var(--primary)" }}>Equipment</strong>,{" "}
          <strong style={{ color: "var(--primary)" }}>Teams</strong>, and{" "}
          <strong style={{ color: "var(--primary)" }}>Requests</strong> — giving
          you complete visibility and control over your maintenance operations.
        </p>

        {/* Connection Diagram */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
          <div className="flex flex-col items-center">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center mb-3"
              style={{ backgroundColor: "var(--primary-100)" }}
            >
              <Settings
                className="w-10 h-10"
                style={{ color: "var(--primary)" }}
              />
            </div>
            <span
              className="font-medium"
              style={{ color: "var(--foreground)" }}
            >
              Equipment
            </span>
          </div>
          <div className="hidden md:block">
            <ChevronRight
              className="w-8 h-8"
              style={{ color: "var(--primary-light)" }}
            />
          </div>
          <div className="flex flex-col items-center">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center mb-3"
              style={{ backgroundColor: "var(--primary-100)" }}
            >
              <Users
                className="w-10 h-10"
                style={{ color: "var(--primary)" }}
              />
            </div>
            <span
              className="font-medium"
              style={{ color: "var(--foreground)" }}
            >
              Teams
            </span>
          </div>
          <div className="hidden md:block">
            <ChevronRight
              className="w-8 h-8"
              style={{ color: "var(--primary-light)" }}
            />
          </div>
          <div className="flex flex-col items-center">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center mb-3"
              style={{ backgroundColor: "var(--primary-100)" }}
            >
              <ClipboardList
                className="w-10 h-10"
                style={{ color: "var(--primary)" }}
              />
            </div>
            <span
              className="font-medium"
              style={{ color: "var(--foreground)" }}
            >
              Requests
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ FEATURES SECTION ============
function FeaturesSection() {
  const features = [
    {
      icon: (
        <Settings className="w-6 h-6" style={{ color: "var(--primary)" }} />
      ),
      title: "Equipment Management",
      points: [
        "Central asset database",
        "Track by department or employee",
        "Warranty, location & ownership details",
      ],
    },
    {
      icon: <Users className="w-6 h-6" style={{ color: "var(--primary)" }} />,
      title: "Maintenance Teams",
      points: [
        "Specialized teams (Mechanics, Electricians, IT)",
        "Automatic assignment based on equipment",
        "Only relevant technicians see requests",
      ],
    },
    {
      icon: (
        <ClipboardList
          className="w-6 h-6"
          style={{ color: "var(--primary)" }}
        />
      ),
      title: "Maintenance Requests",
      points: [
        "Corrective & Preventive maintenance",
        "Auto-filled team & equipment data",
        "Status flow: New → In Progress → Repaired → Scrap",
      ],
    },
    {
      icon: <Kanban className="w-6 h-6" style={{ color: "var(--primary)" }} />,
      title: "Kanban Workflow",
      points: [
        "Drag & drop task cards",
        "Technician avatars",
        "Overdue visual indicators",
      ],
    },
    {
      icon: (
        <Calendar className="w-6 h-6" style={{ color: "var(--primary)" }} />
      ),
      title: "Calendar View",
      points: [
        "Preventive maintenance scheduling",
        "Click-to-add maintenance jobs",
        "Clear daily workload visibility",
      ],
    },
    {
      icon: <Zap className="w-6 h-6" style={{ color: "var(--primary)" }} />,
      title: "Smart Automation",
      points: [
        "Auto-assignment logic",
        "Smart buttons on equipment",
        "Open request count badges",
      ],
    },
  ];

  return (
    <section
      id="features"
      className="py-20 px-6"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="text-3xl font-bold mb-4"
            style={{ color: "var(--foreground)" }}
          >
            Core Features
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--foreground-muted)" }}
          >
            Everything you need to manage maintenance operations efficiently.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card-hover rounded-2xl p-6"
              style={{
                backgroundColor: "var(--background)",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-md)",
              }}
            >
              <IconWrapper className="mb-4">{feature.icon}</IconWrapper>
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: "var(--foreground)" }}
              >
                {feature.title}
              </h3>
              <ul className="space-y-2">
                {feature.points.map((point, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm"
                    style={{ color: "var(--foreground-muted)" }}
                  >
                    <Check
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      style={{ color: "var(--primary)" }}
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ HOW IT WORKS SECTION ============
function HowItWorksSection() {
  const steps = [
    {
      num: "1",
      title: "Select Equipment",
      desc: "Choose the asset that needs maintenance",
    },
    {
      num: "2",
      title: "Auto-assign Team",
      desc: "System assigns the right team automatically",
    },
    {
      num: "3",
      title: "Create Request",
      desc: "Request is created with all details pre-filled",
    },
    {
      num: "4",
      title: "Technician Executes",
      desc: "Assigned tech receives and works on the task",
    },
    {
      num: "5",
      title: "Mark Complete",
      desc: "Mark as Repaired or Scrap to close the loop",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-20 px-6"
      style={{ backgroundColor: "var(--background-secondary)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-3xl font-bold mb-4"
            style={{ color: "var(--foreground)" }}
          >
            How It Works
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--foreground-muted)" }}
          >
            From request to resolution in 5 simple steps.
          </p>
        </div>
        <div className="relative">
          {/* Connection Line */}
          <div
            className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5"
            style={{
              background:
                "linear-gradient(90deg, var(--primary-100) 0%, var(--primary) 50%, var(--primary-100) 100%)",
            }}
          ></div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center">
                {/* Step Number */}
                <div
                  className="relative z-10 w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4 bg-white"
                  style={{
                    border: "3px solid var(--primary)",
                    boxShadow: "var(--shadow-lg)",
                  }}
                >
                  <span
                    className="text-2xl font-bold"
                    style={{ color: "var(--primary)" }}
                  >
                    {step.num}
                  </span>
                </div>
                <h3
                  className="font-semibold mb-2"
                  style={{ color: "var(--foreground)" }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "var(--foreground-muted)" }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ ANALYTICS SECTION ============
function AnalyticsSection() {
  return (
    <section
      id="analytics"
      className="py-20 px-6"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-6"
              style={{
                backgroundColor: "var(--primary-50)",
                color: "var(--primary)",
              }}
            >
              <BarChart3 className="w-4 h-4" />
              Advanced Analytics
            </div>
            <h2
              className="text-3xl font-bold mb-6"
              style={{ color: "var(--foreground)" }}
            >
              Data-Driven Maintenance Decisions
            </h2>
            <p
              className="text-lg mb-8"
              style={{ color: "var(--foreground-muted)" }}
            >
              Get actionable insights into your maintenance operations with
              comprehensive reports and analytics.
            </p>
            <ul className="space-y-4">
              {[
                "Requests per team breakdown",
                "Equipment-wise failure analysis",
                "Response time metrics",
                "Preventive vs. corrective ratio",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "var(--primary-100)" }}
                  >
                    <Check
                      className="w-4 h-4"
                      style={{ color: "var(--primary)" }}
                    />
                  </div>
                  <span style={{ color: "var(--foreground)" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Analytics Visual */}
          <div
            className="rounded-2xl p-6 bg-white"
            style={{
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-xl)",
            }}
          >
            <div
              className="text-sm font-medium mb-4"
              style={{ color: "var(--foreground)" }}
            >
              Maintenance Overview
            </div>
            {/* Mini Bar Chart */}
            <div className="flex items-end justify-between h-40 gap-3 mb-4 px-4">
              {[65, 45, 80, 55, 70, 90, 75].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-lg transition-all hover:opacity-80"
                  style={{
                    height: `${height}%`,
                    backgroundColor:
                      i === 5 ? "var(--primary)" : "var(--primary-100)",
                  }}
                ></div>
              ))}
            </div>
            <div
              className="flex justify-between text-xs px-4"
              style={{ color: "var(--foreground-muted)" }}
            >
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
            <div
              className="grid grid-cols-3 gap-4 mt-6 pt-6"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              <div className="text-center">
                <div
                  className="text-2xl font-bold"
                  style={{ color: "var(--primary)" }}
                >
                  127
                </div>
                <div
                  className="text-xs"
                  style={{ color: "var(--foreground-muted)" }}
                >
                  Completed
                </div>
              </div>
              <div className="text-center">
                <div
                  className="text-2xl font-bold"
                  style={{ color: "var(--foreground)" }}
                >
                  23
                </div>
                <div
                  className="text-xs"
                  style={{ color: "var(--foreground-muted)" }}
                >
                  In Progress
                </div>
              </div>
              <div className="text-center">
                <div
                  className="text-2xl font-bold"
                  style={{ color: "var(--foreground)" }}
                >
                  4h
                </div>
                <div
                  className="text-xs"
                  style={{ color: "var(--foreground-muted)" }}
                >
                  Avg Response
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ CTA SECTION ============
function CTASection() {
  return (
    <section
      className="py-20 px-6"
      style={{
        background:
          "linear-gradient(135deg, var(--primary-50) 0%, var(--primary-100) 100%)",
      }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <Wrench
          className="w-12 h-12 mx-auto mb-6"
          style={{ color: "var(--primary)" }}
        />
        <h2
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ color: "var(--foreground)" }}
        >
          Stop Reacting. Start Maintaining.
        </h2>
        <p
          className="text-lg mb-8"
          style={{ color: "var(--foreground-muted)" }}
        >
          Simple setup. Powerful workflows. Get started in minutes.
        </p>
        <button className="btn-primary px-8 py-4 rounded-xl font-medium text-lg flex items-center gap-2 mx-auto">
          Start Using GearGuard
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}

// ============ FOOTER ============
function Footer() {
  return (
    <footer
      className="py-12 px-6"
      style={{ backgroundColor: "var(--foreground)", color: "#fff" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "var(--primary)" }}
            >
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-semibold text-lg">GearGuard</span>
              <p className="text-sm opacity-60">
                Intelligent Maintenance Management
              </p>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <a
              href="#"
              className="text-sm opacity-80 hover:opacity-100 transition-opacity"
            >
              Docs
            </a>
            <a
              href="#"
              className="text-sm opacity-80 hover:opacity-100 transition-opacity"
            >
              Support
            </a>
            <a
              href="#"
              className="text-sm opacity-80 hover:opacity-100 transition-opacity"
            >
              Contact
            </a>
          </div>
        </div>
        <div
          className="mt-8 pt-8 text-center text-sm opacity-60"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          © 2024 GearGuard. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

// ============ MAIN PAGE COMPONENT ============
export default function Home() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--background)" }}
    >
      <Header />
      <main>
        <HeroSection />
        <ProblemsSection />
        <SolutionSection />
        <FeaturesSection />
        <HowItWorksSection />
        <AnalyticsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
