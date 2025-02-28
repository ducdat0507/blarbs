document.addEventListener("DOMContentLoaded", () => {
    let toc = document.querySelector("#toc");
    let hierarchy = [{
        rank: 1,
        list: toc,
    }];
    let content = document.querySelector("#blarb-content");
    let elms = [...content.querySelectorAll("h2, h3, h4, h5, h6")];
    for (let elm of elms) {
        let rank = +elm.tagName.substring(1);
        while (hierarchy[hierarchy.length - 1]?.rank >= rank) {
            hierarchy.pop();
        }

        let item = document.createElement("li");
        let link = document.createElement("a");
        link.classList.add("button");
        link.innerHTML = elm.innerHTML;
        link.href = "#" + elm.id;
        item.append(link);
        
        let last = hierarchy[hierarchy.length - 1];
        if (!last.list) {
            let list = document.createElement("ul");
            last.item.append(list);
            last.list = list;
        }
        last.list.append(item);

        hierarchy.push({ rank, item });
    }

    document.querySelector(".content").scrollLeft = document.querySelector(".content").scrollWidth;
    document.querySelector("#to-nav").onclick = (e) => {
        e.preventDefault();
        document.querySelector(".content").scrollTo({left: 0, behavior: "smooth"});
    }
    document.querySelector("#to-main").onclick = (e) => {
        e.preventDefault();
        document.querySelector(".content").scrollTo({left: document.querySelector(".content").scrollWidth, behavior: "smooth"});
    }
})