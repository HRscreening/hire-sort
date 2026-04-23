import {
  createRouter,
  createRootRoute,
  createRoute,
  RouterProvider,
  Outlet,
} from "@tanstack/react-router";
import LandingPage from "@/pages/home/index";
import ContactUsPage from "@/pages/home/contactUs";
import AboutPage from "@/pages/home/about";
import PrivacyPolicyPage from "@/pages/home/privacy";
import FaqPage from "@/pages/home/faq";
import TermsPage from "@/pages/home/terms";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
// ─── Layouts ────────────────────────────────────────────────

function RootLayout() {
  return <Outlet />;
}



function PublicLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>

  );
}

// ─── Route tree ─────────────────────────────────────────────

const rootRoute = createRootRoute({ component: RootLayout });

const publicLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "public",
  component: PublicLayout,
});

const landingRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/",
  component: LandingPage,
});


const contactUsRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/contact_us",
  component: ContactUsPage,
});

const aboutUsRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/about",
  component: AboutPage,
});

const privacyRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/privacy",
  component: PrivacyPolicyPage,
});

const faqRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/faq",
  component: FaqPage,
});

const termsRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/terms",
  component: TermsPage,
});

// ─── Build router ───────────────────────────────────────────

const routeTree = rootRoute.addChildren([
  publicLayoutRoute.addChildren([
    landingRoute,
    contactUsRoute,
    privacyRoute,
    aboutUsRoute,
    faqRoute,
    termsRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// ─── App ────────────────────────────────────────────────────

export function App() {
  return <RouterProvider router={router} />;
}
