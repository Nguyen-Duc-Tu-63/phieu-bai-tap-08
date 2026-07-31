function lineTotal(p){
    return p.price * p.qty;
}

function inventoryValue(list){
    return list.reduce((sum,p) => sum + lineTotal(p),0);
}

function stockLevel(qty){
    if (qty>=5) return "Du";
    if (qty>=2) return "Sap het";
    return "Can nhap";
}


function findProductBySku(list, sku){
    return list.find((p) => p.sku === sku);
}

function countByCategory(list, categoryId){
    return list.filter((p) => p.category_id === categoryId).length;
}

function updateStats(){
    const el = document.querySelector("#stats");
    if (!el) return;
    const total = inventoryValue(products);
    el.textContent = 
    `So san pham = ${products.length}\nTong gia tri kho = ${total}`;
}
updateStats();

categories.forEach((cat) => {
    const subset = products.filter((p) => p.category_id === cat.id);
    console.log(cat.name, subset.length, inventoryValue(subset));
});

console.log(inventoryValue(products));
console.log(stockLevel(10), stockLevel(3), stockLevel(1));

function attachStockBadges(){
    document.querySelectorAll(".cm-card").forEach((card) => {
        const p = findProductBySku(products, card.dataset.sku);
        if(!p) return;
        const badge = document.createElement("p");
        badge.className = "cm-stock";
        badge.textContent = stockLevel(p.qty);
        card.appendChild(badge);
    });
}

attachStockBadges();

products.forEach((p) => {
  const card = document.querySelector(`.cm-card[data-sku="${p.sku}"]`);
  const badge = card?.querySelector(".cm-stock")?.textContent;
  console.log(p.sku, badge, badge === stockLevel(p.qty) ? "OK" : "FAIL");
});

function categoryName(id){
    const c = categories.find((c) => c.id === id);
    return c ? c.name : "?";
}

function render(list){
    const grid = document.querySelector('[data-testid="cm-product-table"]');
    grid.innerHTML = "";

    for (const p of list){
        const card = document.createElement("article");
        card.className = "cm-card";
        card.dataset.testid = "cm-product-rơw";
        card.dataset.sku = p.sku;

        const h3 = document.createElement("h3");
        h3.textContent = p.name;

        const cat = document.createElement("p");
        cat.className = "cm-card-cat";
        cat.textContent = categoryName(p.category_id);

        const price = document.createElement("p");
        price.className = "cm-card-price";
        price.textContent = String(p.price);

        const stock = document.createElement("p");
        stock.className = "cm-stock";
        stock.textContent = stockLevel(p.qty);

        card.append(h3, cat, price, stock);
        grid.appendChild(card);
    }
    const countEl = document.querySelector('[data-testid="cm-visible-count"]');
    if(countEl) countEl.textContent = `Hien thi = ${list.length} san pham`;

    const t = document.querySelector('[data-testid="cm-visible-count"]').textContent;
    const n = document.querySelectorAll(".cm-card").length;
    t === `Hien thi: ${n} san pham`
}
render(products);


let currentList = products;
const select = document.querySelector('[data-testid="cm-filter-category"]');

select.addEventListener("change", () => {
    const v = select.value;
    // currentList = 
    //  v === "all"
    //     ? products
    //     : products.filter((p) => p.category_id === Number(v));
    if(v==="all") currentList = products;
    else currentList = products.filter((p) => p.category_id === Number(v));
    render(currentList);
});

document.querySelector("#sort-price").addEventListener("click", () => {
    const sorted = [...currentList].sort((a,b) => a.price - b.price);
    render(sorted);
});

const grid = document.querySelector('[data-testid="cm-product-table"]');
grid.addEventListener("click", (e) => {
    const card = e.target.closest(".cm-card");
    if(!card) return;
    console.log("Ban vua bam card:", card.dataset.sku);
});