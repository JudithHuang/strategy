title: 策略模式&访问者模式
speaker: Judith Huang
url: https://github.com/judithhuang/strategy
transition: slide23
theme: dark
date: 2016年4月11日

[slide2]
# 策略模式&访问者模式
<small>演讲者：Judith Huang</small>

[slide2]
# 策略模式
----
定义：策略模式定义了一系列的算法，并将每一个算法封装起来，而且使它们还可以相互替换。策略模式让算法独立于使用它的客户而独立变化。

[slide2]
如果我们要去某个地方旅游， 可以根据具体的情况来选择出行的路线。

1. 如果没有时间但是不在乎钱，可以选择坐飞机。
2. 如果没有钱， 可以选择坐大巴或者火车。
3. 如果再穷一点， 可以选择骑自行车。

[slide2]
## 使用策略模式计算奖金{: &.text-left}
----
很多公司的年终奖是根据员工的工资基数和年底绩效情况来发放的。例如，绩效为S的人年终奖有4倍工资，绩效为A的人年终奖有3倍工资，而绩效为B的人年终奖是2倍工资。假设财务部要求我们提供一段代码，来方便他们计算员工的年终奖。

[slide2]
## 最初的代码实现
----
我们可以编写一个名为calculateBonus的函数来计算每个人的奖金数额。很显然，calculateBonus函数要正确工作，就需要接收两个参数：员工的工资数额和他的绩效考核等级。代码如下：
<pre>
  <code class="javascript">
    var calculateBonus = function( performanceLevel, salary ){
      if ( performanceLevel === 'S' ){
          return salary * 4;
      }

      if ( performanceLevel === 'A' ){
          return salary * 3;
      }

      if ( performanceLevel === 'B' ){
          return salary * 2;
      }
    };

    calculateBonus( 'B', 20000  );        // 输出：40000
    calculateBonus( 'S', 6000 );        // 输出：24000
  </code>
</pre>

[slide2]
可以发现，这段代码十分简单，但是存在着显而易见的缺点。

1. calculateBonus函数比较庞大，包含了很多if-else语句，这些语句需要覆盖所有的逻辑分支。

2. calculateBonus函数缺乏弹性，如果增加了一种新的绩效等级C，或者想把绩效S的奖金系数改为5，那我们必须深入calculateBonus函数的内部实现，这是违反开放-封闭原则的。

3. 算法复用性差，如果在程序的其他地方需要重用这些计算奖金的算法呢？我们的选择只有复制和粘贴。

因此，我们需要重构这段代码。

[slide2]
## 使用组合函数重构代码
----
一般最容易想到的办法就是使用组合函数来重构它，我们把各种算法封装到一个个的小函数里面，这些小函数有着良好的命名，可以一目了然地知道它对应着哪种算法，它们也可以被复用在程序的其他地方。代码如下：

[slide2]
<pre>
  <code class="javascript">
    var performanceS = function( salary ){
        return salary * 4;
    };

    var performanceA = function( salary ){
        return salary * 3;
    };

    var performanceB = function( salary ){
        return salary * 2;
    };

    var calculateBonus = function( performanceLevel, salary ){

        if ( performanceLevel === 'S' ){
            return performanceS( salary );
        }

        if ( performanceLevel === 'A' ){
            return performanceA( salary );
        }

        if ( performanceLevel === 'B' ){
            return performanceB( salary );
        }

    };

    calculateBonus(  'A' , 10000 );    // 输出：30000
  </code>
</pre>

[slide2]
## 使用策略模式重构代码
----
经过思考，我们想到了更好的办法——使用策略模式来重构代码。策略模式指的是定义一系列的算法，把它们一个个封装起来。将不变的部分和变化的部分隔开是每个设计模式的主题，策略模式也不例外，策略模式的目的就是将算法的使用与算法的实现分离开来。

在这个例子里，算法的使用方式是不变的，都是根据某个算法取得计算后的奖金数额。而算法的实现是各异和变化的，每种绩效对应着不同的计算规则。

[slide2]
一个基于策略模式的程序至少由两部分组成。第一个部分是一组策略类，策略类封装了具体的算法，并负责具体的计算过程。 第二个部分是环境类Context，Context接受客户的请求，随后把请求委托给某一个策略类。要做到这点，说明Context中要维持对某个策略对象的引用。

现在用策略模式来重构上面的代码。第一个版本是模仿传统面向对象语言中的实现。我们先把每种绩效的计算规则都封装在对应的策略类里面：

[slide2]
## JavaScript版本的策略模式
----
我们让strategy对象从各个策略类中创建而来， 这是模拟一些传统面向对象语言的实现。实际上在JavaScript语言中， 函数也是对象， 所以更简单直接的做法是把strategy直接定义为函数：
http://web.jobbole.com/83181/

[slide2]
## 访问者模式
----
定义： 表示一个作用于某对象结构中的各元素的操作。它使你可以在不改变各元素类的前提下定义作用于这些元素的新操作。

[slide2]
在js这种弱类型语言里，很多方法里都不做对象的类型检测，而是只关心这些对象能做什么。

Array构造器和String构造器的prototype上的方法就被特意设计成了访问者。这些方法不对this的数据类型做任何校验。这也就是为什么arguments能冒充array调用push方法.

[slide2]
v8引擎里面Array.prototype.push的代码:
<pre>
  <code class="JavaScript">
  function ArrayPush() {
    var n = TO_UINT32( this.length );
    var m = %_ArgumentsLength();
    for (var i = 0; i < m; i++) {
      this[i+n] = %_Arguments(i);    //属性拷贝
    }
    this.length = n + m;             //修正length
    return this.length;
  }
  </code>
</pre>

[slide2]
不过在代码的执行期，还是会受到一些隐式限制，在上面的例子很容易看出要求:

1、 this对象上面可储存属性. //反例: 值类型的数据

2、 this的length属性可写. //反例: functon对象, function有一个只读的length属性, 表示形参个数.

如果不符合这2条规则的话，代码在执行期会报错. 也就是说, Array.prototype.push.call( 1, ‘first’ )和Array.prototoype.push.call( function(){}, ‘first’ )都达不到预期的效果.

[slide2]
利用访问者，我们来做个有趣的事情. 给一个object对象增加push方法.
<pre>
<code class="JavaScript">
  var Visitor = {}
  Visitor .push  =  function(){
      return Array.prototype.push.apply( this, arguments );
  }
  var obj = {};
  obj.push = Visitor.push;
  obj.push( '"first" );
  console.log( obj[0] )  //"first"
  console.log( obj.length );  //1
</code>
</pre>
