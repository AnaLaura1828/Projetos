SELECT c.cancao_name AS nome,
COUNT(h.id_cancao) AS reproducoes
FROM SpotifyClone.cancoes AS c
INNER JOIN SpotifyClone.historico AS h
ON h.id_cancao = c.id_cancao
INNER JOIN SpotifyClone.usuario AS u
ON h.id_usuario = u.id_usuario
WHERE u.id_plano = 1 OR u.id_plano = 4
GROUP BY nome
ORDER BY nome;