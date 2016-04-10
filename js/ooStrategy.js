/**
  现在用策略模式来重构上面的代码。第一个版本是模仿传统面向对象语言中的实现。
  我们先把每种绩效的计算规则都封装在对应的策略类里面
**/

/**
interface performance {
  static calculate(salary);
}

public class performanceS implements performance {
  public calculate(salary) {
    return salary * 4;
  }
}

public class performanceA implements performance {
  public calculate(salary) {
    return salary * 3;
  }
}
**/

// 定义策略对象
var performanceS = function() {};

performanceS.prototype.calculate = function(salary) {
    return salary * 4;
};

var performanceA = function() {};

performanceA.prototype.calculate = function(salary) {
    return salary * 3;
};

var performanceB = function() {};

performanceB.prototype.calculate = function(salary) {
    return salary * 2;
};

/**
var performanceC = function() {};

performanceC.prototype.calculate = function(salary) {
  return salary * 5;
}
**/

/**
  接下来定义奖金类Bonus
**/

var Bonus = function() {
    this.salary = null;        // 原始工资
    this.strategy = null;    // 绩效等级对应的策略对象
};

Bonus.prototype.setSalary = function(salary) {
    this.salary = salary;    //设置员工的原始工资
};

Bonus.prototype.setStrategy = function(strategy) {
    this.strategy = strategy;    // 设置员工绩效等级对应的策略对象
};

Bonus.prototype.getBonus = function() {    // 取得奖金数额
    return this.strategy.calculate(this.salary);    // 把计算奖金的操作委托给对应的策略对象
};

/**
  定义一系列的算法，把它们各自封装成策略类，算法被封装在策略类内部的方法里。
  在客户对Context发起请求的时候，Context总是把请求委托给这些策略对象中间的某一个进行计算。
**/

var bonus = new Bonus();

bonus.setSalary(10000);
bonus.setStrategy(new performanceS());  //设置策'performance level is S, salary is 10000, bonus is'

console.log('performance level is S, salary is 10000, bonus is', bonus.getBonus());    // 输出：40000

bonus.setStrategy(new performanceA());  //设置策略对象
console.log('performance level is A, salary is 10000, bonus is', bonus.getBonus());    // 输出：30000