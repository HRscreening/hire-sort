import {
  createRouter,
  createRootRoute,
  createRoute,
  RouterProvider,
  Outlet,
} from "@tanstack/react-router";
import LandingPage from "@/pages/home/index";
import ContactUsPage from "@/pages/home/contactUs";

// ─── Layouts ────────────────────────────────────────────────

function RootLayout() {
  return <Outlet />;
}


// ─── Route tree ─────────────────────────────────────────────

const rootRoute = createRootRoute({ component: RootLayout });

const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

const contactUsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact_us",
  component: ContactUsPage,
});

// ─── Build router ───────────────────────────────────────────

const routeTree = rootRoute.addChildren([
  landingRoute,
  contactUsRoute
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
