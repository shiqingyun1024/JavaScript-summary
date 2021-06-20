const images = document.querySelectorAll('img')

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