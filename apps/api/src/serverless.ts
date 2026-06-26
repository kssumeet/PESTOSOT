import 'reflect-metadata';
import type { Express } from 'express';
import { createNestApp } from './app.factory';

let appPromise: Promise<Express> | null = null;

/**
 * Initialise the Nest app once and reuse it across warm serverless invocations.
 * Returns the underlying Express instance, which is a valid (req, res) handler.
 */
export function createServerlessApp(): Promise<Express> {
  if (!appPromise) {
    appPromise = createNestApp().then(async ({ app, expressApp }) => {
      await app.init();
      return expressApp;
    });
  }
  return appPromise;
}
