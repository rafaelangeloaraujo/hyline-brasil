# Hy-Line Brasil

Versao enxuta para publicacao na Cloudflare Pages com Functions.

## Arquivos principais

- `_worker.js`: site, painel administrativo e backend.
- `index.html`: arquivo estatico base.
- `assets/`: imagens, CSS e JavaScript usados pelo site.

## Cloudflare

Depois de conectar este repositorio ao Cloudflare Pages, configure:

```txt
D1 binding name: DB
Database: hyline-site
```

E a variavel secreta:

```txt
ADMIN_SESSION_SECRET
```

O painel administrativo fica em:

```txt
/admin
```
