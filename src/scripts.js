
const TITLE_SIZE = 48; /* Tamanho do quadrado */
const HELMET_OFFSET =12; /* Deixa a cabeça do Heroi passar do quadrado do TITLE_SIZE */
const GAME_SIZE = TITLE_SIZE * 20; /* Tamanho do quadrado grande do jogo */

const root = document.documentElement;
root.style.setProperty('--tile-size', `${TITLE_SIZE}px`)
root.style.setProperty('--helmet-offset', `${HELMET_OFFSET}px`)
root.style.setProperty('--game-size', `${GAME_SIZE}px`)

function createBoard() {
    const boardElement = document.getElementById('board')

    function createElement(options) {
        let { item, top, left } = options;

        const htmlElement = document.createElement('div');
        htmlElement.className = item;
        htmlElement.style.top = `${top}px`;
        htmlElement.style.left = `${left}px`;

        boardElement.appendChild(htmlElement)

        function getNewDirection(buttonPressed) {
            switch(buttonPressed) {
                case 'ArrowUp':
                    return { top: top - TITLE_SIZE, left: left }
                case 'ArrowRight':
                    return {  top: top, left: left + TITLE_SIZE }
                case 'ArrowDown':
                    return { top: top + TITLE_SIZE,  left: left }
                case 'ArrowLeft':
                    return {  top: top, left: left - TITLE_SIZE }
                default:
                    return { top: top, left: left}
            }
        }

        function move(buttonPressed) {
            console.log('move', buttonPressed);
            const newDirection = getNewDirection(buttonPressed);
            top = newDirection.top;
            left = newDirection.left;
            htmlElement.style.top = `${newDirection.top}px`;
            htmlElement.style.left = `${newDirection.left}px`;
        }
        return {
            move: move
        }
    }
    function createItem(options) {
        createElement(options)
    }
    function createHero(options) {
        const hero = createElement({
            item: 'hero',
            top: options.top,
            left: options.left
        });

        document.addEventListener('keydown', (event) => {
            console.log("teclado foi pressionado", event.key)
            hero.move(event.key)
        })
    }
    function createEnemy(options) {
        const enemy = createElement({
            item: 'mini-demon',
            top: options.top,
            left: options.left
        });
        setInterval(() => {

        }, 1000)
        enemy.move();
    }
    return {
        createItem: createItem,
        createHero: createHero,
        createEnemy: createEnemy
    }
}

const board = createBoard();
// item que vai ser renderizado -> hero | mini-demo | chest | trap
// posição x - numero (top)
// posição y - numero (left)
board.createItem({ item: 'trap', top: TITLE_SIZE * 10, left: TITLE_SIZE * 10});
board.createItem({ item: 'chest', top: TITLE_SIZE * 15, left: TITLE_SIZE * 15});

board.createEnemy({top: TITLE_SIZE * 5, left: TITLE_SIZE * 5});
board.createHero({top: TITLE_SIZE * 16, left: TITLE_SIZE * 2});