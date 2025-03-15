import {RenderMode, ServerRoute} from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Server
  },
  {
    path: 'login',
    renderMode: RenderMode.Client
  },
  {path: 'pages', renderMode: RenderMode.Client},
  {path: 'pages/content', renderMode: RenderMode.Client},
  {
    path: 'pages/content/home',
    renderMode: RenderMode.Server
  },
  {
    path: 'pages/content/footer-items/**',
    renderMode: RenderMode.Server
  },

  {
    path: 'pages/dashboard',
    renderMode: RenderMode.Client
  },
  // { path: "redirect", renderMode: RenderMode.Server, status: 301 },
  {
    path: "not_found",
    renderMode: RenderMode.Server,
    status: 404,
    headers: {
      "Cache-Control": "no-cache",
    },
  },
  {path: "**", renderMode: RenderMode.Server},
]
