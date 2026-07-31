
import { categories, products } from "./data.js";
import { lineTotal, inventoryValue, stockLevel, findProductBySku, countByCategory } from "./helpers.js";

function renderStats(){
    const el = document.querySelector("#stats");
    if(!el) return;
    const total = inventoryValue(products);
    el.textContent = `So san pham = ${products.length}\n Tong gia tri kho = ${total}`;
}
renderStats();


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


function applyFilter(v){
    if(v==="all") currentList = products;
    else currentList = products.filter((p) => p.category_id === Number(v));
    render(currentList);
}

if(select){
    select.addEventListener("change", (e) => {
        const v = select.value;
        localStorage.setItem("cm_filter", v);
        applyFilter(v);
    });
}

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

const saved = localStorage.getItem("cm_filter") ?? "all";
select.value = saved;
applyFilter(saved);