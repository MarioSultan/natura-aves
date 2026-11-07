const birds = [
 {name:"Petirrojo europeo",latin:"Erithacus rubecula",hint:"Su pecho anaranjado es una de sus señas más características.",image:"https://commons.wikimedia.org/wiki/Special:FilePath/European%20Robin%20-%20(Erithacus%20rubecula).jpg",page:"https://commons.wikimedia.org/wiki/File:European_Robin_-_(Erithacus_rubecula).jpg",credit:"Ivan Vezenkovic · Wikimedia Commons"},
 {name:"Carbonero común",latin:"Parus major",hint:"Busca el amarillo del vientre y la franja oscura que lo atraviesa.",image:"https://commons.wikimedia.org/wiki/Special:FilePath/Great%20tit%20-%20Parus%20major.jpg",page:"https://commons.wikimedia.org/wiki/File:Great_tit_-_Parus_major.jpg",credit:"Francis Franklin · Wikimedia Commons"},
 {name:"Jilguero europeo",latin:"Carduelis carduelis",hint:"La máscara roja de la cara y el amarillo de las alas son inconfundibles.",image:"https://commons.wikimedia.org/wiki/Special:FilePath/European%20goldfinch%20(Carduelis%20carduelis)%202025.jpg",page:"https://commons.wikimedia.org/wiki/File:European_goldfinch_(Carduelis_carduelis)_2025.jpg",credit:"TRinaud · Wikimedia Commons"},
 {name:"Mirlo común",latin:"Turdus merula",hint:"El macho adulto es negro y suele destacar por su pico amarillo.",image:"https://commons.wikimedia.org/wiki/Special:FilePath/Common%20blackbird%20-%20Turdus%20merula.jpg",page:"https://commons.wikimedia.org/wiki/File:Common_blackbird_-_Turdus_merula.jpg",credit:"Warrieboy · Wikimedia Commons"},
 {name:"Cigüeña blanca",latin:"Ciconia ciconia",hint:"Sus largas patas y su pico rojo la hacen fácil de reconocer.",image:"https://commons.wikimedia.org/wiki/Special:FilePath/White%20Stork%2C%20Ciconia%20ciconia.jpg",page:"https://commons.wikimedia.org/wiki/File:White_Stork,_Ciconia_ciconia.jpg",credit:"BirdingInSpain · Wikimedia Commons"},
 {name:"Gorrión común",latin:"Passer domesticus",hint:"Es habitual en pueblos y ciudades; el macho tiene babero negro.",image:"https://commons.wikimedia.org/wiki/Special:FilePath/Passer%20domesticus%2C%20house%20sparrow.jpg",page:"https://commons.wikimedia.org/wiki/File:Passer_domesticus,_house_sparrow.jpg",credit:"Triops1972 · Wikimedia Commons"},
 {name:"Pico picapinos",latin:"Dendrocopos major",hint:"Su plumaje blanco y negro y el rojo bajo la cola son pistas útiles.",image:"https://commons.wikimedia.org/wiki/Special:FilePath/Great%20spotted%20woodpecker%20-%20Dendrocopos%20major.jpg",page:"https://commons.wikimedia.org/wiki/File:Great_spotted_woodpecker_-_Dendrocopos_major.jpg",credit:"Georgi.petrov66 · Wikimedia Commons"},
 {name:"Cernícalo vulgar",latin:"Falco tinnunculus",hint:"Es un pequeño halcón que puede quedarse suspendido en el aire mientras busca presas.",image:"https://commons.wikimedia.org/wiki/Special:FilePath/Common%20kestrel%20falco%20tinnunculus-original.jpg",page:"https://commons.wikimedia.org/wiki/File:Common_kestrel_falco_tinnunculus-original.jpg",credit:"Andreas Trepte · Wikimedia Commons"},
 {name:"Abubilla",latin:"Upupa epops",hint:"Su cresta eréctil en forma de abanico es muy característica.",image:"https://commons.wikimedia.org/wiki/Special:FilePath/Hoopoe-Upupa%20epops.jpg",page:"https://commons.wikimedia.org/wiki/File:Hoopoe-Upupa_epops.jpg",credit:"Anagha devi · Wikimedia Commons"},
 {name:"Urraca común",latin:"Pica pica",hint:"Su plumaje blanco y negro puede mostrar reflejos azulados y verdosos.",image:"https://commons.wikimedia.org/wiki/Special:FilePath/Magpie%20(pica%20pica)%20from%20Greece.jpg",page:"https://commons.wikimedia.org/wiki/File:Magpie_(pica_pica)_from_Greece.jpg",credit:"Annatsach · Wikimedia Commons"}
];
const choices = [
 ["Petirrojo europeo","Colirrojo tizón","Ruiseñor común","Acentor común"],
 ["Herrerillo común","Carbonero común","Mito","Verderón común"],
 ["Jilguero europeo","Pardillo común","Verdecillo","Pinzón vulgar"],
 ["Estornino negro","Mirlo común","Cuervo grande","Zorzal común"],
 ["Garza real","Grulla común","Cigüeña blanca","Espátula común"],
 ["Gorrión común","Pinzón vulgar","Escribano montesino","Triguero"],
 ["Pico picapinos","Torcecuello euroasiático","Pito real","Abubilla"],
 ["Gavilán común","Cernícalo vulgar","Milano real","Busardo ratonero"],
 ["Abubilla","Martín pescador","Abejaruco europeo","Carraca europea"],
 ["Urraca común","Rabilargo ibérico","Chova piquirroja","Graja"]
];
let index=0, score=0, locked=false;
const $=id=>document.getElementById(id);
function start(){index=0;score=0;$("intro").classList.add("hidden");$("result").classList.add("hidden");$("quiz").classList.remove("hidden");render();window.scrollTo({top:0,behavior:"smooth"});}
function render(){
 locked=false;const b=birds[index];$("current-number").textContent=String(index+1).padStart(2,"0");$("progress").style.width=((index+1)*10)+"%";$("bird-image").src=b.image;$("bird-image").alt="Ave fotografiada: "+b.name+" (responde para descubrirlo)";$("bird-hint").textContent="Una pista aparecerá al responder";$("feedback").classList.add("hidden");
 const options=[...choices[index]];const correctIndex=options.indexOf(b.name);
 $("answers").innerHTML="";
 options.forEach((option,i)=>{const btn=document.createElement("button");btn.className="answer";btn.innerHTML=`<span class="letter">${String.fromCharCode(65+i)}</span>${option}`;btn.addEventListener("click",()=>answer(option,correctIndex));$("answers").appendChild(btn);});
}
function answer(option,correctIndex){
 if(locked)return;locked=true;const b=birds[index];const buttons=[...$("answers").children];const chosen=buttons.find(x=>x.textContent.trim().slice(1).trim()===option);
 const correct=option===b.name;if(correct)score++;
 buttons.forEach((btn,i)=>{btn.disabled=true;if(i===correctIndex)btn.classList.add("correct");else if(btn===chosen)btn.classList.add("wrong");});
 $("feedback-title").textContent=correct?"¡Exacto! Es "+b.name+".":"¡Casi! Es "+b.name+".";
 $("feedback-text").textContent=b.hint+" ("+b.latin+").";
 $("bird-hint").textContent=b.name+" · "+b.latin;
 $("next-btn").innerHTML=index===9?"Ver mi resultado <span>→</span>":"Siguiente ave <span>→</span>";
 $("feedback").classList.remove("hidden");
}
function finish(){
 $("quiz").classList.add("hidden");$("result").classList.remove("hidden");$("score").textContent=score;
 const deg=score/10*360;$("score-ring").style.background=`conic-gradient(var(--blue) ${deg}deg, #d2eaf0 ${deg}deg)`;
 let title,message;if(score>=9){title="¡Ojo de lince!";message="Tienes una mirada excelente. Sigue observando: siempre queda algo nuevo por descubrir.";}else if(score>=7){title="¡Muy buen observador!";message="Reconoces un buen número de especies. Con un poco más de práctica, todavía afinarás más.";}else if(score>=4){title="Vas por buen camino";message="Ya has empezado a fijarte en los detalles. La mejor forma de aprender es salir a observar.";}else{title="Toda aventura empieza mirando";message="No te preocupes: ahora tienes diez aves más que aprender a reconocer. ¡Inténtalo de nuevo!";}
 $("result-title").textContent=title;$("result-message").textContent=message;window.scrollTo({top:0,behavior:"smooth"});
}
$("start-btn").addEventListener("click",start);$("retry-btn").addEventListener("click",start);
$("next-btn").addEventListener("click",()=>{if(index===9)finish();else{index++;render();}});
$("credit-list").innerHTML=birds.map(b=>`<li><a href="${b.page}" target="_blank" rel="noopener">${b.name}</a> — ${b.credit}. <a href="${b.page}" target="_blank" rel="noopener">Ficha y licencia</a>.</li>`).join("");
