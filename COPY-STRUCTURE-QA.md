# Copy e estrutura — 20/10/2026

## Implementação

- Headline e apoio da hero substituídos pela copy exata fornecida.
- Categorias, títulos e descrições dos quatro cards substituídos integralmente; grid 2×2 preservado. Ajustes locais de font-size, line-height e padding para acomodar os textos maiores.
- Informação essencial da hero visível também no mobile, preservando o retrato e os quatro elementos da animação de entrada.
- “Na prática” e a sequência de indicadores dos prints 3/4 pertenciam ao mesmo `#pillars`. O bloco foi removido do DOM, junto com estilos, listeners, timelines e os três SVGs exclusivos (`media-panel.svg`, `crm-panel.svg`, `automation-panel.svg`).
- Sistemas se conecta diretamente a Experiências, sem altura residual.

## Validação

- `node tests/motion-regression.cjs`: 51 verificações aprovadas. Incluem WhatsApp, navegação, menu, método, roadmap, final reveal, mudanças de breakpoint, reduced motion e fallback sem bibliotecas.
- `node --check dist/app.js` e `git diff --check`: aprovados.
- Copy exata validada automaticamente contra o pedido; 8 seções e 12 CTAs oficiais. Âncoras internas válidas; destinos externos preservados sem envio de mensagens.
- Conferência no navegador: 1920×1080, 1440×810, 1280×720, 1024×768, 768×1024, 430×932, 390×844, 320×740. Sem overflow horizontal ou de conteúdo dos cards. Distância entre Sistemas e Experiências: 0px. Sem nós ou triggers do bloco removido; permanece apenas o pin existente do fechamento.
- Preview principal em 54563: console sem erros ou warnings; nenhuma imagem quebrada. O painel temporário de comparação acumulou dois erros de MutationObserver e uma requisição de imagem durante trocas de documentos; esses registros não se reproduziram no preview principal limpo, cuja imagem foi verificada carregada.
- Abertura da logo, transição e composição final conferidas visualmente; código e estilos dessas áreas permanecem idênticos à base.

## Auditoria de escopo

Backup e relatório em `../../work/copy-structure-20261020/`. Comparação normalizada de HTML, JavaScript e CSS confirma somente as substituições e remoções solicitadas. Os outros 38 arquivos de distribuição são idênticos por SHA-256, incluindo fotografias, vendors, config, favicon, metadados e SEO. Header, menu, CTAs, footer, método, roadmap, experiências e animação final preservados. Nenhum deploy ou publicação.

Capturas e medições: `../copy-structure-20261020-qa/` (`hero-*.jpg`, `cards-*.jpg`, `cards-bottom-*.jpg`, `matrix-final.json`, `before-reports.json` e capturas da abertura final).
