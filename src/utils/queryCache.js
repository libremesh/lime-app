import { QueryClient } from "@tanstack/react-query";

const queryCache = new QueryClient({
    defaultConfig: {
        queries: {
            staleTime: Infinity,
            refetchOnMount: false,
            retry: 0,
        },
    },
    logger: {
        log: console.log,
        warn: console.warn,
        // ✅ no more errors on the console for tests
        error: process.env.NODE_ENV === "test" ? () => {} : console.error,
    },
});

export default queryCache;
