-- Conteudo da pagina Intranet e SEO.
-- Execute no D1 do Cloudflare depois de subir o novo _worker.js.

UPDATE site_content
SET content_json = json_set(
  json_set(content_json, '$.intranet', json('{"title":"Intranet Hy-Line do Brasil","intro":"Acesso r\u00e1pido aos ambientes internos, aplicativos e sistemas de apoio usados pela equipe Hy-Line do Brasil.","links":[{"title":"Aplicativo WEB - Desktop","category":"Sistema interno","description":"Acesso ao aplicativo web para uso em computadores e esta\u00e7\u00f5es de trabalho.","url":"https://hyline.com.br/pt_BR/intranet/"},{"title":"Aplicativos WEB - Mobile","category":"Sistema interno","description":"Acesso aos aplicativos web voltados para uso em celulares e tablets.","url":"https://hyline.com.br/pt_BR/intranet/"},{"title":"Agenda - Projetores","category":"Opera\u00e7\u00e3o interna","description":"Consulta e organiza\u00e7\u00e3o de agenda para uso de projetores e recursos internos.","url":"https://hyline.com.br/pt_BR/intranet/"},{"title":"Fluig","category":"Sistema interno","description":"Acesso ao ambiente Fluig utilizado para processos e rotinas internas.","url":"https://hyline.com.br/pt_BR/intranet/"},{"title":"Aplicativo de Granjas (Farm App)","category":"Opera\u00e7\u00e3o interna","description":"Atalho para ferramentas internas relacionadas \u00e0 rotina das granjas.","url":"https://hyline.com.br/pt_BR/intranet/"},{"title":"Poultry Su\u00edte","category":"Gest\u00e3o t\u00e9cnica","description":"Acesso ao ambiente de apoio t\u00e9cnico e operacional da plataforma Poultry Su\u00edte.","url":"https://hyline.com.br/pt_BR/intranet/"}]}')),
  '$.seo.pages.intranet', json('{"title":"Intranet | Hy-Line do Brasil","description":"Atalhos oficiais da Intranet Hy-Line do Brasil para sistemas internos, aplicativos, agenda e ferramentas de apoio operacional.","canonical":"/intranet.php","keywords":"intranet Hy-Line do Brasil, sistemas internos Hy-Line, aplicativos Hy-Line, Fluig Hy-Line, Farm App Hy-Line"}')
),
updated_by = 'migration-intranet',
updated_at = CURRENT_TIMESTAMP
WHERE content_key = 'main';
