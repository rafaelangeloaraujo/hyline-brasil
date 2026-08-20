UPDATE site_content
SET content_json = json_set(content_json, '$.articles', json('[{"title":"Gen\u00e9tica de postura e adapta\u00e7\u00e3o ao Brasil","category":"Gen\u00e9tica","date":"2026-08-11","summary":"Uma leitura sobre como sele\u00e7\u00e3o gen\u00e9tica, sanidade e acompanhamento t\u00e9cnico precisam conversar com as condi\u00e7\u00f5es reais de produ\u00e7\u00e3o no pa\u00eds.","url":"#"}]')),
updated_by = 'cloudflare-update',
updated_at = CURRENT_TIMESTAMP
WHERE content_key = 'main';
