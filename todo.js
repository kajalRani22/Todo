let formRef = document.form;
let buttonRef = formRef.button;
let inputRef = formRef.taskInput;
//add task
function add(task) {
  let ul = document.querySelector("ul");
  let li = `<li>
     <input class="form-check-input ms-4" type="checkbox">
     <p>${task} </p>
     <i class="bi bi-pencil-square" data-toggle = "modal" data-target="#Modal"></i>
     <i class="bi bi-trash ms-4" id = "trash"></i>
    </li>`;
  ul.innerHTML += li;
}
buttonRef.addEventListener("click", (eventobj) => {
  eventobj.preventDefault(); //prevent default submit feature of form kuki server nahi h
  let newTaskValue = inputRef.value;
  if (newTaskValue.length > 0) {
    add(newTaskValue);
  } else {
    Swal.fire({
      icon: "error",
      title: "Something went wrong",
      text: "input required!",
    });
  }
  inputRef.value = "";
});

//edit task
let editRef = document.querySelector("ul");

editRef.addEventListener("click", (obj) => {
  let modalInputRef = document.inputForm;
  let inputAdd = modalInputRef.modalInput;

  if (obj.target.getAttribute("id") === "trash") {
    //remove task
    obj.target.parentNode.remove();
  }
  else if (obj.target.getAttribute("type") === "checkbox") {
    if (obj.target.getAttribute("checked") === null) {
      obj.target.setAttribute("checked", true);
    } else {
      obj.target.removeAttribute("checked");
    }
  }

  else if (obj.target.nodeName === "I") {
    inputAdd.setAttribute("value", obj.target.previousElementSibling.innerText);

    let saveRef = document.querySelector(".modal-footer");
    let savref = saveRef.querySelector("#save");
    savref.addEventListener("click", (eventobj) => {
      if (inputAdd.value.length > 0) {
        obj.target.previousElementSibling.innerText = inputAdd.value;

        savref.setAttribute("data-dismiss", "modal");
      } else {
        Swal.fire({
          icon: "error",
          title: "Something went wrong",
          text: "input required!",
        });
      }
      inputAdd.value = obj.target.previousElementSibling.innerText;
    });
    inputAdd.value = obj.target.previousElementSibling.innerText;
  }
});
//search
function search(task) {
  let lisitem = document.querySelectorAll("li");

  for (let item of lisitem) {
    if (
      item.firstElementChild.nextElementSibling.innerText
        .toLowerCase()
        .indexOf(task) === -1
    ) {
      item.style.display = "none";
    }
  }
  inputRef.addEventListener("keyup", (obj) => {
    if (inputRef.value === "") {
      for (let item of lisitem) {
        item.style.display = "block";
      }
    }
  });
}

let searchRef = formRef.search;
searchRef.addEventListener("click", (eventobj) => {
  eventobj.preventDefault();
  search(inputRef.value.toLowerCase());
});
//for date
let heading = document.querySelector("h1");
let obj = new Date();
console.log(obj);
heading.innerText = obj.toDateString();
