function show(t){document.getElementById("result").textContent=t}

// Base64
function encodeBase64(){
  try{show(btoa(document.getElementById("input").value))}catch(e){show("Invalid text")}
}
function decodeBase64(){
  try{show(atob(document.getElementById("input").value))}catch(e){show("Invalid Base64")}
}

// URL
function encodeURL(){show(encodeURIComponent(document.getElementById("input").value))}
function decodeURL(){
  try{show(decodeURIComponent(document.getElementById("input").value))}catch(e){show("Invalid URL encoding")}
}

// Hex
function encodeHex(){
  const s=document.getElementById("input").value;
  show([...s].map(c=>"\\x"+c.charCodeAt(0).toString(16).padStart(2,"0")).join(""));
}
function decodeHex(){
  const s=document.getElementById("input").value.replace(/\\x/g," ");
  const parts=s.trim().split(/\s+/);
  try{
    show(parts.map(h=>String.fromCharCode(parseInt(h,16))).join(""))
  }catch{show("Invalid hex")}
}

// Unicode escape
function encodeUnicode(){
  const s=document.getElementById("input").value;
  show([...s].map(c=>"\\u"+c.codePointAt(0).toString(16).padStart(4,"0")).join(""));
}
function decodeUnicode(){
  const s=document.getElementById("input").value;
  show(s.replace(/\\u([\dA-Fa-f]{4})/g,(m,p)=>String.fromCharCode(parseInt(p,16))))
}

// Clear
function clearAll(){
  document.getElementById("input").value="";
  show("");
}

// Copy
function copyResult(){
  navigator.clipboard.writeText(document.getElementById("result").innerText)
}

// Export
function exportText(){
  const blob=new Blob([document.getElementById("result").innerText],{type:"text/plain"});
  const a=document.createElement("a");
  a.href=URL.createObjectURL(blob);
  a.download="result.txt";
  a.click();
}

// Import
function importText(){
  const f=document.getElementById("fileInput").files[0];
  if(!f)return;
  const r=new FileReader();
  r.onload=()=>{document.getElementById("input").value=r.result};
  r.readAsText(f);
}
