import {
  createRouter,
  createRootRoute,
  createRoute,
  RouterProvider,
  Outlet,
} from "@tanstack/react-router";
import LandingPage from "@/pages/home/index";
import ContactUsPage from "@/pages/home/contactUs";
import PrivacyPolicyPage from "@/pages/home/privacy";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { div } from "framer-motion/client";
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

const privacyRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/privacy",
  component: PrivacyPolicyPage,
});

// ─── Build router ───────────────────────────────────────────

const routeTree = rootRoute.addChildren([
  publicLayoutRoute.addChildren([landingRoute, contactUsRoute, privacyRoute]),
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
