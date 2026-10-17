# QA da imagem definitiva e da abertura preservada — 17/10/2026

## Resultado

A abertura aprovada foi restaurada sem modificar a timeline. Somente seu conteúdo visual final foi substituído pelo PNG definitivo enviado pelo usuário. A copy e o CTA permanecem em HTML. Não houve publicação ou deploy.

## Integridade

- `dist/app.js`: byte a byte idêntico a `work/final-asset-section/before/app.js` no workspace externo.
- SVG `.closing-curtain`: byte a byte idêntico ao backup.
- `<footer>`: byte a byte idêntico ao backup.
- PNG definitivo: byte a byte idêntico ao anexo, SHA-256 `e77290278baa8628db6f78a7e8ffa88184390f02a4042b16aa5e15cf4de6e6f5`.
- Nenhuma máscara ou clip-path no elemento da imagem; a máscara SVG continua exclusivamente na cortina aprovada.

## Comportamento e renderização

`node tests/motion-regression.cjs`: 51 verificações aprovadas. Inclui uma única timeline/pin, scrub, 170vh/120vh, abertura, geometria centralizada da marca, easing, sequência, foco/inert, reversão, reconstrução nos breakpoints, âncora de contato e fallbacks. O teste usa doubles de DOM/GSAP; não substitui a inspeção visual.

Revisão no navegador local:

- Desktop 1672×941: fundo claro + VF centralizada; abertura em curso; final revelado; retorno no scroll.
- Mobile 390×844: mesmas etapas, com marca centralizada e adaptação do conteúdo ao viewport.
- Inspeções adicionais: 2047×1040, 1440×810, 1024×768, 768×1024, 430×932 e 320×740.
- Sem overflow horizontal, assets quebrados ou erros de execução nas verificações registradas.
- MacBook e Apple provenientes da imagem original; mesa chega à base da seção, seguida pelo rodapé oficial.
- `prefers-reduced-motion` e ausência de GSAP: conteúdo legível em fluxo, sem pin, sem erros.
- Verificador estático: âncoras, arquivos, dimensões de imagens, HTTP e nove seções aprovados.

Capturas no workspace externo: `outputs/final-asset-section-qa/desktop-logo.jpg`, `desktop-opening.jpg`, `desktop-final.jpg`, `mobile-logo.jpg`, `mobile-opening.jpg`, `mobile-final.jpg` e `footer-desktop.jpg`. São capturas reais do navegador; a ferramenta entrega JPEG, portanto não se afirma identidade binária entre captura e PNG.

## Limitação de contato

Não foi fornecido um número oficial de WhatsApp. `dist/config.js` mantém `whatsappNumber` vazio. Os 13 CTAs compartilham o resolvedor validado, mas o envio externo permanece desativado até o preenchimento do destinatário real. Nenhum número foi inventado. Navegação e redes sociais do footer permanecem funcionais.
