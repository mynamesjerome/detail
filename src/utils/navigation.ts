import { animateScrollTo } from './scroll';

export interface RouteMapping {
  id: string;
  path: string;
  aliases: string[];
  title: string;
}

export const ROUTES: RouteMapping[] = [
  { id: 'hero', path: '/', aliases: [''], title: "Gavin's Car Detailing | Premier Mobile Detailing in Austin, TX" },
  { id: 'services', path: '/services', aliases: ['/services', '/packages'], title: "Detailing Packages | Gavin's Car Detailing" },
  { id: 'add-ons', path: '/addons', aliases: ['/addons', '/add-ons'], title: "Custom Add-Ons | Gavin's Car Detailing" },
  { id: 'gallery', path: '/gallery', aliases: ['/gallery', '/photos', '/showcase'], title: "Detailing Showcase & Gallery | Gavin's Car Detailing" },
  { id: 'maintenance', path: '/maintenance', aliases: ['/maintenance', '/membership'], title: "Maintenance Membership Program | Gavin's Car Detailing" },
  { id: 'reviews', path: '/reviews', aliases: ['/reviews', '/testimonials'], title: "Google Customer Reviews | Gavin's Car Detailing" },
  { id: 'service-area', path: '/service-area', aliases: ['/service-area', '/servicearea', '/coverage'], title: "Service Area & Radius | Gavin's Car Detailing" },
  { id: 'faq', path: '/faq', aliases: ['/faq', '/faqs', '/questions'], title: "Frequently Asked Questions | Gavin's Car Detailing" },
  { id: 'booking', path: '/book', aliases: ['/book', '/booking', '/quote', '/contact'], title: "Book Mobile Detail | Gavin's Car Detailing" },
];

export function getRouteByPath(pathname: string): RouteMapping {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  const found = ROUTES.find((r) => r.path === normalized || r.aliases.includes(normalized));
  return found || ROUTES[0];
}

export function getRouteById(sectionId: string): RouteMapping {
  const found = ROUTES.find((r) => r.id === sectionId);
  return found || ROUTES[0];
}

export function scrollToSection(sectionIdOrPath: string, updateUrl = true, duration = 850) {
  let route: RouteMapping | undefined;

  if (sectionIdOrPath.startsWith('/')) {
    route = getRouteByPath(sectionIdOrPath);
  } else {
    route = getRouteById(sectionIdOrPath);
  }

  if (route.id === 'hero' || route.path === '/') {
    if (updateUrl && window.location.pathname !== '/') {
      window.history.pushState({ section: 'hero' }, '', '/');
      document.title = route.title;
    }
    animateScrollTo(0, duration);
    return;
  }

  const el = document.getElementById(route.id);
  if (el) {
    const headerOffset = 75;
    const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = Math.max(0, elementPosition - headerOffset);

    if (updateUrl && window.location.pathname !== route.path) {
      window.history.pushState({ section: route.id }, '', route.path);
      document.title = route.title;
    }

    animateScrollTo(offsetPosition, duration);
  }
}
