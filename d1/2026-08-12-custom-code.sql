UPDATE site_content
SET content_json = json_set(content_json, '$.customCode', json('{"head":"","bodyStart":"","bodyEnd":""}')),
updated_by = 'cloudflare-update',
updated_at = CURRENT_TIMESTAMP
WHERE content_key = 'main' AND json_type(content_json, '$.customCode') IS NULL;
