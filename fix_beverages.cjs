const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/foods.json', 'utf8'));

function getPoints(val, limits) {
  for (let i = 0; i < limits.length; i++) {
    if (val <= limits[i]) return i;
  }
  return limits.length;
}

const beverageEnergyLimits = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270];
const beverageSugarLimits = [0, 1.5, 3.0, 4.5, 6.0, 7.5, 9.0, 10.5, 12.0, 13.5];

// Existing general limits
const energyLimits = [335, 670, 1005, 1340, 1675, 2010, 2345, 2680, 3015, 3350];
const sugarLimits = [3.4, 6.8, 10, 14, 17, 20, 24, 27, 31, 34, 37, 41, 44, 48, 51];
const satFatLimits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const saltLimits = [0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4, 2.6, 2.8, 3.0, 3.2, 3.4, 3.6, 3.8, 4.0];
const proteinLimits = [2.4, 4.8, 7.2, 9.6, 12, 14, 17];
const fiberLimits = [3.0, 4.1, 5.2, 6.3, 7.4];
const energySaturatesLimits = [120, 240, 360, 480, 600, 720, 840, 960, 1080, 1200];

function getSatFatRatioPoints(val) {
  if (val < 10) return 0;
  if (val < 16) return 1;
  if (val < 22) return 2;
  if (val < 28) return 3;
  if (val < 34) return 4;
  if (val < 40) return 5;
  if (val < 46) return 6;
  if (val < 52) return 7;
  if (val < 58) return 8;
  if (val < 64) return 9;
  return 10;
}

function getFVPoints(percent) {
  if (percent <= 40) return 0;
  if (percent <= 60) return 1;
  if (percent <= 80) return 2;
  return 5;
}

function getBeverageFVPoints(percent) {
  if (percent > 80) return 10;
  if (percent > 60) return 4;
  if (percent > 40) return 2;
  return 0;
}

for (let food of data) {
  const isMeat = food.swiss_category && food.swiss_category.toLowerCase().includes('meat');
  const isFatOilNutSeed = food.swiss_category && (
    food.swiss_category.includes('Nuts, seeds') ||
    food.swiss_category.includes('Fats and oils/Fats') ||
    food.swiss_category.includes('Fats and oils/Oils') ||
    food.swiss_category.includes('Fats and oils/Cream')
  );
  const isBeverage = food.category === 'Beverages';

  const n = food.nutrients_per_100 || {};
  const kcal = n.kcal || 0;
  let energyKJ = kcal * 4.184;
  let pointsA = 0;
  
  if (isBeverage) {
      if (food.name.toLowerCase().includes('water') && kcal === 0 && !n.sugars_g) {
          // Water gets special treatment: always A
          food.nutri_grade = 'A';
          food.health_score = 100;
          continue;
      }
      pointsA += getPoints(energyKJ, beverageEnergyLimits);
      pointsA += getPoints(n.sugars_g || 0, beverageSugarLimits);
  } else {
      if (isFatOilNutSeed) {
        let energyFromSat = (n.saturated_fat_g || 0) * 37;
        pointsA += getPoints(energyFromSat, energySaturatesLimits);
      } else {
        pointsA += getPoints(energyKJ, energyLimits);
      }
      pointsA += getPoints(n.sugars_g || 0, sugarLimits);
  }
  
  if (isFatOilNutSeed) {
    let ratio = n.fat_g ? ((n.saturated_fat_g || 0) / n.fat_g) * 100 : 0;
    pointsA += getSatFatRatioPoints(ratio);
  } else {
    pointsA += getPoints(n.saturated_fat_g || 0, satFatLimits);
  }
  
  pointsA += getPoints(n.salt_g || 0, saltLimits);

  let pointsC = 0;
  let fvPercent = 0;
  if (food.category === 'Produce') {
    if (!food.swiss_category || !food.swiss_category.includes('Nuts, seeds')) {
       fvPercent = 100;
    }
  }
  if (isBeverage && food.swiss_category && food.swiss_category.toLowerCase().includes('juice')) {
      fvPercent = 100;
  }

  let fvPoints = isBeverage ? getBeverageFVPoints(fvPercent) : getFVPoints(fvPercent);
  pointsC += fvPoints;
  
  pointsC += getPoints(n.fiber_g || 0, fiberLimits);
  
  let pPoints = getPoints(n.protein_g || 0, proteinLimits);
  if (isMeat) pPoints = Math.min(pPoints, 2);
  if (isFatOilNutSeed) pPoints = Math.min(pPoints, 7);

  pointsC += pPoints;
  
  let fns = 0;
  
  const isCheese = food.swiss_category && food.swiss_category.toLowerCase().includes('cheese');
  
  if (pointsA >= 11 && !isCheese) {
    fns = pointsA - (pointsC - pPoints);
  } else {
    fns = pointsA - pointsC;
  }
  
  let grade = 'E';
  if (isBeverage) {
      if (food.name.toLowerCase() === 'water') {
         grade = 'A';
      } else if (fns <= 1) {
          grade = 'B';
      } else if (fns <= 5) {
          grade = 'C';
      } else if (fns <= 9) {
          grade = 'D';
      } else {
          grade = 'E';
      }
  } else if (isFatOilNutSeed) {
    if (fns <= -6) grade = 'A';
    else if (fns <= 2) grade = 'B';
    else if (fns <= 10) grade = 'C';
    else if (fns <= 18) grade = 'D';
    else grade = 'E';
  } else {
    if (fns <= 0) grade = 'A';
    else if (fns <= 2) grade = 'B';
    else if (fns <= 10) grade = 'C';
    else if (fns <= 18) grade = 'D';
    else grade = 'E';
  }
  
  food.nutri_grade = grade;

  // Let's map grade to health_score for UI compatibility
  let maxScore = isBeverage ? 20 : 40;
  let minScore = isBeverage ? -10 : -15; // approximate bounds
  let range = maxScore - minScore;
  
  let calculatedHealth = Math.round(100 - ((fns - minScore) / range) * 100);
  calculatedHealth = Math.max(1, Math.min(100, calculatedHealth));
  
  food.health_score = calculatedHealth;
}

fs.writeFileSync('src/foods.json', JSON.stringify(data, null, 2));
