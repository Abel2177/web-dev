import { ImageResponse } from "next/og";

export const alt = "Addis Eats food delivery";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px", color: "#fff7df", background: "#0a1f3d" }}>
      <div style={{ display: "flex", color: "#f3bb39", fontSize: 40, marginBottom: 28 }}>ADDIS EATS</div>
      <div style={{ display: "flex", fontSize: 88, fontWeight: 700 }}>Food worth finding.</div>
      <div style={{ display: "flex", color: "#d7e3f5", fontSize: 38, marginTop: 30 }}>Delivery across Addis Ababa</div>
    </div>,
    size
  );
}
