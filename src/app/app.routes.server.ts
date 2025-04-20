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
  {
    path: 'pages/content/**',
    renderMode: RenderMode.Server
  },
  {
    path: 'pages/dashboard/**',
    renderMode: RenderMode.Client
  },
  {
    path: 'pages/checkout/**',
    renderMode: RenderMode.Server
  },
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
