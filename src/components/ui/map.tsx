import { useMemo, useRef } from "react";
import { useInView } from "framer-motion";
import DottedMap from "dotted-map";

interface MapProps {
  accentColor?: string;
  fillDuration?: number;
}

function isInCanada(lat: number, lng: number): boolean {
  if (lng < -141 || lng > -52) return false;
  if (lat < 41.5 || lat > 84) return false;
  if (lng < -120 && lat < 48.5) return false;
  if (lng >= -120 && lng < -95 && lat < 49) return false;
  if (lng >= -95 && lng < -85 && lat < 44) return false;
  if (lng >= -85 && lng < -67 && lat < 45) return false;
  return true;
}

export function CanadaMap({
  accentColor = "#4294d8",
  fillDuration = 2.5,
}: MapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInViewport = useInView(ref, { once: false, margin: "200px" });

  const map = useMemo(
    () => new DottedMap({ height: 100, grid: "diagonal" }),
    []
  );

  const mapWidth = map.image.width;
  const mapHeight = map.image.height;

  const allPoints = useMemo(() => map.getPoints(), [map]);

  const { canadaPoints, worldPoints, xMin, xMax } = useMemo(() => {
    const canada: typeof allPoints = [];
    const world: typeof allPoints = [];
    let min = Infinity;
    let max = -Infinity;
    for (const p of allPoints) {
      if (isInCanada(p.lat, p.lng)) {
        canada.push(p);
        if (p.x < min) min = p.x;
        if (p.x > max) max = p.x;
      } else {
        world.push(p);
      }
    }
    return { canadaPoints: canada, worldPoints: world, xMin: min, xMax: max };
  }, [allPoints]);

  const xRange = xMax - xMin || 1;

  // ViewBox cropped to Canada region
  const vbX = mapWidth * 0.06;
  const vbY = 0;
  const vbW = mapWidth * 0.42;
  const vbH = mapHeight * 0.38;
  const viewBox = `${vbX} ${vbY} ${vbW} ${vbH}`;

  return (
    <div className="canada-map" ref={ref}>
      <svg
        viewBox={viewBox}
        className="canada-map__svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Dim world dots */}
        {worldPoints.map((p, i) => (
          <circle
            key={`w-${i}`}
            cx={p.x}
            cy={p.y}
            r={0.22}
            fill="rgba(255,255,255,0.06)"
          />
        ))}

        {/* Canada — gray base layer (always visible) */}
        {canadaPoints.map((p, i) => (
          <circle
            key={`cg-${i}`}
            cx={p.x}
            cy={p.y}
            r={0.28}
            fill="rgba(255,255,255,0.13)"
          />
        ))}

        {/* Canada — blue animated layer (only when in view) */}
        {isInViewport &&
          canadaPoints.map((p, i) => {
            const progress = (p.x - xMin) / xRange;
            const delay = progress * fillDuration;
            const shimmerDur = 2.8 + ((p.x * 3.1 + p.y * 5.7) % 15) / 10;

            return (
              <circle
                key={`cb-${i}`}
                cx={p.x}
                cy={p.y}
                r={0.28}
                fill={accentColor}
                style={{
                  opacity: 0,
                  animation: `map-dot-sweep 0.45s ${delay.toFixed(2)}s forwards, map-dot-shimmer ${shimmerDur.toFixed(1)}s ${(delay + 0.45).toFixed(2)}s infinite`,
                }}
              />
            );
          })}
      </svg>
    </div>
  );
}
