UPDATE site_content
SET content_json = json_set(
  json_set(content_json, '$.articles', json('[{"title":"Gen\u00e9tica de postura e adapta\u00e7\u00e3o ao Brasil","category":"Gen\u00e9tica","date":"2026-08-11","summary":"Uma leitura sobre como sele\u00e7\u00e3o gen\u00e9tica, sanidade e acompanhamento t\u00e9cnico precisam conversar com as condi\u00e7\u00f5es reais de produ\u00e7\u00e3o no pa\u00eds.","url":"#"},{"title":"Indicadores de manejo que merecem aten\u00e7\u00e3o no lote","category":"Manejo","date":"2026-08-11","summary":"Consumo, uniformidade, peso corporal, viabilidade e qualidade de ovos ajudam a orientar decis\u00f5es t\u00e9cnicas ao longo do ciclo.","url":"#"},{"title":"Bem-estar animal como rotina de produ\u00e7\u00e3o","category":"Bem-estar animal","date":"2026-08-11","summary":"Ambi\u00eancia, nutri\u00e7\u00e3o, sanidade e equipe treinada formam uma base pr\u00e1tica para um manejo mais consistente.","url":"#"}]')),
  '$.seo.pages.artigos', json('{"title":"Artigos | Hy-Line do Brasil","description":"Artigos t\u00e9cnicos e institucionais da Hy-Line do Brasil sobre gen\u00e9tica de postura, manejo, sanidade, mercado e produ\u00e7\u00e3o de ovos.","canonical":"/artigos.php","keywords":"artigos Hy-Line, avicultura de postura, manejo de poedeiras, gen\u00e9tica de postura"}')
),
updated_by = 'cloudflare-update',
updated_at = CURRENT_TIMESTAMP
WHERE content_key = 'main';
