# Três ajustes cirúrgicos — 16/10/2026

Escopo: composição final e mesa, sistema do CTA do header e retirada de traços da copy. Sem deploy ou publicação.

## Referências e foto

O pacote `vinicius_referencias_ajustes_finais.zip` contém `01_secao_final_foto_original.png` como referência principal: foto original com Apple visível, CTA de chat e mesa diagonal. Essa é a composição preservada. O arquivo `02_secao_final_variacao.png` mostra outra pose com notebook cortado, sem a Apple, CTA antigo e aviso de contato; essa variação não substitui o original principal.

O asset `vinicius-final-original.png` já corresponde ao print 01. Foi mantido sem qualquer alteração, assim como posição, escala, dimensão, enquadramento, áreas clara/azul, headline, CTA e composição mobile. Não se trocou o retrato por um asset diferente nem se redesenhou a Apple. Hash SHA-256: `7061f8bb101582ce50d6ef8c13d0ce126a722a5bf85b92d0f0088e5e958ed32d`.

A extensão CSS da superfície original da mesa foi conferida e preservada: diagonal de aproximadamente 58°, textura retirada da própria mesa, sem rasterização nova. Em todas as sete larguras, mesa, limite inferior da cena e linha superior do footer coincidem, com gap medido de 0px. Nenhuma mudança geométrica extra foi necessária.

## CTA do header

O header reutiliza `split-button`, `cream-button` e `primary-cta` com o símbolo `#chat`. Removidos os estilos exclusivos de pill arredondada, fonte Inter, largura fixa e hover diferente. Tokens compartilhados definem família monospace, peso 700, tracking, raio 7px, padding, tamanho dos ícones, tempo de transição .25s e easing já aprovado.

O CTA “Quero conectar minha operação” manteve suas dimensões e aparência. O header usa o mesmo tamanho de fonte e altura de linha do texto para produzir altura idêntica, preservando largura conforme o conteúdo. Menu, links, logo e regras de exibição mobile continuam iguais.

| Largura | Altura do header CTA | Altura do CTA de Sistemas | Padding da label | Raio |
|---|---:|---:|---|---:|
| 1440 | 59.023px | 59.023px | 20.16px 28.8px | 7px |
| 1280 | 52.461px | 52.461px | 17.92px 25.6px | 7px |
| 1024 | 55.594px | 55.594px | 20px 25px | 7px |

Família, tamanho, peso, tracking, transições e dimensões do ícone também coincidem em cada tamanho. Até 768px o CTA continua oculto conforme o header mobile aprovado.

## Copy

Varredura de todos os nós textuais HTML, incluindo conteúdo fora da viewport, menus, hover, títulos, alt e aria-label: zero ocorrências de hífen, en dash ou em dash. Pontuação reescrita semanticamente. Exemplos:

- “fechamento — e vê onde agir” → “fechamento e vê onde agir”.
- “follow-ups” → “retomadas”, com concordância ajustada.
- “antes de usá-los” → “antes de usar a solução”.
- Datas com intervalo agora usam “a”; vínculo atual usa “até hoje”.
- “Consultor de Projetos — Supply Chain” → “Consultor de Projetos: Supply Chain”.
- “CONECTE-SE” → “CONEXÕES”.
- URL exibida do LinkedIn → “Perfil no LinkedIn”; destino real preservado integralmente.

Nenhuma URL, ID, telefone, nome de arquivo ou atributo de código foi alterado para remover hífens. Somente o identificador de cache CSS/JS mudou. Arquivos `app.js` e `config.js` idênticos em bytes ao início desta solicitação.

## QA

Chromium integrado: 1440×810, 1280×720, 1024×768, 768×1024, 430×932, 393×852 e 390×844; 35 estados de home, Sistemas, Experiências, fechamento e footer. Zero overflow horizontal, imagens quebradas, erros registrados pelo site, traços na copy ou triggers duplicados. Retrato e Apple revisados desktop/mobile. Header validado visualmente e por estilos computados.

51 regressões de lógica aprovadas. HTML, assets, HTTP, dimensões, âncoras e destinos validados. Hero HTML idêntica à versão anterior. Geometria CSS da foto, fundo, mesa e CTA final idêntica. As animações GSAP/ScrollTrigger não foram alteradas. A repetição final acrescentou 16 estados desktop/mobile após a última limpeza de classes, também sem problemas do site. Console do preview de produção: zero erros/avisos. No wrapper local de QA, a integração registrou duas exceções de `MutationObserver.observe`; esse código não existe em nenhum arquivo entregue e o monitor de erros da própria página permaneceu vazio. O erro do wrapper não foi ocultado nem atribuído ao site.

Safari nativo foi tentado nesta rodada, mas o controle foi interrompido por mudanças de estado enquanto o aplicativo estava sendo utilizado. Esta rodada não é apresentada como uma nova validação Safari concluída; o registro Safari da etapa anterior continua histórico. Mobile foi testado em viewports CSS, sem aparelho físico.

Evidências: `../three-adjustments-qa/` contém matriz JSON, capturas, resultado das 51 regressões e `static-and-visual-proof.json`. Instrumentação e snapshots em `../../work/three-adjustments/`, fora do site.

Arquivos de produção alterados nesta solicitação: somente `dist/index.html` e `dist/styles.css`. Documentação: este relatório e o registro em `QA.md`.
