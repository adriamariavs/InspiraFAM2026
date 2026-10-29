# INSPIRA FAM — EXPERIENCE 2026 (atualização)

## Arquivos e publicação

Substitua no projeto original os arquivos `index.html`, `inscricoes.html`, `faq.html`, `mapa.html`, `style.css` e `script.js` pelos desta pasta. **Acrescente** `activities.js`, `activities.json` e `config.js` na mesma pasta. Os arquivos originais de mídia **não foram enviados**: mantenha a pasta existente `ativos/` no servidor, incluindo logotipos, stickers, fotos, vídeos e demais recursos.

O mapa permanece como estava, aguardando o mapa oficial. A galeria e as interações existentes foram preservadas. Os logos de patrocinadores e apoiador e as imagens dos artistas/ministrantes são espaços reservados; não são imagens oficiais.

## Atualizar informações sem mexer no código

1. Crie **outra** planilha Google Sheets, exclusiva para os dados públicos das atividades. Nunca publique a planilha de contatos da organização.
2. Crie uma aba chamada `ATIVIDADES`. Na primeira linha, escreva exatamente os cabeçalhos abaixo (sem acentos):

`id | tipo | titulo | responsaveis | descricao | data | horario | local | publico | vagas | status | sympla | foto | duracao`

3. Copie as oito atividades do arquivo `activities.json` para as linhas seguintes, preservando os identificadores `id` e os valores `tipo` (`palestras` ou `workshop`). Pode importar os dados manualmente ou usar uma conversão JSON→CSV; o importante é manter os cabeçalhos.
4. Em **Extensões → Apps Script**, cole `google-apps-script.gs`. Implante como **Aplicativo da Web**: executar como você e acesso a qualquer pessoa (somente leitura dos dados públicos). Copie a URL terminada em `/exec`.
5. Abra `config.js` e coloque a URL entre aspas em `window.INSPIRA_ACTIVITIES_ENDPOINT`. Esta configuração é feita **uma única vez**.
6. Publique os arquivos atualizados. Depois, editar a planilha muda o conteúdo do site sem publicar código novamente. A página atualiza ao abrir e consulta novamente a cada 2 minutos.

**Status permitidos:** `em_breve`, `abertas`, `esgotadas`, `encerradas`.

**Links:** o botão de inscrição só aparece com status `abertas` e URL HTTPS válida do domínio Sympla. Mesmo que o site indique vagas esgotadas, é necessário também encerrar as vagas no próprio Sympla; não há sincronização de capacidade em tempo real.

**Fotos:** a coluna `foto` aceita URL pública HTTPS de uma imagem. Caso esteja vazia, aparece um placeholder gráfico. Para várias fotos na palestra, será necessário complementar a interface posteriormente; a versão atual exibe o grupo de palestrantes em texto e uma imagem geral opcional.

**Atenção ao Apps Script:** dependendo da configuração de hospedagem e dos redirecionamentos do Google, o acesso direto via `fetch` pode ser bloqueado por CORS. Teste a URL publicada no navegador e a página no domínio final. Se houver bloqueio, hospede um proxy de leitura no mesmo domínio (ou uma exportação JSON pública atualizada automaticamente) em vez de expor credenciais. **Não considerar a integração concluída antes desse teste.**

## Itens ainda pendentes

- Links individuais do Sympla (sete workshops e uma inscrição para palestras).
- Salas dos workshops, fotos e descrições aprovadas pelos ministrantes.
- Logos oficiais de Dókimos, APR3D, Foto Príncipe e Art Up.
- Imagens dos artistas; especialidades e links sociais.
- Confirmar condições de acesso às palestras e feirinha, bem como eventual cobrança da Shadowbox.
- Confirmar o horário geral da feirinha (19h–22h).

## Testes antes de publicar

- Abra via servidor HTTP local, não `file://`, porque `activities.json` é carregado com `fetch`.
- Teste a página de inscrições em 360px, 390px, tablet e desktop.
- Abra/feche modais por botão, clique fora e ESC.
- Confira a galeria e menu mobile no projeto com a pasta `ativos/` original.
- Confirme a conexão da planilha e todos os oito links Sympla antes de liberar inscrições.

## NOVO: confirmação do e-mail @fam.edu.br para palestras e workshops

Os **oito cards** agora indicam exclusividade para alunos FAM. Quando o status da atividade for `abertas` e houver link Sympla válido, o botão do modal abre a verificação institucional. O aluno informa um e-mail `@fam.edu.br`, recebe um código de seis dígitos, confirma o código e só então vê o botão do Sympla. Sem serviço configurado, o site **não finge enviar códigos** e exibe um aviso de indisponibilidade.

### Configuração obrigatória do serviço de códigos

1. Crie um **projeto Apps Script separado** para a verificação, com o conteúdo de `verificacao-email.gs`. Não misture com o endpoint de leitura da planilha.
2. Em **Configurações do projeto → Propriedades do script**, crie `OTP_SECRET` com um valor aleatório longo (mínimo 32 caracteres), mantido somente no servidor. Não o coloque no HTML nem em `config.js`.
3. Autorize o serviço `MailApp` para envio de e-mails com a conta da organização. Considere limites diários de envio e regras da instituição.
4. Implante como **Aplicativo da Web**, executado como o proprietário, acesso **Qualquer pessoa**. Copie a URL `/exec` para `window.INSPIRA_VERIFICATION_ENDPOINT` em `config.js`.
5. Teste o envio e a confirmação usando um e-mail real `@fam.edu.br` e uma atividade com status `abertas` e link do Sympla de teste.
6. **Atenção:** o Google Apps Script pode bloquear `fetch` cross-origin devido a CORS/redirecionamentos. Teste no domínio publicado antes de anunciar o recurso. Se houver bloqueio, será necessário hospedar um endpoint compatível com CORS no mesmo domínio ou em um serviço backend próprio. Não desative a validação como solução.

**Limitações de segurança:** a verificação confirma somente o controle de um endereço `@fam.edu.br`; não confirma matrícula ativa. O Sympla continua com um link público, que pode ser compartilhado ou acessado diretamente. Para bloquear efetivamente inscrições de não alunos, configure **restrição de acesso no Sympla**, convites individuais, validação de matrícula ou uma integração com autenticação institucional. A verificação via site é uma etapa adicional, não uma proteção absoluta. Também é aconselhável acrescentar limites de requisição por IP/CAPTCHA em uma infraestrutura backend própria antes de um lançamento com alto volume.
