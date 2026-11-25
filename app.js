
(function(){
var $=function(i){return document.getElementById(i)};
var amount=0;
function show(id,v){$(id).classList.toggle("hid",!v)}
$("tipo").addEventListener("change",function(){var t=$("tipo").value;show("bRet",t==="ret");show("bCan",t==="can")});
function calc(){
var t=$("tipo").value,km=parseFloat($("km").value),ue=$("ue").checked,reasons=[],ok=true;
if(!(km>0)){alert("Indica la distancia aproximada.");return}
if(!$("elig").checked){ok=false;reasons.push("El reglamento solo cubre vuelos que salen de la UE, o que llegan a ella con aerolínea europea.")}
if(t==="ret"){var h=parseFloat($("hrs").value);if(!(h>=0)){alert("Indica las horas de retraso.");return}
if(h<3){ok=false;reasons.push("Se necesitan al menos 3 horas de retraso en la llegada.")}}
if(t==="can"){var a=parseFloat($("aviso").value);if(!(a>=0)){alert("Indica los días de aviso.");return}
if(a>=14){ok=false;reasons.push("Te avisaron con 14 días o más de antelación.")}}
if($("ext").checked){ok=false;reasons.push("Si la circunstancia extraordinaria se acredita, la aerolínea queda exenta. Aun así, ellos deben demostrarla y conviene reclamar.")}
amount=km<=1500?250:((ue&&km>1500)||(km<=3500)?400:600);
if(t==="ret"&&!ue&&km>3500&&parseFloat($("hrs").value)<4)amount=300;
$("res").classList.remove("hid");
if(ok){$("amt").textContent="Hasta "+amount+" € por pasajero";$("amt").className="big ok";$("why").textContent="Cumples las condiciones básicas para reclamar. Si viajabas con más personas, cada una puede reclamar.";show("toLetter",true)}
else{$("amt").textContent="Reclamación dudosa";$("amt").className="big no";$("why").innerHTML=reasons.join("<br>");show("toLetter",$("elig").checked&&$("ext").checked)}
$("res").scrollIntoView({behavior:"smooth"})}
$("go").addEventListener("click",calc);
$("toLetter").addEventListener("click",function(){show("letterCard",true);$("letterCard").scrollIntoView({behavior:"smooth"})});
$("mk").addEventListener("click",function(){
var air0=document.body.dataset.air;if(air0&&!$("air").value)$("air").value=air0;var t=$("tipo").value,motivo=t==="ret"?"llegó a su destino final con un retraso de "+($("hrs").value||"más de 3")+" horas":t==="can"?"fue cancelado con "+($("aviso").value||"menos de 14")+" días de antelación":"me fue denegado el embarque contra mi voluntad";
var f=$("fec").value?new Date($("fec").value).toLocaleDateString("es-ES"):"[fecha]";
var s="Asunto: Reclamación de compensación según el Reglamento (CE) 261/2004\n\nA la atención de "+($("air").value||"[aerolínea]")+":\n\nYo, "+($("nom").value||"[nombre]")+", viajé en el vuelo "+($("vue").value||"[nº de vuelo]")+" el "+f+", ruta "+($("rut").value||"[ruta]")+", con código de reserva "+($("res2").value||"[código]")+".\n\nEl citado vuelo "+motivo+". Por ello solicito la compensación económica de "+amount+" euros que establece el artículo 7 del Reglamento (CE) 261/2004.\n\nSi alegan circunstancias extraordinarias, les ruego que las acrediten documentalmente, ya que corresponde a la aerolínea probarlas.\n\nPueden abonar el importe por transferencia a la cuenta: "+($("iban").value||"[IBAN]")+".\n\nSi no recibo respuesta en un plazo de 30 días, acudiré a la Agencia Estatal de Seguridad Aérea (AESA) y a la vía judicial.\n\nAtentamente,\n"+($("nom").value||"[nombre]");
$("txt").value=s});
$("cp").addEventListener("click",function(){try{navigator.clipboard.writeText($("txt").value);$("cp").textContent="¡Copiada!"}catch(e){$("txt").select()}});
})();

(function(){var d=document.body.dataset.tipo;if(d){document.getElementById("tipo").value=d;document.getElementById("tipo").dispatchEvent(new Event("change"))}})();