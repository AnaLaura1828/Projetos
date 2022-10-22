SELECT u.user AS usuario, IF(MAX(YEAR(h.data_jogo))>= '2021', 'Usuário ativo', 'Usuário inativo')
AS status_usuario
FROM SpotifyClone.usuario AS u
INNER JOIN SpotifyClone.historico AS h
ON u.id_usuario = h.id_usuario
GROUP BY u.user
ORDER BY u.user;