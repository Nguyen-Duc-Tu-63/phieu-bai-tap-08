export function lineTotal(p){
    return p.price * p.qty;
}

export function inventoryValue(list){
    return list.reduce((sum,p) => sum + lineTotal(p),0);
}

export function stockLevel(qty){
    if (qty>=5) return "Du";
    if (qty>=2) return "Sap het";
    return "Can nhap";
}


export function findProductBySku(list, sku){
    return list.find((p) => p.sku === sku);
}

export function countByCategory(list, categoryId){
    return list.filter((p) => p.category_id === categoryId).length;
}
