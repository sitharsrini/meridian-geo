import { site, absUrl } from "@/lib/site";
import type { BlogArticle, FaqItem, LandingPage } from "@/lib/types";

export function organizationNode() {
  return {
    "@type": "ProfessionalService",
    "@id": absUrl("/#org"),
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    foundingDate: site.foundingDate,
    slogan: site.tagline,
    description: site.description,
    areaServed: "Worldwide",
    knowsAbout: [
      "Search engine optimization",
      "Answer engine optimization",
      "Generative engine optimization",
      "Local SEO",
      "Technical SEO",
    ],
    sameAs: [...site.sameAs],
    logo: absUrl("/images/hero.jpg"),
    image: absUrl("/images/studio.jpg"),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.offices[0].address,
      addressLocality: site.offices[0].city,
      postalCode: site.offices[0].postal,
      addressCountry: site.offices[0].countryCode,
    },
    location: site.offices.map((office) => ({
      "@type": "Place",
      name: `${site.name} ${office.city}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: office.address,
        addressLocality: office.city,
        addressRegion: office.region,
        postalCode: office.postal,
        addressCountry: office.countryCode,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: office.lat,
        longitude: office.lng,
      },
    })),
  };
}

export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": absUrl("/#website"),
    url: site.url,
    name: site.name,
    publisher: { "@id": absUrl("/#org") },
    inLanguage: "en",
    potentialAction: {
      "@type": "SearchAction",
      target: `${absUrl("/blog")}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbNode(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absUrl(item.path),
    })),
  };
}

export function faqNode(faqs: FaqItem[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function landingGraph(page: LandingPage) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode(),
      websiteNode(),
      breadcrumbNode([
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: page.service.name, path: `/services/${page.service.slug}` },
        {
          name: page.location.name,
          path: `/geo/${page.service.slug}/${page.location.slug}`,
        },
      ]),
      {
        "@type": "Service",
        name: page.title,
        serviceType: page.service.name,
        description: page.description,
        url: absUrl(`/geo/${page.service.slug}/${page.location.slug}`),
        areaServed: {
          "@type": "City",
          name: page.location.name,
          containedInPlace: {
            "@type": "Country",
            name: page.location.country,
          },
        },
        provider: { "@id": absUrl("/#org") },
        image: absUrl(page.image),
      },
      faqNode(page.faqs),
    ],
  };
}

export function articleGraph(article: BlogArticle) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode(),
      websiteNode(),
      breadcrumbNode([
        { name: "Home", path: "/" },
        { name: "Journal", path: "/blog" },
        { name: article.topic.title, path: `/blog/${article.topic.slug}` },
        {
          name: article.industry.name,
          path: `/blog/${article.topic.slug}/${article.industry.slug}`,
        },
        {
          name: article.location.name,
          path: `/blog/${article.topic.slug}/${article.industry.slug}/${article.location.slug}`,
        },
      ]),
      {
        "@type": "BlogPosting",
        headline: article.title,
        description: article.description,
        image: absUrl(article.image),
        datePublished: article.published,
        dateModified: article.updated,
        inLanguage: "en",
        author: {
          "@type": "Person",
          name: article.author.name,
          jobTitle: article.author.role,
          url: absUrl(`/authors/${article.author.slug}`),
        },
        editor: {
          "@type": "Person",
          name: article.reviewer.name,
          jobTitle: article.reviewer.role,
        },
        publisher: { "@id": absUrl("/#org") },
        mainEntityOfPage: absUrl(
          `/blog/${article.topic.slug}/${article.industry.slug}/${article.location.slug}`,
        ),
        about: [article.topic.title, article.industry.name, article.location.name],
      },
      faqNode(article.faqs),
    ],
  };
}

export function homeGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationNode(), websiteNode()],
  };
}
