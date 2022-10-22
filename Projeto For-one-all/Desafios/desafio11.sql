SELECT c.cancao_name AS nome_musica,
CASE 
 WHEN cancao_name LIKE '%Bard%' THEN REPLACE(cancao_name, 'Bard', 'QA')
 WHEN cancao_name LIKE 	'%Amar%' THEN REPLACE(cancao_name, 'Amar', 'Code Review')
 WHEN cancao_name LIKE '%Pais' THEN REPLACE(cancao_name, 'Pais', 'Pull Requests')
 WHEN cancao_name LIKE '%SOUL' THEN REPLACE(cancao_name, 'SOUL', 'CODE')
 WHEN cancao_name LIKE '%SUPERSTAR' THEN REPLACE(cancao_name, 'SUPERSTAR', 'SUPERDEV')
END AS novo_nome
FROM SpotifyClone.cancoes AS c
HAVING cancao_name <> novo_nome
ORDER BY cancao_name DESC;