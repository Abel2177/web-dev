import { dishes } from "./menu/dishes";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://addis-eats.vercel.app";

export default function sitemap() {
  return [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/menu`, changeFrequency: "daily", priority: 0.9 },
    ...dishes.map((dish) => ({
      url: `${siteUrl}/menu/${dish.id}`,
      changeFrequency: "weekly",
      priority: 0.8,
      images: [dish.image],
    })),
  ];
}
