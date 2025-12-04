import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { RootLayout } from "@/components/layout/RootLayout";
import { ProtectedRoute } from "@/components/routes/ProtectedRoute";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

// Lazy load pages for code splitting
// Using dynamic import with named exports converted to default
const HomePage = lazy(() =>
    import("@/features/home/HomePage").then((module) => ({
        default: module.HomePage,
    })),
);
const ProductsPage = lazy(() =>
    import("@/features/products/ProductsPage").then((module) => ({
        default: module.ProductsPage,
    })),
);
const ProductDetailPage = lazy(() =>
    import("@/features/products/ProductDetailPage").then((module) => ({
        default: module.ProductDetailPage,
    })),
);
const CartPage = lazy(() =>
    import("@/features/cart/CartPage").then((module) => ({
        default: module.CartPage,
    })),
);
const CheckoutPage = lazy(() =>
    import("@/features/checkout/CheckoutPage").then((module) => ({
        default: module.CheckoutPage,
    })),
);
const OrderConfirmationPage = lazy(() =>
    import("@/features/checkout/OrderConfirmationPage").then((module) => ({
        default: module.OrderConfirmationPage,
    })),
);
const LoginPage = lazy(() =>
    import("@/features/auth/LoginPage").then((module) => ({
        default: module.LoginPage,
    })),
);
const RegisterPage = lazy(() =>
    import("@/features/auth/RegisterPage").then((module) => ({
        default: module.RegisterPage,
    })),
);
const ProfilePage = lazy(() =>
    import("@/features/profile/ProfilePage").then((module) => ({
        default: module.ProfilePage,
    })),
);
const CollectionsPage = lazy(() =>
    import("@/features/collections/CollectionsPage").then((module) => ({
        default: module.CollectionsPage,
    })),
);
const CollectionDetailPage = lazy(() =>
    import("@/features/collections/CollectionDetailPage").then((module) => ({
        default: module.CollectionDetailPage,
    })),
);

// Loading fallback component
function PageLoader() {
    return (
        <div className="container flex items-center justify-center min-h-[400px]">
            <LoadingSpinner size="lg" />
        </div>
    );
}

// Wrapper component for lazy-loaded pages with Suspense
function LazyPage({ children }: { readonly children: React.ReactNode }) {
    return (
        <ErrorBoundary>
            <Suspense fallback={<PageLoader />}>{children}</Suspense>
        </ErrorBoundary>
    );
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: (
                    <LazyPage>
                        <HomePage />
                    </LazyPage>
                ),
            },
            {
                path: "products",
                element: (
                    <LazyPage>
                        <ProductsPage />
                    </LazyPage>
                ),
            },
            {
                path: "products/:id",
                element: (
                    <LazyPage>
                        <ProductDetailPage />
                    </LazyPage>
                ),
            },
            {
                path: "cart",
                element: (
                    <LazyPage>
                        <CartPage />
                    </LazyPage>
                ),
            },
            {
                path: "login",
                element: (
                    <LazyPage>
                        <LoginPage />
                    </LazyPage>
                ),
            },
            {
                path: "register",
                element: (
                    <LazyPage>
                        <RegisterPage />
                    </LazyPage>
                ),
            },
            {
                path: "checkout",
                element: (
                    <ProtectedRoute>
                        <LazyPage>
                            <CheckoutPage />
                        </LazyPage>
                    </ProtectedRoute>
                ),
            },
            {
                path: "checkout/confirmation",
                element: (
                    <ProtectedRoute>
                        <LazyPage>
                            <OrderConfirmationPage />
                        </LazyPage>
                    </ProtectedRoute>
                ),
            },
            {
                path: "profile",
                element: (
                    <ProtectedRoute>
                        <LazyPage>
                            <ProfilePage />
                        </LazyPage>
                    </ProtectedRoute>
                ),
            },
            {
                path: "collections",
                element: (
                    <LazyPage>
                        <CollectionsPage />
                    </LazyPage>
                ),
            },
            {
                path: "collections/:slug",
                element: (
                    <LazyPage>
                        <CollectionDetailPage />
                    </LazyPage>
                ),
            },
        ],
    },
]);

export function AppRouter() {
    return <RouterProvider router={router} />;
}

