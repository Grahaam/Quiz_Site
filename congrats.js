import './node_modules/scratchcard-js/build/scratchcard.js';


const scContainer = document.getElementById('js--sc--container')
const scInfos = document.querySelector('.sc__infos');
const sc = new ScratchCard
    ('#js--sc--container', {
        scratchType: SCRATCH_TYPE.CIRCLE,
        containerWidth: scContainer.offsetWidth,
        containerHeight: 330,
        brushSrc: '',
        imageForwardSrc: './images/scratch.png',
        imageBackgroundSrc: './images/SEX.jpg',
        htmlBackground: ``,
        clearZoneRadius: 40,
        nPoints: 50,
        pointSize: 4,
        callback: () => {
            scInfos.innerText = 'Bien joué !';
            const img = document.querySelectorAll(".sc__container img");
            img[0].style.filter = "blur(0)";
            img[0].style.animation = "pop 1.5s alternate ease-in-out infinite";
            }
    })

// Init
sc.init().then(() => {
  sc.canvas.addEventListener('scratch.move', () => {
    let percent = sc.getPercent().toFixed(0);
      scInfos.innerHTML = percent + '%';
  })
}).catch((error) => {
  // image not loaded
  alert(error.message);
});