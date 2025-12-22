const books = [
    { title: "오만과 편견", author: "제인 오스틴" },
    { title: "참을 수 없는 존재의 가벼움", author: "밀란 쿤데라" },
    { title: "모순", author: "양귀자" },
    { title: "싯다르타", author: "헤르만 헤세" },
    { title: "스토너", author: "존 윌리엄스" },
    { title: "숨결이 바람될 때", author: "폴 칼라니티" },
    { title: "달과 6펜스", author: "서머싯 몸" },
    { title: "지리의 힘", author: "팀 마샬" },
    { title: "주홍글씨", author: "너새니얼 호손" },
    { title: "오베라는 남자", author: "프레드릭 배크만" },
    { title: "젊은 베르테르의 슬픔", author: "요한 볼프강 폰 괴테" },
    { title: "그 많던 싱아는 누가 다 먹었을까?", author: "박완서" },
    { title: "체호프 단편선", author: "안톤 체호프" },
    { title: "불안", author: "알랭 드 보통" },
    { title: "사탄탱고", author: "크라스나호르카이 라슬로" },
    { title: "파리대왕", author: "윌리엄 골딩" }
];

const rankingList = document.getElementById("ranking-list");

function loadList() {
    books.forEach((book, index) => {
        const li = document.createElement("li");
        li.className = "item";
        li.draggable = true;
        li.innerHTML = `
            <div class="item-header">
                <div class="rank-number">${index + 1}</div>
                <p class="book-title">${book.title}</p>
                <p class="book-author">${book.author}</p>
            </div>
            <textarea class="reason-input" placeholder="선정 이유를 적어주세요 (캡처용)" rows="2"></textarea>
        `;
        
        // 드래그 시 입력창 포커스 해제
        li.addEventListener("dragstart", () => {
            li.querySelector('textarea').blur();
            setTimeout(() => li.classList.add("dragging"), 0);
        });
        
        li.addEventListener("dragend", () => {
            li.classList.remove("dragging");
            updateRankNumbers();
        });
        
        rankingList.appendChild(li);
    });
}

function updateRankNumbers() {
    const items = rankingList.querySelectorAll(".item");
    items.forEach((item, index) => {
        item.querySelector(".rank-number").innerText = index + 1;
    });
}

rankingList.addEventListener("dragover", e => {
    e.preventDefault();
    const draggingItem = document.querySelector(".dragging");
    let siblings = [...rankingList.querySelectorAll(".item:not(.dragging)")];
    let nextSibling = siblings.find(sibling => {
        return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
    });
    rankingList.insertBefore(draggingItem, nextSibling);
});

// 텍스트 복사 기능 (이유 포함)
function copyResults() {
    const items = rankingList.querySelectorAll(".item");
    let resultText = "🏆 2025 나의 올해의 책 순위 & 리뷰 🏆\n\n";
    
    items.forEach((item, index) => {
        const title = item.querySelector(".book-title").innerText;
        const reason = item.querySelector(".reason-input").value;
        resultText += `${index + 1}위: ${title}\n`;
        if(reason) resultText += `💬 이유: ${reason}\n`;
        resultText += `-------------------\n`;
    });
    
    navigator.clipboard.writeText(resultText).then(() => {
        alert("순위와 이유가 복사되었습니다! 단톡방에 붙여넣어 보세요.");
    });
}

loadList();
