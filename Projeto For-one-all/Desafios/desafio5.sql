SELECT c.cancao_name AS cancao, COUNT(h.id_usuario) AS reproducoes
FROM SpotifyClone.historico AS h
INNER JOIN SpotifyClone.cancoes AS c
ON h.id_cancao = c.id_cancao
GROUP BY cancao
ORDER BY reproducoes DESC, cancao ASC
LIMIT 2;