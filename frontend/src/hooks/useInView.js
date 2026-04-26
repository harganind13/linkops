import { useEffect, useState, useRef } from "react";

/**
 * Returns true when the ref element is inside the viewport (with margin).
 * Use to gate heavy 3D Canvases so they don't run when off-screen.
 */
export default function useInView(rootMargin = "200px") {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => setInView(e.isIntersecting)),
      { rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin]);

  return [ref, inView];
}
