const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://addis-eats.vercel.app";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/checkout", "/kitchen", "/orders", "/signin", "/api"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
