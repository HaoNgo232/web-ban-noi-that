import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface PageTransitionProps {
    readonly children: ReactNode;
    readonly className?: string;
}

/**
 * Page transition wrapper component
 * Provides smooth fade and slide animations when navigating between pages
 */
export function PageTransition({ children, className }: PageTransitionProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

