import { cn } from "@/lib/utils";

type Intensity = "subtle" | "vivid" | "dark";

interface Blob {
  color: string;
  pos: string;
  anim: string;
}

/**
 * Ambient animated gradient mesh — slow drifting blurred blobs that give a
 * section depth and life. Pure CSS (GPU transforms), respects reduced-motion
 * via the global stylesheet. Render as the first child of a `relative` parent.
 */
const PRESETS: Record<Intensity, Blob[]> = {
  subtle: [
    { color: "rgba(20,168,98,0.16)", pos: "-left-[10%] -top-[15%] h-[60%] w-[55%]", anim: "animate-aurora-a" },
    { color: "rgba(53,90,161,0.12)", pos: "-right-[12%] top-[5%] h-[55%] w-[50%]", anim: "animate-aurora-b" },
    { color: "rgba(54,201,126,0.12)", pos: "bottom-[-20%] left-[25%] h-[60%] w-[55%]", anim: "animate-aurora-c" },
  ],
  vivid: [
    { color: "rgba(20,168,98,0.30)", pos: "-left-[8%] -top-[18%] h-[65%] w-[60%]", anim: "animate-aurora-a" },
    { color: "rgba(53,90,161,0.24)", pos: "-right-[10%] top-0 h-[60%] w-[55%]", anim: "animate-aurora-b" },
    { color: "rgba(111,224,164,0.22)", pos: "bottom-[-22%] left-[20%] h-[65%] w-[60%]", anim: "animate-aurora-c" },
  ],
  dark: [
    { color: "rgba(20,168,98,0.40)", pos: "-left-[6%] -top-[20%] h-[70%] w-[60%]", anim: "animate-aurora-a" },
    { color: "rgba(54,201,126,0.26)", pos: "-right-[8%] top-[10%] h-[60%] w-[55%]", anim: "animate-aurora-b" },
    { color: "rgba(53,90,161,0.30)", pos: "bottom-[-24%] left-[25%] h-[70%] w-[60%]", anim: "animate-aurora-c" },
  ],
};

export function AuroraBackground({
  intensity = "subtle",
  className,
}: {
  intensity?: Intensity;
  className?: string;
}) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {PRESETS[intensity].map((b, i) => (
        <div
          key={i}
          className={cn("absolute rounded-full blur-3xl will-change-transform", b.pos, b.anim)}
          style={{ background: `radial-gradient(circle at center, ${b.color}, transparent 70%)` }}
        />
      ))}
    </div>
  );
}
