# Roteiro visual — sequência recebida em 03/10/2026

Prioridade: pedido escrito > sequência dos anexos > Vooban > implementação existente.
Hero e foto aprovadas preservadas. Não usar marcas, textos ou fotos da Vooban.

| Print | Seção | Comportamento / decisão | Item |
|---|---|---|---|
| 01 | Especialidades / contexto | Remover integralmente imagem de dashboard e texto associado, sem remover os serviços | 1 |
| 02 | Serviços atuais | Estado antes da interação; conservar os quatro serviços | 2 |
| 03 | Serviços / referência | Rabisco ciano desenhado atrás do título; botão de seta branco; hover, foco e toque | 2 |
| 04 | Abordagem atual | Ponto de partida do painel escuro | 3 |
| 05 | Abordagem inicial | Cartão estreito central com metadados, tracejado e título recortado | 3 |
| 06 | Abordagem intermediária | Expansão horizontal e vertical progressiva; título se revela junto do círculo | 3 |
| 07 | Abordagem final | Painel amplo, raios laterais, título, texto e CTA legíveis | 3 |
| 08 | Método atual | Etapa 01; falta arco visual significativo | 4 |
| 09 | Método referência 01 | Desenho horário a partir de 12h; primeira etapa e arco de aproximadamente 1/4 | 4 |
| 10 | Método referência 03 | Mesma cena fixa, arco de aproximadamente 3/4 e texto da etapa 03 | 4 |
| 11 | Plano atual | Quatro pares número / conteúdo | 5 |
| 12 | Plano referência início | Cards deslocados à direita, números grandes, espaços mínimos | 5 |
| 13 | Plano referência avanço | Pares se deslocam à esquerda no scroll, com defasagem por linha | 5 |
| 14 | Clientes atuais | Retirar oito empresas fictícias; apenas empresas e logos verificadas | 6 |
| 15 | Sistemas em escala | Remover somente bloco bitmap com barras; preservar diagrama e texto de Sistemas | 7 |
| 16 | Números atuais | Valores 4 / 6 / 24/7; substituir raster fraco por composição nítida e em camadas | 8 |
| 17 | Números referência | Grandes números em máscara, pilhas com profundidade, parallax e abertura pelo botão + | 8 |
| 18 | Sobre atual | Remover composição atual com imagens do Vinicius; substituir por Missão, Visão e Valores | 9 |
| 19 | Fechamento inicial | Nome completo monumental antes do CTA | 11 |
| 20 | Fechamento avançado | Nome abre para as laterais e revela quadro central; saída fluida para CTA | 11 |

Item 10 não tem print próprio nesta sequência. Usar apenas estrutura observada em Valores da página /a-propos (composição editorial e cartões grandes em sequência), adaptada aos princípios existentes; não transplantar o relógio, rabisco de serviços nem fechamento.

## Auditoria inicial do código
- Abertura atual é máscara breve independente da entrada de título; precisa de uma linha de tempo única.
- Arco do método começa em zero e conteúdo não possui índice em cápsula.
- Plano usa animação de entrada, sem progressão horizontal no scroll.
- Números usam raster achatado, contador temporal e tilt; pilhas não têm camadas reais.
- Clientes são oito marcas não verificadas.
- Blocos a remover têm seletores próprios (.expertise-context, .systems-scale, #vinicius).
- GSAP / ScrollTrigger / SplitText / Lenis locais, matchMedia, limpeza e preferência de movimento reduzido existentes.

## Referências consultadas
https://vooban.com/
https://vooban.com/approche
https://vooban.com/a-propos

## Resultado da retomada

Implementação e auditoria local registradas em `QA.md`. Marcas fictícias removidas. Pedido de 4/10 forneceu seis experiências reais, integradas como trajetória profissional na nova seção Experiências; fontes em EXPERIENCE-ASSETS.md. Sem publicação.
