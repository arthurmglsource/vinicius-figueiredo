# Foto exata e fechamento conforme referência — 16/10/2026

## Resultado implementado

O fechamento usa obrigatoriamente o PNG anexado pelo usuário, confirmado por igualdade de bytes e SHA-256. A foto alternativa foi retirada do retrato. Mantidos rosto, pose, cadeira, mãos, proporção e pixels do arquivo aprovado.

A referência de composição tem 1672×941. Foram refinados posição/escala do plano fotográfico, alinhamento do texto, tamanho da headline, apoio e CTA. O tampo acompanha a perspectiva da referência, sem o recorte vertical anterior, e termina na divisória superior do footer. A Apple é o detalhe real do notebook extraído por janela SVG do material original existente, não uma marca desenhada. Detalhes em `CLOSING-ASSET.md`.

O footer oficial não foi redesenhado: HTML, conteúdo, grid, tipografia, links, crédito MGL e direitos continuam iguais ao início desta solicitação. O código das seções anteriores também é idêntico. Contato e destinos de navegação preservados.

## QA visual

Viewports CSS: 1672×941, 1440×810, 1280×720, 1024×768, 768×1024, 430×932, 393×852 e 390×844, no Chromium integrado. Retrato original, Apple, mesa, rosto, leitura do texto e integração ao footer revisados desktop/tablet/mobile.

- 24 estados de composição, transição e footer; oito composições finais repetidas com layout estabilizado.
- Zero overflow horizontal, imagens quebradas, erros capturados pela página ou triggers duplicados.
- Mesa termina no limite inferior da cena em todos os tamanhos, diferença 0px.
- Cena e footer se encontram; apenas arredondamento de 0,138px na posição de pin em 1440px. Não há área vazia ou pin-spacing extra.
- Scrub 0/50/100%, retorno a 50/0% e novo avanço a 100% confirmados em 1440×810 e 390×844, com um único pin.
- Movimento reduzido e bibliotecas ausentes: zero pins/triggers, composição em fluxo, sem overflow ou erros. A entrada agrupada mantém o detalhe do notebook preso à fotografia.
- 51 regressões de lógica aprovadas; sintaxe JS, links, âncoras, HTTP, assets, dimensões e escopo validados.

Evidências em `../closing-reference-qa/`: `composition-verified.json`, `motion-verified.json`, `matrix-final.json`, `scope-and-exact-photo.json`, screenshots de cada largura e resultado das regressões. As leituras iniciais de progresso anteriores ao refresh ficaram preservadas em `motion-and-fallback.json`; as verificações sincronizadas estão em `motion-verified.json`.

São viewports de computador, sem teste em iPhone físico. Esta rodada não é apresentada como uma nova validação Safari nativo. Não houve deploy ou publicação.

## Arquivos

Produção: `dist/index.html`, `dist/styles.css`, `dist/app.js`, `dist/assets/asset-provenance.json`. Nenhum PNG alterado.

Regressão: `tests/motion-regression.cjs`, apenas o alvo da entrada agrupada. Documentação: `README.md`, `CLOSING-ASSET.md`, `QA.md` e este relatório. Suporte local fora do site em `../../work/closing-reference/`.
