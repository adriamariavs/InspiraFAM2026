# Inspira FAM Experience 2026

Site estático completo: abra dist/index.html ou publique o conteúdo de dist.

Páginas: Evento, Inscrições, Mapa e FAQ.
Programação e mapa: EM BREVE. Estacionamento: Av. Unitika.
Datas mantidas dos arquivos enviados: 9–12 novembro 2026, 19h–22h.

## Galeria
Os anexos não incluem fotografias ou vídeo. A galeria mostra prévias dos mascotes com aviso de fotografias em breve. Substitua as imagens e legendas dos cartões memory-card por fotografias reais quando disponíveis. A navegação e ampliação já estão prontas.

## Inscrições
Integração original com Google Apps Script preservada, sem cadastros de teste em produção. É necessário validar um cadastro real autorizado e o e-mail de confirmação antes da divulgação pública.

## Onde editar
- dist/index.html: página inicial; busque `edition-list` para edições anteriores e `memory-card` para galeria.
- dist/mapa.html: mapa em breve e estacionamento.
- dist/faq.html: perguntas dentro de `details`.
- dist/inscricoes.html: formulários de visitante/comercial.
- dist/style.css: blocos comentados; revisão responsiva e stickers no bloco 10. Breakpoints em 600, 760, 900 e 1200 px.
- dist/script.js: menu, galeria, formulários e bloco RETORNO / NAVEGAÇÃO.

Os stickers adicionais usam grid/flex no fluxo da página. O alvo #top está no body, pois o cabeçalho fixo não representa o início da rolagem.
