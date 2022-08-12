window.onload = () => {
    addEvent();
    setCards();
};

let hasContent2Ani = false;
let hasContent5Ani = false;
let isNight = false;
let currentCards = [2, 3, 4];

let checkcardList = [
    'resources/imgs/card-1.png', 
    'resources/imgs/card-2.png', 
    'resources/imgs/card-3.png', 
    'resources/imgs/card-4.png', 
    'resources/imgs/card-5.png'
];
let currentIdx = 2;



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

            // content 2
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
    console.log(q('.checkcard-control > .prev'));
    q('.checkcard-control > .prev').onclick = slidePrev;
    q('.checkcard-control > .next').onclick = slideNext;
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
    q(`.checkcard-img[data-num='${currentCards[1]}']`).style.transform = 'translateZ(125px)';
    // q(`.checkcard-img[data-num='${currentCards[1]}']`).style.zIndex = '2';
    
    q(`.checkcard-img[data-num='${currentCards[2]}']`).style.left = 'calc(100% - 240px - 85px)';
    q(`.checkcard-img[data-num='${currentCards[2]}']`).style.transform = 'translateZ(0px)';
}

// 체크카드 왼쪽 클릭
function slidePrev() {
    // [0]을 왼쪽으로 이동
    const leftAni = [
        { left: '0px' },
        { left: '168px', transform: 'translateZ(125px)' },
        // { left: '168px', transform: 'translateZ(125px)', zIndex: '2' },
    ];
    q(`.checkcard-img[data-num='${currentCards[0]}']`).animate(
        leftAni,
        {
            duration: 800,
            iterations: 1,
            easing: 'ease',
            fill: 'forwards'
        }
    );

    // [1]을 센터로 이동 + tranlateZ
    const centerAni = [
        { left: '168px' },
        { left: 'calc(100% - 240px - 85px)', transform: 'translateZ(0px)' },
        // { left: 'calc(100% - 240px - 85px)', transform: 'translateZ(0px)', zIndex: '1' },
    ];
    q(`.checkcard-img[data-num='${currentCards[1]}']`).animate(
        centerAni,
        {
            duration: 800,
            iterations: 1,
            easing: 'ease',
            fill: 'forwards'
        }
    );

    // [2]을 오른쪽으로 이동
    const rightAni = [
        { left: 'calc(100% - 240px - 85px)' },
        { left: '100%', transform: 'translateZ(0px)' },
        // { left: '100%', transform: 'translateZ(0px)', zIndex: '1' },
    ];
    q(`.checkcard-img[data-num='${currentCards[2]}']`).animate(
        rightAni,
        {
            duration: 800,
            iterations: 1,
            easing: 'ease',
            fill: 'forwards'
        }
    );
}

// function slidePrev2() {
//     // todo: 흠.. 슬라이드는 되는데 애니메이션은?? ㅇㅅㅇ
//     //       내용만 바꾸는게 아니라 카드 자체가 자리를 옆으로 움직여져야 함
//     let left = null;
//     let center = null;
//     let right = null;

//     if(currentIdx == 0) {
//         currentIdx = checkcardList.length - 1;
//         left = currentIdx - 1;
//         center = currentIdx;
//         right = 0;
//     } else {
//         currentIdx--;
//         left = currentIdx == 0 ? checkcardList.length - 1 : currentIdx - 1;
//         center = currentIdx;
//         right = currentIdx + 1;
//     }

//     q('.checkcard-img.left > img').src = checkcardList[left];
//     q('.checkcard-img.center > img').src = checkcardList[center];
//     q('.checkcard-img.right > img').src = checkcardList[right];
// }

// 체크카드 오른쪽 클릭
function slideNext() {
    
}