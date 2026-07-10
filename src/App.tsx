import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "motion/react";
import {
  Sun,
  Moon,
  Smartphone,
  Eye,
  User,
  Activity,
  Home,
  Search,
  ArrowLeftRight,
  ChevronRight,
  X,
  Check,
  Sparkles,
  Flame,
  Apple,
  Info,
  TrendingUp,
  Receipt,
  ScanLine,
  Camera,
  ArrowRight,
  ChevronDown,
  Settings2,
  FileImage,
  ArrowLeft, Filter, SlidersHorizontal, ChevronUp,
  AlertTriangle,
  ExternalLink,
  Trash2,
  Heart,
  Beef,
  Pizza,
  Cherry,
  Banana,
  Grape,
  Citrus,
  Carrot,
  Salad,
  Soup,
  CakeSlice,
  Cake,
  Cookie,
  Candy,
  IceCream,
  Milk,
  Coffee,
  CupSoda,
  GlassWater,
  Wine,
  Beer,
  Drumstick,
  Fish,
  Egg,
  Croissant,
  Utensils,
  Package,
  Leaf,
  Sprout,
  Wheat,
  Bean,
  Clock,
  Dumbbell,
  Award,
  Shuffle
} from "lucide-react";
import { FOODS, CATEGORIES, getNutriGradeDetails } from "./data";
import { Food } from "./types";
import { DEMO_RECIPES, Recipe, RecipeIngredient, DAILY_INTAKE_TARGETS } from "./recipes";

// Helper for haptic vibration feedback
const triggerHaptic = () => {
  if (typeof navigator !== "undefined" && navigator.vibrate) {
    try {
      navigator.vibrate(10);
    } catch (err) {
      // Ignore vibration failures if blocked by browser policies
    }
  }
};

// Colors scheme helper for health scores
const getScoreColors = (score: number) => {
  if (score >= 80) {
    return {
      text: "text-[#3B7A32] dark:text-emerald-400",
      darkText: "text-[#2F7E41] dark:text-emerald-300",
      bg: "bg-[#EAF3EB] dark:bg-emerald-950/40",
      border: "border-[#CDE5CE] dark:border-emerald-900/50",
      stroke: "#519D46", // Toned green like at the top (not neon green)
      glow: "shadow-emerald-100 dark:shadow-emerald-950/20"
    };
  } else if (score >= 60) {
    return {
      text: "text-lime-600 dark:text-lime-400",
      darkText: "text-lime-800 dark:text-lime-300",
      bg: "bg-lime-50 dark:bg-lime-950/40",
      border: "border-lime-200 dark:border-lime-900/50",
      stroke: "#84CC16", // Lime-500
      glow: "shadow-lime-100 dark:shadow-lime-950/20"
    };
  } else if (score >= 40) {
    return {
      text: "text-amber-500 dark:text-amber-400",
      darkText: "text-amber-700 dark:text-amber-300",
      bg: "bg-amber-50 dark:bg-amber-950/40",
      border: "border-amber-200 dark:border-amber-900/50",
      stroke: "#F59E0B", // Amber-500
      glow: "shadow-amber-100 dark:shadow-amber-950/20"
    };
  } else {
    return {
      text: "text-rose-500 dark:text-rose-400",
      darkText: "text-rose-700 dark:text-rose-300",
      bg: "bg-rose-50 dark:bg-rose-950/40",
      border: "border-rose-200 dark:border-rose-900/50",
      stroke: "#EF4444", // Red-500
      glow: "shadow-rose-100 dark:shadow-rose-950/20"
    };
  }
};


const getFoodIconComponent = (food: Food) => {
  if (!food) return Apple;
  const name = (food.name || "").toLowerCase();
  const cat = (food.category || "").toLowerCase();
  const subCat = (food.subCategory || "").toLowerCase();
  const swissCat = (food.swiss_category || "").toLowerCase();

  // 1. BEVERAGES
  if (
    cat.includes("beverage") || 
    cat.includes("getränk") || 
    subCat.includes("drink") || 
    subCat.includes("beverage") || 
    swissCat.includes("beverage") ||
    swissCat.includes("getränk") ||
    name.includes("drink")
  ) {
    if (name.includes("coffee") || name.includes("kaffee") || name.includes("espresso") || name.includes("cappuccino") || name.includes("latte") || name.includes("macchiato")) return Coffee;
    if (name.includes("tea") || name.includes("tee") || name.includes("chai") || name.includes("matcha")) return Coffee;
    if (name.includes("cocoa") || name.includes("kakao") || name.includes("hot chocolate")) return Coffee;
    if (name.includes("milk") || name.includes("milch") || name.includes("shake") || name.includes("smoothie") || name.includes("lassi") || name.includes("buttermilch")) return Milk;
    if (name.includes("wine") || name.includes("wein") || name.includes("prosecco") || name.includes("champagne") || name.includes("cider") || name.includes("most")) return Wine;
    if (name.includes("beer") || name.includes("bier") || name.includes("ale") || name.includes("lager")) return Beer;
    if (name.includes("water") || name.includes("wasser") || name.includes("sidi ali") || name.includes("mineral")) return GlassWater;
    if (
      name.includes("juice") || 
      name.includes("saft") || 
      name.includes("cola") || 
      name.includes("soda") || 
      name.includes("lemonade") || 
      name.includes("limonade") || 
      name.includes("fanta") || 
      name.includes("sprite") || 
      name.includes("sirup") || 
      name.includes("syrup")
    ) return CupSoda;
    return GlassWater;
  }

  // 2. FRUITS, VEGETABLES, NUTS, SEEDS & LEGUMES
  if (
    cat.includes("produce") || 
    cat.includes("frische") || 
    swissCat.includes("vegetable") || 
    swissCat.includes("fruit") || 
    swissCat.includes("gemüse") || 
    swissCat.includes("obst") || 
    swissCat.includes("nut") || 
    swissCat.includes("seed") || 
    swissCat.includes("legume") ||
    swissCat.includes("nuss") ||
    swissCat.includes("samen") ||
    swissCat.includes("hülse") ||
    name.includes("fruit") || 
    name.includes("gemüse") ||
    name.includes("obst")
  ) {
    // Fruits
    if (name.includes("apple") || name.includes("apfel") || name.includes("pear") || name.includes("birne") || name.includes("quince") || name.includes("quitte")) return Apple;
    if (name.includes("banana") || name.includes("banane")) return Banana;
    if (name.includes("grape") || name.includes("traube") || name.includes("rosine") || name.includes("raisin") || name.includes("trauben")) return Grape;
    if (
      name.includes("orange") || 
      name.includes("lemon") || 
      name.includes("citrus") || 
      name.includes("limette") || 
      name.includes("zitrone") || 
      name.includes("grapefruit") || 
      name.includes("mandarin") || 
      name.includes("clementine") ||
      name.includes("pineapple") ||
      name.includes("ananas") ||
      name.includes("mango") ||
      name.includes("kiwi") ||
      name.includes("passionfruit") ||
      name.includes("melon") ||
      name.includes("melone")
    ) return Citrus;
    if (
      name.includes("cherry") || 
      name.includes("kirsche") || 
      name.includes("kirschen") ||
      name.includes("strawberry") || 
      name.includes("erdbeere") || 
      name.includes("berry") || 
      name.includes("beere") || 
      name.includes("heidelbeere") || 
      name.includes("blaubeere") || 
      name.includes("erdbeeren") ||
      name.includes("raspberry") ||
      name.includes("himbeere") ||
      name.includes("blackberry") ||
      name.includes("brombeere") ||
      name.includes("currant") ||
      name.includes("plum") ||
      name.includes("pflaume") ||
      name.includes("apricot") ||
      name.includes("aprikose") ||
      name.includes("peach") ||
      name.includes("pfirsich") ||
      name.includes("nectarine") ||
      name.includes("fig") ||
      name.includes("feige") ||
      name.includes("date") ||
      name.includes("dattel")
    ) return Cherry;

    // Vegetables
    if (name.includes("carrot") || name.includes("karotte") || name.includes("rübli") || name.includes("karotten") || name.includes("radish") || name.includes("rettich") || name.includes("beet") || name.includes("rande") || name.includes("turnip") || name.includes("parsnip")) return Carrot;
    if (
      name.includes("salad") || 
      name.includes("salat") || 
      name.includes("spinat") || 
      name.includes("spinach") || 
      name.includes("lettuce") ||
      name.includes("cabbage") ||
      name.includes("kohl") ||
      name.includes("kale") ||
      name.includes("chard") ||
      name.includes("mangold") ||
      name.includes("herb") ||
      name.includes("kräuter") ||
      name.includes("parsley") ||
      name.includes("peterli") ||
      name.includes("basil") ||
      name.includes("basilikum")
    ) return Salad;
    if (name.includes("tomato") || name.includes("tomate") || name.includes("tomaten") || name.includes("pepper") || name.includes("paprika") || name.includes("peperoni") || name.includes("chili")) return Cherry;
    if (
      name.includes("avocado") || 
      name.includes("zucchini") || 
      name.includes("courgette") || 
      name.includes("cucumber") || 
      name.includes("gurke") ||
      name.includes("squash") ||
      name.includes("pumpkin") ||
      name.includes("kürbis") ||
      name.includes("aubergine") ||
      name.includes("eggplant") ||
      name.includes("broccoli") ||
      name.includes("cauliflower") ||
      name.includes("blumenkohl") ||
      name.includes("onion") ||
      name.includes("zwiebel") ||
      name.includes("garlic") ||
      name.includes("knoblauch") ||
      name.includes("leek") ||
      name.includes("lauch") ||
      name.includes("mushroom") ||
      name.includes("pilz") ||
      name.includes("champignon")
    ) return Sprout;
    if (name.includes("potato") || name.includes("kartoffel") || name.includes("süßkartoffel")) return Bean;

    // Nuts, Seeds & Legumes
    if (
      name.includes("almond") || 
      name.includes("mandel") || 
      name.includes("walnut") || 
      name.includes("walnuss") || 
      name.includes("hazelnut") || 
      name.includes("haselnuss") || 
      name.includes("cashew") || 
      name.includes("pistachio") || 
      name.includes("pistazie") || 
      name.includes("peanut") || 
      name.includes("erdnuss") || 
      name.includes("chestnut") || 
      name.includes("kastanie") || 
      name.includes("nut") || 
      name.includes("nuss") ||
      name.includes("seed") || 
      name.includes("samen") || 
      name.includes("sunflower") || 
      name.includes("sonnenblume") || 
      name.includes("pumpkin seed") || 
      name.includes("kürbiskern") || 
      name.includes("chia") || 
      name.includes("flax") || 
      name.includes("leinsamen") || 
      name.includes("sesame") || 
      name.includes("sesam")
    ) return Bean;

    if (
      name.includes("bean") || 
      name.includes("bohne") || 
      name.includes("pea") || 
      name.includes("erbse") || 
      name.includes("lentil") || 
      name.includes("linse") || 
      name.includes("chickpea") || 
      name.includes("kichererbse") || 
      name.includes("soy") || 
      name.includes("soja") || 
      name.includes("tofu") || 
      name.includes("tempeh") || 
      name.includes("edamame")
    ) return Bean;

    return Leaf;
  }

  // 3. DAIRY & EGGS
  if (
    cat.includes("dairy") || 
    cat.includes("milch") || 
    swissCat.includes("dairy") || 
    swissCat.includes("milk") || 
    swissCat.includes("cheese") || 
    swissCat.includes("egg") || 
    swissCat.includes("milchprodukte") ||
    swissCat.includes("käse")
  ) {
    if (name.includes("egg") || name.includes("ei") || name.includes("eier") || name.includes("omelett")) return Egg;
    if (
      name.includes("cheese") || 
      name.includes("käse") || 
      name.includes("mozzarella") || 
      name.includes("parmesan") || 
      name.includes("cheddar") || 
      name.includes("feta") || 
      name.includes("ricotta") || 
      name.includes("fondue") || 
      name.includes("raclette")
    ) return Milk;
    if (name.includes("yogurt") || name.includes("joghurt") || name.includes("quark") || name.includes("skyr") || name.includes("yoghurt")) return Milk;
    if (name.includes("butter") || name.includes("margarine") || name.includes("cream") || name.includes("rahm")) return Milk;
    return Milk;
  }

  // 4. BAKERY, BREAD, GRAINS, PASTA & CEREALS
  if (
    swissCat.includes("bakery") || 
    swissCat.includes("bread") || 
    swissCat.includes("cereal") || 
    swissCat.includes("grain") ||
    swissCat.includes("brot") ||
    swissCat.includes("getreide") ||
    swissCat.includes("teigwaren") ||
    subCat.includes("bakery") || 
    subCat.includes("bread") || 
    name.includes("bread") || 
    name.includes("brot") || 
    name.includes("gipfel") || 
    name.includes("croissant") || 
    name.includes("pasta") || 
    name.includes("nudeln") || 
    name.includes("spaghetti") || 
    name.includes("rice") || 
    name.includes("reis") || 
    name.includes("hafer") || 
    name.includes("oat") || 
    name.includes("grain") || 
    name.includes("mehl") || 
    name.includes("flocken") ||
    name.includes("wheat") ||
    name.includes("weizen") ||
    name.includes("flour") ||
    name.includes("muesli") ||
    name.includes("müsli") ||
    name.includes("granola")
  ) {
    if (name.includes("croissant") || name.includes("gipfel") || name.includes("brioche") || name.includes("pastry") || name.includes("danish")) return Croissant;
    if (
      name.includes("pasta") || 
      name.includes("nudeln") || 
      name.includes("spaghetti") || 
      name.includes("lasagne") || 
      name.includes("macaroni") || 
      name.includes("penne") || 
      name.includes("ravioli") || 
      name.includes("tortellini")
    ) return Wheat;
    if (name.includes("rice") || name.includes("reis") || name.includes("risotto")) return Wheat;
    if (name.includes("bread") || name.includes("brot") || name.includes("toast") || name.includes("baguette") || name.includes("loaf") || name.includes("bun") || name.includes("roll") || name.includes("bagel") || name.includes("ciabatta")) return Wheat;
    if (
      name.includes("cereal") || 
      name.includes("muesli") || 
      name.includes("müsli") || 
      name.includes("granola") || 
      name.includes("flake") || 
      name.includes("hafer") || 
      name.includes("oat") || 
      name.includes("barley") || 
      name.includes("rye") || 
      name.includes("spelt") || 
      name.includes("dinkel") || 
      name.includes("cornflake")
    ) return Wheat;
    if (name.includes("flour") || name.includes("mehl") || name.includes("starch") || name.includes("grieß") || name.includes("semolina") || name.includes("dough") || name.includes("teig")) return Wheat;
    return Wheat;
  }

  // 5. MEAT, FISH, POULTRY & SEAFOOD
  if (
    swissCat.includes("meat") || 
    swissCat.includes("fish") || 
    swissCat.includes("poultry") || 
    swissCat.includes("seafood") || 
    swissCat.includes("fleisch") ||
    swissCat.includes("fisch") ||
    swissCat.includes("geflügel") ||
    name.includes("beef") || 
    name.includes("meat") || 
    name.includes("fleisch") || 
    name.includes("chicken") || 
    name.includes("huhn") || 
    name.includes("poulet") || 
    name.includes("schwein") || 
    name.includes("pork") || 
    name.includes("ham") || 
    name.includes("schinken") || 
    name.includes("sausage") || 
    name.includes("wurst") || 
    name.includes("fish") || 
    name.includes("fisch") || 
    name.includes("lachs") || 
    name.includes("salmon") || 
    name.includes("tuna") || 
    name.includes("thunfisch") || 
    name.includes("rind") || 
    name.includes("kalb") || 
    name.includes("steak") || 
    name.includes("salami") || 
    name.includes("prosciutto") ||
    name.includes("seafood") ||
    name.includes("shrimp") ||
    name.includes("prawn") ||
    name.includes("lobster") ||
    name.includes("crab")
  ) {
    if (
      name.includes("fish") || 
      name.includes("fisch") || 
      name.includes("lachs") || 
      name.includes("salmon") || 
      name.includes("tuna") || 
      name.includes("thunfisch") || 
      name.includes("trout") || 
      name.includes("forelle") || 
      name.includes("cod") || 
      name.includes("seafood") || 
      name.includes("shrimp") || 
      name.includes("crevette") || 
      name.includes("prawn") || 
      name.includes("lobster") || 
      name.includes("crab") || 
      name.includes("mussel") || 
      name.includes("muschel")
    ) return Fish;
    if (
      name.includes("chicken") || 
      name.includes("poulet") || 
      name.includes("huhn") || 
      name.includes("hühnchen") || 
      name.includes("turkey") || 
      name.includes("truthahn") || 
      name.includes("duck") || 
      name.includes("ente") || 
      name.includes("drumstick") || 
      name.includes("wing") || 
      name.includes("nugget")
    ) return Drumstick;
    if (name.includes("pork") || name.includes("schwein") || name.includes("ham") || name.includes("schinken") || name.includes("bacon") || name.includes("speck") || name.includes("lard")) return Beef;
    return Beef;
  }

  // 6. SWEETS, SNACKS & DESSERTS
  if (
    cat.includes("snack") || 
    cat.includes("sweet") || 
    swissCat.includes("sweet") || 
    swissCat.includes("sugar") || 
    swissCat.includes("chocolate") || 
    swissCat.includes("biscuit") || 
    swissCat.includes("süß") ||
    swissCat.includes("schokolade") ||
    swissCat.includes("knabberzeug") ||
    name.includes("chocolate") || 
    name.includes("schokolade") || 
    name.includes("süß") ||
    name.includes("sweet") ||
    name.includes("snack")
  ) {
    if (name.includes("chocolate") || name.includes("schokolade") || name.includes("praline") || name.includes("truffle")) return Candy;
    if (
      name.includes("cookie") || 
      name.includes("keks") || 
      name.includes("biscuit") || 
      name.includes("biskuit") || 
      name.includes("plätzchen") || 
      name.includes("cracker") || 
      name.includes("pretzel") || 
      name.includes("brezel") || 
      name.includes("chips") || 
      name.includes("popcorn")
    ) return Cookie;
    if (name.includes("ice cream") || name.includes("glace") || name.includes("eis") || name.includes("sorbet") || name.includes("gelato")) return IceCream;
    if (
      name.includes("cake") || 
      name.includes("kuchen") || 
      name.includes("torte") || 
      name.includes("pie") || 
      name.includes("wähe") || 
      name.includes("muffin") || 
      name.includes("cupcake") || 
      name.includes("brownie") || 
      name.includes("donut") || 
      name.includes("waffle") || 
      name.includes("pancake") || 
      name.includes("crepe")
    ) return CakeSlice;
    if (
      name.includes("candy") || 
      name.includes("bonbon") || 
      name.includes("gummi") || 
      name.includes("jelly") || 
      name.includes("marshmallow") || 
      name.includes("lollipop") || 
      name.includes("caramel") || 
      name.includes("honey") || 
      name.includes("honig") || 
      name.includes("sugar") || 
      name.includes("zucker")
    ) return Candy;
    return Cookie;
  }

  // 7. PANTRY, SOUPS, SAUCES & MISCELLANEOUS
  if (name.includes("soup") || name.includes("suppe") || name.includes("stew") || name.includes("eintopf") || name.includes("broth") || name.includes("brühe") || name.includes("bouillon") || name.includes("ramen")) return Soup;
  if (name.includes("pizza")) return Pizza;
  if (name.includes("burger") || name.includes("patty")) return Beef;
  if (
    name.includes("sauce") || 
    name.includes("dressing") || 
    name.includes("dip") || 
    name.includes("ketchup") || 
    name.includes("mustard") || 
    name.includes("senf") || 
    name.includes("mayonnaise") || 
    name.includes("pesto") || 
    name.includes("salsa") || 
    name.includes("hummus") || 
    name.includes("guacamole")
  ) return Soup;
  if (name.includes("oil") || name.includes("öl") || name.includes("vinegar") || name.includes("essig")) return GlassWater;
  if (
    name.includes("salt") || 
    name.includes("salz") || 
    name.includes("pepper") || 
    name.includes("pfeffer") || 
    name.includes("spice") || 
    name.includes("gewürz") || 
    name.includes("curry") || 
    name.includes("cinnamon") || 
    name.includes("zimt")
  ) return Sprout;

  // 8. FINAL CATEGORY FALLBACKS
  if (cat.includes("produce") || swissCat.includes("produce") || swissCat.includes("vegetables") || swissCat.includes("fruit")) return Leaf;
  if (cat.includes("dairy") || swissCat.includes("dairy")) return Milk;
  if (cat.includes("beverage") || swissCat.includes("beverage")) return GlassWater;
  if (cat.includes("snack") || swissCat.includes("sweet") || cat.includes("sweet")) return Cookie;

  return Package;
};

const FoodIcon = ({ food, className = "w-5 h-5" }: { food: Food; className?: string }) => {
  const IconComponent = getFoodIconComponent(food);
  return <IconComponent className={className} />;
};


const getMacroDV = (macroName: string, amount: number) => {
  const standards: Record<string, number> = {
    kcal: 2000,
    protein_g: 50,
    carbs_g: 275,
    fiber_g: 28,
    sugars_g: 50,
    fat_g: 78,
    saturated_fat_g: 20,
    salt_g: 6 
  };
  const standard = standards[macroName] || 100;
  return Math.round((amount / standard) * 100);
};

const isBetterNutrient = (macroName: string, fromVal: number, toVal: number) => {
  if (macroName === 'protein_g' || macroName === 'fiber_g') {
    return toVal >= fromVal;
  }
  return toVal <= fromVal;
};

const MICRONUTRIENTS_LIST = [
  {
    id: 'vitamin_a_ug',
    nameEn: 'Vitamin A',
    nameDe: 'Vitamin A',
    descEn: 'Supports vision, immune function, and skin health',
    descDe: 'Unterstützt Sehkraft, Immunsystem und Haut',
    target: '900 µg'
  },
  {
    id: 'betacarotene_ug',
    nameEn: 'Beta-Carotene',
    nameDe: 'Beta-Carotin',
    descEn: 'Antioxidant precursor to Vitamin A',
    descDe: 'Antioxidative Vorstufe von Vitamin A',
    target: '4800 µg'
  },
  {
    id: 'vitamin_b1_mg',
    nameEn: 'Vitamin B1 (Thiamine)',
    nameDe: 'Vitamin B1 (Thiamin)',
    descEn: 'Enables energy metabolism and nerve function',
    descDe: 'Unterstützt Energiestoffwechsel und Nerven',
    target: '1.2 mg'
  },
  {
    id: 'vitamin_b2_mg',
    nameEn: 'Vitamin B2 (Riboflavin)',
    nameDe: 'Vitamin B2 (Riboflavin)',
    descEn: 'Critical for energy production and cellular function',
    descDe: 'Wichtig für Energiegewinnung und Zellen',
    target: '1.3 mg'
  },
  {
    id: 'vitamin_b6_mg',
    nameEn: 'Vitamin B6 (Pyridoxine)',
    nameDe: 'Vitamin B6 (Pyridoxin)',
    descEn: 'Aids protein metabolism and red blood cell creation',
    descDe: 'Hilft beim Eiweißstoffwechsel und der Blutbildung',
    target: '1.7 mg'
  },
  {
    id: 'vitamin_b12_ug',
    nameEn: 'Vitamin B12 (Cobalamin)',
    nameDe: 'Vitamin B12 (Cobalamin)',
    descEn: 'Essential for brain function and DNA synthesis',
    descDe: 'Essentiell für Nerven und DNA-Synthese',
    target: '2.4 µg'
  },
  {
    id: 'niacin_mg',
    nameEn: 'Niacin (Vitamin B3)',
    nameDe: 'Niacin (Vitamin B3)',
    descEn: 'Supports digestion, skin, and nervous system',
    descDe: 'Unterstützt Verdauung, Haut und Nerven',
    target: '16 mg'
  },
  {
    id: 'folate_ug',
    nameEn: 'Folate (Vitamin B9)',
    nameDe: 'Folsäure (Vitamin B9)',
    descEn: 'Key for cell division and DNA replication',
    descDe: 'Wichtig für Zellteilung und Blutbildung',
    target: '400 µg'
  },
  {
    id: 'pantothenic_acid_mg',
    nameEn: 'Pantothenic Acid (B5)',
    nameDe: 'Pantothensäure (B5)',
    descEn: 'Necessary for synthesizing coenzyme A',
    descDe: 'Wichtig für den Energiestoffwechsel',
    target: '5 mg'
  },
  {
    id: 'vitamin_c_mg',
    nameEn: 'Vitamin C',
    nameDe: 'Vitamin C',
    descEn: 'Powerful antioxidant, boosts immune function',
    descDe: 'Starkes Antioxidans, stärkt Abwehrkräfte',
    target: '90 mg'
  },
  {
    id: 'vitamin_d_ug',
    nameEn: 'Vitamin D',
    nameDe: 'Vitamin D',
    descEn: 'Crucial for bone health and calcium absorption',
    descDe: 'Wichtig für Knochen und Calciumaufnahme',
    target: '20 µg'
  },
  {
    id: 'vitamin_e_mg',
    nameEn: 'Vitamin E',
    nameDe: 'Vitamin E',
    descEn: 'Protects cells from oxidative stress',
    descDe: 'Schützt Zellen vor oxidativem Stress',
    target: '15 mg'
  },
  {
    id: 'sodium_mg',
    nameEn: 'Sodium',
    nameDe: 'Natrium',
    descEn: 'Regulates fluid balance and blood pressure',
    descDe: 'Reguliert Wasserhaushalt und Blutdruck',
    target: '< 2300 mg'
  },
  {
    id: 'potassium_mg',
    nameEn: 'Potassium',
    nameDe: 'Kalium',
    descEn: 'Supports heart rhythm, muscle, and nerves',
    descDe: 'Wichtig für Herz, Muskeln und Nervensystem',
    target: '3500 mg'
  },
  {
    id: 'chloride_mg',
    nameEn: 'Chloride',
    nameDe: 'Chlorid',
    descEn: 'Maintains fluid balance and stomach acid',
    descDe: 'Reguliert Säure-Basen- und Wasserhaushalt',
    target: '2300 mg'
  },
  {
    id: 'calcium_mg',
    nameEn: 'Calcium',
    nameDe: 'Calcium',
    descEn: 'Maintains strong bones and teeth',
    descDe: 'Für den Erhalt von Knochen und Zähnen',
    target: '1000 mg'
  },
  {
    id: 'magnesium_mg',
    nameEn: 'Magnesium',
    nameDe: 'Magnesium',
    descEn: 'Supports muscle and nerve relaxation',
    descDe: 'Unterstützt die Muskel- und Nervenfunktion',
    target: '400 mg'
  },
  {
    id: 'phosphorus_mg',
    nameEn: 'Phosphorus',
    nameDe: 'Phosphor',
    descEn: 'Works with calcium to build strong bones',
    descDe: 'Wichtig für Knochenaufbau und Energiestoffwechsel',
    target: '700 mg'
  },
  {
    id: 'iron_mg',
    nameEn: 'Iron',
    nameDe: 'Eisen',
    descEn: 'Vital for oxygen transport in blood',
    descDe: 'Lebenswichtig für den Sauerstofftransport im Blut',
    target: '14 mg'
  },
  {
    id: 'iodide_ug',
    nameEn: 'Iodide',
    nameDe: 'Iodid (Jod)',
    descEn: 'Essential for thyroid hormone production',
    descDe: 'Essentiell für die Schilddrüsenfunktion',
    target: '150 µg'
  },
  {
    id: 'zinc_mg',
    nameEn: 'Zinc',
    nameDe: 'Zink',
    descEn: 'Boosts immune function and wound healing',
    descDe: 'Wichtig für Abwehrkräfte und Wundheilung',
    target: '11 mg'
  }
];

const ScoreRing = ({ score, size = 64, strokeWidth = 5, textSizeClass }: { score: number, size?: number, strokeWidth?: number, textSizeClass?: string }) => {
  const validScore = typeof score === 'number' && !isNaN(score) ? score : 0;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const [offset, setOffset] = useState(circumference);
  useEffect(() => {
    const timer = setTimeout(() => {
      const targetOffset = circumference - (circumference * validScore) / 100;
      setOffset(targetOffset);
    }, 100);
    return () => clearTimeout(timer);
  }, [validScore, circumference]);
  
  const colors = getScoreColors(validScore);
  const computedTextClass = textSizeClass || (size >= 96 ? "text-4xl" : size >= 84 ? "text-3xl" : size >= 64 ? "text-xl" : "text-sm");
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="-rotate-90 transform" width={size} height={size}>
        <circle className="text-neutral-100 dark:text-neutral-800" strokeWidth={strokeWidth} stroke="currentColor" fill="transparent" r={radius} cx={size/2} cy={size/2} />
        <circle className={colors.text} strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" stroke="currentColor" fill="transparent" r={radius} cx={size/2} cy={size/2} style={{ transition: "stroke-dashoffset 1s ease-in-out" }} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`${computedTextClass} font-bold ${colors.text}`}>{Math.round(validScore)}</span>
      </div>
    </div>
  );
};

const translateCategoryName = (cat: string, lang: "en" | "de"): string => {
  if (lang === "en") return cat;
  const mapping: Record<string, any> = {
    "All": "Alle",
    "Produce": "Frischeprodukte",
    "Dairy & Eggs": "Milchprodukte & Eier",
    "Pantry": "Vorratskammer",
    "Snacks": "Süßigkeiten & Snacks",
    "Beverages": "Getränke",
    "Grocery": "Lebensmittel"
  };
  return mapping[cat] || cat;
};

const translateSubcategoryName = (sub: string, lang: "en" | "de"): string => {
  if (lang === "en") return sub;
  const mapping: Record<string, any> = {
    "Vegetables": "Gemüse",
    "Fruits": "Obst",
    "Berries": "Beeren",
    "Milk": "Milch",
    "Yogurt": "Joghurt",
    "Eggs": "Eier",
    "Breakfast Cereals": "Frühstückscerealien",
    "Spreads": "Aufstriche",
    "Sweet Spreads": "Süße Aufstriche",
    "Confectionery": "Süßwaren",
    "Candy chocolate bars": "Schokoriegel",
    "Sodas": "Limonaden",
    "Water": "Wasser",
    "Crackers": "Cracker"
  };
  return mapping[sub] || sub;
};

const translateMicroNutrient = (name: string, lang: "en" | "de"): string => {
  if (lang === "en") return name;
  const mapping: Record<string, any> = {
    "Vitamin C": "Vitamin C",
    "Potassium": "Kalium",
    "Vitamin B6": "Vitamin B6",
    "Vitamin K": "Vitamin K",
    "Iron": "Eisen",
    "Calcium": "Calcium",
    "Folate": "Folsäure",
    "Vitamin B12": "Vitamin B12",
    "Vitamin D": "Vitamin D",
    "Choline": "Cholin",
    "Magnesium": "Magnesium",
    "Vitamin E": "Vitamin E"
  };
  return mapping[name] || name;
};

const translateDynamicName = (name: string, lang: "en" | "de"): string => {
  if (lang === "en") return name;
  let translated = name;
  const replacements: [RegExp | string, string][] = [
    [/organic/i, "Bio-"],
    [/avocado/i, "Avocado"],
    [/strawberry/i, "Erdbeere"],
    [/strawberries/i, "Erdbeeren"],
    [/jogurt/i, "Joghurt"],
    [/yogurt/i, "Joghurt"],
    [/milk/i, "Milch"],
    [/egg/i, "Ei"],
    [/eggs/i, "Eier"],
    [/water/i, "Wasser"],
    [/banana/i, "Banane"],
    [/bananas/i, "Bananen"],
    [/apple/i, "Apfel"],
    [/apples/i, "Äpfel"],
    [/chocolate/i, "Schokolade"],
    [/bread/i, "Brot"],
    [/bar/i, "-Riegel"],
    [/crispbread/i, "Knäckebrot"],
    [/spinach/i, "Spinat"],
    [/zucchini/i, "Zucchini"]
  ];
  for (const [pattern, repl] of replacements) {
    translated = translated.replace(pattern, repl);
  }
  return translated;
};

const translateDynamicVerdict = (verdict: string, lang: "en" | "de"): string => {
  if (lang === "en") return verdict;
  if (verdict.includes("Packed with heart-healthy monounsaturated fats")) {
    return "Vollgepackt mit herzgesunden einfach ungesättigten Fetten und Ballaststoffen. Ausgezeichnete Wahl!";
  }
  if (verdict.includes("Incredibly high in vitamin C")) {
    return "Unglaublich reich an Vitamin C und Antioxidantien. Extrem kalorienarm und niedriger glykämischer Index.";
  }
  if (verdict.includes("Excellent source of protein with minimal added sugars")) {
    return "Hervorragende Proteinquelle mit minimalem Zuckerzusatz. Großartig für den Muskelaufbau und die Sättigung.";
  }
  if (verdict.includes("Ultra-processed chocolate bar high in added sugars")) {
    return "Ultra-verarbeiteter Schokoriegel mit viel zugesetztem Zucker, gesättigten Fetten und leeren Kalorien.";
  }
  return verdict;
};

const translateDynamicPhrases = (phrase: string, lang: "en" | "de"): string => {
  if (lang === "en") return phrase;
  const mapping: Record<string, any> = {
    "Rich in healthy monounsaturated fats": "Reich an gesunden einfach ungesättigten Fetten",
    "High in dietary fiber": "Reich an Ballaststoffen",
    "Excellent source of potassium": "Hervorragende Kaliumquelle",
    "Very high in Vitamin C": "Sehr reich an Vitamin C",
    "Rich in antioxidants": "Reich an Antioxidantien",
    "Low in calories": "Kalorienarm",
    "Excellent protein source": "Hervorragende Proteinquelle",
    "Low in fat": "Fettarm",
    "Good source of Calcium": "Gute Calciumquelle",
    "Ultra-processed (NOVA 4)": "Ultra-verarbeitet (NOVA 4)",
    "High in added sugars": "Sehr viel zugesetzter Zucker",
    "High in saturated fat": "Hoher Gehalt an gesättigten Fetten"
  };
  return mapping[phrase] || phrase;
};

const getTranslatedFood = (food: Food, lang: "en" | "de"): Food => {
  if (lang === "en") return food;
  return {
    ...food,
    name: translateDynamicName(food.name, lang),
    category: translateCategoryName(food.category, lang),
    subCategory: translateSubcategoryName((food.subCategory || "Grocery"), lang)
  };
};


// Translation dictionary
const translations = {
  en: {
    today: "Today",
    search: "Search",
    swaps: "Swaps",
    bills: "Bills",
    groceries: "Groceries",
    guide: "Smart Nutrition Guide",
    healthPoints: "Health Points",
    scanReceipt: "Scan Receipt",
    scanReceiptLower: "Scan a receipt",
    scanPrompt: "Scan a receipt to start earning points",
    spotlight: "Today's Spotlight",
    recommended: "Recommended for You",
    thisWeek: "This Week",
    pointsThisWeek: "This week's health points",
    trackReceipts: "Track your receipts and health points",
    recentBills: "Recent Bills",
    noHistory: "No history yet",
    noHistoryDesc: "Scan your first grocery receipt to get a health rating.",
    myProfile: "My Profile",
    personaliseExp: "Personalise your nutrition experience",
    calorieTarget: "Daily Calorie Target",
    appearance: "Appearance",
    colorScheme: "Color scheme",
    sex: "Biological sex",
    personalInfo: "Personal Info",
    age: "Age",
    weight: "Weight",
    height: "Height",
    activityLevel: "Activity Level",
    dietaryPreference: "Dietary Preference",
    balanced: "Balanced",
    personalise: "Personalise",
    recommendedLabel: "Recommended",
    popularFoods: "Popular Foods",
    quickSearches: "Quick Searches",
    chooseLibrary: "Choose from Library",
    tryDemo: "Try with Demo Receipt",
    howItWorks: "How it works",
    takeClear: "Take a clear picture of your receipt",
    weIdentify: "We identify the groceries you bought",
    getHealth: "Get a health score for your purchase",
    back: "Back",
    male: "Male",
    female: "Female",
    sedentary: "Sedentary",
    lightlyActive: "Lightly Active",
    moderatelyActive: "Moderately Active",
    veryActive: "Very Active",
    extraActive: "Extra Active",
    noExercise: "Little to no exercise",
    lightExercise: "Light exercise (1-3 days/week)",
    modExercise: "Moderate exercise (3-5 days/week)",
    heavyExercise: "Heavy exercise (6-7 days/week)",
    extraExercise: "Very heavy training or physical job",
    deleteBill: "Delete bill",
    items: "items",
    calories: "Calories",
    protein: "Protein",
    fiber: "Fiber",
    serving: "Serving",
    searchPlaceholder: "Search over 20+ foods...",
    noMatching: "No matching groceries",
    trySearch: "Try searching for 'Avocado', 'Yogurt', or 'Water'.",
    results: "Search Results",
    filterDesc: "Filter foods by keyword, sub-category, or name.",
  },
  de: {
    today: "Heute",
    search: "Suche",
    swaps: "Alternativen",
    bills: "Belege",
    groceries: "Lebensmittel",
    guide: "Intelligenter Ernährungsberater",
    healthPoints: "Gesundheitspunkte",
    scanReceipt: "Beleg scannen",
    scanReceiptLower: "Beleg scannen",
    scanPrompt: "Scannen Sie einen Beleg, um Punkte zu sammeln",
    spotlight: "Heutiges Highlight",
    recommended: "Für Sie empfohlen",
    thisWeek: "Diese Woche",
    pointsThisWeek: "Gesundheitspunkte dieser Woche",
    trackReceipts: "Verfolgen Sie Ihre Belege und Gesundheitspunkte",
    recentBills: "Letzte Rechnungen",
    noHistory: "Noch kein Verlauf",
    noHistoryDesc: "Scannen Sie Ihren ersten Kassenzettel für eine Bewertung.",
    myProfile: "Mein Profil",
    personaliseExp: "Personalisieren Sie Ihr Ernährungserlebnis",
    calorieTarget: "Tägliches Kalorienziel",
    appearance: "Aussehen",
    colorScheme: "Farbschema",
    sex: "Biologisches Geschlecht",
    personalInfo: "Persönliche Infos",
    age: "Alter",
    weight: "Gewicht",
    height: "Größe",
    activityLevel: "Aktivitätslevel",
    dietaryPreference: "Ernährungspräferenz",
    balanced: "Ausgewogen",
    personalise: "Personalisieren",
    recommendedLabel: "Empfohlen",
    popularFoods: "Beliebte Lebensmittel",
    quickSearches: "Schnellsuche",
    chooseLibrary: "Aus Bibliothek wählen",
    tryDemo: "Mit Demo-Beleg testen",
    howItWorks: "So funktioniert es",
    takeClear: "Machen Sie ein klares Foto Ihres Belegs",
    weIdentify: "Wir erkennen die gekauften Lebensmittel",
    getHealth: "Erhalten Sie eine Gesundheitsbewertung",
    back: "Zurück",
    male: "Männlich",
    female: "Weiblich",
    sedentary: "Sitzend",
    lightlyActive: "Leicht aktiv",
    moderatelyActive: "Mäßig aktiv",
    veryActive: "Sehr aktiv",
    extraActive: "Besonders aktiv",
    noExercise: "Wenig bis gar kein Training",
    lightExercise: "Leichtes Training (1-3 Tage/Woche)",
    modExercise: "Mäßiges Training (3-5 Tage/Woche)",
    heavyExercise: "Intensives Training (6-7 Tage/Woche)",
    extraExercise: "Sehr schweres Training oder körperliche Arbeit",
    deleteBill: "Rechnung löschen",
    items: "Artikel",
    calories: "Kalorien",
    protein: "Eiweiß",
    fiber: "Ballaststoffe",
    serving: "Portion",
    searchPlaceholder: "Über 20+ Lebensmittel durchsuchen...",
    noMatching: "Keine passenden Lebensmittel",
    trySearch: "Suchen Sie nach 'Avocado', 'Joghurt' oder 'Wasser'.",
    results: "Suchergebnisse",
    filterDesc: "Filtern Sie Lebensmittel nach Stichwort, Unterkategorie oder Name.",
  }
};

export default function App() {
  const [language, setLanguage] = useState<"en" | "de">(() => {
    const saved = localStorage.getItem('language');
    return (saved === "de" || saved === "en") ? saved : "en";
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: keyof typeof translations.en) => {
    return translations[language][key] || translations.en[key];
  };

  const [activeTab, setActiveTab] = useState<"home" | "search" | "recipes" | "swaps" | "bill" | "scan" | "profile">("home");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [appliedSwaps, setAppliedSwaps] = useState<Record<string, boolean>>({});
  
  // Swipeable main tabs tracking refs
  const mainTouchStartX = useRef<number | null>(null);
  const mainTouchStartY = useRef<number | null>(null);
  const mainHasSwiped = useRef<boolean>(false);

  const handleMainTouchStart = (e: React.TouchEvent) => {
    // Only track swipe if no modal sheets or full overlays are open
    if (selectedFoodId || showCalorieDetail || isScanning) return;
    mainTouchStartX.current = e.touches[0].clientX;
    mainTouchStartY.current = e.touches[0].clientY;
    mainHasSwiped.current = false;
  };

  const handleMainTouchMove = (e: React.TouchEvent) => {
    if (mainTouchStartX.current === null || mainTouchStartY.current === null || mainHasSwiped.current) return;
    
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    
    const deltaX = currentX - mainTouchStartX.current;
    const deltaY = currentY - mainTouchStartY.current;
    
    const SWIPE_THRESHOLD = 45; // ultra-responsive swipe threshold
    
    // Check if horizontal swipe is dominant and exceeds threshold
    if (Math.abs(deltaX) > SWIPE_THRESHOLD && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
      mainHasSwiped.current = true;
      const tabOrder: ("home" | "search" | "swaps" | "bill")[] = ["home", "search", "swaps", "bill"];
      const currentIndex = tabOrder.indexOf(activeTab as any);
      
      if (currentIndex !== -1) {
        if (deltaX < 0) {
          // Swipe Left: Go to next tab in order
          if (currentIndex < tabOrder.length - 1) {
            triggerHaptic();
            handleTabChange(tabOrder[currentIndex + 1]);
          }
        } else {
          // Swipe Right: Go to previous tab in order
          if (currentIndex > 0) {
            triggerHaptic();
            handleTabChange(tabOrder[currentIndex - 1]);
          }
        }
      }
      
      // Clear values to avoid double trigger
      mainTouchStartX.current = null;
      mainTouchStartY.current = null;
    }
  };

  const handleMainTouchEnd = () => {
    mainTouchStartX.current = null;
    mainTouchStartY.current = null;
    mainHasSwiped.current = false;
  };
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [searchCategory, setSearchCategory] = useState("All");
  const [searchSubCategory, setSearchSubCategory] = useState("All");
  const [searchNutriScores, setSearchNutriScores] = useState<string[]>([]);
  const [searchNovaScores, setSearchNovaScores] = useState<number[]>([]);
  const [searchFavoritesOnly, setSearchFavoritesOnly] = useState<boolean>(false);
  const [swapsFavoritesOnly, setSwapsFavoritesOnly] = useState<boolean>(false);
  const [searchMaxCalories, setSearchMaxCalories] = useState<number>(1000);
  const [searchQuery, setSearchQuery] = useState("");
  const [foodDisplayLimit, setFoodDisplayLimit] = useState(20);
  const [randomSeed] = useState(() => Math.random() * 1000);
  const [selectedFoodId, setSelectedFoodId] = useState<string | null>(null);
  const [expandedSwapId, setExpandedSwapId] = useState<string | null>(null);
  const [showSwapSearch, setShowSwapSearch] = useState(false);
  const [swapSearchQuery, setSwapSearchQuery] = useState("");
  const [isHighlightExpanded, setIsHighlightExpanded] = useState(false);
  const [animationTrigger, setAnimationTrigger] = useState(0);

  const [favoriteFoodIds, setFavoriteFoodIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('favoriteFoodIds');
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem('favoriteFoodIds', JSON.stringify(favoriteFoodIds));
  }, [favoriteFoodIds]);

  const [favoriteSwapIds, setFavoriteSwapIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('favoriteSwapIds');
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem('favoriteSwapIds', JSON.stringify(favoriteSwapIds));
  }, [favoriteSwapIds]);

  const [showAllBills, setShowAllBills] = useState(false);

  const toggleFavoriteFood = (foodId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    triggerHaptic();
    setFavoriteFoodIds(prev => 
      prev.includes(foodId) ? prev.filter(id => id !== foodId) : [...prev, foodId]
    );
  };

  const toggleFavoriteSwap = (fromId: string, toId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    triggerHaptic();
    const swapKey = `${fromId}::${toId}`;
    setFavoriteSwapIds(prev => 
      prev.includes(swapKey) ? prev.filter(key => key !== swapKey) : [...prev, swapKey]
    );
  };

  const [receipts, setReceipts] = useState<any[]>(() => {
    const saved = localStorage.getItem('receipts');
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem('receipts', JSON.stringify(receipts));
  }, [receipts]);
  const [isScanning, setIsScanning] = useState(false);
  const [dynamicFoods, setDynamicFoods] = useState<Food[]>(() => {
    try {
      const saved = localStorage.getItem('dynamicFoods');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0 && !parsed[0].nutrients_per_100) {
          localStorage.removeItem('dynamicFoods');
          return [];
        }
        return parsed;
      }
    } catch (e) {
      // ignore
    }
    return [];
  });
  useEffect(() => {
    localStorage.setItem('dynamicFoods', JSON.stringify(dynamicFoods));
  }, [dynamicFoods]);
  const [isGeneratingFood, setIsGeneratingFood] = useState(false);
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('userProfile');
    const defaultProfile = { 
      height: 190, 
      weight: 93, 
      age: 23,
      sex: 'Male',
      colorScheme: 'Auto',
      activityLevel: 'Active',
      dietaryPreference: 'None',
      dietaryPreferences: ['None'],
      weightGoalRate: 'stay'
    };
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.dietaryPreferences) {
          parsed.dietaryPreferences = parsed.dietaryPreference ? [parsed.dietaryPreference] : ['None'];
        }
        if (!parsed.weightGoalRate) {
          parsed.weightGoalRate = 'stay';
        }
        return parsed;
      } catch (e) {
        return defaultProfile;
      }
    }
    return defaultProfile;
  });
  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  }, [userProfile]);

  const getMicroTargetValue = (id: string) => {
    const isFemale = userProfile.sex === 'Female';
    const activeFactor = (userProfile.activityLevel === 'Active' || userProfile.activityLevel === 'Very Active' || userProfile.activityLevel === 'Extra Active') ? 1.25 : 1.0;
    
    switch (id) {
      case 'vitamin_a_ug': return isFemale ? 700 : 900;
      case 'betacarotene_ug': return 4800;
      case 'vitamin_b1_mg': return isFemale ? 1.1 : 1.2;
      case 'vitamin_b2_mg': return isFemale ? 1.1 : 1.3;
      case 'vitamin_b6_mg': return 1.3;
      case 'vitamin_b12_ug': return 2.4;
      case 'niacin_mg': return isFemale ? 14 : 16;
      case 'folate_ug': return 400;
      case 'pantothenic_acid_mg': return 5;
      case 'vitamin_c_mg': return isFemale ? 75 : 90;
      case 'vitamin_d_ug': return 20;
      case 'vitamin_e_mg': return 15;
      case 'sodium_mg': {
        const prefs = userProfile.dietaryPreferences || [userProfile.dietaryPreference || 'None'];
        return prefs.includes('Low Carb') ? 3000 : 2300;
      }
      case 'potassium_mg': return Math.round((isFemale ? 2600 : 3400) * activeFactor);
      case 'chloride_mg': return 2300;
      case 'calcium_mg': return 1000;
      case 'magnesium_mg': return isFemale ? 320 : 420;
      case 'phosphorus_mg': return 700;
      case 'iron_mg': return isFemale ? 18 : 8;
      case 'iodide_ug': return 150;
      case 'zinc_mg': return isFemale ? 8 : 11;
      default: return 100;
    }
  };

  const getMicroUnit = (id: string) => {
    return id.endsWith('_ug') ? 'µg' : 'mg';
  };

  const getAccumulatedMicros = useMemo(() => {
    const totals: { [key: string]: number } = {};
    
    // Initialize all to 0
    MICRONUTRIENTS_LIST.forEach(m => {
      totals[m.id] = 0;
    });
    
    // Go through all items in all receipts
    receipts.forEach(receipt => {
      if (receipt.items && receipt.items.length > 0) {
        receipt.items.forEach((item: any) => {
          const food = FOODS.find(f => f.id === item.id) || dynamicFoods.find(f => f.id === item.id) || item.foodData;
          if (food && food.nutrients_per_100 && food.nutrients_per_100.micros) {
            const micros = food.nutrients_per_100.micros;
            let weightFactor = 1.0; // 100g standard default if no weight info is found
            
            // Try to extract weight in grams from the scanned item or assume 100g serving
            if (typeof item.weight_g === 'number') {
              weightFactor = item.weight_g / 100;
            } else if (typeof item.grams === 'number') {
              weightFactor = item.grams / 100;
            } else if (typeof item.quantity === 'number') {
              weightFactor = item.quantity * 1.5; // assumption: 150g portion per unit qty
            }
            
            Object.keys(micros).forEach(key => {
              const val = micros[key];
              if (typeof val === 'number' && !isNaN(val)) {
                if (totals[key] !== undefined) {
                  totals[key] += val * weightFactor;
                }
              }
            });
          }
        });
      }
    });
    
    return totals;
  }, [receipts, dynamicFoods]);

  // Dark mode active state listener
  const [isDarkModeActive, setIsDarkModeActive] = useState(false);
  const [showCalorieDetail, setShowCalorieDetail] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      if (userProfile.colorScheme === 'Dark') {
        return true;
      }
      if (userProfile.colorScheme === 'Auto') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      return false; // Light
    };

    const active = checkDarkMode();
    setIsDarkModeActive(active);

    if (active) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Dynamic preference listener
    if (userProfile.colorScheme === 'Auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        setIsDarkModeActive(e.matches);
        if (e.matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      };
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [userProfile.colorScheme]);

  const getDailyCalorieTarget = () => {
    const baseBmr = 10 * userProfile.weight + 6.25 * userProfile.height - 5 * (userProfile.age || 23);
    const bmr = userProfile.sex === 'Female' ? baseBmr - 161 : baseBmr + 5;
    
    let multiplier = 1.2;
    const level = userProfile.activityLevel;
    if (level === 'Sedentary') {
      multiplier = 1.2;
    } else if (level === 'Lightly Active') {
      multiplier = 1.375;
    } else if (level === 'Moderately Active' || level === 'Active') {
      multiplier = 1.55;
    } else if (level === 'Very Active') {
      multiplier = 1.725;
    } else if (level === 'Extra Active') {
      multiplier = 1.9;
    }
    
    const maintenanceCalories = Math.round(bmr * multiplier);
    
    let goalAdjustment = 0;
    const rate = userProfile.weightGoalRate;
    if (rate === '-0.5') {
      goalAdjustment = -500;
    } else if (rate === '-0.25') {
      goalAdjustment = -250;
    } else if (rate === '+0.25') {
      goalAdjustment = 250;
    } else if (rate === '+0.5') {
      goalAdjustment = 500;
    }
    
    // Safety minimum floor for healthy daily intake
    return Math.max(1200, maintenanceCalories + goalAdjustment);
  };

  const getNutritionBreakdown = () => {
    const calories = getDailyCalorieTarget();
    const prefs = userProfile.dietaryPreferences || [userProfile.dietaryPreference || 'None'];
    
    const hasHighProtein = prefs.includes('High Protein');
    const hasLowCarb = prefs.includes('Low Carb');
    const hasVeg = prefs.includes('Vegetarian') || prefs.includes('Vegan');
    
    // Percentages of calories
    let proteinPct = 20;
    let carbsPct = 50;
    let fatPct = 30;
    
    if (hasHighProtein && hasLowCarb) {
      proteinPct = 35;
      carbsPct = 15;
      fatPct = 50;
    } else if (hasHighProtein) {
      proteinPct = 35;
      carbsPct = 35;
      fatPct = 30;
    } else if (hasLowCarb) {
      proteinPct = 25;
      carbsPct = 15;
      fatPct = 60;
    } else if (hasVeg) {
      proteinPct = 15;
      carbsPct = 55;
      fatPct = 30;
    }
    
    // Grams calculations: Protein=4 kcal/g, Carbs=4 kcal/g, Fat=9 kcal/g
    const proteinGrams = Math.round((calories * (proteinPct / 100)) / 4);
    const carbsGrams = Math.round((calories * (carbsPct / 100)) / 4);
    const fatGrams = Math.round((calories * (fatPct / 100)) / 9);
    
    // Fiber standard is 14g per 1000 kcal
    const fiberGrams = Math.round((calories / 1000) * 14);
    
    // Micronutrient targets based on sex/body weight or standard guidelines
    const sodiumMg = prefs.includes('Low Carb') ? 3000 : 2300;
    
    const activeFactor = (userProfile.activityLevel === 'Active' || userProfile.activityLevel === 'Very Active' || userProfile.activityLevel === 'Extra Active') ? 1.25 : 1.0;
    const potassiumMg = Math.round((userProfile.sex === 'Female' ? 2600 : 3400) * activeFactor);
    const calciumMg = 1000;
    const ironMg = userProfile.sex === 'Female' ? 18 : 8;
    const vitaminCMg = userProfile.sex === 'Female' ? 75 : 90;
    
    // Complete Vitamin & Mineral Reference Targets
    const vitAMcg = userProfile.sex === 'Female' ? 700 : 900;
    const vitB1Mg = userProfile.sex === 'Female' ? 1.1 : 1.2;
    const vitB2Mg = userProfile.sex === 'Female' ? 1.1 : 1.3;
    const vitB3Mg = userProfile.sex === 'Female' ? 14 : 16;
    const vitB6Mg = 1.3;
    const vitB9Mcg = 400;
    const vitB12Mcg = 2.4;
    const vitDMcg = 15; // 600 IU
    const vitEMg = 15;
    const vitKMcg = userProfile.sex === 'Female' ? 90 : 120;
    const magnesiumMg = userProfile.sex === 'Female' ? 320 : 420;
    const zincMg = userProfile.sex === 'Female' ? 8 : 11;
    
    return {
      calories,
      nutrients_per_100: [
        { name: language === 'en' ? 'Protein' : 'Eiweiß', pct: proteinPct, grams: proteinGrams, kcal: Math.round(proteinGrams * 4), color: 'bg-emerald-500 text-white' },
        { name: language === 'en' ? 'Carbohydrates' : 'Kohlenhydrate', pct: carbsPct, grams: carbsGrams, kcal: Math.round(carbsGrams * 4), color: 'bg-amber-500 text-neutral-900' },
        { name: language === 'en' ? 'Fats' : 'Fett', pct: fatPct, grams: fatGrams, kcal: Math.round(fatGrams * 9), color: 'bg-rose-500 text-white' },
        { name: language === 'en' ? 'Dietary Fiber' : 'Ballaststoffe', pct: null, grams: fiberGrams, kcal: null, color: 'bg-teal-500 text-white' }
      ],
      
    };
  };


  // Detail slide-up modal pull-to-dismiss states
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [expandedBillId, setExpandedBillId] = useState<string | null>(null);
  const touchStartY = useRef(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputLibRef = useRef<HTMLInputElement>(null);

  const [scanStatus, setScanStatus] = useState<string>("");
  const [scanProgress, setScanProgress] = useState<{ current: number; total: number } | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);

  const handleLoadDemoBill = () => {
    setIsScanning(true);
    setScanStatus("Simulating Demo Receipt analysis...");
    setScanProgress({ current: 0, total: 4 });
    setScanError(null);

    // Let's simulate scanning steps to make it feel amazing
    setTimeout(() => {
      setScanStatus("Extracting store name and items...");
      setScanProgress({ current: 1, total: 4 });
      
      setTimeout(() => {
        setScanStatus("Fetching nutrition profile for 'Organic Avocados'...");
        setScanProgress({ current: 2, total: 4 });

        setTimeout(() => {
          setScanStatus("Fetching nutrition profile for 'Fresh Strawberries'...");
          setScanProgress({ current: 3, total: 4 });

          setTimeout(() => {
            setScanStatus("Fetching nutrition profile for 'Snickers Bar'...");
            setScanProgress({ current: 4, total: 4 });

            // Now we create the mock foods and mock receipt
            const mockFoods: Food[] = [
              {
                id: "organic_avocados",
                name: "Organic Avocados",
                category: "Produce",
                subCategory: "Fresh Fruits",
                health_score: 95,
                nutri_grade: 'A', swap_suggestion_id: null,
                
                
                
                
                
                nutrients_per_100: { protein_g: 2, carbs_g: 0, fiber_g: 6.7, sugars_g: 0.6, fat_g: 14.7, saturated_fat_g: 2.1, salt_g: 7, kcal: 100 },
                
              },
              {
                id: "fresh_strawberries",
                name: "Fresh Strawberries",
                category: "Produce",
                subCategory: "Berries",
                health_score: 92,
                nutri_grade: 'A', swap_suggestion_id: null,
                
                
                
                
                
                nutrients_per_100: { protein_g: 0.7, carbs_g: 0, fiber_g: 2, sugars_g: 4.9, fat_g: 0.3, saturated_fat_g: 0, salt_g: 1, kcal: 100 },
                
              },
              {
                id: "high_protein_joghurt",
                name: "High Protein Joghurt",
                category: "Dairy & Eggs",
                subCategory: "Yogurt",
                health_score: 85,
                nutri_grade: 'A', swap_suggestion_id: null,
                
                
                
                
                
                nutrients_per_100: { protein_g: 10, carbs_g: 0, fiber_g: 0, sugars_g: 3.5, fat_g: 1.5, saturated_fat_g: 0.9, salt_g: 80, kcal: 100 },
                
              },
              {
                id: "5000159461122", // Snickers
                name: "Snickers Bar",
                category: "Snacks",
                subCategory: "Candy chocolate bars",
                health_score: 10,
                nutri_grade: 'E', swap_suggestion_id: "f121",
                
                
                
                
                
                nutrients_per_100: { protein_g: 6.3, carbs_g: 0, fiber_g: 0, sugars_g: 56.3, fat_g: 30.9, saturated_fat_g: 10.6, salt_g: 42.8, kcal: 100 },
                
              }
            ];

            // Add mock foods to dynamicFoods so they are fully interactive when clicked
            setDynamicFoods(prev => {
              const map = new Map(prev.map(f => [f.id, f]));
              mockFoods.forEach(f => map.set(f.id, f));
              return Array.from(map.values());
            });

            const demoReceipt = {
              id: "demo_" + Math.random().toString(36).substr(2, 9),
              storeName: "Trader Joe's (Demo)",
              totalAmount: "$15.40",
              date: new Date().toISOString().split('T')[0],
              items: [
                { id: "organic_avocados", cleanName: "Organic Avocados", rawName: "ORG AVOCADOS 4PK" },
                { id: "fresh_strawberries", cleanName: "Fresh Strawberries", rawName: "FRSH STRAWBERRY 1LB" },
                { id: "high_protein_joghurt", cleanName: "High Protein Joghurt", rawName: "HI-PROT YGRT BLU" },
                { id: "5000159461122", cleanName: "Snickers Bar", rawName: "SNICKERS BAR 1.86OZ" }
              ],
              score: 71,
              
              negatives: []
            };

            setReceipts(prev => [demoReceipt, ...prev]);
            setIsScanning(false);
            setScanStatus("");
            setScanProgress(null);
            setScanError(null);
            setActiveTab("bill");
          }, 800);
        }, 800);
      }, 800);
    }, 800);
  };

  const getReceiptScore = (receipt: any) => {
    let score = receipt.score || 50;
    if (receipt.items && receipt.items.length > 0) {
      let total = 0;
      let count = 0;
      receipt.items.forEach((it: any) => {
        const df = FOODS.find(f => f.id === it.id) || dynamicFoods.find(f => f.id === it.id) || it.foodData;
        if (df && typeof df.health_score === 'number' && !isNaN(df.health_score)) {
          total += df.health_score;
          count++;
        }
      });
      if (count > 0) score = Math.round(total / count);
    }
    return score;
  };

  const avgHealthScore = receipts.length > 0 ? Math.round(receipts.reduce((acc, r) => acc + getReceiptScore(r), 0) / receipts.length) : 0;
  const validAvgHealthScore = typeof avgHealthScore === 'number' && !isNaN(avgHealthScore) ? avgHealthScore : 0;
  const healthOffset = 264 - (264 * (validAvgHealthScore / 100));

  // Background loading of Open Food Facts / Gemini data for any items inside bills that are not loaded yet
  useEffect(() => {
    if (activeTab !== "bill") return;
    
    // Find all item IDs in any of our receipts that are not loaded in FOODS or dynamicFoods
    const unloadedItems: { id: string; cleanName: string }[] = [];
    receipts.forEach(receipt => {
      if (receipt.items && receipt.items.length > 0) {
        receipt.items.forEach((item: any) => {
          const isLoaded = dynamicFoods.some(f => f.id === item.id);
          if (!isLoaded && !unloadedItems.some(ui => ui.id === item.id)) {
            unloadedItems.push({ id: item.id, cleanName: item.cleanName });
          }
        });
      }
    });

    if (unloadedItems.length === 0) return;

    // Load them sequentially in the background to avoid overwhelming the server
    let active = true;
    const loadBackgroundFoods = async () => {
      for (const item of unloadedItems) {
        if (!active) break;
        try {
          const response = await fetch('/api/generate-food', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: item.id, name: item.cleanName }),
          });
          if (response.ok && active) {
            const newFood: Food = await response.json();
            setDynamicFoods(prev => {
              const exists = prev.some(f => f.id === newFood.id);
              if (exists) return prev;
              return [...prev, newFood];
            });
          }
        } catch (err) {
          console.error("Background fetch failed for", item.cleanName, err);
        }
      }
    };

    loadBackgroundFoods();

    return () => {
      active = false;
    };
  }, [activeTab, receipts, dynamicFoods]);

  useEffect(() => {
    // Retrigger animations when category filters are swapped
    setAnimationTrigger(prev => prev + 1);
  }, [selectedCategory]);

  const handleOpenDynamicFood = async (item: { id: string; cleanName: string, foodData?: Food }) => {
    const existing = dynamicFoods.find(f => f.id === item.id) || item.foodData;
    if (existing) {
      if (!dynamicFoods.find(f => f.id === item.id)) {
        setDynamicFoods(prev => [...prev, existing]);
      }
      setSelectedFoodId(item.id);
      return;
    }

    setIsGeneratingFood(true);
    try {
      const response = await fetch('/api/generate-food', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item.id, name: item.cleanName }),
      });
      if (!response.ok) throw new Error("Failed to generate food");
      const newFood: Food = await response.json();
      setDynamicFoods(prev => [...prev, newFood]);
      setSelectedFoodId(newFood.id);
    } catch (err) {
      console.error(err);
      alert("Failed to load food details.");
    } finally {
      setIsGeneratingFood(false);
    }
  };

  const handleScanBill = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    setScanStatus("Uploading & optimizing receipt image...");
    setScanProgress(null);
    
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = async () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          const MAX_DIM = 1200;
          if (width > height && width > MAX_DIM) {
            height *= MAX_DIM / width;
            width = MAX_DIM;
          } else if (height > MAX_DIM) {
            width *= MAX_DIM / height;
            height = MAX_DIM;
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
          const base64data = dataUrl.split(',')[1];
          
          try {
            setScanStatus("Local Tesseract OCR is reading receipt details...");
            const response = await fetch('/api/scan-bill', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                imageBase64: base64data,
                mimeType: 'image/jpeg'
              }),
            });
            
            if (!response.ok) {
              const errData = await response.json().catch(() => ({}));
              throw new Error(errData.error || `Server error: ${response.statusText || response.status}`);
            }
            
            const result = await response.json();
            
            // Now, load food data from Open Food Facts / Gemini for all scanned items
            if (result.items && result.items.length > 0) {
              const fetchedFoods: Food[] = [];
              const totalItems = result.items.length;
              setScanProgress({ current: 0, total: totalItems });

              for (let i = 0; i < totalItems; i++) {
                const item = result.items[i];
                setScanStatus(language === 'en' ? `Querying Open Food Facts for "${item.cleanName}"...` : `Abgleich von "${item.cleanName}" mit Open Food Facts...`);
                setScanProgress({ current: i + 1, total: totalItems });

                try {
                  const existing = dynamicFoods.find(f => f.id === item.id);
                  if (existing) {
                    fetchedFoods.push(existing);
                    item.foodData = existing;
                  } else {
                    const foodRes = await fetch('/api/generate-food', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ id: item.id, name: item.cleanName }),
                    });
                    if (foodRes.ok) {
                      const newFood: Food = await foodRes.json();
                      fetchedFoods.push(newFood);
                      item.foodData = newFood;
                    } else {
                      throw new Error("Failed to load");
                    }
                  }
                } catch (err) {
                  console.warn(`Failed to load details for ${item.cleanName}`, err);
                  // Resilient fallback
                  const fallback: Food = {
                    id: item.id,
                    name: item.cleanName,
                    category: "Grocery",
                    subCategory: "General",
                    health_score: 60,
                    nutri_grade: 'A', swap_suggestion_id: null,
                    
                    
                    
                    
                    
                    nutrients_per_100: { protein_g: 2, carbs_g: 0, fiber_g: 1, sugars_g: 2, fat_g: 4, saturated_fat_g: 0.5, salt_g: 100, kcal: 100 },
                    
                  };
                  fetchedFoods.push(fallback);
                  item.foodData = fallback;
                }
              }

              // Update dynamicFoods state with newly fetched products
              if (fetchedFoods.length > 0) {
                setDynamicFoods(prev => {
                  const map = new Map(prev.map(f => [f.id, f]));
                  fetchedFoods.forEach(f => map.set(f.id, f));
                  return Array.from(map.values());
                });
              }

              // Set the receipt's dynamic score based on actual loaded item scores
              const totalScore = fetchedFoods.reduce((acc, f) => acc + f.health_score, 0);
              const calculatedReceiptScore = Math.round(totalScore / fetchedFoods.length);
              result.score = calculatedReceiptScore;
              result.positives = [
                `All ${totalItems} items scanned and loaded!`,
                `Average grocery score is ${calculatedReceiptScore}%.`
              ];
            } else {
              result.score = 50;
            }
            
            setReceipts(prev => [{ ...result, id: Math.random().toString(36).substr(2, 9) }, ...prev]);
            setActiveTab('bill');
          } catch (err: any) {
            console.error("Failed to analyze bill:", err);
            setScanError(err.message || "Failed to analyze bill");
          } finally {
            setIsScanning(false);
            setScanStatus("");
            setScanProgress(null);
            if (fileInputRef.current) fileInputRef.current.value = ''; 
            if (fileInputLibRef.current) fileInputLibRef.current.value = '';
          }
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    } catch (e) {
      console.error(e);
      setIsScanning(false);
      setScanStatus("");
      setScanProgress(null);
    }
  };

  const matchesDietaryPreference = (food: any, preference: string | string[]) => {
    if (!preference) return true;
    const prefs = Array.isArray(preference) ? preference : [preference];
    const activePrefs = prefs.filter(p => p && p !== "None");
    if (activePrefs.length === 0) return true;
    
    const nameLower = food.name.toLowerCase();
    const catLower = food.category.toLowerCase();
    const subLower = (food.subCategory || "Grocery").toLowerCase();
    
    for (const pref of activePrefs) {
      if (pref === "High Protein") {
        // Only require >= 8g protein for items that aren't beverages, fruits, vegetables, fats, etc.
        const isBeverageOrVeg = catLower.includes("beverage") || catLower.includes("fruit") || catLower.includes("vegetable") || catLower.includes("fat") || nameLower.includes("water") || nameLower.includes("wasser");
        if (!isBeverageOrVeg && !(food.nutrients_per_100.protein_g >= 8)) return false;
      } else if (pref === "Low Carb") {
        if (!(food.nutrients_per_100.sugars_g <= 15)) return false;
      } else if (pref === "Vegetarian") {
        const nonVegTerms = ["salmon", "tuna", "chicken", "beef", "pork", "bacon", "prosciutto", "ham", "turkey", "fish", "meat", "shrimp", "prawn", "sardine", "anchovy", "halibut", "cod"];
        if (nonVegTerms.some(term => nameLower.includes(term) || subLower.includes(term) || catLower.includes(term))) return false;
      } else if (pref === "Vegan") {
        const nonVeganTerms = [
          "salmon", "tuna", "chicken", "beef", "pork", "bacon", "prosciutto", "ham", "turkey", "fish", "meat", "shrimp", "prawn", "sardine", "anchovy", "halibut", "cod",
          "yogurt", "joghurt", "milk", "cheese", "egg", "butter", "honey", "cream", "whey", "lactose", "gelatin"
        ];
        if (nonVeganTerms.some(term => nameLower.includes(term) || subLower.includes(term) || catLower.includes(term))) return false;
      }
    }
    
    return true;
  };

  const allFoods = useMemo(() => {
    const map = new Map<string, Food>();
    FOODS.forEach(f => map.set(f.id, f));
    return Array.from(map.values()).map(f => getTranslatedFood(f, language));
  }, [language]);

  const isRestrictedRecommendation = (name: string, category: string): boolean => {
    const n = (name || "").toLowerCase();
    const c = (category || "").toLowerCase();

    // Energy drinks terms
    if (n.includes("energy drink") || n.includes("energy-drink") || n.includes("energydrink")) {
      return true;
    }
    
    // Alcoholic beverage terms
    if (
      c.includes("alcohol") || 
      n.includes("vol%") || 
      n.includes("liqueur") || 
      n.includes("spirits") || 
      n.includes("vodka") || 
      n.includes("gin,") || 
      n.includes("gin ") || 
      n.includes("whisky") || 
      n.includes("schnaps") || 
      n.includes("rum,") || 
      n.includes("rum ") || 
      n.includes("cider") || 
      n.includes("sherry") || 
      n.includes("wine") || 
      n.includes("wein") || 
      n.includes("beer") || 
      n.includes("bier") ||
      (n.includes("port") && !n.includes("portobello") && !n.includes("portion"))
    ) {
      if (n.includes("non-alcoholic") || n.includes("alkoholfrei") || n.includes("alcohol-free") || n.includes("without alcohol")) {
        return false;
      }
      return true;
    }
    
    return false;
  };

  const areNamesTooSimilar = (name1: string, name2: string): boolean => {
    const cleanTokens = (str: string) => {
      return str
        .toLowerCase()
        // replace non-alphanumeric chars with spaces
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter(t => t.length > 2 && t !== "and" && t !== "with" && t !== "without" && t !== "for");
    };

    const tokens1 = cleanTokens(name1);
    const tokens2 = cleanTokens(name2);

    if (tokens1.length === 0 || tokens2.length === 0) return false;

    // Check overlap
    let intersection = 0;
    for (const t of tokens1) {
      if (tokens2.includes(t)) {
        intersection++;
      }
    }

    const minLen = Math.min(tokens1.length, tokens2.length);
    const overlapRatio = intersection / minLen;

    // If more than 60% of the tokens overlap (or they share first 2-3 tokens), they are too similar.
    if (overlapRatio >= 0.6) {
      return true;
    }

    // Also check if one name starts with the same first 2 words as the other
    if (tokens1.length >= 2 && tokens2.length >= 2) {
      if (tokens1[0] === tokens2[0] && tokens1[1] === tokens2[1]) {
        return true;
      }
    }

    return false;
  };

  const isPrepared = (food: Food): boolean => {
    if (!food) return false;
    const nameLower = (food.name || "").toLowerCase();
    const catLower = (food.category || "").toLowerCase();
    const swissLower = (food.swiss_category || "").toLowerCase();
    return (
      swissLower.includes("prepared dishes") ||
      swissLower.includes("prepared meals") ||
      catLower.includes("prepared dishes") ||
      catLower.includes("prepared meals") ||
      nameLower.includes(", prepared") ||
      nameLower.includes("prepared dish") ||
      nameLower.includes("pizza") ||
      nameLower.includes("lasagna") ||
      nameLower.includes("pasta dish") ||
      nameLower.includes("ready meal")
    );
  };

  const meetsSoftBarrier = (currentFood: Food, candidate: Food): boolean => {
    const n1 = (currentFood.name || "").toLowerCase();
    const n2 = (candidate.name || "").toLowerCase();

    const isNonAlcoholicTerm = (name: string) => {
      return name.includes("non-alcoholic") || name.includes("alkoholfrei") || name.includes("alcohol-free") || name.includes("without alcohol");
    };
    const isNonAlcoholic = isNonAlcoholicTerm(n1) || isNonAlcoholicTerm(n2);

    const isSweetenerTerm = (name: string) => {
      return name.includes("sweetener") || name.includes("sweetened") || name.includes("gesüsst") || name.includes("gesuesst") || name.includes("sugar-free") || name.includes("zero") || name.includes("diet") || name.includes("light") || name.includes("sucrose") || name.includes("fructose") || name.includes("sugars");
    };
    const hasSweetener = isSweetenerTerm(n1) || isSweetenerTerm(n2);

    const isNameParity = areNamesTooSimilar(n1, n2);

    if (isNonAlcoholic || hasSweetener || isNameParity) {
      return true;
    }

    const diff = candidate.health_score - currentFood.health_score;
    if (currentFood.health_score <= 50) {
      return diff >= 30;
    } else {
      return diff >= 20;
    }
  };

  const areCategoriesCompatible = (cat1: string, cat2: string, name1: string, name2: string): boolean => {
    const c1 = (cat1 || "").toLowerCase();
    const c2 = (cat2 || "").toLowerCase();
    const n1 = (name1 || "").toLowerCase();
    const n2 = (name2 || "").toLowerCase();

    const isPrepared1 = n1.includes(", prepared") || n1.includes("prepared meal") || n1.includes("prepared dish") || c1.includes("prepared") || n1.includes("pizza") || n1.includes("lasagna") || n1.includes("ready meal");
    const isPrepared2 = n2.includes(", prepared") || n2.includes("prepared meal") || n2.includes("prepared dish") || c2.includes("prepared") || n2.includes("pizza") || n2.includes("lasagna") || n2.includes("ready meal");

    if (isPrepared1 !== isPrepared2) {
      return false; // Prohibit swapping prepared dishes with raw/unprepared items
    }

    const isLiquid = (n: string, c: string) => {
      const isSolidTerm = n.includes("fish") || n.includes("meat") || n.includes("beef") || n.includes("chicken") || n.includes("pork") || n.includes("flour") || n.includes("seed") || n.includes("nut") || n.includes("bread") || n.includes("cheese");
      if (isSolidTerm) return false;
      return c.includes("beverage") || n.includes("drink") || n.includes("cola") || n.includes("soda") || n.includes("juice") || n.includes("water") || n.includes("wasser") || n.includes("milk") || n.includes("milch") || n.includes("beer") || n.includes("wine");
    };

    const l1 = isLiquid(n1, c1);
    const l2 = isLiquid(n2, c2);

    if (l1 !== l2) {
      return false; // Strictly prohibit liquid/solid swaps
    }

    if (c1 === c2) {
      return true; // Same broad category is compatible
    }

    // Dairy group (including yogurt, milk alternatives, cheese)
    const isDairyGroup = (c: string, n: string) => 
      c.includes("dairy") || c.includes("cheese") || c.includes("milk") || 
      n.includes("yogurt") || n.includes("joghurt") || n.includes("cheese") || n.includes("butter");

    if (isDairyGroup(c1, n1) && isDairyGroup(c2, n2)) return true;

    // Produce/Fruits/Vegetables
    const isProduceGroup = (c: string) => c.includes("produce") || c.includes("fruit") || c.includes("vegetable");
    if (isProduceGroup(c1) && isProduceGroup(c2)) return true;

    // Snacks/Sweets/Bakery
    const isSnackGroup = (c: string) => c.includes("snack") || c.includes("sweet") || c.includes("bakery") || c.includes("confection");
    if (isSnackGroup(c1) && isSnackGroup(c2)) return true;

    // Grains/Pantry/Pasta
    const isGrainGroup = (c: string) => c.includes("grain") || c.includes("pantry") || c.includes("pasta") || c.includes("rice") || c.includes("cereal");
    if (isGrainGroup(c1) && isGrainGroup(c2)) return true;

    return false;
  };

  const evaluateSwap = (currentFood: Food, candidate: Food, preference: string | string[]): number => {
    let score = 0;

    // 1. Health Score Improvement
    const scoreDiff = candidate.health_score - currentFood.health_score;
    if (scoreDiff <= 0) {
      return -1000; // Must be a healthier option
    }

    // Award points based on health score improvement
    // Incremental steps: use square root for diminishing returns on giant jumps,
    // but award a massive premium for realistic, manageable upgrades (15 to 45 point diff).
    score += Math.sqrt(scoreDiff) * 3;
    if (scoreDiff >= 15 && scoreDiff <= 45) {
      score += 35; // Incremental progress premium
    } else if (scoreDiff > 45) {
      score += 10; // High jump bonus
    }

    // 2. Category Fit (Heavily emphasized!)
    const fromCat = (currentFood.category || "").toLowerCase();
    const toCat = (candidate.category || "").toLowerCase();
    
    if (fromCat === toCat) {
      score += 40; // Broad category match
    } else {
      score -= 150; // Heavy penalty for cross-category swaps
    }

    // Swiss category (granular) match
    const fromSwiss = (currentFood.swiss_category || "").toLowerCase();
    const toSwiss = (candidate.swiss_category || "").toLowerCase();
    if (fromSwiss && toSwiss) {
      if (fromSwiss === toSwiss) {
        score += 120; // Exact granular match! (e.g., "Sweets/Chocolate" -> "Sweets/Chocolate")
      } else {
        // Check for partial branch match (e.g., both "Sweets/..." or both "Dairy/...")
        const fromParent = fromSwiss.split("/")[0];
        const toParent = toSwiss.split("/")[0];
        if (fromParent && toParent && fromParent === toParent) {
          score += 45; // Same parent branch
        }
      }
    }

    // Subcategory match (often used for OFF products)
    const fromSub = (currentFood.subCategory || "").toLowerCase();
    const toSub = (candidate.subCategory || "").toLowerCase();
    if (fromSub && toSub && fromSub === toSub) {
      score += 80; // Exact subcategory match
    }

    // 3. Physical State & Culinary Mismatch Prevention (Crucial UX Improvement!)
    // Avoid swapping drinks/liquids with solid foods (e.g., Soda -> Cheese)
    const isLiquid = (name: string, cat: string) => {
      const n = name.toLowerCase();
      const c = cat.toLowerCase();
      const isSolidTerm = n.includes("fish") || n.includes("meat") || n.includes("beef") || n.includes("chicken") || n.includes("pork") || n.includes("flour") || n.includes("seed") || n.includes("nut") || n.includes("bread") || n.includes("cheese");
      if (isSolidTerm) return false;
      return c.includes("beverage") || n.includes("drink") || n.includes("cola") || n.includes("soda") || n.includes("juice") || n.includes("water") || n.includes("wasser") || n.includes("milk") || n.includes("milch") || n.includes("beer") || n.includes("wine");
    };
    const fromLiquid = isLiquid(currentFood.name, currentFood.category);
    const toLiquid = isLiquid(candidate.name, candidate.category);
    if (fromLiquid !== toLiquid) {
      score -= 250; // Massively penalize state mismatch
    }

    // 4. Name & Semantic Similarity (Sweetened vs Unsweetened, and core nouns)
    const normFrom = (currentFood.name || "").toLowerCase().replace(/[^a-z0-9 ]/g, " ");
    const normTo = (candidate.name || "").toLowerCase().replace(/[^a-z0-9 ]/g, " ");

    const wordsFrom = normFrom.split(/\s+/).filter(w => w.length > 2);
    const wordsTo = normTo.split(/\s+/).filter(w => w.length > 2);

    // Stopwords to ignore during similarity match
    const stopWords = new Set(["and", "with", "the", "for", "from", "swiss", "plain", "fresh", "organic", "bio", "original", "classic"]);
    const cleanWordsFrom = wordsFrom.filter(w => !stopWords.has(w));
    const cleanWordsTo = wordsTo.filter(w => !stopWords.has(w));

    let commonCleanWords = 0;
    for (const w of cleanWordsTo) {
      if (cleanWordsFrom.includes(w)) {
        commonCleanWords++;
      }
    }

    // Huge boost for word overlap in product names (e.g., "Cola" -> "Unsweetened Cola")
    if (commonCleanWords > 0) {
      score += commonCleanWords * 40;
    }

    // Unsweetened vs Sweetened modifier checks
    const sweetenedTerms = ["sweetened", "sweet", "gesüsst", "sugar", "zucker", "classic", "original"];
    const unsweetenedTerms = ["unsweetened", "unsweet", "ungesüsst", "ohne zucker", "sugar-free", "sugar free", "zero", "diet", "light", "plain", "nature"];

    const fromHasSweetened = sweetenedTerms.some(term => normFrom.includes(term));
    const fromHasUnsweetened = unsweetenedTerms.some(term => normFrom.includes(term));
    const toHasUnsweetened = unsweetenedTerms.some(term => normTo.includes(term));

    // If the user is swapping a sweetened or high-sugar item for its unsweetened version of the same product:
    if (commonCleanWords > 0) {
      if ((fromHasSweetened || !fromHasUnsweetened) && toHasUnsweetened) {
        score += 150; // Absolute dream swap! (e.g. Sweetened Cola -> Unsweetened Cola)
      }
    }

    // 5. Nutritional Profile Improvement Details
    const n1 = currentFood.nutrients_per_100;
    const n2 = candidate.nutrients_per_100;

    // Sugars reduction: lower sugars is highly rewarded
    const sugar1 = n1.sugars_g !== undefined ? n1.sugars_g : 0;
    const sugar2 = n2.sugars_g !== undefined ? n2.sugars_g : 0;
    if (sugar2 < sugar1) {
      score += (sugar1 - sugar2) * 4;
    } else if (sugar2 > sugar1 + 2) {
      score -= (sugar2 - sugar1) * 2; // Penalize higher sugar in swaps
    }

    // Saturated fats reduction
    const satFat1 = n1.saturated_fat_g !== undefined ? n1.saturated_fat_g : 0;
    const satFat2 = n2.saturated_fat_g !== undefined ? n2.saturated_fat_g : 0;
    if (satFat2 < satFat1) {
      score += (satFat1 - satFat2) * 5;
    }

    // Sodium / Salt reduction
    const salt1 = n1.salt_g !== undefined ? n1.salt_g : 0;
    const salt2 = n2.salt_g !== undefined ? n2.salt_g : 0;
    if (salt2 < salt1) {
      score += (salt1 - salt2) * 25;
    }

    // Protein increase
    const prot1 = n1.protein_g !== undefined ? n1.protein_g : 0;
    const prot2 = n2.protein_g !== undefined ? n2.protein_g : 0;
    if (prot2 > prot1) {
      score += (prot2 - prot1) * 3;
    }

    // Fiber increase
    const fib1 = n1.fiber_g !== undefined ? n1.fiber_g : 0;
    const fib2 = n2.fiber_g !== undefined ? n2.fiber_g : 0;
    if (fib2 > fib1) {
      score += (fib2 - fib1) * 4;
    }

    // Calorie parity / satisfaction factor: we want swap recommendations to be of comparable energy density
    const kcal1 = n1.kcal || 0;
    const kcal2 = n2.kcal || 0;
    if (kcal1 > 0 && kcal2 > 0) {
      const kcalRatio = Math.min(kcal1, kcal2) / Math.max(kcal1, kcal2);
      if (kcalRatio >= 0.6) {
        score += 20; // Good energy comparability bonus
      } else if (kcal2 > kcal1 * 1.5) {
        score -= 15; // Penalize excessively higher calories
      }
    }

    // 6. Processing Level (NOVA group) Upgrades
    const nova1 = currentFood.nova_group;
    const nova2 = candidate.nova_group;
    if (nova1 && nova2) {
      if (nova1 === 4 && nova2 < 4) {
        score += 35; // NOVA Upgrade Bonus
      }
      if (nova2 === 1) {
        score += 15; // Natural whole food bonus
      }
    }

    // 7. Dietary Preference Enhancements
    const prefs = Array.isArray(preference) ? preference : [preference];
    if (prefs.length > 0 && prefs[0] !== "None") {
      if (prefs.includes("High Protein") && prot2 > prot1) {
        score += 25;
      }
      if (prefs.includes("Low Carb") && sugar2 < sugar1) {
        score += 25;
      }
    }

    return score;
  };

  const getSmartSwapsForFood = (currentFood: Food) => {
    if (currentFood.health_score >= 85) return [];
    
    const activePrefs = userProfile.dietaryPreferences || [userProfile.dietaryPreference || 'None'];
    
    // 1. Same-category candidates with any improvement (even small)
    const sameCatCandidates = allFoods.filter(f => 
      f.id !== currentFood.id &&
      f.health_score > currentFood.health_score &&
      f.category === currentFood.category &&
      !isRestrictedRecommendation(f.name, f.category) &&
      meetsSoftBarrier(currentFood, f) &&
      matchesDietaryPreference(f, activePrefs)
    );
    
    const sortedSameCat = sameCatCandidates.sort((a, b) => 
      evaluateSwap(currentFood, b, activePrefs) - evaluateSwap(currentFood, a, activePrefs)
    );
    
    const swapFoods: Food[] = [];
    
    const isTooSimilarToSelected = (candidate: Food, selectedList: Food[]) => {
      return selectedList.some(item => areNamesTooSimilar(item.name, candidate.name));
    };

    for (const cand of sortedSameCat) {
      if (swapFoods.length >= 2) break;
      if (!isTooSimilarToSelected(cand, swapFoods)) {
        swapFoods.push(cand);
      }
    }
    
    // 2. Fallback to other COMPATIBLE categories if we don't have 2 swaps in the exact same category
    if (swapFoods.length < 2) {
      const compatibleCandidates = allFoods.filter(f => 
        f.id !== currentFood.id &&
        f.health_score > currentFood.health_score &&
        f.category !== currentFood.category &&
        !isRestrictedRecommendation(f.name, f.category) &&
        areCategoriesCompatible(currentFood.category, f.category, currentFood.name, f.name) &&
        meetsSoftBarrier(currentFood, f) &&
        matchesDietaryPreference(f, activePrefs) &&
        !swapFoods.some(sf => sf.id === f.id)
      );
      const sortedFallback = compatibleCandidates.sort((a, b) => 
        evaluateSwap(currentFood, b, activePrefs) - evaluateSwap(currentFood, a, activePrefs)
      );
      
      for (const fallback of sortedFallback) {
        if (swapFoods.length >= 2) break;
        if (!isTooSimilarToSelected(fallback, swapFoods)) {
          swapFoods.push(fallback);
        }
      }
    }
    
    if (swapFoods.length === 0) return [];
    
    return swapFoods.map(swapFood => ({
      fromFood: currentFood,
      toFood: swapFood,
      reason: language === 'en' ? 'Better nutritional profile' : 'Besseres Nährwertprofil',
      scoreDiff: Math.round(swapFood.health_score - currentFood.health_score)
    }));
  };

  const allPossibleSwaps = useMemo(() => {
    const validSwaps: { fromId: string, toId: string }[] = [];
    const activePrefs = userProfile.dietaryPreferences || [userProfile.dietaryPreference || 'None'];
    allFoods.forEach(food => {
      if (food.health_score < 80) {
        const minCandidateScore = Math.min(80, food.health_score + 10);
        const candidates = allFoods.filter(f => 
          f.id !== food.id &&
          f.health_score >= minCandidateScore &&
          f.health_score > food.health_score &&
          f.category === food.category && // Must at least share category
          !isRestrictedRecommendation(f.name, f.category) &&
          meetsSoftBarrier(food, f) &&
          matchesDietaryPreference(f, activePrefs)
        );
        if (candidates.length > 0) {
          const sortedCandidates = candidates.sort((a, b) => 
            evaluateSwap(food, b, activePrefs) - evaluateSwap(food, a, activePrefs)
          );
          validSwaps.push({ fromId: food.id, toId: sortedCandidates[0].id });
        }
      }
    });
    
    // Sort swaps to put the highest scoreDiff first
    validSwaps.sort((a, b) => {
      const fromA = allFoods.find(f => f.id === a.fromId);
      const toA = allFoods.find(f => f.id === a.toId);
      const fromB = allFoods.find(f => f.id === b.fromId);
      const toB = allFoods.find(f => f.id === b.toId);
      if (!fromA || !toA || !fromB || !toB) return 0;
      return (toB.health_score - fromB.health_score) - (toA.health_score - fromA.health_score);
    });
    
    return validSwaps;
  }, [allFoods, userProfile.dietaryPreference, userProfile.dietaryPreferences]);

  const recommendedSwaps = useMemo(() => {
    return allPossibleSwaps.slice(0, 15);
  }, [allPossibleSwaps]);

  const highlightSwap = useMemo(() => {
    const activePrefs = userProfile.dietaryPreferences || [userProfile.dietaryPreference || 'None'];
    const filtered = allPossibleSwaps.filter(swap => {
      const toFood = allFoods.find(f => f.id === swap.toId);
      if (!toFood) return false;
      return matchesDietaryPreference(toFood, activePrefs);
    });
    if (filtered.length === 0) return null;
    
    // Stable daily index based on current date
    const day = new Date().getDate();
    return filtered[day % filtered.length];
  }, [allPossibleSwaps, allFoods, userProfile.dietaryPreference, userProfile.dietaryPreferences]);

  const getBillItemSwaps = (foodItem: Food, preference: string | string[]): Food[] => {
    // Find foods in the same category that have a higher health_score and match dietaryPreference
    const sameCatFoods = allFoods.filter(f => 
      f.category === foodItem.category && 
      f.health_score > foodItem.health_score && 
      f.id !== foodItem.id && 
      !isRestrictedRecommendation(f.name, f.category) &&
      meetsSoftBarrier(foodItem, f) &&
      matchesDietaryPreference(f, preference)
    );
    
    // Sort same category foods using evaluateSwap to honor incremental progress, similar categories, preferences, and name matching!
    const sortedSameCat = sameCatFoods.sort((a, b) => 
      evaluateSwap(foodItem, b, preference) - evaluateSwap(foodItem, a, preference)
    );

    const swapFoods: Food[] = [];
    const isTooSimilarToSelected = (candidate: Food, selectedList: Food[]) => {
      return selectedList.some(item => areNamesTooSimilar(item.name, candidate.name));
    };

    for (const cand of sortedSameCat) {
      if (swapFoods.length >= 3) break;
      if (!isTooSimilarToSelected(cand, swapFoods)) {
        swapFoods.push(cand);
      }
    }
    
    // Fallback to any higher scoring food matching preference in other compatible categories
    if (swapFoods.length < 3) {
      const fallbackFoods = allFoods.filter(f => 
        f.health_score > foodItem.health_score && 
        f.id !== foodItem.id && 
        f.category !== foodItem.category &&
        !isRestrictedRecommendation(f.name, f.category) &&
        areCategoriesCompatible(foodItem.category, f.category, foodItem.name, f.name) &&
        meetsSoftBarrier(foodItem, f) &&
        matchesDietaryPreference(f, preference) &&
        !swapFoods.some(sf => sf.id === f.id)
      );
      const sortedFallback = fallbackFoods.sort((a, b) => 
        evaluateSwap(foodItem, b, preference) - evaluateSwap(foodItem, a, preference)
      );
      
      for (const fallback of sortedFallback) {
        if (swapFoods.length >= 3) break;
        if (!isTooSimilarToSelected(fallback, swapFoods)) {
          swapFoods.push(fallback);
        }
      }
    }
    
    return swapFoods;
  };

  const getWeekLabel = (dateStr: string, lang: 'en' | 'de'): string => {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return lang === 'en' ? 'Other Bills' : 'Andere Belege';
    
    const now = new Date();
    now.setHours(0,0,0,0);
    const itemDate = new Date(d);
    itemDate.setHours(0,0,0,0);
    
    const diffTime = now.getTime() - itemDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 7 && diffDays >= 0) {
      return lang === 'en' ? 'This Week' : 'Diese Woche';
    } else if (diffDays < 14 && diffDays >= 7) {
      return lang === 'en' ? 'Last Week' : 'Letzte Woche';
    } else {
      const startOfWeek = new Date(itemDate);
      const day = startOfWeek.getDay();
      const diffToMonday = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
      startOfWeek.setDate(diffToMonday);
      return lang === 'en' 
        ? `Week of ${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
        : `Woche vom ${startOfWeek.toLocaleDateString('de-DE', { day: 'numeric', month: 'short', year: 'numeric' })}`;
    }
  };

  const foodsMatchingPreference = useMemo(() => {
    const activePrefs = userProfile.dietaryPreferences || [userProfile.dietaryPreference || 'None'];
    return [...allFoods]
      .filter(f => matchesDietaryPreference(f, activePrefs))
      .sort((a, b) => {
        const aVal = Math.sin(a.id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) + randomSeed);
        const bVal = Math.sin(b.id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) + randomSeed);
        return aVal - bVal;
      });
  }, [allFoods, userProfile.dietaryPreference, userProfile.dietaryPreferences, randomSeed]);
  const spotlightFood = foodsMatchingPreference.find(f => f.id === "hass_avocado") || foodsMatchingPreference[0] || allFoods[0];

  // Recommendations mapping
  const RECOMMENDATIONS = [
    {
      foodId: "salmon",
      reason: "Unmatched anti-inflammatory Omega-3 fatty acids and highly digestible, complete protein."
    },
    {
      foodId: "hass_avocado",
      reason: "High soluble fiber and healthy monounsaturated lipids that provide stable metabolic satiety."
    },
    {
      foodId: "greek_yogurt",
      reason: "Outstanding bone-rebuilding calcium density coupled with rich active probiotic cultures."
    },
    {
      foodId: "spinach",
      reason: "Vast micronutrient density (Vitamins A, K & Iron) with practically zero impact on blood sugar."
    },
    {
      foodId: "almonds",
      reason: "Potent source of cellular Vitamin E antioxidants and raw muscle-relaxing magnesium."
    }
  ];

  // Advanced case/accent-insensitive text normalization
  const normalizeText = (text: string | undefined): string => {
    if (!text) return "";
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // remove accents/umlauts
      .replace(/ä/g, "a")
      .replace(/ö/g, "o")
      .replace(/ü/g, "u")
      .replace(/ß/g, "ss")
      .trim();
  };

  // Filters logic with advanced synonym, cross-language, and tab-aware category rules
  useEffect(() => { setFoodDisplayLimit(20); }, [searchQuery, activeTab, selectedCategory]);

  const filteredFoods = allFoods.filter(food => {
    const effectiveCategory = activeTab === "search" ? "All" : selectedCategory;
    const categoryMatches = effectiveCategory === "All" || food.category === effectiveCategory;
    
    const query = normalizeText(searchQuery);
    let searchMatches = true;
    
    if (query) {
      const q = query.trim();
      const nameMatch = normalizeText(food.name).includes(q);
      
      const originalFood = allFoods.find(f => f.id === food.id);
      let origNameMatch = false;
      if (originalFood) {
        origNameMatch = normalizeText(originalFood.name).includes(q);
      }
      
      let synonymMatch = false;
      const synonyms: Record<string, string[]> = {
        avocado: ["avocados", "avocado", "hass_avocado"],
        joghurt: ["yogurt", "joghurt", "yoghurt", "griechischer naturjoghurt", "naturjoghurt"],
        yogurt: ["joghurt", "yogurt", "yoghurt", "greek yogurt"],
        haferflocken: ["oats", "haferflocken", "rolled oats", "breakfast cereals"],
        oats: ["haferflocken", "oats"],
        spinat: ["spinach", "spinat", "baby spinach"],
        spinach: ["spinat", "spinach", "baby spinach"],
        blaubeeren: ["blueberries", "blaubeeren", "berry", "berries", "blueberry"],
        blueberries: ["blaubeeren", "blueberries", "blueberry", "berry", "berries"],
        apfel: ["apples", "apfel", "apple"],
        apples: ["apfel", "apples", "apple"],
        apple: ["apfel", "apple", "apples"],
        wasser: ["water", "wasser", "sidi ali"],
        water: ["wasser", "water", "sidi ali"],
        zucchini: ["zucchini", "vegetables", "gemuse", "courgette"],
        eier: ["eggs", "eier", "egg", "ei"],
        eggs: ["eier", "eggs", "egg", "ei"],
        erdnussbutter: ["peanut butter", "erdnussbutter", "peanut", "erdnuss"],
        peanut: ["erdnussbutter", "peanut", "peanut butter"]
      };
      
      for (const [key, list] of Object.entries(synonyms)) {
        if (q === key || list.includes(q)) {
           if (list.some(syn => 
               normalizeText(food.name).includes(syn) || 
              (originalFood && normalizeText(originalFood.name).includes(syn))
           )) {
             synonymMatch = true;
             break;
           }
        }
      }
      
      const translatedCat = translateCategoryName(food.category, language);
      const catMatch = normalizeText(food.category).includes(q) || 
                       normalizeText(translatedCat).includes(q) || 
                       (food.subCategory && normalizeText(food.subCategory).includes(q));
      
      // Specifically map "Dairy" to "Dairy & Eggs"
      let customCatMatch = false;
      if (q.includes("dairy") || q.includes("milch")) {
         customCatMatch = food.category === "Dairy & Eggs";
      }

      searchMatches = nameMatch || origNameMatch || synonymMatch || catMatch || customCatMatch;
    }
    
    const preferenceMatches = query ? true : matchesDietaryPreference(food, userProfile.dietaryPreferences || [userProfile.dietaryPreference || 'None']);
    
    // Advanced Filters (only in search tab)
    let advancedMatches = true;
    if (activeTab === "search") {
      if (searchCategory !== "All" && food.category !== searchCategory) {
        advancedMatches = false;
      }
      if (searchSubCategory !== "All" && food.subCategory !== searchSubCategory) {
        advancedMatches = false;
      }
      if (searchNutriScores.length > 0 && !searchNutriScores.includes((food.nutri_grade || 'A').toUpperCase())) {
        advancedMatches = false;
      }
      if (searchNovaScores.length > 0 && (!food.nova_group || !searchNovaScores.includes(food.nova_group))) {
        advancedMatches = false;
      }
      if (searchFavoritesOnly && !favoriteFoodIds.includes(food.id)) {
        advancedMatches = false;
      }
      if (searchMaxCalories < 1000 && food.nutrients_per_100 && (food.nutrients_per_100.kcal || 0) > searchMaxCalories) {
        advancedMatches = false;
      }
    }
    
    return categoryMatches && searchMatches && preferenceMatches && advancedMatches;
  });

  const queryForSort = normalizeText(searchQuery).trim();
  if (queryForSort) {
    filteredFoods.sort((a, b) => {
      const aName = normalizeText(a.name);
      const bName = normalizeText(b.name);
      
      const aExact = aName === queryForSort;
      const bExact = bName === queryForSort;
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;

      const aStartsWith = aName.startsWith(queryForSort);
      const bStartsWith = bName.startsWith(queryForSort);
      if (aStartsWith && !bStartsWith) return -1;
      if (!aStartsWith && bStartsWith) return 1;
      
      const aIncludes = aName.includes(queryForSort);
      const bIncludes = bName.includes(queryForSort);
      
      if (aIncludes && bIncludes) {
        // Both include the query, prioritize the one where the query appears earlier
        const aIndex = aName.indexOf(queryForSort);
        const bIndex = bName.indexOf(queryForSort);
        if (aIndex !== bIndex) {
          return aIndex - bIndex;
        }
      } else if (aIncludes && !bIncludes) {
        return -1;
      } else if (!aIncludes && bIncludes) {
        return 1;
      }

      // If lengths are different, prefer the shorter string (more exact match)
      if (aName.length !== bName.length) {
        return aName.length - bName.length;
      }

      return aName.localeCompare(bName);
    });
  } else {
    filteredFoods.sort((a, b) => {
      const aVal = Math.sin(a.id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) + randomSeed);
      const bVal = Math.sin(b.id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) + randomSeed);
      return aVal - bVal;
    });
  }
  
  const limitedFilteredFoods = filteredFoods.slice(0, foodDisplayLimit);

  const popularSearches = language === 'en'
    ? ["Dairy", "Produce", "Snacks", "Beverages", "Pantry"]
    : ["Milchprodukte", "Frischeprodukte", "Snacks", "Getränke", "Vorratskammer"];
    
  const availableSubCategories = Array.from(new Set(allFoods.map(f => f.subCategory).filter(Boolean))) as string[];

  const handleQuickSearch = (term: string) => {
    triggerHaptic();
    setSearchQuery(term);
  };

  const handleOpenFood = (id: string) => {
    triggerHaptic();
    setSelectedFoodId(id);
    setDragOffset(0);
  };

  const handleCloseFood = () => {
    triggerHaptic();
    setSelectedFoodId(null);
  };

  const handleTabChange = (tab: "home" | "search" | "recipes" | "swaps" | "bill" | "scan" | "profile") => {
    triggerHaptic();
    setActiveTab(tab);
    // Auto reset some states
    if (tab !== "search") setSearchQuery("");
    if (tab !== "swaps") {
      setShowSwapSearch(false);
      setSwapSearchQuery("");
    }
  };

  // Drag and swipe handling for bottom sheet
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - touchStartY.current;
    if (deltaY > 0) {
      setDragOffset(deltaY);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (dragOffset > 120) {
      setSelectedFoodId(null);
    }
    setDragOffset(0);
  };

  const currentFoodDetail = useMemo(() => {
    if (!selectedFoodId) return undefined;
    const found = allFoods.find(f => f.id === selectedFoodId);
    if (found) return found;
    const dyn = dynamicFoods.find(f => f.id === selectedFoodId);
    if (dyn) return getTranslatedFood(dyn, language);
    return undefined;
  }, [selectedFoodId, allFoods, dynamicFoods, language]);

  return (
    <div className="h-[100dvh] bg-neutral-100 dark:bg-black flex justify-center items-stretch antialiased selection:bg-emerald-200 transition-colors duration-200">
      {/* App Shell Frame */}
      <div id="app_shell_frame" className="w-full max-w-[430px] h-full bg-[#F7FBF6] dark:bg-black text-neutral-800 dark:text-neutral-100 shadow-xl relative flex flex-col overflow-hidden border-x border-[#E5EAE3] dark:border-black transition-colors duration-200">
        
        {/* SCANNING PROGRESS OVERLAY */}
        {isScanning && (
          <div className="absolute inset-0 z-50 bg-[#F7FBF6]/95 dark:bg-black/95 flex flex-col items-center justify-center p-8 text-center backdrop-blur-sm transition-all duration-300">
            <div className="relative w-28 h-28 flex items-center justify-center mb-8">
              {/* Outer Pulsing Glow */}
              <div className="absolute inset-0 rounded-full bg-[#EAF3EB] dark:bg-emerald-950/45 animate-ping opacity-75" />
              {/* Icon Container */}
              <div className="relative w-20 h-20 rounded-full bg-[#EAF3EB] dark:bg-emerald-950 border-2 border-[#519D46] flex items-center justify-center text-[#2F7E41] dark:text-emerald-400 shadow-md">
                <ScanLine className="w-10 h-10 animate-pulse" />
              </div>
              
              {/* Spinning Ring */}
              <div className="absolute inset-0 border-4 border-transparent border-t-[#519D46] rounded-full animate-spin" />
            </div>

            <div className="space-y-4 max-w-[85%]">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                Analyzing Receipt
              </h3>
              <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 min-h-[40px] leading-relaxed">
                {scanStatus || "Uploading image..."}
              </p>
            </div>

            {/* Progress Meter */}
            {scanProgress && (
              <div className="w-full max-w-[260px] space-y-2 mt-6">
                <div className="flex justify-between text-xs font-bold text-neutral-500 dark:text-neutral-400">
                  <span>Progress</span>
                  <span>{scanProgress.current} / {scanProgress.total}</span>
                </div>
                <div className="h-2 bg-neutral-200/80 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#519D46] rounded-full transition-all duration-300" 
                    style={{ width: `${(scanProgress.current / scanProgress.total) * 100}%` }}
                  />
                </div>
                <p className="text-[11px] text-neutral-400 font-medium">
                  Connecting to Open Food Facts API...
                </p>
              </div>
            )}
          </div>
        )}

        {/* VIEWPORTS */}
        <div className="flex-1 flex flex-col min-h-0 relative overflow-hidden">
          
          {/* ==================== HOME TAB ==================== */}
          {activeTab === "home" && (
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
              {/* Fixed Header */}
              <div className="px-5 pt-8 pb-3 space-y-4 flex-shrink-0 bg-[#F7FBF6] dark:bg-black">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div className="space-y-0.5">
                    <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
                      {t("groceries")}
                    </h1>
                    <p className="text-[15px] text-neutral-500 dark:text-neutral-400 font-medium">
                      {t("guide")}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleTabChange('search')} 
                        className="w-10 h-10 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 flex items-center justify-center hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors shadow-sm"
                        title={language === 'en' ? 'Search' : 'Suchen'}
                      >
                        <Search className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
                      </button>
                      <button 
                        onClick={() => handleTabChange('profile')} 
                        className="w-10 h-10 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 flex items-center justify-center hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors shadow-sm"
                        title={language === 'en' ? 'Profile' : 'Profil'}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-700 dark:text-neutral-300">
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </button>
                    </div>
                    <button 
                      onClick={() => { triggerHaptic(); setShowCalorieDetail(true); }}
                      className="bg-[#EAF3EB] dark:bg-emerald-950/45 text-[#2F7E41] dark:text-emerald-400 text-xs font-bold px-2.5 py-1.5 rounded-full flex items-center gap-1 active:scale-95 transition-transform hover:bg-[#DCEFDE] dark:hover:bg-emerald-950/70"
                    >
                      <Flame className="w-3 h-3 fill-current" />
                      {getDailyCalorieTarget().toLocaleString()} kcal
                    </button>
                  </div>
                </div>

                {/* Personalised Pill */}
                <div>
                  <button 
                    onClick={() => handleTabChange('profile')} 
                    className="inline-flex items-center gap-1.5 text-[#2F7E41] dark:text-emerald-400 text-xs font-semibold border border-[#CDE5CE] dark:border-neutral-800 bg-[#F4F9F4] dark:bg-emerald-950/30 px-3.5 py-1.5 rounded-full hover:bg-[#EAF3EB] dark:hover:bg-emerald-950/55 transition-colors shadow-sm"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 21v-7" />
                      <path d="M4 10V3" />
                      <path d="M12 21v-9" />
                      <path d="M12 8V3" />
                      <path d="M20 21v-5" />
                      <path d="M20 12V3" />
                      <path d="M1 14h6" />
                      <path d="M9 8h6" />
                      <path d="M17 16h6" />
                    </svg>
                    {(() => {
                      const prefs = (userProfile.dietaryPreferences || [userProfile.dietaryPreference || 'None']).filter(p => p !== 'None');
                      if (prefs.length === 0) return t("personalise");
                      return prefs.map(pref => {
                        if (language === 'en') return pref;
                        if (pref === 'High Protein') return 'Viel Eiweiß';
                        if (pref === 'Low Carb') return 'Wenig Kohlenhydrate';
                        if (pref === 'Vegetarian') return 'Vegetarisch';
                        if (pref === 'Vegan') return 'Vegan';
                        return pref;
                      }).join(' • ');
                    })()} • {t("recommendedLabel")}
                  </button>
                </div>
              </div>

              {/* Scrollable Rest */}
              <div className="flex-1 overflow-y-auto px-5 pb-32 space-y-6 no-scrollbar">
                {/* Health Points Card */}
                <div className="bg-white dark:bg-neutral-900 rounded-[1.25rem] border border-[#E5EAE3] dark:border-neutral-800 p-4 min-[380px]:p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-row items-center gap-3.5 min-[380px]:gap-5">
                  <div className="relative w-20 h-20 min-[380px]:w-[100px] min-[380px]:h-[100px] shrink-0">
                    <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="42" fill="none" className="stroke-neutral-200 dark:stroke-neutral-800" strokeWidth="10" />
                      <circle 
                        cx="50" cy="50" r="42" fill="none" stroke="#519D46" strokeWidth="10" 
                        strokeDasharray="264" strokeDashoffset={healthOffset} strokeLinecap="round" 
                        style={{ transition: "stroke-dashoffset 1s ease-out" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl min-[380px]:text-2xl font-bold text-[#3B7A32] dark:text-emerald-400 leading-none">{avgHealthScore}%</span>
                  </div>
                </div>
                <div className="space-y-2 min-[380px]:space-y-2.5 min-w-0 flex-1 text-left">
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-bold text-[#519D46] dark:text-emerald-400 tracking-wider uppercase">{t("thisWeek")}</p>
                    <h2 className="text-base min-[360px]:text-lg min-[410px]:text-[22px] font-bold text-neutral-900 dark:text-white leading-tight tracking-tight min-[360px]:tracking-normal break-words">{t("healthPoints")}</h2>
                    <p className="text-[11px] min-[380px]:text-xs text-neutral-500 dark:text-neutral-400 font-medium text-left">{t("scanPrompt")}</p>
                  </div>
                  <button 
                    onClick={() => handleTabChange("scan")}
                    className="bg-[#519D46] hover:bg-[#438739] transition-colors text-white text-xs min-[380px]:text-sm font-semibold py-2 min-[380px]:py-2.5 px-3 min-[380px]:px-4 rounded-xl flex items-center gap-1.5 min-[380px]:gap-2"
                  >
                    <Camera className="w-3.5 h-3.5 min-[380px]:w-4 min-[380px]:h-4" />
                    {t("scanReceiptLower")}
                  </button>
                </div>
              </div>

              {/* Spotlight Banner Card */}
              <div 
                onClick={() => handleOpenFood(spotlightFood.id)}
                className="bg-white dark:bg-neutral-900 rounded-[1.25rem] border border-[#E5EAE3] dark:border-neutral-800 p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] cursor-pointer active:scale-[0.98] transition-transform"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1 text-left">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <FoodIcon food={spotlightFood} className="w-4 h-4 text-[#519D46] dark:text-emerald-400 stroke-[2.2]" />
                      <p className="text-[10px] font-bold text-[#519D46] tracking-wider uppercase leading-none">{t("spotlight")}</p>
                    </div>
                    <h3 className="text-[22px] font-bold text-neutral-900 dark:text-neutral-100 leading-tight">
                      {spotlightFood.name}
                    </h3>
                    
                  </div>
                  <div className="flex-shrink-0 -mt-1">
                    <ScoreRing score={spotlightFood.health_score} size={84} strokeWidth={6} />
                  </div>
                </div>

                

                <div className="bg-[#F7FBF6] dark:bg-neutral-800 rounded-xl flex items-center justify-between p-4 mt-4">
                  <div className="text-center flex-1">
                    <p className="text-sm font-bold text-neutral-900 dark:text-neutral-100">{Math.round(spotlightFood.nutrients_per_100.kcal)} kcal / 100g</p>
                    <p className="text-[10px] text-neutral-400 mt-0.5">{t("calories")}</p>
                  </div>
                  <div className="w-px h-8 bg-[#E5EAE3] dark:bg-neutral-700" />
                  <div className="text-center flex-1">
                    <p className="text-sm font-bold text-neutral-900 dark:text-neutral-100">{spotlightFood.nutrients_per_100.protein_g}g</p>
                    <p className="text-[10px] text-neutral-400 mt-0.5">{t("protein")}</p>
                  </div>
                  <div className="w-px h-8 bg-[#E5EAE3] dark:bg-neutral-700" />
                  <div className="text-center flex-1">
                    <p className="text-sm font-bold text-neutral-900 dark:text-neutral-100">{spotlightFood.nutrients_per_100.carbs_g}g</p>
                    <p className="text-[10px] text-neutral-400 mt-0.5">{language === 'en' ? 'Carbs' : 'Kohlenh.'}</p>
                  </div>
                  <div className="w-px h-8 bg-[#E5EAE3] dark:bg-neutral-700" />
                  <div className="text-center flex-1">
                    <p className="text-sm font-bold text-neutral-900 dark:text-neutral-100">{spotlightFood.nutrients_per_100.fat_g}g</p>
                    <p className="text-[10px] text-neutral-400 mt-0.5">{language === 'en' ? 'Fat' : 'Fett'}</p>
                  </div>
                  
                </div>
              </div>

              {/* My Favorites Section */}
              {(favoriteFoodIds.length > 0 || favoriteSwapIds.length > 0) ? (
                <div className="space-y-4 pt-2 text-left">
                  <h3 className="text-[20px] font-bold text-neutral-900 dark:text-white tracking-tight flex items-center gap-1.5">
                    <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                    {language === 'en' ? 'My Favorites' : 'Meine Favoriten'}
                  </h3>
                  
                  {/* Favorited Foods scrolling container */}
                  {favoriteFoodIds.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider px-0.5">
                        {language === 'en' ? 'Saved Foods' : 'Gespeicherte Lebensmittel'}
                      </p>
                      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-3 -mx-5 px-5">
                        {allFoods.filter(f => favoriteFoodIds.includes(f.id)).map((food) => (
                          <div 
                            key={food.id}
                            onClick={() => handleOpenFood(food.id)}
                            className="w-[140px] shrink-0 bg-white dark:bg-neutral-900 rounded-[1.25rem] border border-[#E5EAE3] dark:border-neutral-800 p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col items-center gap-3 cursor-pointer active:scale-[0.98] transition-transform relative"
                          >
                            <div className="relative">
                              <ScoreRing score={food.health_score} size={64} strokeWidth={5} />
                              <div className="absolute -bottom-1 -right-1 bg-[#F2F7F2] dark:bg-emerald-950/60 border border-[#CDE5CE] dark:border-emerald-900/60 p-1 rounded-full shadow-sm">
                                <FoodIcon food={food} className="w-3.5 h-3.5 text-[#519D46] dark:text-emerald-400 stroke-[2]" />
                              </div>
                            </div>
                            <div className="text-center w-full">
                              <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 truncate w-full">{food.name}</h4>
                              <p className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-0.5">{Math.round(food.nutrients_per_100.kcal)} kcal / 100g</p>
                            </div>
                            
                            {/* Heart indicator in corner */}
                            <button
                              onClick={(e) => toggleFavoriteFood(food.id, e)}
                              className="absolute top-2.5 right-2.5 p-1 bg-white/80 dark:bg-neutral-800/80 hover:bg-white dark:hover:bg-neutral-700 rounded-full shadow-sm z-20"
                            >
                              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Favorited Swaps container */}
                  {favoriteSwapIds.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <p className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider px-0.5">
                        {language === 'en' ? 'Saved Swaps' : 'Gespeicherte Alternativen'}
                      </p>
                      <div className="space-y-2.5">
                        {favoriteSwapIds.map((key) => {
                          const [fromId, toId] = key.split('::');
                          const fromFood = allFoods.find(f => f.id === fromId);
                          const toFood = allFoods.find(f => f.id === toId);
                          if (!fromFood || !toFood) return null;
                          const scoreDiff = Math.round(toFood.health_score - fromFood.health_score);

                          return (
                            <div 
                              key={key}
                              onClick={() => {
                                triggerHaptic();
                                setSelectedFoodId(toFood.id);
                              }}
                              className="bg-white dark:bg-neutral-900 rounded-[1.25rem] border border-[#E5EAE3] dark:border-neutral-800 p-4 shadow-sm hover:shadow-md cursor-pointer transition-all flex items-start gap-3 relative group"
                            >
                              <div className="flex-1 min-w-0 pr-8">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="text-xs font-bold text-neutral-400 dark:text-neutral-500">{fromFood.name}</span>
                                  <ArrowRight className="w-3 h-3 text-neutral-300 dark:text-neutral-600" />
                                  <span className="text-sm font-bold text-[#519D46] dark:text-emerald-400">{toFood.name}</span>
                                </div>
                                <p className="text-xs text-neutral-400 dark:text-neutral-550 font-medium mt-1 leading-snug">
                                  {language === 'en' ? `Upgrade to ${toFood.name} and boost score by +${scoreDiff}%` : `Wechseln Sie zu ${toFood.name} für +${scoreDiff}% Gesundheitspunkte`}
                                </p>
                              </div>

                              <button
                                onClick={(e) => toggleFavoriteSwap(fromId, toId, e)}
                                className="absolute top-3.5 right-3.5 p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors z-20"
                              >
                                <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ) : null}

              {/* Recommended for You */}
              <div className="space-y-4 pt-2">
                <div className="flex justify-between items-baseline px-0.5">
                  <h3 className="text-[20px] font-bold text-neutral-900 tracking-tight">
                    {t("recommended")}
                  </h3>
                  <div className="relative inline-flex items-center">
                    <select 
                      value={userProfile.dietaryPreference || 'None'}
                      onChange={(e) => {
                        const val = e.target.value;
                        setUserProfile(p => ({ 
                          ...p, 
                          dietaryPreference: val,
                          dietaryPreferences: [val]
                        }));
                      }}
                      className="text-xs font-semibold text-[#519D46] dark:text-emerald-400 bg-[#EAF3EB] dark:bg-emerald-900/30 px-3 py-1 rounded-full cursor-pointer hover:bg-[#DCEFDE] dark:hover:bg-emerald-800/40 transition-colors appearance-none outline-none"
                    >
                      <option value="None">{language === 'en' ? 'Balanced' : 'Ausgewogen'}</option>
                      <option value="High Protein">{language === 'en' ? 'High Protein' : 'Viel Eiweiß'}</option>
                      <option value="Low Carb">{language === 'en' ? 'Low Carb' : 'Wenig Kohlenhydrate'}</option>
                      <option value="Vegetarian">{language === 'en' ? 'Vegetarian' : 'Vegetarisch'}</option>
                      <option value="Vegan">{language === 'en' ? 'Vegan' : 'Vegan'}</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-5 px-5">
                  {foodsMatchingPreference.filter(f => f.health_score > 75).slice(0, 20).map((food) => (
                    <div 
                      key={food.id}
                      onClick={() => handleOpenFood(food.id)}
                      className="w-[140px] shrink-0 bg-white dark:bg-neutral-900 rounded-[1.25rem] border border-[#E5EAE3] dark:border-neutral-800 p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col items-center gap-3 cursor-pointer active:scale-[0.98] transition-transform"
                    >
                      <div className="relative">
                        <ScoreRing score={food.health_score} size={64} strokeWidth={5} />
                        <div className="absolute -bottom-1 -right-1 bg-[#F2F7F2] dark:bg-emerald-950/60 border border-[#CDE5CE] dark:border-emerald-900/60 p-1 rounded-full shadow-sm">
                          <FoodIcon food={food} className="w-3.5 h-3.5 text-[#519D46] dark:text-emerald-400 stroke-[2]" />
                        </div>
                      </div>
                      <div className="text-center w-full">
                        <h4 className="text-sm font-bold text-neutral-900 truncate w-full">{food.name}</h4>
                        <p className="text-[10px] text-neutral-400 mt-0.5">{Math.round(food.nutrients_per_100.kcal)} kcal / 100g</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              </div>
            </div>
          )}

          
          {/* ==================== PROFILE TAB ==================== */}
          {activeTab === "profile" && (
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
              {/* Header with Back Button (stays on top) */}
              <div className="px-5 pt-8 pb-3 flex items-center gap-3.5 flex-shrink-0 bg-[#F7FBF6] dark:bg-black">
                <button 
                  onClick={() => handleTabChange("home")}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-neutral-800 border border-[#E5EAE3] dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-sm active:scale-95 transition-transform"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="space-y-0.5 text-left">
                  <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight leading-none">
                    {t("myProfile")}
                  </h1>
                  <p className="text-xs text-neutral-500 font-medium">
                    {t("personaliseExp")}
                  </p>
                </div>
              </div>

              {/* Scrollable Rest of Profile */}
              <div className="flex-1 overflow-y-auto px-5 pb-32 space-y-8 no-scrollbar">
                {/* Language Selector at the top of profile */}
              <div className="bg-white dark:bg-neutral-900 border border-[#E5EAE3] dark:border-neutral-800 rounded-[24px] p-5 shadow-sm text-left">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-neutral-900 text-base">Language / Sprache</h3>
                    <p className="text-xs text-neutral-400 font-medium">{language === "en" ? "App language" : "App-Sprache"}</p>
                  </div>
                  <div className="flex bg-[#EEF2ED] dark:bg-neutral-800 rounded-xl p-1 shrink-0">
                    <button
                      onClick={() => { triggerHaptic(); setLanguage("en"); }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${language === "en" ? "bg-white dark:bg-[#1a1e17] text-[#519D46] dark:text-emerald-400 shadow-sm" : "text-neutral-500"}`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => { triggerHaptic(); setLanguage("de"); }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${language === "de" ? "bg-white dark:bg-[#1a1e17] text-[#519D46] dark:text-emerald-400 shadow-sm" : "text-neutral-500"}`}
                    >
                      Deutsch
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Daily Calorie Target Card */}
              <button 
                onClick={() => { triggerHaptic(); setShowCalorieDetail(true); }}
                className="w-full text-left bg-[#EAF3EB] dark:bg-emerald-950/20 hover:bg-[#DCEFDE] dark:hover:bg-emerald-950/30 transition-all rounded-[24px] p-6 relative overflow-hidden active:scale-[0.98] border border-[#CDE5CE] dark:border-[#1e3e23]"
              >
                <div className="relative z-10 space-y-2 pr-[74px]">
                  <h3 className="text-[#3B7A32] dark:text-emerald-400 text-xs font-bold tracking-wider uppercase">
                    {t("calorieTarget")}
                  </h3>
                  <div className="text-[32px] font-bold text-neutral-900 dark:text-neutral-100 leading-none">
                    {getDailyCalorieTarget().toLocaleString()} kcal
                  </div>
                  <p className="text-[#7F9E82] dark:text-neutral-400 text-sm font-medium text-left">
                    {language === "en" ? "Calculated from your profile • Tap to view breakdown" : "Aus Profil berechnet • Tippen für Aufteilung"}
                  </p>
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 right-6 w-16 h-16 bg-white dark:bg-neutral-900 rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.05)] border dark:border-neutral-800">
                  <svg className="w-8 h-8 text-[#519D46] dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
              </button>

              {/* Appearance Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-[#519D46]" />
                  <h2 className="text-[22px] font-bold text-neutral-900 tracking-tight">{t("appearance")}</h2>
                </div>
                <div className="bg-white dark:bg-neutral-900 border border-[#E5EAE3] dark:border-neutral-800 rounded-[24px] p-5 shadow-sm text-left">
                  <p className="text-[15px] text-neutral-500 font-medium mb-4">{t("colorScheme")}</p>
                  <div className="grid grid-cols-3 gap-3">
                    {['Light', 'Auto', 'Dark'].map(scheme => (
                      <button
                        key={scheme}
                        onClick={() => setUserProfile(p => ({ ...p, colorScheme: scheme }))}
                        className={`flex flex-col items-center justify-center gap-2 py-4 rounded-2xl border ${
                          userProfile.colorScheme === scheme 
                            ? 'border-[#519D46] bg-[#F7FBF6] text-[#519D46]' 
                            : 'border-[#E5EAE3] bg-[#FDFDFD] text-neutral-500'
                        } transition-colors`}
                      >
                        {scheme === 'Light' && <Sun className="w-5 h-5" />}
                        {scheme === 'Auto' && <Smartphone className="w-5 h-5" />}
                        {scheme === 'Dark' && <Moon className="w-5 h-5" />}
                        <span className="text-[13px] font-semibold">{scheme === 'Light' ? (language === 'en' ? 'Light' : 'Hell') : scheme === 'Dark' ? (language === 'en' ? 'Dark' : 'Dunkel') : scheme}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Personal Info Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-[#519D46]" />
                  <h2 className="text-[22px] font-bold text-neutral-900 tracking-tight">{t("personalInfo")}</h2>
                </div>
                <div className="bg-white dark:bg-neutral-900 border border-[#E5EAE3] dark:border-neutral-800 rounded-[24px] p-5 shadow-sm space-y-6 text-left">
                  <div>
                    <p className="text-[15px] text-neutral-500 font-medium mb-3">{t("sex")}</p>
                    <div className="grid grid-cols-2 gap-3">
                      {['Male', 'Female'].map(sex => (
                        <button
                          key={sex}
                          onClick={() => setUserProfile(p => ({ ...p, sex }))}
                          className={`py-3.5 rounded-[16px] font-bold text-[15px] transition-colors border ${
                            userProfile.sex === sex 
                              ? 'bg-[#519D46] border-[#519D46] text-white shadow-sm' 
                              : 'bg-[#FDFDFD] border-[#E5EAE3] text-neutral-500'
                          }`}
                        >
                          {sex === 'Male' ? t("male") : t("female")}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div className="flex flex-col items-center">
                      <p className="text-[13px] text-neutral-400 font-medium mb-2">{t("age")}</p>
                      <div className="w-full bg-[#FDFDFD] border border-[#E5EAE3] rounded-[16px] py-3 flex flex-col items-center relative overflow-hidden">
                        <input
                          type="number"
                          value={userProfile.age || ''}
                          onChange={e => setUserProfile(p => ({ ...p, age: parseInt(e.target.value) || 0 }))}
                          className="w-full text-center text-xl font-bold text-neutral-900 bg-transparent outline-none appearance-none border-0"
                        />
                        <span className="text-[11px] font-semibold text-neutral-400">{language === 'en' ? 'yrs' : 'Jahre'}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <p className="text-[13px] text-neutral-400 font-medium mb-2">{t("weight")}</p>
                      <div className="w-full bg-[#FDFDFD] border border-[#E5EAE3] rounded-[16px] py-3 flex flex-col items-center relative overflow-hidden">
                        <input
                          type="number"
                          value={userProfile.weight || ''}
                          onChange={e => setUserProfile(p => ({ ...p, weight: parseInt(e.target.value) || 0 }))}
                          className="w-full text-center text-xl font-bold text-neutral-900 bg-transparent outline-none appearance-none border-0"
                        />
                        <span className="text-[11px] font-semibold text-neutral-400">kg</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <p className="text-[13px] text-neutral-400 font-medium mb-2">{t("height")}</p>
                      <div className="w-full bg-[#FDFDFD] border border-[#E5EAE3] rounded-[16px] py-3 flex flex-col items-center relative overflow-hidden">
                        <input
                          type="number"
                          value={userProfile.height || ''}
                          onChange={e => setUserProfile(p => ({ ...p, height: parseInt(e.target.value) || 0 }))}
                          className="w-full text-center text-xl font-bold text-neutral-900 bg-transparent outline-none appearance-none border-0"
                        />
                        <span className="text-[11px] font-semibold text-neutral-400">cm</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity Level Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-[#519D46]" />
                  <h2 className="text-[22px] font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">{t("activityLevel")}</h2>
                </div>
                <div className="bg-white dark:bg-neutral-900 border border-[#E5EAE3] dark:border-neutral-800 rounded-[24px] p-5 shadow-sm space-y-3">
                  {[
                    { id: 'Sedentary', label: t("sedentary"), desc: t("noExercise") },
                    { id: 'Lightly Active', label: t("lightlyActive"), desc: t("lightExercise") },
                    { id: 'Moderately Active', label: t("moderatelyActive"), desc: t("modExercise") },
                    { id: 'Very Active', label: t("veryActive"), desc: t("heavyExercise") },
                    { id: 'Extra Active', label: t("extraActive"), desc: t("extraExercise") },
                  ].map((level) => {
                    const isSelected = userProfile.activityLevel === level.id || (level.id === 'Moderately Active' && userProfile.activityLevel === 'Active');
                    return (
                      <button
                        key={level.id}
                        onClick={() => setUserProfile(p => ({ ...p, activityLevel: level.id }))}
                        className={`w-full text-left p-3.5 rounded-[18px] transition-all border flex flex-col gap-0.5 ${
                          isSelected 
                            ? 'bg-[#EAF3EB] dark:bg-emerald-950/45 border-[#519D46] text-[#2F7E41] dark:text-emerald-400 shadow-[0_2px_8px_rgba(81,157,70,0.06)]' 
                            : 'bg-[#FDFDFD] dark:bg-neutral-900/40 border-[#E5EAE3] dark:border-neutral-800 text-neutral-500 hover:border-neutral-300 dark:hover:border-neutral-750'
                        }`}
                      >
                        <span className={`font-bold text-[14px] ${isSelected ? 'text-[#2F7E41] dark:text-emerald-400' : 'text-neutral-800 dark:text-neutral-250'}`}>{level.label}</span>
                        <span className="text-[11px] opacity-85 leading-none text-neutral-400 dark:text-neutral-500">{level.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Weight Goal Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-[#519D46]" />
                  <h2 className="text-[22px] font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
                    {language === 'en' ? 'Weight Goal' : 'Gewichtsziel'}
                  </h2>
                </div>
                <div className="bg-white dark:bg-neutral-900 border border-[#E5EAE3] dark:border-neutral-800 rounded-[24px] p-5 shadow-sm space-y-4">
                  <p className="text-xs text-neutral-400 font-medium leading-relaxed text-left">
                    {language === 'en' 
                      ? 'Adjusts your daily calorie budget based on your target weekly weight change.' 
                      : 'Passt Ihr tägliches Kalorienbudget basierend auf Ihrer angestrebten wöchentlichen Gewichtsveränderung an.'}
                  </p>
                  
                  <div className="grid grid-cols-5 gap-1.5 p-1 bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-100 dark:border-neutral-800 rounded-2xl">
                    {[
                      { id: '-0.5', label: '-0,5 kg', sub: language === 'en' ? 'Lose' : 'Abnehmen' },
                      { id: '-0.25', label: '-0,25 kg', sub: language === 'en' ? 'Slow' : 'Langsam' },
                      { id: 'stay', label: 'stay', sub: language === 'en' ? 'Maintain' : 'Halten' },
                      { id: '+0.25', label: '+0,25 kg', sub: language === 'en' ? 'Slow' : 'Langsam' },
                      { id: '+0.5', label: '+0,5 kg', sub: language === 'en' ? 'Gain' : 'Zunehmen' },
                    ].map((opt) => {
                      const isSelected = (userProfile.weightGoalRate || 'stay') === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => {
                            triggerHaptic();
                            setUserProfile(p => ({ ...p, weightGoalRate: opt.id }));
                          }}
                          className={`py-2 px-1 rounded-xl transition-all flex flex-col items-center justify-center gap-0.5 text-center border ${
                            isSelected
                              ? 'bg-white dark:bg-neutral-800 border-[#519D46] dark:border-emerald-500 text-[#2F7E41] dark:text-emerald-400 shadow-[0_1px_4px_rgba(0,0,0,0.05)]'
                              : 'bg-transparent border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
                          }`}
                        >
                          <span className="text-xs font-bold leading-tight">{opt.label}</span>
                          <span className="text-[9px] opacity-75 leading-none font-medium">{opt.sub}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Dietary Preference Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Flame className="w-5 h-5 text-[#519D46]" />
                  <h2 className="text-[22px] font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">{t("dietaryPreference")}</h2>
                </div>
                <div className="bg-white dark:bg-neutral-900 border border-[#E5EAE3] dark:border-neutral-800 rounded-[24px] p-5 shadow-sm space-y-3.5">
                  <p className="text-xs text-neutral-400 font-medium leading-relaxed text-left">
                    {language === "en" ? "Customises your recommendations, smart swaps, and search filters. Select multiple to combine preferences." : "Personalisiert Ihre Empfehlungen, Smart Swaps und Suchfilter. Wählen Sie mehrere aus, um Präferenzen zu kombinieren."}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {['None', 'High Protein', 'Low Carb', 'Vegetarian', 'Vegan'].map((pref) => {
                      const currentPrefs = userProfile.dietaryPreferences || [userProfile.dietaryPreference || 'None'];
                      const isSelected = currentPrefs.includes(pref);
                      return (
                        <button
                          key={pref}
                          onClick={() => {
                            triggerHaptic();
                            setUserProfile(p => {
                              const prevPrefs = p.dietaryPreferences || [p.dietaryPreference || 'None'];
                              let nextPrefs: string[];
                              if (pref === 'None') {
                                nextPrefs = ['None'];
                              } else {
                                if (prevPrefs.includes(pref)) {
                                  nextPrefs = prevPrefs.filter(x => x !== pref);
                                } else {
                                  nextPrefs = [...prevPrefs.filter(x => x !== 'None'), pref];
                                }
                                if (nextPrefs.length === 0) {
                                  nextPrefs = ['None'];
                                }
                              }
                              return {
                                ...p,
                                dietaryPreference: nextPrefs[0] || 'None',
                                dietaryPreferences: nextPrefs
                              };
                            });
                          }}
                          className={`py-3 px-3 rounded-[16px] font-bold text-[13px] transition-all border flex items-center justify-between ${
                            pref === 'None' ? 'col-span-2 py-3.5' : ''
                          } ${
                            isSelected 
                              ? 'bg-[#EAF3EB] dark:bg-emerald-950/45 border-[#519D46] text-[#2F7E41] dark:text-emerald-400 shadow-[0_2px_8px_rgba(81,157,70,0.1)] scale-[1.01]' 
                              : 'bg-[#FDFDFD] dark:bg-neutral-900/40 border-[#E5EAE3] dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 hover:border-neutral-300 dark:hover:border-neutral-700'
                          }`}
                        >
                          <span>
                            {pref === 'None' ? (language === 'en' ? 'Balanced (No Filter)' : 'Ausgewogen (kein Filter)') : (language === 'en' ? pref : pref === 'High Protein' ? 'Viel Eiweiß' : pref === 'Low Carb' ? 'Wenig Kohlenhydrate' : pref === 'Vegetarian' ? 'Vegetarisch' : pref === 'Vegan' ? 'Vegan' : pref)}
                          </span>
                          {isSelected && (
                            <Check className="w-4 h-4 text-[#2F7E41] dark:text-emerald-400 font-bold shrink-0 ml-1" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              </div>
            </div>
          )}

          {/* ==================== SMART RECIPES TAB ==================== */}
          {activeTab === "recipes" && (
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden text-left bg-[#F7FBF6] dark:bg-black">
              {!selectedRecipe ? (
                // RECIPES LIST VIEW
                <div className="flex-1 flex flex-col min-h-0">
                  {/* Header */}
                  <div className="px-5 pt-8 pb-4 space-y-2 flex-shrink-0 bg-[#F7FBF6] dark:bg-black">
                    <div className="flex items-center gap-2">
                      <div className="bg-[#EAF3EB] dark:bg-emerald-950/30 border border-[#CDE5CE] dark:border-neutral-800 rounded-full px-3 py-1 flex items-center gap-1.5 animate-pulse">
                        <Sparkles className="w-3.5 h-3.5 text-[#519D46] dark:text-emerald-400" />
                        <span className="text-[10px] font-extrabold text-[#3B7A32] dark:text-emerald-400 uppercase tracking-widest leading-none">
                          Smart Swap Engine Active
                        </span>
                      </div>
                    </div>
                    <h1 className="text-4xl font-display font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
                      {language === "en" ? "Smart Recipes" : "Smarte Rezepte"}
                    </h1>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">
                      {language === "en" 
                        ? "Personalized recipes matched to your grocery habits & dietary goals." 
                        : "Personalisierte Rezepte, die auf Ihre Einkaufsgewohnheiten abgestimmt sind."}
                    </p>
                  </div>

                  {/* Intro Banner */}
                  <div className="px-5 mb-3 flex-shrink-0">
                    <div className="p-4 bg-[#F0F7F1] dark:bg-neutral-900/60 border border-[#E1EEE3] dark:border-neutral-800 rounded-2xl flex items-start gap-3">
                      <div className="p-2 bg-white dark:bg-neutral-800 rounded-xl text-[#3B7A32] dark:text-emerald-400 shrink-0">
                        <Utensils className="w-4 h-4 stroke-[2]" />
                      </div>
                      <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-medium">
                        {language === "en"
                          ? "These recipes use staples from your recent grocery trips. Click any recipe to customize with high-scoring Smart Swaps to instantly improve your nutrition."
                          : "Diese Rezepte basieren auf Lebensmitteln Ihrer letzten Einkäufe. Klicken Sie auf ein Rezept, um es mit gesünderen Smart Swaps anzupassen."}
                      </p>
                    </div>
                  </div>

                  {/* Recipe Grid / List */}
                  <div className="flex-1 overflow-y-auto px-5 pb-24 space-y-5">
                    {/* Featured Recipe */}
                    {(() => {
                      const featuredRecipe = DEMO_RECIPES[0];
                      const featuredIsSwapped = appliedSwaps[featuredRecipe.id] || false;
                      const featuredScore = featuredIsSwapped ? featuredRecipe.optimizedScore : featuredRecipe.baseScore;
                      
                      const featuredIconColors = {
                        porridge: { bg: "bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/40" },
                        toast: { bg: "bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-900/40" },
                        pasta: { bg: "bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/40" },
                        bowl: { bg: "bg-emerald-100 dark:bg-emerald-950/40 text-[#3B7A32] dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/40" }
                      }[featuredRecipe.iconName];

                      const featuredScoreStyles = featuredScore >= 80 
                        ? "bg-[#EAF3EB] text-[#2F7E41] border-[#CDE5CE] dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/30"
                        : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/25 dark:text-amber-400 dark:border-amber-900/30";

                      return (
                        <div 
                          onClick={() => { setSelectedRecipe(featuredRecipe); triggerHaptic(); }}
                          className="group bg-gradient-to-br from-[#F4FAF5] to-white dark:from-neutral-900/25 dark:to-neutral-950 rounded-[28px] p-6 border border-[#CDE5CE] dark:border-neutral-800 hover:border-[#B5D8B6] dark:hover:border-neutral-700 transition-all hover:shadow-[0_8px_32px_rgba(81,157,70,0.04)] active:scale-[0.99] cursor-pointer text-left relative overflow-hidden"
                        >
                          <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#E1EEE3] dark:bg-emerald-950/20 rounded-full blur-2xl pointer-events-none opacity-60" />

                          <div className="flex justify-between items-start mb-4 relative z-10">
                            <span className="text-[10px] font-extrabold text-[#2F7E41] dark:text-emerald-400 bg-[#EAF3EB]/90 dark:bg-emerald-900/40 px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 border border-[#CDE5CE] dark:border-emerald-800">
                              <Sparkles className="w-3.5 h-3.5 text-[#519D46] dark:text-emerald-400 animate-pulse" />
                              {language === 'en' ? 'Today\'s Featured Recipe' : 'Heutiges Rezept-Highlight'}
                            </span>
                            {featuredIsSwapped && (
                              <span className="bg-emerald-100 dark:bg-emerald-950/60 text-[#2F7E41] dark:text-emerald-400 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full flex items-center gap-0.5 border border-emerald-200 dark:border-emerald-800 animate-pulse">
                                <Sparkles className="w-2.5 h-2.5" /> Swaps Applied
                              </span>
                            )}
                          </div>

                          <div className="flex gap-4 items-start relative z-10">
                            <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center shrink-0 shadow-sm ${featuredIconColors.bg}`}>
                              {featuredRecipe.iconName === "porridge" && <Wheat className="w-8 h-8 stroke-[1.8]" />}
                              {featuredRecipe.iconName === "toast" && <Cookie className="w-8 h-8 stroke-[1.8]" />}
                              {featuredRecipe.iconName === "pasta" && <Soup className="w-8 h-8 stroke-[1.8]" />}
                              {featuredRecipe.iconName === "bowl" && <Salad className="w-8 h-8 stroke-[1.8]" />}
                            </div>

                            <div className="flex-1 min-w-0 space-y-1">
                              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#3B7A32] dark:text-emerald-400">
                                {featuredRecipe.category}
                              </span>
                              <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 leading-snug group-hover:text-[#3B7A32] dark:group-hover:text-emerald-400 transition-colors">
                                {language === "en" ? featuredRecipe.nameEn : featuredRecipe.nameDe}
                              </h3>
                              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2 font-medium">
                                {language === "en" ? featuredRecipe.descEn : featuredRecipe.descDe}
                              </p>
                            </div>
                          </div>

                          <div className="h-[1px] bg-[#E1EEE3] dark:bg-neutral-800 my-4 relative z-10" />

                          <div className="flex items-center justify-between relative z-10">
                            <div className="flex items-center gap-4 text-neutral-500 dark:text-neutral-400">
                              <span className="flex items-center gap-1.5 text-xs font-semibold">
                                <Clock className="w-4 h-4 stroke-[2]" /> {featuredRecipe.prepTimeMin} min
                              </span>
                              <span className="flex items-center gap-1.5 text-xs font-semibold">
                                <Dumbbell className="w-4 h-4 stroke-[2]" /> {featuredRecipe.difficulty}
                              </span>
                            </div>

                            <div className={`px-3 py-1.5 rounded-full border text-xs font-extrabold flex items-center gap-1 shadow-sm ${featuredScoreStyles}`}>
                              <Award className="w-4 h-4" />
                              <span>{language === 'en' ? 'Health Score' : 'Score'}: {featuredScore}/100</span>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* Other Recipes Header */}
                    <div className="pt-2 text-left">
                      <h3 className="text-[18px] font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
                        {language === 'en' ? "More Recipes" : "Weitere Rezepte"}
                      </h3>
                    </div>

                    {/* List of remaining recipes (one row at a time) */}
                    <div className="flex flex-col gap-3.5">
                      {DEMO_RECIPES.slice(1).map((recipe) => {
                        const isSwapped = appliedSwaps[recipe.id] || false;
                        const score = isSwapped ? recipe.optimizedScore : recipe.baseScore;
                        
                        const iconColors = {
                          porridge: { bg: "bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/40" },
                          toast: { bg: "bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-900/40" },
                          pasta: { bg: "bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/40" },
                          bowl: { bg: "bg-emerald-100 dark:bg-emerald-950/40 text-[#3B7A32] dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/40" }
                        }[recipe.iconName];

                        const scoreStyles = score >= 80 
                          ? "bg-[#EAF3EB] text-[#2F7E41] border-[#CDE5CE] dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/30"
                          : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/25 dark:text-amber-400 dark:border-amber-900/30";

                        return (
                          <div 
                            key={recipe.id}
                            onClick={() => { setSelectedRecipe(recipe); triggerHaptic(); }}
                            className="group bg-white dark:bg-neutral-950 rounded-[20px] p-4 border border-neutral-100 dark:border-neutral-900 hover:border-neutral-200 dark:hover:border-neutral-800 transition-all hover:shadow-[0_4px_20px_rgba(0,0,0,0.02)] active:scale-[0.99] cursor-pointer text-left relative overflow-hidden"
                          >
                            {/* Accent Glow for Swapped Recipes */}
                            {isSwapped && (
                              <div className="absolute -top-12 -right-12 w-24 h-24 bg-emerald-100/40 dark:bg-emerald-950/20 rounded-full blur-xl pointer-events-none opacity-60" />
                            )}

                            <div className="flex gap-4 items-center relative z-10">
                              {/* Recipe Demo Icon */}
                              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 ${iconColors.bg}`}>
                                {recipe.iconName === "porridge" && <Wheat className="w-6 h-6 stroke-[1.8]" />}
                                {recipe.iconName === "toast" && <Cookie className="w-6 h-6 stroke-[1.8]" />}
                                {recipe.iconName === "pasta" && <Soup className="w-6 h-6 stroke-[1.8]" />}
                                {recipe.iconName === "bowl" && <Salad className="w-6 h-6 stroke-[1.8]" />}
                              </div>

                              {/* Recipe Text Details */}
                              <div className="flex-1 min-w-0 space-y-0.5">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#3B7A32] dark:text-emerald-400">
                                    {recipe.category}
                                  </span>
                                  {isSwapped && (
                                    <span className="bg-emerald-100 dark:bg-emerald-950/60 text-[#2F7E41] dark:text-emerald-400 text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded-full flex items-center gap-0.5 border border-emerald-200 dark:border-emerald-800 animate-pulse">
                                      <Sparkles className="w-2 h-2" /> Swapped
                                    </span>
                                  )}
                                </div>
                                <h3 className="text-[15px] font-bold text-neutral-900 dark:text-neutral-100 leading-snug group-hover:text-[#3B7A32] dark:group-hover:text-emerald-400 transition-colors truncate">
                                  {language === "en" ? recipe.nameEn : recipe.nameDe}
                                </h3>
                                <div className="flex items-center gap-3 text-neutral-400 font-medium">
                                  <span className="flex items-center gap-1 text-[10px] font-semibold">
                                    <Clock className="w-3 h-3 stroke-[2]" /> {recipe.prepTimeMin} min
                                  </span>
                                  <span className="flex items-center gap-1 text-[10px] font-semibold">
                                    <Dumbbell className="w-3 h-3 stroke-[2]" /> {recipe.difficulty}
                                  </span>
                                </div>
                              </div>

                              {/* Meal Health Score display */}
                              <div className={`px-2 py-1.5 rounded-full border text-[11px] font-extrabold flex items-center gap-1 ${scoreStyles}`}>
                                <Award className="w-3.5 h-3.5" />
                                <span>{score}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                // RECIPES DETAIL VIEW
                <div className="flex-1 flex flex-col min-h-0 bg-[#F7FBF6] dark:bg-neutral-950">
                  {/* Top Bar Navigation */}
                  <div className="px-5 pt-8 pb-3 border-b border-neutral-100 dark:border-neutral-900 flex items-center justify-between bg-white dark:bg-neutral-950 flex-shrink-0">
                    <button 
                      onClick={() => { setSelectedRecipe(null); triggerHaptic(); }}
                      className="flex items-center gap-1.5 text-sm font-bold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors p-1"
                    >
                      <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
                      <span>{language === "en" ? "Recipes" : "Rezepte"}</span>
                    </button>
                    <span className="text-xs font-extrabold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                      {selectedRecipe.category}
                    </span>
                  </div>

                  {/* Detail Body */}
                  <div className="flex-1 overflow-y-auto px-5 pb-28 pt-4 space-y-6">
                    {/* Hero Layout & Meal Score Block */}
                    <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800/80 p-6 rounded-[32px] space-y-5 relative overflow-hidden shadow-sm">
                      <div className="flex gap-4 items-center">
                        <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center shrink-0 ${
                          {
                            porridge: "bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/40",
                            toast: "bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-900/40",
                            pasta: "bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/40",
                            bowl: "bg-emerald-100 dark:bg-emerald-950/40 text-[#3B7A32] dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/40"
                          }[selectedRecipe.iconName]
                        }`}>
                          {selectedRecipe.iconName === "porridge" && <Wheat className="w-7 h-7 stroke-[1.8]" />}
                          {selectedRecipe.iconName === "toast" && <Cookie className="w-7 h-7 stroke-[1.8]" />}
                          {selectedRecipe.iconName === "pasta" && <Soup className="w-7 h-7 stroke-[1.8]" />}
                          {selectedRecipe.iconName === "bowl" && <Salad className="w-7 h-7 stroke-[1.8]" />}
                        </div>
                        <div className="space-y-0.5">
                          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 tracking-tight leading-tight">
                            {language === "en" ? selectedRecipe.nameEn : selectedRecipe.nameDe}
                          </h2>
                          <div className="flex items-center gap-3 text-neutral-400 text-xs">
                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {selectedRecipe.prepTimeMin} min</span>
                            <span className="flex items-center gap-1"><Dumbbell className="w-3.5 h-3.5" /> {selectedRecipe.difficulty}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium">
                        {language === "en" ? selectedRecipe.descEn : selectedRecipe.descDe}
                      </p>

                      {/* Score Meter Indicator */}
                      <div className="flex items-center justify-between p-4 bg-[#F7FBF6] dark:bg-black/40 border border-[#E5EAE4] dark:border-neutral-800/80 rounded-2xl">
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                            {language === "en" ? "Meal Health Score" : "Mahlzeiten Health Score"}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-3xl font-display font-extrabold text-neutral-900 dark:text-neutral-100">
                              {appliedSwaps[selectedRecipe.id] ? selectedRecipe.optimizedScore : selectedRecipe.baseScore}
                            </span>
                            <span className="text-neutral-400 dark:text-neutral-500 text-sm font-bold">/100</span>
                          </div>
                        </div>

                        {/* Status badge representing score tier */}
                        <div className={`px-3 py-1.5 rounded-full border text-xs font-extrabold flex items-center gap-1.5 ${
                          (appliedSwaps[selectedRecipe.id] ? selectedRecipe.optimizedScore : selectedRecipe.baseScore) >= 80
                            ? "bg-[#EAF3EB] text-[#2F7E41] border-[#CDE5CE] dark:bg-emerald-950/40 dark:text-emerald-400"
                            : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/25 dark:text-amber-400"
                        }`}>
                          <Award className="w-4 h-4" />
                          <span>
                            {(appliedSwaps[selectedRecipe.id] ? selectedRecipe.optimizedScore : selectedRecipe.baseScore) >= 80 
                              ? (language === "en" ? "Highly Nutritious" : "Sehr Nährstoffreich")
                              : (language === "en" ? "Moderate Health" : "Moderater Nährwert")}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* DYNAMIC SMART SWAP INTERACTIVE CONTROL */}
                    <div className="p-5 bg-gradient-to-r from-[#F0F7F1] to-[#E9F4EC] dark:from-emerald-950/20 dark:to-emerald-950/10 border border-[#CDE5CE] dark:border-emerald-900/40 rounded-[28px] space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-[#3B7A32] dark:text-emerald-400 animate-pulse" />
                          <div>
                            <h4 className="text-sm font-extrabold text-[#2F7E41] dark:text-emerald-400 tracking-tight leading-tight">
                              {language === "en" ? "Smart Swaps" : "Smarte Tauschoptionen"}
                            </h4>
                            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                              {language === "en" ? "Instantly substitute items to maximize health score" : "Lebensmittel sofort ersetzen & Nährwert maximieren"}
                            </p>
                          </div>
                        </div>

                        {/* Toggle Switch */}
                        <button 
                          onClick={() => {
                            triggerHaptic();
                            setAppliedSwaps(prev => ({
                              ...prev,
                              [selectedRecipe.id]: !prev[selectedRecipe.id]
                            }));
                          }}
                          className={`w-12 h-6.5 rounded-full p-1 transition-all duration-300 relative shrink-0 ${
                            appliedSwaps[selectedRecipe.id] 
                              ? "bg-[#3B7A32] dark:bg-emerald-500" 
                              : "bg-neutral-300 dark:bg-neutral-800"
                          }`}
                        >
                          <div className={`w-4.5 h-4.5 rounded-full bg-white shadow-md transition-all duration-300 transform ${
                            appliedSwaps[selectedRecipe.id] ? "translate-x-5.5" : "translate-x-0"
                          }`} />
                        </button>
                      </div>

                      {/* Custom Swap explanation text */}
                      <div className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed border-t border-neutral-200/50 dark:border-neutral-800/60 pt-3 space-y-2">
                        <p className="font-medium">
                          {language === "en" 
                            ? "Active Swaps in this recipe:" 
                            : "Aktive Swaps in diesem Rezept:"}
                        </p>
                        <div className="space-y-1.5">
                          {selectedRecipe.ingredients.map((ing, idx) => {
                            if (!ing.swapWith) return null;
                            return (
                              <div key={idx} className="flex items-center justify-between gap-2 p-1.5 bg-white/70 dark:bg-black/30 rounded-xl border border-neutral-200/40 dark:border-neutral-800/30">
                                <span className="text-[11px] font-semibold text-neutral-700 dark:text-neutral-300">
                                  {language === "en" ? ing.name : ing.nameDe}
                                </span>
                                <div className="flex items-center gap-1">
                                  <ArrowRight className="w-3 h-3 text-neutral-400" />
                                  <span className="text-[11px] font-bold text-[#3B7A32] dark:text-emerald-400">
                                    {language === "en" ? ing.swapWith.name : ing.swapWith.nameDe}
                                  </span>
                                  <span className="text-[9px] bg-emerald-100 dark:bg-emerald-950/60 text-[#2F7E41] dark:text-emerald-400 font-extrabold px-1 py-0.5 rounded ml-1">
                                    +{ing.swapWith.health_score - ing.health_score} pts
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* INGREDIENTS LIST */}
                    <div className="space-y-3 text-left">
                      <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
                        {language === "en" ? "Ingredients" : "Zutaten"}
                      </h3>
                      <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-900 rounded-3xl overflow-hidden divide-y divide-neutral-50 dark:divide-neutral-900/60">
                        {selectedRecipe.ingredients.map((ing, idx) => {
                          const isSwapped = appliedSwaps[selectedRecipe.id] && ing.swapWith;
                          const displayIngredient = isSwapped ? ing.swapWith! : ing;
                          
                          return (
                            <div key={idx} className="p-4 flex flex-col gap-2">
                              <div className="flex justify-between items-center gap-4">
                                <div className="space-y-0.5">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    {isSwapped && (
                                      <span className="line-through text-neutral-400 text-xs font-medium mr-1 decoration-red-400">
                                        {language === "en" ? ing.name : ing.nameDe}
                                      </span>
                                    )}
                                    <span className={`text-sm font-bold ${isSwapped ? "text-[#3B7A32] dark:text-emerald-400" : "text-neutral-800 dark:text-neutral-200"}`}>
                                      {language === "en" ? displayIngredient.name : displayIngredient.nameDe}
                                    </span>
                                    {isSwapped && (
                                      <span className="bg-emerald-100 dark:bg-emerald-950/60 text-[#2F7E41] dark:text-emerald-400 text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-md flex items-center gap-0.5 border border-emerald-200 dark:border-emerald-900/45">
                                        <Check className="w-2.5 h-2.5 stroke-[3]" /> Swapped
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-neutral-400 dark:text-neutral-500 font-medium">
                                    {ing.amountText}
                                  </p>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                  <span className="text-xs font-extrabold text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded-lg">
                                    {displayIngredient.kcal} kcal
                                  </span>
                                  <span className={`text-[10px] font-extrabold px-2 py-1 rounded-lg border ${
                                    displayIngredient.health_score >= 80
                                      ? "bg-[#EAF3EB] text-[#2F7E41] border-[#CDE5CE] dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-neutral-800"
                                      : displayIngredient.health_score >= 60
                                        ? "bg-lime-50 text-lime-700 border-lime-200 dark:bg-lime-950/20 dark:text-lime-400 dark:border-neutral-800"
                                        : "bg-red-50 text-red-600 border-red-100 dark:bg-red-950/20 dark:text-red-400 dark:border-neutral-800"
                                  }`}>
                                    Score: {displayIngredient.health_score}
                                  </span>
                                </div>
                              </div>

                              {/* Suggest Swap Box if not applied */}
                              {!appliedSwaps[selectedRecipe.id] && ing.swapWith && (
                                <div 
                                  onClick={() => {
                                    triggerHaptic();
                                    setAppliedSwaps(prev => ({ ...prev, [selectedRecipe.id]: true }));
                                  }}
                                  className="mt-1.5 p-2 bg-gradient-to-r from-[#F7FBF6] to-white dark:from-neutral-900/50 dark:to-neutral-900/20 border border-dashed border-[#CDE5CE] dark:border-neutral-800 rounded-xl flex items-center justify-between gap-2 cursor-pointer hover:bg-[#EAF3EB]/30 dark:hover:bg-neutral-800/80 transition-colors"
                                >
                                  <div className="flex items-center gap-1.5">
                                    <Shuffle className="w-3.5 h-3.5 text-[#519D46] dark:text-emerald-400 shrink-0" />
                                    <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                                      {language === "en" 
                                        ? `Swap suggestion: replace with ${ing.swapWith.name}`
                                        : `Tauschempfehlung: Ersetze durch ${ing.swapWith.nameDe}`}
                                    </span>
                                  </div>
                                  <span className="text-[10px] font-bold text-[#3B7A32] dark:text-emerald-400 whitespace-nowrap">
                                    +{ing.swapWith.health_score - ing.health_score} pts ➔
                                  </span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* PREPARATION STEPS */}
                    <div className="space-y-3 text-left">
                      <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
                        {language === "en" ? "Step-by-Step Instructions" : "Zubereitungsschritte"}
                      </h3>
                      <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-900 rounded-3xl p-5 space-y-4">
                        {(language === "en" ? selectedRecipe.instructionsEn : selectedRecipe.instructionsDe).map((step, idx) => (
                          <div key={idx} className="flex gap-3.5 items-start">
                            <span className="w-5 h-5 rounded-full bg-[#EAF3EB] dark:bg-emerald-950/45 text-[#3B7A32] dark:text-emerald-400 text-[11px] font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-medium">
                              {step}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* EXACT NUTRIENTS MACRO & MICRO LEDGER */}
                    <div className="space-y-3 text-left">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
                          {language === "en" ? "Nutritional Balance" : "Nährwertbilanz"}
                        </h3>
                        <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-bold uppercase tracking-wider">
                          % of Daily Intake (2000 kcal)
                        </span>
                      </div>

                      <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-900 rounded-3xl p-5 space-y-6">
                        {/* Summary of calculations helper in JSX */}
                        {(() => {
                          const isSwapped = appliedSwaps[selectedRecipe.id] || false;
                          
                          // Summing helper
                          const getTotals = (applySwaps: boolean) => {
                            const result = {
                              kcal: 0, protein_g: 0, carbs_g: 0, sugars_g: 0,
                              fat_g: 0, saturated_fat_g: 0, fiber_g: 0, salt_g: 0,
                              calcium_mg: 0, iron_mg: 0, magnesium_mg: 0,
                              potassium_mg: 0, zinc_mg: 0, vitamin_c_mg: 0
                            };
                            selectedRecipe.ingredients.forEach(i => {
                              const src = (applySwaps && i.swapWith) ? i.swapWith : i;
                              result.kcal += src.kcal;
                              result.protein_g += src.protein_g;
                              result.carbs_g += src.carbs_g;
                              result.sugars_g += src.sugars_g;
                              result.fat_g += src.fat_g;
                              result.saturated_fat_g += src.saturated_fat_g;
                              result.fiber_g += src.fiber_g;
                              result.salt_g += src.salt_g;
                              
                              if (src.micros) {
                                result.calcium_mg += (src.micros.calcium_mg || 0);
                                result.iron_mg += (src.micros.iron_mg || 0);
                                result.magnesium_mg += (src.micros.magnesium_mg || 0);
                                result.potassium_mg += (src.micros.potassium_mg || 0);
                                result.zinc_mg += (src.micros.zinc_mg || 0);
                                result.vitamin_c_mg += (src.micros.vitamin_c_mg || 0);
                              }
                            });
                            return result;
                          };

                          const base = getTotals(false);
                          const current = getTotals(isSwapped);
                          const optimized = getTotals(true);

                          const macros = [
                            { key: "kcal", label: language === "en" ? "Calories" : "Kalorien", unit: "kcal", target: DAILY_INTAKE_TARGETS.kcal, color: "bg-blue-500" },
                            { key: "protein_g", label: language === "en" ? "Protein" : "Eiweiß", unit: "g", target: DAILY_INTAKE_TARGETS.protein_g, color: "bg-emerald-500" },
                            { key: "carbs_g", label: language === "en" ? "Carbs" : "Kohlenhydrate", unit: "g", target: DAILY_INTAKE_TARGETS.carbs_g, color: "bg-amber-500" },
                            { key: "sugars_g", label: language === "en" ? "Sugars" : "Zucker", unit: "g", target: DAILY_INTAKE_TARGETS.sugars_g, color: "bg-rose-500" },
                            { key: "fat_g", label: language === "en" ? "Fat" : "Fett", unit: "g", target: DAILY_INTAKE_TARGETS.fat_g, color: "bg-purple-500" },
                            { key: "saturated_fat_g", label: language === "en" ? "Saturated Fat" : "Gesättigte Fettsäuren", unit: "g", target: DAILY_INTAKE_TARGETS.saturated_fat_g, color: "bg-indigo-500" },
                            { key: "fiber_g", label: language === "en" ? "Fiber" : "Ballaststoffe", unit: "g", target: DAILY_INTAKE_TARGETS.fiber_g, color: "bg-teal-500" },
                            { key: "salt_g", label: language === "en" ? "Salt" : "Salz", unit: "g", target: DAILY_INTAKE_TARGETS.salt_g, color: "bg-cyan-500" }
                          ];

                          const micros = [
                            { key: "calcium_mg", label: language === "en" ? "Calcium" : "Kalzium", unit: "mg", target: DAILY_INTAKE_TARGETS.calcium_mg, color: "bg-emerald-400" },
                            { key: "iron_mg", label: language === "en" ? "Iron" : "Eisen", unit: "mg", target: DAILY_INTAKE_TARGETS.iron_mg, color: "bg-orange-400" },
                            { key: "magnesium_mg", label: language === "en" ? "Magnesium" : "Magnesium", unit: "mg", target: DAILY_INTAKE_TARGETS.magnesium_mg, color: "bg-violet-400" },
                            { key: "potassium_mg", label: language === "en" ? "Potassium" : "Kalium", unit: "mg", target: DAILY_INTAKE_TARGETS.potassium_mg, color: "bg-sky-400" },
                            { key: "zinc_mg", label: language === "en" ? "Zinc" : "Zink", unit: "mg", target: DAILY_INTAKE_TARGETS.zinc_mg, color: "bg-pink-400" },
                            { key: "vitamin_c_mg", label: "Vitamin C", unit: "mg", target: DAILY_INTAKE_TARGETS.vitamin_c_mg, color: "bg-yellow-400" }
                          ];

                          return (
                            <div className="space-y-6">
                              {/* MACRONUTRIENTS SECTION */}
                              <div className="space-y-4">
                                <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#3B7A32] dark:text-emerald-400 border-b border-neutral-100 dark:border-neutral-800 pb-1.5">
                                  {language === "en" ? "Macronutrients" : "Makronährstoffe"}
                                </h4>

                                <div className="space-y-4.5">
                                  {macros.map((m) => {
                                    const val = current[m.key as keyof typeof current];
                                    const baseVal = base[m.key as keyof typeof base];
                                    const optVal = optimized[m.key as keyof typeof optimized];
                                    const pct = Math.min(100, Math.round((val / m.target) * 100));
                                    const diffVal = optVal - baseVal;
                                    const isSubstantiveDiff = Math.abs(diffVal) > 0.01;

                                    return (
                                      <div key={m.key} className="space-y-1.5">
                                        <div className="flex justify-between items-end">
                                          <div className="space-y-0.5">
                                            <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                                              {m.label}
                                            </span>
                                            {isSubstantiveDiff && (
                                              <span className="block text-[10px] font-semibold text-neutral-400 dark:text-neutral-500">
                                                {language === "en" ? "Base: " : "Basis: "}{baseVal.toFixed(1)}{m.unit}
                                                {isSwapped 
                                                  ? ` ➔ ${language === "en" ? "Optimized" : "Optimiert"}`
                                                  : ` (${language === "en" ? "Swap increases nutrition" : "Swap steigert Nährwerte"})`
                                                }
                                              </span>
                                            )}
                                          </div>

                                          <div className="text-right space-y-0.5">
                                            <span className="text-xs font-extrabold text-neutral-900 dark:text-neutral-100">
                                              {val.toFixed(1)} {m.unit}
                                            </span>
                                            <span className="block text-[10px] text-neutral-400 dark:text-neutral-500 font-bold">
                                              {pct}% {language === "en" ? "of target" : "des Richtwerts"}
                                            </span>
                                          </div>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="w-full h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden relative">
                                          {isSwapped && isSubstantiveDiff && (
                                            // Show difference slice
                                            <div 
                                              className={`absolute top-0 bottom-0 ${diffVal > 0 ? "bg-emerald-300 dark:bg-emerald-600 animate-pulse" : "bg-rose-300 dark:bg-rose-950/60"}`}
                                              style={{ 
                                                left: `${Math.min(100, Math.round((Math.min(baseVal, optVal) / m.target) * 100))}%`, 
                                                width: `${Math.round((Math.abs(diffVal) / m.target) * 100)}%` 
                                              }}
                                            />
                                          )}
                                          <div 
                                            className={`h-full ${m.color} rounded-full transition-all duration-500`} 
                                            style={{ width: `${pct}%` }}
                                          />
                                        </div>

                                        {/* SWAP IMPACT EXPLAINER FOR THIS MACRO */}
                                        {isSubstantiveDiff && (
                                          <div className={`text-[10px] font-bold flex items-center gap-1 mt-0.5 ${
                                            diffVal > 0 
                                              ? (m.key === "protein_g" || m.key === "fiber_g" ? "text-emerald-600 dark:text-emerald-400" : "text-neutral-400")
                                              : (m.key === "sugars_g" || m.key === "saturated_fat_g" || m.key === "salt_g" || m.key === "kcal" ? "text-emerald-600 dark:text-emerald-400" : "text-neutral-400")
                                          }`}>
                                            <Sparkles className="w-2.5 h-2.5 shrink-0" />
                                            {diffVal > 0 ? (
                                              <span>
                                                {language === "en" 
                                                  ? `Smart Swaps boost this by +${diffVal.toFixed(1)}${m.unit} (+${Math.round((diffVal/baseVal)*100)}%)` 
                                                  : `Smart Swaps erhöhen um +${diffVal.toFixed(1)}${m.unit} (+${Math.round((diffVal/baseVal)*100)}%)`}
                                              </span>
                                            ) : (
                                              <span>
                                                {language === "en" 
                                                  ? `Smart Swaps reduce this by -${Math.abs(diffVal).toFixed(1)}${m.unit} (-${Math.round((Math.abs(diffVal)/baseVal)*100)}%)` 
                                                  : `Smart Swaps verringern um -${Math.abs(diffVal).toFixed(1)}${m.unit} (-${Math.round((Math.abs(diffVal)/baseVal)*100)}%)`}
                                              </span>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* MICRONUTRIENTS SECTION */}
                              <div className="space-y-4 pt-2">
                                <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#3B7A32] dark:text-emerald-400 border-b border-neutral-100 dark:border-neutral-800 pb-1.5">
                                  {language === "en" ? "Essential Micronutrients" : "Essentielle Mikronährstoffe"}
                                </h4>

                                <div className="space-y-4.5">
                                  {micros.map((m) => {
                                    const val = current[m.key as keyof typeof current];
                                    const baseVal = base[m.key as keyof typeof base];
                                    const optVal = optimized[m.key as keyof typeof optimized];
                                    const pct = Math.min(100, Math.round((val / m.target) * 100));
                                    const diffVal = optVal - baseVal;
                                    const isSubstantiveDiff = Math.abs(diffVal) > 0.01;

                                    return (
                                      <div key={m.key} className="space-y-1.5">
                                        <div className="flex justify-between items-end">
                                          <div className="space-y-0.5">
                                            <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                                              {m.label}
                                            </span>
                                            {isSubstantiveDiff && (
                                              <span className="block text-[10px] font-semibold text-neutral-400 dark:text-neutral-500 font-medium">
                                                {language === "en" ? "Base: " : "Basis: "}{baseVal.toFixed(0)}{m.unit}
                                                {isSwapped 
                                                  ? ` ➔ ${language === "en" ? "Optimized" : "Optimiert"}`
                                                  : ""
                                                }
                                              </span>
                                            )}
                                          </div>

                                          <div className="text-right space-y-0.5">
                                            <span className="text-xs font-extrabold text-neutral-900 dark:text-neutral-100">
                                              {val.toFixed(0)} {m.unit}
                                            </span>
                                            <span className="block text-[10px] text-neutral-400 dark:text-neutral-500 font-bold">
                                              {pct}% {language === "en" ? "of target" : "des Richtwerts"}
                                            </span>
                                          </div>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="w-full h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden relative">
                                          {isSwapped && isSubstantiveDiff && (
                                            <div 
                                              className={`absolute top-0 bottom-0 ${diffVal > 0 ? "bg-emerald-300 dark:bg-emerald-600 animate-pulse" : "bg-rose-300 dark:bg-rose-950/60"}`}
                                              style={{ 
                                                left: `${Math.min(100, Math.round((Math.min(baseVal, optVal) / m.target) * 100))}%`, 
                                                width: `${Math.round((Math.abs(diffVal) / m.target) * 100)}%` 
                                              }}
                                            />
                                          )}
                                          <div 
                                            className={`h-full ${m.color} rounded-full transition-all duration-500`} 
                                            style={{ width: `${pct}%` }}
                                          />
                                        </div>

                                        {/* SWAP IMPACT EXPLAINER FOR MICRO */}
                                        {isSubstantiveDiff && (
                                          <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
                                            <Sparkles className="w-2.5 h-2.5 shrink-0" />
                                            {diffVal > 0 ? (
                                              <span>
                                                {language === "en" 
                                                  ? `Smart Swaps boost this by +${diffVal.toFixed(0)}${m.unit} (+${Math.round((diffVal/baseVal)*100)}%)` 
                                                  : `Smart Swaps erhöhen um +${diffVal.toFixed(0)}${m.unit} (+${Math.round((diffVal/baseVal)*100)}%)`}
                                              </span>
                                            ) : (
                                              <span>
                                                {language === "en" 
                                                  ? `Smart Swaps reduce this by -${Math.abs(diffVal).toFixed(0)}${m.unit}` 
                                                  : `Smart Swaps verringern um -${Math.abs(diffVal).toFixed(0)}${m.unit}`}
                                              </span>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

{/* ==================== SEARCH TAB ==================== */}
          {activeTab === "search" && (
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden text-left">
              {/* Header (stays on top) */}
              <div className="px-5 pt-8 pb-3 space-y-5 flex-shrink-0 bg-[#F7FBF6] dark:bg-black">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => handleTabChange('home')} 
                    className="p-2 -ml-2 rounded-full text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors shrink-0"
                    title={language === 'en' ? 'Back' : 'Zurück'}
                  >
                    <ArrowLeft className="w-6 h-6" />
                  </button>
                  <div className="space-y-0.5">
                    <h1 className="text-3xl font-display font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
                      {t("search")}
                    </h1>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      {t("filterDesc")}
                    </p>
                  </div>
                </div>

                {/* iOS Style Search Box with Filter Toggle */}
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-neutral-400">
                      <Search className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      placeholder={t("searchPlaceholder")}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-11 pr-10 py-3 bg-[#EEF2ED] dark:bg-neutral-800 border-0 rounded-2xl text-[15px] font-medium text-neutral-800 dark:text-neutral-100 placeholder-neutral-400 focus:ring-2 focus:ring-emerald-500/30 focus:bg-white dark:focus:bg-neutral-900 transition-all outline-none"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => {
                          triggerHaptic();
                          setSearchQuery("");
                        }}
                        className="absolute inset-y-0 right-3.5 flex items-center text-neutral-400 hover:text-neutral-600"
                      >
                        <X className="w-5 h-5 bg-neutral-200 hover:bg-neutral-300 rounded-full p-0.5" />
                      </button>
                    )}
                  </div>
                  <button 
                    onClick={() => { triggerHaptic(); setShowAdvancedFilters(!showAdvancedFilters); }}
                    className={`p-3 rounded-2xl flex-shrink-0 transition-colors ${showAdvancedFilters ? 'bg-[#519D46] text-white' : 'bg-[#EEF2ED] dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-[#E5EAE3] dark:hover:bg-neutral-700'}`}
                  >
                    <SlidersHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Scrollable Rest of Search */}
              <div className="flex-1 overflow-y-auto px-5 pb-32 space-y-6 no-scrollbar">
              
              {/* Advanced Filters Panel */}
              {showAdvancedFilters && (
                <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl p-4 shadow-sm space-y-5 animate-in slide-in-from-top-2 duration-200">
                  {/* Favorites Only Toggle */}
                  <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800">
                    <label className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">{language === 'en' ? 'Favorites Only' : 'Nur Favoriten'}</label>
                    <button
                      onClick={() => setSearchFavoritesOnly(!searchFavoritesOnly)}
                      className={`w-11 h-6 rounded-full transition-colors relative ${searchFavoritesOnly ? 'bg-emerald-500' : 'bg-neutral-200 dark:bg-neutral-700'}`}
                    >
                      <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${searchFavoritesOnly ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  
                  {/* Category & SubCategory */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">{language === 'en' ? 'Category' : 'Kategorie'}</label>
                      <select 
                        value={searchCategory} 
                        onChange={(e) => { setSearchCategory(e.target.value); setSearchSubCategory("All"); }}
                        className="w-full bg-[#EEF2ED] dark:bg-neutral-800 dark:text-neutral-200 border-none rounded-xl text-sm py-2 px-3 focus:ring-2 focus:ring-emerald-500/30"
                      >
                        {CATEGORIES.map(cat => (
                          <option key={cat} value={cat}>{translateCategoryName(cat, language)}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">{language === 'en' ? 'Subcategory' : 'Unterkategorie'}</label>
                      <select 
                        value={searchSubCategory} 
                        onChange={(e) => setSearchSubCategory(e.target.value)}
                        className="w-full bg-[#EEF2ED] dark:bg-neutral-800 dark:text-neutral-200 border-none rounded-xl text-sm py-2 px-3 focus:ring-2 focus:ring-emerald-500/30"
                      >
                        <option value="All">{language === 'en' ? 'All' : 'Alle'}</option>
                        {availableSubCategories.filter(sc => searchCategory === 'All' || allFoods.find(f => f.subCategory === sc && f.category === searchCategory)).map(sc => (
                          <option key={sc} value={sc}>{sc}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Nutri Score & NOVA */}
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Nutri Score</label>
                      <div className="flex gap-2">
                        {['A', 'B', 'C', 'D', 'E'].map(score => {
                          const isSelected = searchNutriScores.includes(score);
                          return (
                            <button
                              key={score}
                              onClick={() => {
                                triggerHaptic();
                                setSearchNutriScores(prev => isSelected ? prev.filter(s => s !== score) : [...prev, score]);
                              }}
                              className={`w-8 h-8 rounded-full text-sm font-bold flex items-center justify-center transition-all ${isSelected ? 'bg-neutral-800 text-white ring-2 ring-neutral-800 ring-offset-1' : 'bg-neutral-100 text-neutral-400 hover:bg-neutral-200'}`}
                            >
                              {score}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">NOVA-Score</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4].map(score => {
                          const isSelected = searchNovaScores.includes(score);
                          return (
                            <button
                              key={score}
                              onClick={() => {
                                triggerHaptic();
                                setSearchNovaScores(prev => isSelected ? prev.filter(s => s !== score) : [...prev, score]);
                              }}
                              className={`w-8 h-8 rounded-full text-sm font-bold flex items-center justify-center transition-all ${isSelected ? 'bg-neutral-800 text-white ring-2 ring-neutral-800 ring-offset-1' : 'bg-neutral-100 text-neutral-400 hover:bg-neutral-200'}`}
                            >
                              {score}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Calories Slider */}
                  <div className="space-y-2 pb-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                        {language === 'en' ? 'Max Calories' : 'Max Kalorien'} <span className="text-[10px] lowercase font-medium">(/ 100g)</span>
                      </label>
                      <span className="text-sm font-bold text-emerald-600">{searchMaxCalories} kcal</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="1000" 
                      step="10"
                      value={searchMaxCalories}
                      onChange={(e) => setSearchMaxCalories(parseInt(e.target.value))}
                      className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                    <div className="flex justify-between text-[10px] text-neutral-400 px-1">
                      <span>0</span>
                      <span>500</span>
                      <span>1000+</span>
                    </div>
                  </div>
                  
                </div>
              )}

              {/* Quick Search Chips */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-neutral-400 tracking-widest uppercase">
                  {t("quickSearches")}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map(chip => (
                    <button
                      key={chip}
                      onClick={() => handleQuickSearch(chip)}
                      className="px-3.5 py-1.5 bg-white dark:bg-neutral-900 border border-[#E5EAE3] dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 rounded-full text-neutral-600 dark:text-neutral-400 text-xs font-semibold text-neutral-600 transition-all cursor-pointer active:scale-95"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Real-time search results */}
              <div className="space-y-3 pt-2" onScroll={() => {
                const activeEl = document.activeElement as HTMLElement;
                if (activeEl) activeEl.blur();
              }}>
                <h4 className="text-xs font-bold text-neutral-400 tracking-widest uppercase">
                  {searchQuery ? t("results") : t("popularFoods")}
                </h4>

                <div className="space-y-2.5">
                  {limitedFilteredFoods.map((food, index) => {
                    const colors = getScoreColors(food.health_score);
                    const nova = getNutriGradeDetails(food.nutri_grade);
                    return (
                      <div
                        key={food.id}
                        onClick={() => handleOpenFood(food.id)}
                        style={{
                          animationDelay: `${index * 30}ms`,
                          animationFillMode: "both"
                        }}
                        className="bg-white dark:bg-neutral-900 rounded-xl border border-[#E5EAE3] dark:border-neutral-800 p-3 flex items-center justify-between hover:shadow-sm cursor-pointer transition-all animate-slide-up group"
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1 pr-2">
                          <div className={`p-2 rounded-lg ${colors.bg} ${colors.text} flex-shrink-0`}>
                            <FoodIcon food={food} className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-semibold text-neutral-800 dark:text-neutral-100 text-[15px] truncate">
                              {food.name}
                            </h4>
                            <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                              <span className="text-[11px] text-neutral-400 dark:text-neutral-500 font-medium truncate max-w-[80px] sm:max-w-none">
                                {(food.subCategory || "Grocery")}
                              </span>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide whitespace-nowrap ${nova.color}`}>
                                {nova.label}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-xs font-semibold text-neutral-400 dark:text-neutral-550 whitespace-nowrap hidden min-[400px]:inline-block">
                            {Math.round(food.nutrients_per_100.kcal)} kcal <span className="hidden sm:inline">/ 100g</span>
                          </span>
                          <button
                            onClick={(e) => toggleFavoriteFood(food.id, e)}
                            className="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors relative z-10"
                            title={language === 'en' ? 'Favorite' : 'Favorisieren'}
                          >
                            <Heart 
                              className={`w-4 h-4 transition-all active:scale-125 ${
                                favoriteFoodIds.includes(food.id) 
                                  ? "fill-rose-500 text-rose-500" 
                                  : "text-neutral-300 hover:text-neutral-500 dark:text-neutral-600"
                              }`} 
                            />
                          </button>
                          <ScoreRing score={food.health_score} size={44} strokeWidth={4} />
                        </div>
                      </div>
                    );
                  })}

                  {limitedFilteredFoods.length === 0 && (
                    <div className="bg-white dark:bg-neutral-900 rounded-xl border border-[#E5EAE3] dark:border-neutral-800 p-10 text-center space-y-3">
                      <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center mx-auto text-rose-500">
                        <Info className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-neutral-700">{t("noMatching")}</p>
                        <p className="text-xs text-neutral-400 mt-1">
                          {t("trySearch")}
                        </p>
                      </div>
                    </div>
                  )}
                  {filteredFoods.length > foodDisplayLimit && (
                    <button
                      onClick={() => setFoodDisplayLimit(prev => prev + 20)}
                      className="w-full mt-4 bg-white dark:bg-neutral-900 rounded-xl border border-[#E5EAE3] dark:border-neutral-800 p-4 text-center font-bold text-sm text-[#519D46] dark:text-emerald-400 hover:bg-[#F2F6F1] dark:hover:bg-emerald-950/30 transition-colors shadow-sm"
                    >
                      {language === 'en' ? 'Load 20 more' : '20 weitere laden'}
                    </button>
                  )}
                </div>
              </div>

              </div>
            </div>
          )}

              {/* ==================== SWAPS TAB ==================== */}
              {activeTab === "swaps" && (
                <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
              {showSwapSearch ? (
                // === SWAP SEARCH MODE ===
                <div className="flex-1 flex flex-col min-h-0">
                  {/* Fixed Header */}
                  <div className="px-5 pt-8 pb-3 space-y-5 flex-shrink-0 bg-[#F7FBF6] dark:bg-black">
                    {/* Header with Back Button */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          triggerHaptic();
                          setShowSwapSearch(false);
                          setSwapSearchQuery("");
                        }}
                        className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors text-neutral-600 dark:text-neutral-300"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                      <div className="space-y-0.5 text-left">
                        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
                          {language === 'en' ? 'Search Smart Swaps' : 'Alternativen suchen'}
                        </h1>
                        <p className="text-xs text-neutral-500 font-medium">
                          {language === 'en' ? 'Find healthier alternatives in our database' : 'Gesündere Alternativen in unserer Datenbank finden'}
                        </p>
                      </div>
                    </div>

                    {/* iOS Style Search Box */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-neutral-400">
                        <Search className="w-5 h-5" />
                      </div>
                      <input
                        type="text"
                        placeholder={language === 'en' ? "Search swaps (e.g., cola, yogurt)..." : "Nach Alternativen suchen (z.B. Cola, Joghurt)..."}
                        value={swapSearchQuery}
                        onChange={(e) => setSwapSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-10 py-3 bg-[#EEF2ED] dark:bg-neutral-800 border-0 rounded-2xl text-[15px] font-medium text-neutral-800 dark:text-neutral-100 placeholder-neutral-400 focus:ring-2 focus:ring-emerald-500/30 focus:bg-white dark:focus:bg-neutral-900 transition-all outline-none"
                      />
                      {swapSearchQuery && (
                        <button
                          onClick={() => {
                            triggerHaptic();
                            setSwapSearchQuery("");
                          }}
                          className="absolute inset-y-0 right-3.5 flex items-center text-neutral-400 hover:text-neutral-600"
                        >
                          <X className="w-5 h-5 bg-neutral-200 hover:bg-neutral-300 rounded-full p-0.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Scrollable results */}
                  <div className="flex-1 overflow-y-auto px-5 pb-32 space-y-4 no-scrollbar text-left">
                    {/* Swap Search Results */}
                    <div className="space-y-4 pt-2 text-left">
                      <h3 className="text-[18px] font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
                        {language === 'en' ? 'Matching Swaps' : 'Passende Alternativen'}
                      </h3>

                      <div className="space-y-3">
                      {allPossibleSwaps.filter(swap => {
                        const fromFood = allFoods.find(f => f.id === swap.fromId);
                        const toFood = allFoods.find(f => f.id === swap.toId);
                        if (!fromFood || !toFood) return false;
                        
                        const query = swapSearchQuery.toLowerCase().trim();
                        if (!query) return true;
                        
                        return (
                          fromFood.name.toLowerCase().includes(query) ||
                          toFood.name.toLowerCase().includes(query) ||
                          fromFood.category.toLowerCase().includes(query) ||
                          toFood.category.toLowerCase().includes(query)
                        );
                      }).slice(0, 30).map((swap) => {
                        const fromFood = allFoods.find(f => f.id === swap.fromId)!;
                        const toFood = allFoods.find(f => f.id === swap.toId)!;
                        const scoreDiff = Math.round(toFood.health_score - fromFood.health_score);
                        const isExpanded = expandedSwapId === swap.fromId;

                        return (
                          <div
                            key={`search-swap-${swap.fromId}`}
                            className="bg-white dark:bg-neutral-900 rounded-[1.25rem] border border-[#E5EAE3] dark:border-neutral-800 p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
                          >
                            {/* Accordion Trigger Header */}
                            <div
                              onClick={() => {
                                triggerHaptic();
                                setExpandedSwapId(isExpanded ? null : swap.fromId);
                              }}
                              className="cursor-pointer relative"
                            >
                              <div className="flex items-start justify-between mb-3 pr-6 relative">
                                {/* From Food */}
                                <div className="flex flex-col w-[42%]">
                                   <div className="flex items-baseline gap-1.5 flex-wrap">
                                      <span className="text-[17px] font-bold text-amber-500 dark:text-amber-400">{fromFood.health_score}</span>
                                      <span className="text-[15px] font-medium text-neutral-900 dark:text-neutral-100 leading-tight">{fromFood.name}</span>
                                   </div>
                                   <div className="text-[11px] text-neutral-400 dark:text-neutral-550 mt-0.5">{Math.round(fromFood.nutrients_per_100?.kcal || 0)} kcal / 100g</div>
                                </div>

                                {/* Arrow */}
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#EAF3EB] dark:bg-emerald-950/40 flex items-center justify-center mt-1">
                                  <ArrowRight className="w-4 h-4 text-[#519D46] dark:text-emerald-400" />
                                </div>

                                {/* To Food */}
                                <div className="flex flex-col w-[42%]">
                                   <div className="flex items-baseline gap-1.5 flex-wrap">
                                      <span className="text-[17px] font-bold text-[#519D46] dark:text-emerald-400">{toFood.health_score}</span>
                                      <span className="text-[15px] font-medium text-neutral-900 dark:text-neutral-100 leading-tight">{toFood.name}</span>
                                   </div>
                                   <div className="text-[11px] text-neutral-400 dark:text-neutral-550 mt-0.5">{Math.round(toFood.nutrients_per_100?.kcal || 0)} kcal / 100g</div>
                                </div>
                                
                                {/* Chevron */}
                                <div className="absolute right-0 top-1.5 text-neutral-400">
                                  <ChevronDown className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                                </div>
                              </div>

                              <div className="flex justify-between items-end mt-2">
                                <p className="text-[14px] text-neutral-500 dark:text-neutral-400 max-w-[65%] leading-snug">
                                  {language === 'en' ? 'Healthier option in the same category' : 'Gesündere Option in derselben Kategorie'}
                                </p>
                                <div className="flex items-center gap-1.5 shrink-0 relative z-10">
                                  <button
                                    onClick={(e) => { e.stopPropagation(); toggleFavoriteSwap(swap.fromId, swap.toId, e); }}
                                    className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-all cursor-pointer"
                                    title={language === 'en' ? 'Favorite Swap' : 'Alternative favorisieren'}
                                  >
                                    <Heart 
                                      className={`w-4.5 h-4.5 transition-all active:scale-125 ${
                                        favoriteSwapIds.includes(`${swap.fromId}::${swap.toId}`) 
                                          ? "fill-rose-500 text-rose-500" 
                                          : "text-neutral-300 hover:text-neutral-500"
                                      }`} 
                                    />
                                  </button>
                                  <span className="text-[13px] font-bold text-[#2F7E41] dark:text-emerald-400 bg-[#EAF3EB] dark:bg-emerald-950/45 px-3 py-1 rounded-full whitespace-nowrap">
                                    +{scoreDiff}%
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Expanded compare table */}
                            <div
                              className={`transition-all duration-300 ease-in-out border-t border-neutral-100 dark:border-neutral-800 overflow-hidden ${
                                isExpanded ? "max-h-[800px] opacity-100 mt-4 pt-4" : "max-h-0 opacity-0 pointer-events-none mt-0 pt-0"
                              }`}
                            >
                              <div className="p-4 bg-[#F9FAF9] dark:bg-neutral-900/60 rounded-xl space-y-4">
                                <h5 className="text-[11px] font-bold text-neutral-400 tracking-wider uppercase text-center">
                                  {language === 'en' ? 'Side-By-Side Nutrition Profile (% DV)' : 'Direkter Nährwertvergleich (% DV)'}
                                </h5>

                                <div className="space-y-3 font-sans">
                                  {/* Calories Row */}
                                  <div className="space-y-1">
                                    <div className="flex justify-between text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                                      <span className="text-neutral-500 dark:text-neutral-400">{language === 'en' ? 'Calories' : 'Kalorien'}</span>
                                      <div className="flex gap-4">
                                        <span className={isBetterNutrient("kcal", fromFood.nutrients_per_100?.kcal || 0, toFood.nutrients_per_100?.kcal || 0) ? "text-neutral-400 dark:text-neutral-500 font-normal" : "text-amber-600 dark:text-amber-400 font-bold"}>
                                          {Math.round(fromFood.nutrients_per_100?.kcal || 0)}
                                        </span>
                                        <span className={isBetterNutrient("kcal", fromFood.nutrients_per_100?.kcal || 0, toFood.nutrients_per_100?.kcal || 0) ? "text-emerald-700 dark:text-emerald-400 font-bold" : "text-neutral-400 dark:text-neutral-500 font-normal"}>
                                          {Math.round(toFood.nutrients_per_100?.kcal || 0)}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                      <div className="h-2 bg-neutral-200/75 dark:bg-neutral-800 rounded-full overflow-hidden">
                                        <div
                                          className={`h-full ${!isBetterNutrient("kcal", fromFood.nutrients_per_100?.kcal || 0, toFood.nutrients_per_100?.kcal || 0) ? "bg-amber-500" : "bg-neutral-300 dark:bg-neutral-700"}`}
                                          style={{ width: `${Math.min(100, ((fromFood.nutrients_per_100?.kcal || 0) / 300) * 100)}%` }}
                                        />
                                      </div>
                                      <div className="h-2 bg-neutral-200/75 dark:bg-neutral-800 rounded-full overflow-hidden">
                                        <div
                                          className={`h-full ${isBetterNutrient("kcal", fromFood.nutrients_per_100?.kcal || 0, toFood.nutrients_per_100?.kcal || 0) ? "bg-emerald-500" : "bg-neutral-300 dark:bg-neutral-700"}`}
                                          style={{ width: `${Math.min(100, ((toFood.nutrients_per_100?.kcal || 0) / 300) * 100)}%` }}
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  {/* Macro rows */}
                                  {Object.keys(fromFood.nutrients_per_100).filter(macro => macro !== 'kcal' && macro !== 'micros').map(macro => {
                                    const fromVal = fromFood.nutrients_per_100[macro as keyof typeof fromFood.nutrients_per_100];
                                    const toVal = toFood.nutrients_per_100[macro as keyof typeof toFood.nutrients_per_100];
                                    const better = isBetterNutrient(macro, fromVal as number, toVal as number);

                                    const displayLabels: Record<string, any> = {
                                      protein: language === 'en' ? "Protein (g)" : "Eiweiß (g)",
                                      carbs: language === 'en' ? "Carbohydrates (g)" : "Kohlenhydrate (g)",
                                      fiber: language === 'en' ? "Dietary Fiber (g)" : "Ballaststoffe (g)",
                                      sugars: language === 'en' ? "Sugars (g)" : "Zucker (g)",
                                      fat: language === 'en' ? "Total Fat (g)" : "Fett (g)",
                                      saturatedFat: language === 'en' ? "Saturated Fat (g)" : "Gesättigte Fettsäuren (g)",
                                      sodium: language === 'en' ? "Sodium (mg)" : "Natrium (mg)"
                                    };

                                    return (
                                      <div key={macro} className="space-y-1">
                                        <div className="flex justify-between text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                                          <span className="text-neutral-500 dark:text-neutral-400">{displayLabels[macro] || macro}</span>
                                          <div className="flex gap-4">
                                            <span className={better ? "text-neutral-400 dark:text-neutral-500 font-normal" : "text-rose-500 dark:text-rose-400 font-bold"}>
                                              {fromVal}
                                            </span>
                                            <span className={better ? "text-emerald-700 dark:text-emerald-400 font-bold" : "text-neutral-400 dark:text-neutral-500 font-normal"}>
                                              {toVal}
                                            </span>
                                          </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                          <div className="h-2 bg-neutral-200/75 dark:bg-neutral-800 rounded-full overflow-hidden">
                                            <div
                                              className={`h-full ${!better ? "bg-amber-500" : "bg-neutral-300 dark:bg-neutral-700"}`}
                                              style={{ width: `${getMacroDV(macro, fromVal as number)}%` }}
                                            />
                                          </div>
                                          <div className="h-2 bg-neutral-200/75 dark:bg-neutral-800 rounded-full overflow-hidden">
                                            <div
                                              className={`h-full ${better ? "bg-emerald-500" : "bg-neutral-300 dark:bg-neutral-700"}`}
                                              style={{ width: `${getMacroDV(macro, toVal as number)}%` }}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>

                                <p className="text-[11px] text-neutral-400 font-medium italic pt-2 text-center border-t border-[#E5EAE3] dark:border-neutral-800">
                                  {language === 'en' ? 'Green bar indicates nutritionally superior level.' : 'Der grüne Balken zeigt den ernährungsphysiologisch besseren Wert.'}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      {allPossibleSwaps.filter(swap => {
                        const fromFood = allFoods.find(f => f.id === swap.fromId);
                        const toFood = allFoods.find(f => f.id === swap.toId);
                        if (!fromFood || !toFood) return false;
                        const query = swapSearchQuery.toLowerCase().trim();
                        if (!query) return true;
                        return (
                          fromFood.name.toLowerCase().includes(query) ||
                          toFood.name.toLowerCase().includes(query) ||
                          fromFood.category.toLowerCase().includes(query) ||
                          toFood.category.toLowerCase().includes(query)
                        );
                      }).length === 0 && (
                        <div className="text-center py-12 px-4 bg-white dark:bg-neutral-900 rounded-[20px] border border-neutral-100 dark:border-neutral-800">
                          <p className="text-sm text-neutral-500 font-semibold">
                            {language === 'en' ? 'No matching swaps found' : 'Keine passenden Alternativen gefunden'}
                          </p>
                          <p className="text-xs text-neutral-400 mt-1">
                            {language === 'en' ? 'Try searching for terms like "cola", "water", or "cheese"' : 'Suchen Sie nach Begriffen wie „Cola“, „Wasser“ oder „Käse“'}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  </div>
                </div>
              ) : (
                // === REGULAR SWAPS MODE ===
                <div className="flex-1 flex flex-col min-h-0">
                  {/* Fixed Header */}
                  <div className="px-5 pt-8 pb-3 flex justify-between items-start flex-shrink-0 bg-[#F7FBF6] dark:bg-black">
                    <div className="space-y-1 text-left">
                      <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
                        Smarter Swaps
                      </h1>
                      <p className="text-[15px] text-neutral-500 font-medium">
                        Tap any card to compare nutrients
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        triggerHaptic();
                        setShowSwapSearch(true);
                      }}
                      className="p-2.5 bg-[#EEF2ED] dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded-full hover:bg-[#E5EAE3] dark:hover:bg-neutral-700 transition-colors shadow-sm"
                      title={language === 'en' ? 'Search Swaps' : 'Tausch-Suche'}
                    >
                      <Search className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Scrollable Rest */}
                  <div className="flex-1 overflow-y-auto px-5 pb-32 space-y-6 no-scrollbar text-left">

                  {/* Today's Highlight Swap */}
                  {highlightSwap && (() => {
                    const fromFood = allFoods.find(f => f.id === highlightSwap.fromId)!;
                    const toFood = allFoods.find(f => f.id === highlightSwap.toId)!;
                    const scoreDiff = Math.round(toFood.health_score - fromFood.health_score);
                    
                    return (
                      <div className="space-y-3 text-left">
                        <div className="flex justify-between items-baseline px-0.5">
                          <h3 className="text-[20px] font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
                            {language === 'en' ? "Today's Highlight Swap" : "Heutiges Tausch-Highlight"}
                          </h3>
                        </div>

                        <div 
                          className="bg-emerald-50/50 dark:bg-emerald-950/15 rounded-[1.25rem] border border-emerald-200/80 dark:border-emerald-900/40 p-5 shadow-[0_4px_20px_rgba(81,157,70,0.04)] cursor-pointer"
                        >
                          <div 
                            onClick={() => {
                              triggerHaptic();
                              setIsHighlightExpanded(!isHighlightExpanded);
                            }}
                          >
                            <div className="flex justify-between items-start">
                              <span className="text-[10px] font-bold text-[#2F7E41] dark:text-emerald-400 bg-emerald-100/60 dark:bg-emerald-900/30 px-2.5 py-1 rounded-full uppercase tracking-wider">
                                {language === 'en' ? "Featured" : "Empfohlen"}
                              </span>
                              <span className="text-xs font-bold text-[#2F7E41] dark:text-emerald-400 flex items-center gap-1">
                                <Sparkles className="w-3.5 h-3.5 fill-current" />
                                +{scoreDiff}% {language === 'en' ? 'Better Score' : 'Bessere Note'}
                              </span>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                              {/* From Food */}
                              <div className="flex flex-col w-[42%]">
                                <div className="text-[16px] font-bold text-neutral-900 dark:text-neutral-100 leading-snug">{fromFood.name}</div>
                                <div className="text-xs text-neutral-500 mt-1 flex items-center gap-1.5">
                                  <span className="inline-block px-1.5 py-0.5 bg-amber-100 text-amber-800 dark:bg-amber-950/45 dark:text-amber-400 text-[10px] font-bold rounded">
                                    {fromFood.health_score} pt
                                  </span>
                                  <span>{Math.round(fromFood.nutrients_per_100?.kcal || 0)} kcal</span>
                                </div>
                              </div>

                              {/* Arrow */}
                              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#519D46] dark:bg-emerald-500 text-white flex items-center justify-center shadow-md animate-pulse">
                                <ArrowRight className="w-4.5 h-4.5" />
                              </div>

                              {/* To Food */}
                              <div className="flex flex-col w-[42%] text-right items-end">
                                <div className="text-[16px] font-bold text-emerald-800 dark:text-emerald-400 leading-snug">{toFood.name}</div>
                                <div className="text-xs text-neutral-500 mt-1 flex items-center gap-1.5 justify-end">
                                  <span>{Math.round(toFood.nutrients_per_100?.kcal || 0)} kcal</span>
                                  <span className="inline-block px-1.5 py-0.5 bg-[#519D46] text-white dark:bg-emerald-500 dark:text-neutral-900 text-[10px] font-bold rounded">
                                    {toFood.health_score} pt
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-between items-center mt-4 pt-4 border-t border-emerald-200/40 dark:border-emerald-800/20 text-xs text-neutral-500 dark:text-neutral-400">
                              <span>
                                {language === 'en' ? 'Click to see side-by-side nutrients' : 'Tippen für direkten Nährwertvergleich'}
                              </span>
                              <ChevronDown className={`w-4.5 h-4.5 text-[#2F7E41] dark:text-emerald-400 transition-transform ${isHighlightExpanded ? 'rotate-180' : ''}`} />
                            </div>
                          </div>

                          {/* Highlight Expanded comparison chart */}
                          <div
                            className={`transition-all duration-300 ease-in-out overflow-hidden ${
                              isHighlightExpanded ? "max-h-[800px] opacity-100 mt-4 pt-4 border-t border-emerald-200/40 dark:border-emerald-800/20" : "max-h-0 opacity-0 pointer-events-none"
                            }`}
                          >
                            <div className="p-4 bg-white/60 dark:bg-neutral-900/60 rounded-xl space-y-4">
                              <h5 className="text-[11px] font-bold text-neutral-400 tracking-wider uppercase text-center">
                                {language === 'en' ? 'Side-By-Side Nutrition Profile (% DV)' : 'Direkter Nährwertvergleich (% DV)'}
                              </h5>

                              <div className="space-y-3 font-sans">
                                {/* Calories Row */}
                                <div className="space-y-1">
                                  <div className="flex justify-between text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                                    <span className="text-neutral-500 dark:text-neutral-400">{language === 'en' ? 'Calories' : 'Kalorien'}</span>
                                    <div className="flex gap-4">
                                      <span className={isBetterNutrient("kcal", fromFood.nutrients_per_100?.kcal || 0, toFood.nutrients_per_100?.kcal || 0) ? "text-neutral-400 dark:text-neutral-500 font-normal" : "text-amber-600 dark:text-amber-400 font-bold"}>
                                        {Math.round(fromFood.nutrients_per_100?.kcal || 0)}
                                      </span>
                                      <span className={isBetterNutrient("kcal", fromFood.nutrients_per_100?.kcal || 0, toFood.nutrients_per_100?.kcal || 0) ? "text-emerald-700 dark:text-emerald-400 font-bold" : "text-neutral-400 dark:text-neutral-500 font-normal"}>
                                        {Math.round(toFood.nutrients_per_100?.kcal || 0)}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-3">
                                    <div className="h-2 bg-neutral-200/75 dark:bg-neutral-800 rounded-full overflow-hidden">
                                      <div
                                        className={`h-full ${!isBetterNutrient("kcal", fromFood.nutrients_per_100?.kcal || 0, toFood.nutrients_per_100?.kcal || 0) ? "bg-amber-500" : "bg-neutral-300 dark:bg-neutral-700"}`}
                                        style={{ width: `${Math.min(100, ((fromFood.nutrients_per_100?.kcal || 0) / 300) * 100)}%` }}
                                      />
                                    </div>
                                    <div className="h-2 bg-neutral-200/75 dark:bg-neutral-800 rounded-full overflow-hidden">
                                      <div
                                        className={`h-full ${isBetterNutrient("kcal", fromFood.nutrients_per_100?.kcal || 0, toFood.nutrients_per_100?.kcal || 0) ? "bg-emerald-500" : "bg-neutral-300 dark:bg-neutral-700"}`}
                                        style={{ width: `${Math.min(100, ((toFood.nutrients_per_100?.kcal || 0) / 300) * 100)}%` }}
                                      />
                                    </div>
                                  </div>
                                </div>

                                {/* Macro rows */}
                                {Object.keys(fromFood.nutrients_per_100).filter(macro => macro !== 'kcal' && macro !== 'micros').map(macro => {
                                  const fromVal = fromFood.nutrients_per_100[macro as keyof typeof fromFood.nutrients_per_100];
                                  const toVal = toFood.nutrients_per_100[macro as keyof typeof toFood.nutrients_per_100];
                                  const better = isBetterNutrient(macro, fromVal as number, toVal as number);

                                  const displayLabels: Record<string, any> = {
                                    protein: language === 'en' ? "Protein (g)" : "Eiweiß (g)",
                                    carbs: language === 'en' ? "Carbohydrates (g)" : "Kohlenhydrate (g)",
                                    fiber: language === 'en' ? "Dietary Fiber (g)" : "Ballaststoffe (g)",
                                    sugars: language === 'en' ? "Sugars (g)" : "Zucker (g)",
                                    fat: language === 'en' ? "Total Fat (g)" : "Fett (g)",
                                    saturatedFat: language === 'en' ? "Saturated Fat (g)" : "Gesättigte Fettsäuren (g)",
                                    sodium: language === 'en' ? "Sodium (mg)" : "Natrium (mg)"
                                  };

                                  return (
                                    <div key={macro} className="space-y-1">
                                      <div className="flex justify-between text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                                        <span className="text-neutral-500 dark:text-neutral-400">{displayLabels[macro] || macro}</span>
                                        <div className="flex gap-4">
                                          <span className={better ? "text-neutral-400 dark:text-neutral-500 font-normal" : "text-rose-500 dark:text-rose-400 font-bold"}>
                                            {fromVal}
                                          </span>
                                          <span className={better ? "text-emerald-700 dark:text-emerald-400 font-bold" : "text-neutral-400 dark:text-neutral-500 font-normal"}>
                                            {toVal}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="grid grid-cols-2 gap-3">
                                        <div className="h-2 bg-neutral-200/75 dark:bg-neutral-800 rounded-full overflow-hidden">
                                          <div
                                            className={`h-full ${!better ? "bg-amber-500" : "bg-neutral-300 dark:bg-neutral-700"}`}
                                            style={{ width: `${getMacroDV(macro, fromVal as number)}%` }}
                                          />
                                        </div>
                                        <div className="h-2 bg-neutral-200/75 dark:bg-neutral-800 rounded-full overflow-hidden">
                                          <div
                                            className={`h-full ${better ? "bg-emerald-500" : "bg-neutral-300 dark:bg-neutral-700"}`}
                                            style={{ width: `${getMacroDV(macro, toVal as number)}%` }}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>

                              <p className="text-[11px] text-neutral-400 font-medium italic pt-2 text-center border-t border-[#E5EAE3] dark:border-neutral-800">
                                {language === 'en' ? 'Green bar indicates nutritionally superior level.' : 'Der grüne Balken zeigt den ernährungsphysiologisch besseren Wert.'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Swaps list */}
                  <div className="space-y-4 pt-2">
                    <div className="flex justify-between items-baseline px-0.5">
                      <h3 className="text-[20px] font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
                        {language === 'en' ? "Recommended for You" : "Für Sie empfohlen"}
                      </h3>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setSwapsFavoritesOnly(!swapsFavoritesOnly)}
                          className={`p-1.5 rounded-full flex items-center justify-center cursor-pointer transition-colors ${swapsFavoritesOnly ? 'bg-rose-500 border border-rose-500' : 'text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-700'}`}
                          title={language === 'en' ? 'Favorites' : 'Favoriten'}
                        >
                          <Heart className={`w-3.5 h-3.5 ${swapsFavoritesOnly ? 'fill-white text-white' : ''}`} />
                        </button>
                        <div className="relative inline-flex items-center">
                          <Settings2 className="w-3 h-3 absolute left-2.5 text-[#2F7E41] dark:text-emerald-400 pointer-events-none" />
                          <select 
                            value={userProfile.dietaryPreference || 'None'}
                            onChange={(e) => {
                              const val = e.target.value;
                              setUserProfile(p => ({ 
                                ...p, 
                                dietaryPreference: val,
                                dietaryPreferences: [val]
                              }));
                            }}
                            className="text-xs font-semibold text-[#2F7E41] dark:text-emerald-400 bg-[#EAF3EB] dark:bg-emerald-900/30 border border-[#CDE5CE] dark:border-emerald-800 rounded-full cursor-pointer hover:bg-[#DCEFDE] dark:hover:bg-emerald-800/40 transition-colors appearance-none pl-6 pr-3 py-1 outline-none"
                          >
                            <option value="None">{language === 'en' ? 'Balanced' : 'Ausgewogen'}</option>
                            <option value="High Protein">{language === 'en' ? 'High Protein' : 'Viel Eiweiß'}</option>
                            <option value="Low Carb">{language === 'en' ? 'Low Carb' : 'Wenig Kohlenhydrate'}</option>
                            <option value="Vegetarian">{language === 'en' ? 'Vegetarian' : 'Vegetarisch'}</option>
                            <option value="Vegan">{language === 'en' ? 'Vegan' : 'Vegan'}</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {recommendedSwaps.filter(swap => {
                        const fromFood = allFoods.find(f => f.id === swap.fromId);
                        const toFood = allFoods.find(f => f.id === swap.toId);
                        if (!fromFood || !toFood) return false;
                        if (swapsFavoritesOnly && !favoriteSwapIds.includes(`${swap.fromId}::${swap.toId}`) && !favoriteFoodIds.includes(swap.fromId) && !favoriteFoodIds.includes(swap.toId)) return false;
                        if (!matchesDietaryPreference(toFood, userProfile.dietaryPreferences || [userProfile.dietaryPreference || 'None'])) return false;
                        return true;
                      }).slice(0, 5).map((swap) => {
                        const fromFood = allFoods.find(f => f.id === swap.fromId)!;
                        const toFood = allFoods.find(f => f.id === swap.toId)!;
                        const scoreDiff = Math.round(toFood.health_score - fromFood.health_score);
                        const isExpanded = expandedSwapId === swap.fromId;

                        return (
                          <div
                            key={swap.fromId}
                            className="bg-white dark:bg-neutral-900 rounded-[1.25rem] border border-[#E5EAE3] dark:border-neutral-800 p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
                          >
                            {/* Accordion Trigger Header */}
                            <div
                              onClick={() => {
                                triggerHaptic();
                                setExpandedSwapId(isExpanded ? null : swap.fromId);
                              }}
                              className="cursor-pointer relative"
                            >
                              <div className="flex items-start justify-between mb-3 pr-6 relative text-left">
                                {/* From Food */}
                                <div className="flex flex-col w-[42%]">
                                   <div className="flex items-baseline gap-1.5 flex-wrap">
                                      <span className="text-[17px] font-bold text-amber-500 dark:text-amber-400">{fromFood.health_score}</span>
                                      <span className="text-[15px] font-medium text-neutral-900 dark:text-neutral-100 leading-tight">{fromFood.name}</span>
                                   </div>
                                   <div className="text-[11px] text-neutral-400 dark:text-neutral-550 mt-0.5">{Math.round(fromFood.nutrients_per_100?.kcal || 0)} kcal / 100g</div>
                                </div>

                                {/* Arrow */}
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#EAF3EB] dark:bg-emerald-950/40 flex items-center justify-center mt-1">
                                  <ArrowRight className="w-4 h-4 text-[#519D46] dark:text-emerald-400" />
                                </div>

                                {/* To Food */}
                                <div className="flex flex-col w-[42%]">
                                   <div className="flex items-baseline gap-1.5 flex-wrap">
                                      <span className="text-[17px] font-bold text-[#519D46] dark:text-emerald-400">{toFood.health_score}</span>
                                      <span className="text-[15px] font-medium text-neutral-900 dark:text-neutral-100 leading-tight">{toFood.name}</span>
                                   </div>
                                   <div className="text-[11px] text-neutral-400 dark:text-neutral-550 mt-0.5">{Math.round(toFood.nutrients_per_100?.kcal || 0)} kcal / 100g</div>
                                </div>
                                
                                {/* Chevron */}
                                <div className="absolute right-0 top-1.5 text-neutral-400">
                                  <ChevronDown className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                                </div>
                              </div>

                              <div className="flex justify-between items-end mt-2 text-left">
                                <p className="text-[14px] text-neutral-500 dark:text-neutral-400 max-w-[65%] leading-snug">
                                  {language === 'en' ? 'Healthier option in the same category' : 'Gesündere Option in derselben Kategorie'}
                                </p>
                                <div className="flex items-center gap-1.5 shrink-0 relative z-10">
                                  <button
                                    onClick={(e) => { e.stopPropagation(); toggleFavoriteSwap(swap.fromId, swap.toId, e); }}
                                    className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-all cursor-pointer"
                                    title={language === 'en' ? 'Favorite Swap' : 'Alternative favorisieren'}
                                  >
                                    <Heart 
                                      className={`w-4.5 h-4.5 transition-all active:scale-125 ${
                                        favoriteSwapIds.includes(`${swap.fromId}::${swap.toId}`) 
                                          ? "fill-rose-500 text-rose-500" 
                                          : "text-neutral-300 hover:text-neutral-500"
                                      }`} 
                                    />
                                  </button>
                                  <span className="text-[13px] font-bold text-[#2F7E41] dark:text-emerald-400 bg-[#EAF3EB] dark:bg-emerald-950/45 px-3 py-1 rounded-full whitespace-nowrap">
                                    +{scoreDiff}%
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Expanded compare table */}
                            <div
                              className={`transition-all duration-300 ease-in-out border-t border-neutral-100 dark:border-neutral-800 overflow-hidden ${
                                isExpanded ? "max-h-[800px] opacity-100 mt-4 pt-4" : "max-h-0 opacity-0 pointer-events-none mt-0 pt-0"
                              }`}
                            >
                              <div className="p-4 bg-[#F9FAF9] dark:bg-neutral-900/60 rounded-xl space-y-4">
                                <h5 className="text-[11px] font-bold text-neutral-400 tracking-wider uppercase text-center">
                                  {language === 'en' ? 'Side-By-Side Nutrition Profile (% DV)' : 'Direkter Nährwertvergleich (% DV)'}
                                </h5>

                                <div className="space-y-3 font-sans text-left">
                                  {/* Calories Row */}
                                  <div className="space-y-1">
                                    <div className="flex justify-between text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                                      <span className="text-neutral-500 dark:text-neutral-400">{language === 'en' ? 'Calories' : 'Kalorien'}</span>
                                      <div className="flex gap-4">
                                        <span className={isBetterNutrient("kcal", fromFood.nutrients_per_100?.kcal || 0, toFood.nutrients_per_100?.kcal || 0) ? "text-neutral-400 dark:text-neutral-500 font-normal" : "text-amber-600 dark:text-amber-400 font-bold"}>
                                          {Math.round(fromFood.nutrients_per_100?.kcal || 0)}
                                        </span>
                                        <span className={isBetterNutrient("kcal", fromFood.nutrients_per_100?.kcal || 0, toFood.nutrients_per_100?.kcal || 0) ? "text-emerald-700 dark:text-emerald-400 font-bold" : "text-neutral-400 dark:text-neutral-500 font-normal"}>
                                          {Math.round(toFood.nutrients_per_100?.kcal || 0)}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                      <div className="h-2 bg-neutral-200/75 dark:bg-neutral-800 rounded-full overflow-hidden">
                                        <div
                                          className={`h-full ${!isBetterNutrient("kcal", fromFood.nutrients_per_100?.kcal || 0, toFood.nutrients_per_100?.kcal || 0) ? "bg-amber-500" : "bg-neutral-300 dark:bg-neutral-700"}`}
                                          style={{ width: `${Math.min(100, ((fromFood.nutrients_per_100?.kcal || 0) / 300) * 100)}%` }}
                                        />
                                      </div>
                                      <div className="h-2 bg-neutral-200/75 dark:bg-neutral-800 rounded-full overflow-hidden">
                                        <div
                                          className={`h-full ${isBetterNutrient("kcal", fromFood.nutrients_per_100?.kcal || 0, toFood.nutrients_per_100?.kcal || 0) ? "bg-emerald-500" : "bg-neutral-300 dark:bg-neutral-700"}`}
                                          style={{ width: `${Math.min(100, ((toFood.nutrients_per_100?.kcal || 0) / 300) * 100)}%` }}
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  {/* Macro rows */}
                                  {Object.keys(fromFood.nutrients_per_100).filter(macro => macro !== 'kcal' && macro !== 'micros').map(macro => {
                                    const fromVal = fromFood.nutrients_per_100[macro as keyof typeof fromFood.nutrients_per_100];
                                    const toVal = toFood.nutrients_per_100[macro as keyof typeof toFood.nutrients_per_100];
                                    const better = isBetterNutrient(macro, fromVal as number, toVal as number);

                                    const displayLabels: Record<string, any> = {
                                      protein: language === 'en' ? "Protein (g)" : "Eiweiß (g)",
                                      carbs: language === 'en' ? "Carbohydrates (g)" : "Kohlenhydrate (g)",
                                      fiber: language === 'en' ? "Dietary Fiber (g)" : "Ballaststoffe (g)",
                                      sugars: language === 'en' ? "Sugars (g)" : "Zucker (g)",
                                      fat: language === 'en' ? "Total Fat (g)" : "Fett (g)",
                                      saturatedFat: language === 'en' ? "Saturated Fat (g)" : "Gesättigte Fettsäuren (g)",
                                      sodium: language === 'en' ? "Sodium (mg)" : "Natrium (mg)"
                                    };

                                    return (
                                      <div key={macro} className="space-y-1">
                                        <div className="flex justify-between text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                                          <span className="text-neutral-500 dark:text-neutral-400">{displayLabels[macro] || macro}</span>
                                          <div className="flex gap-4">
                                            <span className={better ? "text-neutral-400 dark:text-neutral-500 font-normal" : "text-rose-500 dark:text-rose-400 font-bold"}>
                                              {fromVal}
                                            </span>
                                            <span className={better ? "text-emerald-700 dark:text-emerald-400 font-bold" : "text-neutral-400 dark:text-neutral-500 font-normal"}>
                                              {toVal}
                                            </span>
                                          </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                          <div className="h-2 bg-neutral-200/75 dark:bg-neutral-800 rounded-full overflow-hidden">
                                            <div
                                              className={`h-full ${!better ? "bg-amber-500" : "bg-neutral-300 dark:bg-neutral-700"}`}
                                              style={{ width: `${getMacroDV(macro, fromVal as number)}%` }}
                                            />
                                          </div>
                                          <div className="h-2 bg-neutral-200/75 dark:bg-neutral-800 rounded-full overflow-hidden">
                                            <div
                                              className={`h-full ${better ? "bg-emerald-500" : "bg-neutral-300 dark:bg-neutral-700"}`}
                                              style={{ width: `${getMacroDV(macro, toVal as number)}%` }}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>

                                <p className="text-[11px] text-neutral-400 font-medium italic pt-2 text-center border-t border-[#E5EAE3] dark:border-neutral-800">
                                  {language === 'en' ? 'Green bar indicates nutritionally superior level.' : 'Der grüne Balken zeigt den ernährungsphysiologisch besseren Wert.'}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==================== BILLS TAB ==================== */}
          {activeTab === "bill" && (
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden text-left">
              {/* Header (stays fixed at the top) */}
              <div className="px-5 pt-8 pb-3 space-y-1 flex-shrink-0 bg-[#F7FBF6] dark:bg-black">
                <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
                  {t("bills")}
                </h1>
                <p className="text-[15px] text-neutral-500 dark:text-neutral-400 font-medium">
                  {t("trackReceipts")}
                </p>
              </div>

              {/* Scrollable Rest */}
              <div className="flex-1 overflow-y-auto px-5 pb-32 space-y-6 no-scrollbar">
                {/* Health Points Card */}
              <div className="bg-white dark:bg-neutral-900 rounded-[1.25rem] border border-[#E5EAE3] dark:border-neutral-800 py-8 px-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col items-center gap-4">
                <div className="relative w-[120px] h-[120px]">
                  <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#EAECE9" strokeWidth="10" />
                    <circle 
                      cx="50" cy="50" r="42" fill="none" stroke="#519D46" strokeWidth="10" 
                      strokeDasharray="264" strokeDashoffset={healthOffset} strokeLinecap="round" 
                      style={{ transition: "stroke-dashoffset 1s ease-out" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-[#3B7A32] leading-none">{avgHealthScore}%</span>
                  </div>
                </div>
                <p className="text-[13px] text-neutral-500 font-medium">{t("pointsThisWeek")}</p>
              </div>

              {/* Scan Button */}
              <button
                onClick={() => handleTabChange("scan")}
                disabled={isScanning}
                className="w-full bg-[#519D46] hover:bg-[#438739] transition-colors text-white py-4 rounded-[1.25rem] font-bold text-base flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
              >
                {isScanning ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Camera className="w-5 h-5" />
                    {t("scanReceipt")}
                  </>
                )}
              </button>


              {/* Recent Bills */}
              <div className="space-y-4 pt-2">
                <h3 className="text-[13px] font-bold text-neutral-400 tracking-wider uppercase px-0.5">
                  {t("recentBills")}
                </h3>

                <div className="space-y-6">
                  {receipts.length === 0 ? (
                    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-[#E5EAE3] dark:border-neutral-800 p-8 text-center space-y-3">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 mb-2">
                        <Receipt className="w-6 h-6" />
                      </div>
                      <h3 className="text-neutral-900 dark:text-neutral-100 font-bold text-lg">{t("noHistory")}</h3>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        {t("noHistoryDesc")}
                      </p>
                    </div>
                  ) : (
                    (() => {
                      const sortedReceipts = [...receipts].sort((a, b) => {
                        const da = new Date(a.date).getTime();
                        const db = new Date(b.date).getTime();
                        return db - da;
                      });
                      
                      const displayedReceipts = showAllBills ? sortedReceipts : sortedReceipts.slice(0, 3);
                      
                      // Grouping
                      const groupedReceipts: { [key: string]: typeof receipts } = {};
                      displayedReceipts.forEach(r => {
                        const label = getWeekLabel(r.date, language);
                        if (!groupedReceipts[label]) {
                          groupedReceipts[label] = [];
                        }
                        groupedReceipts[label].push(r);
                      });
                      
                      return (
                        <div className="space-y-6">
                          {Object.keys(groupedReceipts).map((weekLabel) => (
                            <div key={weekLabel} className="space-y-2.5">
                              {/* Week Section Header */}
                              <h4 className="text-[12px] font-bold text-[#519D46] dark:text-emerald-400 border-b border-neutral-200/60 dark:border-neutral-800/80 pb-1.5 px-0.5 tracking-wider uppercase">
                                {weekLabel}
                              </h4>
                              
                              <div className="space-y-3">
                                {groupedReceipts[weekLabel].map((receipt) => {
                                  const rDate = new Date(receipt.date);
                                  const fullDate = isNaN(rDate.getTime()) ? receipt.date : rDate.toLocaleDateString(language === 'en' ? 'en-US' : 'de-DE', { month: 'short', day: 'numeric', year: 'numeric' });
                                  const isExpanded = expandedBillId === receipt.id;
                                  const calculatedScore = getReceiptScore(receipt);
                                  
                                  return (
                                    <div
                                      key={receipt.id}
                                      className="bg-white dark:bg-neutral-900 rounded-[1.25rem] border border-[#E5EAE3] dark:border-neutral-800 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden text-left"
                                    >
                                      <div 
                                         className="p-4 flex items-center gap-4 cursor-pointer text-left"
                                         onClick={() => {
                                           triggerHaptic();
                                           setExpandedBillId(isExpanded ? null : receipt.id);
                                         }}
                                      >
                                        <div className="w-12 h-12 rounded-xl bg-[#F7FBF6] dark:bg-neutral-800 border border-[#E5EAE3] dark:border-neutral-700 flex items-center justify-center shrink-0">
                                          <Receipt className="w-5 h-5 text-neutral-400 dark:text-neutral-500" />
                                        </div>
                                        
                                        <div className="flex-1 min-w-0 space-y-0.5">
                                          <h4 className="font-bold text-neutral-900 dark:text-neutral-100 text-[15px] truncate">
                                            {receipt.storeName || (language === 'en' ? "Unknown store" : "Unbekanntes Geschäft")}
                                          </h4>
                                          <p className="text-xs text-neutral-400 dark:text-neutral-500 truncate">
                                            {fullDate} • {receipt.totalAmount || "EUR 15.95"} • {receipt.items?.length || 0} {t("items")}
                                          </p>
                                        </div>

                                        <div className="shrink-0 flex items-center gap-2">
                                          <div className="w-10 h-10 rounded-full bg-[#EAF3EB] dark:bg-emerald-950/40 text-[#2F7E41] dark:text-emerald-400 font-bold text-[13px] flex items-center justify-center">
                                            {calculatedScore}
                                            <span className="text-[9px] font-medium ml-0.5 mt-0.5">%</span>
                                          </div>
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              triggerHaptic();
                                              setReceipts(prev => prev.filter(r => r.id !== receipt.id));
                                            }}
                                            className="p-1.5 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg text-neutral-300 dark:text-neutral-600 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
                                            title={t("deleteBill")}
                                          >
                                            <Trash2 className="w-4.5 h-4.5" />
                                          </button>
                                          <ChevronDown className={`w-5 h-5 text-neutral-400 dark:text-neutral-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                                        </div>
                                      </div>

                                      {isExpanded && receipt.items && receipt.items.length > 0 && (
                                        <div className="border-t border-[#E5EAE3] dark:border-neutral-800 p-4 bg-[#F7FBF6]/50 dark:bg-neutral-950/40 space-y-2">
                                          {receipt.items.map((item: any, idx: number) => {
                                             const dynFood = dynamicFoods.find(f => f.id === item.id) || item.foodData;
                                             const score = dynFood?.health_score || 50;
                                             const swapFoods = dynFood ? getBillItemSwaps(dynFood, userProfile.dietaryPreferences || [userProfile.dietaryPreference || 'None']) : [];
                                             return (
                                             <div 
                                               key={idx}
                                               onClick={() => {
                                                 if (dynFood) {
                                                   triggerHaptic();
                                                   setSelectedFoodId(dynFood.id);
                                                   if (!FOODS.find(f => f.id === dynFood.id)) {
                                                     FOODS.push(dynFood);
                                                   }
                                                 } else {
                                                   handleOpenDynamicFood(item);
                                                 }
                                               }}
                                               className="flex flex-col p-3 bg-white dark:bg-neutral-900 rounded-xl border border-[#E5EAE3] dark:border-neutral-800 cursor-pointer shadow-sm hover:border-[#CDE5CE] dark:hover:border-[#3a4736] transition-colors text-left"
                                             >
                                               <div className="flex items-center justify-between w-full"><div className="flex items-center gap-3 min-w-0 flex-1">
                                                 <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 relative ${score >= 75 ? 'bg-[#EAF3EB] dark:bg-emerald-950/40 text-[#2F7E41] dark:text-emerald-400 border border-[#CDE5CE] dark:border-emerald-900/40' : score >= 50 ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900/40' : 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/40'}`}>
                                                   {dynFood ? (
                                                     <FoodIcon food={dynFood} className="w-5 h-5 stroke-[1.8]" />
                                                   ) : (
                                                     <Receipt className="w-4 h-4 text-neutral-400" />
                                                   )}
                                                   <div className={`absolute -bottom-1 -right-1 px-1 rounded text-[8px] font-extrabold border leading-none py-0.5 shadow-sm ${score >= 75 ? 'bg-white dark:bg-neutral-800 text-[#2F7E41] dark:text-emerald-400 border-[#CDE5CE] dark:border-emerald-900' : score >= 50 ? 'bg-white dark:bg-neutral-800 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900' : 'bg-white dark:bg-neutral-800 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900'}`}>
                                                     {score}
                                                   </div>
                                                 </div>
                                                 <div className="flex flex-col min-w-0 flex-1">
                                                   <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate w-full">{item.cleanName}</span>
                                                   <span className="text-[10px] text-neutral-400 dark:text-neutral-500 truncate w-full">{item.rawName}</span>
                                                 </div>
                                               </div>
                                                <ArrowRight className="w-3.5 h-3.5 text-neutral-300 dark:text-neutral-600 shrink-0 ml-2" />
                                              </div>

                                               {swapFoods && swapFoods.length > 0 && (
                                                  <div className="mt-2.5 pt-2 border-t border-[#E5EAE3] dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center gap-1.5 w-full">
                                                    <span className="text-[9px] font-bold text-neutral-400 dark:text-neutral-500 flex items-center gap-1 uppercase tracking-wider shrink-0">
                                                      <Sparkles className="w-2.5 h-2.5 text-[#519D46] dark:text-emerald-400 shrink-0 animate-pulse" />
                                                      {language === 'en' ? 'Swaps:' : 'Tausch:'}
                                                    </span>
                                                    <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
                                                      {swapFoods.map((sf, sIdx) => (
                                                        <div 
                                                          key={sIdx}
                                                          onClick={(e) => {
                                                            e.stopPropagation();
                                                            triggerHaptic();
                                                            setSelectedFoodId(sf.id);
                                                            if (!FOODS.find(f => f.id === sf.id)) {
                                                              FOODS.push(sf);
                                                            }
                                                          }}
                                                          className="flex items-center gap-1.5 bg-emerald-50/70 dark:bg-emerald-950/25 hover:bg-emerald-100/80 dark:hover:bg-emerald-950/45 border border-emerald-100 dark:border-[#3b5c3e]/40 rounded-lg px-2 py-0.5 text-left cursor-pointer transition-all max-w-full"
                                                          title={language === 'en' ? `Swap to ${sf.name}` : `Zu ${sf.name} tauschen`}
                                                        >
                                                          <span className="text-[11px] font-bold text-neutral-700 dark:text-neutral-300 truncate max-w-[80px] sm:max-w-[130px]">{sf.name}</span>
                                                          <span className="text-[9px] font-extrabold text-[#2F7E41] dark:text-emerald-400 bg-white dark:bg-neutral-800 px-1 rounded-md border border-emerald-100 dark:border-neutral-700 leading-none py-0.5 shrink-0">
                                                            {sf.health_score}
                                                          </span>
                                                        </div>
                                                      ))}
                                                    </div>
                                                  </div>
                                                )}

                                               
                                             </div>
                                             );
                                          })}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          ))}

                          {receipts.length > 3 && (
                            <div className="pt-2 flex justify-center">
                              <button
                                onClick={() => {
                                  triggerHaptic();
                                  setShowAllBills(prev => !prev);
                                }}
                                className="text-xs font-bold text-[#2F7E41] dark:text-emerald-400 bg-[#EAF3EB] dark:bg-emerald-950/40 hover:bg-[#DCEFDE] dark:hover:bg-[#254029] transition-colors px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm"
                              >
                                {showAllBills ? (
                                  <>
                                    <span>{language === 'en' ? 'Show Less' : 'Weniger anzeigen'}</span>
                                  </>
                                ) : (
                                  <>
                                    <span>{language === 'en' ? `See All Bills (${receipts.length})` : `Alle Belege anzeigen (${receipts.length})`}</span>
                                  </>
                                )}
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })()
                  )}
                </div>
              </div>

              </div>
            </div>
          )}

          {/* ==================== SCAN TAB ==================== */}
          {activeTab === "scan" && (
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden text-left">
              {/* Header (stays fixed at the top) */}
              <div className="px-5 pt-8 pb-3 space-y-4 flex-shrink-0 bg-[#F7FBF6] dark:bg-black">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => handleTabChange("bill")}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-neutral-800 border border-[#E5EAE3] dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-sm"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
                    Scan Receipt
                  </h1>
                </div>

                <p className="text-[15px] text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed">
                  Take a picture of your grocery bill to check the health score of your purchases.
                </p>
              </div>

              {/* Scrollable Rest */}
              <div className="flex-1 overflow-y-auto px-5 pb-32 space-y-6 no-scrollbar">
                {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isScanning}
                  className="w-full bg-[#519D46] hover:bg-[#438739] transition-colors text-white py-4 rounded-[1.25rem] font-bold text-base flex items-center justify-center gap-3 shadow-[0_2px_10px_rgba(81,157,70,0.2)] disabled:opacity-50"
                >
                  {isScanning ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Camera className="w-5 h-5" />
                      Take Photo
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => fileInputLibRef.current?.click()}
                  disabled={isScanning}
                  className="w-full bg-white dark:bg-neutral-900 border-2 border-[#E5EAE3] dark:border-neutral-800 dark:text-neutral-200 hover:border-[#519D46] hover:text-[#519D46] transition-colors text-neutral-700 py-4 rounded-[1.25rem] font-bold text-base flex items-center justify-center gap-3 shadow-sm disabled:opacity-50"
                >
                  <FileImage className="w-5 h-5 text-neutral-400" />
                  Choose from Library
                </button>

                <button
                  onClick={handleLoadDemoBill}
                  disabled={isScanning}
                  className="w-full bg-[#EAF3EB] hover:bg-[#DCEFDE] transition-colors text-[#2F7E41] py-4 rounded-[1.25rem] font-bold text-base flex items-center justify-center gap-3 shadow-sm disabled:opacity-50"
                >
                  <Sparkles className="w-5 h-5 text-[#2F7E41]" />
                  Try with Demo Receipt
                </button>
              </div>

              {/* How it works */}
              <div className="pt-8 space-y-4">
                <h3 className="text-lg font-bold text-neutral-900">How it works</h3>
                <div className="space-y-4">
                  {[
                    { title: "Take a clear picture of your receipt", icon: Camera },
                    { title: "We identify the groceries you bought", icon: Search },
                    { title: "Get a health score for your purchase", icon: Sparkles }
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-[1rem] bg-[#EAF3EB] text-[#2F7E41] flex items-center justify-center shrink-0">
                        <step.icon className="w-6 h-6" />
                      </div>
                      <span className="text-[15px] font-medium text-neutral-800 leading-snug">
                        {step.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              </div>
            </div>
          )}

        </div>

        <input 
          type="file" 
          accept="image/*" 
          capture="environment"
          className="hidden" 
          ref={fileInputRef} 
          onChange={handleScanBill} 
        />
        <input 
          type="file" 
          accept="image/*" 
          className="hidden" 
          ref={fileInputLibRef} 
          onChange={handleScanBill} 
        />

        {/* PREMIUM FLOATING TAB BAR IN PURE WHITE */}
        <div className="absolute bottom-6 inset-x-5 z-40 select-none">
          <div 
            onTouchStart={handleMainTouchStart}
            onTouchMove={handleMainTouchMove}
            onTouchEnd={handleMainTouchEnd}
            onTouchCancel={handleMainTouchEnd}
            className="h-[74px] bg-white dark:bg-black/95 rounded-full border border-neutral-200/90 dark:border-neutral-800/90 shadow-[0_12px_36px_rgba(0,0,0,0.1)] flex justify-around items-center px-2.5 relative overflow-hidden"
          >
            
            {/* Tab 1: Today */}
            <button
              onClick={() => handleTabChange("home")}
              className="flex-1 h-full flex flex-col items-center justify-center gap-1 cursor-pointer relative z-10 transition-colors"
            >
              {activeTab === "home" && (
                <motion.div
                  layoutId="activeTabIndicator"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  className="absolute inset-x-1.5 inset-y-2 rounded-full bg-[#F4F8FC] dark:bg-[#222521] border border-[#E0ECFC] dark:border-neutral-700 shadow-[0_2px_6px_rgba(0,122,255,0.03)] overflow-hidden"
                />
              )}
              <Home 
                className={`w-[21px] h-[21px] relative z-10 transition-colors duration-300 ${activeTab === "home" ? "text-[#007AFF] dark:text-emerald-400" : "text-neutral-500 dark:text-neutral-400"}`} 
                strokeWidth={activeTab === "home" ? 2.5 : 1.8} 
              />
              <span className={`text-[10px] font-bold tracking-wide relative z-10 transition-colors duration-300 ${activeTab === "home" ? "text-[#007AFF] dark:text-emerald-400" : "text-neutral-500 dark:text-neutral-400"}`}>
                {t("today")}
              </span>
            </button>
 
            {/* Tab 2: Recipes */}
            <button
              onClick={() => handleTabChange("recipes")}
              className="flex-1 h-full flex flex-col items-center justify-center gap-1 cursor-pointer relative z-10 transition-colors"
            >
              {activeTab === "recipes" && (
                <motion.div
                  layoutId="activeTabIndicator"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  className="absolute inset-x-1.5 inset-y-2 rounded-full bg-[#F4F8FC] dark:bg-[#222521] border border-[#E0ECFC] dark:border-neutral-700 shadow-[0_2px_6px_rgba(0,122,255,0.03)] overflow-hidden"
                />
              )}
              <Utensils 
                className={`w-[21px] h-[21px] relative z-10 transition-colors duration-300 ${activeTab === "recipes" ? "text-[#007AFF] dark:text-emerald-400" : "text-neutral-500 dark:text-neutral-400"}`} 
                strokeWidth={activeTab === "recipes" ? 2.5 : 1.8} 
              />
              <span className={`text-[10px] font-bold tracking-wide relative z-10 transition-colors duration-300 ${activeTab === "recipes" ? "text-[#007AFF] dark:text-emerald-400" : "text-neutral-500 dark:text-neutral-400"}`}>
                {language === "en" ? "Recipes" : "Rezepte"}
              </span>
            </button>
 
            {/* Tab 3: Swaps */}
            <button
              onClick={() => handleTabChange("swaps")}
              className="flex-1 h-full flex flex-col items-center justify-center gap-1 cursor-pointer relative z-10 transition-colors"
            >
              {activeTab === "swaps" && (
                <motion.div
                  layoutId="activeTabIndicator"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  className="absolute inset-x-1.5 inset-y-2 rounded-full bg-[#F4F8FC] dark:bg-[#222521] border border-[#E0ECFC] dark:border-neutral-700 shadow-[0_2px_6px_rgba(0,122,255,0.03)] overflow-hidden"
                />
              )}
              <ArrowLeftRight 
                className={`w-[21px] h-[21px] relative z-10 transition-colors duration-300 ${activeTab === "swaps" ? "text-[#007AFF] dark:text-emerald-400" : "text-neutral-500 dark:text-neutral-400"}`} 
                strokeWidth={activeTab === "swaps" ? 2.5 : 1.8} 
              />
              <span className={`text-[10px] font-bold tracking-wide relative z-10 transition-colors duration-300 ${activeTab === "swaps" ? "text-[#007AFF] dark:text-emerald-400" : "text-neutral-500 dark:text-neutral-400"}`}>
                {t("swaps")}
              </span>
            </button>
 
            {/* Tab 4: Bills */}
            <button
              onClick={() => handleTabChange("bill")}
              className="flex-1 h-full flex flex-col items-center justify-center gap-1 cursor-pointer relative z-10 transition-colors"
            >
              {activeTab === "bill" && (
                <motion.div
                  layoutId="activeTabIndicator"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  className="absolute inset-x-1.5 inset-y-2 rounded-full bg-[#F4F8FC] dark:bg-[#222521] border border-[#E0ECFC] dark:border-neutral-700 shadow-[0_2px_6px_rgba(0,122,255,0.03)] overflow-hidden"
                />
              )}
              <Receipt 
                className={`w-[21px] h-[21px] relative z-10 transition-colors duration-300 ${activeTab === "bill" ? "text-[#007AFF] dark:text-emerald-400" : "text-neutral-500 dark:text-neutral-400"}`} 
                strokeWidth={activeTab === "bill" ? 2.5 : 1.8} 
              />
              <span className={`text-[10px] font-bold tracking-wide relative z-10 transition-colors duration-300 ${activeTab === "bill" ? "text-[#007AFF] dark:text-emerald-400" : "text-neutral-500 dark:text-neutral-400"}`}>
                {t("bills")}
              </span>
            </button>
          </div>
        </div>

        {/* ==================== FOOD DETAIL SLIDE-UP SHEET ==================== */}
        {currentFoodDetail && (
          <>
            {/* Dark Dim Backdrop */}
            <div
              onClick={handleCloseFood}
              className="absolute inset-0 bg-black/40 z-50 transition-opacity duration-300"
            />

            {/* Bottom Sheet Modal Panel */}
            <div
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{
                transform: `translateY(${dragOffset}px)`,
                transition: isDragging ? "none" : "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
              }}
              className="absolute bottom-0 inset-x-0 h-[88vh] bg-[#F7FBF6] dark:bg-black rounded-t-[24px] shadow-2xl z-50 flex flex-col overflow-hidden border-t border-[#E5EAE3] dark:border-neutral-800"
            >
              {/* Drag Grabber indicator */}
              <div className="w-full flex justify-center py-3 select-none flex-shrink-0 cursor-row-resize">
                <div className="w-10 h-1.5 bg-neutral-300 dark:bg-neutral-700 rounded-full" />
              </div>

              {/* Favorite Button top-right */}
              <button
                onClick={(e) => toggleFavoriteFood(currentFoodDetail.id, e)}
                className="absolute top-3.5 right-12 w-7 h-7 bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-[#2c2d2c] rounded-full flex items-center justify-center border border-[#E5EAE3] dark:border-neutral-700 z-50 shadow-sm transition-colors"
                title={language === 'en' ? 'Favorite' : 'Favorisieren'}
              >
                <Heart 
                  className={`w-4 h-4 transition-all active:scale-125 ${
                    favoriteFoodIds.includes(currentFoodDetail.id) 
                      ? "fill-rose-500 text-rose-500" 
                      : "text-neutral-400 hover:text-neutral-600 dark:text-neutral-300"
                  }`} 
                />
              </button>

              {/* Close Button top-right */}
              <button
                onClick={handleCloseFood}
                className="absolute top-3.5 right-3.5 w-7 h-7 bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-full flex items-center justify-center border border-[#E5EAE3] dark:border-neutral-700 text-neutral-400 hover:text-neutral-600 dark:text-neutral-300 z-50 shadow-sm"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Scrollable Container */}
              <div className="flex-1 overflow-y-auto px-5 pb-8 space-y-6 no-scrollbar">
                
                {/* Header with Title and Score Ring */}
                <div className="flex justify-between items-start pt-6 text-left">
                  <div className="space-y-2.5 w-[65%]">
                    <div className="flex items-center gap-2 bg-[#F2F7F2] dark:bg-emerald-950/30 border border-[#E5EAE3] dark:border-neutral-800 rounded-full px-2.5 py-1 w-fit">
                      <FoodIcon food={currentFoodDetail} className="w-4 h-4 text-[#519D46] dark:text-emerald-400 stroke-[2]" />
                      <span className="text-[10px] font-extrabold text-[#3B7A32] dark:text-emerald-400 uppercase tracking-widest leading-none">
                        {currentFoodDetail.swiss_category || currentFoodDetail.category}
                      </span>
                    </div>
                    <h2 className="text-[32px] font-bold text-neutral-900 dark:text-neutral-100 tracking-tight leading-tight">
                      {currentFoodDetail.name}
                    </h2>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">
                      per 100g
                    </p>
                    <div className="flex items-baseline gap-1 pt-1">
                      <span className="text-2xl font-bold text-[#519D46] dark:text-emerald-400">{Math.round(currentFoodDetail.nutrients_per_100.kcal)}</span>
                      <span className="text-sm font-medium text-neutral-400 dark:text-neutral-500">kcal / 100g</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 -mt-2">
                    <ScoreRing score={currentFoodDetail.health_score} size={96} strokeWidth={6.5} />
                  </div>
                </div>
                
                {/* Smart Swap Recommendation */}
                {(() => {
                  const swaps = getSmartSwapsForFood(currentFoodDetail);
                  if (swaps.length === 0) {
                    return (
                      <div className="bg-[#EAF3EB] dark:bg-emerald-950/40 p-4 rounded-2xl border border-[#CDE5CE] dark:border-neutral-800 flex items-start gap-3 mt-4 text-left">
                        <div className="bg-white dark:bg-neutral-800 p-1.5 rounded-full shadow-sm text-[#519D46] dark:text-emerald-400 mt-0.5 shrink-0">
                          <Check className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-neutral-900 dark:text-neutral-100 text-sm">
                            {language === 'en' ? 'Great Choice!' : 'Gute Wahl!'}
                          </p>
                          <p className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                            {language === 'en' ? 'This product is already a healthy option in its category.' : 'Dieses Produkt ist bereits eine gesunde Option in seiner Kategorie.'}
                          </p>
                        </div>
                      </div>
                    );
                  }
                  
                  return (
                    <div className="pt-3 pb-1 text-left space-y-3">
                      <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                        {swaps.length > 1 
                          ? (language === 'en' ? 'Smarter Swaps' : 'Bessere Alternativen') 
                          : (language === 'en' ? 'Smarter Swap' : 'Bessere Alternative')}
                      </h3>
                      {swaps.map((swap, idx) => (
                        <div 
                          key={idx}
                          onClick={() => handleOpenFood(swap.toFood.id)}
                          className="bg-white dark:bg-neutral-900 rounded-[1.25rem] border border-[#E5EAE3] dark:border-neutral-800 p-4 shadow-sm flex gap-4 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                        >
                          <div className="w-[72px] h-[72px] bg-neutral-100 dark:bg-neutral-800 rounded-xl flex-shrink-0 flex items-center justify-center relative overflow-hidden">
                            {swap.toFood.image ? (
                              <img src={swap.toFood.image} alt={swap.toFood.name} className="w-full h-full object-cover" />
                            ) : (
                              <FoodIcon food={swap.toFood} className="w-10 h-10 text-[#519D46] dark:text-emerald-400 stroke-[1.8]" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0 flex flex-col justify-center">
                            <p className="text-xs font-bold text-[#519D46] dark:text-emerald-400 uppercase tracking-wide mb-0.5">
                              {language === 'en' ? 'Recommended' : 'Empfohlen'}
                            </p>
                            <h4 className="text-base font-bold text-neutral-900 dark:text-neutral-100 truncate">
                              {swap.toFood.name}
                            </h4>
                            <p className="text-xs text-neutral-500 font-medium truncate">
                              {swap.toFood.brand || swap.toFood.category}
                            </p>
                          </div>
                          <div className="flex-shrink-0 flex items-center">
                             <div className="bg-[#EAF3EB] dark:bg-emerald-950/40 text-[#2F7E41] dark:text-emerald-400 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm">
                               {swap.toFood.health_score} <span className="opacity-70">/ 100</span>
                             </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}

                <div className="space-y-3 pt-2 text-left">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                    {language === 'en' ? 'Nutrition Facts' : 'Nährwertangaben'}
                  </h3>
                  <div className="bg-white dark:bg-neutral-900 rounded-[1.25rem] border border-[#E5EAE3] dark:border-neutral-800 p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-[#F2F6F1] dark:border-neutral-800">
                      <p className="text-xs text-neutral-400 dark:text-neutral-500 font-medium">
                        {language === 'en' ? 'Per 100g (% of Daily Value)' : 'Pro 100g (% des Tagesbedarfs)'}
                      </p>
                      <p className="text-[10px] text-[#519D46] dark:text-emerald-400 font-medium bg-[#EAF3EB] dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
                        {language === 'en' ? 'Source: Swiss Food Composition Database' : 'Quelle: Swiss Food Composition Database'}
                      </p>
                    </div>

                    {/* Macros lists */}
                    <div className="space-y-3.5">
                      {(() => {
                        const labels: Record<string, any> = {
                          kcal: language === 'en' ? "Calories" : "Kalorien",
                          protein_g: language === 'en' ? "Protein" : "Eiweiß",
                          carbs_g: language === 'en' ? "Carbohydrates" : "Kohlenhydrate",
                          fiber_g: language === 'en' ? "Fiber" : "Ballaststoffe",
                          sugars_g: language === 'en' ? "Sugars" : "Zucker",
                          fat_g: language === 'en' ? "Total Fat" : "Fett",
                          saturated_fat_g: language === 'en' ? "Saturated Fat" : "Gesättigte Fettsäuren",
                          salt_g: language === 'en' ? "Salt" : "Salz"
                        };

                        return Object.entries(currentFoodDetail.nutrients_per_100)
                          .filter(([key]) => key !== 'kcal' && key !== 'micros')
                          .map(([key, val]) => {
                            const dv = getMacroDV(key, val as number);
                            return (
                              <div key={key} className="space-y-1">
                                <div className="flex justify-between items-end text-sm leading-none">
                                  <span className="font-medium text-neutral-700 dark:text-neutral-300">
                                    {labels[key] || key}
                                  </span>
                                  <div className="flex gap-3 text-right font-sans">
                                    <span className="font-bold text-neutral-900 dark:text-neutral-100">{val}g</span>
                                    <span className="font-bold text-[#519D46] dark:text-emerald-400 w-8">{dv}%</span>
                                  </div>
                                </div>
                                <div className="h-1 bg-[#F2F6F1] dark:bg-neutral-800 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-[#519D46] dark:bg-emerald-500 rounded-full" 
                                    style={{ width: `${Math.min(dv, 100)}%` }}
                                  />
                                </div>
                              </div>
                            );
                        });
                      })()}
                    </div>
                  </div>
                </div>

                {/* Vitamins & Minerals Section */}
                {currentFoodDetail.nutrients_per_100.micros && Object.values(currentFoodDetail.nutrients_per_100.micros).some(v => v !== null && v !== undefined) && (
                  <div className="bg-white dark:bg-neutral-900 rounded-[1.25rem] border border-[#E5EAE3] dark:border-neutral-800 p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] mt-4">
                    <h4 className="text-[17px] font-bold text-neutral-900 dark:text-neutral-100 tracking-tight mb-4">
                      {language === 'en' ? 'Vitamins & Minerals (per 100g)' : 'Vitamine & Mineralstoffe (pro 100g)'}
                    </h4>
                    <div className="space-y-3.5">
                      {Object.entries(currentFoodDetail.nutrients_per_100.micros)
                        .filter(([_, val]) => val !== null && val !== undefined)
                        .map(([key, val]) => {
                          const formatKey = (k) => {
                            const names = {
                              vitamin_a_ug: "Vitamin A", betacarotene_ug: "Beta-Carotene",
                              vitamin_b1_mg: "Vitamin B1", vitamin_b2_mg: "Vitamin B2",
                              vitamin_b6_mg: "Vitamin B6", vitamin_b12_ug: "Vitamin B12",
                              niacin_mg: "Niacin", folate_ug: "Folate",
                              pantothenic_acid_mg: "Pantothenic Acid", vitamin_c_mg: "Vitamin C",
                              vitamin_d_ug: "Vitamin D", vitamin_e_mg: "Vitamin E",
                              sodium_mg: "Sodium", potassium_mg: "Potassium",
                              chloride_mg: "Chloride", calcium_mg: "Calcium",
                              magnesium_mg: "Magnesium", phosphorus_mg: "Phosphorus",
                              iron_mg: "Iron", iodide_ug: "Iodide", zinc_mg: "Zinc"
                            };
                            return names[k] || k.replace(/_/g, ' ');
                          };
                          const getDV = (k, v) => {
                            const dvs = {
                              vitamin_a_ug: 900, vitamin_c_mg: 90, vitamin_d_ug: 20,
                              calcium_mg: 1000, iron_mg: 14, potassium_mg: 3500,
                              magnesium_mg: 400, zinc_mg: 11, sodium_mg: 2300,
                              vitamin_b12_ug: 2.4, vitamin_b6_mg: 1.7
                            };
                            const standard = dvs[k];
                            if (!standard) return null;
                            return Math.round((v / standard) * 100);
                          };
                          const dv = getDV(key, val);
                          const isUg = key.endsWith('_ug');
                          
                          return (
                              <div key={key} className="space-y-1">
                                <div className="flex justify-between items-end text-sm leading-none">
                                  <span className="font-medium text-neutral-700 dark:text-neutral-300">
                                    {formatKey(key)}
                                  </span>
                                  <div className="flex gap-3 text-right font-sans">
                                    <span className="font-bold text-neutral-900 dark:text-neutral-100">{val}{isUg ? 'µg' : 'mg'}</span>
                                    <span className="font-bold text-[#519D46] dark:text-emerald-400 w-8">{dv !== null ? dv + '%' : 'N/A'}</span>
                                  </div>
                                </div>
                                <div className="h-1 bg-[#F2F6F1] dark:bg-neutral-800 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-[#519D46] dark:bg-emerald-500 rounded-full" 
                                    style={{ width: `${Math.min(dv || 0, 100)}%` }}
                                  />
                                </div>
                              </div>
                          );
                        })}
                    </div>
                  </div>
                )}

                {currentFoodDetail.offUrl && (
                  <div className="pt-2">
                    <a
                      href={currentFoodDetail.offUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#EAF3EB] dark:bg-emerald-950/30 hover:bg-[#DCEFDE] dark:hover:bg-emerald-950/50 transition-colors text-[#2F7E41] dark:text-emerald-400 py-4 rounded-[1.25rem] font-bold text-base flex items-center justify-center gap-3 border border-[#CDE5CE] dark:border-neutral-800 shadow-sm cursor-pointer"
                      id="off_link_button"
                    >
                      <ExternalLink className="w-5 h-5 text-[#2F7E41] dark:text-emerald-400" />
                      {language === 'en' ? 'View in Swiss Food DB' : 'In Schweizer Nährwertdatenbank ansehen'}
                    </a>
                  </div>
                )}

              </div></div></>
        )}

{/* Global Loading Overlay */}
      {isGeneratingFood && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-xl flex flex-col items-center gap-4 max-w-[80vw]">
            <div className="w-8 h-8 border-4 border-[#EAF3EB] dark:border-neutral-800 border-t-[#519D46] dark:border-t-emerald-400 rounded-full animate-spin" />
            <p className="text-sm font-bold text-neutral-900 dark:text-neutral-100 text-center">
              {language === 'en' ? 'Loading nutritional data...' : 'Nährwertdaten werden geladen...'}
            </p>
          </div>
        </div>
      )}

      {/* Custom Scan Error Overlay */}
      {scanError && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 backdrop-blur-sm animate-in fade-in duration-200 p-4">
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-[1.5rem] shadow-2xl flex flex-col gap-5 max-w-[90vw] w-[360px] border border-neutral-100 dark:border-neutral-800 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 bg-amber-50 dark:bg-amber-950/45 rounded-full flex items-center justify-center text-amber-500 self-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-2 text-center">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                {language === 'en' ? 'Receipt Scan Issue' : 'Fehler beim Scannen des Belegs'}
              </h3>
              <p className="text-[13px] text-neutral-500 dark:text-neutral-400 leading-normal">
                {language === 'en' 
                  ? 'We encountered an issue reading the receipt image. Make sure the photo is clear and well-lit, or try our high-fidelity preloaded Demo Receipt to explore full features instantly!'
                  : 'Es gab ein Problem beim Lesen des Belegs. Stellen Sie sicher, dass das Foto klar und gut beleuchtet ist, oder probieren Sie unseren Demobeleg aus, um alle Funktionen sofort zu testen!'}
              </p>
              <div className="text-[10px] bg-neutral-50 dark:bg-neutral-950 text-neutral-500 dark:text-neutral-400 rounded-lg p-2.5 mt-2 font-mono text-left max-h-[80px] overflow-y-auto border border-neutral-100 dark:border-neutral-800">
                {scanError}
              </div>
            </div>
            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={() => {
                  setScanError(null);
                  handleLoadDemoBill();
                }}
                className="w-full bg-[#519D46] hover:bg-[#438739] text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                {language === 'en' ? 'Try Demo Receipt' : 'Demobeleg probieren'}
              </button>
              <button
                onClick={() => setScanError(null)}
                className="w-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 py-3 rounded-xl font-bold text-sm transition-colors"
              >
                {language === 'en' ? 'Dismiss' : 'Verwerfen'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Personalized Nutrition Breakdown Details Modal */}
      {showCalorieDetail && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 p-4">
          <div className="bg-white dark:bg-[#111111] p-6 rounded-[24px] shadow-2xl flex flex-col gap-4 max-w-[95vw] w-[390px] max-h-[92vh] border border-neutral-200/60 dark:border-neutral-800/80 animate-in zoom-in-95 duration-200 text-left">
            {/* Header */}
            <div className="flex justify-between items-center pb-2.5 border-b border-neutral-100 dark:border-neutral-800/80 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-50 dark:bg-emerald-950/40 rounded-full flex items-center justify-center text-[#2F7E41] dark:text-emerald-400 shrink-0">
                  <Flame className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                    {language === 'en' ? 'Daily Nutrient Guide' : 'Tägliche Nährwert-Ziele'}
                  </h3>
                  <p className="text-[10px] text-neutral-400 font-semibold tracking-wider uppercase">
                    {language === 'en' ? 'Based on your profile' : 'Auf Basis Ihres Profils'}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => { triggerHaptic(); setShowCalorieDetail(false); }}
                className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 flex items-center justify-center text-neutral-500 dark:text-neutral-400 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable content wrapper */}
            <div className="flex-1 overflow-y-auto pr-1.5 space-y-4 no-scrollbar">

            {/* Metrics brief */}
            <div className="bg-[#F7FBF6] dark:bg-neutral-900/60 p-4 rounded-2xl space-y-1 text-[13px] border border-[#EAF3EB] dark:border-neutral-800/50">
              <div className="flex justify-between text-neutral-500 dark:text-neutral-400 font-medium">
                <span>{language === 'en' ? 'Daily Budget' : 'Tagesbedarf'}:</span>
                <span className="font-bold text-neutral-900 dark:text-neutral-100">{getDailyCalorieTarget().toLocaleString()} kcal</span>
              </div>
              <div className="text-[11px] text-neutral-400 dark:text-neutral-500 leading-relaxed pt-1.5 border-t border-neutral-100 dark:border-neutral-800/40 mt-1.5 text-left">
                {language === 'en' 
                  ? `Optimised for: ${userProfile.sex === 'Male' ? 'Male' : 'Female'}, ${userProfile.age} yrs, ${userProfile.weight}kg, ${userProfile.height}cm (${userProfile.activityLevel === 'Active' ? 'Active' : userProfile.activityLevel}) with "${(userProfile.dietaryPreferences || [userProfile.dietaryPreference || 'None']).filter(p => p !== 'None').join(' & ') || 'Balanced'}" dietary preference.`
                  : `Optimiert für: ${userProfile.sex === 'Male' ? 'Mann' : 'Frau'}, ${userProfile.age} J., ${userProfile.weight}kg, ${userProfile.height}cm (${userProfile.activityLevel === 'Active' ? 'Aktiv' : userProfile.activityLevel}) mit Präferenz „${(userProfile.dietaryPreferences || [userProfile.dietaryPreference || 'None']).filter(p => p !== 'None').map(p => p === 'High Protein' ? 'Viel Eiweiß' : p === 'Low Carb' ? 'Wenig Kohlenhydrate' : p === 'Vegetarian' ? 'Vegetarisch' : p === 'Vegan' ? 'Vegan' : p).join(' & ') || 'Ausgewogen'}“.`}
              </div>
            </div>

            {/* Macros target */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase">
                {language === 'en' ? 'Macronutrient Split' : 'Makronährstoff-Aufteilung'}
              </h4>
              <div className="space-y-3">
                {getNutritionBreakdown().nutrients_per_100.map(macro => (
                  <div key={macro.name} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-neutral-800 dark:text-neutral-200 leading-none">
                      <span className="text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${macro.color.split(' ')[0]}`} />
                        {macro.name}
                      </span>
                      <div className="flex gap-1.5 items-baseline">
                        <span className="font-bold text-neutral-900 dark:text-neutral-100">{macro.grams}g</span>
                        {macro.pct && <span className="text-[10px] text-neutral-400 font-normal">({macro.pct}%)</span>}
                      </div>
                    </div>
                    {macro.pct && (
                      <div className="h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${macro.color.split(' ')[0]}`}
                          style={{ width: `${macro.pct}%` }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Micros target */}
            <div className="space-y-2.5 pt-1">
              <h4 className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase">
                {language === 'en' ? 'Recommended Micronutrients' : 'Empfohlene Mikronährstoffe'}
              </h4>
              <div className="grid grid-cols-1 gap-2.5 max-h-[320px] overflow-y-auto pr-1 no-scrollbar">
                {MICRONUTRIENTS_LIST.map(micro => {
                  const currentVal = getAccumulatedMicros[micro.id] || 0;
                  const targetVal = getMicroTargetValue(micro.id);
                  const unit = getMicroUnit(micro.id);
                  const pct = Math.min(100, Math.round((currentVal / targetVal) * 100));
                  
                  return (
                    <div key={micro.id} className="space-y-1.5 p-2.5 rounded-xl bg-neutral-50/50 dark:bg-neutral-900/30 border border-neutral-100 dark:border-neutral-800/40">
                      <div className="flex justify-between items-start text-left">
                        <div className="min-w-0 pr-2">
                          <p className="text-[11px] font-bold text-neutral-800 dark:text-neutral-200 leading-none">
                            {language === 'en' ? micro.nameEn : micro.nameDe}
                          </p>
                          <p className="text-[9px] text-neutral-400 dark:text-neutral-500 mt-1 leading-normal">
                            {language === 'en' ? micro.descEn : micro.descDe}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-[11px] font-bold text-neutral-950 dark:text-neutral-50 font-mono leading-none">
                            {currentVal > 0 ? `${currentVal.toFixed(1).replace(/\.0$/, '')} / ` : ''}{targetVal} {unit}
                          </p>
                          <p className="text-[9px] text-[#2F7E41] dark:text-emerald-400 font-extrabold mt-1 leading-none">
                            {pct}%
                          </p>
                        </div>
                      </div>
                      
                      <div className="h-1 bg-neutral-100 dark:bg-neutral-800/80 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#519D46] dark:bg-emerald-500 rounded-full transition-all duration-300"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            </div>

            {/* Action button */}
            <button
              onClick={() => { triggerHaptic(); setShowCalorieDetail(false); }}
              className="w-full bg-[#519D46] hover:bg-[#438739] text-white py-3 rounded-xl font-bold text-xs transition-colors mt-1 cursor-pointer text-center shrink-0"
            >
              {language === 'en' ? 'Got it!' : 'Verstanden!'}
            </button>
          </div>
        </div>
      )}
</div>
    </div>
  );
}
