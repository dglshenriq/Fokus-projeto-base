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

const tempoNaTela = document.querySelector('#timer');
const musica = new Audio('./sons/luna-rise-part-one.mp3');
const startPauseBt = document.querySelector('#start-pause');
const audioPlay = new Audio('./sons/play.wav');
const audioPause = new Audio('./sons/pause.mp3');
const audioZerar = new Audio('./sons/beep.mp3');

let tempoInicialEmSegundos = 10;
let tempoDecorridoEmSegundos = tempoInicialEmSegundos;
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
    mostrarTempo();
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
    tempoDecorridoEmSegundos = 10;
    alteraContexto('foco');
    focoBt.classList.add('active');
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 10;
    alteraContexto('descanso-curto');
    curtoBt.classList.add('active');
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 10;
    alteraContexto('descanso-longo');
    longoBt.classList.add('active');
});

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
       audioZerar.play();
       alert('Tempo finalizado!');
       audioZerar.pause();
       const focoAtivo = html.getAttribute('data-contexto') === 'foco';
         if (focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado');
            document.dispatchEvent(evento);         }
       zerar();
       return;
    }
   tempoDecorridoEmSegundos-= 1;
   mostrarTempo();
}

startPauseBt.addEventListener('click', iniciarOuPausar);
function iniciarOuPausar() {   
    
    if (intervaloId) {
        pausar();
        return;
    }
    intervaloId = setInterval(contagemRegressiva, 1000);
    tocar();
}

function pausar(){
    clearInterval(intervaloId);
    intervaloId = null;
    audioPause.play();
    iniciarOuPausarBt.textContent = 'Continuar';
    imagemBt.setAttribute('src', './imagens/play_arrow.png');
}

function tocar() {
    audioPlay.play();
    iniciarOuPausarBt.textContent = 'Pausar';
    imagemBt.setAttribute('src', './imagens/pause.png');
}

function zerar(){
    clearInterval(intervaloId);
    intervaloId = null;
    tempoDecorridoEmSegundos = tempoInicialEmSegundos;
    iniciarOuPausarBt.textContent = 'Começar';
    imagemBt.setAttribute('src', './imagens/play_arrow.png');
    mostrarTempo();
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado =tempo.toLocaleTimeString('pt-BR', {
        minute: '2-digit',
        second: '2-digit',
    });
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();