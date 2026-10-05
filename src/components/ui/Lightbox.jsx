'use client';

import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';

/** Minimal image lightbox (replaces Fancybox). Rendered into <body> so ScrollSmoother transforms don't affect it. */
export default function Lightbox({ images, index, onChange, onClose }) {
  const count = images.length;
  const prev = useCallback(() => onChange((index - 1 + count) % count), [index, count, onChange]);
  const next = useCallback(() => onChange((index + 1) % count), [index, count, onChange]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next, onClose]);

  if (typeof document === 'undefined' || index == null) return null;
  const img = images[index];

  return createPortal(
    <div className="lmp-lightbox" role="dialog" aria-modal="true" aria-label="Image viewer" onClick={onClose}>
      <span className="lmp-lightbox__counter">
        {index + 1} / {count}
      </span>
      <figure className="lmp-lightbox__figure" onClick={(e) => e.stopPropagation()}>
        {/* Full-size originals vary in format and size, so a plain img keeps them untouched. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img.src} alt={img.alt || ''} />
      </figure>
      <button type="button" className="lmp-lightbox__close" aria-label="Close" onClick={onClose}>
        <i className="fa-solid fa-xmark" />
      </button>
      {count > 1 && (
        <>
          <button
            type="button"
            className="lmp-lightbox__prev"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
          >
            <i className="fa-solid fa-arrow-left" />
          </button>
          <button
            type="button"
            className="lmp-lightbox__next"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
          >
            <i className="fa-solid fa-arrow-right" />
          </button>
        </>
      )}
    </div>,
    document.body,
  );
}
