import { serveDir } from "https://deno.land/std@0.224.0/http/file_server.ts";

Deno.serve(async (req: Request) => {
  const pathname = new URL(req.url).pathname;
  
  // Handle SPA routing - serve index.html for non-asset requests
  if (!pathname.startsWith('/assets/') && !pathname.includes('.')) {
    try {
      const indexFile = await Deno.readFile('./dist/index.html');
      return new Response(indexFile, {
        headers: {
          'content-type': 'text/html; charset=utf-8',
        },
      });
    } catch {
      // Fallback to regular file serving
    }
  }
  
  return serveDir(req, {
    fsRoot: "dist",
    urlRoot: "",
    showDirListing: false,
    enableCors: true,
  });
});