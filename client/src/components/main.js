
var check = 0
function search1(a) {
    if (check === 0) {
        a.style.color = 'black';
        var search = document.getElementById('search')
        search.style.width = '300px';
        search.style.paddingRight = '50px';
        search.style.paddingLeft = '10px';
        check = 1;
    } else {
        a.href = 'theloai_timphim.html'
    }


}
var a = -150;
function moMenu(tag_a) {
    a = -1 * a;
    document.documentElement.style.setProperty('--next', '' + a + 'px')
    i = tag_a.querySelectorAll('i');
    if (a === 150) {
        i[0].style.display = 'none';
        i[1].style.display = 'flex';
    } else {
        i[0].style.display = 'flex';
        i[1].style.display = 'none';
    }
}
function thong_bao(a) {
    Array.from(document.getElementsByClassName('tick')).forEach(element => {
        element.style.display = 'none';
    });
    a.querySelector('div').style.display = 'flex';
}

setTimeout(function () { document.getElementById('curtain').style.opacity = 0; }, 1000);
setTimeout(() => {
    document.getElementById('curtain').style.display = 'none';
}, 2000);

function minthongbao(a) {
    a = document.getElementById('ul_left').querySelector('a[href ="' + a.getAttribute('href') + '"]')
    Array.from(document.getElementsByClassName('tick')).forEach(element => {
        element.style.display = 'none';
    });
    a.querySelector('div').style.display = 'flex';
}

function suggestions(input) {
    var divParent = document.getElementById('search_list')
    divParent.style.display = 'block';
    input.addEventListener("keyup", function (event) {
        const chuoiCanTim = input.value;
        const viTri = linkList['name'].map((chuoi, index) => chuoi.toLocaleLowerCase().includes(chuoiCanTim.toLocaleLowerCase()) ? index : null).filter(viTri => viTri !== null);
        var a = divParent.querySelectorAll('a')
        for (var i = a.length - 1; i >= 0; i--) {
            divParent.removeChild(a[i]);
        }
        for (var i = 0; i < viTri.length; i++) {
            // Tạo các phần tử
            const aElement = document.createElement("a");
            const div1Element = document.createElement("div");
            const imgElement = document.createElement("img");
            const div2Element = document.createElement("div");
            const h4Element = document.createElement("h4");
            const div3Element = document.createElement("div");
            const p1Element = document.createElement("p");
            const p2Element = document.createElement("p");

            // Thiết lập thuộc tính và nội dung cho các phần tử
            aElement.href = "mtphim.html";
            aElement.target = "main";
            aElement.rel = "noopener noreferrer";
            imgElement.src = linkList['link_img'][viTri[i]];
            h4Element.textContent = linkList['name'][viTri[i]];
            p1Element.textContent = "" + linkList['lim'][viTri[i]] + " " + linkList['country'][viTri[i]] + "";
            p2Element.textContent = "" + linkList['time'][viTri[i]] + " | " + linkList['difinition'][viTri[i]] + "";

            // Gắn các phần tử vào nhau
            div2Element.appendChild(h4Element);
            div3Element.appendChild(p1Element);
            div3Element.appendChild(p2Element);
            div2Element.appendChild(div3Element)
            div1Element.appendChild(imgElement);
            div1Element.appendChild(div2Element);
            aElement.appendChild(div1Element);

            // Gắn phần tử a vào vị trí mong muốn trong tài liệu
            divParent.appendChild(aElement);

        }
    });
}
function offsugg() {
    setTimeout(() => {
        document.getElementById('search_list').style.display = 'none';
        document.getElementById('look').style.color = '#fff';
        var search = document.getElementById('search')
        search.style.width = '0px';
        search.style.paddingRight = '0px';
        search.style.paddingLeft = '0px';
        check = 0;
        a.href = 'javascript:null'
    }, 500)
}
