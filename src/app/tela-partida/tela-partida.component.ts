import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-tela-partida',
  templateUrl: './tela-partida.component.html',
  styleUrl: './tela-partida.component.css'
})
export class TelaPartidaComponent {
  @ViewChild('myCanvas', { static: true }) myCanvas!: ElementRef;
  @ViewChild('canvasOponente', { static: true }) canvasOponente!: ElementRef;

  // private webSocket!: WebSocket;

  somPopupWin: HTMLAudioElement;
  somPopupLoser: HTMLAudioElement;
  somEmoji: HTMLAudioElement;
  somExplosao: HTMLAudioElement;
  somFundo: HTMLAudioElement;

  openShadow = false;
  popup = '';

  nTilesX: any = 10;
  // Número de linhas
  nTilesY: any = 10;

  // Tamanho do navio
  shipSize: any = 3;

  // tamanho Tile
  sizeTiles: any = 40;

  sizeWTabuleiro: any;

  imagens: any = [];

  imagemMina: any;

  imagemXNavio: any = new Image();
  imagemMinaExplodida: any = new Image();
  imagemExplodeAgua: any = new Image();

  // espaço navios
  sizeSpaceShip: any = 10 * (this.sizeTiles + 1);
  tabuleiroOp: any[] = [];
  myTabuleiro: any[] = [];

  navios: any[];

  // meAutoAcertei: boolean;


  constructor(private renderer: Renderer2) {
    this.somEmoji = new Audio();
    this.somPopupWin = new Audio();
    this.somPopupLoser = new Audio();
    this.somExplosao = new Audio();
    this.somFundo = new Audio();
    this.somFundo.src = "../../assets/audios/somFundoPartida.mp3";
    this.somPopupWin.src = "../../assets/audios/somWin.mp3";
    this.somPopupLoser.src = "../../assets/audios/somLoser.mp3";
    // Crio um webSocket
    // this.webSocket = new WebSocket('ws://localhost:8080/game');

    // Adiciono o evento que vai ficar ouvindo esse webSocket
    // this.webSocket.onmessage = (event) => {
    //   console.log(JSON.parse(event.data))
    // };

    this.navios = [
      {
        "tiles": [
          {
            "i": 10,
            "j": 2
          },
          {
            "i": 11,
            "j": 2
          },
          {
            "i": 12,
            "j": 2
          },
          {
            "i": 13,
            "j": 2
          }
        ],
        "tamanho": 4,
        "cabeca": {
          "i": 10,
          "j": 2
        },
        "meio": {
          "i": 12,
          "j": 2
        },
        "cauda": {
          "i": 13,
          "j": 2
        },
        "selecionado": false,
        "horizontal": true,
        "angulo": 0,
        "tipo": 0
      },
      {
        "tiles": [
          {
            "i": 12,
            "j": 0
          },
          {
            "i": 13,
            "j": 0
          },
          {
            "i": 14,
            "j": 0
          }
        ],
        "tamanho": 3,
        "cabeca": {
          "i": 12,
          "j": 0
        },
        "meio": {
          "i": 13,
          "j": 0
        },
        "cauda": {
          "i": 14,
          "j": 0
        },
        "selecionado": false,
        "horizontal": true,
        "angulo": 0,
        "tipo": 0
      },
      {
        "tiles": [
          {
            "i": 13,
            "j": 8
          },
          {
            "i": 14,
            "j": 8
          },
          {
            "i": 15,
            "j": 8
          }
        ],
        "tamanho": 3,
        "cabeca": {
          "i": 13,
          "j": 8
        },
        "meio": {
          "i": 14,
          "j": 8
        },
        "cauda": {
          "i": 15,
          "j": 8
        },
        "selecionado": false,
        "horizontal": true,
        "angulo": 0,
        "tipo": 0
      },
      {
        "tiles": [
          {
            "i": 17,
            "j": 1
          },
          {
            "i": 18,
            "j": 1
          },
          {
            "i": 19,
            "j": 1
          }
        ],
        "tamanho": 3,
        "cabeca": {
          "i": 17,
          "j": 1
        },
        "meio": {
          "i": 18,
          "j": 1
        },
        "cauda": {
          "i": 19,
          "j": 1
        },
        "selecionado": false,
        "horizontal": true,
        "angulo": 0,
        "tipo": 0
      },
      {
        "tiles": [
          {
            "i": 18,
            "j": 4
          },
          {
            "i": 19,
            "j": 4
          }
        ],
        "tamanho": 2,
        "cabeca": {
          "i": 18,
          "j": 4
        },
        "meio": {
          "i": 19,
          "j": 4
        },
        "cauda": {
          "i": 19,
          "j": 4
        },
        "selecionado": false,
        "horizontal": true,
        "angulo": 0,
        "tipo": 0
      },
      {
        "tiles": [
          {
            "i": 15,
            "j": 5
          },
          {
            "i": 16,
            "j": 5
          }
        ],
        "tamanho": 2,
        "cabeca": {
          "i": 15,
          "j": 5
        },
        "meio": {
          "i": 16,
          "j": 5
        },
        "cauda": {
          "i": 16,
          "j": 5
        },
        "selecionado": false,
        "horizontal": true,
        "angulo": 0,
        "tipo": 0
      },
      {
        "tiles": [
          {
            "i": 15,
            "j": 3
          },
          {
            "i": 16,
            "j": 3
          }
        ],
        "tamanho": 2,
        "cabeca": {
          "i": 15,
          "j": 3
        },
        "meio": {
          "i": 16,
          "j": 3
        },
        "cauda": {
          "i": 16,
          "j": 3
        },
        "selecionado": false,
        "horizontal": true,
        "angulo": 0,
        "tipo": 0
      },
      {
        "tiles": [
          {
            "i": 18,
            "j": 9
          }
        ],
        "tamanho": 1,
        "cabeca": {
          "i": 18,
          "j": 9
        },
        "meio": {
          "i": 18,
          "j": 9
        },
        "cauda": {
          "i": 18,
          "j": 9
        },
        "selecionado": false,
        "horizontal": true,
        "angulo": 0,
        "tipo": 0
      },
      {
        "tiles": [
          {
            "i": 19,
            "j": 7
          }
        ],
        "tamanho": 1,
        "cabeca": {
          "i": 19,
          "j": 7
        },
        "meio": {
          "i": 19,
          "j": 7
        },
        "cauda": {
          "i": 19,
          "j": 7
        },
        "selecionado": false,
        "horizontal": true,
        "angulo": 0,
        "tipo": 0
      },
      {
        "tiles": [
          {
            "i": 10,
            "j": 7
          }
        ],
        "tamanho": 1,
        "cabeca": {
          "i": 10,
          "j": 7
        },
        "meio": {
          "i": 10,
          "j": 7
        },
        "cauda": {
          "i": 10,
          "j": 7
        },
        "selecionado": false,
        "horizontal": true,
        "angulo": 0,
        "tipo": 1
      },
      {
        "tiles": [
          {
            "i": 10,
            "j": 0
          }
        ],
        "tamanho": 1,
        "cabeca": {
          "i": 10,
          "j": 0
        },
        "meio": {
          "i": 10,
          "j": 0
        },
        "cauda": {
          "i": 10,
          "j": 0
        },
        "selecionado": false,
        "horizontal": true,
        "angulo": 0,
        "tipo": 1
      },
      {
        "tiles": [
          {
            "i": 10,
            "j": 5
          }
        ],
        "tamanho": 1,
        "cabeca": {
          "i": 10,
          "j": 5
        },
        "meio": {
          "i": 10,
          "j": 5
        },
        "cauda": {
          "i": 10,
          "j": 5
        },
        "selecionado": false,
        "horizontal": true,
        "angulo": 0,
        "tipo": 1
      }
    ]

  }



  ngOnInit(): void {
    this.fnSomFundo();

    this.sizeWTabuleiro = this.myCanvas.nativeElement.width;

    let numeroDivid10 = Math.floor(this.sizeWTabuleiro / 10) //pega o tamanho do tabuleiro e divide por 10 para obter 2 casas (511/10=51)
    let numSmeUltDig = numeroDivid10.toString().slice(0, -1); //tira o ultimo digito (51 -> 5)
    this.sizeTiles = parseInt(numSmeUltDig) * 10;             //multiplica por 10 (50 * 10 = 50)
    // console.log(this.sizeWTabuleiro, (this.sizeWTabuleiro*2), Math.floor(this.sizeWTabuleiro / 10), this.sizeTiles);


    //PREENCHENDO O TABULEIRO DO OPONENTE
    for (let i = 0; i < this.nTilesX; i++) {
      this.tabuleiroOp.push([])
      for (let j = 0; j < this.nTilesY; j++) {
        this.tabuleiroOp[i].push(0);

      }
    }

    //PREENCHENDO O MEU TABULEIRO 
    for (let i = 0; i < this.nTilesX; i++) {
      this.myTabuleiro.push([])
      for (let j = 0; j < this.nTilesY; j++) {
        this.myTabuleiro[i].push(0);

      }
    }

    //COLOCANDO NAVIOS NO TABULEIRO DO OPONENTE
    this.navios.forEach(navio => {

      navio.tiles.forEach((tile: { i: number; j: number; }) => {
        if (navio.tipo === 0)
          this.tabuleiroOp[tile.j][tile.i - 10] = 1
        else
          this.tabuleiroOp[tile.j][tile.i - 10] = 5

      })
    })

    //COLOCANDO NAVIOS NO MEU TABULEIRO
    this.navios.forEach(navio => {

      navio.tiles.forEach((tile: { i: number; j: number; }) => {
        if (navio.tipo === 0)
          this.myTabuleiro[tile.j][tile.i - 10] = 1
        else
          this.myTabuleiro[tile.j][tile.i - 10] = 5

      })
    })

    console.log(this.myTabuleiro)

    const myCvs: HTMLCanvasElement = this.myCanvas.nativeElement;
    const myCtx = myCvs.getContext('2d');

    const cvsOponente: HTMLCanvasElement = this.canvasOponente.nativeElement;
    const ctxOponente = cvsOponente.getContext('2d');

    if (myCtx) {
      for (let i = 0; i <= 270; i += 90) {
        var img = new Image();
        img.src = `../../assets/img/barcom${i}.png`
        this.imagens[i] = img
        // console.log(i)
      }

      this.imagens.forEach((img: any) => {
        img.onload = () => {
          myCtx.drawImage(img, 0, 0);
          //this.fnDraw(ctx)
        }
      });


      // carregando a imagem das minas
      let imgMina = new Image();
      imgMina.src = '../../assets/img/mina.png';
      this.imagemMina = imgMina

      this.imagemMina.onload = () => {
        myCtx.drawImage(imgMina, 0, 0);
      }
      //ctx.clearRect(0, 0, 1021, 511);

      this.fnDraw(myCtx);
    }

    if (ctxOponente) {

      // carregando a imagem x navio
      this.imagemMinaExplodida.src = "../../assets/images/img-tela-partida/minaExplodida.png";

      this.imagemMinaExplodida.onload = () => {
        ctxOponente.drawImage(this.imagemMinaExplodida, 0, 0);
      }

      // carregando a imagem x navio
      this.imagemXNavio.src = "../../assets/images/img-tela-partida/x-navio.png";

      this.imagemXNavio.onload = () => {
        ctxOponente.drawImage(this.imagemXNavio, 0, 0);
      }

      this.imagemXNavio.onerror = (err: any) => {
        console.error('Erro ao carregar a imagem', err);
      };

      // carregando a imagem explode agua
      this.imagemExplodeAgua.src = "../../assets/images/img-tela-partida/explode-agua.png";

      this.imagemExplodeAgua.onload = () => {
        ctxOponente.drawImage(this.imagemExplodeAgua, 0, 0);
      }

      this.fnDrawOponente(ctxOponente);

    }
  }

  fnDraw(ctx: CanvasRenderingContext2D) {
    // ctx.clearRect(0, 0, 1021, 511);
    ctx.clearRect(0, 0, (this.sizeWTabuleiro * 2), this.sizeWTabuleiro);
    ctx.fillStyle = "#03a5fc50";
    ctx.strokeStyle = "#00000050"

    // Desenha os tiles do tabuleiro
    for (let i = 0; i < this.nTilesX; i++) {
      for (let j = 0; j < this.nTilesY; j++) {
        let x = (i * (this.sizeTiles + 1)) + 1;
        let y = (j * (this.sizeTiles + 1)) + 1;

        // console.log(i, j)
        if (this.myTabuleiro[j][i] == 3 || this.myTabuleiro[j][i] == 6) {
          ctx.fillStyle = "#00000080";


        } else if (this.myTabuleiro[j][i] == 2) {
          ctx.fillStyle = "#ff000080";

        } else {
          ctx.fillStyle = "#03a5fc50";


        }
        ctx.fillRect(x, y, this.sizeTiles, this.sizeTiles);
        ctx.strokeRect(x, y, this.sizeTiles, this.sizeTiles);

      }
    }

    this.navios.forEach(navio => {
      let contador = 0

      navio.tiles.forEach((tile: { i: number; j: number; }) => {

        // let x = ((tile.i - 10) * 41) + 1; //era 51
        // let y = (tile.j * 41) + 1;      //era 51

        let x = ((tile.i - 10) * Math.floor(this.sizeWTabuleiro / 10)) + 1; //era 51
        let y = (tile.j * Math.floor(this.sizeWTabuleiro / 10)) + 1;      //era 51
        // ctx.fillRect(x, y, 50, 50);

        if (navio.tipo === 1) { //é uma mina
          // let img = this.imagemMina;
          ctx.drawImage(this.imagemMina, x, y, this.sizeTiles + 1, this.sizeTiles + 1); // Desenha a imagem do tile no canvas

        } else {

          let img = this.imagens[navio.angulo]

          if (navio.horizontal) {
            ctx.drawImage(img, contador * img.width / navio.tiles.length, 0, img.width / navio.tiles.length, img.height, x, y, this.sizeTiles + 1, this.sizeTiles + 1); // Desenha a imagem do tile no canvas

          }
          else {
            ctx.drawImage(img, 0, contador * img.height / navio.tiles.length, img.width, img.height / navio.tiles.length, x, y, this.sizeTiles + 1, this.sizeTiles + 1); // Desenha a imagem do tile no canvas
          }

          contador += 1
        }
      });


    });


    // Desenha os tiles do tabuleiro
    for (let i = 0; i < this.nTilesX; i++) {
      for (let j = 0; j < this.nTilesY; j++) {
        let x = (i * (this.sizeTiles + 1)) + 1;
        let y = (j * (this.sizeTiles + 1)) + 1;

        // console.log(i, j)
        if (this.myTabuleiro[j][i] == 3) {
          ctx.drawImage(this.imagemXNavio, x, y, this.sizeTiles + 1, this.sizeTiles + 1); // Desenha a imagem do tile no canvas
        } else if (this.myTabuleiro[j][i] == 6) {
          ctx.drawImage(this.imagemMinaExplodida, x, y, this.sizeTiles + 1, this.sizeTiles + 1); // Desenha a imagem do tile no canvas
        }

      }
    }

    requestAnimationFrame(() => {
      this.fnDraw(ctx)
    });

  }


  fnDrawOponente(ctx: CanvasRenderingContext2D) {

    ctx.clearRect(0, 0, (this.sizeWTabuleiro * 2), this.sizeWTabuleiro);
    ctx.fillStyle = "#FF000050";
    ctx.strokeStyle = "#00000050"

    // Desenha as imagens do tabuleiro
    for (let i = 0; i < this.nTilesX; i++) {
      for (let j = 0; j < this.nTilesY; j++) {
        let x = (i * (this.sizeTiles + 1)) + 1;
        let y = (j * (this.sizeTiles + 1)) + 1;

        // console.log(i, j)

        if (this.tabuleiroOp[j][i] == 3) {
          ctx.fillStyle = "#00000090";
          ctx.drawImage(this.imagemXNavio, x, y, this.sizeTiles + 1, this.sizeTiles + 1); // Desenha a imagem do tile no canvas

        } else if (this.tabuleiroOp[j][i] == 2) {
          ctx.fillStyle = "#03a5fc00";
          ctx.fillRect(x, y, this.sizeTiles + 1, this.sizeTiles + 1);
          ctx.drawImage(this.imagemExplodeAgua, x, y, this.sizeTiles + 1, this.sizeTiles + 1); // Desenha a imagem do tile no canvas
        } else if (this.tabuleiroOp[j][i] == 6) {
          ctx.fillStyle = "#00000010";

          ctx.drawImage(this.imagemMinaExplodida, x, y, this.sizeTiles + 1, this.sizeTiles + 1); // Desenha a imagem do tile no canvas

        } else {
          ctx.fillStyle = "#FF000050";
        }

        ctx.fillRect(x, y, this.sizeTiles, this.sizeTiles);
        ctx.strokeRect(x, y, this.sizeTiles, this.sizeTiles);


      }
    }

    requestAnimationFrame(() => {
      this.fnDrawOponente(ctx)
    });

  }

  fnSomExplosao(tipo: any){
    this.somExplosao.volume = 0.3;
    if(tipo === "agua"){
      this.somExplosao.src = "../../assets/audios/somExplosaoAgua.mp3"
      this.somExplosao.play().catch((error) => {
        // console.log('Error attempting to play the video:', error);
      });
    }else if(tipo === "barco"){
      this.somExplosao.src = "../../assets/audios/somExplosaoBarco.mp3"
      this.somExplosao.play().catch((error) => {
        // console.log('Error attempting to play the video:', error);
      });
    }else if(tipo === "mina"){
      this.somExplosao.src = "../../assets/audios/somExplosaoMina.mp3"
      this.somExplosao.play().catch((error) => {
        // console.log('Error attempting to play the video:', error);
      });
    }
  }

  fnSomFundo() {
    //https://www.forhub.io/download.php baixar sons piratas
    this.somFundo.volume = 1;
    this.somFundo.play().catch((error) => {
      // console.log('Error attempting to play the video:', error);
    });
  }


  //quando eu clico no tabuleiro do oponente
  fnCanvasOponenteClick(e: any) {
    // this.openShadow = true;
    if (this.isRunning === false) {
      const rect = this.canvasOponente.nativeElement.getBoundingClientRect();

      // Calcula a posição do clique em relação ao canvas
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Calcula a posição do clique em relação aos tiles do tabuleiro
      const i = Math.floor((mouseX / this.sizeWTabuleiro) * this.nTilesX);
      const j = Math.floor((mouseY / this.sizeWTabuleiro) * this.nTilesY);


      /*
      0 -> nunca clicou e não tem navio
      1 -> nunca clicou e tem navio
      2 -> clicou e não tem nada
      3 -> clicou e tem navio
      5 -> clicou em uma mina
      6 -> clicou e tem uma mina explodida
   
      */
      if (this.tabuleiroOp[j][i] == 1) {
        this.fnSomExplosao("barco");

        this.tabuleiroOp[j][i] = 3;

        if (!this.checkForOnes(this.tabuleiroOp)) { //checando se no tabuleiro do oponente ainda tem navio não destruido
          // alert("você venceu!")
          this.fnFim("win");
        }

      } else if (this.tabuleiroOp[j][i] == 5) { //se for é pq é uma mina, se for uma mina, tenho verificar se quando eu cliquei eu perdi vida e perdi, ou eu perdi vidae ele ganhou
        this.tabuleiroOp[j][i] = 6; //tem mina e foi explodida
        // this.meAutoAcertei = true;
        this.fnSomExplosao("mina");

        this.randomlyPlaceTwo(true, j, i);

      } else if (this.tabuleiroOp[j][i] == 0) {
        // alert('Você errou!');
        this.fnSomExplosao("agua");
        this.tabuleiroOp[j][i] = 2;

        //apos o meu click eu envio uma mensagem para o outro jogador
        this.fnSendMessageWS(); //coloquei aqui pois só passa a vez para o outro jogador, quando eu errar

      }
      else {
        this.showNotification("Ops...", "escolha outra posição, essa ja foi escolhida", "error");
      }

    }

  }

  fnFim(result: any) {
    this.fnAtualizaValores();

    this.fnPopUp(result);
  }

  fnPopUp(popname: any) {
    this.somFundo.pause();
    this.openShadow = true;
    this.popup = popname; //win ou loser[

    if (popname === "win") {
      this.somPopupWin.volume = 0.8;//this.sliderValueSound / 100;
      this.somPopupWin.play().catch((error) => {
        // console.log('Error attempting to play the video:', error);
      });
    } else {
      this.somPopupLoser.volume = 0.8;//this.sliderValueSound / 100;
      this.somPopupLoser.play().catch((error) => {
        // console.log('Error attempting to play the video:', error);
      });
    }
  }

  fnAtualizaValores() {
    //faz a inserção de moedas na tabela usuario
    //faz a inserção de trofeu na tabela usuario
    //faz a inserção de xp na tabela usuario
  }

  fnSendMessageWS() {
    this.startWebSocket();
    //envio uma mensagem
    let messageObject = {
      usuarioId: "1",//usuarioLogadoId,
      tabuleiro: this.tabuleiroOp,
      navios: this.navios
    };


    //envio uma mensagem
    // this.webSocket.send(JSON.stringify(messageObject))
  }


  isRunning = false; // Variável para controlar o estado dos botões
  private subscription: Subscription | null = null; // Variável para armazenar a assinatura do Observable

  // Método para simular um WebSocket usando um Observable
  simulateWebSocket(): Observable<any> {
    return new Observable<any>(observer => {
      // Configura um timeout que emite uma mensagem após 1 segundo
      const timeoutId = setTimeout(() => {
        const data = { message: 'Hello from simulated WebSocket', timestamp: new Date() };
        // Envia a mensagem para os observadores
        observer.next(data);
        // Completa o Observable após enviar a mensagem
        observer.complete();
      }, 1000);

      // Limpa o timeout quando o Observable for cancelado
      return () => {
        clearTimeout(timeoutId);
      };
    });
  }


  // Método para iniciar o WebSocket simulado
  startWebSocket(): void {
    // Define o estado como "executando" para desabilitar o botão de start
    this.isRunning = true;

    // Cancela a assinatura anterior, se houver
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    // Inicia uma nova assinatura para o Observable do WebSocket simulado
    this.subscription = this.simulateWebSocket().subscribe({
      next: (message) => {
        // Imprime a mensagem recebida no console
        console.log(message);
        this.randomlyPlaceTwo();
      },
      complete: () => {
        // Define o estado como "não executando" para habilitar os botões novamente
        this.isRunning = false;
        console.log("sua vez", this.isRunning)

      }
    });
  }

  // Método para parar o WebSocket simulado
  stopWebSocket(): void {
    // Define o estado como "não executando" para habilitar o botão de start
    this.isRunning = false;

    // Cancela a assinatura atual, se houver
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  //função para alterar o meu tabuleiro 

  randomlyPlaceTwo(tiroAutomatico = false, j = 0, i = 0) {
    const row = Math.floor(Math.random() * 10);
    const col = Math.floor(Math.random() * 10);

    if (tiroAutomatico) {
      // this.fnRecebeReacao("../../assets/images/emojis/raiva.png");
      this.myTabuleiro[j][i] = 6;
    } else {

      if (this.myTabuleiro[row][col] === 2 || this.myTabuleiro[row][col] === 3) { // se for 0 ou 1 e ja foram clicaram, eles são 2 e 3, e se  for 2 e 3 é pq eu ja cliquei, então roda a função de novo
        this.randomlyPlaceTwo(); // Se a posição já foi clicada antes, chama a função novamente
      } else {
        if (this.myTabuleiro[row][col] === 1) { //se for 1 (tem navio) 
          this.myTabuleiro[row][col] = 3; // coloca 3 (significa que o navio foi acertado)
          if (!this.checkForOnes(this.myTabuleiro)) { //checando se no tabuleiro ainda tem navio não destruido
            // alert("você perdeu!") //se não houver nenhum navio p/ destrui no seu tabuleiro, vc perdeu
            this.fnFim("loser");
          } else {
            this.fnSendMessageWS(); //se houver navio e foi clicado em cima de um navio (=== 1) o oponente joga dnv
          }
        } else {
          this.myTabuleiro[row][col] = 2; //era 0 e virou 2 (0 não tem nada - 2 clicou no nada)
        }

      }
    }
  }

  checkForOnes(tbl: any): boolean {
    for (let i = 0; i < tbl.length; i++) {
      for (let j = 0; j < tbl[i].length; j++) {
        if (tbl[i][j] === 1) {
          return true; // Se encontrar um 1, retorna true
        }
      }
    }
    return false; // Se não encontrar nenhum 1, retorna false
  }

  // NOTIFICAÇÃO

  private ctnMsg!: HTMLElement | null;

  showNotification(title: string, msg: string, type: string) {
    // Remove any existing notification
    this.removeNotification();

    this.ctnMsg = this.renderer.createElement('div');
    this.renderer.addClass(this.ctnMsg, 'f-notification');
    this.renderer.addClass(this.ctnMsg, `f-notification-${type}`);
    this.renderer.addClass(this.ctnMsg, 'f-show');

    const closeButton = this.renderer.createElement('div');
    this.renderer.addClass(closeButton, 'f-close');
    this.renderer.listen(closeButton, 'click', () => {
      this.removeNotification();
    });

    this.renderer.appendChild(closeButton, this.renderer.createText('×'));
    this.renderer.appendChild(this.ctnMsg, closeButton);

    const titleElement = this.renderer.createElement('h3');
    this.renderer.addClass(titleElement, 'f-notification-title');

    this.renderer.appendChild(titleElement, this.renderer.createText(title));
    this.renderer.appendChild(this.ctnMsg, titleElement);

    const msgElement = this.renderer.createElement('p');
    this.renderer.addClass(msgElement, 'alert-content');

    this.renderer.appendChild(msgElement, this.renderer.createText(msg));
    this.renderer.appendChild(this.ctnMsg, msgElement);

    this.renderer.appendChild(document.body, this.ctnMsg);

    setTimeout(() => {
      this.removeNotification();
    }, 4000);
  }

  removeNotification() {
    if (this.ctnMsg) {
      this.renderer.removeClass(this.ctnMsg, 'f-show-my');
      this.renderer.addClass(this.ctnMsg, 'f-hide-my');
      setTimeout(() => {
        if (this.ctnMsg && this.ctnMsg.parentNode) {
          this.renderer.removeChild(document.body, this.ctnMsg);
          this.ctnMsg = null;
        }
      }, 500);
    }
  }


  private container!: HTMLElement | null;
  private containerOponente!: HTMLElement | null;

  fnEmoji(e: any) {
    (document.querySelector(".container-emoji") as HTMLElement).style.display = "none";

    this.fnEnviaReacao();
    this.addEmoji(e);

    // this.fnPopUp('loser');

  }

  addEmoji(e: any) {
    // Remove any existing notification
    this.removeEmoji();

    let imgSrc = e.currentTarget.src;

    this.fnAddSomEmoji(imgSrc)


    this.container = this.renderer.createElement('div');
    this.renderer.addClass(this.container, 'f-emoji');
    // this.renderer.addClass(this.container, `f-notification-${type}`);
    this.renderer.addClass(this.container, 'f-show-my');


    const imgElement = this.renderer.createElement('img');
    this.renderer.setAttribute(imgElement, "src", imgSrc);

    this.renderer.appendChild(this.container, imgElement);


    this.renderer.appendChild(document.body, this.container);

    setTimeout(() => {
      this.removeEmoji();
    }, 2000);
  }

  fnAddSomEmoji(nomeEmoji: any) {

    //pegando apenas o nome do emoji para chamar a musica
    let lastPart = nomeEmoji.substring(nomeEmoji.lastIndexOf('/') + 1).replace(".png", "");

    this.somEmoji.src = `../../assets/audios/som${lastPart}.mp3`
    this.somEmoji.play().catch((error) => {
      // console.log('Error attempting to play the video:', error);
    });
    console.log(lastPart)
  }

  removeEmoji() {
    if (this.container) {
      this.renderer.removeClass(this.container, 'f-show-my');
      this.renderer.addClass(this.container, 'f-hide-my');

      setTimeout(() => {
        if (this.container && this.container.parentNode) {
          this.renderer.removeChild(document.body, this.container);
          this.container = null;
          (document.querySelector(".container-emoji") as HTMLElement).style.display = "flex";

        }
      }, 500);
    }
  }

  fnEnviaReacao() {
    console.log("enviar reação para o oponetenente");
  }

  fnRecebeReacao(imgSrc: any) {

    this.fnAddSomEmoji(imgSrc);
    this.containerOponente = this.renderer.createElement('div');
    this.renderer.addClass(this.containerOponente, 'f-emoji-oponente');
    // this.renderer.addClass(this.containerOponente, `f-notification-${type}`);
    this.renderer.addClass(this.containerOponente, 'f-show-oponente');


    const imgElement = this.renderer.createElement('img');
    this.renderer.setAttribute(imgElement, "src", imgSrc);

    this.renderer.appendChild(this.containerOponente, imgElement);


    this.renderer.appendChild(document.body, this.containerOponente);

    setTimeout(() => {
      this.removeEmojiOponente();
    }, 2000);
  }

  removeEmojiOponente() {
    if (this.containerOponente) {
      this.renderer.removeClass(this.containerOponente, 'f-show-oponente');
      this.renderer.addClass(this.containerOponente, 'f-hide-oponente');

      setTimeout(() => {
        if (this.containerOponente && this.containerOponente.parentNode) {
          this.renderer.removeChild(document.body, this.containerOponente);
          this.containerOponente = null;
          // (document.querySelector(".container-emoji") as HTMLElement).style.display = "flex";

        }
      }, 500);
    }
  }

}