/** Inspira FAM — endpoint somente leitura para atividades públicas.
 * 1. Crie uma planilha NOVA (não use a planilha de contatos internos).
 * 2. Importe as colunas da aba ATIVIDADES conforme README.
 * 3. Cole este script em Extensões > Apps Script.
 * 4. Implante como Aplicativo da Web, executar como você, acesso: qualquer pessoa.
 * 5. Cole a URL /exec em config.js.
 */
const TAB = 'ATIVIDADES';
const FIELDS = ['id','tipo','titulo','responsaveis','descricao','data','horario','local','publico','vagas','status','sympla','foto','duracao'];
function doGet() {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(TAB);
  if (!sh) return respond({atividades:[],erro:'Aba ATIVIDADES não encontrada'});
  const rows = sh.getDataRange().getDisplayValues();
  const headers = rows.shift().map(x=>x.trim());
  const atividades = rows.filter(row=>row.some(Boolean)).map(row=>{
    const item = {};
    FIELDS.forEach(field=>{const idx=headers.indexOf(field);item[field]=idx<0?'':String(row[idx]||'').trim()});
    if(!['abertas','esgotadas','encerradas','em_breve'].includes(item.status))item.status='em_breve';
    if(!['palestras','workshop'].includes(item.tipo))item.tipo='workshop';
    return item;
  }).filter(item=>item.id&&item.titulo);
  return respond({atividades});
}
function respond(data){return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON)}
