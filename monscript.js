score=0;
joueurx=joueury=10;       //position en x et y du joueur
tailleGrille= 20;
nbCarreaux=40;          
nx=ny=15;       //nourriture
vx=vy=0;        //vitesse
corps=[];       //tableau definissant le serpent
queueInitial = 1;       //nb de carreau definissant le serpent des le depart

function showDiv() {                //fonction pour afficher la div du canvas de snake apres le clic sur commencer
    document.getElementById('EcranJeu').style.display = "flex";
    document.getElementById('EcranJeu').style.justifyContent= "center";
    canv=document.getElementById("snakeCanvas");
    ctx=canv.getContext("2d");
    document.addEventListener("keydown",keyPush);
    setInterval(game,1000/15);  //vitesse du jeu
       
}

function keyPush(evt) {                 //gestion des controles
    switch(evt.keyCode) {                
        case 37:
            if (vx==1){                 //Condition afin d'empecher de se retourner sur soi-même
                break;
            }
            vx=-1;vy=0;
            break;
        case 38:
            if (vy==1){
                break;
            }
            vx=0;vy=-1;
            break;
        case 39:
            if (vx==-1){
                break;
            }
            vx=1;vy=0;
            break;//
        case 40:
            if (vy==-1){
                break;
            }
            vx=0;vy=1;
            break;
    }
}

function game() {                  
    joueurx+=vx;
    joueury+=vy;
    if(joueurx<0) {
        joueurx= nbCarreaux-1;      //gestion afin de ne pas avoir de mur et de traverser la map
    }
    if(joueurx>nbCarreaux-1) {
        joueurx= 0;
    }
    if(joueury<0) {
        joueury= nbCarreaux-1;
    }
    if(joueury>nbCarreaux-1) {
        joueury= 0;
    }
    ctx.fillStyle="black";                          //Dessin du fond du canvas
    ctx.fillRect(0,0,canv.width,canv.height);

    ctx.fillStyle="lime";                           //dessin du snake
    for(var i=0;i<corps.length;i++) {
        ctx.fillRect(corps[i].x*tailleGrille,corps[i].y*tailleGrille,tailleGrille-2,tailleGrille-2);
        if(i!=0 && corps[i].x==joueurx && corps[i].y==joueury) {                    // Condition si le snake se mord la queue
            scorefinal = score;
            alert("Vous avez perdu, votre score final est de : "+scorefinal)
            score=0;
            document.getElementById("score").innerHTML=scorefinal;
            joueurx=joueury=10;       
            tailleGrille= 20;
            nbCarreaux=40;          
            nx=ny=15;       
            xv=yv=0;        
            corps=[];
            queueInitial = 1;
        }
    }
    corps.push({x:joueurx,y:joueury});          //gestion du deplacement du snake
    while(corps.length>queueInitial) {
        corps.shift();
    }

    if(nx==joueurx && ny==joueury) {
        score++;
        document.getElementById("score").innerHTML=score;
        queueInitial++;
        nx=Math.floor(Math.random()*nbCarreaux);
        ny=Math.floor(Math.random()*nbCarreaux);
    }
    ctx.fillStyle="red";            // dessin de la nourriture
    ctx.fillRect(nx*tailleGrille,ny*tailleGrille,tailleGrille-2,tailleGrille-2);
} 
