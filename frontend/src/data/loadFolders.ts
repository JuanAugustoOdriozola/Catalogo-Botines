const files = import.meta.glob('../assets/**/*.{jpeg,jpg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

export interface FolderVariant {
  id: string;
  label: string;
  images: string[]; // [portada, ...vistas]
}

const pretty = (slug: string) =>
  slug
    .replace(/^\d+[-_ ]*/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase()) || slug;

export function loadFolderVariants(folder: string): FolderVariant[] {
  const root = `../assets/${folder}/`;
  const groups = new Map<string, [string, string][]>();

  for (const [path, url] of Object.entries(files)) {
    if (!path.startsWith(root)) continue;
    const [slug, file, ...extra] = path.slice(root.length).split('/');
    if (!file || extra.length) continue;

    const list = groups.get(slug) ?? [];
    list.push([file.toLowerCase(), url]);
    groups.set(slug, list);
  }

  return [...groups.entries()]
    .sort((a, b) => a[0].localeCompare(b[0], undefined, { numeric: true }))
    .map(([slug, list]) => ({
      id: slug,
      label: pretty(slug),
      images: list
        .sort((a, b) => a[0].localeCompare(b[0], undefined, { numeric: true }))
        .map(([, url]) => url),
    }));
}