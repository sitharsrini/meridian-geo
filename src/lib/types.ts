export type ServiceFamily = "seo" | "local" | "aeo" | "geo" | "field";

export type Service = {
  slug: string;
  name: string;
  family: ServiceFamily;
  alsoCalled: string[];
  summary: string;
  problem: string;
  promise: string;
  method: string[];
  deliverables: string[];
  outcomes: string[];
  whoFor: string;
  ymyl: boolean;
};

export type Location = {
  slug: string;
  name: string;
  country: string;
  countryCode: string;
  continent: string;
  region: string;
  population: string;
  languages: string[];
  currency: string;
  industries: string[];
  searchLanguage: string;
  lat: number;
  lng: number;
};

export type Industry = {
  slug: string;
  name: string;
  ymyl: boolean;
  buyer: string;
  risk: string;
  queryExamples: string[];
  proof: string;
};

export type Topic = {
  slug: string;
  title: string;
  angle: "how-to" | "explainer" | "checklist" | "field" | "comparison";
  summary: string;
  questions: string[];
};

export type Author = {
  slug: string;
  name: string;
  role: string;
  credentials: string;
  bio: string;
  focus: string[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ContentSection = {
  heading: string;
  paragraphs: string[];
};

export type LandingPage = {
  service: Service;
  location: Location;
  title: string;
  description: string;
  h1: string;
  lede: string;
  sections: ContentSection[];
  deliverables: string[];
  faqs: FaqItem[];
  author: Author;
  reviewer: Author;
  updated: string;
  image: string;
};

export type BlogArticle = {
  slug: string;
  topic: Topic;
  industry: Industry;
  location: Location;
  title: string;
  description: string;
  h1: string;
  lede: string;
  sections: ContentSection[];
  faqs: FaqItem[];
  author: Author;
  reviewer: Author;
  published: string;
  updated: string;
  readingMinutes: number;
  image: string;
  sources: { label: string; href: string }[];
};
