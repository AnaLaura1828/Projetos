SELECT art.artista_name AS artista,
alb.album_name AS album,
COUNT(seg.artista_id) AS seguidores
FROM SpotifyClone.artista AS art
INNER JOIN SpotifyClone.albums AS alb
ON art.artista_id = alb.artista_id
INNER JOIN SpotifyClone.seguidores AS seg
ON art.artista_id = seg.artista_id
GROUP BY artista, album
ORDER BY seguidores DESC, artista, album;