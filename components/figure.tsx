import type { ReactNode } from 'react';

interface FigureProps {
  src: string;
  alt: string;
  caption?: ReactNode;
  credit?: string;
  wide?: boolean;
}

export function Figure({ src, alt, caption, credit, wide = true }: FigureProps) {
  return (
    <figure className={`not-prose my-6 ${wide ? '' : 'mx-auto max-w-sm'}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full rounded-xl border border-fd-border bg-fd-muted/30"
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
