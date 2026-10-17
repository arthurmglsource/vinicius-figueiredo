# Auditoria final de produção — 16/10/2026

Implementação salva localmente. Sem push, deploy ou publicação. A integração de WhatsApp está centralizada e testada, mas NÃO está ativa com um destinatário real: nenhum número oficial foi encontrado nos materiais disponíveis.

## Alterações e preservação de escopo

- CTA “Mapear minha operação” usa o mesmo símbolo `#chat`, contorno e geometria do chat existente, incluindo header e fechamento. Hover, clique, foco e teclado preservados.
- As 13 CTAs comerciais compartilham `whatsappNumber` e `whatsappMessage` em `dist/config.js`. O resolver gera `https://wa.me/` com mensagem codificada, `_blank`, `noopener noreferrer` e nome acessível. Links de navegação continuam internos. A primeira interação touch não é consumida pelo feedback visual das especialidades.
- Removido o aviso temporário de contato da interface. Sem número confirmado, as CTAs conservam `#contact` e estado de indisponibilidade; não há número fictício nem envio simulado.
- Hero mobile em 100svh, headline e CTA completos, apoio oculto apenas até 768px, retrato enquadrado abaixo do texto. Header/menu/chat compactos.
- Mobile mantém a abertura radial por clip, diagnóstico em quatro estados com círculo/arco e roadmap em stacking com deslocamento horizontal. GSAP matchMedia/context, scrub e cleanup; scroll nativo. A quantidade de núcleos não remove animações. Especialidades, sistemas e pilhas mantêm seus reveals, traços, movimentos e controles.
- Original com Apple restaurado sem editar os pixels. Extensão do plano da mesa por CSS, diagonal aproximada de 58°, até a linha do footer. Nenhum raster novo.
- Hero HTML desktop, footer HTML e textos das oito demais seções idênticos ao snapshot desta etapa. Paleta e tipografia global preservadas. Prova em `../final-production-qa/scope-and-assets-final.json`.

## Matriz de renderização

Auditoria no Chromium integrado: home + nove destinos por tamanho, 70 estados, além de scrub/reversão e variações de altura. Todos sem overflow horizontal positivo, imagens quebradas, erros registrados pelo site ou IDs de ScrollTrigger duplicados.

| Viewport CSS | Hero mobile em uma viewport | Apoio da Hero | Pin final | Gap cena/footer |
|---|---|---|---:|---:|
| 1440 × 810 | Desktop preservado | visível | 1 | 0px |
| 1280 × 720 | Desktop preservado | visível | 1 | 0px |
| 1024 × 768 | Desktop preservado | visível | 1 | 0px |
| 768 × 1024 | sim | oculto | 1 | 0px |
| 430 × 932 | sim | oculto | 1 | 0px |
| 393 × 852 | sim | oculto | 1 | 0px |
| 390 × 844 | sim | oculto | 1 | 0px |

A mesa termina no limite inferior da cena em todos os sete tamanhos: diferença medida de 0px. Apple e rosto visíveis no original, sem distorção. Capturas `fechamento-final-*.png`.

Safari nativo voltou a ficar acessível nesta retomada. Hero e fechamento inspecionados nos mesmos sete tamanhos via iframe de QA. Telemetria nativa registrou zero erros, imagens quebradas ou overflow positivo; o zoom da janela produz arredondamentos de até 1px (por exemplo, 393 × 852 reportado como 392 × 851). Diagnóstico 4/4, roadmap 04 e expansão final também inspecionados. Evidências: `safari-matrix-ax.json`, `safari-*.png` e estados AX. A matriz principal corresponde a dimensões CSS exatas no Chromium integrado.

## Motion, acessibilidade e navegação

- Abertura radial 0/50/100%; diagnóstico 1/4 → 4/4 e retorno; roadmap 01 → 04 e retorno; reveal final 0/50/100%. Um trigger por sequência. Estados aria acompanham a etapa visível.
- Mudanças 390 × 844 → 740 → 568 → 844: Hero acompanha a altura; círculo e cards legíveis. Abaixo de 620px de altura, somente a experiência final sai do pin; diagnóstico e roadmap continuam ligados ao scroll. Sem pin-spacer final residual após reconstrução.
- Movimento reduzido e bibliotecas ausentes: conteúdo em fluxo, zero pins/triggers, sem loader preso, erros ou overflow. Preferência do sistema não alterada.
- Seis links do footer acionados por clique real; menu abre e fecha por Escape. Controle de pilha abre por clique e fecha por Enter. Foco, nomes e estados acessíveis preservados.
- URLs confirmadas mantidas: Instagram `https://www.instagram.com/vinicius.olliveira/`, LinkedIn `https://www.linkedin.com/in/vinicius-oliveira1998/`, MGL `https://www.mglgrowth.eu/`. Links externos com nova aba e proteção de opener. Nenhuma mensagem enviada.
- Console da sessão final Chromium: nenhum erro/aviso. O monitor de erros da página também permaneceu vazio nas matrizes Chromium e Safari.

## Verificação automatizada

`node tests/motion-regression.cjs`: **51 verificações aprovadas**. Incluem todas as CTAs compartilhando configuração/mensagem, rejeição de destinatário inválido, ausência de número fictício, lifecycle, deep link, Lenis, mudança de breakpoint, quatro núcleos, scrub reversível, aria, reduced motion e fallback. São testes de lógica com doubles; não substituem a inspeção visual acima.

`node --check dist/app.js`, `node --check dist/config.js`, validação HTML/âncoras/assets/HTTP/dimensões e `git diff --check`: aprovados. Hashes dos dois PNGs originais preservados.

## Pendência real e limites

1. **Número oficial de WhatsApp ausente.** Foram auditados código/config, histórico Git, materiais e anexos recebidos, ZIP e documentos locais pertinentes. Nenhum número foi confirmado. `whatsappNumber` está vazio de propósito. O mecanismo e as 13 CTAs estão preparados, mas a abertura real de WhatsApp mobile/Web não pode ser validada nem declarada funcional sem o destinatário correto.
2. Testes mobile são viewports CSS em navegadores do computador. Não houve iPhone físico nem simulação da barra dinâmica real do Safari iOS; mudanças de altura e uso de `svh` foram verificados. Não se trata de métricas de produção nem teste com leitor de tela.

## Arquivos desta etapa

Site: `dist/index.html`, `dist/styles.css`, `dist/app.js`, `dist/config.js`, `dist/assets/asset-provenance.json`. Nenhum PNG alterado.

Testes: `tests/motion-regression.cjs`. Documentação: `README.md`, `CLOSING-ASSET.md`, `QA.md`, `FINAL-QA.md`.

Suporte fora do site: `../../work/final-production/`, `../../work/validate_site.py`. Evidências: `../final-production-qa/` (matrizes, estados, hashes e screenshots). A instrumentação de QA não é carregada no preview de produção.
