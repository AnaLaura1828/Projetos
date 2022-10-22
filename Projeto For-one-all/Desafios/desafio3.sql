SELECT u.user AS usuario, COUNT(h.id_usuario) AS qt_de_musicas_ouvidas,
ROUND(SUM(c.segundos / 60), 2) AS total_minutos
FROM SpotifyClone.usuario AS u
INNER JOIN SpotifyClone.historico AS h
ON u.id_usuario = h.id_usuario
INNER JOIN SpotifyClone.cancoes AS c
ON h.id_cancao = c.id_cancao
GROUP BY u.id_usuario
ORDER BY u.user;