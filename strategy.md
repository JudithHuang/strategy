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
- 定义：策略模式定义了一系列的算法，并将每一个算法封装起来，而且使它们还可以相互替换。策略模式让算法独立于使用它的客户而独立变化。

[slide2]
- 如果我们要去某个地方旅游， 可以根据具体的情况来选择出行的路线。

- 如果没有时间但是不在乎钱，可以选择坐飞机。
- 如果没有钱， 可以选择坐大巴或者火车。
- 如果再穷一点， 可以选择骑自行车。

[slide2]
## 使用策略模式计算奖金
----
- 很多公司的年终奖是根据员工的工资基数和年底绩效情况来发放的。例如，绩效为S的人年终奖有4倍工资，绩效为A的人年终奖有3倍工资，而绩效为B的人年终奖是2倍工资。假设财务部要求我们提供一段代码，来方便他们计算员工的年终奖。

[slide2]
## 最初的代码实现
----
- 我们可以编写一个名为calculateBonus的函数来计算每个人的奖金数额。很显然，calculateBonus函数要正确工作，就需要接收两个参数：员工的工资数额和他的绩效考核等级。代码如下：
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

- calculateBonus函数比较庞大，包含了很多if-else语句，这些语句需要覆盖所有的逻辑分支。

- calculateBonus函数缺乏弹性，如果增加了一种新的绩效等级C，或者想把绩效S的奖金系数改为5，那我们必须深入calculateBonus函数的内部实现，这是违反开放-封闭原则的。

- 算法复用性差，如果在程序的其他地方需要重用这些计算奖金的算法呢？我们的选择只有复制和粘贴。

- 因此，我们需要重构这段代码。

[slide2]
## 使用组合函数重构代码
----
- 一般最容易想到的办法就是使用组合函数来重构它，我们把各种算法封装到一个个的小函数里面，这些小函数有着良好的命名，可以一目了然地知道它对应着哪种算法，它们也可以被复用在程序的其他地方。代码如下：

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
- 经过思考，我们想到了更好的办法——使用策略模式来重构代码。策略模式指的是定义一系列的算法，把它们一个个封装起来。将不变的部分和变化的部分隔开是每个设计模式的主题，策略模式也不例外，策略模式的目的就是将算法的使用与算法的实现分离开来。

- 在这个例子里，算法的使用方式是不变的，都是根据某个算法取得计算后的奖金数额。而算法的实现是各异和变化的，每种绩效对应着不同的计算规则。

[slide2]
- 一个基于策略模式的程序至少由两部分组成。第一个部分是一组策略类，策略类封装了具体的算法，并负责具体的计算过程。 第二个部分是环境类Context，Context接受客户的请求，随后把请求委托给某一个策略类。要做到这点，说明Context中要维持对某个策略对象的引用。

- 现在用策略模式来重构上面的代码。第一个版本是模仿传统面向对象语言中的实现。我们先把每种绩效的计算规则都封装在对应的策略类里面：

[slide2]
## JavaScript版本的策略模式
----
- 我们让strategy对象从各个策略类中创建而来， 这是模拟一些传统面向对象语言的实现。实际上在JavaScript语言中， 函数也是对象， 所以更简单直接的做法是把strategy直接定义为函数

[slide2]
## 访问者模式
----
- 定义： 表示一个作用于某对象结构中的各元素的操作。它使你可以在不改变各元素类的前提下定义作用于这些元素的新操作。

[slide2]
## 优点
----
- 符合单一职责原则。<br />
- 优秀的扩展性。<br />
- 灵活性。

[slide2]
## 缺点
----
- 具体元素对访问者公布细节，违反了迪米特原则。<br />
- 具体元素变更比较困难。<br />
- 违反了依赖倒置原则，依赖了具体类，没有依赖抽象。

[slide2]
## 使用场景
----
- 对象结构中对象对应的类很少改变，但经常需要在此对象结构上定义新的操作。
- 需要对一个对象结构中的对象进行很多不同的并且不相关的操作，而需要避免让这些操作"污染"这些对象的类，也不希望在增加新操作时修改这些类。
- 注意事项：访问者可以对功能进行统一，可以做报表、UI、拦截器与过滤器。
