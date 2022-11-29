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
        console.log("currentScene : ", currentScene);
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
  }

  window.addEventListener("scroll", () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });

  window.addEventListener("DOMContentLoaded", setLayOut);
  window.addEventListener("resize", setLayOut);

  setLayOut();
})();
