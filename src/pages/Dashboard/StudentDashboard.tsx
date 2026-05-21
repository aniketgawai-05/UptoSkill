import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar";
import { CourseCard } from "../../components/CourseCard";
import { Card } from "../../components/Card";
import { ProgressBar } from "../../components/ProgressBar";
import { useAuth } from "../../hooks/useAuth";
import { useCourses } from "../../hooks/useCourses";
import { calcProgress, initials } from "../../utils/helpers";

const icon = (p: string) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" strokeLinecap="round" strokeLinejoin="round">
    <path d={p} />
  </svg>
);

const sidebarItems = [
  { to: "/dashboard", end: true, label: "Overview", icon: icon("M3 12l2-2 7-7 7 7 2 2v9a2 2 0 01-2 2h-4v-6h-6v6H5a2 2 0 01-2-2z") },
  { to: "/dashboard/courses", label: "My Courses", icon: icon("M4 4h16v16H4zM4 9h16") },
  { to: "/dashboard/certificates", label: "Certificates", icon: icon("M12 15a6 6 0 100-12 6 6 0 000 12zM9 14l-2 7 5-3 5 3-2-7") },
  { to: "/dashboard/settings", label: "Settings", icon: icon("M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.7 1.7 0 00.4 1.8l.1.1a2 2 0 11-2.9 2.9l-.1-.1a1.7 1.7 0 00-1.8-.4 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5") },
];

export const StudentDashboard = () => {
  const { user } = useAuth();
  const { courses, enrolledIds } = useCourses();

  const enrolled = useMemo(() => courses.filter((c) => enrolledIds.includes(c.id)), [courses, enrolledIds]);
  const totalLessons = enrolled.reduce((s, c) => s + c.lessons, 0);
  const completedLessons = enrolled.reduce((s, c) => s + Math.round((c.progress / 100) * c.lessons), 0);
  const overallPct = calcProgress(completedLessons, totalLessons);
  const inProgress = enrolled.filter((c) => c.progress > 0 && c.progress < 100);
  const recommended = courses.filter((c) => !enrolledIds.includes(c.id)).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex gap-8">
        <Sidebar title="Student" items={sidebarItems} />

        <div className="flex-1 min-w-0 space-y-8">
          {/* Greeting */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-lg font-bold text-white shadow-lg shadow-indigo-200">
                {initials(user?.name ?? "U")}
              </span>
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900">
                  Welcome back, {user?.name?.split(" ")[0] ?? "learner"} 
                </h1>
                <p className="text-sm text-slate-600">Pick up where you left off — you're doing great!</p>
              </div>
            </div>
            <Link to="/courses" className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
              Browse more courses
            </Link>
          </div>

          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Enrolled courses" value={enrolled.length} accent="indigo" />
            <StatCard label="Lessons completed" value={completedLessons} accent="emerald" />
            <StatCard label="Hours studied" value={Math.round(completedLessons * 0.18)} suffix="h" accent="amber" />
            <StatCard label="Current streak" value={12} suffix=" days" accent="rose" />
          </div>

          {/* Overall progress */}
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Your overall progress</h2>
                <p className="text-sm text-slate-600">{completedLessons} of {totalLessons} lessons completed across your courses.</p>
              </div>
              <span className="text-3xl font-extrabold text-indigo-600">{overallPct}%</span>
            </div>
            <ProgressBar value={overallPct} className="mt-4" />
          </Card>

          {/* In progress */}
          <section>
            <div className="mb-4 flex items-end justify-between">
              <h2 className="text-xl font-bold text-slate-900">Continue learning</h2>
              <Link to="/courses" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">All courses →</Link>
            </div>
            {inProgress.length === 0 ? (
              <Card className="p-10 text-center">
                <p className="text-slate-600">You haven't started a course yet.</p>
                <Link to="/courses" className="mt-3 inline-block text-sm font-semibold text-indigo-600">Browse the catalog →</Link>
              </Card>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {inProgress.map((c) => <CourseCard key={c.id} course={c} showProgress />)}
              </div>
            )}
          </section>

          {/* Recommended */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-slate-900">Recommended for you</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recommended.map((c) => <CourseCard key={c.id} course={c} />)}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, suffix = "", accent }: { label: string; value: number; suffix?: string; accent: "indigo" | "emerald" | "amber" | "rose" }) => {
  const tones: Record<string, string> = {
    indigo: "from-indigo-500 to-violet-500",
    emerald: "from-emerald-500 to-teal-500",
    amber: "from-amber-500 to-orange-500",
    rose: "from-rose-500 to-pink-500",
  };
  return (
    <Card className="p-5">
      <div className={`inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${tones[accent]} text-white text-sm font-bold`}>
        ✦
      </div>
      <p className="mt-3 text-2xl font-extrabold text-slate-900">{value}{suffix}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </Card>
  );
};
