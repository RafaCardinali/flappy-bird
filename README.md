# Flappy Bird Clone

Este é um clone do popular jogo Flappy Bird, desenvolvido utilizando apenas HTML, CSS e JavaScript, sem a utilização de APIs específicas para jogos. O projeto foi criado em aproximadamente 2 horas e emprega conceitos de programação orientada a objetos em JavaScript.

## Características

- Simples representação do jogo Flappy Bird.
- Desenvolvido utilizando HTML, CSS e JavaScript puro.
- Implementação baseada em programação orientada a objetos.
- Sem dependências externas.

## Como Jogar

1. Abra o arquivo `index.html` em seu navegador.
2. Pressione qualquer tecla do teclado para fazer o pássaro subir.
3. Solte a tecla para fazer o pássaro descer.
4. Evite colidir com as barreiras.
5. Tente alcançar a maior pontuação possível!

## Estrutura do Projeto

O projeto é estruturado da seguinte maneira:

- `index.html`: Arquivo HTML principal.
- `style.css`: Arquivo de estilos CSS para elementos externos do jogo.
- `flappy.css`: Arquivo de estilos CSS específicos para o jogo.
- `main.js`: Arquivo JavaScript contendo a lógica do jogo.

## Desenvolvimento

O jogo foi desenvolvido utilizando conceitos de programação orientada a objetos em JavaScript. As principais classes utilizadas são:

- `createElement`: Função para criar elementos HTML.
- `createBarrier`: Função para criar as barreiras.
- `pairOfBarriers`: Função para criar um par de barreiras (superior e inferior).
- `movingBarriers`: Função para animar as barreiras.
- `handleBird`: Função para controlar o pássaro.
- `handleScore`: Função para gerenciar a pontuação.
- `collision`: Função para detectar colisões.
- `flappyBird`: Função principal que inicializa o jogo.
