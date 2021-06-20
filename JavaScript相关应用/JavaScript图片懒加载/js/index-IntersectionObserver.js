// IntersectionObserver是浏览器提供的构造函数
// 我们可以拿来直接使用，但是前提是浏览器支持，部分浏览器是不兼容的
// IntersectionObserver的字面意思就是交叉观察 intersection 交叉   observer 观察
// 也就是目标元素和可视窗口会产生交叉区域 所以这个 API 叫做"交叉观察器"。
/**
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

 * */

const images = document.querySelectorAll('img');
const intersection = new IntersectionObserver(changes=>{
    changes.forEach(change=>{
        console.log('触发一次');
        let container = change.target;
        let data_src = container.getAttribute('data-src')
        container.src = data_src;
        intersection.unobserve(container);
    })

});
images.forEach(image=>{
    intersection.observe(image)
})