import { STATS } from "@pestosot/config";
import { Counter } from "@/components/motion/counter";
import { Reveal } from "@/components/motion/reveal";

const stats = [
  { value: STATS.customersServed, suffix: "+", label: "Customers Served" },
  { value: STATS.yearsExperience, suffix: " yrs", label: "Of Experience" },
  { value: STATS.googleRating, decimals: 1, suffix: "★", label: "Google Rating" },
  { value: STATS.projectsCompleted, suffix: "+", label: "Projects Completed" },
  { value: STATS.responseTimeHours, suffix: " hr", label: "Avg. Response" },
  { value: STATS.citiesServed, suffix: "", label: "Cities & Growing" },
];

export function SocialProof() {
  return (
    <section className="relative border-y border-ink-100 bg-white">
      <div className="container-px mx-auto max-w-7xl py-12">
        <div className="grid grid-cols-2 gap-y-8 md:grid-cols-3 lg:grid-cols-6">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05} className="text-center">
              <p className="font-display text-3xl font-extrabold text-navy-950 lg:text-4xl">
                <Counter value={s.value} decimals={s.decimals ?? 0} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-sm font-medium text-ink-500">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
