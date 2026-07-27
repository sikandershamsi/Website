import { renderIcon } from './icons';

type HbsLike = {
  registerHelper: (name: string, fn: (...args: any[]) => any) => void;
};

export function registerHelpers(hbsInstance: unknown) {
  const hbs = hbsInstance as HbsLike & { SafeString: new (str: string) => unknown };
  hbs.registerHelper('icon', (name: string, className?: string) =>
    new hbs.SafeString(renderIcon(name, typeof className === 'string' ? className : undefined)),
  );
  hbs.registerHelper('eq', (a: unknown, b: unknown) => a === b);
  hbs.registerHelper('gt', (a: number, b: number) => a > b);
  hbs.registerHelper('currency', (value: number) =>
    typeof value === 'number' ? `$${value.toFixed(2)}` : value,
  );
  hbs.registerHelper('year', () => new Date().getFullYear());
  hbs.registerHelper('pick', (obj: Record<string, unknown>, key: string) => obj?.[key]);
  hbs.registerHelper('array', (...args: unknown[]) => args.slice(0, -1));
  hbs.registerHelper(
    'ifCond',
    function (this: unknown, a: unknown, b: unknown, options: any) {
      return a === b ? options.fn(this) : options.inverse(this);
    },
  );
}
