import { Sidebar } from "../../components/Sidebar";
import { Card } from "../../components/Card";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { useCourses } from "../../hooks/useCourses";
import { formatCurrency } from "../../utils/helpers";

const icon = (p: string) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" strokeLinecap="round" strokeLinejoin="round">
    <path d={p} />
  </svg>
);

const sidebarItems = [
  { to: "/admin", end: true, label: "Overview", icon: icon("M3 3h7v9H3zM14 3h7v5h-7zM14 12h7v9h-7zM3 16h7v5H3z") },
  { to: "/admin/courses", label: "Courses", icon: icon("M4 4h16v16H4zM4 9h16") },
  { to: "/admin/users", label: "Users", icon: icon("M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8z") },
  { to: "/admin/reports", label: "Reports", icon: icon("M3 3v18h18M7 14l3-3 4 4 5-7") },
];

const recentUsers = [
  { name: "Emily Rodriguez", email: "emily@example.com", role: "Student", joined: "2 days ago" },
  { name: "James Wilson", email: "james@example.com", role: "Instructor", joined: "3 days ago" },
  { name: "Aisha Khan", email: "aisha@example.com", role: "Student", joined: "1 week ago" },
  { name: "Noah Bennett", email: "noah@example.com", role: "Student", joined: "1 week ago" },
];

export const AdminDashboard = () => {
  const { courses } = useCourses();
  const totalRevenue = courses.reduce((s, c) => s + c.price * c.students, 0);
  const totalStudents = courses.reduce((s, c) => s + c.students, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex gap-8">
        <Sidebar title="Admin" items={sidebarItems} />

        <div className="flex-1 min-w-0 space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">Admin overview</h1>
              <p className="text-sm text-slate-600">Manage courses, users and platform health.</p>
            </div>
            <Button leftIcon={<span>+</span>}>New course</Button>
          </div>

          {/* KPIs */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KPI label="Total revenue" value={formatCurrency(totalRevenue / 100)} delta="+12.4%" accent="emerald" />
            <KPI label="Active students" value={totalStudents.toLocaleString()} delta="+8.1%" accent="indigo" />
            <KPI label="Live courses" value={courses.length.toString()} delta="+2" accent="violet" />
            <KPI label="Avg. rating" value="4.83" delta="+0.05" accent="amber" />
          </div>

          {/* Chart placeholder */}
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Enrollment trend</h2>
                <p className="text-xs text-slate-500">Last 12 weeks</p>
              </div>
              <select className="h-9 rounded-lg border border-slate-300 bg-white px-3 text-xs font-medium text-slate-700">
                <option>Last 12 weeks</option>
                <option>Last 6 months</option>
                <option>Year to date</option>
              </select>
            </div>
            <div className="mt-6 flex h-44 items-end gap-2">
              {[42, 55, 48, 62, 70, 58, 75, 80, 72, 88, 95, 102].map((v, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-indigo-500 to-violet-400 transition hover:opacity-80"
                    style={{ height: `${v}%` }}
                  />
                  <span className="text-[10px] text-slate-400">W{i + 1}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Courses table */}
          <Card className="overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <h2 className="text-lg font-bold text-slate-900">Top courses</h2>
              <a href="#" className="text-sm font-semibold text-indigo-600">Manage all →</a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-5 py-3">Course</th>
                    <th className="px-5 py-3">Category</th>
                    <th className="px-5 py-3">Students</th>
                    <th className="px-5 py-3">Rating</th>
                    <th className="px-5 py-3">Revenue</th>
                    <th className="px-5 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {courses.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/50">
                      <td className="px-5 py-3">
                        <p className="font-semibold text-slate-900">{c.title}</p>
                        <p className="text-xs text-slate-500">{c.instructor}</p>
                      </td>
                      <td className="px-5 py-3"><Badge tone="indigo">{c.category}</Badge></td>
                      <td className="px-5 py-3 text-slate-700">{c.students.toLocaleString()}</td>
                      <td className="px-5 py-3 text-slate-700">⭐ {c.rating}</td>
                      <td className="px-5 py-3 font-semibold text-slate-900">{formatCurrency(c.price * c.students / 100)}</td>
                      <td className="px-5 py-3 text-right">
                        <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">Edit</button>
                        <span className="mx-2 text-slate-300">|</span>
                        <button className="text-xs font-semibold text-rose-600 hover:text-rose-700">Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Recent users */}
          <Card className="p-5">
            <h2 className="text-lg font-bold text-slate-900">Recent signups</h2>
            <div className="mt-4 divide-y divide-slate-100">
              {recentUsers.map((u) => (
                <div key={u.email} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-xs font-bold text-white">
                      {u.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{u.name}</p>
                      <p className="text-xs text-slate-500">{u.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <Badge tone={u.role === "Instructor" ? "violet" : "sky"}>{u.role}</Badge>
                    <span className="text-slate-400">{u.joined}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

const KPI = ({ label, value, delta, accent }: { label: string; value: string; delta: string; accent: "indigo" | "emerald" | "amber" | "violet" }) => {
  const tones: Record<string, string> = {
    indigo: "from-indigo-500 to-violet-500",
    emerald: "from-emerald-500 to-teal-500",
    amber: "from-amber-500 to-orange-500",
    violet: "from-violet-500 to-fuchsia-500",
  };
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500">{label}</p>
          <p className="mt-1 text-2xl font-extrabold text-slate-900">{value}</p>
        </div>
        <span className={`grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br ${tones[accent]} text-white`}>✦</span>
      </div>
      <p className="mt-3 text-xs font-semibold text-emerald-600">{delta} this month</p>
    </Card>
  );
};
