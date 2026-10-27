// app/menu/[id]/opengraph-image.jsx
// Next.js file-based convention: this file is automatically served at
//   GET /menu/{id}/opengraph-image
// and linked by <meta property="og:image"> on each dish page.

import { ImageResponse } from "next/og";
import { findDish } from "../dishes";

// 1200 × 630 is the canonical OG image size.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function DishOgImage({ params }) {
  const { id } = await params;
  const dish = findDish(id);

  // Fallback when dish is not found — plain branded card.
  const name = dish?.name ?? "Dish not found";
  const cuisine = dish?.cuisine ?? "";
  const rating = dish?.rating ?? "";
  const totalTime = dish
    ? `${dish.prepTimeMinutes + dish.cookTimeMinutes} min`
    : "";
  const imgSrc = dish?.image ?? null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
          background: "#1a0a00",
        }}
      >
        {/* Dish photo — full bleed, darkened */}
        {imgSrc && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imgSrc}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.45,
            }}
          />
        )}

        {/* Gradient overlay — bottom-to-top dark scrim */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(10,4,0,0.95) 0%, rgba(10,4,0,0.5) 55%, transparent 100%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "56px 72px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              color: "#f5a623",
              fontSize: "28px",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            {cuisine && <span>{cuisine}</span>}
            {totalTime && <span>· {totalTime}</span>}
            {rating && <span>· ★ {rating}</span>}
          </div>

          {/* Dish name */}
          <div
            style={{
              color: "#ffffff",
              fontSize: "80px",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {name}
          </div>

          {/* Brand lockup */}
          <div
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: "30px",
              fontWeight: 500,
              marginTop: "8px",
            }}
          >
            addiseats.et
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
