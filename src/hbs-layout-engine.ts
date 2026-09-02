import { join } from 'path';
import hbs = require('hbs');

/**
 * hbs (pillarjs) has no built-in layout inheritance, so every view is
 * rendered twice: once for the page content, then again wrapped inside
 * views/layouts/main.hbs (received as the `body` variable).
 */
export function hbsLayoutEngine(viewsDir: string) {
  const express = (hbs as any).__express as (
    filePath: string,
    options: any,
    callback: (err: Error | null, html?: string) => void,
  ) => void;

  return (filePath: string, options: any, callback: (err: any, html?: string) => void) => {
    // Note: hbs (pillarjs) has its own native `options.layout` handling that resolves
    // relative to the base views dir (not views/layouts/), so we use a differently-named
    // option here to avoid colliding with it.
    express(filePath, options, (err, html) => {
      if (err) return callback(err);
      if (options.layout === false) return callback(null, html);

      const layoutName = typeof options.layoutName === 'string' ? options.layoutName : 'main';
      const layoutFile = join(viewsDir, 'layouts', `${layoutName}.hbs`);
      express(
        layoutFile,
        { ...options, body: new (hbs as any).SafeString(html) },
        callback,
      );
    });
  };
}
