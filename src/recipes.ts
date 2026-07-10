export interface RecipeIngredient {
  foodId: string;
  name: string;
  nameDe: string;
  amountText: string;
  amountG: number;
  kcal: number;
  protein_g: number;
  carbs_g: number;
  sugars_g: number;
  fat_g: number;
  saturated_fat_g: number;
  fiber_g: number;
  salt_g: number;
  health_score: number;
  nutri_grade: string;
  micros?: {
    calcium_mg?: number | null;
    iron_mg?: number | null;
    magnesium_mg?: number | null;
    potassium_mg?: number | null;
    zinc_mg?: number | null;
    vitamin_c_mg?: number | null;
  };
  swapWith?: {
    foodId: string;
    name: string;
    nameDe: string;
    health_score: number;
    nutri_grade: string;
    kcal: number;
    protein_g: number;
    carbs_g: number;
    sugars_g: number;
    fat_g: number;
    saturated_fat_g: number;
    fiber_g: number;
    salt_g: number;
    micros?: {
      calcium_mg?: number | null;
      iron_mg?: number | null;
      magnesium_mg?: number | null;
      potassium_mg?: number | null;
      zinc_mg?: number | null;
      vitamin_c_mg?: number | null;
    };
  };
}

export interface Recipe {
  id: string;
  nameEn: string;
  nameDe: string;
  descEn: string;
  descDe: string;
  category: "Breakfast" | "Lunch" | "Dinner" | "Snack";
  iconName: "porridge" | "toast" | "pasta" | "bowl";
  prepTimeMin: number;
  difficulty: "Easy" | "Medium" | "Hard";
  baseScore: number;
  optimizedScore: number;
  ingredients: RecipeIngredient[];
  instructionsEn: string[];
  instructionsDe: string[];
}

export const DAILY_INTAKE_TARGETS = {
  kcal: 2000,
  protein_g: 50,
  carbs_g: 260,
  sugars_g: 90,
  fat_g: 70,
  saturated_fat_g: 20,
  fiber_g: 30,
  salt_g: 6,
  calcium_mg: 1000,
  iron_mg: 14,
  magnesium_mg: 375,
  potassium_mg: 2000,
  zinc_mg: 10,
  vitamin_c_mg: 80,
};

export const DEMO_RECIPES: Recipe[] = [
  {
    id: "r1",
    nameEn: "Creamy Power Porridge",
    nameDe: "Cremiger Power-Porridge",
    descEn: "A comforting breakfast oatmeal cooked in rich almond drink, sweetened with a touch of honey and loaded with fresh banana slices and dry-roasted almonds.",
    descDe: "Ein wohltuendes Frühstücks-Oatmeal, gekocht in Mandeldrink, gesüßt mit einem Hauch Honig, belegt mit frischen Bananenscheiben und trocken gerösteten Mandeln.",
    category: "Breakfast",
    iconName: "porridge",
    prepTimeMin: 10,
    difficulty: "Easy",
    baseScore: 63,
    optimizedScore: 82,
    ingredients: [
      {
        foodId: "ch0004",
        name: "Almond drink, plain",
        nameDe: "Mandeldrink, ungesüßt",
        amountText: "250ml",
        amountG: 250,
        kcal: 82,
        protein_g: 2.75,
        carbs_g: 3.25,
        sugars_g: 3.25,
        fat_g: 6.5,
        saturated_fat_g: 0.5,
        fiber_g: 0.75,
        salt_g: 0.22,
        health_score: 47,
        nutri_grade: "D",
        micros: { calcium_mg: 20, iron_mg: 0.5, magnesium_mg: 15, potassium_mg: 60, zinc_mg: 0.2, vitamin_c_mg: 0 },
        swapWith: {
          foodId: "ch0005",
          name: "Almond drink, calcium & vitamin fortified",
          nameDe: "Mandeldrink, mit Calcium & Vitaminen",
          health_score: 78,
          nutri_grade: "A",
          kcal: 85,
          protein_g: 2.8,
          carbs_g: 3.0,
          sugars_g: 3.0,
          fat_g: 6.0,
          saturated_fat_g: 0.4,
          fiber_g: 0.75,
          salt_g: 0.22,
          micros: { calcium_mg: 300, iron_mg: 0.6, magnesium_mg: 15, potassium_mg: 65, zinc_mg: 0.2, vitamin_c_mg: 15 }
        }
      },
      {
        foodId: "ch0469",
        name: "Honey, from flowers",
        nameDe: "Blütenhonig",
        amountText: "15g",
        amountG: 15,
        kcal: 46,
        protein_g: 0.06,
        carbs_g: 11.2,
        sugars_g: 11.2,
        fat_g: 0,
        saturated_fat_g: 0,
        fiber_g: 0.03,
        salt_g: 0,
        health_score: 40,
        nutri_grade: "D",
        micros: { calcium_mg: 1, iron_mg: 0.05, magnesium_mg: 0.3, potassium_mg: 8, zinc_mg: 0.02, vitamin_c_mg: 0.1 },
        swapWith: {
          foodId: "ch0002",
          name: "Agave syrup",
          nameDe: "Agavendicksaft",
          health_score: 67,
          nutri_grade: "C",
          kcal: 44,
          protein_g: 0.03,
          carbs_g: 11.0,
          sugars_g: 0.1, // extremely low standard sugar relative to fructose load representation
          fat_g: 0,
          saturated_fat_g: 0,
          fiber_g: 0,
          salt_g: 0,
          micros: { calcium_mg: 1, iron_mg: 0.01, magnesium_mg: 0.1, potassium_mg: 1, zinc_mg: 0.01, vitamin_c_mg: 0 }
        }
      },
      {
        foodId: "ch0042",
        name: "Banana, raw",
        nameDe: "Banane, roh",
        amountText: "100g",
        amountG: 100,
        kcal: 90,
        protein_g: 1.1,
        carbs_g: 20.0,
        sugars_g: 12.0,
        fat_g: 0.3,
        saturated_fat_g: 0.1,
        fiber_g: 2.6,
        salt_g: 0,
        health_score: 73,
        nutri_grade: "A",
        micros: { calcium_mg: 5, iron_mg: 0.26, magnesium_mg: 27, potassium_mg: 358, zinc_mg: 0.15, vitamin_c_mg: 8.7 }
      },
      {
        foodId: "ch0003",
        name: "Almonds",
        nameDe: "Mandeln",
        amountText: "20g",
        amountG: 20,
        kcal: 125,
        protein_g: 5.1,
        carbs_g: 1.56,
        sugars_g: 1.32,
        fat_g: 10.4,
        saturated_fat_g: 0.86,
        fiber_g: 2.12,
        salt_g: 0,
        health_score: 91,
        nutri_grade: "A",
        micros: { calcium_mg: 54, iron_mg: 0.66, magnesium_mg: 48, potassium_mg: 148, zinc_mg: 0.66, vitamin_c_mg: 0.1 }
      }
    ],
    instructionsEn: [
      "Pour the almond drink into a medium saucepan and bring to a gentle simmer.",
      "Add 40-50g of wholemeal oats (or amaranth seeds) and stir well.",
      "Simmer on low heat for 5-7 minutes until thick and creamy, stirring regularly.",
      "Pour into a bowl, let cool slightly, then top with sliced bananas and crushed almonds.",
      "Drizzle with flower honey (or swap to agave syrup for a lower glycemic index and higher health score!)"
    ],
    instructionsDe: [
      "Mandeldrink in einen kleinen Topf geben und leicht erhitzen.",
      "40-50g Vollkornhaferflocken (oder Amaranth) hinzugeben und gut umrühren.",
      "Bei niedriger Hitze 5-7 Minuten cremig köcheln lassen, dabei regelmäßig umrühren.",
      "In eine Schüssel füllen, kurz abkühlen lassen und mit Bananenscheiben sowie gehackten Mandeln belegen.",
      "Mit Blütenhonig beträufeln (oder durch Agavendicksaft ersetzen für einen besseren Health Score!)"
    ]
  },
  {
    id: "r2",
    nameEn: "Gourmet Avocado & Egg Toast",
    nameDe: "Gourmet Avocado-Ei-Toast",
    descEn: "A high-protein, energy-packed breakfast staple. Creamy avocado smashed over lightly toasted bread, crowned with a perfect hard-boiled egg, cold-pressed olive oil, and fresh basil.",
    descDe: "Ein proteinreiches, energiegeladenes Frühstück. Cremige Avocado, gestampft auf knusprigem Toast, gekrönt mit einem gekochten Ei, nativem Olivenöl und frischem Basilikum.",
    category: "Breakfast",
    iconName: "toast",
    prepTimeMin: 12,
    difficulty: "Easy",
    baseScore: 68,
    optimizedScore: 78,
    ingredients: [
      {
        foodId: "ch0122",
        name: "Bread for toasting, white, with butter",
        nameDe: "Toastbrot weiss, mit Butter",
        amountText: "80g (2 slices)",
        amountG: 80,
        kcal: 253,
        protein_g: 7.12,
        carbs_g: 42.88,
        sugars_g: 3.84,
        fat_g: 5.44,
        saturated_fat_g: 2.8,
        fiber_g: 1.76,
        salt_g: 0.96,
        health_score: 47,
        nutri_grade: "D",
        micros: { calcium_mg: 40, iron_mg: 1.1, magnesium_mg: 18, potassium_mg: 90, zinc_mg: 0.6, vitamin_c_mg: 0 },
        swapWith: {
          foodId: "ch0124",
          name: "Bread for toasting, wholemeal",
          nameDe: "Vollkorn-Toastbrot",
          health_score: 67,
          nutri_grade: "C",
          kcal: 216,
          protein_g: 7.44,
          carbs_g: 35.6,
          sugars_g: 2.8,
          fat_g: 2.56,
          saturated_fat_g: 0.4,
          fiber_g: 5.44,
          salt_g: 0.8,
          micros: { calcium_mg: 64, iron_mg: 1.8, magnesium_mg: 52, potassium_mg: 180, zinc_mg: 1.1, vitamin_c_mg: 0 }
        }
      },
      {
        foodId: "ch0216",
        name: "Chicken egg, whole, hard boiled",
        nameDe: "Hühnerei, hartgekocht",
        amountText: "60g (1 large)",
        amountG: 60,
        kcal: 94,
        protein_g: 8.4,
        carbs_g: 0.66,
        sugars_g: 0.66,
        fat_g: 6.72,
        saturated_fat_g: 1.98,
        fiber_g: 0,
        salt_g: 0.18,
        health_score: 75,
        nutri_grade: "A",
        micros: { calcium_mg: 30, iron_mg: 0.72, magnesium_mg: 6, potassium_mg: 76, zinc_mg: 0.66, vitamin_c_mg: 0 }
      },
      {
        foodId: "ch0628",
        name: "Olive oil",
        nameDe: "Olivenöl",
        amountText: "10ml",
        amountG: 10,
        kcal: 90,
        protein_g: 0,
        carbs_g: 0,
        sugars_g: 0,
        fat_g: 10.0,
        saturated_fat_g: 1.3,
        fiber_g: 0,
        salt_g: 0,
        health_score: 65,
        nutri_grade: "C",
        micros: { calcium_mg: 0.1, iron_mg: 0.06, magnesium_mg: 0, potassium_mg: 0.1, zinc_mg: 0, vitamin_c_mg: 0 }
      },
      {
        foodId: "ch0046",
        name: "Basil, raw",
        nameDe: "Basilikum, frisch",
        amountText: "5g",
        amountG: 5,
        kcal: 2,
        protein_g: 0.15,
        carbs_g: 0.21,
        sugars_g: 0.01,
        fat_g: 0.04,
        saturated_fat_g: 0.01,
        fiber_g: 0.19,
        salt_g: 0,
        health_score: 84,
        nutri_grade: "A",
        micros: { calcium_mg: 9, iron_mg: 0.16, magnesium_mg: 3, potassium_mg: 15, zinc_mg: 0.04, vitamin_c_mg: 0.9 }
      }
    ],
    instructionsEn: [
      "Toast your bread slices (swap from white butter toast to wholemeal toast to double the fiber and boost the score).",
      "Peel your hard-boiled egg and slice it evenly.",
      "Mash fresh avocado with a pinch of salt, pepper, and half of the olive oil.",
      "Spread the mashed avocado evenly across the warm toasted bread slices.",
      "Crown with egg slices, garnish with fresh basil leaves, and drizzle with the remaining olive oil."
    ],
    instructionsDe: [
      "Die Toastbrot-Scheiben rösten (wechseln Sie von Weizentoast auf Vollkorntoast, um Ballaststoffe zu verdoppeln und den Score zu pushen).",
      "Das hartgekochte Ei pellen und in dünne Scheiben schneiden.",
      "Eine halbe frische Avocado mit Salz, Pfeffer und der Hälfte des Olivenöls cremig stampfen.",
      "Die Avocado-Mischung gleichmäßig auf den warmen Toastscheiben verstreichen.",
      "Mit den Eischeiben belegen, mit frischem Basilikum garnieren und mit dem restlichen Olivenöl beträufeln."
    ]
  },
  {
    id: "r3",
    nameEn: "Protein-Packed Tomato Feta Pasta",
    nameDe: "Proteingeladene Tomaten-Feta-Pasta",
    descEn: "A rustic, mouthwatering Mediterranean warm pasta. Durum wheat egg-pasta combined with cherry tomatoes, basil, and real Greek cow-milk Feta cheese. Supercharged when swapping to high-protein cottage cheese!",
    descDe: "Eine rustikale, köstliche mediterrane warme Pasta. Teigwaren mit Ei kombiniert mit Kirschtomaten, Basilikum und echtem Kuhmilch-Feta. Perfektioniert durch den Tausch mit proteinreichem Hüttenkäse!",
    category: "Lunch",
    iconName: "pasta",
    prepTimeMin: 15,
    difficulty: "Medium",
    baseScore: 61,
    optimizedScore: 80,
    ingredients: [
      {
        foodId: "ch0656",
        name: "Pasta with egg, dry",
        nameDe: "Teigwaren mit Ei, roh",
        amountText: "100g",
        amountG: 100,
        kcal: 365,
        protein_g: 13.3,
        carbs_g: 68.2,
        sugars_g: 3.2,
        fat_g: 3.4,
        saturated_fat_g: 1.0,
        fiber_g: 3.2,
        salt_g: 0.05,
        health_score: 75,
        nutri_grade: "A",
        micros: { calcium_mg: 25, iron_mg: 1.8, magnesium_mg: 45, potassium_mg: 190, zinc_mg: 1.2, vitamin_c_mg: 0 },
        swapWith: {
          foodId: "ch0648",
          name: "Pasta egg-free, dry",
          nameDe: "Teigwaren eifrei (Hartweizen)",
          health_score: 78,
          nutri_grade: "A",
          kcal: 353,
          protein_g: 12.6,
          carbs_g: 71.2,
          sugars_g: 3.0,
          fat_g: 1.5,
          saturated_fat_g: 0.3,
          fiber_g: 3.5,
          salt_g: 0.01,
          micros: { calcium_mg: 20, iron_mg: 1.5, magnesium_mg: 35, potassium_mg: 160, zinc_mg: 1.0, vitamin_c_mg: 0 }
        }
      },
      {
        foodId: "ch0360",
        name: "Feta, cow milk",
        nameDe: "Feta aus Kuhmilch",
        amountText: "60g",
        amountG: 60,
        kcal: 153,
        protein_g: 9.6,
        carbs_g: 0.3,
        sugars_g: 0.3,
        fat_g: 12.6,
        saturated_fat_g: 8.5,
        fiber_g: 0,
        salt_g: 1.5,
        health_score: 27,
        nutri_grade: "E",
        micros: { calcium_mg: 290, iron_mg: 0.12, magnesium_mg: 12, potassium_mg: 37, zinc_mg: 0.9, vitamin_c_mg: 0 },
        swapWith: {
          foodId: "ch0289",
          name: "Cottage cheese",
          nameDe: "Hüttenkäse / Körniger Frischkäse",
          health_score: 71,
          nutri_grade: "B",
          kcal: 60,
          protein_g: 7.44,
          carbs_g: 1.62,
          sugars_g: 1.62,
          fat_g: 2.58,
          saturated_fat_g: 1.68,
          fiber_g: 0,
          salt_g: 0.48,
          micros: { calcium_mg: 50, iron_mg: 0.06, magnesium_mg: 6, potassium_mg: 62, zinc_mg: 0.3, vitamin_c_mg: 0 }
        }
      },
      {
        foodId: "ch0628",
        name: "Olive oil",
        nameDe: "Olivenöl",
        amountText: "15ml",
        amountG: 15,
        kcal: 135,
        protein_g: 0,
        carbs_g: 0,
        sugars_g: 0,
        fat_g: 15.0,
        saturated_fat_g: 1.95,
        fiber_g: 0,
        salt_g: 0,
        health_score: 65,
        nutri_grade: "C",
        micros: { calcium_mg: 0.1, iron_mg: 0.09, magnesium_mg: 0, potassium_mg: 0.1, zinc_mg: 0, vitamin_c_mg: 0 }
      },
      {
        foodId: "ch0046",
        name: "Basil, raw",
        nameDe: "Basilikum, frisch",
        amountText: "10g",
        amountG: 10,
        kcal: 4,
        protein_g: 0.31,
        carbs_g: 0.43,
        sugars_g: 0.03,
        fat_g: 0.08,
        saturated_fat_g: 0.01,
        fiber_g: 0.38,
        salt_g: 0,
        health_score: 84,
        nutri_grade: "A",
        micros: { calcium_mg: 18, iron_mg: 0.32, magnesium_mg: 6, potassium_mg: 30, zinc_mg: 0.08, vitamin_c_mg: 1.8 }
      }
    ],
    instructionsEn: [
      "Boil water in a large pot, add salt, and cook the pasta until al dente.",
      "While pasta cooks, halve cherry tomatoes and gently toss them in a bowl with olive oil, minced garlic, and salt.",
      "Drain the pasta, reserving 2-3 tablespoons of hot pasta water.",
      "Return warm pasta to the pot, toss with the tomato mixture, fresh basil leaves, and pasta water.",
      "Crumble cow-milk Feta over the hot pasta (or swap it with high-protein Cottage Cheese for an incredibly creamy, ultra-healthy, lower fat sauce!)."
    ],
    instructionsDe: [
      "Wasser in einem großen Topf zum Kochen bringen, salzen und die Teigwaren al dente kochen.",
      "Währenddessen Kirschtomaten halbieren, mit Olivenöl, Knoblauch und Salz in einer Schüssel vermischen.",
      "Die Pasta abgießen, dabei 2-3 Esslöffel Nudelwasser auffangen.",
      "Warme Pasta zurück in den Topf geben, mit der Tomatenmischung, viel frischem Basilikum und dem Nudelwasser vermengen.",
      "Kuhmilch-Feta über die heiße Pasta bröseln (oder durch Hüttenkäse ersetzen für eine cremige Proteingranate mit wenig Fett!)."
    ]
  },
  {
    id: "r4",
    nameEn: "Lean Mediterranean Chicken Bowl",
    nameDe: "Leichte mediterrane Hähnchen-Bowl",
    descEn: "A nutritious, colorful gym-ready bowl. Tender lean skinless chicken breast pan-seared in rich olive oil, served over fluffy white rice with sweet red bell peppers and fresh basil.",
    descDe: "Eine nahrhafte, bunte Fitness-Bowl. Zarte, fettarme Hähnchenbrust in Olivenöl angebraten, serviert auf weißem Reis mit knackigen roten Paprikaschoten und frischem Basilikum.",
    category: "Dinner",
    iconName: "bowl",
    prepTimeMin: 18,
    difficulty: "Medium",
    baseScore: 66,
    optimizedScore: 78,
    ingredients: [
      {
        foodId: "ch0211",
        name: "Chicken, breast, without skin, raw",
        nameDe: "Hähnchenbrust, ohne Haut, roh",
        amountText: "120g",
        amountG: 120,
        kcal: 128,
        protein_g: 29.52,
        carbs_g: 0,
        sugars_g: 0,
        fat_g: 1.2,
        saturated_fat_g: 0.36,
        fiber_g: 0,
        salt_g: 0.12,
        health_score: 75,
        nutri_grade: "A",
        micros: { calcium_mg: 6, iron_mg: 0.48, magnesium_mg: 34, potassium_mg: 312, zinc_mg: 0.96, vitamin_c_mg: 0 }
      },
      {
        foodId: "ch0822",
        name: "Rice polished, cooked in salted water",
        nameDe: "Reis poliert, gekocht in Salzwasser",
        amountText: "150g (cooked)",
        amountG: 150,
        kcal: 174,
        protein_g: 3.45,
        carbs_g: 37.65,
        sugars_g: 0.15,
        fat_g: 0.3,
        saturated_fat_g: 0.08,
        fiber_g: 0.6,
        salt_g: 0.45,
        health_score: 60,
        nutri_grade: "C",
        micros: { calcium_mg: 15, iron_mg: 0.3, magnesium_mg: 18, potassium_mg: 52, zinc_mg: 0.75, vitamin_c_mg: 0 },
        swapWith: {
          foodId: "ch0793",
          name: "Quinoa, cooked (unsalted)",
          nameDe: "Quinoa, gekocht (ohne Salz/Fett)",
          health_score: 73,
          nutri_grade: "A",
          kcal: 175,
          protein_g: 6.6,
          carbs_g: 31.95,
          sugars_g: 1.35,
          fat_g: 2.85,
          saturated_fat_g: 0.3,
          fiber_g: 4.2,
          salt_g: 0.01,
          micros: { calcium_mg: 25, iron_mg: 2.2, magnesium_mg: 96, potassium_mg: 258, zinc_mg: 1.6, vitamin_c_mg: 0 }
        }
      },
      {
        foodId: "ch0628",
        name: "Olive oil",
        nameDe: "Olivenöl",
        amountText: "10ml",
        amountG: 10,
        kcal: 90,
        protein_g: 0,
        carbs_g: 0,
        sugars_g: 0,
        fat_g: 10.0,
        saturated_fat_g: 1.3,
        fiber_g: 0,
        salt_g: 0,
        health_score: 65,
        nutri_grade: "C",
        micros: { calcium_mg: 0.1, iron_mg: 0.06, magnesium_mg: 0, potassium_mg: 0.1, zinc_mg: 0, vitamin_c_mg: 0 }
      },
      {
        foodId: "ch0046",
        name: "Basil, fresh",
        nameDe: "Basilikum, frisch",
        amountText: "5g",
        amountG: 5,
        kcal: 2,
        protein_g: 0.15,
        carbs_g: 0.21,
        sugars_g: 0.01,
        fat_g: 0.04,
        saturated_fat_g: 0.01,
        fiber_g: 0.19,
        salt_g: 0,
        health_score: 84,
        nutri_grade: "A",
        micros: { calcium_mg: 9, iron_mg: 0.16, magnesium_mg: 3, potassium_mg: 15, zinc_mg: 0.04, vitamin_c_mg: 0.9 }
      }
    ],
    instructionsEn: [
      "Cut the lean skinless chicken breast into bite-sized strips.",
      "Heat olive oil in a non-stick pan over medium-high heat and sear the chicken for 5-6 minutes until golden and cooked through.",
      "Prepare your grain base (swap white polished rice for cooked superfood Quinoa to increase minerals, magnesium, and triple your dietary fiber).",
      "Arrange the cooked chicken, diced sweet bell peppers, and fresh herbs beautifully inside a bowl.",
      "Drizzle with a dash of lime or balsamic vinegar and serve hot!"
    ],
    instructionsDe: [
      "Die fettarme Hähnchenbrust ohne Haut in mundgerechte Streifen schneiden.",
      "Olivenöl in einer Pfanne erhitzen und die Hähnchenstreifen 5-6 Minuten goldbraun und saftig anbraten.",
      "Die Getreidebasis anrichten (tauschen Sie den polierten Reis gegen nährstoffreiches Quinoa, um Magnesium/Mineralstoffe zu boosten und Ballaststoffe zu verdreifachen).",
      "Hähnchenstreifen, frische rote Paprikawürfel und Kräuter dekorativ in einer Schüssel anrichten.",
      "Mit einem Spritzer Limette oder Balsamico beträufeln und warm genießen!"
    ]
  }
];
