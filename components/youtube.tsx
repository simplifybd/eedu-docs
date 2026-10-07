import type { ReactNode } from 'react';

interface YouTubeProps {
  id: string;
  title?: string;
  caption?: ReactNode;
}

export function YouTube({ id, title = 'Video guide', caption }: YouTubeProps) {
  return (
    <figure className="not-prose my-6">
      <div className="overflow-hidden rounded-xl border border-fd-border bg-fd-muted/40">
        <div className="relative aspect-video">
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${id}`}
            title={title}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
      {caption ? (
        <figcaption className="mt-2 text-center text-sm text-fd-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
