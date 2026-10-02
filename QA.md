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
- Logos e mockups originais continuam limitados à resolução das referências recebidas.
- O canal de contato precisa ser informado. O botão final permanece indisponível até configurar `contactUrl` em `dist/config.js`.
