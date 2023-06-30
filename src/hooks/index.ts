
export function useUrl(): { origin: string; pathname: string, href: string; host: string; hostname: string; search: string} {
    const origin =
        typeof window !== 'undefined' ? window?.location?.origin : '';

    const pathname = typeof window !== 'undefined' ? window?.location?.pathname : '';

    const href = typeof window !== 'undefined' ? window?.location?.href : '';

    const host = typeof window !== 'undefined' ? window?.location?.host : '';

    const hostname = typeof window !== 'undefined' ? window?.location?.hostname : '';

    const search = typeof window !== 'undefined' ? window?.location?.search : '';

    return( {
        origin,
        pathname,
        href,
        host,
        hostname,
        search,
    });
}