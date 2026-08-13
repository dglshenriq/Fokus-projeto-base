const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const imagemBt = document.querySelector('.app__card-primary-butto-icon');

const musica = new Audio('./sons/luna-rise-part-one.mp3');
const startPauseBt = document.querySelector('#start-pause');
const audioPlay = new Audio('./sons/play.wav');
const audioPause = new Audio('./sons/pause.mp3');
const audioZerar = new Audio('./sons/beep.mp3');

let tempoDecorridoEmSegundos = 5;
let intervaloId = null;

musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
});

function alteraContexto(contexto) {
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagens/${contexto}.png`);
    botoes.forEach((botao) => {
        botao.classList.remove('active');
    });
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br />
          <strong class="app__title-strong">mergulhe no que importa!</strong>`;
            break;
        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada?<br />
          <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
            break;
        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superfície.<br />
          <strong class="app__title-strong">Faça uma pausa longa!</strong>`;
            break;
        default:
            break;
    }
}

focoBt.addEventListener('click', () => {
    alteraContexto('foco');
    focoBt.classList.add('active');
})

curtoBt.addEventListener('click', () => {
    alteraContexto('descanso-curto');
    curtoBt.classList.add('active');
})

longoBt.addEventListener('click', () => {
    alteraContexto('descanso-longo');
    longoBt.classList.add('active');
});

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
       zerar();
       audioZerar.play();
       alert('Tempo finalizado!');
       audioZerar.pause();
       return;
    }
   tempoDecorridoEmSegundos-= 1;
   console.log('Temporizador: ' + tempoDecorridoEmSegundos);
}

startPauseBt.addEventListener('click', iniciarOuPausar);
function iniciarOuPausar() {   
    
    if (intervaloId) {
        audioPause.play();
        iniciarOuPausarBt.textContent = 'Continuar';
        zerar();
        return;
    }
    intervaloId = setInterval(contagemRegressiva, 1000);
    audioPlay.play();
    iniciarOuPausarBt.textContent = 'Pausar';
    imagemBt.setAttribute('src', './imagens/pause.png');
}

function zerar(){
    clearInterval(intervaloId);
    intervaloId = null;
    iniciarOuPausarBt.textContent = 'Começar';
    imagemBt.setAttribute('src', './imagens/play_arrow.png');
}