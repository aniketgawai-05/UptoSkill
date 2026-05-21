import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { CourseCard } from "../components/CourseCard";
import { useCourses } from "../hooks/useCourses";

const stats = [
  { label: "Active learners", value: "1500+" },
  { label: "Expert instructors", value: "100" },
  { label: "Hours of content", value: "10000" },
  { label: "Completion rate", value: "94%" },
];

const features = [
  {
    title: "Learn at your pace",
    desc: "Stream HD video lessons, download resources and pick up where you left off — anywhere.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6"><circle cx="12" cy="12" r="9" /><path d="M10 8l6 4-6 4z" /></svg>
    ),
  },
  {
    title: "Real-world projects",
    desc: "Apply what you learn through guided projects reviewed by industry mentors.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 10h18M8 4v6" /></svg>
    ),
  },
  {
    title: "Verified certificates",
    desc: "Earn shareable certificates recognized by 1,000+ hiring partners worldwide.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6"><circle cx="12" cy="9" r="6" /><path d="M9 14l-2 7 5-3 5 3-2-7" /></svg>
    ),
  },
];

export const Home = () => {
  const { courses } = useCourses();
  const featured = courses.slice(0, 3);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute -top-24 right-1/4 h-72 w-72 rounded-full bg-indigo-300/30 blur-3xl" />
        <div className="absolute top-40 -left-20 h-80 w-80 rounded-full bg-violet-300/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="animate-fade-in-up">
             
              <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Learn the skills <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                  shaping tomorrow.
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-lg text-slate-600">
                UptoSkils is the modern learning platform for ambitious people. Master in-demand
                tech, design and business skills with expert-led courses.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link to="/courses"><Button size="lg">Browse courses</Button></Link>
              </div>
              <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl font-extrabold text-slate-900">{s.value}</p>
                    <p className="text-xs text-slate-500">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-fade-in-up">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-indigo-200 via-violet-200 to-fuchsia-200 blur-2xl opacity-70" />
             
              
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Why learners choose UptoSkill</h2>
          <p className="mt-3 text-slate-600">Everything you need to go from curious to qualified.</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl hover:border-indigo-200">
              <div className="inline-grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white">
                {f.icon}
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED COURSES */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Courses</h2>
            <p className="mt-2 text-slate-600">Hand-picked by our editorial team.</p>
          </div>
          <Link to="/courses" className="hidden sm:inline-flex text-sm font-semibold text-indigo-600 hover:text-indigo-700">
            See all →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((c) => <CourseCard key={c.id} course={c} />)}
        </div>
      </section>

     
      
    </div>
  );
};
