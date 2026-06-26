import type { IncomingMessage, ServerResponse } from "http";

// Vercel serverless entry. The Nest app is compiled by `nest build` into ../dist
// (tsc emits decorator metadata, which @vercel/node's bundler does not). We load
// the compiled module at runtime and forward the request to its Express app.
type Handler = (req: IncomingMessage, res: ServerResponse) => void;

let serverPromise: Promise<Handler> | null = null;

async function getServer(): Promise<Handler> {
  if (!serverPromise) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore — compiled output, present at deploy time (see vercel.json includeFiles)
    const mod = await import("../dist/serverless.js");
    serverPromise = mod.createServerlessApp() as Promise<Handler>;
  }
  return serverPromise;
}

export default async function handler(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const app = await getServer();
  app(req, res);
}
