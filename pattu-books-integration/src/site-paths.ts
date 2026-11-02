// Internal React routes remain /learn/...; only browser/resource URLs get the host prefix.
export const siteBase = import.meta.env.BASE_URL.replace(/\/learn\/$/, '').replace(/\/$/, '');
export const siteUrl = (path:string) => siteBase + path;
