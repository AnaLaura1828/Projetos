SELECT art.artista_name AS artista,
alb.album_name AS album
FROM SpotifyClone.artista AS art,
SpotifyClone.albums AS alb
WHERE art.artista_name = 'Elis Regina' AND art.artista_id =
alb.artista_id
ORDER BY album ASC;