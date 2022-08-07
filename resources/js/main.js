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
    // 하늘
    let night = q('#night');
    const nightAni = [
        { top: '100%' },
        { top: '0%' }
    ];
    night.animate(
        nightAni,
        {
            duration: 800,
            iterations: 1,
            easing: 'ease',
            fill: 'forwards'
        }
    );

    // 달
    let moon = q('#moon');
    const moonAni = [
        { backgroundColor: '#ffdc00' },
        { backgroundColor: '#fff' }
    ];
    let moonAnimate = moon.animate(
        moonAni,
        {
            duration: 800,
            iterations: 1,
            easing: 'ease',
            fill: 'forwards'
        }
    );
    moonAnimate.onfinish = () => {
        console.log('ddd');
        // 초승달 만들기
        // top: -20px;
        // left: -20px;
        let moonCover = q('#moon-cover');
        const moonCoverAni = [
            { opacity: '0' },
            { top: '-20px', left: '-20px', opacity: '1' }
            // todo: 커버가 빠져나가있는게 살짝 보임
        ];
        moonCover.animate(
            moonCoverAni,
            {
                duration: 500,
                iterations: 1,
                easing: 'linear',
                fill: 'forwards'
            }
        );
    }

    
}