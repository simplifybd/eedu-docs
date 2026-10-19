import type { ReactNode } from 'react';

interface FigureProps {
  src: string;
  alt: string;
  caption?: ReactNode;
  credit?: string;
  wide?: boolean;
  priority?: boolean;
}

const NATIVE_SIZE: Record<string, { width: number; height: number }> = {
  '/images/docs/user-id-mapping.webp': { width: 860, height: 573 },
};

export function Figure({ src, alt, caption, credit, wide = true, priority = false }: FigureProps) {
  const { width, height } = NATIVE_SIZE[src] ?? { width: 1280, height: 714 };

  return (
    <figure className={`not-prose my-6 ${wide ? '' : 'mx-auto max-w-sm'}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        className="w-full h-auto rounded-xl border border-fd-border bg-fd-muted/30"
      />
      {caption || credit ? (
        <figcaption className="mt-2 text-center text-sm text-fd-muted-foreground">
          {caption}
          {credit ? (
            <span className="block text-xs opacity-80">{credit}</span>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
