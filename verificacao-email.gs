/** INSPIRA FAM — Verificação por e-mail institucional (Apps Script separado).
 * Implantar como Aplicativo da Web, executar como proprietário, acesso: qualquer pessoa.
 * Configure uma implantação DIFERENTE do endpoint de leitura das atividades.
 * AVISO: o link do Sympla continua público; isso é uma barreira no site, não uma
 * restrição de acesso efetiva no Sympla nem uma confirmação de matrícula.
 */
const FAM_DOMAIN = '@fam.edu.br';
const CODE_TTL_SECONDS = 600;
const MAX_ATTEMPTS = 5;
const SEND_COOLDOWN_SECONDS = 90;
function response_(obj) { return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON); }
function digest_(value) {
  const bytes=Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,value);
  return Utilities.base64EncodeWebSafe(bytes);
}
function doPost(e) {
  const lock=LockService.getScriptLock();
  try {
    if(!lock.tryLock(10000))return response_({ok:false,message:'Serviço ocupado. Tente novamente.'});
    const payload=JSON.parse(e.postData.contents||'{}');
    const email=String(payload.email||'').trim().toLowerCase();
    const activityId=String(payload.activityId||'').trim();
    if(!/^[^\s@]+@fam\.edu\.br$/.test(email)||!/^[a-z0-9_-]{2,60}$/i.test(activityId))return response_({ok:false,message:'Informe um e-mail @fam.edu.br válido.'});
    const key=digest_(email+'|'+activityId);
    const cache=CacheService.getScriptCache();
    const props=PropertiesService.getScriptProperties();
    const secret=props.getProperty('OTP_SECRET');
    if(!secret||secret.length<32)return response_({ok:false,message:'Serviço não configurado. Contate a organização.'});
    if(payload.action==='request') {
      if(cache.get('cooldown_'+key))return response_({ok:false,message:'Aguarde antes de solicitar outro código.'});
      const code=String(Math.floor(Math.random()*1000000)).padStart(6,'0');
      const salt=Utilities.getUuid();
      const token=digest_(secret+'|'+salt+'|'+code+'|'+key);
      cache.put('otp_'+key,JSON.stringify({token,salt,attempts:0}),CODE_TTL_SECONDS);
      cache.put('cooldown_'+key,'1',SEND_COOLDOWN_SECONDS);
      MailApp.sendEmail({to:email,subject:'INSPIRA FAM — Código de verificação',body:'Seu código de verificação é: '+code+'\n\nValidade: 10 minutos. Se você não solicitou este código, ignore esta mensagem.'});
      return response_({ok:true,message:'Código enviado.'});
    }
    if(payload.action==='verify') {
      const code=String(payload.code||'').trim();
      if(!/^\d{6}$/.test(code))return response_({ok:false,message:'Código inválido.'});
      const record=cache.get('otp_'+key);
      if(!record)return response_({ok:false,message:'Código expirado. Solicite outro.'});
      const entry=JSON.parse(record);
      if(entry.attempts>=MAX_ATTEMPTS){cache.remove('otp_'+key);return response_({ok:false,message:'Limite de tentativas. Solicite outro código.'})}
      if(digest_(secret+'|'+entry.salt+'|'+code+'|'+key)!==entry.token){
        entry.attempts++;cache.put('otp_'+key,JSON.stringify(entry),CODE_TTL_SECONDS);
        return response_({ok:false,message:'Código incorreto.'});
      }
      cache.remove('otp_'+key);
      return response_({ok:true,verified:true});
    }
    return response_({ok:false,message:'Operação inválida.'});
  }catch(err){console.error(err);return response_({ok:false,message:'Erro no serviço. Tente novamente mais tarde.'})}
  finally{lock.releaseLock()}
}
