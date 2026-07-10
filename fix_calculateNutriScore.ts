import fs from 'fs';

let content = fs.readFileSync('server.ts', 'utf8');

const oldFunc = `function calculateNutriScore(nutrients_per_100: any, category?: string, subCategory?: string): { nutriScore: number, grade: string, appScore: number } {
  const kcal = Number(nutrients_per_100.kcal) || 0;
  const energy_kJ = kcal * 4.184;
  const sugars_g = Number(nutrients_per_100.sugars_g) || 0;
  const saturated_fat_g = Number(nutrients_per_100.saturated_fat_g) || 0;
  const salt_g = Number(nutrients_per_100.salt_g) || 0;
  const fiber_g = Number(nutrients_per_100.fiber_g) || 0;
  const protein_g = Number(nutrients_per_100.protein_g) || 0;

  const isFatsOilsNuts = category === 'Pantry' && (subCategory?.toLowerCase().includes('oil') || subCategory?.toLowerCase().includes('nut') || subCategory?.toLowerCase().includes('seed') || subCategory?.toLowerCase().includes('fat') || subCategory?.toLowerCase().includes('butter'));
  const isRedMeat = subCategory?.toLowerCase().includes('meat') || subCategory?.toLowerCase().includes('beef') || subCategory?.toLowerCase().includes('pork');

  // 1. Calculate N Points
  let nPointsEnergy = Math.min(10, Math.floor(energy_kJ / 335));
  if (isFatsOilsNuts) {
    // Energy from saturates: sat fat * 37 kJ/g
    const energyFromSaturates = saturated_fat_g * 37;
    nPointsEnergy = Math.min(10, Math.floor(energyFromSaturates / 120));
  }

  const nPointsSugars = Math.min(15, Math.floor(sugars_g / 3.375));
  const nPointsSatFat = Math.min(10, Math.floor(saturated_fat_g / 1));
  const nPointsSodium = Math.min(20, Math.floor(salt_g / 0.225));
  const nPoints = nPointsEnergy + nPointsSugars + nPointsSatFat + nPointsSodium;

  // 2. Calculate P Points
  let pPointsFiber = 0;
  if (fiber_g > 7.5) pPointsFiber = 5;
  else if (fiber_g > 6.375) pPointsFiber = 4;
  else if (fiber_g > 5.25) pPointsFiber = 3;
  else if (fiber_g > 4.125) pPointsFiber = 2;
  else if (fiber_g > 3.0) pPointsFiber = 1;

  let pPointsProtein = 0;
  if (protein_g > 16.8) pPointsProtein = 7;
  else if (protein_g > 14.4) pPointsProtein = 6;
  else if (protein_g > 12.0) pPointsProtein = 5;
  else if (protein_g > 9.6) pPointsProtein = 4;
  else if (protein_g > 7.2) pPointsProtein = 3;
  else if (protein_g > 4.8) pPointsProtein = 2;
  else if (protein_g > 2.4) pPointsProtein = 1;

  if (isRedMeat) {
    pPointsProtein = Math.min(2, pPointsProtein);
  }

  // 3. Failsafe rule
  let pPoints = pPointsFiber + pPointsProtein;
  let proteinCap = isFatsOilsNuts ? 7 : 11;
  if (nPoints >= proteinCap) {
    pPoints = pPointsFiber; // Ignore protein points
  }

  // 4. Final Score & Grade
  const nutriScore = nPoints - pPoints;
  let grade = 'E';
  
  if (isFatsOilsNuts) {
    if (nutriScore <= -6) grade = 'A';
    else if (nutriScore <= 2) grade = 'B';
    else if (nutriScore <= 10) grade = 'C';
    else if (nutriScore <= 18) grade = 'D';
  } else {
    if (nutriScore <= 0) grade = 'A';
    else if (nutriScore <= 2) grade = 'B';
    else if (nutriScore <= 10) grade = 'C';
    else if (nutriScore <= 18) grade = 'D';
  }

  // 5. App Health Score (0-100)
  // Max possible nutriScore is roughly 10+15+10+20 = 55. Min is -15. Range is 70.
  let appScore = 100 - ((nutriScore + 15) / 70) * 100;
  appScore = Math.max(1, Math.min(100, Math.round(appScore)));

  return { nutriScore, grade, appScore };
}`;

const newFunc = `function calculateNutriScore(nutrients_per_100: any, category?: string, subCategory?: string): { nutriScore: number, grade: string, appScore: number } {
  const kcal = Number(nutrients_per_100.kcal) || 0;
  const energy_kJ = kcal * 4.184;
  const sugars_g = Number(nutrients_per_100.sugars_g) || 0;
  const saturated_fat_g = Number(nutrients_per_100.saturated_fat_g) || 0;
  const salt_g = Number(nutrients_per_100.salt_g) || 0;
  const fiber_g = Number(nutrients_per_100.fiber_g) || 0;
  const protein_g = Number(nutrients_per_100.protein_g) || 0;

  const isBeverage = category === 'Beverages' || subCategory?.toLowerCase().includes('drink') || subCategory?.toLowerCase().includes('beverage') || subCategory?.toLowerCase().includes('juice') || subCategory?.toLowerCase().includes('soda');
  const isFatsOilsNuts = category === 'Pantry' && (subCategory?.toLowerCase().includes('oil') || subCategory?.toLowerCase().includes('nut') || subCategory?.toLowerCase().includes('seed') || subCategory?.toLowerCase().includes('fat') || subCategory?.toLowerCase().includes('butter'));
  const isRedMeat = subCategory?.toLowerCase().includes('meat') || subCategory?.toLowerCase().includes('beef') || subCategory?.toLowerCase().includes('pork');

  function getPointsFromLimits(val: number, limits: number[]) {
    for (let i = 0; i < limits.length; i++) {
      if (val <= limits[i]) return i;
    }
    return limits.length;
  }

  // 1. Calculate N Points
  let nPointsEnergy = 0;
  let nPointsSugars = 0;
  
  if (isBeverage) {
    const beverageEnergyLimits = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270];
    const beverageSugarLimits = [0, 1.5, 3.0, 4.5, 6.0, 7.5, 9.0, 10.5, 12.0, 13.5];
    nPointsEnergy = getPointsFromLimits(energy_kJ, beverageEnergyLimits);
    nPointsSugars = getPointsFromLimits(sugars_g, beverageSugarLimits);
  } else {
    nPointsEnergy = Math.min(10, Math.floor(energy_kJ / 335));
    if (isFatsOilsNuts) {
      // Energy from saturates: sat fat * 37 kJ/g
      const energyFromSaturates = saturated_fat_g * 37;
      nPointsEnergy = Math.min(10, Math.floor(energyFromSaturates / 120));
    }
    const sugarLimits = [3.4, 6.8, 10, 14, 17, 20, 24, 27, 31, 34, 37, 41, 44, 48, 51];
    nPointsSugars = getPointsFromLimits(sugars_g, sugarLimits);
  }

  const nPointsSatFat = Math.min(10, Math.floor(saturated_fat_g / 1));
  const saltLimits = [0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4, 2.6, 2.8, 3.0, 3.2, 3.4, 3.6, 3.8, 4.0];
  const nPointsSodium = getPointsFromLimits(salt_g, saltLimits);
  const nPoints = nPointsEnergy + nPointsSugars + nPointsSatFat + nPointsSodium;

  // 2. Calculate P Points
  const fiberLimits = [3.0, 4.1, 5.2, 6.3, 7.4];
  let pPointsFiber = getPointsFromLimits(fiber_g, fiberLimits);

  const proteinLimits = [2.4, 4.8, 7.2, 9.6, 12, 14, 17];
  let pPointsProtein = getPointsFromLimits(protein_g, proteinLimits);

  if (isRedMeat) {
    pPointsProtein = Math.min(2, pPointsProtein);
  }

  // 3. Failsafe rule
  let pPoints = pPointsFiber + pPointsProtein;
  let proteinCap = isFatsOilsNuts ? 7 : 11;
  if (nPoints >= proteinCap) {
    pPoints = pPointsFiber; // Ignore protein points
  }

  // 4. Final Score & Grade
  const nutriScore = nPoints - pPoints;
  let grade = 'E';
  
  if (isBeverage) {
    if (nutriScore <= 1) grade = 'B';
    else if (nutriScore <= 5) grade = 'C';
    else if (nutriScore <= 9) grade = 'D';
    else grade = 'E';
  } else if (isFatsOilsNuts) {
    if (nutriScore <= -6) grade = 'A';
    else if (nutriScore <= 2) grade = 'B';
    else if (nutriScore <= 10) grade = 'C';
    else if (nutriScore <= 18) grade = 'D';
  } else {
    if (nutriScore <= 0) grade = 'A';
    else if (nutriScore <= 2) grade = 'B';
    else if (nutriScore <= 10) grade = 'C';
    else if (nutriScore <= 18) grade = 'D';
  }

  // 5. App Health Score (0-100)
  // Re-map according to the new limits so that bad products get very low scores.
  let maxScore = isBeverage ? 20 : 40;
  let minScore = isBeverage ? -10 : -15; // approximate bounds
  let range = maxScore - minScore;
  
  let appScore = 100 - ((nutriScore - minScore) / range) * 100;
  appScore = Math.max(1, Math.min(100, Math.round(appScore)));

  return { nutriScore, grade, appScore };
}`;

// Use standard string replacement if possible
if (content.includes('function calculateNutriScore')) {
    // we'll replace starting from the function to its end
    const startIdx = content.indexOf('function calculateNutriScore');
    const endIdx = content.indexOf('return { nutriScore, grade, appScore };', startIdx) + 'return { nutriScore, grade, appScore };\n}'.length;
    if (endIdx > startIdx && content.substring(startIdx, endIdx).includes('const kcal = Number(nutrients_per_100.kcal) || 0;')) {
        content = content.substring(0, startIdx) + newFunc + content.substring(endIdx);
    } else {
        console.error("Could not find exact function boundary");
        process.exit(1);
    }
}

fs.writeFileSync('server.ts', content);
