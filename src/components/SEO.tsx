import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: object;
  noindex?: boolean;
}

const SEO = ({
  title,
  description = "Katana Gin es sinónimo de pura precisión. Descubre nuestra destilería de gin premium, productos exclusivos y el arte de la mixología de alta calidad.",
  image = "/og-image.webp",
  url = "https://katanagin.com/",
  type = "website",
  structuredData,
  noindex = false
}: SEOProps) => {
  const fullTitle = title ? `${title} | Katana Gin` : "Katana Gin | Pura Precisión";

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data (JSON-LD) */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
