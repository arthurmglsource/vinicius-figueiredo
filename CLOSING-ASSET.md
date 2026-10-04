# Fechamento horizontal — mapeamento e asset

Revisão de 4 de outubro de 2026. Referência: https://vooban.com/a-propos. As instruções atuais substituem a abertura vertical anterior. Nenhuma imagem, texto ou marca da Vooban é incorporada ao site.

## Anexos, na ordem enviada

| Print | Seção / papel | Comportamento | Correção |
|---|---|---|---|
| 1 | Fechamento atual, inicial | Nome já legível em duas linhas | Iniciar glifos sobrepostos em uma baseline central |
| 2 | Fechamento atual, intermediário | Letras se afastam verticalmente, arte pequena | Substituir por dispersão horizontal e reveal central |
| 3 | Fechamento atual, avançado | Arte anterior com moldura cream | Usar a nova arte sem moldura acrescentada |
| 4 | Fechamento atual, outro viewport | Faixas e duas linhas afastadas em Y | Remover faixas/duplicação, controlar cada letra em X |
| 5 | Vooban, tipografia | Faixas de apresentação da referência | Referência de escala; não replicar a separação vertical rejeitada no pedido |
| 6 | Vooban, reveal intermediário | Imagem nasce central, letras abrem lateralmente | Reveal e dispersão na mesma timeline de scroll |
| 7 | Vooban, estágio avançado | Arte quase cobre viewport e letras nas bordas | Expandir quadro em largura e altura, dispersar letras para fora |
| 8 | Nova arte horizontal | Vinicius, MacBook/Apple, VF, colagem azul | Asset principal, sem edição |

## Asset

`dist/assets/vinicius-editorial-horizontal.png`: PNG original copiado byte a byte do oitavo anexo. 1672 × 941; SHA-256 `2c897d22b0ee2f38a6522d49962b2c28b8958ac2141c4623dc5483d554a47960`. Sem retoque, filtro, distorção do rosto ou alteração da Apple. Object-fit cover apenas no enquadramento responsivo.

## Sequência

Uma timeline em gsap.context, scrub verdadeiro e pin com espaço reservado. Glifos em uma única baseline: sobreposição central → abertura horizontal parcialmente sobreposta → nome aberto → dispersão para as bordas. Arte nasce pequena no centro e cresce em largura e altura até 100vw × 100svh no desktop. No mobile, amplitude reduzida e altura final de 68svh para manter rosto e Apple no enquadramento. Reduced motion e bibliotecas indisponíveis: nome legível e arte em fluxo estático.
