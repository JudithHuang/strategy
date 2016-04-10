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

const bonusB = calculateBonus( 'B', 20000  );        // 输出：40000
const bonusS = calculateBonus( 'S', 6000 );        // 输出：24000

console.log('performance level is B, salary is 20000, bonus is', bonusB);
console.log('performance level is S, salary is 6000, bonus is', bonusS)