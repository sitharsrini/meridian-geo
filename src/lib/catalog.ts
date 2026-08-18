import { authorBySlug, authors, reviewer } from "@/lib/data/authors";
import { industries, industryBySlug } from "@/lib/data/industries";
import {
  BLOG_LOCATION_COUNT,
  blogLocations,
  locationBySlug,
  locations,
} from "@/lib/data/locations";
import { serviceBySlug, services } from "@/lib/data/services";
import { topicBySlug, topics } from "@/lib/data/topics";
import { pick } from "@/lib/hash";
import type { Author, Industry, Location, Service, Topic } from "@/lib/types";

export const SERVICE_COUNT = services.length;
export const LOCATION_COUNT = locations.length;
export const INDUSTRY_COUNT = industries.length;
export const TOPIC_COUNT = topics.length;
export const LANDING_COUNT = SERVICE_COUNT * LOCATION_COUNT;
export const BLOG_COUNT = TOPIC_COUNT * INDUSTRY_COUNT * BLOG_LOCATION_COUNT;

export { authorBySlug, authors, blogLocations, industries, locations, reviewer, services, topics };
export { industryBySlug, locationBySlug, serviceBySlug, topicBySlug };

export function authorFor(seed: string): Author {
  const pool = authors.filter((author) => author.slug !== reviewer.slug);
  return pick(pool, seed, 3);
}

export function nearbyLocations(location: Location, count = 4): Location[] {
  const sameCountry = locations.filter(
    (item) => item.country === location.country && item.slug !== location.slug,
  );
  const sameRegion = locations.filter(
    (item) =>
      item.region === location.region &&
      item.slug !== location.slug &&
      !sameCountry.some((city) => city.slug === item.slug),
  );
  const sameContinent = locations.filter(
    (item) =>
      item.continent === location.continent &&
      item.slug !== location.slug &&
      !sameCountry.some((city) => city.slug === item.slug) &&
      !sameRegion.some((city) => city.slug === item.slug),
  );
  return [...sameCountry, ...sameRegion, ...sameContinent].slice(0, count);
}

export function relatedServices(service: Service, count = 4): Service[] {
  const sameFamily = services.filter(
    (item) => item.family === service.family && item.slug !== service.slug,
  );
  const rest = services.filter(
    (item) => item.slug !== service.slug && item.family !== service.family,
  );
  return [...sameFamily, ...rest].slice(0, count);
}

export function landingAt(index: number): { service: Service; location: Location } {
  const location = locations[index % LOCATION_COUNT];
  const service = services[Math.floor(index / LOCATION_COUNT)];
  return { service, location };
}

export function landingIndex(serviceSlug: string, locationSlug: string): number {
  const serviceIndex = services.findIndex((item) => item.slug === serviceSlug);
  const locationIndex = locations.findIndex((item) => item.slug === locationSlug);
  return serviceIndex * LOCATION_COUNT + locationIndex;
}

export function getLanding(
  serviceSlug: string,
  locationSlug: string,
): { service: Service; location: Location } | null {
  const service = serviceBySlug(serviceSlug);
  const location = locationBySlug(locationSlug);
  if (!service || !location) return null;
  return { service, location };
}

export function blogAt(index: number): {
  topic: Topic;
  industry: Industry;
  location: Location;
} {
  const location = blogLocations[index % BLOG_LOCATION_COUNT];
  const industry = industries[Math.floor(index / BLOG_LOCATION_COUNT) % INDUSTRY_COUNT];
  const topic = topics[Math.floor(index / (BLOG_LOCATION_COUNT * INDUSTRY_COUNT))];
  return { topic, industry, location };
}

export function blogIndex(topicSlug: string, industrySlug: string, locationSlug: string): number {
  const topicIndex = topics.findIndex((item) => item.slug === topicSlug);
  const industryIndex = industries.findIndex((item) => item.slug === industrySlug);
  const locationIndex = blogLocations.findIndex((item) => item.slug === locationSlug);
  return (
    topicIndex * INDUSTRY_COUNT * BLOG_LOCATION_COUNT +
    industryIndex * BLOG_LOCATION_COUNT +
    locationIndex
  );
}

export function getBlog(
  topicSlug: string,
  industrySlug: string,
  locationSlug: string,
): { topic: Topic; industry: Industry; location: Location } | null {
  const topic = topicBySlug(topicSlug);
  const industry = industryBySlug(industrySlug);
  const location = blogLocations.find((item) => item.slug === locationSlug);
  if (!topic || !industry || !location) return null;
  return { topic, industry, location };
}

export function priorityLandings(limit = 80) {
  const topLocations = locations.slice(0, 8);
  const topServices = services.slice(0, 10);
  const pairs: { service: string; location: string }[] = [];
  for (const service of topServices) {
    for (const location of topLocations) {
      pairs.push({ service: service.slug, location: location.slug });
      if (pairs.length >= limit) return pairs;
    }
  }
  return pairs;
}

export function priorityBlogs(limit = 24) {
  const out: { topic: string; industry: string; location: string }[] = [];
  for (const topic of topics.slice(0, 4)) {
    for (const industry of industries.slice(0, 3)) {
      for (const location of blogLocations.slice(0, 2)) {
        out.push({
          topic: topic.slug,
          industry: industry.slug,
          location: location.slug,
        });
        if (out.length >= limit) return out;
      }
    }
  }
  return out;
}
