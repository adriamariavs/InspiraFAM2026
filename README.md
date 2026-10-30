# INSPIRA FAM — Experience 2026 | Versão simplificada

- Um único link público do Sympla para todos os ingressos: https://www.sympla.com.br/evento/inspira-fam---experience/3603612
- Sem integração Google Sheets e sem validação por e-mail. Palestras e workshops seguem indicados como exclusivos a alunos FAM, mas o site não verifica matrícula. A organização deve controlar acesso no Sympla/credenciamento.
- O site usa `activities.json` local. Publique os arquivos por servidor HTTP/HTTPS, não abrindo `file://`.
- Todas as referências a Feirinha no site foram alteradas para **Vitrine Experience**. O ingresso no Sympla continua com seu nome original **Ingresso para Feira**.
- Quarto patrocinador: salve seu logo como `ativos/patrocinadores/novo-patrocinador.png`. O card já está criado, com espaço reservado até a imagem existir. Para outros logos, prefira PNG transparente ou SVG exportado para PNG, com margens equilibradas; o CSS usa `object-fit:contain` para não cortar.
- Fotos dos 13 artistas: salve arquivos JPG em `ativos/artistas/` com os nomes abaixo. Enquanto não existirem, os mascotes originais aparecem como fallback (é necessário manter a pasta `ativos/brand/` do site original).
- adara-calil.jpg
- pedro-leonelli.jpg
- alexia.jpg
- dr-blue.jpg
- amanda-emidio.jpg
- diego.jpg
- miria.jpg
- alice-fam.jpg
- gustavo-oliveira.jpg
- czarina-artesanatos.jpg
- atelie-da-grazy.jpg
- beatriz-ciufri.jpg
- eduarda-oliveira.jpg

- Fotos dos artistas usam `object-fit:cover` e podem ter cortes nas bordas; centralize o rosto/objeto no enquadramento. Sugestão: JPG 1000x800 px, até 350 KB cada.
- Mantenha toda a pasta original `ativos/brand/` no servidor: ela não veio no ZIP anterior.
- Confirme que todas as inscrições abrem o Sympla e selecione manualmente o ingresso desejado.
