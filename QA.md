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
