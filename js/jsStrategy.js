var strategies = {
  "S": function(salary) {
    return salary * 4;
  },
  "A": function(salary) {
    return salary * 3;
  },
  "B": function(salary) {
    return salary * 2;
  }
};

/**
  同样， Context也没有必要必须使用Bonus类来表示， 我们依然用calculateBonus函数充当Context来
  接受用户请求。经过改造， 代码的结构变得更加简洁
**/

var calculateBonus = function(level, salary) {
  return strategies[level](salary);
}

console.log('performance is B, salary is 10000,bonus is', calculateBonus('B', 10000));