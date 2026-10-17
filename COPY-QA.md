# Auditoria da revisão de copy — 16/10/2026

## Escopo e preservação

- Reescrita implementada em todas as nove seções e no texto de marca do rodapé.
- Hero: dor reconhecível, explicação curta, CTA principal e link para entender o processo.
- Quatro cards: problema, intervenção concreta e consequência operacional.
- Método e roadmap: diagnóstico, prioridade, implementação e acompanhamento; componentes e comportamento existentes preservados.
- Experiências movidas depois das entregas. Seis logos, cargos e períodos mantidos sem alteração.
- Fontes, tokens de cor, fotografias, bibliotecas, hover e timelines preservados. CSS anterior mantido integralmente como prefixo; regras novas tratam o encaixe dos textos, especialmente no tablet e em 320 px.
- O código de movimento e navegação após o bloco de configuração de contato é idêntico ao estado anterior desta revisão.

## Validação executada

- `node --check dist/app.js`: aprovado.
- `node tests/motion-regression.cjs`: **48 verificações aprovadas**. Inclui lifecycle GSAP, cleanup, reverse, breakpoints, menu, navegação, redução de movimento e resolução dos links de WhatsApp.
- Auditoria estática: nove seções, todos os anchors internos existentes, assets locais acessíveis via HTTP, imagens com dimensões reservadas e remoção da apresentação comercial em terceira pessoa.
- Revisão visual e telemetria local nas dimensões 1440×810, 1280×720, 1024×768, 768×1024, 430×932, 390×844, 320×740 e 390×568.
- Resultado final: **zero overflow horizontal da página, zero textos excedendo sua largura, zero conteúdo excedendo os cards e nenhuma imagem quebrada** na matriz final.
- As dez áreas (nove seções e rodapé) foram revisitadas em desktop e mobile. Capturas e relatórios estão em `../copy-rewrite-qa/`.
- Método: diagnóstico → arquitetura → implementação → otimização e retorno ao diagnóstico, com semântica acessível correta.
- Reveal final: 0 → 0,5 → 1 → 0,5 → 0, com apenas um pin. Em viewport curta, reduced motion e ausência de GSAP, o conteúdo volta ao fluxo legível.
- CTA do Hero: chega ao contato com o reveal concluído. Sem número configurado, o aviso de indisponibilidade fica visível sem cobrir o retrato.
- Duas imagens falharam transitoriamente durante troca rápida entre modos de teste; HTTP 200 confirmado e teste completo de fallback repetido com **zero falhas**.

## Console e limites da inspeção

O monitor instalado antes dos scripts do site registrou **zero erros da aplicação** na matriz e nos testes finais. O console da integração do navegador apresentou `MutationObserver.observe: parameter 1 is not of type Node` ao recarregar o painel de QA. `MutationObserver` não aparece em nenhum arquivo entregue, e esses eventos não aparecem no monitor de erros do documento. A limitação foi identificada como proveniente da integração de inspeção e não foi ocultada ou contornada no código do site.

A revisão visual desta rodada foi executada no navegador integrado. A tentativa de abrir o painel no Safari nativo foi impedida pela sessão de interação do aplicativo. Não se afirma nova aprovação nativa em Safari/Chrome nem teste em aparelhos físicos para esta revisão.

## Contato

Não há número confirmado de WhatsApp no projeto. `contactUrl` permanece vazio. Mensagem pré-preenchida pronta e codificação testada com destinatário fictício apenas em teste automatizado; não houve envio nem contato com terceiros. Os links confirmados de Instagram, LinkedIn e MGL foram preservados. A navegação do rodapé permanece dentro da página.

Sem publicação ou deploy.
