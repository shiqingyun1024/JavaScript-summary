const images = document.querySelectorAll('img')

// 每次scroll的时候都会执行，如果图片很多的话性能很差。图片已经加载了，但是这个方法还是一直在执行。
window.addEventListener('scroll',(e)=>{
      images.forEach(image=>{
          console.log('加载图片');
          const imageTop = image.getBoundingClientRect().top;
          if(imageTop < window.innerHeight){
              const data_src = image.getAttribute('data-src');
              image.src = data_src;
          }
      })
})