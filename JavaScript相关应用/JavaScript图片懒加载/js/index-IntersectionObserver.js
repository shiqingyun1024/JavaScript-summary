// IntersectionObserver是浏览器提供的构造函数
// 我们可以拿来直接使用，但是前提是浏览器支持，部分浏览器是不兼容的
// IntersectionObserver的字面意思就是交叉观察 intersection 交叉   observer 观察
// 也就是目标元素和可视窗口会产生交叉区域 所以这个 API 叫做"交叉观察器"。
/**
 一、API
它的用法非常简单。
var io = new IntersectionObserver(callback, option);
上面代码中，IntersectionObserver是浏览器原生提供的构造函数，
接受两个参数：callback是可见性变化时的回调函数，option是配置对象（该参数可选）。

构造函数的返回值是一个观察器实例。实例的observe方法可以指定观察哪个 DOM 节点。

// 开始观察
io.observe(document.getElementById('example'));

// 停止观察
io.unobserve(element);

// 关闭观察器
io.disconnect();
上面代码中，observe的参数是一个 DOM 节点对象。如果要观察多个节点，就要多次调用这个方法。

io.observe(elementA);
io.observe(elementB);

二、callback 参数
目标元素的可见性变化时，就会调用观察器的回调函数callback。

callback一般会触发两次。一次是目标元素刚刚进入视口（开始可见），另一次是完全离开视口（开始不可见，所以刚开始不可见的时候会调用）。

var io = new IntersectionObserver(
  entries => {
    console.log(entries);
  }
);
上面代码中，回调函数采用的是箭头函数的写法。callback函数的参数（entries）是一个数组，每个成员都是一个IntersectionObserverEntry对象。举例来说，如果同时有两个被观察的对象的可见性发生变化，entries数组就会有两个成员。

三、IntersectionObserverEntry 对象
IntersectionObserverEntry对象提供目标元素的信息，一共有六个属性。


{
  time: 3893.92,
  rootBounds: ClientRect {
    bottom: 920,
    height: 1024,
    left: 0,
    right: 1024,
    top: 0,
    width: 920
  },
  boundingClientRect: ClientRect {
     // ...
  },
  intersectionRect: ClientRect {
    // ...
  },
  intersectionRatio: 0.54,
  target: element,
  isIntersecting:false
}
每个属性的含义如下。

time：可见性发生变化的时间，是一个高精度时间戳，单位为毫秒
target：被观察的目标元素，是一个 DOM 节点对象
rootBounds：根元素的矩形区域的信息，getBoundingClientRect()方法的返回值，如果没有根元素（即直接相对于视口滚动），则返回null
boundingClientRect：目标元素的矩形区域的信息
intersectionRect：目标元素与视口（或根元素）的交叉区域的信息
intersectionRatio：目标元素的可见比例，即intersectionRect占boundingClientRect的比例，完全可见时为1，完全不可见时小于等于0
isIntersecting: 是否交叉，也就是是否进入交叉区域（也就是可视区域）,没有在交叉区域（也就是可视区域）为false，否则为true

 * */

//  IntersectionObserverEntry 对象 一个很重要的属性isIntersecting，是否交叉，也就是是否进入交叉区域（也就是可视区域）

const images = document.querySelectorAll('img');
const intersection = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
        console.log('触发一次');
        console.log(entry);
        if(entry.isIntersecting){
            let container = entry.target;
            let data_src = container.getAttribute('data-src')
            // entry.setAttribute('src',data_src)
            container.src = data_src;
            intersection.unobserve(container);
        }
    })

});
images.forEach(image=>{
    intersection.observe(image)
})