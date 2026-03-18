import { useState } from "react";

const GRADIENT_COLORS = [
  "from-sky-500 to-cyan-400",
  "from-pink-500 to-rose-400",
  "from-violet-500 to-purple-400",
  "from-emerald-500 to-teal-400",
  "from-amber-500 to-orange-400",
  "from-red-500 to-pink-400",
];

function gradientForName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return GRADIENT_COLORS[Math.abs(hash) % GRADIENT_COLORS.length];
}

interface AvatarProps {
  name: string;
  avatarUrl?: string;
  size?: "sm" | "md";
}

export function Avatar({ name, avatarUrl, size = "md" }: AvatarProps) {
  const [imgFailed, setImgFailed] = useState(false);

  const dim = size === "sm" ? "h-9 w-9" : "h-12 w-12";
  const textSize = size === "sm" ? "text-sm" : "text-lg";
  const radius = size === "sm" ? "rounded-xl" : "rounded-2xl";

  // If avatarUrl is provided but fails to load, fallback to initials with gradient background
  if (avatarUrl && !imgFailed) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        onError={() => setImgFailed(true)}
        className={`${dim} ${radius} object-cover shrink-0`}
      />
    );
  }

  const gradient = gradientForName(name);
  return (
    <div
      className={`${dim} ${radius} bg-gradient-to-br ${gradient} flex shrink-0 items-center justify-center font-bold text-white ${textSize}`}
    >
      {name[0]?.toUpperCase() ?? "?"}
    </div>
  );
}
