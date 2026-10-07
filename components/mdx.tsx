import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { YouTube } from './youtube';
import { Figure } from './figure';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    YouTube,
    Figure,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
