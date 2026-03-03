export function hasSizes(product) {
  return product.category === "Пицца";
}

export function getUnit(product) {
  if (product.category === "Пицца") return "г";
  if (product.category === "Напитки") return "л";
  return "";
}

export function calcPrice(basePrice, size) {
  if (size === "m") return +(basePrice * 1.5).toFixed(2);
  if (size === "l") return +(basePrice * 1.8).toFixed(2);
  return basePrice;
}

export function calcWeight(baseWeight, size) {
  if (size === "m") return Math.round(baseWeight * 1.5);
  if (size === "l") return Math.round(baseWeight * 1.8);
  return baseWeight;
}

export function buildCartItem(product, size) {
  const basePrice = Number(product.price);
  const baseWeight = Number(product.weight);

  const finalPrice = calcPrice(basePrice, size);
  const finalWeight = calcWeight(baseWeight, size);

  return {
    ...product,
    ...(size ? { size } : {}),
    price: finalPrice,
    weight: finalWeight
  };
}
