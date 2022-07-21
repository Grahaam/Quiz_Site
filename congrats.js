import './scratchcard.min.js';

const scContainer = document.getElementById('js--sc--container')
const scInfos = document.querySelector('.sc__infos');
const sc = new ScratchCard
    ('#js--sc--container', {
        scratchType: SCRATCH_TYPE.CIRCLE,
        containerWidth: scContainer.offsetWidth,
        containerHeight: 330,
        brushSrc: '',
        imageForwardSrc: './images/scratch.png',
        imageBackgroundSrc: './images/istockphoto-1219614648-612x612.png',
        htmlBackground: ``,
        clearZoneRadius: 40,
        nPoints: 50,
        pointSize: 4,
        callback: () => {
            scInfos.innerText = 'I am your Slut <3';
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
