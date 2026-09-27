const http = require('http');
const PORT = Number(process.env.SAHA_AI_PORT || 8787);
const API_KEY = process.env.OPENAI_API_KEY;
const MODEL = process.env.SAHA_AI_MODEL || 'gpt-5';
function send(res, code, body){res.writeHead(code, {'Content-Type':'application/json; charset=utf-8','Access-Control-Allow-Origin':'*'});res.end(JSON.stringify(body));}
const server=http.createServer(async(req,res)=>{
 if(req.method==='OPTIONS'){res.writeHead(204,{'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'Content-Type','Access-Control-Allow-Methods':'POST,OPTIONS'});return res.end();}
 if(req.method!=='POST'||req.url!=='/ask')return send(res,404,{error:'Not found'});
 if(!API_KEY)return send(res,503,{error:'OPENAI_API_KEY غير مضبوط على الخادم'});
 let raw=''; for await(const c of req) raw+=c; let body; try{body=JSON.parse(raw)}catch{return send(res,400,{error:'بيانات غير صالحة'})}
 const question=String(body.question||'').trim(); if(!question)return send(res,400,{error:'السؤال فارغ'});
 const context=JSON.stringify(body.context||{});
 const instructions='أنت مساعد مشروع ساحة الدولي لإدارة المستودعات. أجب بالعربية بوضوح واختصار. استخدم فقط البيانات الموجودة في السياق المرسل. إذا لم تجد المعلومة قل بوضوح إنها غير موجودة. لا تخترع أرصدة أو أسعارًا أو مهام. لا تكشف كلمات المرور أو المفاتيح أو البيانات السرية. لا تنفذ عمليات مخزنية أو تغير بيانات؛ أنت مساعد قراءة وتحليل فقط.';
 try{
  const r=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{'Authorization':`Bearer ${API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({model:MODEL,instructions,input:`السياق:
${context}

سؤال المستخدم:
${question}`,store:false})});
  const data=await r.json(); if(!r.ok)return send(res,r.status,{error:data?.error?.message||'فشل طلب الذكاء الاصطناعي'});
  return send(res,200,{answer:data.output_text||'لم تصل إجابة نصية.'});
 }catch(e){return send(res,502,{error:e.message||'تعذر الاتصال بخدمة الذكاء الاصطناعي'});}
});
server.listen(PORT,'127.0.0.1',()=>console.log(`Saha AI gateway listening on ${PORT}`));
