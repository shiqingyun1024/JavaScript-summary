# JavaScript-summary
```
JavaScript基础、相关语法、相关应用等的总结
**注意：** 这种方式是我自己按照自己的理解做的标注，以便于以后重点查阅。
```

## 基础（Javascript高级程序设计）

### 8、对象、类与面向对象编程
```
本章内容：
1、理解对象
2、理解对象创建过程
3、理解继承
4、理解类
```
#### 8.1、理解对象
```
什么是对象？
答：对象就是一组属性的无序集合。对象就是一组没有特定顺序的值。

对象的每个属性或方法都由一个名称来标识，这个名称映射到一个值。

创建对象的方式：
1、创建自定义对象的通常方式是创建Object的一个新实例，然后再给它添加属性和方法。new Object
let Person = new Object()
Person.name = 'shiqingyun';
Person.age = 29;
Person.job = 'Software Engineer';
Person.sayName = function(){
    console.log(this.name)
}
2、使用对象字面量的方式
用字面量的形式改写上面的例子如下：
let Person = {
    name : 'shiqingyun',
    age : 29,
    job : 'Software Engineer',
    sayName() {
      console.log(this.name)
    }
}
对象中的这些属性都有自己的特征，而这些特征决定了它们在JavaScript中的行为。 
**注意：属性决定行为（就是用来干什么的）**
```
#### 8.2.4、原型模式
```
每个函数都会创建一个prototype属性，prototype属性是函数独有的。prototype的含义是函数的原型对象，也就是这个函数（其实所有函数都可以作为构造函数）所创建的实例的原型对象，由此可知(以下面的为例)
function Person(){} 
let person1 = new Person()
由此可知
person1.__proto__ = Person.prototype  它们两个完全一样
那prototype属性的作用又是什么呢？它的作用就是包含可以由特定类型的所有实例共享的属性和方法，也就是让该函数所实例化的对象们都可以找到公用的属性和方法。
任何函数在创建的时候，其实会默认同时创建该函数的prototype对象。

**注意：prototype属性是函数独有的，任何函数在创建的时候，其实会默认同时创建该函数的prototype对象，保存着所有实例共享的属性和方法，是所有实例的原型对象。**

```

## JavaScript相关应用

### JavaScript 图片懒加载
```
// IntersectionObserver是浏览器提供的构造函数
// 我们可以拿来直接使用，但是前提是浏览器支持，部分浏览器是不兼容的
// IntersectionObserver的字面意思就是交叉观察 intersection 交叉   observer 观察
// 也就是目标元素和可视窗口会产生交叉区域 所以这个 API 叫做"交叉观察器"。
```
### JavaScript 拖拽功能
```
```

### 设计模式
#### 1、发布订阅模式
```
发布订阅模式，在生活中有很多场景都在使用“发布订阅模式”，举个例子，我和亲戚朋友一块去售楼部买房子，到了之后，售楼部的销售人员说房子卖完了，过段时间会加推一个楼盘。所以我们都记下了售楼部的电话，每天都要抽空打电话给销售人员，询问现在是否有房子。一周之后，销售人员崩溃了，每天都接到几百个电话来询问房子，然后就离职了。让我们看看采用“发布订阅模式”之后的场景。我和亲戚朋友一块去售楼部买房子，到了之后，售楼部的销售人员说房子卖完了，过段时间会加推一个楼盘。销售人员让我们把电话都留一下，楼盘推出的时候，会发短信通知我们。然后我们就走了，平时也不用打电话询问了，销售人员也不用每天接那么那么多电话了，在楼盘推出的时候，销售人员准时都给我们发了短信。我们收到通知后，都买到了心仪的房子。
我们来看看使用发布订阅模式之后的好处，把电话号码留下之后，等通知就行，不耽误我们干其他事，通知到了之后我们再去售楼处。
我们来看一下怎么实现。首先包含三个方法，订阅，发布，移除订阅发布
class pubSub{
    constructor(){
        this.eventArray = {}
    }
    <!-- 订阅 -->
    on(eventName,cb){
        if(!this.eventArray[eventName]){
            this.eventArray[eventName] = []
        }
        this.eventArray[eventName].push(cb)
    }
    <!-- 发布 -->
    emit(eventName,...publishInfo){
        this.eventArray[eventName].length>0&&this.eventArray[eventName].forEach(cb=>{
            cb(...publishInfo)
        })
    }
    <!-- 移除订阅发布 -->
    remove(eventName){
       this.eventArray[eventName] && this.eventArray[eventName] = []
    }
    
}
**注意：按照我的理解，订阅是收集信息，登记信息，也就是根据订阅的名称，把回调函数登记在一个对象中。发布是通知或者说是执行，发布的时候会带着参数，所以发布的时候会执行订阅时登记的回调函数，并且把参数传入到回调函数中。**
```




