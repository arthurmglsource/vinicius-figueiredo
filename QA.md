# Verificação — Vinicius Figueiredo

Registro histórico de 2 de outubro de 2026, seguido das revisões de 3/10. A auditoria da versão atual está no último bloco; os registros anteriores descrevem a versão existente na data de cada teste.

## Verificado

- Onze seções. As sete originais mantêm sua ordem relativa; quatro blocos novos foram adicionados conforme autorização.
- Foto da hero idêntica em bytes à versão aprovada; fotos suplementares provenientes do pacote oficial.
- Conteúdo, navegação e CTAs em pt-BR, com termos de mercado apenas quando pertinentes.
- Larguras CSS de 1920, 1440, 1280, 1024, 768, 430 e 390 px no Safari: overflow horizontal zero, sem erros de JavaScript registrados ou imagens quebradas.
- Mudanças de largura com a página já rolada, inclusive desktop → mobile → desktop, sem erros. Corrigido o reflow dos gatilhos de animação.
- Método: avanço pelas quatro etapas no desktop, progresso radial e reversão ao voltar o scroll. Mobile com todas as etapas em sequência vertical.
- Plano de projeto, Sobre e Princípios inspecionados visualmente em desktop e mobile.
- Menu de 390 px: oito links visíveis, fechamento por Escape, retorno do foco e navegação para Plano de projeto.
- Âncoras sincronizadas com a rolagem suave. Menu pausa e retoma Lenis.
- Movimento reduzido simulado no monitor de QA: conteúdo disponível, loader encerrado e zero ScrollTriggers. CSS revisado para a preferência real do sistema.
- Bibliotecas de animação removidas em um teste de fallback: conteúdo, imagens e navegação disponíveis, sem loader preso.
- Assets e destinos internos verificados; imagens com dimensões reservadas. Apenas a imagem da hero tem preload de imagem; fotos da seção Sobre usam lazy loading.
- `node --check dist/app.js` e validação estática de HTML, âncoras e assets concluídos sem falhas.

## Limites

- Os testes responsivos usam larguras CSS no Safari de desktop, não aparelhos físicos. Não houve teste físico de toque.
- Core Web Vitals não foram medidos. A API de CLS não estava disponível neste Safari.
- Não foi feita auditoria com leitor de tela nem comparação pixel a pixel.
- A preferência do sistema por movimento reduzido não foi alterada; o caminho JavaScript foi exercitado por simulação e as regras CSS foram revisadas.
- Registro de 2/10: logos e mockups raster tinham resolução limitada. Na revisão de 3/10, marcas fictícias foram removidas e os painéis do sistema foram substituídos por SVGs originais.
- O canal de contato precisa ser informado. O botão final permanece indisponível até configurar `contactUrl` em `dist/config.js`.

## Correção da hero — 3 de outubro de 2026

- Removidas as máscaras que ocultavam letras de VINICIUS. As duas linhas da assinatura ficam completas à frente do retrato.
- Assinatura posicionada abaixo do relógio, com espaço adicional na base do desktop e tablet quando necessário. Foto, proporções, posição do retrato e demais seções preservadas.
- Safari: 1920, 1440, 1280, 1024, 768, 600, 430 e 390 px. Nome completo dentro dos limites da hero em todas as larguras, sem overflow, erros registrados ou imagens quebradas.
- Folga vertical medida entre a borda inferior do relógio no asset oficial e a tinta das letras: aproximadamente 10–29 px. Conferência visual adicional em desktop e mobile.
- Hero WebP comparada em bytes com o commit anterior: idêntica.

## Revisão dos 20 prints — 3 de outubro de 2026

- Mapeamento PRINT → SEÇÃO → COMPORTAMENTO → ITEM registrado antes das alterações em `REFERENCE-SEQUENCE.md` (cópia do roteiro criado no workspace antes das alterações).
- Contexto de especialidades e “Sistemas em escala” removidos. Empresas fictícias removidas do HTML, da navegação e dos assets.
- Abordagem: linha de tempo única para abertura da máscara, desenho radial, título, texto e CTA.
- Método: arco horário sincronizado ao scroll, índices de 1/4 a 4/4 e quatro conteúdos. Plano: deslocamento horizontal progressivo por linha no desktop.
- Números: painéis SVG originais, três camadas reais por pilha, parallax e controles de abertura/fechamento com `aria-expanded`.
- Missão, Visão e Valores substituem a composição antiga de fotos. Princípios revisados como coluna editorial e cartões contornados em fluxo vertical.
- Fechamento: nome completo monumental, abertura lateral, painel central original e continuidade para o CTA.
- `node --check`, `git diff --check`, arquivos locais, âncoras, dimensões de imagens e conteúdo pt-BR passaram.
- SHA-256 da foto da hero: `3234e061aa2f16edfe80f3ce996f4f0762f85e4ea4533ab6fd5976f57a535bad`, idêntica à aprovada.
- Retomada: prévia local corrigida para evitar cache de CSS/JS; desenho radial com estado inicial explícito, entradas do fechamento com estado explícito e rotações duplicadas de parallax eliminadas. Sintaxe e validação estática verificadas novamente.
- Safari reconectado em 3/10. Abordagem conferida em 0/25/50/75/100% e no retorno ao início. Método conferido na primeira, terceira e quarta etapas, incluindo retorno; arco corrigido para comprimento real em pixels, com `autoRound: false`. Raios laterais reposicionados.
- Plano conferido no Safari em 1440 × 900 CSS: quatro etapas legíveis, progressão horizontal à esquerda e defasagem entre as linhas. Hero conferida visualmente, assinatura completa abaixo do relógio. Monitor: zero overflow, erros ou imagens quebradas, 38 ScrollTriggers.
- Números: primeira e segunda pilhas conferidas visualmente em desktop, com imagens em camadas nítidas. Naquele ponto, terceira pilha, interações, Missão/Visão/Valores, Princípios, fechamento e responsividade ainda aguardavam conferência; resultados da retomada final abaixo.
- A sessão Safari teve interrupções por interação simultânea/troca de aba, não por bloqueio do Mac nesta retomada. O usuário pediu para continuar o código enquanto utiliza o Safari. Os resultados históricos de 2/10 acima não validam integralmente a revisão atual.
- Limpeza final: estilos dos blocos removidos eliminados; descrição dos Princípios corrigida após inclusão do contador; controles das pilhas preservam o nome do painel ao abrir/fechar. Os três SVGs de painel somam aproximadamente 14 KB.
- Depois dos ajustes finais, sintaxe JavaScript, estrutura de CSS, assets, âncoras, dimensões de imagens e hash da foto aprovada foram verificados novamente. A auditoria visual ainda estava pendente naquele ponto. A publicação permanece não autorizada nesta retomada.
- Item 6 aguarda nomes reais e logos oficiais. Destino de contato continua pendente.

## Finalização técnica após 06e0a07 — 3 de outubro de 2026

- Retomada no commit indicado, sem alterar foto, assinatura ou composição aprovada da hero. Não houve publicação nesta retomada.
- Altura da janela passou a integrar o ciclo de `gsap.matchMedia`: mudanças abaixo/acima de 650 px desmontam/reconstroem as cenas fixas de abordagem, método e fechamento.
- Tipografia e espaçamentos das cenas fixas limitados também pela altura para preservar texto e CTA em desktop com janela baixa.
- Etapas sobrepostas do método expõem apenas o conteúdo ativo à árvore de acessibilidade, inclusive ao voltar o scroll. Em mobile, movimento reduzido e fallback todas as etapas voltam ao fluxo acessível.
- SplitText passou a ser opcional; falha desse plugin não desativa as demais animações. Limpeza dos eventos e observadores funciona mesmo sem GSAP/ScrollTrigger.
- Reflow após fontes/carregamento usa uma atualização por frame; o ciclo cancela atualizações pendentes ao sair. Menu evita abertura/fechamento redundantes.
- `node tests/motion-regression.cjs`: 19 verificações de lógica passaram, incluindo altura, largura, movimento reduzido, memória/ticker, BFCache, fontes, menu, âncoras, toque e pilhas. São testes com doubles de DOM/GSAP, sem comprovação de renderização visual.
- Sintaxe, referências locais, âncoras, dimensões de imagens e ordem das onze seções passaram novamente. Auditoria visual final inicia somente depois desta revisão técnica.

## Auditoria final local — 3 de outubro de 2026

- Código concluído antes da auditoria. Nenhum push ou deploy executado.
- Safari em 1440 × 900 CSS: serviços e desenho ciano por foco, abertura progressiva da abordagem, etapas e arco do método, quatro linhas do plano, três pilhas de números e abertura/fechamento pelo controle + conferidos.
- Missão, Visão e Valores: introdução e três cartões conferidos. Princípios: composição editorial, coluna fixa no desktop, quatro cartões e descrições presentes e legíveis.
- Fechamento conferido em 0/25/50/75/100% e no retorno: nome completo, separação lateral, quadro central, fluxo e gráfico. CTA final conferido após a saída da cena.
- Desktop 1920 × 650: texto e CTA da abordagem e todo o quadro central do fechamento cabem na altura. Abaixo de 650 px, cenas retornam ao fluxo vertical e restauram acesso a todas as etapas.
- Mobile 390 × 844 CSS: hero, serviços, abordagem, método e plano em fluxo vertical, diagrama de sistemas, três números/pilhas, cartões de missão/visão/valores, princípios, nome/quadro do fechamento e CTA inspecionados ao longo da página. Menu fecha por Escape e devolve o foco ao botão MENU.
- Matriz atual de reflow: 390, 430, 600, 768, 1024, 1280, 1440 e 1920 px, incluindo mudanças com a página rolada. Zero overflow horizontal, erros JavaScript registrados ou imagens quebradas; assinatura dentro da hero, folga do relógio aproximadamente 10–29 px.
- Movimento reduzido simulado: zero ScrollTriggers, loader encerrado, conteúdo em fluxo. Sem GSAP/ScrollTrigger/SplitText: conteúdo disponível e loader encerrado.
- A auditoria identificou atraso de `aria-hidden` do método após reconstruir desktop com scroll avançado. Sincronização adicionada em `onRefresh`; reteste 1920 → 390 → 1920 confirmou somente a quarta etapa acessível quando o método está em 100%. Caso de regressão incluído entre as 19 verificações.
- `node tests/motion-regression.cjs`, sintaxe JavaScript, validação estática e `git diff --check` passaram. Testes de lógica usam doubles; a conferência de renderização foi feita separadamente no Safari.
- Permanecem os limites descritos acima: dispositivos físicos/toque, leitor de tela, comparação pixel a pixel e Core Web Vitals não foram medidos. Não há afirmação de equivalência pixel a pixel com a Vooban.
- Únicas dependências de conteúdo: empresas reais/logos oficiais para o item 6 e canal de contato para ativar o CTA. Não foram criadas empresas nem destinos fictícios.


## Experiências — 4 de outubro de 2026

- Seção editorial entre Plano e Sistemas, com headline e seis vínculos profissionais informados pelo usuário. Item 6 concluído com nomes, cargos, períodos e marcas reais; empresas apresentadas como trajetória profissional.
- Fontes oficiais e tratamentos de arquivo registrados em EXPERIENCE-ASSETS.md. Sem criação de marcas ou clientes.
- Safari 1440 × 900 e 390 × 844: headline, datas, cargos, seis logos e progressão no Grupo Minas Telecom inspecionados. Zero overflow, erros registrados ou imagens quebradas. Separadores/textos acompanham scroll no desktop; fluxo vertical no celular.
- 19 verificações existentes de lógica, sintaxe JS e validação estática com 12 seções passaram. Nenhuma alteração na hero. Sem publicação.


## Fechamento editorial VF — 4 de outubro de 2026

- Mudança restrita ao fechamento e seu preload, carregamento e condições de animação. As outras 11 seções foram comparadas com o commit 1d76f29: HTML idêntico; foto da hero conserva o hash aprovado. CTA posterior e copy preservados.
- Arte original anexada, 1981 × 793, PNG em bytes idênticos ao arquivo do usuário. Sem recomposição, edição de rosto/Apple, filtros ou elementos falsos sobre o raster. Mapeamento dos oito anexos em CLOSING-ASSET.md.
- Uma timeline reversível: nome em duas linhas subdivididas em faixas, abertura vertical com deslocamento lateral discreto, revelação por inset, crescimento de aproximadamente 40vw para 90/92/94vw, escala interna 1.06 → 1, parallax de 4–8 px, legenda e pausa final. A largura também respeita a altura disponível para preservar a imagem inteira.
- Pin transform com espaço reservado: 200vh desktop/tablet e 140vh até 768 px. Ponto inicial calculado da posição nativa do documento: corrige a leitura desatualizada após reconstruir breakpoints com scroll avançado, sem modificar as outras cenas.
- Auditoria feita na prévia local pelo navegador integrado do Codex, independente do Safari utilizado pelo usuário. Desktop 1440 × 900 e mobile 390 × 844: 0/25/50/75/95/100%, saída em 105% e retorno até 0%. Pin no topo, revelação central, proporção, rosto/MacBook livres, legenda, reversão e continuidade ao CTA conferidos. Zero erros registrados e overflow horizontal.
- Observador de layout reiniciado antes da sequência do fechamento: CLS local 0 durante entrada, avanço, saída e reversão, nas duas larguras. Não equivale a um teste de Core Web Vitals da página inteira. Reflow deliberado entre dimensões redistribui as seções anteriores e gera registros de layout; esses registros não foram ocultados nem contabilizados como uma execução normal da cena.
- Tablets 768 e 1024 px e desktop 1920 px: estados intermediário e final conferidos. Janela 1920 × 650: arte limitada pela altura, legenda com aproximadamente 14 px livres abaixo da imagem. Trocas desktop → mobile → desktop com scroll avançado reconstruíram corretamente o ponto inicial e o pin.
- Cadência observada pelo requestAnimationFrame na prévia: aproximadamente 60 callbacks/s, p95 entre 17–18 ms durante as sequências desktop/mobile. Mede agendamento no computador desta sessão, não FPS de pintura/GPU nem desempenho em aparelhos físicos.
- Movimento reduzido simulado: nome, imagem e legenda disponíveis em fluxo, zero triggers. Sem GSAP/ScrollTrigger/SplitText: arte completa e conteúdo disponíveis, sem loader preso. Preferência real do sistema e regras CSS revisadas, sem alterar configuração do Mac.
- 24 verificações de lógica com doubles passaram, incluindo timeline única, duração, pin por transform, posição nativa, will-change somente ativo, reconstrução, imagem carregada, acesso, cleanup e fallback. Sintaxe JS, âncoras, assets HTTP, dimensões, sequência de 12 seções e diff sem erros.
- Capturas e leituras locais em ../closing-qa/. Nenhum push ou deploy. Limites restantes: aparelhos físicos/toque, leitor de tela e métricas de produção não avaliados nesta auditoria. Destino do contato ainda deve ser configurado pelo proprietário.


## Logo lateral e inversão de cores — 4 de outubro de 2026

- Apenas a imagem do bloco `.rail-home` foi substituída pelo SVG VF já existente (`#vf-logo`), com fill via currentColor. Nenhuma alteração no símbolo original, header, CTA ou demais instâncias da marca.
- Posição fixed, tamanho, aspecto quadrado, raio de 5px, centralização e menu preservados. HTML das 12 seções, botão MENU e dialog comparados em bytes com e764b25: idênticos.
- Cores exatas: azul #014BAA / cream #F8F3F0. GSAP anima somente backgroundColor, color e borderColor do bloco em 0,45s com power2.out. O SVG acompanha a cor. Sobre fundos claros: bloco azul e logo cream; sobre azul/escuro: bloco cream e logo azul, com borda cream a 35% de opacidade.
- Detecção da superfície efetivamente sob o centro da logo, sem lista manual de seções ou alteração dos fundos. Camadas da navegação são excluídas; backgrounds transparentes são ignorados. Duas sondas a ±2px mantêm a cor na fronteira e evitam alternâncias repetidas. Cores computadas em cache, eventos passivos e um requestAnimationFrame coalescido por atualização; sem loop contínuo. Tween e frame limpos ao sair.
- Navegador integrado, prévia local: 1440, 1024, 768 e 390px CSS. Avanço e retorno entre Especialidades, Plano, Experiências, Números, Princípios, Fechamento e CTA; cores, SVG, dimensões e menu conferidos. Zero erros registrados e overflow. Geometria: desktop 64,8×64,8px; tablet 48×48px; mobile 46×46px — conforme as regras anteriores.
- Fronteira de Princípios: offsets -3/-1/+1/+3px e retorno. Dentro da faixa de 4px, a paleta anterior permanece; fora dela, a transição ocorre nos dois sentidos. Rolagem contínua via Lenis no desktop e scroll nativo suave no mobile também conferidas.
- Movimento reduzido simulado: cores e contraste preservados com duração zero. Sem bibliotecas: inversão preservada com fallback CSS. 31 verificações de lógica passaram (24 anteriores + 7 da inversão); sintaxe, HTML/âncoras/assets e diff passaram.
- Capturas e leituras em ../rail-qa/. São testes em larguras CSS no computador, sem teste em dispositivos físicos. Nenhum push ou deploy.


## Experiências — retorno ao grid aprovado, 4 de outubro de 2026

- Print antigo de Clientes aplicado como autoridade visual. Regras recuperadas de 1318332: heading em 10,55vw, padding 4,7vw / 7,35vw / 2,5vw, headline 3,72vw, grid 3×2 com gap 1vw / 0,85vw, cards 466:191, raio 7px, fundo #efebe8 sobre #F8F3F0. Os breakpoints antigos de 1024/768/500px foram restaurados; mobile usa duas colunas.
- Removidos lista vertical, datas laterais, grandes cargos e legenda de intervalo. Título e headline exatamente conforme o novo pedido. Seis marcas oficiais existentes, na ordem WIWAP, EY, Minas Telecom, Tigre, ClubPetro e Bolt Júnior; arquivos de logos intactos e sem filtros, distorção ou placeholders.
- Nome pequeno no canto inferior. Cargo e período em microlegenda no hover/foco, sem mudar dimensões ou a composição em repouso. Conteúdo associado por aria-describedby; foco por teclado e toque disponível. Logo central com contain; EY e Tigre mantêm as bases de contraste necessárias aos lockups oficiais brancos.
- Recuperada a animação original dos cards (máscara vertical de 0,75s, stagger 0,065s por coluna, imagem y14/scale0,97), com o lifecycle GSAP atual. Hover original com fundo #e8e3df, translateY(-3px)/scale(1,025). Movimento reduzido e ausência de bibliotecas mantêm o conteúdo disponível.
- Auditoria no navegador integrado em 1440, 1024, 768 e 390px CSS: seis logos carregados, grid correto, nenhuma imagem cortada, zero overflow/erros. Desktop: cards 401,3×164,5px, proporção 466:191; mobile 390: cards 166×103,75px, proporção 1,6. Microlegenda Minas conferida no hover/foco desktop e foco mobile, inteiramente dentro do card e sem sobrepor o nome.
- Sintaxe, validação de HTML/âncoras/assets, diff e 31 regressões existentes passaram. HTML das outras 11 seções preservado byte a byte; regras/animações externas à seção preservadas, incluindo o espaçamento já existente de Sistemas no mobile.
- Capturas e leituras em ../experience-grid-qa/. Teste de larguras no computador, sem dispositivos físicos. Sem push ou publicação.


## Footer editorial — 4 de outubro de 2026

- Footer novo imediatamente após o CTA existente: cream, divisórias sutis, três colunas no desktop e fluxo empilhado no mobile. A remoção do novo footer do HTML resulta no arquivo anterior byte a byte; CSS anterior preservado integralmente e configuração de contato inalterada.
- Ícones SVG acessíveis, foco visível, setas no hover e entrada de 10px/fade no lifecycle GSAP existente. Movimento reduzido e ausência de GSAP/ScrollTrigger mantêm todo o conteúdo visível.
- Início, Especialidades, Sistemas, Experiências, Sobre e Contato testados por clique real no navegador integrado em desktop 1440px e mobile 390px. Seis destinos corretos e alinhados ao scroll-padding; Lenis suave no desktop, nativo no mobile, imediato com movimento reduzido. Cliques modificados conservam o comportamento padrão.
- Desktop 1440, tablet 1024 e mobile 390px: colunas, hierarquia, ícones, divisórias e URLs conferidos; zero overflow horizontal e erros registrados. Touch targets de pelo menos 44px no mobile. Sem testes em aparelhos físicos.
- Instagram e LinkedIn reproduzem os endereços fornecidos no preview aprovado, com target blank e noopener noreferrer. Instagram limitou a consulta automática e LinkedIn respondeu com bloqueio 999; existência/disponibilidade externa dos perfis não confirmada nesta sessão.
- MGL aponta para https://www.mglgrowth.eu/, fornecido pelo proprietário após a auditoria inicial, com abertura em nova aba, noopener noreferrer e indicação acessível. Destino respondeu HTTP 200; href, target, rel, ausência de underline permanente e clique inspecionados no navegador. Captura em ../footer-qa/mgl-link.png. Sem alteração no layout ou no CTA.
- Sintaxe, validação estática de âncoras/assets/HTTP, diff e 34 regressões de lógica passaram. Provas em ../footer-qa/ (desktop.png, mobile-bottom.png e navigation.json). Nenhum push ou deploy.

## Fechamento — correção horizontal, 4 de outubro de 2026

Esta revisão substitui a abertura vertical descrita na auditoria anterior do fechamento.

- Escopo comparado em bytes com b94575a: outras 11 seções, header, menu, CTA, footer e respectivos CSS/JS preservados. O preload alterado refere-se exclusivamente à nova arte final. Tokens e tipografia global intactos.
- Oito anexos mapeados na ordem enviada em CLOSING-ASSET.md. O oitavo PNG, 1672×941, foi copiado sem edição; hash conferido com a origem. Rosto, MacBook e Apple preservados; apenas enquadramento responsivo com cover.
- Dezoito glifos independentes em uma baseline. Começam sobrepostos no centro; abrem em X com sobreposição intermediária; o nome cabe em 96% da largura; depois as duas palavras se afastam para as bordas. SVG com proporções preservadas, sem esticar os glifos. Nenhum tween em Y nas letras.
- Uma timeline com defaults ease:none, scrub:true, pin por transform e espaço reservado. Duração 280vh desktop/tablet e 200vh até 768px; crescimento central da arte até 100%×100% da viewport no desktop. Mobile: largura total e 68svh de altura, preservando rosto e Apple. Estado final retido antes de liberar o pin e seguir ao CTA existente.
- gsap.context dedicado e revert no lifecycle de matchMedia/saída. Medidas dos glifos refeitas no refresh; viewBox e coordenadas originais restaurados no cleanup. Will-change apenas durante o pin ativo. Timeline vertical e trigger alternativo antigos removidos.
- Safari e Google Chrome nativos no Mac: 1440×900 CSS e 390×844 CSS; estados inicial, intermediário e final capturados, incluindo retorno ao início e reconstrução desktop→mobile. Conteúdo central, baseline e enquadramento inspecionados. O painel local de auditoria foi recolhido para não cobrir o iframe.
- Auditoria adicional no navegador integrado: 0/25/50/75/100%, retorno a 0%, 1024×576, 768×844, 390×844 e reconstrução em 1440×810. Um único pin-spacer nesta seção; telemetria aponta um trigger final. Topo do pin entre -0,18 e +0,49px; overflow horizontal zero. Em 1440×900, arte final medida em 1440×900px.
- Movimento reduzido simulado e ausência de GSAP/ScrollTrigger: nome estático legível, arte em proporção original e legenda disponíveis, sem pin-spacer e sem overflow. Preferência real do sistema não alterada.
- 37 regressões de lógica com doubles passaram, incluindo sobreposição, dispersão horizontal, scrub, imagem final, cleanup e retorno ao fluxo. Sintaxe JavaScript, assets/HTTP, âncoras, dimensões de imagens, sequência de 12 seções, hash e diff passaram. Zero erros registrados na prévia durante a matriz.
- Capturas e leituras em ../horizontal-closing-qa/. São testes de larguras CSS no computador, sem dispositivos físicos, leitor de tela ou métricas de produção. Sem promessa de equivalência pixel a pixel da referência. Nenhum push ou deploy.


## Etapa final do prompt master — 4 de outubro de 2026

Este bloco é a auditoria da versão atual. Os relatos anteriores são históricos e não validam automaticamente esta etapa.

- Remoção integral dos dois blocos solicitados, incluindo estilos, timelines, âncoras obsoletas e wrappers. Nove seções principais, contato integrado à arte e footer em fluxo contínuo.
- Introdução dos pilares com eyebrow, headline e CTA; três timelines agrupadas com scrub. Cada número percorre toda a janela de sua linha, de baixo para cima. Stacks com velocidades e rotações discretas. Testadas três linhas em 0/25/50/75/100% e retorno a 50/0%, nas seis larguras.
- Abertura final com dezoito glifos em duas palavras. Compressão central, expansão exclusivamente em X, monumentalidade, reveal independente do retrato e expansão até a viewport. Pin único, scrub verdadeiro, cleanup e foco revisados. Eyebrow do contato excluído das entradas globais, deixando todos os reveals do fechamento sob a timeline de scrub.
- Composição em camadas reais; fotografia original PNG idêntica ao anexo 13 em SHA-256. Face livre de textura, MacBook e Apple preservados. Dissolução inferior chega ao mesmo cream do footer, sem barra escura ou mesa destacada.
- Espaço excedente em Experiências vinha da altura fixa herdada de `.section`; altura intrínseca elimina o resíduo sem mudar grid, cards ou heading. Sistemas tinha altura fixa e elementos absolutos; grid intrínseco preserva composição e remove a área vazia. Espaçamento de pin corresponde apenas à sequência animada, sem wrapper vazio depois do footer.
- Hero, tokens de cor/tipografia e conteúdo de Abordagem, Método, Plano e Experiências comparados ao HEAD anterior. Geometria, assets da hero e logos oficiais preservados. Seletor da animação de CTA da Abordagem foi limitado à própria seção, evitando interferência nas novas CTAs.
- Intervalos de Abordagem, Método, Plano e Pilares calculados com posição nativa do documento no refresh. Corrigido o valor desatualizado após redimensionamento com scroll avançado, preservando coreografia e durações existentes. Opacidades de textura/traço restauram corretamente em cada breakpoint.

### Matriz atual — navegador integrado Chromium

| Largura CSS | Altura CSS | Arte final | Overflow horizontal | Erros / imagens quebradas | Pin final |
|---:|---:|---|---:|---|---:|
| 1440 | 810 | 1440 × 810 | 0 | 0 / 0 | 1 |
| 1280 | 720 | 1280 × 720 | 0 | 0 / 0 | 1 |
| 1024 | 576 | 1024 × 576 | 0 | 0 / 0 | 1 |
| 768 | 844 | 768 × 844 | 0 | 0 / 0 | 1 |
| 430 | 844 | 430 × 844 | 0 | 0 / 0 | 1 |
| 390 | 844 | 390 × 844 | 0 | 0 / 0 | 1 |

- Introdução dos números, Sistemas, tipografia e arte inspecionados em desktop, tablet e mobile; transição arte/footer conferida. Reflow nos dois sentidos mantém um único trigger/pin final, sem camadas invisíveis ou rotações duplicadas.
- Sequência final em 0/25/40/50/60/75/85/100% e retorno no desktop; 0/25/50/60/75/85/100% e retorno no mobile. Letras sem dispersão vertical, contato oculto sem foco prematuro, arte completa ao terminar e retorno suave.
- Abordagem e Método conferidos em 0/50/100% e reversão, incluindo estado acessível das etapas. Menu abre/fecha por teclado. Controle de stack abre/fecha por clique real em viewport mobile.
- Todos os seis links internos do footer testados por clique real em 1440 e 390px: destino e alinhamento corretos. Contato chega ao fim do pin. Instagram, LinkedIn e MGL mantêm os URLs confirmados, nova aba e noopener/noreferrer. Redes sociais podem bloquear verificações automáticas; disponibilidade dos perfis não é inferida de um bloqueio.
- Movimento reduzido simulado e bibliotecas ausentes: zero triggers, sem pin, nome legível, arte e CTA acessíveis, overflow zero e sem loader preso. Regras CSS revisadas sem alterar preferências do sistema.
- Observador de layout reiniciado após carregamento/medidas. Durante avanço/reversão da sequência final: CLS 0, nenhum evento de deslocamento de layout, console sem erros/avisos. Agendamento rAF local aproximadamente 60 callbacks/s e p95 17,2ms; não é medição de pintura/GPU nem Core Web Vitals de produção. Eventos gerados pela mudança deliberada da largura do iframe não representam scroll normal e continuam nos registros brutos da matriz.
- 42 verificações de regressão com doubles de DOM/GSAP, sintaxe JS, validação HTML/âncoras/assets/HTTP/dimensões, hash original e diff sem erros. Testes de lógica não substituem inspeção visual.
- Evidências em `../final-stage-qa/`: matriz JSON, seis auditorias dos pilares, fases desktop/mobile, navegação, movimento preservado, performance e capturas das seis larguras. Capturas finais limpas: `final-desktop.png`, `final-mobile.png`, `art-footer-desktop.png`.

### Arquivos desta etapa

- Site: `dist/index.html`, `dist/styles.css`, `dist/app.js`.
- Assets: `dist/assets/vinicius-final-original.png`, `dist/assets/editorial-grain.svg`, `dist/assets/asset-provenance.json`.
- Regressões: `tests/motion-regression.cjs`.
- Documentação: `README.md`, `CLOSING-ASSET.md`, `QA.md`.
- Suporte local à auditoria, fora do site: `../../work/qa-panel.html`, `../../work/validate_site.py` e `../../work/final-stage-qa/`.
- Evidências: `../final-stage-qa/`. Esses arquivos de auditoria não são servidos como componentes do site.

### Limitações reais da sessão atual

- Safari nativo foi tentado novamente pelo nome e bundle ID; Chrome nativo também. O Mac está bloqueado e o controle nativo não conseguiu desbloqueá-lo. Não há teste Safari da versão atual; os registros Safari anteriores descrevem versões anteriores. A auditoria atual foi concluída no Chromium integrado, que permaneceu disponível.
- São viewports CSS no computador, sem aparelhos físicos, leitor de tela ou métricas de produção.
- `contactUrl` continua vazio no projeto. Sem WhatsApp, e-mail ou agenda confirmados, o botão mantém seu estado acessível de indisponibilidade. Não foi criado destino fictício.
- Nenhum push, deploy ou publicação executado.

## Novo pré-rodapé limpo / brand reveal — 16 de outubro de 2026

Este é o fechamento atual. Substitui a solução anterior com letras monumentais e colagem; as demais seções e o footer continuam preservados.

- Removidos dezoito glifos gigantes, VF de fundo, blocos, textura, rabiscos, linhas e a timeline anterior. Logo VF oficial em cream, hold e expansão em máscara SVG. Cena real em HTML/CSS, gradiente limpo, fotografia original, copy e CTA azul. Nenhum screenshot utilizado como cena pronta.
- Uma timeline `vf-brand-finale`, scrub verdadeiro, 170vh desktop/tablet e 120vh mobile. Contexto e cleanup; medidas somente em refresh, transform SVG/opacity, nenhum width/height/top/left animado. Retrato permanece no enquadramento, sem zoom flutuante; copy entra depois em stagger. Um único pin final.
- Acima do fechamento: HTML idêntico ao snapshot inicial, exceto preload do novo PNG e versões de cache CSS/JS. Footer completo, CSS global e tokens idênticos em bytes. Prova: `../brand-reveal-qa/scope-and-asset-proof.json`.
- `#contact` fora do estágio pinado, alinhado à distância real do pin. Inicialização e refresh sincronizam os limites do Lenis antes do deep link. Clique de contato não é sobrescrito pelos anchors delegados. Foco liberado com a copy visível.

| Viewport CSS | Pin final | Overflow | Erros do site / imagens quebradas |
|---|---:|---:|---|
| 1440 × 810 | 1 | 0 | 0 / 0 |
| 1280 × 720 | 1 | 0 | 0 / 0 |
| 1024 × 576 | 1 | 0 | 0 / 0 |
| 768 × 844 | 1 | 0 | 0 / 0 |
| 430 × 844 | 1 | 0 | 0 / 0 |
| 390 × 844 | 1 | 0 | 0 / 0 |

- Estados 20/45/100%, retorno a 45/0% e reconstrução nas seis larguras. Foto/copy legíveis, sem trigger duplicado. Tablet vertical adicional: 837 × 767, foto proporcional limitada à coluna, sem invadir o texto.
- 390 × 568 e 1024 × 450 retornam ao fluxo sem pin; 390 × 667 mantém o pin reduzido. Movimento reduzido, bibliotecas ausentes e economia de recursos: cena estática acessível, sem pin/overflow/erros. Preferências do sistema não alteradas.
- Safari e Chrome nativos: logo, máscara, retrato, estados intermediário/final e reversão inspecionados em 1440 × 810 e 390 × 843–844 CSS. Um pin, sem erros registrados e sem overflow positivo. Capturas e telemetria nativas preservadas. Arredondamento de até 1px no Safari com a escala CSS dessa janela.
- Após as correções de âncora/Lenis, deep link e link de contato revalidados no Chromium integrado com progresso final 100%. A repetição desse último deep link nos navegadores nativos foi impedida pelo bloqueio do Mac; não é apresentada como teste nativo concluído.
- Todos os seis links do footer testados por clique real em desktop/mobile. Alinhamento: 22px desktop, 86px mobile; Início e Contato em 0px. URLs sociais/MGL preservadas. Gap entre cena e footer medido em 0px nas duas larguras.
- 45 regressões de lógica passaram: carregamento antes do motion, limites do Lenis, cleanup, breakpoint, máscara, foco, movimento reduzido, fallback e navegação. Sintaxe, HTML/âncoras/assets/HTTP/dimensões, hash original e diff verificados.
- Leituras de CLS dos relatórios que redimensionam o iframe incluem alterações deliberadas de largura; não são métricas de produção nem medição de pintura/GPU. Sem teste em aparelhos físicos.

Limites: o recorte prioritário recebido não contém Apple visível e corta a lateral do notebook; mantido intacto, sem logo artificial. O prompt menciona quatro imagens; foram recebidas três. `contactUrl` permanece vazio, com CTA acessivelmente indisponível e sem destino fictício. Sem deploy, push ou publicação.

Arquivos desta solicitação: `dist/index.html`, `dist/styles.css`, `dist/app.js`, `dist/assets/vinicius-closing-clean.png`, `dist/assets/asset-provenance.json`, `tests/motion-regression.cjs`, `README.md`, `CLOSING-ASSET.md`, `QA.md`. Suporte local em `../../work/brand-reveal-qa/` e `../../work/validate_site.py`; evidências em `../brand-reveal-qa/`.

## Auditoria final de produção — retomada de 16/10/2026

O relatório atual é [FINAL-QA.md](FINAL-QA.md). Substitui os estados antigos de contato e asset descritos acima: agora a configuração usa `whatsappNumber`/`whatsappMessage`, o original com Apple está restaurado e a mesa termina em diagonal CSS até o footer. Hero mobile 100svh; abertura radial, diagnóstico 1/4–4/4 e roadmap mantêm scrub no mobile. Hero desktop, footer e copy preservados nesta etapa.

Matriz exata Chromium 1440/1280/1024/768/430/393/390: 70 estados de seção, zero overflow/imagens quebradas/erros; gap final/footer 0px nas sete larguras. Safari nativo acessível novamente: Hero/fechamento nas sete larguras e estados finais radial/roadmap, sem erros ou overflow positivo. 51 regressões aprovadas. Testes de altura 844/740/568, reduced motion e fallback concluídos. Evidências em `../final-production-qa/`.

Pendência real: nenhum número oficial encontrado; as 13 CTAs compartilham integração pronta, mas NÃO abrem WhatsApp real enquanto `whatsappNumber` permanecer vazio. Sem mensagem temporária na interface e sem número inventado. Sem aparelho iPhone físico; Safari iOS com barra dinâmica real não testado. Sem deploy.

## Três ajustes cirúrgicos — 16/10/2026

Relatório atual: [THREE-ADJUSTMENTS-QA.md](THREE-ADJUSTMENTS-QA.md). Foto original do print principal 01, Apple, enquadramento e mesa diagonal preservados; gap mesa/footer 0px nas sete larguras. Header reutiliza o sistema split CTA, com fontes, alturas, paddings, ícone, raio e transições conferidos contra o CTA aprovado de Sistemas. Copy visível e acessível sem hífen/en dash/em dash, com reescrita natural; destinos, IDs e nomes de assets preservados. `app.js`/`config.js` intactos. 35 estados em sete tamanhos, sem overflow/imagens quebradas/erros/triggers duplicados; 51 regressões aprovadas. Esta rodada foi validada no Chromium integrado; tentativa Safari nativo interrompida por mudança de estado do aplicativo. Sem deploy.

## Recorte obrigatório confirmado pelo usuário — 16/10/2026

Relatório atual: [CLOSING-REFERENCE-QA.md](CLOSING-REFERENCE-QA.md). O `<img>` final agora usa exatamente o PNG anexado com cadeira, pose e mão no queixo: hash `fa1eb6a5c29893a49532f4d20dafef3217f7672b90caf3db1e24c8c76b647b04`. A escolha anterior de retrato foi substituída. A marca do MacBook usa pixels do material original em uma janela SVG, sem desenho fictício. Mesa acompanha a perspectiva da referência e encontra o footer. Corpo/rosto do PNG sem alteração; footer e todas as seções anteriores idênticos ao snapshot desta solicitação. Oito tamanhos desktop/tablet/mobile, zero overflow/imagens quebradas/erros da página/triggers duplicados, scrub reversível, reduced motion e fallback verificados; 51 regressões aprovadas. Sem publicação.
