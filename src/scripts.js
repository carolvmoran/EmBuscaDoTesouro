const TITLE_SIZE = 48; /* Tamanho do quadrado */
const HELMET_OFFSET =12; /* Deixa a cabeça do Heroi passar do quadrado do TITLE_SIZE */
const GAME_SIZE = TITLE_SIZE * 20; /* Tamanho do quadrado grande do jogo */

const root = document.documentElement;
root.style.setProperty('--tile-size', `${TITLE_SIZE}px`)
root.style.setProperty('--helmet-offset', `${HELMET_OFFSET}px`)
root.style.setProperty('--game-size', `${GAME_SIZE}px`)

function createBoard() {
    const boardElement = document.getElementById('board')
    const elements = [];

    function createElement(options) {
        let { item, top, left } = options;

        const currentElement = { item, currentPosition: { top, left } };
        elements.push(currentElement);

        const htmlElement = document.createElement('div');
        htmlElement.className = item;
        htmlElement.style.top = `${top}px`;
        htmlElement.style.left = `${left}px`;

        boardElement.appendChild(htmlElement)

        function getNewDirection(buttonPressed, position) {
            switch(buttonPressed) {
                case 'ArrowUp':
                    return { top: position.top - TITLE_SIZE, left: position.left };
                case 'ArrowRight':
                    return {  top: position.top, left: position.left + TITLE_SIZE };
                case 'ArrowDown':
                    return { top: position.top + TITLE_SIZE,  left: position.left };
                case 'ArrowLeft':
                    return {  top: position.top, left: position.left - TITLE_SIZE };
                default:
                    return position;
            }
        }

        function validateMoviment(position, conflictItem) {
            return (
                position.left >= 48 &&
                position.left <= 864 &&
                position.top >= 96 &&
                position.top <= 816 &&
                conflictItem?.item !== 'forniture'
            )
        }

        function getMovimentConflict(position, els) {
            const conflictItem = els.find((currentElement) => {
                return (
                    currentElement.currentPosition.top === position.top &&
                    currentElement.currentPosition.left === position.left
                )
            });
            return conflictItem;
        }

        function validateConflicts(currentEl, conflictItem) {
            function finishGame(message) {
                setTimeout(() => {
                    alert(message);
                    location.reload();
                }, 100)
            }
            if(currentEl.item === 'hero') {
                if(
                    conflictItem?.item === 'mini-demo' ||
                    conflictItem?.item === 'trap' 
                ) {
                    finishGame("iii Morreu")
                }
                if(conflictItem?.item === 'chest') {
                    finishGame("vc ganhou!!!")
                }
            }
            if(currentEl.item === 'mini-demon' && conflictItem.item === 'hero') {
                finishGame("vc morreu")
            }
        }

        function move(buttonPressed) {
        
            const newPosition = getNewDirection(buttonPressed, currentElement.currentPosition);

            const conflictItem = getMovimentConflict(newPosition, elements)

            const isValidMoviment = validateMoviment(newPosition, conflictItem)


            if(isValidMoviment) {
                currentElement.currentPosition = newPosition;
                htmlElement.style.top = `${newPosition.top}px`;
                htmlElement.style.left = `${newPosition.left}px`;
                validateConflicts(currentElement, conflictItem)
            }
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
            const direction = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'];
            const randomIndex = Math.floor(Math.random() * direction.length);
            const randomDirection = direction[randomIndex];
            
            enemy.move(randomDirection);
        }, 1000)
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
board.createItem({ item: 'trap', top: TITLE_SIZE * 10, left: TITLE_SIZE * 8});
board.createItem({ item: 'trap', top: TITLE_SIZE * 15, left: TITLE_SIZE * 6});
board.createItem({ item: 'trap', top: TITLE_SIZE * 14, left: TITLE_SIZE * 16});
board.createItem({ item: 'trap', top: TITLE_SIZE * 12, left: TITLE_SIZE * 15});
board.createItem({ item: 'chest', top: TITLE_SIZE * 2, left: TITLE_SIZE * 18});
board.createItem({ item: 'forniture', top: TITLE_SIZE * 17, left: TITLE_SIZE * 2}); /* Escada */
board.createItem({ item: 'forniture', top: TITLE_SIZE * 2, left: TITLE_SIZE * 8}); /* Fornalhas */
board.createItem({ item: 'forniture', top: TITLE_SIZE * 2, left: TITLE_SIZE * 16}); /* Fornalhas */
board.createItem({ item: 'forniture', top: TITLE_SIZE * 2, left: TITLE_SIZE * 3}); /* Fornalhas */

board.createEnemy({top: TITLE_SIZE * 5, left: TITLE_SIZE * 15});
board.createEnemy({top: TITLE_SIZE * 6, left: TITLE_SIZE * 16});
board.createEnemy({top: TITLE_SIZE * 7, left: TITLE_SIZE * 17});
board.createEnemy({top: TITLE_SIZE * 8, left: TITLE_SIZE * 18});
board.createEnemy({top: TITLE_SIZE * 9, left: TITLE_SIZE * 19});
board.createHero({top: TITLE_SIZE * 16, left: TITLE_SIZE * 2});