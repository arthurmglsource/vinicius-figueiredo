# Vinicius Figueiredo

Site estático em português brasileiro. Revisão orientada pelos 20 prints ordenados e pelos 11 itens enviados em 3 de outubro: serviços, abordagem, método, plano de projeto, sistemas, números, Missão/Visão/Valores, princípios e fechamento antes do CTA. A hero aprovada foi preservada. Identidade: Royal Blue `#014BAA` e Light Cream `#F8F3F0`.

## Executar

Na pasta deste projeto:

```sh
python3 -m http.server 54562 --directory dist
```

Abra `http://localhost:54562` no Safari. Não há etapa de compilação nem dependência de CDN em tempo de execução.

## Estrutura

- `dist/index.html`: conteúdo e camadas semânticas.
- `dist/styles.css`: composição e adaptação para desktop, tablet e celular.
- `dist/app.js`: GSAP, ScrollTrigger, SplitText, Lenis, menu acessível e contato.
- `dist/config.js`: destino de contato.
- `dist/assets/`: foto original convertida em WebP, recortes aprovados e bibliotecas locais.
- `dist/assets/asset-provenance.json`: origem dos recortes.

## Contato pendente

O usuário ainda não informou WhatsApp, e-mail ou agenda. Por isso, o botão final está marcado como indisponível, sem simular envio. Preencha `contactUrl` em `dist/config.js` com um endereço aprovado (`https://`, `mailto:` ou `tel:`). Essa configuração ativa o botão final e conecta as demais CTAs ao mesmo destino.

## Design e animação

O arquivo da foto da hero permanece idêntico à versão aprovada. A hero usa logo, texto traseiro, retrato, contorno e preenchimento frontal com máscara SVG. A entrada dura aproximadamente 1,74 s e pode ser encerrada por rolagem, toque ou teclado. Cada seção combina máscaras, linhas de texto, construção de traços e pequenos deslocamentos conforme seu conteúdo.

O desktop com ponteiro preciso usa Lenis integrado ao ciclo de atualização do GSAP. Mobile, tablet, movimento reduzido e dispositivos com economia de dados ou até quatro núcleos usam rolagem nativa. O método tem progressão em quatro etapas com posicionamento sticky em telas amplas; nos demais casos, todas as etapas ficam disponíveis em sequência vertical. `prefers-reduced-motion` desativa as animações. As animações e os eventos são desfeitos nas mudanças de contexto e na saída da página.

Os painéis de mídia, CRM e automação são SVGs originais, nítidos e sem métricas comerciais inventadas. Cada pilha contém três camadas reais, parallax sincronizado com o scroll e um controle de abertura acessível. Missão, Visão e Valores usam cartões editoriais sobre um fundo vetorial de conexões. Princípios usam composição editorial com cartões verticais contornados. O fechamento abre o nome completo e revela um painel de crescimento.

## Empresas reais pendentes

As oito marcas fictícias e seus arquivos foram removidos. A seção Clientes aguarda a lista de empresas reais e logos oficiais fornecidas ou confirmadas pelo usuário; não há clientes inventados publicados.

O monograma foi vetorizado a partir dos contornos visíveis. A fonte Inter foi escolhida por proximidade visual; o arquivo da fonte original do layout não foi fornecido.

## Dependências locais

GSAP, ScrollTrigger e SplitText 3.13.0; Lenis 1.3.26; Inter (Google Fonts). Bibliotecas e fontes estão incluídas no site para manter a mesma renderização após publicação.

O arquivo QA.md registra a verificação no Safari e seus limites.
