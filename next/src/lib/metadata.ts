export interface BuildMetadataOptions {
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  type?: string;
}

export interface BuildBreadcrumbItem {
  label: string;
  href?: string;
}

export interface StructuredDataOptions {
  breadcrumbs?: BuildBreadcrumbItem[];
  additional?: object | object[];
}

export function buildMetadata(options: BuildMetadataOptions) {
  const {
    title,
    description,
    canonical,
    ogTitle,
    ogDescription,
    ogImage = "https://effectivemarketer.com/og-image.jpg",
    type = "website",
  } = options;

  return {
    title,
    description,
    openGraph: {
      title: ogTitle || title,
      description: ogDescription || description,
      url: canonical,
      type,
      images: [ogImage],
    },
    alternates: {
      canonical,
    },
  } as const;
}

export function buildBreadcrumbStructuredData(
  items: BuildBreadcrumbItem[]
) {
  if (!items.length) return undefined;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: item.href } : {}),
    })),
  };
}

export function buildStructuredData({
  breadcrumbs = [],
  additional,
}: StructuredDataOptions) {
  const breadcrumbData = breadcrumbs.length
    ? buildBreadcrumbStructuredData(breadcrumbs)
    : undefined;

  if (!additional && !breadcrumbData) return undefined;

  const base = additional
    ? Array.isArray(additional)
      ? [...additional]
      : [additional]
    : [];

  if (breadcrumbData) base.push(breadcrumbData);
  return base;
}
