# Composição final em camadas — 17/10/2026

A seção final é construída com gradiente e mesa em CSS, foto recortada em SVG, textos e CTA em HTML. As screenshots recebidas servem apenas de referência e não são renderizadas.

## PNGs originais

- `dist/assets/vinicius-working-original.png`: cópia byte a byte de `08_trabalhando_no_laptop.png`, 1122×1402. SHA-256 `e1c327c91595c064fdcb055b45b397eaa7eda8ab5a77f24508a8c7eb098451c7`.
- `dist/assets/macbook-source-original.png`: cópia byte a byte de `05_macbook_prata_recorte.png`, 1122×1402. SHA-256 `ee0735e3516d109d4c30cb7f867e331497cce5759c2dedad6e35eb7eb424b6a2`.

O rosto, pose, corpo, mão e teclado vêm do asset 08 enviado. Apenas a tampa completa e a Apple vêm do asset 05 do mesmo pacote original. Os contornos SVG isolam essas partes e retiram os resíduos do outro braço, notebook antigo e mesa rasterizada. Nenhum PNG foi editado, comprimido, gerado ou substituído por um print.

A foto alternativa proibida não é utilizada. As versões `vinicius-final-approved.png` e `closing-approved-reference.png` são histórico, sem referência no HTML atual.

## Animação e acabamento

A cortina VF, o fundo claro inicial, a marca centralizada, a timeline, o pin/scrub e a sequência de entrada permanecem iguais. A composição em camadas é revelada pela abertura existente.

O acabamento mais recente altera somente os dois contornos de extração. CSS, JS, transformações e rodapé permanecem byte a byte iguais ao estado anterior à correção. Ver `MACBOOK-FINISH-QA.md` para evidências atuais. `FINAL-ASSET-QA.md` registra a etapa histórica de imagem única e foi substituído por esta implementação em camadas.
