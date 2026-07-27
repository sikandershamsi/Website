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
    express(filePath, options, (err, html) => {
      if (err) return callback(err);
      if (options.layout === false) return callback(null, html);

      const layoutFile = join(viewsDir, 'layouts', 'main.hbs');
      express(
        layoutFile,
        { ...options, body: new (hbs as any).SafeString(html) },
        callback,
      );
    });
  };
}
