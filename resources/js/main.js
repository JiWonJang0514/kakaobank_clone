window.onload = () => {
    addEvent();
    // #333b58
};

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
            console.log(window.scrollY);
        }, 0);
    });
    q('#sky-btn').onclick = changeSkyAni;
}

// 하늘 애니메이션
function changeSkyAni() {
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