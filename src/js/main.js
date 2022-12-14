(() => {
  let yOffset = 0; //현재 브라우저 위치에서의 높이 위치
  let prevScrollHeight = 0;
  let currentScene = 0; //현재 활성화된 scene
  const sceneInfo = [
    //0
    {
      scrollHeight: 0,
      heightNum: 5, // 브라우저 높이의 5배 scrollHeight 세팅
      objs: {
        container: document.querySelector("#scroll-section-0"),
        messageA: document.querySelector("#scroll-section-0 .main-message.a"),
        messageB: document.querySelector("#scroll-section-0 .main-message.b"),
        messageC: document.querySelector("#scroll-section-0 .main-message.c"),
        messageD: document.querySelector("#scroll-section-0 .main-message.d"),
      },
      values: {
        messageA_opacity: [0, 1, { start: 0.1, end: 0.2 }],
        messageB_opacity: [0, 1, { start: 0.3, end: 0.4 }],
      },
    },
    //1
    {
      scrollHeight: 0,
      heightNum: 5, // 브라우저 높이의 5배 scrollHeight 세팅
      objs: {
        container: document.querySelector("#scroll-section-1"),
      },
    },
    //2
    {
      scrollHeight: 0,
      heightNum: 5, // 브라우저 높이의 5배 scrollHeight 세팅
      objs: {
        container: document.querySelector("#scroll-section-2"),
      },
    },
    //3
    {
      scrollHeight: 0,
      heightNum: 5, // 브라우저 높이의 5배 scrollHeight 세팅
      objs: {
        container: document.querySelector("#scroll-section-3"),
      },
    },
  ];

  function playAnimation() {
    const values = sceneInfo[currentScene].values;
    const objs = sceneInfo[currentScene].objs;
    const currentYOffset = yOffset - prevScrollHeight;
    switch (currentScene) {
      case 0:
        // console.log("0 play");
        let messageA_opacity_in = calcValues(values.messageA_opacity, currentYOffset);
        objs.messageA.style.opacity = messageA_opacity_in;
        break;
      case 1:
        //console.log("1 play");
        break;
      case 2:
        // console.log("2 play");
        break;
      case 3:
        // console.log("3 play");
        break;
      default:
        break;
    }
  }

  function calcValues(values, currentYOffset) {
    let rv;
    // currentYOffset : 현재 scene에서의 높이
    // sceneInfo[currentScene].scrollHeight : 현재 scene의 높이
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    if (values.length === 3) {
      const partScrollStart = values[2].start * scrollHeight;
      const partScrollEnd = values[2].end * scrollHeight;
      const partScrollHeight = partScrollEnd - partScrollStart;

      if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
        rv = ((currentYOffset - partScrollStart) / partScrollHeight) * (values[1] - values[0]) + values[0];
      } else if (currentYOffset < partScrollStart) {
        rv = values[0];
      } else if (currentYOffset > partScrollEnd) {
        rv = values[1];
      }
    } else {
      rv = scrollRatio * (values[1] - values[0]) + values[0];
    }

    return rv;
  }

  function setLayOut() {
    for (let sceneIndex = 0; sceneIndex < sceneInfo.length; sceneIndex++) {
      sceneInfo[sceneIndex].scrollHeight = sceneInfo[sceneIndex].heightNum * window.innerHeight;
      sceneInfo[sceneIndex].objs.container.style.height = `${sceneInfo[sceneIndex].scrollHeight}px`;
    }

    let totalScrollHeight = 0;
    yOffset = window.pageYOffset;
    //현재 scene 계산
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }

    document.body.setAttribute("id", `show-scene-${currentScene}`);
  }

  function scrollLoop() {
    prevScrollHeight = 0;
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    //현재 위치가 누적된 높이보다 크다면
    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      currentScene++;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }
    //현재 위치가 누적된 높이보다 작다면
    if (yOffset < prevScrollHeight) {
      if (currentScene === 0) return;
      currentScene--;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }

    playAnimation();
  }

  window.addEventListener("scroll", () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });

  window.addEventListener("DOMContentLoaded", setLayOut);
  window.addEventListener("resize", setLayOut);

  setLayOut();
})();
