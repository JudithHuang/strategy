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

const bonus = calculateBonus(  'A' , 10000 );    // 输出：30000
console.log('performance level is A, salary is 10000, bonus', bonus);