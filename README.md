# Vinicius Figueiredo

Site estático em português brasileiro, com sete seções na ordem dos prints aprovados. Identidade: Royal Blue `#014BAA` e Light Cream `#F8F3F0`.

## Executar

Na pasta deste projeto:

```sh
python3 -m http.server 54562 --directory dist
```

Abra `http://localhost:54562` no Safari. Não há etapa de compilação nem dependência de CDN em tempo de execução.

## Estrutura

- `dist/index.html`: conteúdo e camadas semânticas.
- `dist/styles.css`: composição e adaptação para desktop, tablet e celular.
- `dist/app.js`: GSAP, ScrollTrigger, SplitText, menu acessível e contato.
- `dist/config.js`: destino de contato.
- `dist/assets/`: foto original convertida em WebP, recortes aprovados e bibliotecas locais.
- `dist/assets/asset-provenance.json`: origem dos recortes.

## Contato pendente

O usuário ainda não informou WhatsApp, e-mail ou agenda. Por isso, o botão final está marcado como indisponível, sem simular envio. Preencha `contactUrl` em `dist/config.js` com um endereço aprovado (`https://`, `mailto:` ou `tel:`). Essa configuração ativa o botão final e conecta as demais CTAs ao mesmo destino.

## Design e animação

O retrato não foi gerado nem teve rosto ou corpo alterados. A hero usa logo, texto traseiro, retrato, contorno e preenchimento frontal com máscara SVG. Há animações de entrada por linhas, recortes, pequenos deslocamentos e interações de hover. A rolagem é nativa. A preferência `prefers-reduced-motion` desativa as animações.

Logos de clientes e ilustrações foram extraídos dos prints. A resolução desses elementos é limitada à referência recebida. O monograma foi vetorizado a partir dos contornos visíveis. A fonte Inter foi escolhida por proximidade visual; o arquivo da fonte original do layout não foi fornecido.

## Dependências locais

GSAP, ScrollTrigger e SplitText 3.13.0; Inter (Google Fonts). Bibliotecas e fontes estão incluídas no site para manter a mesma renderização após publicação.
