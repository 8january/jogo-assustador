import { primeiroDialogo, escolherPersonagem } from './dialogos.js'
import { b_continuar, b_sair } from './escolhas.js'

const dialogos = document.querySelector('#dialogos')
const escolhas = document.querySelector('#escolhas')
const visual = document.querySelector('.visual')
const cenaNome = document.querySelector('#cenaNome')
let personagemImg = document.querySelector('#imgChar')
let personagemPrincipal

document.querySelector('#btn-comecar').onclick = comecar

function comecar() {
   document.querySelector('#btn-comecar').style.display = 'none'
   escrever_dialogo(primeiroDialogo)
      .then(escrever_escolha(b_continuar, b_sair))
      .then(
         () =>
            (document.querySelector('#continuar').onclick = continuar)
      )
      .then(
         () =>
            (document.querySelector('#sair').onclick = () =>
               (window.location.href =
                  'https://www.youtube.com/watch?v=dQw4w9WgXcQ'))
      )
}

function continuar() {
   escrever_dialogo(escolherPersonagem)
   personagens()
}

function escrever_CenaNome(cenaText) {
   return new Promise((resolve) => {
      let index = 0
      cenaNome.innerHTML = ''
      const interval = setInterval(() => {
         cenaNome.innerHTML += cenaText[index++]
         if (index >= cenaText.length) {
            clearInterval(interval)
            resolve()
         }
      }, 25)
   })
}

function escrever_dialogo(dialogoText) {
   return new Promise((resolve) => {
      let index = 0
      dialogos.innerHTML = ''
      escolhas.innerHTML = ''
      const audioDialogo = new Audio('../audio/escreverDialogo.mp3')
      audioDialogo.playbackRate = 1.2
      audioDialogo.play()
      const interval = setInterval(() => {
         if (dialogoText[index] === '@') {
            dialogos.innerHTML += `<span class="cen"> *** </span>`
            index++
         } else if (dialogoText[index] === '$') {
            dialogos.innerHTML += `<span class="personagemT"> ${personagemPrincipal.nome} </span><span class="cen">?????</span>`
            index++
         } else if (dialogoText[index] === '&') {
            dialogos.innerHTML += `<span class="cen">?</span><span class="personagemT">!!!!!! </span> `
            index++
         } else {
            dialogos.innerHTML += dialogoText[index++]
         }

         if (index >= dialogoText.length) {
            clearInterval(interval)
            audioDialogo.pause()
            resolve()
         }
      }, 5)
   })
}

function escrever_escolha(...allescolhas) {
   escolhas.innerHTML = ''
   for (let escolha of allescolhas) {
      escolhas.innerHTML += escolha
   }
}

function morte() {
   personagemImg.style.filter = 'grayscale(100%)'
   const audioDeath = new Audio('../audio/badEnding.mp3')
   audioDeath.play()
   setTimeout(() => audioDeath.pause(), 2200)
}

function audioMorte() {
   const audioDeath = new Audio('../audio/death.mp3')
   audioDeath.currentTime = 0.2
   audioDeath.play()
   setTimeout(() => audioDeath.pause(), 2000)
}

function audioAfogamento() {
   const audioDeath = new Audio('../audio/afogando.mp3')
   audioDeath.playbackRate = 2
   audioDeath.play()
   setTimeout(() => audioDeath.pause(), 2200)
}

function audioFuga() {
   const audioDeath = new Audio('../audio/fuga.mp3')
   audioDeath.currentTime = 4
   audioDeath.play()
   setTimeout(() => audioDeath.pause(), 2200)
}

function audioAssassino() {
   const audioDeath = new Audio('../audio/assassinoAparece.mp3')
   audioDeath.play()
   setTimeout(() => audioDeath.pause(), 3000)
}

function abrindoPorta() {
   const audioDeath = new Audio('../audio/abrindoPorta.mp3')
   audioDeath.play()
   setTimeout(() => audioDeath.pause(), 3000)
}

function personagens() {
   let personagem1 = document.querySelector('.c1')
   let personagem2 = document.querySelector('.c2')
   let personagem3 = document.querySelector('.c3')

   document.querySelector('#fImg').style.opacity = 1
   document.querySelector('#sImg').style.opacity = 1
   document.querySelector('#tImg').style.opacity = 1

   personagem1.onclick = () => {
      personagemImg.src = '../img/jogo-assustador/image.png'
      personagemImg.style.opacity = '1'
      personagemPrincipal = {
         nome: 'Yohan',
         habilidade: 'QI',
         hasChosen: 'empty',
      }
      cena_comecar()
   }
   personagem2.onclick = () => {
      personagemImg.src = '../img/jogo-assustador/image (1).png'
      personagemImg.style.opacity = '1'
      personagemPrincipal = {
         nome: 'Hannah',
         habilidade: 'Run',
         hasChosen: 'empty',
      }
      cena_comecar()
   }
   personagem3.onclick = () => {
      personagemImg.src = '../img/jogo-assustador/image (2).png'
      personagemImg.style.opacity = '1'
      personagemPrincipal = {
         nome: 'Ana',
         habilidade: 'Strenght',
         hasChosen: 'empty',
      }
      cena_comecar()
   }
   escolhas.innerHTML = ''
}

import { inicio } from './dialogos.js'
import { b_continuarInicio } from './escolhas.js'

function cena_comecar() {
   dialogos.innerHTML = ''

   document.querySelector('.personagens').style.display = 'none'
   escrever_CenaNome('1. O inicio')
   escrever_dialogo(inicio)
      .then(() => escrever_escolha(b_continuarInicio))
      .then(() => {
         document.querySelector('#continuarInicio').onclick =
            continuarInicio
      })
}

import { irParaEscola } from './dialogos.js'
import {
   b_bilhete,
   b_telefonar,
   b_procurarArmario,
} from './escolhas.js'

function continuarInicio() {
   escrever_dialogo(irParaEscola)
      .then(() =>
         escrever_escolha(b_bilhete, b_telefonar, b_procurarArmario)
      )
      .then(() => escolha_coisasEsquecidas())
}

import { b_caneta, b_desodorante } from './escolhas.js'

function escolha_coisasEsquecidas() {
   document.querySelector('#bilhete').onclick = () => {
      personagemPrincipal.hasChosen = 'bilhete'
      console.log(personagemPrincipal.hasChosen)
      escrever_dialogo(
         '$ havia esquecido de deixar um bilhete para sua mãe avisando sua localização'
      ).then(() => continuarParaEscola())
      escolhas.innerHTML = ''
   }

   document.querySelector('#telefonar').onclick = () => {
      personagemPrincipal.hasChosen = 'telefonar'
      console.log(personagemPrincipal.hasChosen)
      escrever_dialogo(
         '$ havia esquecido de avisar para um amigo sua localização'
      ).then(() => continuarParaEscola())
      escolhas.innerHTML = ''
   }

   document.querySelector('#procurarArmario').onclick = () => {
      escrever_escolha(b_caneta, b_desodorante)
      escolha_coisasEsquecidas_2()
   }
}

function escolha_coisasEsquecidas_2() {
   document.querySelector('#caneta').onclick = () => {
      personagemPrincipal.hasChosen = 'caneta'
      console.log(personagemPrincipal.hasChosen)
      escrever_dialogo(
         '$ havia esquecido de trazer sua ' +
            personagemPrincipal.hasChosen
      ).then(() => continuarParaEscola())
   }
   document.querySelector('#desodorante').onclick = () => {
      personagemPrincipal.hasChosen = 'desodorante'
      console.log(personagemPrincipal.hasChosen)
      escrever_dialogo(
         '$ havia esquecido de trazer seu ' +
            personagemPrincipal.hasChosen
      ).then(() => continuarParaEscola())
   }
}

import {
   b_continuarParaEscola,
   b_desistir,
   b_forgotEnding,
} from './escolhas.js'

function continuarParaEscola() {
   escrever_escolha(b_continuarParaEscola, b_desistir)
   crucial()
}

function crucial() {
   document.querySelector('#continuarEscola').onclick = escola
   document.querySelector('#desistir').onclick = desistir
}

function desistir() {
   escrever_dialogo(
      '$ para e percebe que tudo é uma grande decisão idiota e decide desistir. $ guarda todas suas coisas e decide ir dormir.'
   )
      .then(() => escrever_escolha(b_forgotEnding))
      .then(() => firstEnding())
}

import { chegarNaEscola } from './dialogos.js'
import { b_oeste, b_sul, b_leste } from './escolhas.js'

function escola() {
   escrever_dialogo(chegarNaEscola)
      .then(() => escrever_escolha(b_oeste, b_sul, b_leste))
      .then(() => alas())
}

function alas() {
   document.querySelector('#oeste').onclick = oeste
   document.querySelector('#sul').onclick = sul
   document.querySelector('#leste').onclick = leste
}

import { oesteInicio, sulInicio, lesteInicio } from './dialogos.js'

import {
   b_salaDeQuimica,
   b_continuarSalaDeQuimica,
} from './escolhas.js'
import {
   salaDeQuimica,
   assassinoDeQuimicaAparece,
} from './dialogos.js'

function oeste() {
   escrever_dialogo(oesteInicio)
      .then(() => escrever_escolha(b_salaDeQuimica))
      .then(() => salaDeQuimicaF())
}

function salaDeQuimicaF() {
   document.querySelector('#salaDeQuimica').onclick = () => {
      escrever_dialogo(salaDeQuimica)
         .then(() => abrindoPorta())
         .then(() => escrever_escolha(b_continuarSalaDeQuimica))
         .then(() => salaDeQuimicaF_2())
   }
}

import {
   b_lutarAssassinoDeQuimica,
   b_fugirAssassinoDeQuimica,
} from './escolhas.js'

function salaDeQuimicaF_2() {
   document.querySelector('#continuarSalaDeQuimica').onclick = () => {
      escrever_CenaNome('2. MORRER OU CORRER')

      escrever_dialogo(assassinoDeQuimicaAparece)
         .then(() => {
            escrever_escolha(
               b_lutarAssassinoDeQuimica,
               b_fugirAssassinoDeQuimica
            )
         })
         .then(() => {
            lutarQuimica()
            fugirAssassinoDeQuimica()
         })

      audioAssassino()
      visual.innerHTML = `<img src="../img/jogo-assustador/killerOeste.png" class="cena" alt="">`
   }
}

import { lutar } from './dialogos.js'
import {
   b_atacar,
   b_procurarQuimica,
   b_continuarParaMorte,
} from './escolhas.js'

function lutarQuimica() {
   document.querySelector('#lutarQuimica').onclick = () => {
      escrever_CenaNome('2.1 LUTAR!')

      escrever_dialogo(lutar)
         .then(() => escrever_escolha(b_atacar, b_procurarQuimica))
         .then(() => {
            lutarAssassinoDeQuimica()
            procurarSalaDeQuimica()
         })
   }
}

function lutarAssassinoDeQuimica() {
   document.querySelector('#atacar').onclick = () => {
      if (personagemPrincipal.hasChosen === 'caneta') {
         escrever_dialogo(
            '$ se enche de coragem e fúria e logo avança correndo em direção da professora para ataca-la. $ não pensa duas vezes e tenta acertar um dos olhos de & com sua caneta, porém é acertado rapidamente no pescoço pelo machado que ela carrega. Logo $ cai no chão, sangrando e agora em desespero pelo o que estava acontecendo, até que a professora atinge sua cabeça. $ morre.'
         )
            .then(() => audioMorte())
            .then(() => escrever_escolha(b_continuarParaMorte))
            .then(() => secondEnd())
      } else if (personagemPrincipal.hasChosen === 'desodorante') {
         escrever_dialogo(
            '$ se enche de coragem e fúria e logo avança correndo em direção da professora para ataca-la. $ não pensa duas vezes e tenta atingir a cabeça da professora com o desodorante que levava, porém é acertado rapidamente no rosto pelo machado que ela carrega. Logo $ cai no chão, sangrando e agora em desespero pelo o que estava acontecendo, até que a professora atinge sua cabeça. $ morre.'
         )
            .then(() => audioMorte())
            .then(() => escrever_escolha(b_continuarParaMorte))
            .then(() => secondEnd())
      } else {
         escrever_dialogo(
            '$ se enche de coragem e fúria e logo avança correndo em direção da professora para ataca-la. $ tenta acerta um soco direto no rosto dela, porém é acertado rapidamente na mandibula pelo machado que ela carrega. Logo $ cai no chão, sangrando e agora em desespero pelo o que estava acontecendo, até que a professora atinge sua cabeça. $ morre.'
         )
            .then(() => audioMorte())
            .then(() => escrever_escolha(b_continuarParaMorte))
            .then(() => secondEnd())
      }
   }
}

function procurarSalaDeQuimica() {
   document.querySelector('#procurar').onclick = () => {
      escrever_dialogo(
         '$ procura por algo para usar, mas só encontra frascos de soluções químicas. Então $ decide utilizar uma delas para distrair a professora.'
      )
         .then(() => {
            if (personagemPrincipal.habilidade === 'QI') {
               escrever_escolha(
                  `<button id='acido'> Acido Sulfurico </button>`,
                  `<button id='no'> Agua oxigenada </button>`,
                  `<button id='no'> Amônia </button>`
               )
            } else
               escrever_escolha(
                  `<button id='acido'> H<sub>2</sub>SO<sub>4</sub></button>`,
                  `<button id='no'> H<sub>2</sub>O<sub>2</sub></button>`,
                  `<button id='no'> NH<sub>3</sub></button>`
               )
         })
         .then(() => solucoesQuimica())
   }
}

let estadoAssassino = 'normal'

function solucoesQuimica() {
   document.querySelector('#acido').onclick = () => {
      escrever_dialogo(
         '$ identifica o frasco com acido e arremessa no rosto da professora, ela cobre o rosto agonizando de dor. É sua chance de escapar!'
      )
         .then(() => escrever_escolha(b_fugirAssassinoDeQuimica))
         .then(() => fugirAssassinoDeQuimica())
      estadoAssassino = 'atordoado'
   }

   let allNo = document.querySelectorAll('#no')
   allNo.forEach((no) => {
      no.onclick = () => {
         escrever_dialogo(
            '$ pega o primeiro que encontra e arremessa na professora, porém não tem efeito algum. Ela avança em fúria e atinge sua cabeça com o machado. $ morre.'
         )
            .then(() => audioMorte())
            .then(() => escrever_escolha(b_continuarParaMorte))
            .then(() => secondEnd())
      }
   })
}

import { b_continuarFuga } from './escolhas.js'

function fugirAssassinoDeQuimica() {
   document.querySelector('#fugir').onclick = () => {
      escrever_CenaNome('2.1 CORRER!')
      escrever_dialogo(
         'Você imediatamente começa a correr para fora da sala. voltando ao corredor da Ala Oeste'
      )
         .then(() => audioFuga())
         .then(() => escrever_escolha(b_continuarFuga))
         .then(() => continuarFuga())
      visual.innerHTML = `<img src="../img/jogo-assustador/killerOeste_2.png" class="cena" alt="">`
   }
}

import { b_salao, b_salas } from './escolhas.js'
import { fuga } from './dialogos.js'

function continuarFuga() {
   document.querySelector('#continuarFuga').onclick = () => {
      escrever_dialogo(fuga)
         .then(() => escrever_escolha(b_salao, b_salas))
         .then(() => checarFuga())
   }
}

import { b_biologia, b_fisica, b_ingles } from './escolhas.js'

function checarFuga() {
   document.querySelector('#salas').onclick = () => {
      escrever_escolha(b_biologia, b_ingles, b_fisica)
      checarClasses()
   }

   document.querySelector('#salao').onclick = () => {
      if (
         estadoAssassino === 'atordoado' ||
         personagemPrincipal.habilidade === 'Run'
      ) {
         if (personagemPrincipal.hasChosen === 'telefonar') {
            escrever_dialogo(
               '$ corre como nunca correu antes, atravessa o salao e chega até a porta da saída, porém & tambem esta atras e atinge sua costa como machado. $ cai no chão, ja fora da escola, porém está tão tarde que não há ninguem na rua.. já sem esperanças, $ escuta a buzina e vê o farol de uma moto em sua direção. & é atropelada, seu amigo havia chegado. $ sobe na moto e foge do local.'
            )
               .then(() =>
                  escrever_escolha(
                     `<button id='toLive'> continuar </button>`
                  )
               )
               .then(
                  () =>
                     (document.querySelector('#toLive').onclick =
                        goodEnding)
               )
         } else {
            escrever_dialogo(
               '$ corre como nunca correu antes, atravessa o salao e chega até a porta da saída, porém ! tambem esta atras e atinge sua costa como machado. $ cai no chão, ja fora da escola, porém está tão tarde que não há ninguem na rua..'
            )
               .then(() => escrever_escolha(b_continuarParaMorte))
               .then(() => secondEnd())
         }
      } else {
         escrever_dialogo(
            '$ tenta fugir, mas rapidamente é pego pela assassina. $ é morto.'
         )
            .then(() => escrever_escolha(b_continuarParaMorte))
            .then(() => secondEnd())
      }
   }
}

import { b_duto, b_janela } from './escolhas.js'

function checarClasses() {
   document.querySelector('#ingles').onclick = () => {
      escrever_dialogo(
         '$ corre até a sala de inglês, a mais proxima. Para sua infelicidade, ela estava trancada. Não havia mais tempo para fugir, $ é morto por &..'
      )
         .then(() => escrever_escolha(b_continuarParaMorte))
         .then(() => secondEnd())
   }
   document.querySelector('#fis').onclick = () => {
      escrever_dialogo(
         'Ao entrar na sala, $ se depara com a janela fechada e os dutos semi abertos, o que ele decide fazer?'
      )
         .then(() => escrever_escolha(b_duto, b_janela))
         .then(() => checarDuto())
         .then(() => checarJanela())
   }
   document.querySelector('#bio').onclick = () => {
      escrever_dialogo(
         'Ao entrar na sala, $ se depara com a janela fechada e os dutos semi abertos, o que ele decide fazer?'
      )
         .then(() => escrever_escolha(b_duto, b_janela))
         .then(() => checarDuto())
         .then(() => checarJanela())
   }
}

function checarDuto() {
   document.querySelector('#duto').onclick = () => {
      if (personagemPrincipal.hasChosen === 'caneta') {
         escrever_dialogo(
            '$ vai até o duto, que ainda estava meio parafusado, por sorte, sua caneta é capaz de remover as travas e $ consegue entrar no duto.'
         )
            .then(() =>
               escrever_escolha(
                  `<button id='continuarToLive'> continuar </button>`
               )
            )
            .then(
               () =>
                  (document.querySelector(
                     '#continuarToLive'
                  ).onclick = goodEnding)
            )
      } else {
         escrever_dialogo(
            '$ vai até o duto, ainda meio parafusado, porém não encontra nada que consiga abrir o duto. Agora ja era tarde demais, & encontra e mata $.'
         )
            .then(() => escrever_escolha(b_continuarParaMorte))
            .then(() => secondEnd())
      }
   }
}

function checarJanela() {
   document.querySelector('#janela').onclick = () => {
      if (personagemPrincipal.habilidade === 'strenght') {
         escrever_dialogo(
            '$ consegue abrir a janela e salta para fora da sala. Caindo no jardim e tendo leves ferimentos. Ao olhar para a janela, & está lhe observando.. até que ela decide voltar e $ não enxerga mais ela.'
         )
            .then(() =>
               escrever_escolha(
                  `<button id='continuarToLive'> continuar </button>`
               )
            )
            .then(
               () =>
                  (document.querySelector(
                     '#continuarToLive'
                  ).onclick = goodEnding)
            )
      } else {
         escrever_dialogo(
            '$ tenta abrir a janela, mas ela parece estar emperrada ou quebrada.. já era tarde. & acerta $ pelas costas e arrasta seu corpo para fora da sala.'
         )
            .then(() => escrever_escolha(b_continuarParaMorte))
            .then(() => secondEnd())
      }
   }
}

import { b_cafeteria } from './escolhas.js'
import { cafeteria } from './dialogos.js'

function sul() {
   escrever_dialogo(sulInicio)
      .then(() => escrever_escolha(b_cafeteria))
      .then(() => escolha_cafeteria())
}

import {
   b_zeladores,
   b_fugirCafeteria,
   b_lutarCafeteria,
} from './escolhas.js'

function escolha_cafeteria() {
   document.querySelector('#cafeteria').onclick = () => {
      visual.innerHTML = `<img src="../img/jogo-assustador/killerSul.jpg" class='cena'>`
      escrever_CenaNome('2. Ira')
      audioAssassino()

      escrever_dialogo(cafeteria)
         .then(() =>
            escrever_escolha(
               b_zeladores,
               b_fugirCafeteria,
               b_lutarCafeteria
            )
         )
         .then(() => lutarCafeteria())
         .then(() => fugirCafeteria())
         .then(() => zeladores())
   }
}

function lutarCafeteria() {
   document.querySelector('#lutar').onclick = () => {
      if (personagemPrincipal.hasChosen === 'caneta') {
         escrever_dialogo(
            '$ se aproxima tranquilamente de & e consegue acertar seu pescoço com a caneta, fazendo-a gritar de dor. No entanto, ela reage com medo e o esfaqueia com um punhal, em seguida, foge rapidamente do refeitório.'
         ).then(() => {
            escrever_escolha(b_fugirCafeteria, b_zeladores)
            fugirCafeteria()
            zeladores()
         })
         estadoAssassino = 'ferido'
      } else if (personagemPrincipal.habilidade === 'Strenght') {
         escrever_dialogo(
            '$ se aproxima lentamente de & e tenta aplicar um mata-leão. Assustada, ela rapidamente reage e o esfaqueia com um punhal, fugindo imediatamente do refeitório.'
         ).then(() => {
            escrever_escolha(b_fugirCafeteria, b_zeladores)
            zeladores()
            estadoAssassino = 'fuga'
         })
      } else {
         escrever_dialogo(
            '$ se aproxima cautelosamente de & e tenta atingi-la com uma bandeja do refeitório, mas não causa nenhum efeito. Ela se enfurece, virando-se e desferindo golpes de punhal em seu corpo. $ cai no chão, sendo esfaqueado repetidamente até a morte.'
         )
            .then(() => audioMorte())
            .then(() => escrever_escolha(b_continuarParaMorte))
            .then(() => secondEnd())
      }
   }
}

function fugirCafeteria() {
   document.querySelector('#fugirCafeteria').onclick = () => {
      visual.innerHTML = ''
      escrever_dialogo(
         '$ imediatamente sai correndo para fora da escola.'
      )
         .then(() => audioFuga())
         .then(() =>
            escrever_escolha(
               `<button id='continuarParaO'> continuar </button>`
            )
         )
         .then(() => {
            if (estadoAssassino === 'ferido') {
               thirdEnd()
            } else
               document.querySelector('#continuarParaO').onclick =
                  goodEnding
         })
   }
}

function zeladores() {
   document.querySelector('#zelador').onclick = () => {
      if (
         estadoAssassino === 'fuga' ||
         (estadoAssassino === 'ferido' &&
            personagemPrincipal.habilidade !== 'Strenght')
      ) {
         visual.innerHTML = `<img src='../img/jogo-assustador/killerSul_2.jpg' class='cena'>`
         audioAssassino()
         escrever_dialogo(
            'Quando $ entra na sala do zelador, se depara com &, e esse é o último encontro.'
         ).then(() => {
            escrever_escolha(`<button id='lutar'> lutar </button>`)
            document.querySelector('#lutar').onclick = () => {
               escrever_dialogo(
                  '$ enfrenta corajosamente &, mas infelizmente não consegue vencê-lo e acaba sendo morto naquele momento.'
               )
                  .then(() => audioMorte())
                  .then(() => escrever_escolha(b_continuarParaMorte))
                  .then(() => secondEnd())
            }
         })
      } else if (
         estadoAssassino === 'ferido' &&
         personagemPrincipal.habilidade === 'Strenght'
      ) {
         visual.innerHTML = `<img src='../img/jogo-assustador/killerSul_2.jpg' class='cena'>`
         audioAssassino()
         escrever_dialogo(
            'Quando $ entra na sala do zelador, se depara com &, e esse é o último encontro.'
         ).then(() => {
            escrever_escolha(`<button id='lutar'> lutar </button>`)
            document.querySelector('#lutar').onclick = () => {
               escrever_dialogo(
                  '$ enfrenta a mulher ferida em combate, que não consegue lutar por muito tempo e acaba sendo nocauteado(a).'
               )
                  .then(() =>
                     escrever_escolha(
                        b_fugirCafeteria,
                        `<button id='policia'> Ligar para a policia </button>`,
                        `<button id='matar'> Matar </button>`
                     )
                  )
                  .then(() => checarVivoOuMorto())
                  .then(() => fugirCafeteria())
            }
         })
      } else {
         escrever_dialogo(
            'Ao adentrar na sala do zelador, $ depara-se com uma variedade de ferramentas... até que é surpreendido(a) por &.'
         )
            .then(() => abrindoPorta())
            .then(() => escrever_escolha(b_continuarParaMorte))
            .then(() => secondEnd())
      }
   }
}

function checarVivoOuMorto() {
   document.querySelector('#policia').onclick = () => {
      escrever_dialogo(
         '$ rapidamente liga para a polícia. Depois de um tempo, as autoridades chegam à escola e & é capturado(a) e preso(a).'
      ).then(() => {
         escrever_escolha(`<button id='true'> continuar </button>`)
         document.querySelector('#true').onclick = trueEnding
      })
   }
   document.querySelector('#matar').onclick = () => {
      escrever_dialogo(
         '$ se aproxima do corpo inconsciente de & e, movido(a) pela raiva, decide estrangulá-lo(a) até a morte. Após cometer o ato, $ foge do local, deixando para trás os rastros de sua vingança.'
      ).then(() => {
         escrever_escolha(
            `<button id='triumphant'> continuar </button>`
         )
         document.querySelector('#triumphant').onclick =
            triumphantEnding
      })
   }
}

import { b_piscina, b_vestiario } from './escolhas.js'
import { piscina } from './dialogos.js'
function leste() {
   escrever_dialogo(lesteInicio)
      .then(() => escrever_escolha(b_piscina))
      .then(() => escolha_piscina())
}
function escolha_piscina() {
   document.querySelector('#piscina').onclick = () => {
      escrever_dialogo(piscina)
         .then(() => escrever_escolha(b_vestiario))
         .then(() => vestiario())
   }
}

import { b_dialogar, b_fugir } from './escolhas.js'

function vestiario() {
   document.querySelector('#vestiario').onclick = () => {
      escrever_dialogo(
         '$ entra no vestiario e encontra roupas e o pertence dos seus colegas todos jogados, a sala ainda está muito umida e encharcada.'
      )
         .then(() =>
            escrever_escolha(
               `<button id='continuarVest'> continuar </button>`
            )
         )
         .then(
            () =>
               (document.querySelector('#continuarVest').onclick =
                  () => {
                     escrever_dialogo(
                        '$ caminha pela sala, observando o caos que estava naquele local. $ Avista um diario no chão e consegue ler poucas páginas, nele está o relato de um possivel "fantasma" dentro daquela ala.. $ termina de ler os relatos e se encontra em choque pois nunca havia ouvido falar sobre isso. Ele ouve uma respiração vindo das suas costas.'
                     )
                        .then(() =>
                           escrever_escolha(
                              `<button id='continuarVest'> continuar.. </button>`
                           )
                        )
                        .then(
                           () =>
                              (document.querySelector(
                                 '#continuarVest'
                              ).onclick = () => {
                                 escrever_CenaNome('2. Intruso')
                                 escrever_dialogo(
                                    '$ tenta olhar para o reflexo das poças que havia no chão e fica paralisado no mesmo instante que vê a criatura.'
                                 ).then(() => {
                                    escrever_escolha(
                                       b_dialogar,
                                       b_fugir
                                    )
                                    dialogo()
                                    fugir()
                                 })
                                 audioAssassino()
                                 visual.innerHTML = `<img src="../img/jogo-assustador/killerLeste.png" class='cena' alt="">`
                              })
                        )
                  })
         )
   }
}

import { jogo } from './dialogos.js'
import { b_no, b_yes } from './escolhas.js'
function dialogo() {
   document.querySelector('#dialogo').onclick = () => {
      escrever_dialogo(jogo)
         .then(() => escrever_escolha(b_no, b_yes))
         .then(() => checarJogo())
   }
}

function checarJogo() {
   document.querySelector('#no').onclick = () => {
      escrever_dialogo(
         '$ decide não aceitar a proposta da criatura. Péssima decisão. $ é arrastada até a piscina, sendo afogada pelo fantasma.'
      )
         .then(() => audioAfogamento())
         .then(() => escrever_escolha(b_continuarParaMorte))
         .then(() => secondEnd())
   }

   document.querySelector('#yes').onclick = Jogo
}

import { regras } from './dialogos.js'
import { b_fugirDoVestiario, b_esconder } from './escolhas.js'

function Jogo() {
   escrever_dialogo(regras)
      .then(() => escrever_escolha(b_fugirDoVestiario, b_esconder))
      .then(() => {
         document.querySelector('#fugirDoVestiario').onclick = () => {
            escrever_dialogo(
               'O fantasma começa a contar. $ aproveita sua distração e sai correndo para fora da escola.'
            )
               .then(() => audioFuga())
               .then(() =>
                  escrever_escolha(
                     `<button id='good'> continuar </button>`
                  )
               )
               .then(() => {
                  document.querySelector('#good').onclick = realEnding
               })
         }
         document.querySelector('#esconder').onclick = () => {
            escrever_dialogo('escolha o armario que irá se esconder!')
               .then(() =>
                  escrever_escolha(
                     `<input type="text" name="" id="">`,
                     `<button id='fool'> esconder-se </button>`
                  )
               )
               .then(() => {
                  document.querySelector('#fool').onclick = foolEnding
               })
         }
      })
}

function fugir() {
   document.querySelector('#correr').onclick = () => {
      visual.innerHTML = `<img src="../img/jogo-assustador/killerLeste_2.png" class='cena' alt="">`
      escrever_dialogo(
         '$ tenta correr desesperadamente em busca da saída até ser pega pelo fantasma, sendo arrastada pelo vestiario enquanto é estrangulada.'
      )
         .then(() => audioAssassino())
         .then(() => escrever_escolha(b_continuarParaMorte))
         .then(() => secondEnd())
   }
}

function lolEnding() {
   const audioEnding = new Audio('../audio/lolEnding.mp3')
   audioEnding.play()
}

function firstEnding() {
   document.querySelector('#forgotEnding').onclick = () => {
      if (personagemPrincipal.hasChosen === 'telefonar') {
         visual.innerHTML = `<h1> BLAME ENDING </h1>`
         escrever_CenaNome('-2. Culpado')
         escrever_dialogo(
            '$ é acordado pela sua mãe, ela aparenta estar desesperada. Algo terrivel aconteceu. Seu melhor amigo foi brutalmente assassinado na escola @ ontem a noite. A policia deseja que $ preste seu depoimento.'
         ).then(() => {
            escrever_escolha(`<button id='fim'> F I M </button>`)
            document.querySelector('#fim').onclick = () =>
               location.reload()
         })
      } else {
         lolEnding()
         visual.innerHTML = `<h1> BORING ENDING </h1>`
         escrever_CenaNome('-1. Preguiçoso')
         escrever_escolha(`<button id='fim'> F I M </button>`)
         document.querySelector('#fim').onclick = () =>
            location.reload()
      }
   }
}

function secondEnd() {
   document.querySelector('#paraMorte').onclick = () => {
      escrever_CenaNome('0. Morto')
      morte()
      visual.innerHTML = `<h1> BAD ENDING </h1>`
      if (personagemPrincipal.hasChosen === 'telefonar') {
         escrever_dialogo(
            'Após um tempo, seu amigo encontra seu corpo dentro da escola. Ele imediatamente aciona a policia. Todos lamentam sua morte e não entendem o que $ estava fazendo ali.'
         ).then(() => {
            escrever_escolha(`<button id='fim'> F I M </button>`)
            document.querySelector('#fim').onclick = () =>
               location.reload()
         })
      } else if (personagemPrincipal.hasChosen === 'bilhete') {
         escrever_dialogo(
            'Após um tempo, a policia chega no local após o chamado de sua mãe e encontra seu corpo. Sua familia lamenta sua morte. Seus amigos se perguntam o que fez $ ir ate lá e o que lhe matou.'
         ).then(() => {
            escrever_escolha(`<button id='fim'> F I M </button>`)
            document.querySelector('#fim').onclick = () =>
               location.reload()
         })
      } else {
         escrever_dialogo(
            'Após um tempo, a policia volta até a cena do crime, porém seu corpo não está mais lá. Ninguem sabe o que aconteceu.'
         ).then(() => {
            escrever_escolha(`<button id='fim'> F I M </button>`)
            document.querySelector('#fim').onclick = () =>
               location.reload()
         })
      }
   }
}

function thirdEnd() {
   document.querySelector('#continuarToW').onclick = () => {
      escrever_dialogo(
         '$ consegue escapar da escola e denuncia o assassino à polícia. Mas quando eles chegam, o assassino já fugiu.'
      )
      escrever_escolha(`<button id='thirdEnd'> continuar </button>`)
      document.querySelector('#thirdEnd').onclick = () => {
         escrever_dialogo(
            'Ao acordar de manhã, $ percebe algo estranho: a casa está extremamente silenciosa.'
         )
         escrever_escolha(
            `<button id='thirdEnd'> continuar </button>`
         )
         escrever_CenaNome('?.')
         document.querySelector('#thirdEnd').onclick = () => {
            escrever_CenaNome('-3. Tragedia')
            visual.innerHTML = `<h1> TRAGIC ENDING </h1>`
            escrever_dialogo(
               'Ao começar a caminhar pela casa, $ percebe a terrível verdade: seus pais foram assassinados durante a noite enquanto dormiam.'
            )
            escrever_escolha(`<button id='fim'> F I M </button>`)
            document.querySelector('#fim').onclick = () =>
               location.reload()
         }
      }
   }
}

function foolEnding() {
   escrever_dialogo(
      '$ procura o armario para se esconder, porém percebe que todos os armarios são pequenos e uma pessoa com certeza não pode se esconder ali. $ foi enganado pelo espirito, a contagem se encerra e ele é atacado.'
   )
      .then(() =>
         escrever_escolha(
            `<button id='continuar'> continuar </button>`
         )
      )
      .then(
         () =>
            (document.querySelector('#continuar').onclick = () => {
               escrever_CenaNome('-4. Bobo')
               visual.innerHTML = `<h1> FOOL ENDING </h1>`
               escrever_dialogo(
                  'Seu corpo nunca foi encontrado.'
               ).then(() => {
                  escrever_escolha(
                     `<button id='fim'> F I M </button>`
                  )
                  document.querySelector('#fim').onclick = () =>
                     location.reload()
               })
            })
      )
}

function realEnding() {
   escrever_CenaNome('4. Esperto')
   visual.innerHTML = `<h1> REAL ENDING </h1>`
   escrever_dialogo(
      '$ consegue escapar da escola e do espirito maligno. Ele decide guardar segredo sobre o que aconteceu pois sabe que ninguem irá acreditar.'
   ).then(() => {
      escrever_escolha(`<button id='fim'> F I M </button>`)
      document.querySelector('#fim').onclick = () => location.reload()
   })
}

function goodEnding() {
   escrever_CenaNome('1. Sobrevivente')
   visual.innerHTML = `<h1> GOOD ENDING </h1>`
   escrever_dialogo(
      '$ consegue escapar da escola e denuncia o assassino à polícia. Mas quando eles chegam, o assassino já fugiu. '
   ).then(() => {
      escrever_escolha(`<button id='fim'> F I M </button>`)
      document.querySelector('#fim').onclick = () => location.reload()
   })
}

function trueEnding() {
   escrever_CenaNome('2. Heroi')
   visual.innerHTML = `<h1> TRUE ENDING </h1>`
   escrever_dialogo(
      '$ conseguiu derrotar o assassino e escapar com vida.Sua coragem e determinação serão sempre lembradas e celebradas por toda a cidade.'
   ).then(() => {
      escrever_escolha(`<button id='fim'> F I M </button>`)
      document.querySelector('#fim').onclick = () => location.reload()
   })
}

function triumphantEnding() {
   escrever_CenaNome('3. Vingança')
   visual.innerHTML = `<h1> TRIUMPHANT ENDING </h1>`
   escrever_dialogo(
      '$ consegue derrotar e matar &. No entanto, ao fazer isso, $ percebe o peso da violência que carrega consigo. Agora, terá que lidar com as consequências de se tornar também um assassino, carregando essa culpa pelo resto de sua vida.'
   ).then(() => {
      escrever_escolha(`<button id='fim'> F I M </button>`)
      document.querySelector('#fim').onclick = () => location.reload()
   })
}
