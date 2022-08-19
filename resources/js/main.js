window.onload = () => {
    addEvent();
    setCards();
};

let hasContent2Ani = false;
let hasContent5Ani = false;
let isNight = false;
let currentCards = [2, 3, 4];



// 셀렉터
function q(selector) {
    return document.querySelector(selector);
}

// 셀렉터올
function qa(selector) {
    return document.querySelectorAll(selector);
}

// 이벤트
function addEvent() {
    window.addEventListener('scroll', () => {
        setTimeout(() => {
            // content 2
            if(window.scrollY > 1100 && !hasContent2Ani) {
                slideContent2();
                hasContent2Ani = true;
            }

            // content 5
            if(window.scrollY > 3372 && !hasContent5Ani) {
                slideContent5();
                hasContent5Ani = true;
            }

            // time section
            if(window.scrollY < 4020 && isNight) {
                changeDayAni();
                isNight = false;

            } else if(!isNight) {
                changeNightAni();
                isNight = true;
            }
        }, 0);
    });

    // checkcard slider
    q('.checkcard-prev').addEventListener('click', slidePrev);
    q('.checkcard-next').addEventListener('click', slideNext);

    // todo: 양쪽 카드 클릭하면 슬라이드 되야함
}

// 적금 이미지 애니
function slideContent2() {
    // 이미지 옆으로 쓕 슬라이드
    let img = q('#save-img');
    const slideAni = [
        { opacity: '0', left: '14%' },
        { opacity: '1', left: '0%' }
    ];
    img.animate(
        slideAni,
        {
            duration: 800,
            iterations: 1,
            easing: 'ease-in-out',
            fill: 'forwards'
        }
    );
}

// 해외계좌 이미지 애니
function slideContent5() {
    // 이미지 옆으로 쓕 슬라이드
    let img = q('#foreign-img');
    const slideAni = [
        { opacity: '0', top: '25%' },
        { opacity: '1', top: '0%' }
    ];
    img.animate(
        slideAni,
        {
            duration: 800,
            iterations: 1,
            easing: 'ease-in-out',
            fill: 'forwards'
        }
    );
}

// 낮하늘로 복구
function changeDayAni() {
    q('#night').style.top = '100%';
    q('#moon').style.backgroundColor = '#ffdc00';
    q('#moon-cover').style.opacity = '0';
    q('#moon-cover').style.top = '-100%';
    q('#moon-cover').style.left = '-100%';
}

// 밤하늘 애니메이션
function changeNightAni() {
    qa('.star').forEach(e => {
        showStar(e);
    });
    growNight().onfinish = () => {
        twinkleStar(q('#star1'), 2000);
        twinkleStar(q('#star2'), 0);
        twinkleStar(q('#star3'), 1000);
        twinkleStar(q('#star4'), 4000);
        twinkleStar(q('#star5'), 3000);
        twinkleStar(q('#star6'), 1000);
        twinkleStar(q('#star7'), 0);
    }
    changeSunToMoon();
    setTimeout(() => {
        coverMoon();
    }, 300);
}

// 별 보이기
function showStar(star) {
    const starAni = [
        { opacity: '0' },
        { opacity: '1' }
    ];
    star.animate(
        starAni,
        {
            duration: 200,
            iterations: 1,
            easing: 'ease',
            fill: 'forwards'
        }
    );
}

// 밤하늘 아래에서 올라오기
function growNight() {
    let night = q('#night');
    const nightAni = [
        { top: '100%' },
        { top: '0%' }
    ];
    let nightAnimate = night.animate(
        nightAni,
        {
            duration: 800,
            iterations: 1,
            easing: 'ease',
            fill: 'forwards'
        }
    );

    return nightAnimate;
}

// 달로 바꾸기
function changeSunToMoon() {
    let moon = q('#moon');
    const moonAni = [
        { backgroundColor: '#ffdc00' },
        { backgroundColor: '#fff' }
    ];
    moon.animate(
        moonAni,
        {
            duration: 800,
            iterations: 1,
            easing: 'ease',
            fill: 'forwards'
        }
    );
}

// 초승달 만들기
function coverMoon() {
    let moonCover = q('#moon-cover');
    const moonCoverAni = [
        { opacity: '0' },
        { top: '-20px', left: '-20px', opacity: '1' }
    ];
    moonCover.animate(
        moonCoverAni,
        {
            duration: 400,
            iterations: 1,
            easing: 'linear',
            fill: 'forwards'
        }
    );
}

// 별 반짝이기
function twinkleStar(star, timing) {
    const twinkleAni = [
        { opacity: '0.8', padding: '2px' },
        { opacity: '0', padding: '0px', offset: 0.4 },
        { opacity: '0', padding: '0px', offset: 0.6 },
        { opacity: '0.8', padding: '2px' }
    ];
    star.animate(
        twinkleAni,
        {
            duration: 3500,
            iterations: Infinity,
            easing: 'ease-in-out',
            delay: timing
        }
    );
}

// 카드 초기화
function setCards() {
    q(`.checkcard-img[data-num='${currentCards[0]}']`).style.left = '0px';
    q(`.checkcard-img[data-num='${currentCards[0]}']`).style.transform = 'translateZ(0px)';

    q(`.checkcard-img[data-num='${currentCards[1]}']`).style.left = '168px';
    q(`.checkcard-img[data-num='${currentCards[1]}']`).style.transform = 'translateZ(130px)';
    
    q(`.checkcard-img[data-num='${currentCards[2]}']`).style.left = 'calc(100% - 240px - 85px)';
    q(`.checkcard-img[data-num='${currentCards[2]}']`).style.transform = 'translateZ(0px)';

    // 카드 클릭이벤트
    addCardClickEvent();
}

// 카드 애니메이션
function animateCard(ani, cardData) {
    q(`.checkcard-img[data-num='${cardData}']`).animate(
        ani,
        {
            duration: 300,
            iterations: 1,
            easing: 'ease',
            fill: 'forwards'
        }
    );
}

// 체크카드 왼쪽 클릭
function slidePrev() {
    // 왼쪽에서 새로 등장
    const newAni = [
        { left: '-240px' },
        { left: '0px', transform: 'translateZ(0px)' }
    ];
    animateCard(newAni, currentCards[0] > 1 ? currentCards[0] - 1 : 5);

    // [0]을 center로 이동
    const leftAni = [
        { left: '0px' },
        { left: '168px', transform: 'translateZ(130px)' }
    ];
    animateCard(leftAni, currentCards[0]);

    // [1]을 right로 이동, tranlateZ 효과
    const centerAni = [
        { left: '168px' },
        { left: 'calc(100% - 240px - 85px)', transform: 'translateZ(0px)' }
    ];
    animateCard(centerAni, currentCards[1]);

    // [2]을 오른쪽으로 내보내기
    const rightAni = [
        { left: 'calc(100% - 240px - 85px)' },
        { left: '100%', transform: 'translateZ(0px)' }
    ];
    animateCard(rightAni, currentCards[2]);

    // 카드 배열 갱신
    currentCards[2] = currentCards[1];
    currentCards[1] = currentCards[0];
    currentCards[0] = currentCards[0] > 1 ? currentCards[0] - 1 : 5;

    // 카드 클릭이벤트
    addCardClickEvent();
}

// 체크카드 오른쪽 클릭
function slideNext() {
    // 오른쪽에서 새로 등장
    const newAni = [
        { left: '100%' },
        { left: 'calc(100% - 240px - 85px)', transform: 'translateZ(0px)' }
    ];
    animateCard(newAni, currentCards[2] < 5 ? currentCards[2] + 1 : 1);

    // [2]을 center로 이동, tranlateZ 효과
    const rightAni = [
        { left: 'calc(100% - 240px - 85px)' },
        { left: '168px', transform: 'translateZ(130px)' }
    ];
    animateCard(rightAni, currentCards[2]);

    // [1]을 left로 이동
    const centerAni = [
        { left: '168px' },
        { left: '0px', transform: 'translateZ(0px)' }
    ];
    animateCard(centerAni, currentCards[1]);

    // [0]을 왼쪽으로 내보내기
    const leftAni = [
        { left: '0px' },
        { left: '-240px', transform: 'translateZ(0px)' }
    ];
    animateCard(leftAni, currentCards[0]);

    // 카드 배열 갱신
    currentCards[0] = currentCards[1];
    currentCards[1] = currentCards[2];
    currentCards[2] = currentCards[2] < 5 ? currentCards[2] + 1 : 1;

    // 카드 클릭이벤트
    addCardClickEvent();
}

// 좌우 카드 클릭이벤트
function addCardClickEvent() {
    q(`.checkcard-img[data-num='${currentCards[0]}']`).onclick = slidePrev;
    q(`.checkcard-img[data-num='${currentCards[1]}']`).onclick = null;
    q(`.checkcard-img[data-num='${currentCards[2]}']`).onclick = slideNext;

    // todo: 가운데 카드 이벤트 삭제하려고 할 때
    //       addEventListener를 썼더니 slidePrev, slideNext에서 실행된 currentCards갱신이 무효되는 것 같음
    //       하지만 가운데 클릭 시 슬라이드 안되게는 거는 동작함
    //       onclick과 addEventListener('click'은 뭐가 다른거지??
    
    // q(`.checkcard-img[data-num='${currentCards[0]}']`).addEventListener('click', slidePrev);
    // q(`.checkcard-img[data-num='${currentCards[1]}']`).removeEventListener('click', slidePrev);
    // q(`.checkcard-img[data-num='${currentCards[1]}']`).removeEventListener('click', slideNext);
    // q(`.checkcard-img[data-num='${currentCards[2]}']`).addEventListener('click', slideNext);
}