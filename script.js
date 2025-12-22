// 1. 책 데이터 설정 (이미지가 없으면 공백 가능)
const books = [
    { title: "쇼펜하우어 소품문", author: "아르투어 쇼펜하우어", image: "https://via.placeholder.com/200x300?text=Book1" },
    { title: "사탄탱고", author: "크라스나호르카이 라슬로", image: "" },
    { title: "안톤 체호프 단편집", author: "안톤 체호프", image: "" },
    { title: "가치 있는 삶", author: "마리 루티", image: "" },
    { title: "기술 지배 시대의 인문학", author: "저자 미상", image: "" },
    { title: "순수 이성 비판", author: "이마누엘 칸트", image: "" },
    { title: "차라투스트라는 이렇게 말했다", author: "프리드리히 니체", image: "" },
    { title: "이방인", author: "알베르 카뮈", image: "" }
];

let currentItems = [];
let nextRoundItems = [];
let currentIndex = 0;
let roundCount = 1;

// 초기화: 셔플 후 게임 시작
function initGame() {
    currentItems = books.sort(() => Math.random() - 0.5);
    updateDisplay();
}

function updateDisplay() {
    const totalInRound = currentItems.length;
    const currentMatch = Math.floor(currentIndex / 2) + 1;
    const totalMatches = totalInRound / 2;

    document.getElementById('round-info').innerText = 
        `${totalInRound === 2 ? '결승전' : totalInRound + '강'} (${currentMatch}/${totalMatches})`;

    const left = currentItems[currentIndex];
    const right = currentItems[currentIndex + 1];

    // 왼쪽 카드 데이터 바인딩
    document.getElementById('left-title').innerText = left.title;
    document.getElementById('left-author').innerText = left.author;
    document.getElementById('left-img').src = left.image || "";

    // 오른쪽 카드 데이터 바인딩
    document.getElementById('right-title').innerText = right.title;
    document.getElementById('right-author').innerText = right.author;
    document.getElementById('right-img').src = right.image || "";
}

function selectWinner(side) {
    // 승자 추가
    nextRoundItems.push(currentItems[currentIndex + side]);
    currentIndex += 2;

    if (currentIndex >= currentItems.length) {
        // 라운드 종료
        if (nextRoundItems.length === 1) {
            showResult(nextRoundItems[0]);
        } else {
            currentItems = nextRoundItems;
            nextRoundItems = [];
            currentIndex = 0;
            updateDisplay();
        }
    } else {
        updateDisplay();
    }
}

function showResult(winner) {
    document.getElementById('game-container').classList.add('hidden');
    document.getElementById('round-info').classList.add('hidden');
    const resultCont = document.getElementById('result-container');
    resultCont.classList.remove('hidden');

    document.getElementById('winner-display').innerHTML = `
        <h3>${winner.title}</h3>
        <p>${winner.author}</p>
    `;
}

initGame();
