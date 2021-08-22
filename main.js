let li = document.querySelectorAll("#list li")
let list = document.querySelector("#list")
let li_after = document.querySelectorAll("#list li:after")
let lsArray = []
let ls = localStorage.getItem("li")


const localStrogeFill = () => {
    if (ls) {
        list.innerHTML = ""
        lsArray = JSON.parse(ls)
        lsArray.forEach(item => {
                let isCheck
                item.isActive ? isCheck = "checked" : isCheck = ""
                list.innerHTML += `<li class="${isCheck}"><p>${item.text}</p><span>✖</span></li>`
        })
        li = document.querySelectorAll("#list li")
    }
}

const liClick = () => {
    li = document.querySelectorAll("#list li")
    for (let i = 0; i < li.length; i++) {
            li[i].querySelector("span").addEventListener("click", () => {
                lsArray[i] = null
                lsArray = lsArray.filter(e => e != null)
                li[i].classList.add("d-none")
                localStorage.setItem("li", JSON.stringify(lsArray))
            })
            li[i].querySelector("p").addEventListener("click", () => {
                liClass = li[i].classList.toString()
                if (liClass.includes("checked")) {
                    li[i].classList.remove("checked")
                    lsArray[i].isActive = false
                } else {
                    li[i].classList.add("checked")
                    lsArray[i].isActive = true
                }
                localStorage.setItem("li", JSON.stringify(lsArray))
            })
     
    }
    // for (let i = 0; i < li.length; i++) {
    //     li[i].after.addEventListener("click", () => {
    //         lsArray[i].remove()
    //     })
    // }
}
const newElement = () => {
    let getText = document.querySelector("#task").value
    if (!getText) {
        $('#Toast-Error').toast('show')
    } else {
        $('#Toast-Success').toast('show')
        let radioBtn = document.querySelectorAll(".radio-area input:checked")
        if (radioBtn[0].value == "first") {
            lsArray.unshift({
                text: getText,
                isActive: false
            })
            list.innerHTML = `<li><p>${getText}</p><span>✖</span></li>` + list.innerHTML
        } else {
            lsArray.push({
                text: getText,
                isActive: false
            })
            list.innerHTML += `<li><p>${getText}</p><span>✖</span></li>`
        }
        localStorage.setItem("li", JSON.stringify(lsArray))
        liClick()
    }
}

document.querySelector("#clearBtn").addEventListener("click", () =>{
    localStorage.clear()
    list.innerHTML = ""
    $('#Toast-Clear').toast('show')
})


//Page Load
localStrogeFill()
liClick()