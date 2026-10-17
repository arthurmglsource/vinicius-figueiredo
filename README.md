# Vinicius Figueiredo

Estado atual de 17/10/2026: fechamento em camadas reais, com gradiente e mesa em CSS, PNGs originais separados, textos/CTA em HTML e abertura VF preservada. O acabamento do MacBook corrige somente os contornos de extração, mantendo posição, escala, layout e animação. Ver [CLOSING-ASSET.md](CLOSING-ASSET.md) e [MACBOOK-FINISH-QA.md](MACBOOK-FINISH-QA.md). As descrições abaixo de versões anteriores são históricas.

Site estático em português brasileiro. Fechamento atualizado com a nova direção limpa: brand reveal VF, fotografia original e integração ao rodapé. As revisões anteriores dos números/pilares e da estrutura foram preservadas. A hero aprovada foi preservada. Identidade: Royal Blue `#014BAA` e Light Cream `#F8F3F0`.

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
- `dist/assets/`: foto aprovada da hero em WebP, recorte final prioritário em PNG, painéis SVG e bibliotecas locais.
- `dist/assets/asset-provenance.json`: origem dos recortes.

## Contato pendente

Nenhum número oficial de WhatsApp foi encontrado no projeto, histórico ou referências recebidas. `whatsappNumber` em `dist/config.js` permanece vazio. Preencher apenas com o número internacional confirmado (DDI + número). `whatsappMessage` centraliza o texto pré-preenchido; o código gera uma única URL `https://wa.me/` para as 13 CTAs comerciais. Sem destinatário, não há link externo fictício nem aviso temporário na interface; os links conservam a âncora final com `aria-disabled`. Navegação interna e redes sociais permanecem independentes.

## Design e animação

O arquivo da foto da hero permanece idêntico à versão aprovada. A hero usa logo, texto traseiro, retrato, contorno e preenchimento frontal com máscara SVG. A entrada dura aproximadamente 1,74 s e pode ser encerrada por rolagem, toque ou teclado. Cada seção combina máscaras, linhas de texto, construção de traços e pequenos deslocamentos conforme seu conteúdo.

O desktop com ponteiro preciso usa Lenis integrado ao ciclo de atualização do GSAP. Mobile e tablet usam rolagem nativa. Até 768px, a abertura radial, o diagnóstico 1/4–4/4 e o roadmap em stacking mantêm scrub ligado ao scroll, com estágios sticky. A quantidade de núcleos não remove movimentos. Economia de dados e movimento reduzido mantêm conteúdo em fluxo. `prefers-reduced-motion` desativa as animações. As animações e os eventos são desfeitos nas mudanças de contexto e na saída da página.

Os painéis de mídia, CRM e automação são SVGs originais, sem métricas comerciais inventadas. Cada pilha contém três camadas reais, parallax sincronizado ao scroll e controle de abertura acessível. A introdução dos pilares reúne eyebrow, headline e CTA. Três timelines agrupadas fazem os números atravessarem a composição de baixo para cima.

O fechamento começa com o monograma VF centralizado em cream. Uma máscara SVG expande a mesma marca para revelar o fundo limpo, o retrato original e a copy em HTML. Texto e CTA entram em sequência; a base se integra ao rodapé preservado. Uma única timeline com scrub e cleanup controla o pin. No mobile de pouca altura, em movimento reduzido, economia de recursos e sem bibliotecas, a cena permanece acessível em fluxo. O fechamento usa o PNG definitivo inteiro, sem editar rosto, corpo, MacBook ou mesa. A Apple já está no asset; não existe janela independente nem logo desenhada. A imagem se encaixa na abertura original, cuja timeline permanece idêntica. Detalhes e hash em CLOSING-ASSET.md.

As duas seções excluídas não deixam componentes, estilos, gatilhos ou wrappers vazios. Experiências e Sistemas agora usam altura intrínseca, sem os espaços excedentes causados pela altura fixa anterior. Hero, identidade global, cards aprovados e demais cenas foram preservados.

## Experiências profissionais

As oito marcas fictícias e seus arquivos foram removidos. A seção Experiências apresenta a trajetória profissional real informada pelo usuário: WIWAP, EY, Grupo Minas Telecom, Grupo Tigre, ClubPetro e Bolt Júnior/UNIFEI. As marcas oficiais e suas fontes estão registradas em EXPERIENCE-ASSETS.md; essas empresas não são apresentadas como clientes.

O monograma foi vetorizado a partir dos contornos visíveis. A fonte Inter foi escolhida por proximidade visual; o arquivo da fonte original do layout não foi fornecido.

## Dependências locais

GSAP, ScrollTrigger e SplitText 3.13.0; Lenis 1.3.26; Inter (Google Fonts). Bibliotecas e fontes estão incluídas no site para manter a mesma renderização após publicação.

QA.md registra a auditoria atual, evidências, testes e limites de validação por navegador.


## Footer

Footer editorial em três colunas, empilhado no mobile, com navegação suave para as seções e redes sociais fornecidas no preview aprovado. O crédito MGL aponta para https://www.mglgrowth.eu/, endereço oficial fornecido pelo proprietário, e abre em nova aba. A auditoria local está registrada em QA.md.

## Copy comercial — revisão de 16/10/2026

A narrativa agora começa na perda de vendas entre o lead e o fechamento. Especialidades descrevem falhas operacionais, o método parte do diagnóstico e as entregas são seguidas pela experiência real e pelo convite para mapear a operação. Layout, identidade, fotografias e coreografias GSAP existentes foram preservados; há ajustes de encaixe para a extensão dos textos. O comparativo completo anterior → novo e as referências editoriais estão em [COPY.md](COPY.md).

A auditoria final substitui a configuração antiga `contactUrl` por `whatsappNumber` e `whatsappMessage`. O número oficial continua ausente nos materiais; consulte o bloco Contato pendente acima e [FINAL-QA.md](FINAL-QA.md).

Validação desta revisão: `node tests/motion-regression.cjs` e `COPY-QA.md`. Não houve deploy.

## Auditoria final de produção — 16/10/2026

Hero mobile em 100svh, chat compartilhado nas CTAs, Apple original e mesa diagonal. Diagnóstico, abertura radial e roadmap mantêm a progressão por scroll no mobile. Hero desktop e footer preservados. Resultados e limitações verificáveis em [FINAL-QA.md](FINAL-QA.md). Sem deploy.

## Referência final obrigatória — 16/10/2026

O retrato atual é `vinicius-closing-clean.png`, idêntico ao anexo repetido pelo usuário. A foto alternativa não é mais utilizada como retrato. Ajustes de proporção, alinhamento e mesa limitados ao fechamento; footer e seções anteriores preservados. Fonte e validação em [CLOSING-REFERENCE-QA.md](CLOSING-REFERENCE-QA.md).
