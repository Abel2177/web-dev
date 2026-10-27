import { ImageResponse } from "next/og";
import { findDish } from "../dishes";

export const alt = "Addis Eats dish";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({ params }) {
  const { id } = await params;
  const dish = findDish(id);
  const title = dish?.name || "Addis Eats";
  const detail = dish ? `${dish.price} ETB · ${dish.cuisine}` : "Food delivery in Addis Ababa";

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "72px", color: "#fff7df", background: "#0a1f3d" }}>
      <div style={{ display: "flex", color: "#f3bb39", fontSize: 34, marginBottom: 36 }}>ADDIS EATS</div>
      <div style={{ display: "flex", fontSize: 76, fontWeight: 700, lineHeight: 1.08 }}>{title}</div>
      <div style={{ display: "flex", color: "#d7e3f5", fontSize: 36, marginTop: 30 }}>{detail}</div>
    </div>,
    size
  );
}
