import { Link, useNavigate, useParams } from "react-router-dom";
import { useCourses } from "../../hooks/useCourses";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../../components/Button";
import { Badge } from "../../components/Badge";
import { CourseArt } from "../../assets/courseArt";
import { formatCurrency } from "../../utils/helpers";

export const CourseDetails = () => {
  const { id = "" } = useParams();
  const { courses, enrolledIds, enroll, unenroll } = useCourses();
  const { user } = useAuth();
  const navigate = useNavigate();
  const course = courses.find((c) => c.id === id);

  if (!course) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Course not found</h1>
        <p className="mt-2 text-slate-600">It may have been removed or the link is broken.</p>
        <Link to="/courses" className="mt-6 inline-block font-semibold text-indigo-600">← Back to courses</Link>
      </div>
    );
  }

  const isEnrolled = enrolledIds.includes(course.id);

  const handleEnroll = () => {
    if (!user) { navigate("/login"); return; }
    enroll(course.id);
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-indigo-950 to-violet-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <Link to="/courses" className="text-sm text-indigo-200 hover:text-white">← All courses</Link>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Badge tone="indigo">{course.category}</Badge>
                <Badge tone="violet">{course.level}</Badge>
              </div>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">{course.title}</h1>
              <p className="mt-4 max-w-2xl text-lg text-indigo-100">{course.description}</p>

              <div className="mt-6 flex flex-wrap items-center gap-5 text-sm">
                <div className="flex items-center gap-2">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-sm font-bold">
                    {course.instructor.split(" ").map((n) => n[0]).join("")}
                  </span>
                  <div>
                    <p className="text-xs text-indigo-200">Instructor</p>
                    <p className="font-semibold">{course.instructor}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="h-4 w-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor"><path d="M10 15.27l-5.18 3.04 1.4-5.97L1.5 7.97l6.06-.52L10 2l2.44 5.45 6.06.52-4.72 4.37 1.4 5.97z" /></svg>
                  <span className="font-bold">{course.rating}</span>
                  <span className="text-indigo-200">({course.students.toLocaleString()} students)</span>
                </div>
                <span className="text-indigo-200">{course.duration} • {course.lessons} lessons</span>
              </div>
            </div>

            <div className="lg:row-start-1 lg:col-start-2">
              <div className="overflow-hidden rounded-2xl bg-white text-slate-900 shadow-2xl ring-1 ring-white/10">
                <div className="aspect-video"><CourseArt variant={course.image} className="h-full w-full" /></div>
                <div className="p-6">
                  <div className="flex items-baseline justify-between">
                    <span className="text-3xl font-extrabold">{formatCurrency(course.price)}</span>
                    <span className="text-xs text-slate-500 line-through">{formatCurrency(course.price * 1.6)}</span>
                  </div>
                  {isEnrolled ? (
                    <div className="mt-4 space-y-2">
                      <Button fullWidth size="lg">Continue learning</Button>
                      <Button fullWidth variant="outline" onClick={() => unenroll(course.id)}>Drop course</Button>
                    </div>
                  ) : (
                    <Button fullWidth size="lg" className="mt-4" onClick={handleEnroll}>Enroll now</Button>
                  )}
                  <ul className="mt-5 space-y-2 text-sm text-slate-600">
                    {["Lifetime access", "Certificate of completion", "Downloadable resources", "Community Q&A access"].map((p) => (
                      <li key={p} className="flex items-center gap-2">
                        <svg className="h-4 w-4 text-emerald-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-7 7a1 1 0 01-1.4 0l-4-4a1 1 0 011.4-1.4L9 11.6l6.3-6.3a1 1 0 011.4 0z" clipRule="evenodd" /></svg>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">Course curriculum</h2>
            <p className="mt-1 text-sm text-slate-600">
              {course.modules.length} modules • {course.modules.reduce((s, m) => s + m.lessons, 0)} lessons
            </p>
            <div className="mt-6 space-y-3">
              {course.modules.map((m, i) => (
                <details key={i} className="group rounded-2xl border border-slate-200 bg-white p-5 open:shadow-md transition" open={i === 0}>
                  <summary className="flex cursor-pointer items-center justify-between gap-4 list-none">
                    <div>
                      <p className="text-xs font-semibold text-indigo-600">Module {i + 1}</p>
                      <h3 className="text-base font-bold text-slate-900">{m.title}</h3>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span>{m.lessons} lessons</span>
                      <span>{m.duration}</span>
                      <svg className="h-5 w-5 text-slate-400 transition group-open:rotate-180" viewBox="0 0 20 20" fill="currentColor"><path d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" /></svg>
                    </div>
                  </summary>
                  <ul className="mt-4 space-y-1.5">
                    {Array.from({ length: Math.min(5, m.lessons) }).map((_, j) => (
                      <li key={j} className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                        <span className="flex items-center gap-2">
                          <svg className="h-4 w-4 text-indigo-500" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /></svg>
                          Lesson {j + 1}: {m.title} essentials part {j + 1}
                        </span>
                        <span className="text-xs text-slate-500">{4 + j}:30</span>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </div>

          <aside>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-bold text-slate-900">What you'll learn</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {[
                  "Build modern, real-world projects from scratch",
                  "Apply industry best practices and patterns",
                  "Deploy production-ready applications",
                  "Pass interviews & ship side projects with confidence",
                ].map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold">✓</span>
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">
                {course.tags.map((t) => <Badge key={t} tone="slate">{t}</Badge>)}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};
