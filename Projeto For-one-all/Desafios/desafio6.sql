SELECT MIN(p.value) AS faturamento_minimo, 
MAX(p.value) AS faturamento_maximo,
ROUND(AVG(p.value), 2) AS faturamento_medio,
SUM(p.value) AS faturamento_total
FROM SpotifyClone.usuario AS u
INNER JOIN SpotifyClone.planos AS p
ON u.id_plano = p.id_plano;