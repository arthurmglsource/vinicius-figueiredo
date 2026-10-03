# Verificação — Vinicius Figueiredo

Revisão de 2 de outubro de 2026, no Safari, usando a implementação final em um servidor local.

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

- Mapeamento PRINT → SEÇÃO → COMPORTAMENTO → ITEM registrado antes das alterações em `work/reference-sequence.md` no workspace.
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
- Números: primeira e segunda pilhas conferidas visualmente em desktop, com imagens em camadas nítidas. Terceira pilha, interações, Missão/Visão/Valores, Princípios, fechamento e a auditoria responsiva desta revisão ainda precisam de conferência visual integral.
- A sessão Safari teve interrupções por interação simultânea/troca de aba, não por bloqueio do Mac nesta retomada. O usuário pediu para continuar o código enquanto utiliza o Safari. Os resultados históricos de 2/10 acima não validam integralmente a revisão atual.
- Limpeza final: estilos dos blocos removidos eliminados; descrição dos Princípios corrigida após inclusão do contador; controles das pilhas preservam o nome do painel ao abrir/fechar. Os três SVGs de painel somam aproximadamente 14 KB.
- Depois dos ajustes finais, sintaxe JavaScript, estrutura de CSS, assets, âncoras, dimensões de imagens e hash da foto aprovada foram verificados novamente. Auditoria visual restante e publicação pendentes.
- Item 6 aguarda nomes reais e logos oficiais. Destino de contato continua pendente.
