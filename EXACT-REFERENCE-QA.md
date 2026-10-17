# Correspondência à nova referência — 17/10/2026

## Entrega

A nova referência `codex-clipboard-5161c5f7-ee73-4be7-a1fe-043c35ec0154.png` fornece a composição desejada do notebook. O PNG foi copiado sem edição para `dist/assets/closing-approved-reference.png`. Uma janela CSS, limitada ao desktop e alinhada ao plano original do retrato, apresenta os pixels dessa referência. A Apple não foi redesenhada nem extraída da imagem proibida.

A foto principal continua idêntica em bytes ao anexo obrigatório. Corpo, rosto, escala, posição, texto, fundo, mesa, rodapé e código de animação não foram alterados. O Instagram corrigido na etapa anterior permanece.

## Verificação visual

- Desktop: 1672×941, 1440×810, 1280×720 e 1024×768.
- Mobile/tablet: 768×1024, 430×932, 393×852 e 390×844.
- Sem overflow horizontal, imagens quebradas ou erros capturados no site.
- Comparação na dimensão exata da referência: 99,503% dos pixels coincidem, com erro médio máximo de 0,0173 por canal em 0–255. A ferramenta entrega JPEG, portanto há diferenças mínimas de compressão/amostragem na região do notebook. Nenhuma diferença na composição restante.
- Nenhum estilo existente de mobile foi alterado. Na comparação antes/depois estabilizada, as capturas 430×932 e 390×844 são pixel a pixel idênticas. As outras duas têm pequenas diferenças de captura, documentadas em `comparison.json`, sem mudança de geometria ou de imagem fonte.
- A imagem da referência desktop não é selecionada pelo `<picture>` no mobile.
- Movimento, pin, scrub e retorno revisados; 51 testes de regressão aprovados.
- Âncoras, HTTP, arquivos e dimensões declaradas aprovados. `git diff --check` aprovado.

## Escopo comprovado

Comparação com `work/exact-closing-reference/before/` confirma que HTML fora da janela e do cachebuster é idêntico, CSS anterior intacto, JS idêntico e foto principal idêntica por SHA-256.

Arquivos da implementação: `dist/index.html`, `dist/styles.css`, `dist/assets/closing-approved-reference.png`, `dist/assets/asset-provenance.json`. Documentação: este arquivo e `CLOSING-ASSET.md`.

Evidências de navegador em `../exact-closing-reference-qa/`. Sem deploy ou publicação.
