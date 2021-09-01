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
#### 8.1.1 属性的类型
```
属性分为两种：数据属性和访问器属性
1、数据属性：
[[Configurable]](可配置的):表示属性是否可以通过 delete 删除并重新定义，是否可以修改它的特
性，以及是否可以把它改为访问器属性。默认情况下，所有直接定义在对象上的属性的这个特
性都是 true，如前面的例子所示。  
[[Enumberable]](可列举的):表示属性是否可以通过 for-in 循环返回。默认情况下，所有直接定义在对
象上的属性的这个特性都是 true，如前面的例子所示。
[[Writable]](可写的):表示属性的值是否可以被修改。默认情况下，所有直接定义在对象上的属性的
这个特性都是 true，如前面的例子所示。
[[Value]]:包含属性实际的值。这就是前面提到的那个读取和写入属性值的位置。这个特性
的默认值为 undefined。
2、访问器属性：

```
#### 8.2.4、原型模式
```
我们需要牢记两点：①__proto__和constructor属性是对象(函数也是对象，所以也有这两个属性，通过new构造函数生成的实例也是对象)所独有的；② prototype属性是函数所独有的。但是由于JS中函数也是一种对象，所以函数也拥有__proto__和constructor属性.

1、prototype 属性
每个函数都会创建一个prototype属性，prototype属性是函数独有的。prototype的含义是函数的原型对象，也就是这个函数（其实所有函数都可以作为构造函数）所创建的实例的原型对象，由此可知(以下面的为例)
function Person(){} 
let person1 = new Person()
由此可知
person1.__proto__ === Person.prototype  true 它们两个完全一样
那prototype属性的作用又是什么呢？它的作用就是包含可以由特定类型的所有实例共享的属性和方法，也就是让该函数所实例化的对象们都可以找到公用的属性和方法。
任何函数在创建的时候，其实会默认同时创建该函数的prototype对象。

**注意：prototype属性是函数独有的，任何函数在创建的时候，其实会默认同时创建该函数的prototype对象，保存着所有实例共享的属性和方法，是所有实例的原型对象。**

2、__proto__ 属性
__proto__属性是对象独有的，每个实例（通过构造函数生成对的实例都是对象，函数也是对象，所以函数也有__proto__）上面都有__proto__ 属性，它指向原型对象（构造函数的prototype属性），以下面的代码为例进行说明：
function Person(){} 
let person1 = new Person()
先强调一下new Person()生成的是一个对象（可以参考new的过程），所以person1是一个实例对象。也可以这么理解，每个实例上面都有__proto__ 属性
所以person1具有__proto__属性，__proto__属性指向构造函数的prototype（原型对象）
person1.__proto__ === Person.prototype  true 它们两个完全一样。

它的作用就是当访问一个对象的属性时，如果该对象内部不存在这个属性，那么就会去它的__proto__属性所指向的那个对象（可以理解为父对象）里找，如果父对象也不存在这个属性，则继续往父对象的__proto__属性所指向的那个对象（可以理解为爷爷对象）里找，如果还没找到，则继续往上找…直到原型链顶端null（可以理解为原始人。。。），再往上找就相当于在null上取值，会报错（可以理解为，再往上就已经不是“人”的范畴了，找不到了，到此结束，null为原型链的终点），由以上这种通过__proto__属性来连接对象直到null的一条链即为我们所谓的原型链。
原型链实现了继承。
person1中一个属性在本身里面找不到，会到__proto__属性所指向的那个对象（也就是原型对象，可以称为父对象）中找，也就是Person.prototype，Person.prototype是一个对象，所以也有__proto__属性，如果在Person.prototype也找不到，会去Person.prototype.__proto__中寻找，也就是person1.__proto__.__proto__（Person.prototype.__proto__ === person1.__proto__.__proto__），如果还找不到，就继续往上找，Person.prototype.__proto__.__proto__，直到最后Person.prototype.__proto__.__proto__.__proto__ === null
其实我们平时调用的字符串方法、数组方法、对象方法、函数方法等都是靠__proto__继承而来的。

**注意：__proto__属性是对象上的属性，一般都是通过构造函数生成的实例对象所具有的属性，指向构造函数的prototype的属性（原型对象），也可以说指向了共享对象，即实例的原型对象（共享对象）。所以可以说__proto__属性就是原型对象，它本身也有__proto__，指向Object.prototype，Object.prototype.__proto__指向了null。**

3、constructor属性
constructor属性也是对象才拥有的，它是从一个对象指向一个函数，含义就是指向该对象的构造函数，每个对象都有构造函数（本身拥有或继承而来，继承而来的要结合__proto__属性查看会更清楚点，如下图所示），从上图中可以看出Function这个对象比较特殊，它的构造函数就是它自己（因为Function可以看成是一个函数，也可以是一个对象），所有函数和对象最终都是由Function构造函数得来，所以constructor属性的终点就是Function这个函数。

这里解释一下上段中“每个对象都有构造函数”这句话。这里的意思是每个对象都可以找到其对应的constructor，因为创建对象的前提是需要有constructor，而这个constructor可能是对象自己本身显式定义的或者通过__proto__在原型链中找到的。而单从constructor这个属性来讲，只有prototype对象才有。每个函数在创建的时候，JS会同时创建一个该函数对应的prototype对象，而函数创建的对象.__proto__ === 该函数.prototype，该函数.prototype.constructor===该函数本身，故通过函数创建的对象即使自己没有constructor属性，它也能通过__proto__找到对应的constructor，所以任何对象最终都可以找到其构造函数（null如果当成对象的话，将null除外）。如下：
function Person(){} 
let person1 = new Person()
person1对象本身不具有constructor属性，所以会通过__proto__属性到原型链中找，而person1.__proto__=== Person.prototype，Person.prototype具有constructor属性并指向了Person，所以person1.constructor指向了Person，它不是person自己本身拥有的，是继承而来的。

**注意：单从constructor这个属性来讲，只有prototype对象才有。每个函数在创建的时候，JS会同时创建一个该函数对应的prototype对象，而函数创建的对象.__proto__ === 该函数.prototype，该函数.prototype.constructor===该函数本身。故通过函数创建的对象即使自己没有constructor属性，它也能通过__proto__找到对应的constructor，所以任何对象最终都可以找到其构造函数（null如果当成对象的话，将null除外）。记住，单从constructor这个属性来讲，只有prototype对象才有，所以才能实现继承。**

总结一下：

1、我们需要牢记两点：①__proto__和constructor属性是对象所独有的；② prototype属性是函数所独有的，因为函数也是一种对象，所以函数也拥有__proto__和constructor属性。
2、__proto__属性的作用就是当访问一个对象的属性时，如果该对象内部不存在这个属性，那么就会去它的__proto__属性所指向的那个对象（父对象）里找，一直找，直到__proto__属性的终点null，再往上找就相当于在null上取值，会报错。通过__proto__属性将对象连接起来的这条链路即我们所谓的原型链。
3、prototype属性的作用就是让该函数所实例化的对象们都可以找到公用的属性和方法，即f1.__proto__ === Foo.prototype。
4、constructor属性的含义就是指向该对象的构造函数，所有函数（此时看成对象了）最终的构造函数都指向Function。

```
### 10、函数
#### 10.11、函数属性与方法
```
        function a(name,age){
            this.name = name;
            this.age = age;
        }
        let b = {
            name:'123'
        }
        // 调用call相当于给b加上了a的相关属性，需要看一下书上关于call和new的解释。
        a.call(b,'xiaoming',18)
        console.log(b);
        关于call()和apply()需要好好总结一下，原理和本意，
        控制函数调用上下文即函数体内this值的能力
        可以将任意对象设置为任意函数的作用域。
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




