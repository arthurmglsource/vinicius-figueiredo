# Duas correções finais — 17/10/2026

## Implementado

- Os dois links de Instagram do rodapé abrem `https://www.instagram.com/vinicius.olliveira/`, com `_blank` e `noopener noreferrer`. Nome visível e aria-label atualizados; ícones, estilos e espaçamentos mantidos.
- Não há referência ao username antigo nem URL genérica do Instagram no projeto.
- Removidas a extensão esticada do notebook e a Apple sobreposta. Nenhum uso da imagem proibida permanece no HTML/CSS/JS ou nos assets distribuídos.
- Foto aprovada, corpo, rosto, escala, posição, mesa e código de animação preservados. Nenhuma outra seção alterada.

## Validação

- Inspeção visual: 1672×941, 1440×810, 1280×720, 1024×768, 768×1024, 430×932, 393×852 e 390×844.
- Todos sem overflow horizontal, imagens quebradas ou erros capturados no site.
- Comparação antes/depois: geometria do retrato e da mesa igual, com variação inferior a 1px associada ao arredondamento de ScrollTrigger.
- Comparação de pixels mobile: mudanças limitadas à retirada da Apple sobreposta; nenhum outro pixel da seção mudou nas capturas 768, 430 e 390.
- 51 testes de regressão aprovados; validação de arquivos, HTTP e âncoras aprovada; `git diff --check` aprovado.
- Evidências em `../two-final-fixes-qa/`: before/after, footer, comparison, scope e links.

## Limitação real — notebook completo não concluído

A lateral direita está cortada no próprio PNG aprovado, que também não contém a Apple. Sem trocar essa fotografia ou reconstruir a tampa, não existe conteúdo original para revelar. A correção total solicitada do MacBook não pode ser declarada concluída sob essas restrições.

A proibição mais recente da imagem alternativa exige retirar também a Apple sobreposta no mobile. Layout, foto e composição mobile permanecem, mas o resultado não é pixel a pixel igual ao anterior nessa pequena região. Nenhum logo foi desenhado ou transplantado de outra imagem.

Sem deploy ou publicação.
