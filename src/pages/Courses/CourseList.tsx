import { useMemo, useState } from "react";
import { CourseCard } from "../../components/CourseCard";
import { Input } from "../../components/Input";
import { useCourses } from "../../hooks/useCourses";

const categories = ["All", "Web Development", "Computer Science", "Design", "AI & Data", "Marketing", "DevOps"];
const levels = ["All", "Beginner", "Intermediate", "Advanced"] as const;

export const CourseList = () => {
  const { courses, loading } = useCourses();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [level, setLevel] = useState<(typeof levels)[number]>("All");
  const [sort, setSort] = useState<"popular" | "rating" | "priceAsc" | "priceDesc">("popular");

  const filtered = useMemo(() => {
    let out = courses;
    if (query) {
      const q = query.toLowerCase();
      out = out.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.instructor.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }
    if (category !== "All") out = out.filter((c) => c.category === category);
    if (level !== "All") out = out.filter((c) => c.level === level);

    out = [...out].sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "priceAsc") return a.price - b.price;
      if (sort === "priceDesc") return b.price - a.price;
      return b.students - a.students;
    });

    return out;
  }, [courses, query, category, level, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Explore courses</h1>
        <p className="mt-2 text-slate-600">{courses.length} expert-led courses across {categories.length - 1} categories.</p>
      </div>

      {/* Filters */}
      <div className="mb-6 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 lg:grid-cols-[1fr_auto_auto_auto]">
        <Input
          name="search"
          placeholder="Search courses, instructors, tags…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          leftIcon={
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-3.5-3.5" /></svg>
          }
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-11 rounded-xl border border-slate-300 bg-white px-3 text-sm font-medium text-slate-700"
        >
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value as typeof level)}
          className="h-11 rounded-xl border border-slate-300 bg-white px-3 text-sm font-medium text-slate-700"
        >
          {levels.map((l) => <option key={l}>{l}</option>)}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as typeof sort)}
          className="h-11 rounded-xl border border-slate-300 bg-white px-3 text-sm font-medium text-slate-700"
        >
          <option value="popular">Most popular</option>
          <option value="rating">Highest rated</option>
          <option value="priceAsc">Price: Low → High</option>
          <option value="priceDesc">Price: High → Low</option>
        </select>
      </div>

      {/* Results */}
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-80 animate-pulse rounded-2xl bg-white border border-slate-200" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-16 text-center">
          <p className="text-lg font-semibold text-slate-700">No courses match your filters.</p>
          <p className="mt-1 text-sm text-slate-500">Try clearing search or choosing a different category.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => <CourseCard key={c.id} course={c} />)}
        </div>
      )}
    </div>
  );
};
