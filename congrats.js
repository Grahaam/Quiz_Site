import './scratchcard.min.js';

const scContainer = document.getElementById('js--sc--container');
const scInfos = document.querySelector('.sc__infos');
const scWrapper = document.querySelector('.sc__wrapper');
const sc = new ScratchCard
    ('#js--sc--container', {
        scratchType: SCRATCH_TYPE.CIRCLE,
        containerWidth: scContainer.offsetWidth,
        containerHeight: 330,
        brushSrc: '',
        imageForwardSrc: './images/pngwing.com (2).png',
        imageBackgroundSrc: './images/istockphoto-1219614648-612x612.png',
        htmlBackground: ``,
        clearZoneRadius: 40,
        nPoints: 50,
        pointSize: 4,
        callback: () => {
            scInfos.innerText = 'TICKET TO BARCELONA';
            queryForm.appendChild(document.createElement("br"));
            const img = document.querySelectorAll(".sc__container img");
            img[0].style.filter = "blur(0)";
            img[0].style.animation = "pop 1.5s alternate ease-in-out infinite";
            scWrapper.style.margin = " 2rem auto 5rem auto"
            }
    })

// Init
sc.init().then(() => {
  sc.canvas.addEventListener('scratch.move', () => {
  })
}).catch((error) => {
  // image not loaded
  alert(error.message);
});
