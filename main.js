let li = document.querySelectorAll("#list li")
let list = document.querySelector("#list")
let lsArray = []
let ls = localStorage.getItem("li")


const localStrogeFill = () => {
    if (ls) {
        list.innerHTML = ""
        lsArray = JSON.parse(ls)
        lsArray.forEach(item => {
            let isCheck
            item.isActive ? isCheck = "checked" : isCheck = ""
            list.innerHTML += `<li class="${isCheck}">${item.text}</li>`
        })
        li = document.querySelectorAll("#list li")
    }
}

const liClick = () => {
    li = document.querySelectorAll("#list li")
    for (let i = 0; i < li.length; i++) {
        li[i].addEventListener("click", () => {
            liClass = li[i].classList.toString()
            if(liClass.includes("checked")){
                li[i].classList.remove("checked")
                lsArray[i].isActive = false
            }
            else{
                li[i].classList.add("checked")
                lsArray[i].isActive = true
            }
            localStorage.setItem("li", JSON.stringify(lsArray))
        })
    }
}

const newElement = () => {
    let getText = document.querySelector("#task").value

    if (!getText) {
        alert("Lütfen bir To-Do giriniz!")
    } else {
        let radioBtn = document.querySelectorAll(".radio-area input:checked")
        if (radioBtn[0].value == "first") {
            lsArray.unshift({text: getText, isActive: false})
            list.innerHTML = `<li>${getText}</li>` + list.innerHTML
        } else {
            lsArray.push({text: getText, isActive: false})
            list.innerHTML += `<li>${getText}</li>`
        }
        localStorage.setItem("li", JSON.stringify(lsArray))
        liClick()
    }
}

//Page Load
localStrogeFill()
liClick()