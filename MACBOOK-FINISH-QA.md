# Acabamento do MacBook e da mesa — 17/10/2026

Continuação cirúrgica do estado atual, sem reiniciar a composição.

## Correção

O contorno anterior da tampa incluía pixels de braço e camisa do PNG do notebook. O contorno do retrato/teclado incluía mesa original e avançava abaixo da nova tampa, criando faixas acima do notebook, uma ponta na base e pequenos degraus brancos no teclado.

Foram alterados somente os caminhos SVG `closing-person-crop` e `closing-notebook-crop`, além da versão de cache do HTML. O novo contorno segue as bordas fotográficas dos próprios PNGs: tampa separada sem o braço do asset de origem; mão e teclado do recorte enviado, sem pedaços da mesa antiga. A superfície da mesa continua sendo CSS.

## Preservação

Comparação automática com `work/macbook-finish/before/` no workspace externo:

- CSS: byte a byte idêntico.
- JavaScript/GSAP: byte a byte idêntico.
- Posição, tamanho e transformação do retrato e do notebook: idênticos.
- Conteúdo, layout e HTML do rodapé: idênticos.
- PNGs originais: preservados sem edição, recompressão ou geração.
- Nenhuma screenshot é renderizada na seção.

## Verificação

- 51 testes de comportamento aprovados em `node tests/motion-regression.cjs`.
- Verificador estático: arquivos, HTTP, âncoras e nove seções aprovados, incluindo ambos os PNGs usados pelas imagens SVG.
- Inspeção visual de desktop 1672×941, desktop amplo 1920×1080, tablet 768×1024, mobile 390×844 e 430×932.
- Inspeção ampliada da borda superior, mão/teclado, vértice inferior e encontro com a mesa.
- Sem erros de execução ou overflow horizontal nos relatórios registrados.
- Pin/scrub continuam ativos, com percurso de 170vh no desktop e 120vh no mobile.

Evidências no workspace externo: `outputs/macbook-finish-qa/desktop.jpg`, `macbook-detail.jpg`, capturas responsivas, `responsive-reports.json`, `integrity.json`, `motion-results.json` e `static-results.json`.

Sem publicação ou deploy. O destinatário de WhatsApp permanece pendente de número oficial; não foi modificado nesta correção.
