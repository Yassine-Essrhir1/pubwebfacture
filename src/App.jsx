import { useState, useRef, useCallback, useEffect } from "react";
import { supabase } from "./supabase.js";

// ── ASSETS ─────────────────────────────────────────────────────────────────
const LOGO_DM  = "data:image/png;base64,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";
const LOGO_PW  = import.meta.env.VITE_LOGO_PW || LOGO_DM;
const CACHET   = import.meta.env.VITE_CACHET || "";
const SIG_DEF  = import.meta.env.VITE_SIGNATURE || "";

const APP_PASSWORD = "yassine";

const C = {
  bg:"#F7F8FA",sidebar:"#1A1F2E",sbBorder:"#252B3B",sbText:"#8B95A8",sbActive:"#FFFFFF",
  card:"#FFFFFF",border:"#E5E9F0",accent:"#1A3A8F",accentLight:"#EEF2FF",gold:"#C9A440",
  red:"#DC2626",redLight:"#FEF2F2",green:"#16A34A",greenLight:"#F0FDF4",
  orange:"#EA580C",orangeLight:"#FFF7ED",text:"#0F172A",muted:"#64748B",tableHead:"#1A1F2E",
};

const ALNO_CLIENT = {
  id:"alno-fixed",nom:"Société ALNO",ice:"002765627000029",
  adresse:"LOT ZINA 25-4 AV MOHAMMED V 2EME ETAGE TEMARA",ville:"Temara",
  tel:"",email:"",code:"01122",notes:"Client principal",isAlno:true,
};

const fmt = n => Number(n||0).toLocaleString("fr-MA",{minimumFractionDigits:2,maximumFractionDigits:2});
const today = () => new Date().toISOString().split("T")[0];

function numberToWords(n) {
  const u=["","un","deux","trois","quatre","cinq","six","sept","huit","neuf","dix","onze","douze","treize","quatorze","quinze","seize","dix-sept","dix-huit","dix-neuf"];
  const t=["","","vingt","trente","quarante","cinquante","soixante","soixante","quatre-vingt","quatre-vingt"];
  function b100(n){if(n<20)return u[n];const d=Math.floor(n/10),r=n%10;if(d===7||d===9)return t[d]+"-"+u[10+r];return t[d]+(r===1&&d!==8?"-et-":r?"-":"")+(r?u[r]:"");}
  function b1000(n){if(n<100)return b100(n);const h=Math.floor(n/100),r=n%100;return(h===1?"cent":u[h]+"-cent")+(r?"-"+b100(r):"");}
  const num=Math.floor(n);
  if(num===0)return"zéro";
  if(num>=1000){const m=Math.floor(num/1000),r=num%1000;return(m===1?"mille":b1000(m)+"-mille")+(r?"-"+b1000(r):"");}
  return b1000(num);
}
const amtWords = ttc => { const w=numberToWords(Math.round(ttc)); return w.charAt(0).toUpperCase()+w.slice(1)+" dirhams (TTC)"; };

function genNum(type, counters) {
  const p={facture:"FAC",devis:"DEV",bon_commande:"BC"};
  return `${p[type]||"DOC"}-${String((counters[type]||0)+1).padStart(3,"0")}`;
}

const ST={
  brouillon:{l:"Brouillon",bg:"#F1F5F9",c:"#64748B"},
  envoyé:{l:"Envoyé",bg:"#EFF6FF",c:"#2563EB"},
  signé:{l:"Signé",bg:"#F0FDF4",c:"#16A34A"},
  payé:{l:"Payé",bg:"#F0FDF4",c:"#15803D"},
  annulé:{l:"Annulé",bg:"#FEF2F2",c:"#DC2626"},
  approuvé:{l:"Approuvé",bg:"#F0FDF4",c:"#16A34A"},
  refusé:{l:"Refusé",bg:"#FEF2F2",c:"#DC2626"},
  en_attente:{l:"En attente",bg:"#FFFBEB",c:"#D97706"},
  reçu:{l:"Reçu",bg:"#F0FDF4",c:"#16A34A"},
};

const Badge=({status})=>{const s=ST[status]||ST.brouillon;return <span style={{background:s.bg,color:s.c,borderRadius:20,padding:"3px 10px",fontSize:11,fontWeight:700,border:`1px solid ${s.c}22`}}>{s.l}</span>;};

// ── SUPABASE HOOKS ────────────────────────────────────────────────────────────
function useSupabaseTable(table) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [table]);

  const loadData = async () => {
    setLoading(true);
    const { data: rows } = await supabase.from(table).select("*").order("created_at", { ascending: false });
    setData(rows || []);
    setLoading(false);
  };

  const addItem = async (item) => {
    const { data: row } = await supabase.from(table).insert([item]).select().single();
    if (row) setData(p => [row, ...p]);
    return row;
  };

  const updateItem = async (id, item) => {
    const { data: row } = await supabase.from(table).update(item).eq("id", id).select().single();
    if (row) setData(p => p.map(x => x.id === id ? row : x));
    return row;
  };

  const deleteItem = async (id) => {
    await supabase.from(table).delete().eq("id", id);
    setData(p => p.filter(x => x.id !== id));
  };

  return { data, loading, addItem, updateItem, deleteItem, reload: loadData };
}

// ── LOGIN ─────────────────────────────────────────────────────────────────────
function Login({onLogin}){
  const[pw,setPw]=useState("");const[err,setErr]=useState(false);
  return(
    <div style={{minHeight:"100vh",background:"#0F172A",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Inter,system-ui,sans-serif"}}>
      <div style={{background:"#fff",borderRadius:16,padding:"40px 44px",width:360,boxShadow:"0 20px 60px rgba(0,0,0,.4)"}}>
        <div style={{fontSize:20,fontWeight:800,color:"#0F172A",textAlign:"center",marginBottom:4}}>Pub Web Media</div>
        <div style={{fontSize:13,color:"#64748B",textAlign:"center",marginBottom:28}}>Gestion Financière</div>
        <label style={{fontSize:12,color:"#64748B",display:"block",marginBottom:6}}>Mot de passe</label>
        <input type="password" value={pw} onChange={e=>{setPw(e.target.value);setErr(false)}}
          onKeyDown={e=>e.key==="Enter"&&(pw===APP_PASSWORD?onLogin():setErr(true))}
          style={{width:"100%",border:`1px solid ${err?"#DC2626":"#E5E9F0"}`,borderRadius:8,padding:"10px 14px",fontSize:14,outline:"none",boxSizing:"border-box"}}
          placeholder="••••••••" autoFocus/>
        {err&&<div style={{color:"#DC2626",fontSize:12,marginTop:6}}>Mot de passe incorrect</div>}
        <button onClick={()=>pw===APP_PASSWORD?onLogin():setErr(true)}
          style={{width:"100%",marginTop:16,background:"#1A3A8F",border:"none",color:"#fff",borderRadius:8,padding:12,fontWeight:700,fontSize:14,cursor:"pointer"}}>
          Accéder
        </button>
      </div>
    </div>
  );
}

// ── MODAL ─────────────────────────────────────────────────────────────────────
function Modal({title,onClose,children,wide}){
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}
      onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{background:C.card,borderRadius:16,width:"100%",maxWidth:wide?940:600,maxHeight:"92vh",overflow:"auto",boxShadow:"0 24px 64px rgba(0,0,0,.2)"}}>
        <div style={{padding:"16px 24px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,background:C.card,zIndex:1}}>
          <h2 style={{margin:0,fontSize:17,fontWeight:700,color:C.text}}>{title}</h2>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:22,color:C.muted,cursor:"pointer"}}>×</button>
        </div>
        <div style={{padding:24}}>{children}</div>
      </div>
    </div>
  );
}

const Inp=({label,value,onChange,type="text",placeholder=""})=>(
  <label style={{display:"flex",flexDirection:"column",gap:4}}>
    <span style={{fontSize:12,color:C.muted,fontWeight:500}}>{label}</span>
    <input type={type} value={value||""} onChange={e=>onChange&&onChange(e.target.value)} placeholder={placeholder}
      style={{border:`1px solid ${C.border}`,borderRadius:8,padding:"9px 12px",fontSize:13,color:C.text,background:"#FAFBFD",outline:"none"}}/>
  </label>
);

const Sel=({label,value,onChange,options})=>(
  <label style={{display:"flex",flexDirection:"column",gap:4}}>
    <span style={{fontSize:12,color:C.muted,fontWeight:500}}>{label}</span>
    <select value={value||""} onChange={e=>onChange(e.target.value)}
      style={{border:`1px solid ${C.border}`,borderRadius:8,padding:"9px 12px",fontSize:13,color:C.text,background:"#FAFBFD"}}>
      {options.map(o=>typeof o==="string"?<option key={o} value={o}>{o}</option>:<option key={o.v} value={o.v}>{o.l}</option>)}
    </select>
  </label>
);

// ── SIGNATURE PAD ─────────────────────────────────────────────────────────────
function SigPad({onSave,onCancel}){
  const ref=useRef(null);const dr=useRef(false);
  const gp=(e,c)=>{const r=c.getBoundingClientRect(),t=e.touches?.[0]||e;return{x:t.clientX-r.left,y:t.clientY-r.top}};
  const start=e=>{dr.current=true;const c=ref.current,ctx=c.getContext("2d"),p=gp(e,c);ctx.beginPath();ctx.moveTo(p.x,p.y)};
  const draw=e=>{if(!dr.current)return;e.preventDefault();const c=ref.current,ctx=c.getContext("2d"),p=gp(e,c);ctx.strokeStyle="#1A1F2E";ctx.lineWidth=2;ctx.lineCap="round";ctx.lineTo(p.x,p.y);ctx.stroke()};
  const stop=()=>{dr.current=false};
  return(
    <div style={{textAlign:"center"}}>
      <canvas ref={ref} width={480} height={150}
        style={{border:`2px solid ${C.border}`,borderRadius:10,background:"#fff",cursor:"crosshair",maxWidth:"100%",touchAction:"none"}}
        onMouseDown={start} onMouseMove={draw} onMouseUp={stop} onMouseLeave={stop}
        onTouchStart={start} onTouchMove={draw} onTouchEnd={stop}/>
      <div style={{display:"flex",gap:10,justifyContent:"center",marginTop:12}}>
        <button onClick={()=>ref.current.getContext("2d").clearRect(0,0,480,150)} style={{background:"#F1F5F9",border:"none",color:C.muted,borderRadius:8,padding:"8px 18px",cursor:"pointer"}}>Effacer</button>
        <button onClick={onCancel} style={{background:"#F1F5F9",border:"none",color:C.muted,borderRadius:8,padding:"8px 18px",cursor:"pointer"}}>Annuler</button>
        <button onClick={()=>onSave(ref.current.toDataURL())} style={{background:C.accent,border:"none",color:"#fff",borderRadius:8,padding:"8px 18px",fontWeight:700,cursor:"pointer"}}>Enregistrer</button>
      </div>
    </div>
  );
}

// ── BUILD PRINT HTML ──────────────────────────────────────────────────────────
function buildPrintHTML(doc){
  const isAlno=doc.is_alno||doc.client==="Société ALNO";
  const logo=isAlno?LOGO_DM:LOGO_PW;
  const lignes=doc.lignes||[];
  const totalHT=lignes.reduce((s,l)=>s+l.qte*l.pu,0);
  const totalTVA=lignes.reduce((s,l)=>s+l.qte*l.pu*l.tva/100,0);
  const totalTTC=totalHT+totalTVA;
  const typeLabel={facture:"Facture",devis:"Devis",bon_commande:"Bon de Commande"};
  const rows=lignes.map((l,i)=>`<tr style="background:${i%2===0?"#fff":"#F8FAFC"}">
    <td style="padding:9px 12px;border-bottom:1px solid #E5E9F0;color:#64748B;font-size:12px">${l.code||"—"}</td>
    <td style="padding:9px 12px;border-bottom:1px solid #E5E9F0">${l.desc}</td>
    <td style="padding:9px 12px;border-bottom:1px solid #E5E9F0;text-align:center">${l.qte}</td>
    <td style="padding:9px 12px;border-bottom:1px solid #E5E9F0;text-align:right">${fmt(l.pu)}</td>
    <td style="padding:9px 12px;border-bottom:1px solid #E5E9F0;text-align:right;font-weight:700;color:#1A3A8F">${fmt(l.qte*l.pu)}</td>
  </tr>`).join("");
  return`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${doc.numero}</title>
  <style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:"Segoe UI",Arial,sans-serif;color:#0F172A;background:#fff;font-size:13px}.page{max-width:820px;margin:30px auto;padding:36px 40px}.header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:22px;padding-bottom:18px;border-bottom:2px solid #E5E9F0}.logo{height:52px;object-fit:contain}.doc-right{text-align:right}.doc-right h1{font-size:28px;font-weight:900;margin-bottom:4px}.num{font-size:15px;color:#1A3A8F;font-weight:700}.date{font-size:12px;color:#64748B;margin-top:2px}.client-row{margin-bottom:6px;font-size:13px}.client-row span{font-weight:500;color:#64748B;margin-right:6px}.info-grid{display:grid;grid-template-columns:1fr 1fr 1fr;border:1px solid #E5E9F0;border-radius:6px;overflow:hidden;margin:16px 0}.ic{padding:10px 14px;border-right:1px solid #E5E9F0}.ic:last-child{border-right:none}.ic-label{font-size:10px;color:#94A3B8;text-transform:uppercase;letter-spacing:.5px;margin-bottom:3px}.ic-val{font-size:13px;font-weight:600}table.lines{width:100%;border-collapse:collapse}table.lines thead tr{background:#1A1F2E}table.lines thead th{color:#fff;padding:10px 12px;text-align:left;font-size:12px;font-weight:600}.totals-wrap{display:flex;justify-content:space-between;align-items:flex-start;margin-top:20px;gap:20px}.arrete{flex:1;font-size:12px;color:#475569;line-height:1.7;padding:14px;background:#F8FAFC;border-radius:8px;border:1px solid #E5E9F0}.tot-table{min-width:240px;border:1px solid #E5E9F0;border-radius:8px;overflow:hidden}.tot-table td{padding:9px 16px;border-bottom:1px solid #E5E9F0;font-size:13px}.tot-table tr:last-child td{border-bottom:none;background:#1A1F2E;color:#fff;font-weight:800;font-size:15px}.sig-area{display:flex;justify-content:flex-end;margin-top:36px}.footer{margin-top:28px;padding-top:12px;border-top:1px solid #E5E9F0;text-align:center;font-size:11px;color:#94A3B8;line-height:2}.footer strong{color:#475569}@media print{body{margin:0}.page{margin:0;padding:24px 28px}}</style></head><body><div class="page">
    <div class="header"><img src="${logo}" alt="logo" class="logo"/><div class="doc-right"><h1>${typeLabel[doc.type]||"Document"}</h1><div class="num">N° : ${doc.numero}</div><div class="date">Date : ${doc.date}</div>${doc.echeance?`<div class="date">Échéance : ${doc.echeance}</div>`:""}</div></div>
    <div class="client-row"><span>Client :</span>${doc.client||"—"}</div>
    <div class="client-row"><span>Adresse :</span>${doc.client_adresse||"—"}</div>
    <div class="info-grid"><div class="ic"><div class="ic-label">Code client</div><div class="ic-val">N : ${doc.code_client||"—"}</div></div><div class="ic"><div class="ic-label">ICE Client</div><div class="ic-val">${doc.client_ice||"—"}</div></div><div class="ic"><div class="ic-label">Demandeur / Référence</div><div class="ic-val">${doc.reference||"—"}</div></div></div>
    <table class="lines"><thead><tr><th>CODE</th><th>DÉSIGNATION</th><th>Quantité</th><th>PRIX (H.T)</th><th style="text-align:right">Total HT</th></tr></thead><tbody>${rows}</tbody></table>
    <div class="totals-wrap"><div class="arrete">Arrêtée la présente ${typeLabel[doc.type]} à la somme de :<br/><strong>${amtWords(totalTTC)}</strong>${doc.note?`<br/><br/><em style="font-size:11px">${doc.note}</em>`:""}</div><table class="tot-table"><tr><td>Total HT</td><td style="text-align:right;font-weight:600">${fmt(totalHT)}</td></tr><tr><td>TVA (20%)</td><td style="text-align:right;font-weight:600">${fmt(totalTVA)}</td></tr><tr><td>Net à payer</td><td style="text-align:right">${fmt(totalTTC)}</td></tr></table></div>
    <div class="sig-area"><div style="text-align:center"><div style="font-size:12px;color:#64748B;margin-bottom:10px">Signature :</div><div style="display:flex;align-items:center;gap:10px;justify-content:center">${doc.signature?`<img src="${doc.signature}" style="max-height:62px"/>`:""}${doc.cachet?`<img src="${doc.cachet}" style="max-height:72px;border-radius:4px"/>`:""}</div></div></div>
    <div class="footer"><strong>Pub Web Media SARL</strong> : IMM 7 RUE MOULAY RACHID APP N 10 4 EME ETAGE HASSAN RABAT<br/><strong>Tél</strong> : 06.06.00.73.23 &nbsp;|&nbsp; <strong>Email</strong> : yassine.essrhir01@gmail.com<br/><strong>RIB</strong> : 007815000163700000073444 &nbsp;|&nbsp; Attijariwafa Bank – Salé Mohamed V<br/><strong>ICE</strong> : 003951892000080</div>
  </div></body></html>`;
}

// ── LIGNES EDITOR ─────────────────────────────────────────────────────────────
function LignesEditor({lignes,onChange,catalogue}){
  const add=()=>onChange([...lignes,{code:"",desc:"",qte:1,pu:0,tva:20}]);
  const rm=i=>onChange(lignes.filter((_,j)=>j!==i));
  const upd=(i,k,v)=>onChange(lignes.map((l,j)=>j===i?{...l,[k]:v}:l));
  const totalHT=lignes.reduce((s,l)=>s+l.qte*l.pu,0);
  const totalTVA=lignes.reduce((s,l)=>s+l.qte*l.pu*l.tva/100,0);
  return(
    <div>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
          <thead><tr style={{background:C.tableHead}}>{["Code","Désignation","Qté","P.U HT","TVA","Total HT",""].map(h=><th key={h} style={{color:"#fff",padding:"9px 10px",textAlign:"left",fontSize:12,fontWeight:600}}>{h}</th>)}</tr></thead>
          <tbody>{lignes.map((l,i)=>(
            <tr key={i} style={{background:i%2===0?"#fff":"#F8FAFC"}}>
              <td style={{padding:"5px 7px"}}><input value={l.code||""} onChange={e=>upd(i,"code",e.target.value)} placeholder="—" style={{border:`1px solid ${C.border}`,borderRadius:6,padding:"5px 7px",width:65,fontSize:12}}/></td>
              <td style={{padding:"5px 7px"}}>
                <div style={{display:"flex",gap:6,alignItems:"center"}}>
                  <input value={l.desc} onChange={e=>upd(i,"desc",e.target.value)} placeholder="Description..." style={{border:`1px solid ${C.border}`,borderRadius:6,padding:"5px 8px",width:"100%",minWidth:160,fontSize:12}}/>
                  {catalogue.length>0&&<select onChange={e=>{const c=catalogue.find(x=>x.nom===e.target.value);if(c)onChange(lignes.map((l2,j)=>j===i?{...l2,desc:c.nom,pu:c.pu,code:c.code||"",tva:c.tva||20}:l2));e.target.value="";}} defaultValue="" style={{border:`1px solid ${C.border}`,borderRadius:6,padding:"5px 6px",fontSize:11,color:C.muted,maxWidth:140}}><option value="">📦 Catalogue</option>{catalogue.map(c=><option key={c.id} value={c.nom}>{c.nom} — {fmt(c.pu)} MAD</option>)}</select>}
                </div>
              </td>
              <td style={{padding:"5px 7px"}}><input type="number" value={l.qte} onChange={e=>upd(i,"qte",parseFloat(e.target.value)||1)} style={{border:`1px solid ${C.border}`,borderRadius:6,padding:"5px 7px",width:60,fontSize:12}}/></td>
              <td style={{padding:"5px 7px"}}><input type="number" value={l.pu} onChange={e=>upd(i,"pu",parseFloat(e.target.value)||0)} style={{border:`1px solid ${C.border}`,borderRadius:6,padding:"5px 7px",width:100,fontSize:12}}/></td>
              <td style={{padding:"5px 7px"}}><select value={l.tva} onChange={e=>upd(i,"tva",parseFloat(e.target.value))} style={{border:`1px solid ${C.border}`,borderRadius:6,padding:"5px",fontSize:12,width:65}}>{[0,7,10,14,20].map(t=><option key={t} value={t}>{t}%</option>)}</select></td>
              <td style={{padding:"5px 7px",fontWeight:700,color:C.accent,textAlign:"right",whiteSpace:"nowrap"}}>{fmt(l.qte*l.pu)}</td>
              <td style={{padding:"5px 7px"}}><button onClick={()=>rm(i)} style={{background:C.redLight,border:"none",color:C.red,borderRadius:6,padding:"4px 8px",cursor:"pointer"}}>✕</button></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <button onClick={add} style={{marginTop:8,background:"#F8FAFC",border:`1px dashed ${C.border}`,color:C.muted,borderRadius:8,padding:"8px 16px",cursor:"pointer",width:"100%",fontSize:12}}>+ Ajouter une ligne</button>
      <div style={{marginTop:14,textAlign:"right",fontSize:13,lineHeight:2.2,borderTop:`1px solid ${C.border}`,paddingTop:12}}>
        <div style={{color:C.muted}}>Total HT : <b style={{color:C.text}}>{fmt(totalHT)} MAD</b></div>
        <div style={{color:C.muted}}>TVA (20%) : <b style={{color:C.text}}>{fmt(totalTVA)} MAD</b></div>
        <div style={{fontSize:16,fontWeight:800,color:C.accent}}>Net à payer : {fmt(totalHT+totalTVA)} MAD</div>
      </div>
    </div>
  );
}

// ── DOC FORM ──────────────────────────────────────────────────────────────────
function DocForm({initial,type,onSave,onClose,clients,catalogue,counters}){
  const allClients=[ALNO_CLIENT,...clients.filter(c=>!c.is_alno)];
  const[doc,setDoc]=useState(initial||{
    type,numero:genNum(type,counters),date:today(),echeance:"",
    client:"",client_adresse:"",client_ice:"",code_client:"",reference:"",is_alno:false,
    lignes:[{code:"",desc:"",qte:1,pu:0,tva:20}],
    note:"",status:"brouillon",signature:SIG_DEF,cachet:CACHET,signature_client:null
  });
  const[showSigPad,setShowSigPad]=useState(false);
  const[sigTarget,setSigTarget]=useState("signature");
  const upd=(k,v)=>setDoc(d=>({...d,[k]:v}));

  const handleClientSel=name=>{
    const c=allClients.find(x=>x.nom===name);
    if(!c)return;
    setDoc(d=>({...d,
      client:c.nom,
      client_adresse:c.adresse?`${c.adresse}${c.ville?", "+c.ville:""}`:d.client_adresse,
      client_ice:c.ice||d.client_ice,
      code_client:c.code||d.code_client,
      is_alno:!!c.isAlno||!!c.is_alno,
    }));
  };

  const handleCachetUpload=e=>{
    const file=e.target.files[0];if(!file)return;
    const r=new FileReader();r.onload=()=>upd("cachet",r.result);r.readAsDataURL(file);
  };

  const statusOpts={
    facture:["brouillon","envoyé","signé","payé","annulé"],
    devis:["brouillon","envoyé","approuvé","refusé"],
    bon_commande:["en_attente","approuvé","reçu","annulé"],
  };

  return(
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{background:"#F0F7FF",borderRadius:10,padding:"14px 16px",border:`1px solid #BFDBFE`}}>
        <div style={{fontSize:13,fontWeight:700,color:C.accent,marginBottom:10}}>👤 Sélectionner un client</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <button onClick={()=>handleClientSel("Société ALNO")}
            style={{background:doc.is_alno?"#1A3A8F":"#fff",border:`2px solid ${doc.is_alno?"#1A3A8F":"#E5E9F0"}`,borderRadius:10,padding:"10px 14px",cursor:"pointer",textAlign:"left"}}>
            <div style={{fontSize:12,fontWeight:700,color:doc.is_alno?"#fff":"#0F172A"}}>⭐ Société ALNO</div>
            <div style={{fontSize:11,color:doc.is_alno?"#BFD0FF":"#64748B",marginTop:2}}>Client principal · Logo DM</div>
          </button>
          <select onChange={e=>handleClientSel(e.target.value)} defaultValue=""
            style={{border:`1px solid ${C.border}`,borderRadius:8,padding:"9px 12px",fontSize:13,width:"100%",background:"#fff"}}>
            <option value="">— Autre client —</option>
            {clients.filter(c=>!c.is_alno).map(c=><option key={c.id} value={c.nom}>{c.nom}</option>)}
          </select>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:10}}>
        <Inp label="Numéro" value={doc.numero} onChange={v=>upd("numero",v)}/>
        <Inp label="Date" value={doc.date} onChange={v=>upd("date",v)} type="date"/>
        <Inp label="Échéance" value={doc.echeance} onChange={v=>upd("echeance",v)} type="date"/>
        <Sel label="Statut" value={doc.status} onChange={v=>upd("status",v)} options={statusOpts[type].map(s=>({v:s,l:ST[s]?.l||s}))}/>
      </div>

      <div style={{background:"#FAFBFD",borderRadius:8,padding:"12px 14px",border:`1px solid ${C.border}`}}>
        <div style={{fontSize:12,color:C.muted,fontWeight:600,marginBottom:10,textTransform:"uppercase",letterSpacing:.5}}>Informations client</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:10}}>
          <Inp label="Nom / Société" value={doc.client} onChange={v=>upd("client",v)}/>
          <Inp label="Adresse" value={doc.client_adresse} onChange={v=>upd("client_adresse",v)}/>
          <Inp label="ICE Client" value={doc.client_ice} onChange={v=>upd("client_ice",v)}/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <Inp label="Code Client" value={doc.code_client} onChange={v=>upd("code_client",v)} placeholder="N : 01122"/>
          <Inp label="Demandeur / Référence" value={doc.reference} onChange={v=>upd("reference",v)}/>
        </div>
      </div>

      <div>
        <div style={{fontSize:12,color:C.muted,fontWeight:600,marginBottom:8,textTransform:"uppercase",letterSpacing:.5}}>Articles / Prestations</div>
        <LignesEditor lignes={doc.lignes} onChange={v=>upd("lignes",v)} catalogue={catalogue}/>
      </div>

      <label style={{display:"flex",flexDirection:"column",gap:4}}>
        <span style={{fontSize:12,color:C.muted,fontWeight:500}}>Note / Conditions de paiement</span>
        <textarea value={doc.note||""} onChange={e=>upd("note",e.target.value)} rows={2}
          style={{border:`1px solid ${C.border}`,borderRadius:8,padding:"9px 12px",fontSize:13,resize:"vertical"}}/>
      </label>

      {type==="facture"&&(
        <div style={{background:"#FAFBFD",borderRadius:10,padding:16,border:`1px solid ${C.border}`}}>
          <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:14}}>✍️ Signature & Cachet</div>
          <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
            <div>
              <div style={{fontSize:12,color:C.muted,marginBottom:6}}>Ma signature</div>
              {doc.signature?<div><img src={doc.signature} style={{height:52,border:`1px solid ${C.border}`,borderRadius:6,background:"#fff",padding:4}} alt="sig"/><button onClick={()=>{setSigTarget("signature");setShowSigPad(true)}} style={{display:"block",marginTop:4,background:"none",border:"none",color:C.accent,cursor:"pointer",fontSize:11}}>Modifier</button></div>
              :<button onClick={()=>{setSigTarget("signature");setShowSigPad(true)}} style={{background:"#EEF2FF",border:`1px dashed ${C.accent}`,color:C.accent,borderRadius:8,padding:"9px 16px",cursor:"pointer",fontSize:12}}>+ Signer</button>}
            </div>
            <div>
              <div style={{fontSize:12,color:C.muted,marginBottom:6}}>Cachet</div>
              {doc.cachet?<div><img src={doc.cachet} style={{height:58,border:`1px solid ${C.border}`,borderRadius:8,padding:4,background:"#fff"}} alt="cachet"/><label style={{display:"block",marginTop:4,color:C.accent,cursor:"pointer",fontSize:11}}>Modifier<input type="file" accept="image/*" style={{display:"none"}} onChange={handleCachetUpload}/></label></div>
              :<label><div style={{background:"#FFFBEB",border:`1px dashed ${C.gold}`,color:C.gold,borderRadius:8,padding:"9px 16px",cursor:"pointer",fontSize:12}}>+ Upload cachet</div><input type="file" accept="image/*" style={{display:"none"}} onChange={handleCachetUpload}/></label>}
            </div>
          </div>
        </div>
      )}

      {showSigPad&&<Modal title="Dessiner la signature" onClose={()=>setShowSigPad(false)}><SigPad onSave={d=>{upd(sigTarget,d);setShowSigPad(false)}} onCancel={()=>setShowSigPad(false)}/></Modal>}

      <div style={{display:"flex",gap:10,justifyContent:"flex-end",paddingTop:8,borderTop:`1px solid ${C.border}`}}>
        <button onClick={onClose} style={{background:"#F1F5F9",border:"none",color:C.muted,borderRadius:8,padding:"10px 22px",cursor:"pointer"}}>Annuler</button>
        <button onClick={()=>onSave(doc)} style={{background:C.accent,border:"none",color:"#fff",borderRadius:8,padding:"10px 22px",fontWeight:700,cursor:"pointer"}}>Enregistrer</button>
      </div>
    </div>
  );
}

// ── DOC PAGE ──────────────────────────────────────────────────────────────────
function DocPage({type,clients,catalogue}){
  const {data:docs,loading,addItem,updateItem,deleteItem}=useSupabaseTable("documents");
  const filtered=docs.filter(d=>d.type===type);
  const[showForm,setShowForm]=useState(false);
  const[editing,setEditing]=useState(null);
  const[filter,setFilter]=useState("");
  const[stFilter,setStFilter]=useState("all");
  const[counters,setCounters]=useState({facture:0,devis:0,bon_commande:0});
  const labels={facture:"Factures",devis:"Devis",bon_commande:"Bons de Commande"};
  const allSt={facture:["brouillon","envoyé","signé","payé","annulé"],devis:["brouillon","envoyé","approuvé","refusé"],bon_commande:["en_attente","approuvé","reçu","annulé"]};

  const filteredDocs=filtered.filter(d=>(stFilter==="all"||d.status===stFilter)&&
    (!filter||d.numero?.toLowerCase().includes(filter.toLowerCase())||(d.client||"").toLowerCase().includes(filter.toLowerCase())));

  const save=async(doc)=>{
    const payload={...doc,lignes:JSON.stringify(doc.lignes)};
    if(editing){await updateItem(doc.id,payload);}
    else{
      setCounters(c=>({...c,[type]:(c[type]||0)+1}));
      await addItem(payload);
    }
    setShowForm(false);setEditing(null);
  };

  const print=d=>{
    const docWithParsedLignes={...d,lignes:typeof d.lignes==="string"?JSON.parse(d.lignes):d.lignes||[]};
    const w=window.open("","_blank");w.document.write(buildPrintHTML(docWithParsedLignes));w.document.close();setTimeout(()=>{w.focus();w.print();},500);
  };

  const convert=async(devis)=>{
    setCounters(c=>({...c,facture:(c.facture||0)+1}));
    const fac={...devis,id:undefined,type:"facture",numero:genNum("facture",counters),status:"brouillon"};
    await addItem({...fac,lignes:JSON.stringify(typeof devis.lignes==="string"?JSON.parse(devis.lignes):devis.lignes||[])});
  };

  if(loading)return<div style={{textAlign:"center",padding:60,color:C.muted}}>Chargement...</div>;

  return(
    <div>
      {showForm&&<Modal title={editing?`Modifier`:`Nouveau ${labels[type]?.slice(0,-1)||""}`} onClose={()=>{setShowForm(false);setEditing(null)}} wide>
        <DocForm initial={editing?{...editing,lignes:typeof editing.lignes==="string"?JSON.parse(editing.lignes):editing.lignes||[]}:null}
          type={type} onSave={save} onClose={()=>{setShowForm(false);setEditing(null)}}
          clients={clients} catalogue={catalogue} counters={counters}/>
      </Modal>}

      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:10}}>
        <h2 style={{color:C.text,fontSize:20,fontWeight:800,margin:0}}>{labels[type]}</h2>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          <input placeholder="Rechercher..." value={filter} onChange={e=>setFilter(e.target.value)}
            style={{border:`1px solid ${C.border}`,borderRadius:8,padding:"8px 12px",fontSize:12,width:210,background:"#FAFBFD"}}/>
          <select value={stFilter} onChange={e=>setStFilter(e.target.value)}
            style={{border:`1px solid ${C.border}`,borderRadius:8,padding:"8px 12px",fontSize:12,background:"#FAFBFD"}}>
            <option value="all">Tous</option>
            {allSt[type].map(s=><option key={s} value={s}>{ST[s]?.l}</option>)}
          </select>
          <button onClick={()=>{setEditing(null);setShowForm(true)}}
            style={{background:C.accent,border:"none",color:"#fff",borderRadius:8,padding:"9px 18px",fontWeight:700,cursor:"pointer",fontSize:13}}>
            + Nouveau
          </button>
        </div>
      </div>

      <div style={{background:C.card,borderRadius:12,border:`1px solid ${C.border}`,overflow:"hidden"}}>
        {!filteredDocs.length?<div style={{textAlign:"center",padding:48,color:C.muted,fontSize:13}}>Aucun document.</div>:(
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
              <thead><tr style={{background:"#F8FAFC",borderBottom:`1px solid ${C.border}`}}>
                {["N°","Client","Date","Net à payer","Statut","Actions"].map(h=><th key={h} style={{textAlign:"left",padding:"10px 14px",color:C.muted,fontWeight:600,fontSize:12}}>{h}</th>)}
              </tr></thead>
              <tbody>{filteredDocs.map(d=>{
                const lignes=typeof d.lignes==="string"?JSON.parse(d.lignes):d.lignes||[];
                const ttc=lignes.reduce((s,l)=>s+l.qte*l.pu*(1+l.tva/100),0);
                const overdue=d.status==="envoyé"&&d.echeance&&d.echeance<today();
                const isAlno=d.is_alno||d.client==="Société ALNO";
                return(<tr key={d.id} style={{borderBottom:`1px solid ${C.border}`,background:overdue?"#FFF8F0":"#fff"}}>
                  <td style={{padding:"11px 14px",color:C.accent,fontWeight:700}}>
                    {d.numero}{overdue&&<span style={{marginLeft:6,background:C.redLight,color:C.red,borderRadius:4,padding:"2px 6px",fontSize:10,fontWeight:700}}>⚠ ÉCHU</span>}
                  </td>
                  <td style={{padding:"11px 14px",fontWeight:500}}>
                    {isAlno&&<span style={{background:"#EEF2FF",color:"#1A3A8F",borderRadius:4,padding:"2px 6px",fontSize:10,fontWeight:700,marginRight:5}}>ALNO</span>}
                    {d.client||"—"}
                  </td>
                  <td style={{padding:"11px 14px",color:C.muted}}>{d.date}</td>
                  <td style={{padding:"11px 14px",fontWeight:700}}>{fmt(ttc)} MAD</td>
                  <td style={{padding:"11px 14px"}}><Badge status={d.status}/></td>
                  <td style={{padding:"11px 14px"}}>
                    <div style={{display:"flex",gap:5}}>
                      <button onClick={()=>print(d)} style={{background:C.accentLight,border:"none",color:C.accent,borderRadius:6,padding:"5px 10px",cursor:"pointer",fontSize:12}}>🖨</button>
                      <button onClick={()=>{setEditing(d);setShowForm(true)}} style={{background:"#F1F5F9",border:"none",color:C.muted,borderRadius:6,padding:"5px 10px",cursor:"pointer",fontSize:12}}>✏️</button>
                      {type==="devis"&&d.status==="approuvé"&&<button onClick={()=>convert(d)} style={{background:C.greenLight,border:"none",color:C.green,borderRadius:6,padding:"5px 10px",cursor:"pointer",fontSize:11,fontWeight:700}}>→FAC</button>}
                      <button onClick={()=>deleteItem(d.id)} style={{background:C.redLight,border:"none",color:C.red,borderRadius:6,padding:"5px 10px",cursor:"pointer",fontSize:12}}>🗑</button>
                    </div>
                  </td>
                </tr>);
              })}</tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ── CLIENTS PAGE ──────────────────────────────────────────────────────────────
function ClientsPage(){
  const{data:clients,loading,addItem,updateItem,deleteItem}=useSupabaseTable("clients");
  const[showForm,setShowForm]=useState(false);
  const[form,setForm]=useState({nom:"",tel:"",email:"",adresse:"",ville:"",ice:"",code:"",notes:""});
  const[editId,setEditId]=useState(null);
  const[search,setSearch]=useState("");
  const upd=(k,v)=>setForm(f=>({...f,[k]:v}));
  const save=async()=>{
    if(!form.nom)return;
    if(editId)await updateItem(editId,form);
    else await addItem(form);
    setForm({nom:"",tel:"",email:"",adresse:"",ville:"",ice:"",code:"",notes:""});
    setEditId(null);setShowForm(false);
  };
  const allDisplay=[ALNO_CLIENT,...clients.filter(c=>!c.is_alno)];
  const filtered=allDisplay.filter(c=>!search||(c.nom||"").toLowerCase().includes(search.toLowerCase()));
  if(loading)return<div style={{textAlign:"center",padding:60,color:C.muted}}>Chargement...</div>;
  return(
    <div>
      {showForm&&<Modal title={editId?"Modifier client":"Nouveau client"} onClose={()=>{setShowForm(false);setEditId(null)}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          {[["nom","Nom / Raison sociale"],["tel","Téléphone"],["email","Email"],["adresse","Adresse"],["ville","Ville"],["ice","ICE"],["code","Code client"],["notes","Notes"]].map(([k,l])=>(<Inp key={k} label={l} value={form[k]} onChange={v=>upd(k,v)}/>))}
        </div>
        <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:16}}>
          <button onClick={()=>{setShowForm(false);setEditId(null)}} style={{background:"#F1F5F9",border:"none",color:C.muted,borderRadius:8,padding:"10px 22px",cursor:"pointer"}}>Annuler</button>
          <button onClick={save} style={{background:C.accent,border:"none",color:"#fff",borderRadius:8,padding:"10px 22px",fontWeight:700,cursor:"pointer"}}>Enregistrer</button>
        </div>
      </Modal>}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <h2 style={{color:C.text,fontSize:20,fontWeight:800,margin:0}}>Clients</h2>
        <div style={{display:"flex",gap:10}}>
          <input placeholder="Rechercher..." value={search} onChange={e=>setSearch(e.target.value)}
            style={{border:`1px solid ${C.border}`,borderRadius:8,padding:"8px 12px",fontSize:12,width:200,background:"#FAFBFD"}}/>
          <button onClick={()=>{setForm({nom:"",tel:"",email:"",adresse:"",ville:"",ice:"",code:"",notes:""});setShowForm(true)}}
            style={{background:C.accent,border:"none",color:"#fff",borderRadius:8,padding:"9px 18px",fontWeight:700,cursor:"pointer",fontSize:13}}>+ Nouveau client</button>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14}}>
        {filtered.map(c=>(
          <div key={c.id} style={{background:c.isAlno||c.is_alno?"#EEF2FF":C.card,border:`1px solid ${c.isAlno||c.is_alno?"#BFDBFE":C.border}`,borderRadius:12,padding:"18px 20px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div>
                {(c.isAlno||c.is_alno)&&<span style={{background:"#1A3A8F",color:"#fff",borderRadius:4,padding:"2px 8px",fontSize:10,fontWeight:700,marginBottom:6,display:"inline-block"}}>⭐ Client principal</span>}
                <div style={{fontSize:15,fontWeight:700,color:C.text}}>{c.nom}</div>
                {c.ice&&<div style={{fontSize:11,color:C.muted,marginTop:2}}>ICE : {c.ice}</div>}
                {c.code&&<div style={{fontSize:11,color:C.muted}}>Code : {c.code}</div>}
              </div>
              {!(c.isAlno||c.is_alno)&&<div style={{display:"flex",gap:6}}>
                <button onClick={()=>{setForm(c);setEditId(c.id);setShowForm(true)}} style={{background:"#F1F5F9",border:"none",color:C.muted,borderRadius:6,padding:"5px 9px",cursor:"pointer",fontSize:12}}>✏️</button>
                <button onClick={()=>deleteItem(c.id)} style={{background:C.redLight,border:"none",color:C.red,borderRadius:6,padding:"5px 9px",cursor:"pointer",fontSize:12}}>🗑</button>
              </div>}
            </div>
            <div style={{marginTop:10,fontSize:12,color:C.muted,lineHeight:2}}>
              {c.tel&&<div>📞 {c.tel}</div>}
              {c.email&&<div>✉️ {c.email}</div>}
              {c.adresse&&<div>📍 {c.adresse}{c.ville?`, ${c.ville}`:""}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── CATALOGUE PAGE ────────────────────────────────────────────────────────────
function CataloguePage(){
  const{data:catalogue,loading,addItem,updateItem,deleteItem}=useSupabaseTable("catalogue");
  const[showForm,setShowForm]=useState(false);
  const[form,setForm]=useState({nom:"",code:"",pu:0,tva:20,description:""});
  const[editId,setEditId]=useState(null);
  const upd=(k,v)=>setForm(f=>({...f,[k]:v}));
  const save=async()=>{
    if(!form.nom)return;
    if(editId)await updateItem(editId,form);
    else await addItem(form);
    setForm({nom:"",code:"",pu:0,tva:20,description:""});setEditId(null);setShowForm(false);
  };
  if(loading)return<div style={{textAlign:"center",padding:60,color:C.muted}}>Chargement...</div>;
  return(
    <div>
      {showForm&&<Modal title={editId?"Modifier":"Nouveau service/produit"} onClose={()=>{setShowForm(false);setEditId(null)}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <Inp label="Nom du service" value={form.nom} onChange={v=>upd("nom",v)}/>
          <Inp label="Code" value={form.code} onChange={v=>upd("code",v)}/>
          <Inp label="Prix unitaire HT (MAD)" value={form.pu} onChange={v=>upd("pu",parseFloat(v)||0)} type="number"/>
          <Sel label="TVA" value={String(form.tva)} onChange={v=>upd("tva",parseFloat(v))} options={["0","7","10","14","20"].map(t=>({v:t,l:t+"%"}))}/>
          <div style={{gridColumn:"1/-1"}}><Inp label="Description" value={form.description} onChange={v=>upd("description",v)}/></div>
        </div>
        <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:16}}>
          <button onClick={()=>{setShowForm(false);setEditId(null)}} style={{background:"#F1F5F9",border:"none",color:C.muted,borderRadius:8,padding:"10px 22px",cursor:"pointer"}}>Annuler</button>
          <button onClick={save} style={{background:C.accent,border:"none",color:"#fff",borderRadius:8,padding:"10px 22px",fontWeight:700,cursor:"pointer"}}>Enregistrer</button>
        </div>
      </Modal>}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <h2 style={{color:C.text,fontSize:20,fontWeight:800,margin:0}}>Catalogue Services / Produits</h2>
        <button onClick={()=>{setForm({nom:"",code:"",pu:0,tva:20,description:""});setShowForm(true)}}
          style={{background:C.accent,border:"none",color:"#fff",borderRadius:8,padding:"9px 18px",fontWeight:700,cursor:"pointer",fontSize:13}}>+ Nouveau</button>
      </div>
      <div style={{background:C.card,borderRadius:12,border:`1px solid ${C.border}`,overflow:"hidden"}}>
        {!catalogue.length?<div style={{textAlign:"center",padding:48,color:C.muted,fontSize:13}}>Aucun service.</div>:(
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
            <thead><tr style={{background:"#F8FAFC",borderBottom:`1px solid ${C.border}`}}>{["Code","Service","Description","P.U HT","TVA","Actions"].map(h=><th key={h} style={{textAlign:"left",padding:"10px 14px",color:C.muted,fontWeight:600,fontSize:12}}>{h}</th>)}</tr></thead>
            <tbody>{catalogue.map(c=>(
              <tr key={c.id} style={{borderBottom:`1px solid ${C.border}`}}>
                <td style={{padding:"11px 14px",color:C.muted,fontSize:12}}>{c.code||"—"}</td>
                <td style={{padding:"11px 14px",fontWeight:600,color:C.text}}>{c.nom}</td>
                <td style={{padding:"11px 14px",color:C.muted,fontSize:12}}>{c.description||"—"}</td>
                <td style={{padding:"11px 14px",fontWeight:700,color:C.accent}}>{fmt(c.pu)} MAD</td>
                <td style={{padding:"11px 14px",color:C.muted}}>{c.tva}%</td>
                <td style={{padding:"11px 14px"}}>
                  <div style={{display:"flex",gap:6}}>
                    <button onClick={()=>{setForm(c);setEditId(c.id);setShowForm(true)}} style={{background:"#F1F5F9",border:"none",color:C.muted,borderRadius:6,padding:"5px 9px",cursor:"pointer",fontSize:12}}>✏️</button>
                    <button onClick={()=>deleteItem(c.id)} style={{background:C.redLight,border:"none",color:C.red,borderRadius:6,padding:"5px 9px",cursor:"pointer",fontSize:12}}>🗑</button>
                  </div>
                </td>
              </tr>
            ))}</tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ── CHARGES PAGE ──────────────────────────────────────────────────────────────
const CATS=["Loyer","Salaires","Fournisseurs","Marketing","Transport","Équipement","Sous-traitance","Autres"];

function ChargesPage(){
  const{data:charges,loading,addItem,updateItem,deleteItem}=useSupabaseTable("charges");
  const[showForm,setShowForm]=useState(false);
  const[form,setForm]=useState({description:"",montant:"",categorie:"Autres",date_charge:today(),projet:"",note:""});
  const[editId,setEditId]=useState(null);
  const upd=(k,v)=>setForm(f=>({...f,[k]:v}));
  const save=async()=>{
    if(!form.description||!form.montant)return;
    if(editId)await updateItem(editId,form);
    else await addItem(form);
    setForm({description:"",montant:"",categorie:"Autres",date_charge:today(),projet:"",note:""});
    setEditId(null);setShowForm(false);
  };
  const total=charges.reduce((s,c)=>s+Number(c.montant),0);
  const byCat=Object.fromEntries(CATS.map(cat=>[cat,charges.filter(c=>c.categorie===cat).reduce((s,c)=>s+Number(c.montant),0)]));
  if(loading)return<div style={{textAlign:"center",padding:60,color:C.muted}}>Chargement...</div>;
  return(
    <div>
      {showForm&&<Modal title={editId?"Modifier charge":"Nouvelle charge"} onClose={()=>{setShowForm(false);setEditId(null)}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <Inp label="Description" value={form.description} onChange={v=>upd("description",v)}/>
          <Inp label="Montant (MAD)" value={form.montant} onChange={v=>upd("montant",v)} type="number"/>
          <Inp label="Date" value={form.date_charge} onChange={v=>upd("date_charge",v)} type="date"/>
          <Sel label="Catégorie" value={form.categorie} onChange={v=>upd("categorie",v)} options={CATS}/>
          <Inp label="Projet / Client" value={form.projet} onChange={v=>upd("projet",v)}/>
          <Inp label="Note" value={form.note} onChange={v=>upd("note",v)}/>
        </div>
        <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:16}}>
          <button onClick={()=>{setShowForm(false);setEditId(null)}} style={{background:"#F1F5F9",border:"none",color:C.muted,borderRadius:8,padding:"10px 22px",cursor:"pointer"}}>Annuler</button>
          <button onClick={save} style={{background:C.red,border:"none",color:"#fff",borderRadius:8,padding:"10px 22px",fontWeight:700,cursor:"pointer"}}>Enregistrer</button>
        </div>
      </Modal>}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <h2 style={{color:C.text,fontSize:20,fontWeight:800,margin:0}}>Charges</h2>
        <button onClick={()=>{setForm({description:"",montant:"",categorie:"Autres",date_charge:today(),projet:"",note:""});setShowForm(true)}}
          style={{background:C.red,border:"none",color:"#fff",borderRadius:8,padding:"9px 18px",fontWeight:700,cursor:"pointer",fontSize:13}}>+ Ajouter charge</button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:10,marginBottom:20}}>
        {CATS.filter(cat=>byCat[cat]>0).map(cat=>(
          <div key={cat} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"14px 16px"}}>
            <div style={{fontSize:11,color:C.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:.5}}>{cat}</div>
            <div style={{fontSize:16,fontWeight:800,color:C.red,marginTop:4}}>{fmt(byCat[cat])} MAD</div>
          </div>
        ))}
      </div>
      <div style={{background:C.card,borderRadius:12,border:`1px solid ${C.border}`,overflow:"hidden"}}>
        {!charges.length?<div style={{textAlign:"center",padding:48,color:C.muted,fontSize:13}}>Aucune charge.</div>:(
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
            <thead><tr style={{background:"#F8FAFC",borderBottom:`1px solid ${C.border}`}}>{["Description","Projet","Catégorie","Date","Montant","Note","Actions"].map(h=><th key={h} style={{textAlign:"left",padding:"10px 14px",color:C.muted,fontWeight:600,fontSize:12}}>{h}</th>)}</tr></thead>
            <tbody>{[...charges].sort((a,b)=>b.date_charge>a.date_charge?1:-1).map(c=>(
              <tr key={c.id} style={{borderBottom:`1px solid ${C.border}`}}>
                <td style={{padding:"11px 14px",fontWeight:500}}>{c.description}</td>
                <td style={{padding:"11px 14px",color:C.muted,fontSize:12}}>{c.projet||"—"}</td>
                <td style={{padding:"11px 14px"}}><span style={{background:C.redLight,color:C.red,borderRadius:6,padding:"2px 8px",fontSize:11,fontWeight:600}}>{c.categorie}</span></td>
                <td style={{padding:"11px 14px",color:C.muted}}>{c.date_charge}</td>
                <td style={{padding:"11px 14px",fontWeight:700,color:C.red}}>{fmt(c.montant)} MAD</td>
                <td style={{padding:"11px 14px",color:C.muted,fontSize:12}}>{c.note||"—"}</td>
                <td style={{padding:"11px 14px"}}>
                  <div style={{display:"flex",gap:6}}>
                    <button onClick={()=>{setForm(c);setEditId(c.id);setShowForm(true)}} style={{background:"#F1F5F9",border:"none",color:C.muted,borderRadius:6,padding:"5px 9px",cursor:"pointer",fontSize:12}}>✏️</button>
                    <button onClick={()=>deleteItem(c.id)} style={{background:C.redLight,border:"none",color:C.red,borderRadius:6,padding:"5px 9px",cursor:"pointer",fontSize:12}}>🗑</button>
                  </div>
                </td>
              </tr>
            ))}</tbody>
          </table>
        )}
      </div>
      <div style={{marginTop:14,textAlign:"right",fontSize:16,fontWeight:800,color:C.red}}>Total charges : {fmt(total)} MAD</div>
    </div>
  );
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
function Dashboard(){
  const{data:docs}=useSupabaseTable("documents");
  const{data:charges}=useSupabaseTable("charges");
  const factures=docs.filter(d=>d.type==="facture");
  const payées=factures.filter(d=>d.status==="payé");
  const enAttente=factures.filter(d=>d.status==="envoyé");
  const overdues=factures.filter(d=>d.status==="envoyé"&&d.echeance&&d.echeance<today());
  const devis=docs.filter(d=>d.type==="devis");
  const bcs=docs.filter(d=>d.type==="bon_commande");
  const alnoDocs=docs.filter(d=>d.is_alno||d.client==="Société ALNO");
  const ca=payées.reduce((s,d)=>{const l=typeof d.lignes==="string"?JSON.parse(d.lignes):d.lignes||[];return s+l.reduce((ss,li)=>ss+li.qte*li.pu*(1+li.tva/100),0);},0);
  const pending=enAttente.reduce((s,d)=>{const l=typeof d.lignes==="string"?JSON.parse(d.lignes):d.lignes||[];return s+l.reduce((ss,li)=>ss+li.qte*li.pu*(1+li.tva/100),0);},0);
  const totalCharges=charges.reduce((s,c)=>s+Number(c.montant),0);
  const ben=ca-totalCharges;
  const recent=[...docs].slice(0,6);
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
        <div>
          <div style={{fontSize:24,fontWeight:900,color:C.text}}>Tableau de bord</div>
          <div style={{fontSize:13,color:C.muted,marginTop:2}}>{new Date().toLocaleDateString("fr-MA",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</div>
        </div>
      </div>
      {overdues.length>0&&<div style={{background:"#FFF8F0",border:`1px solid ${C.orange}`,borderRadius:10,padding:"12px 16px",marginBottom:20,display:"flex",gap:12,alignItems:"center"}}>
        <span style={{fontSize:20}}>⚠️</span>
        <div><div style={{fontSize:13,fontWeight:700,color:C.orange}}>{overdues.length} facture(s) échue(s) non payée(s)</div>
        <div style={{fontSize:12,color:C.muted}}>{overdues.map(d=>d.numero).join(", ")}</div></div>
      </div>}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))",gap:14,marginBottom:24}}>
        {[
          {label:"Chiffre d'Affaires",value:ca,sub:`${payées.length} facture(s) payée(s)`,color:"#1A3A8F",bg:"#EEF2FF",icon:"💹"},
          {label:"En attente",value:pending,sub:`${enAttente.length} envoyée(s)`,color:C.orange,bg:C.orangeLight,icon:"⏳"},
          {label:"Charges",value:totalCharges,sub:`${charges.length} entrée(s)`,color:C.red,bg:C.redLight,icon:"💸"},
          {label:"Bénéfice Net",value:ben,sub:ca>0?`Marge ${((ben/ca)*100).toFixed(1)}%`:"—",color:ben>=0?C.green:C.red,bg:ben>=0?C.greenLight:C.redLight,icon:"💰"},
        ].map(k=>(
          <div key={k.label} style={{background:k.bg,borderRadius:14,padding:"18px 20px",border:`1px solid ${C.border}`}}>
            <div style={{fontSize:20,marginBottom:8}}>{k.icon}</div>
            <div style={{fontSize:11,color:C.muted,textTransform:"uppercase",letterSpacing:.5,marginBottom:4}}>{k.label}</div>
            <div style={{fontSize:22,fontWeight:900,color:k.color}}>{fmt(k.value)} MAD</div>
            <div style={{fontSize:11,color:C.muted,marginTop:3}}>{k.sub}</div>
          </div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:24}}>
        {[
          {label:"Devis",n:devis.length,ok:devis.filter(d=>d.status==="approuvé").length,lbl:"approuvé(s)",color:"#7C3AED",bg:"#F5F3FF"},
          {label:"Factures",n:factures.length,ok:payées.length,lbl:"payée(s)",color:"#1A3A8F",bg:"#EEF2FF"},
          {label:"Bons commande",n:bcs.length,ok:bcs.filter(d=>d.status==="reçu").length,lbl:"reçu(s)",color:C.green,bg:C.greenLight},
          {label:"Docs ALNO",n:alnoDocs.length,ok:alnoDocs.filter(d=>d.status==="payé"||d.status==="approuvé").length,lbl:"traité(s)",color:"#1A3A8F",bg:"#EEF2FF"},
        ].map(s=>(
          <div key={s.label} style={{background:s.bg,borderRadius:12,border:`1px solid ${C.border}`,padding:"16px 18px"}}>
            <div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:4}}>{s.label}</div>
            <div style={{fontSize:28,fontWeight:900,color:s.color}}>{s.n}</div>
            <div style={{fontSize:11,color:C.muted}}>{s.ok} {s.lbl}</div>
          </div>
        ))}
      </div>
      {recent.length>0&&<div style={{background:C.card,borderRadius:12,border:`1px solid ${C.border}`,overflow:"hidden"}}>
        <div style={{padding:"14px 18px",borderBottom:`1px solid ${C.border}`,fontWeight:700,color:C.text,fontSize:14}}>Derniers documents</div>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
          <tbody>{recent.map(d=>{
            const lignes=typeof d.lignes==="string"?JSON.parse(d.lignes):d.lignes||[];
            const ttc=lignes.reduce((s,l)=>s+l.qte*l.pu*(1+l.tva/100),0);
            const isAlno=d.is_alno||d.client==="Société ALNO";
            const tc={facture:"#1A3A8F",devis:"#7C3AED",bon_commande:C.green};
            return(<tr key={d.id} style={{borderBottom:`1px solid ${C.border}`}}>
              <td style={{padding:"10px 18px"}}><span style={{color:tc[d.type],fontSize:11,fontWeight:700,textTransform:"uppercase"}}>{d.type?.replace("_"," ")}</span></td>
              <td style={{padding:"10px 18px",fontWeight:700,color:C.accent}}>{d.numero}</td>
              <td style={{padding:"10px 18px"}}>
                {isAlno&&<span style={{background:"#EEF2FF",color:"#1A3A8F",borderRadius:4,padding:"2px 6px",fontSize:10,fontWeight:700,marginRight:5}}>ALNO</span>}
                {d.client||"—"}
              </td>
              <td style={{padding:"10px 18px"}}><Badge status={d.status}/></td>
              <td style={{padding:"10px 18px",fontWeight:700,textAlign:"right"}}>{fmt(ttc)} MAD</td>
            </tr>);
          })}</tbody>
        </table>
      </div>}
    </div>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App(){
  const[auth,setAuth]=useState(()=>sessionStorage.getItem("pwm_auth")==="1");
  const{data:clients}=useSupabaseTable("clients");
  const{data:catalogue}=useSupabaseTable("catalogue");
  const[page,setPage]=useState("dashboard");
  if(!auth)return<Login onLogin={()=>{sessionStorage.setItem("pwm_auth","1");setAuth(true)}}/>;
  const nav=[
    {id:"dashboard",label:"Dashboard",icon:"🏠"},
    {id:"factures",label:"Factures",icon:"🧾"},
    {id:"devis",label:"Devis",icon:"📋"},
    {id:"bon_commande",label:"Bons de Commande",icon:"📦"},
    {id:"clients",label:"Clients",icon:"👥"},
    {id:"catalogue",label:"Catalogue",icon:"🗂️"},
    {id:"charges",label:"Charges",icon:"💸"},
  ];
  return(
    <div style={{minHeight:"100vh",background:C.bg,fontFamily:"Inter,'Segoe UI',system-ui,sans-serif",display:"flex",fontSize:14}}>
      <div style={{width:220,background:C.sidebar,display:"flex",flexDirection:"column",flexShrink:0,position:"sticky",top:0,height:"100vh",overflowY:"auto"}}>
        <div style={{padding:"18px 16px 14px",borderBottom:`1px solid ${C.sbBorder}`}}>
          <div style={{fontSize:14,fontWeight:800,color:"#fff",marginBottom:2}}>Pub Web Media</div>
          <div style={{fontSize:11,color:"#5A6478",fontWeight:600,letterSpacing:.5,textTransform:"uppercase"}}>Gestion Financière</div>
        </div>
        <nav style={{flex:1,paddingTop:8}}>
          {nav.map(n=>(
            <button key={n.id} onClick={()=>setPage(n.id)} style={{
              display:"flex",alignItems:"center",gap:10,padding:"10px 16px",width:"100%",
              background:page===n.id?"rgba(255,255,255,.08)":"none",
              border:"none",borderLeft:page===n.id?"3px solid #4B82F6":"3px solid transparent",
              color:page===n.id?C.sbActive:C.sbText,
              cursor:"pointer",fontSize:13,fontWeight:page===n.id?600:400,textAlign:"left",transition:"all .15s"
            }}>
              <span style={{fontSize:15}}>{n.icon}</span>{n.label}
            </button>
          ))}
        </nav>
        <div style={{padding:"12px 16px",borderTop:`1px solid ${C.sbBorder}`}}>
          <button onClick={()=>{sessionStorage.removeItem("pwm_auth");setAuth(false)}}
            style={{background:"none",border:"none",color:"#5A6478",cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",gap:6}}>
            🔒 Déconnexion
          </button>
        </div>
      </div>
      <div style={{flex:1,padding:"28px 32px",overflowY:"auto"}}>
        {page==="dashboard"    &&<Dashboard/>}
        {page==="factures"     &&<DocPage type="facture"      clients={clients} catalogue={catalogue}/>}
        {page==="devis"        &&<DocPage type="devis"        clients={clients} catalogue={catalogue}/>}
        {page==="bon_commande" &&<DocPage type="bon_commande" clients={clients} catalogue={catalogue}/>}
        {page==="clients"      &&<ClientsPage/>}
        {page==="catalogue"    &&<CataloguePage/>}
        {page==="charges"      &&<ChargesPage/>}
      </div>
    </div>
  );
}
