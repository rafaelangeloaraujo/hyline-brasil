-- Adiciona Google Analytics no HEAD via painel/código personalizado.
-- Preserva códigos já existentes e evita duplicar a tag se ela já estiver cadastrada.
UPDATE site_content
SET content_json = CASE
  WHEN COALESCE(json_extract(content_json, '$.customCode.head'), '') LIKE '%G-0TRYTW12K1%' THEN content_json
  ELSE json_set(
    content_json,
    '$.customCode.head',
    trim(COALESCE(json_extract(content_json, '$.customCode.head'), '') || char(10) || char(10) || '<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-0TRYTW12K1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag(''js'', new Date());

  gtag(''config'', ''G-0TRYTW12K1'');
</script>')
  )
END,
updated_by = 'migration-google-analytics',
updated_at = CURRENT_TIMESTAMP
WHERE content_key = 'main';
