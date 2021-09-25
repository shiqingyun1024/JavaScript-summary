# JavaScript-summary
```
JavaScript基础、相关语法、相关应用等的总结
**注意：** 这种方式是我自己按照自己的理解做的标注，以便于以后重点查阅。
```

## 基础（Javascript高级程序设计）
### 继承
```
《JavaScript高级程序设计》提到了6中继承方式：
1.原型链继承
2.借用构造函数（经典继承）
3.组合继承
4.原型链继承
5.寄生式继承
6.寄生组合式继承
```
#### 1.原型链继承
```
        // 原型链继承
        function Person(){
            this.name = 'xiaopao';
        }

        Person.prototype.getName = function(){
            console.log(this.name);
        }

        function Child(){
            
        }

        Child.prototype = new Person();  // 这一步是最关键的。
        var child1 = new Child();
        child1.getName(); // xiaopao

    缺点：

    1、引用类型的属性（也就是Person的值）被所有实例共享
    2、在创建Child 的实例时， 不能向Person传参

        function Person(){
            this.name = 'xiaopao';
            this.colors = ['red', 'blue', 'green'];
        }

        Person.prototype.getName = function(){
            console.log(this.name);
        }

        function Child(){

        }

        Child.prototype = new Person(); // 这一步是最关键的，Child的原型指向Person的实例。Child的实例，就可以使用Person实例上的方法和属性和实例原型上的方法和属性。
        var child1 = new Child();
        var child2 = new Child();
        child1.colors.push('yellow');
        console.log(child1.colors);
        console.log(child2.colors);
```       

#### 2、借用构造函数（经典继承）
```

复制父类构造函数内的属性

        // 借用构造函数继承（经典继承）
        function Person(){
            this.name = 'xiaopao';
            this.colors = ['red', 'blue', 'green'];
        }

        Person.prototype.getName = function(){
            console.log(this.name);
        }

        function Child(){
            Person.call(this);// 这一步是最关键的，直接改变了Person的this指向。this的值是变动的，new出来的实例中的name和colors都是唯一的值。
        }

        var child1 = new Child();
        var child2 = new Child();
        child1.colors.push('yellow');
        console.log(child1.name);
        console.log(child1.colors); // ["red", "blue", "green", "yellow"]
        console.log(child2.colors); // ["red", "blue", "green"]

优点：
1.避免了引用类型的属性被所有实例共享
2.可以在Child中向Parent传参

缺点：
1.只是子类的实例，不是父类的实例
2.方法都在构造函数中定义，每次创建实例都会创建一遍方法

       // 借用构造函数继承， 向Parent传参
       function Person(name){
            this.name = name;
        }

        Person.prototype.getName = function(){
            console.log(this.name);
        }

        function Child(name){
            Person.call(this,name); // 这一步是最关键的。
        }

        var child1 = new Child('xiaopao');
        var child2 = new Child('lulu');
        console.log(child1.name); // xiaopao
        console.log(child2.name); // lulu
        console.log(child1 instanceof Person); // false   不能识别是Person的实例

 **注意：function Child(name){
            Person.call(this,name); // 这一步是最关键的。
        }**       
```
#### 3、组合继承
组合 原型链继承 和 借用构造函数继承
背后的思路是：使用原型链实现对原型方法的继承，而通过借用构造函数来实现对实例属性的继承。
```
        function Parent(name){
            this.name = name;
            this.colors = ['red', 'blue', 'green'];
        }

        Parent.prototype.getName = function(){
            console.log(this.name);
        }

        function Child(name,age){
            Parent.call(this,name);// 第二次调用 Parent()  这一步是 借用构造函数
            this.age = age;
        }

        Child.prototype = new Parent(); // 第一次调用 Parent()  这一步是 原型链继承

        var child1 = new Child('xiaopao',18);
        var child2 = new Child('lulu',19);
        child1.getName(); // xiaopao
        child2.getName(); // lulu
        console.log(child1.age); // 18
        console.log(child2.age); // 19
        child1.colors.push('yellow');
        console.log(child1.colors);  // ["red", "blue", "green", "yellow"]
        console.log(child2.colors); // ["red", "blue", "green"]
        console.log(child1 instanceof Child); // true
        console.log(child1 instanceof Parent); // true

优点：融合原型链继承和构造函数的优点，是JavaScript中最常用的继承模式
缺点：调用了两次父类构造函数
（组合继承最大的问题是无论什么情况下，都会调用两次超类型构造函数：一次是在创建子类型原型的时候，另一次是在子类型构造函数内部）
```
#### 4、原型式继承
```
        es6中的原型式继承新的写法就是Object.create()
        // 原型式继承  
        function CreateObj(o){
            function F(){}  // 主要的步骤
            F.prototype = o;  // 主要的步骤
            console.log(o.__proto__ === Object.prototype);
            console.log(F.prototype.constructor === Object); // true
            return new F();  // 主要的步骤
        }

        var person = {
            name: 'xiaopao',
            friend: ['daisy','kelly']
        }

        var person1 = CreateObj(person);  // 主要的步骤
        // var person2 = CreateObj(person);

        person1.name = 'person1';
        // console.log(person2.name); // xiaopao
        person1.friend.push('taylor');
        // console.log(person2.friend); // ["daisy", "kelly", "taylor"]
        // console.log(person); // {name: "xiaopao", friend: Array(3)}
        person1.friend = ['lulu'];
        // console.log(person1.friend); // ["lulu"]
        // console.log(person.friend); //  ["daisy", "kelly", "taylor"]
        // 注意： 这里修改了person1.name的值，person2.name的值并未改变，并不是因为person1和person2有独立的name值，而是person1.name='person1'是给person1添加了name值，并非修改了原型上的name值
        // 因为我们找对象上的属性时，总是先找实例上对象，没有找到的话再去原型对象上的属性。实例对象和原型对象上如果有同名属性，总是先取实例对象上的值

缺点： 包含引用类型的属性值始终都会共享相应的值， 这点跟原型链继承一样
注意： 这里修改了person1.name的值，person2.name的值并未改变，并不是因为person1和person2有独立的name值，而是person1.name='person1'是给person1添加了name值，并非修改了原型上的name值。
因为我们找对象上的属性时，总是先找实例上对象，没有找到的话再去原型对象上的属性。实例对象和原型对象上如果有同名属性，总是先取实例对象上的值        
```
#### 5、寄生式继承
创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来做增强对象，最后返回对象。
可以理解为在原型式继承的基础上新增一些函数或属性
```
        // 寄生式继承  可以理解为在原型式继承的基础上增加一些函数或属性
        var ob = {
            name: 'xiaopao',
            friends: ['lulu','huahua']
        }

        function CreateObj(o){
            function F(){};  // 创建一个构造函数F
            F.prototype = o;
            return new F();
        }

        // 上面CreateObj函数 在ECMAScript5 有了一新的规范写法，Object.create(ob) 效果是一样的 , 看下面代码
        var ob1 = CreateObj(ob);
        var ob2 = Object.create(ob);
        console.log(ob1.name); // xiaopao
        console.log(ob2.name); // xiaopao

        function CreateOb(o){
            var newob = CreateObj(o); // 创建对象 或者用 var newob = Object.create(ob)
            newob.sayName = function(){ // 增强对象
                console.log(this.name);
            }
            return newob; // 指定对象
        }

        var p1 = CreateOb(ob);
        p1.sayName(); // xiaopao 
```
#### 6、寄生组合式继承
```
子类构造函数复制父类的自身属性和方法，子类原型只接收父类的原型属性和方法

所谓寄生组合继承，即通过借用构造函数来继承属性，通过原型链的混成形式来继承方法。
其背后的基本思路是：不必为了指定子类型的原型而调用超类型的构造函数，我们所需要的无非就是超类型的原型的一个副本而已。本质上，就是使用寄生式继承来继承超类型的原型，然后再将结果指定给予类型的原型。

        // 寄生组合式继承
        function Parent(name){
            this.name = name;
            this.colors = ['red', 'blue', 'green'];
        }

        Parent.prototype.sayName = function(){
            console.log(this.name);
        }

        function Child(name,age){
            Parent.call(this,name); 
            this.age = age;
        }

        function CreateObj(o){
            function F(){};
            F.prototype = o;
            return new F();
        }

        // Child.prototype = new Parent(); // 这里换成下面
        <!-- 最关键的函数实现 -->
        function prototype(child,parent){
            var prototype = CreateObj(parent.prototype);   // var prototype = Object.create(parent.prototype)
            prototype.constructor = child;
            child.prototype = prototype;
        }
        prototype(Child,Parent);

        var child1 = new Child('xiaopao', 18);
        console.log(child1); 
```



### 闭包
```
闭包有三个特性：
1、函数嵌套函数。
2、函数内部可以引用外部的参数和变量。
3、参数和变量不会被垃圾回收机制回收。

闭包的好处：
1、希望一个变量长期存储在内存中。
2、避免全局变量的污染。
3、私有成员的存在。

闭包的缺点：
1、常驻内存，增加内存使用量。
2、使用不当会很容易造成内存泄露。

那怎么释放内存呢？
以下面为例
直接写一个闭包函数：
  var f = function() {
    var num = 0;
    return function() {
      return num += 1;
    };
  }
  js中，函数是一等公民，定义一个函数f，它返回另一个可执行函数function() { return num += 1; };
  js中的作用域，都是一层一层向上找的，在f内部函数里面，他的num向上找到父函数的作用域。
现在，我们执行一下：
f()()
// 1
f()()
// 1
????? 感觉 不太对？为什么num没有自增呢？？

内存回收机制
为什么上面执行结果不太对，因为执行f()()后，f函数已经执行完毕了，没有其他资源引用f，ta会被立即释放，也就是说，f()()执行完后，立即就释放了。
如何才不释放呢？

// 创建f的引用
var fn = f();
fn()
// 1
fn()
// 2
fn()
// 3

这下就对了，num成了私有变量，f拥有了私有作用域。
完了吗？
f有了fn的引用，内存一直得不到释放，咋办呢？这样的函数多了是不是会造成内存溢出？
手动释放一下：

var fn = f();
fn()
// 1
fn()
// 2
fn()
// 3
// 手动释放f的引用
fn = null
// f的引用fn被释放了，现在f的作用域也被释放了。num再次归零了。
var fn = f()
fn()
// 1

**注意：最后的结论是手动释放内存，让引用的值直接赋值为null。**

闭包的使用场景
1、例如回调函数，有时候我们希望对异步请求的数据结果进行操作，例如对一个异步返回的数组，求最大值
function foo (callback) {
  new Promise((resolve) => {
    resolve([1, 2, 3, 4])
  }).then(res => {
    callback(res)
  })
}
 
function bar (arr) {
  arr.push(10) // arr [1, 2, 3, 4, 10 ]
  arr.push(6) // arr [ 1, 2, 3, 4, 10, 6 ]
  Math.max.apply(null, arr) // 10 求最大值
}
 
foo(bar) 
// 这就形成了一个闭包，完全符合闭包的定义

2、实现bind函数：其作用是改变this的指向
// getName 的 this指向foo对象
let foo = {
  name: 'jill'
}
function getName () {
  console.log(this.name)
}
Function.prototype.myBind = function (obj) {
  // 将当前函数的this 指向目标对象
  let _self = this
  return function () {
    return _self.call(obj)
  }
}
 
let getFooName = getName.myBind(foo)
getFooName() // jill

3、异步循环调用
for (var i = 0; i < 2; i++) {
  (function (i) {
    setTimeout(() => {
      console.log(i)
    })
  })(i)
}
```
### js垃圾回收机制
```
由于字符串、对象和数组没有固定大小，当他们的大小已知时，才能对他们进行动态的存储分配。JavaScript程序每次创建字符串、数组或对象时，解释器都必须分配内存来存储那个实体。只要像这样动态地分配了内存，最终都要释放这些内存以便他们能够被再用，否则，JavaScript的解释器将会消耗完系统中所有可用的内存，造成系统崩溃。

现在各大浏览器通常用采用的垃圾回收有两种方法：标记清除、引用计数。

标记清除
这是javascript中最常用的垃圾回收方式。当变量进入执行环境是，就标记这个变量为“进入环境”。从逻辑上讲，永远不能释放进入环境的变量所占用的内存，因为只要执行流进入相应的环境，就可能会用到他们。当变量离开环境时，则将其标记为“离开环境”。

引用计数
　另一种不太常见的垃圾回收策略是引用计数。引用计数的含义是跟踪记录每个值被引用的次数。当声明了一个变量并将一个引用类型赋值给该变量时，则这个值的引用次数就是1。相反，如果包含对这个值引用的变量又取得了另外一个值，则这个值的引用次数就减1。当这个引用次数变成0时，则说明没有办法再访问这个值了，因而就可以将其所占的内存空间给收回来。这样，垃圾收集器下次再运行时，它就会释放那些引用次数为0的值所占的内存。
```
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
### 防抖与节流
```
        // 防抖函数 触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间
        // 应用场景：文本框输入搜索（连续输入时避免多次请求接口）
        function debounce(func, delay) {
            let timeout = null;
            return function () {
                if (timeout) {
                    clearTimeout(timeout)
                }
                timeout = setTimeout(()=> {
                    func.apply(this, arguments)
                }, delay)
            }

        }

        // 节流函数 就是在一段时间内，只执行一次 高频事件触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率
        // 应用场景：防重复提交等
        function throttle(func, delay) {
            let run = true;
            return function () {
                if (!run) {
                    return
                }
                run = false;
                // 弄清楚箭头函数和普通函数的中this的指向。
                setTimeout(()=> {
                    func.apply(this, arguments);
                    run = true;
                }, delay)
            }
        }
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

### Event Loop
```

```
