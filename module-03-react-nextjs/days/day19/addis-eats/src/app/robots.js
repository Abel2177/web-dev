// app/robots.js
// Next.js serves this at GET /robots.txt automatically.
// Private app routes are disallowed so search engines never index them.

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Exclude transactional / auth routes from indexing.
        disallow: ["/cart", "/checkout", "/kitchen", "/orders", "/signin", "/api/"],
      },
    ],
    sitemap: "https://addiseats.et/sitemap.xml",
    host: "https://addiseats.et",
  };
}
