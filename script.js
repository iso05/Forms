const saveButton = document.getElementById("saveBtn");
const closeButton = document.getElementById("closeBtn");
const correspondentSelect = document.getElementById("correspondent"); // ← id="correspondent" 
const regnum = document.getElementById("regNumber");
const datareg = document.getElementById("regDate");
const outnum = document.getElementById("outgoingNumber");
const outdata = document.getElementById("outgoingDate");
const theme = document.getElementById("temaInput");
const typedoc = document.getElementById("documentType");
const formDel = document.getElementById("deliveryForm");
const commentArea = document.getElementById("opisanieTextarea");
const client = document.getElementById("komuSelect");
const access = document.getElementById("publicAccess");
const deadLine = document.getElementById("deadline");
const exeCutor = document.getElementById("executor")
const phoneExecutor = document.getElementById("executorPhone");
const internalPhon = document.getElementById("internalPhone");
const docOutgoing = document.getElementById("outgoingDoc");
const requiredFields = [
  "correspondent",
  "regNumber",
  "regDate",
  "deliveryForm",
  "outgoingNumber",
  "outgoingDate",
  "opisanieTextarea",
  "komuSelect",
  "executor",
  "executorPhone"
];
let notifications = document.querySelector('.notifications');




window.addEventListener("load", () => {
  const editedIndex = localStorage.getItem("editedIndex");
  if (editedIndex !== null) {
    const users = JSON.parse(localStorage.getItem("savedUsers")) || [];
    const user = users[editedIndex];
    if (user) {
      datareg.value = user.dataregs;
      regnum.value = user.regsNum;
      outnum.value = user.outnumb;
      outdata.value = user.outData;
      correspondentSelect.value = user.correspondent;
      theme.value = user.themee;
      typedoc.value = user.tipdoc;
      formDel.value = user.deliveryForm;
      commentArea.value = user.comment;
      client.value = user.clientt;
      access.value = user.Acess;
      deadLine.value = user.Deadline;
      exeCutor.value = user.executor;
      phoneExecutor.value = user.phoneexecutor;
      internalPhon.value = user.inerphone;
      docOutgoing.value = user.outgoingdoc;
    }
  } else {
    // Yangi user rejimi
    datareg.value = "";
    regnum.value = "";
    outnum.value = "";
    outdata.value = "";
    correspondentSelect.value = "";
    theme.value = "";
    typedoc.value = "";
    formDel.value = "";
    commentArea.value = "";
    client.value = "";
    access.value = "";
    deadLine.value = "";
    exeCutor.value = "";
    phoneExecutor.value = "";
    internalPhon.value = "";
    docOutgoing.value = "";
  }

  requiredFields.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      const eventType = el.tagName === "SELECT" || el.type === "date" ? "change" : "input";
      el.addEventListener(eventType, updateSaveBtnCounter);
    }
  });

  // ✅ 3. Endi hisoblash: inputlar to‘ldirilgandan keyin!
  updateSaveBtnCounter();
});

function validateField(id) {
  const el = document.getElementById(id);
  if (!el) return true; 
  const value = el.value.trim();
  let errorSpan = el.parentElement.querySelector(".error-message");

  if (!errorSpan) {
    errorSpan = document.createElement("span");
    errorSpan.classList.add("error-message");
    errorSpan.style.color = "red";
    errorSpan.style.fontSize = "12px";
    errorSpan.style.display = "block";
    el.parentElement.appendChild(errorSpan);
  }
  errorSpan.textContent = ""; 

  if (value === "") {
    errorSpan.textContent = "Bu maydon to‘ldirilishi shart!";
    return false;
  }
  if (id === "executorPhone") {
  const digitsOnly = value.replace(/\D/g, ""); // faqat raqamlarni olib qoladi
  if (digitsOnly.length < 9) {
    if (errorSpan) errorSpan.textContent = "Kamida 9 ta raqam bo‘lishi kerak!";
    return false;
  }
}
  return true;
}
function updateSaveBtnCounter() {
  let emptyCount = 0;
  for (const id of requiredFields) {
    const el = document.getElementById(id);
    if (el && el.value.trim() === "") {
      emptyCount++;
    }
  }
  const saveBtn = document.getElementById("saveBtn");
  if (saveBtn) {
    saveBtn.textContent = `Сохранить(*${emptyCount})`;
  }
}
function checkValidation() {
  let invalidCount = 0;
  for (const id of requiredFields) {
    if (!validateField(id)) {
      invalidCount++;
    }
  }
  updateSaveBtnCounter(); 
  return invalidCount;
}



function createToast(type, icon, title,){
        let newToast = document.createElement('div');
        newToast.innerHTML = `
            <div class="toast ${type}">
                <i class="${icon}"></i>
                <div class="content">
                    <div class="title">${title}</div>
                </div>
                <i class="fa-solid fa-xmark close-toast" onclick="(this.parentElement).remove()"></i>
            </div>`;
        notifications.appendChild(newToast);
        newToast.timeOut = setTimeout(() => {
        newToast.remove();
        window.location.href = "table.html";
        }, 5000);

         const closeBtn = newToast.querySelector('.close-toast');
    closeBtn.addEventListener('click', () => {
        clearTimeout(newToast.timeOut);  // vaqtinchalik o‘tishni to‘xtatamiz
        newToast.remove();                // toastni o‘chiramiz
    });

    }


saveButton.addEventListener("click", (e) => {
  e.preventDefault(); // Formaning default submitini to‘xtatamiz

  const invalidCount = checkValidation();

  if (invalidCount > 0) {
    updateSaveBtnCounter(); 
    return;
  }
  const editedIndex = localStorage.getItem("editedIndex");
  const users = JSON.parse(localStorage.getItem("savedUsers")) || [];

  const newUser = {
    dataregs: datareg.value,
    regsNum: regnum.value,
    outnumb: outnum.value,
    outData: outdata.value,
    correspondent: correspondentSelect.value,
    themee: theme.value,
    tipdoc: typedoc.value,
    deliveryForm: formDel.value,
    comment: commentArea.value,
    clientt: client.value,
    Acess: access.value,
    Deadline: deadLine.value,
    executor: exeCutor.value,
    phoneexecutor: phoneExecutor.value,
    inerphone: internalPhon.value,
    outgoingdoc: docOutgoing.value,
  };
  if (editedIndex !== null) {
    users[editedIndex] = newUser;
    let type = 'success';
        let icon = 'fa-solid fa-circle-check';
        let title = 'Обновлено';
        createToast(type, icon, title);

    localStorage.removeItem("editedIndex");
  } else {
    users.push(newUser);
    let type = 'success';
        let icon = 'fa-solid fa-circle-check';
        let title = 'Сохранено';
        let text = 'This is a success toast.';
        createToast(type, icon, title);
  }
  localStorage.setItem("savedUsers", JSON.stringify(users));
//   
});

closeButton.addEventListener("click", () => {
  window.location.href = "table.html";  
});



