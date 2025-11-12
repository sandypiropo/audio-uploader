// ======= SELETORES =======
const dropZone = document.getElementById("dropZone");
const audioInput = document.getElementById("audioFile");
const fileName = document.getElementById("fileName");
const progressContainer = document.getElementById("progressContainer");
const progressBar = document.getElementById("progressBar");
const uploadLabel = document.getElementById("uploadLabel");
const uploadSuccess = document.getElementById("uploadSuccess");
const uploadedFileName = document.getElementById("uploadedFileName");
const dragText = document.querySelector(".drag-text");
const reloadContainer = document.getElementById("reloadContainer");

audioInput.addEventListener("change", handleFileSelect);

dropZone.addEventListener("dragover", e => {
    e.preventDefault();
    dropZone.classList.add("dragover");
});

dropZone.addEventListener("dragleave", () => dropZone.classList.remove("dragover"));

dropZone.addEventListener("drop", e => {
    e.preventDefault();
    dropZone.classList.remove("dragover");
    if (e.dataTransfer.files.length) {
        audioInput.files = e.dataTransfer.files;
        handleFileSelect();
    }
});

function handleFileSelect() {
    const file = audioInput.files[0];
    if (!file) return;
    fileName.style.display = "block";
    fileName.textContent = file.name;
    startUpload(file);
}

function startUpload(file) {
    uploadLabel.style.display = "none";
    dragText.style.display = "none";
    progressContainer.style.display = "block";

    const formData = new FormData();
    formData.append("audio", file);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/upload", true);

    xhr.upload.onprogress = e => {
        if (e.lengthComputable) {
            const percent = Math.round((e.loaded / e.total) * 100);
            progressBar.style.width = percent + "%";
        }
    };

    xhr.onload = () => {
        progressBar.style.width = "100%";

        // Simula retorno de servidor
        const data = { url: URL.createObjectURL(file) };

        setTimeout(() => {
            progressContainer.style.display = "none";
            fileName.style.display = "none";
            uploadSuccess.style.display = "flex";
            uploadedFileName.textContent = "Upload completo — " + file.name;
            reloadContainer.style.display = "block";

            const html = `<audio controls>
  <source src="${data.url}" type="audio/mpeg">
  Seu navegador não suporta o elemento de áudio.
</audio>`;

            const codeElem = document.getElementById("htmlCode");

            codeElem.innerHTML = hljs.highlight(html, { language: 'html' }).value;

            document.getElementById("codeContainer").style.display = "block";
            document.getElementById("codeTitle").style.display = "block";

            const audioPreview = document.getElementById("audioPreview");
            const audioTitle = document.getElementById("audioTitle");

            audioPreview.innerHTML = `<audio controls>
  <source src="${data.url}" type="audio/mpeg">
  Seu navegador não suporta o elemento de áudio.
</audio>`;

            audioPreview.style.display = "block";
            audioTitle.style.display = "block";
        }, 800);
    };

    xhr.onerror = () => alert("Erro no upload.");
    xhr.send(formData);
}

function copyCode() {
    const code = document.getElementById("htmlCode").textContent;
    const icon = document.getElementById("copyIcon");

    navigator.clipboard.writeText(code).then(() => {
        icon.src = "https://img.icons8.com/?size=100&id=3061&format=png&color=ff6200";
        icon.title = "Copiado!";
        setTimeout(() => {
            icon.src = "https://img.icons8.com/?size=100&id=cvB6JC7HJn9v&format=png&color=ff6200";
            icon.title = "Copiar código";
        }, 2000);
    });
}

function goBack() {
    window.location.reload();
}

const toggleSwitch = document.getElementById('toggle');

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
    toggleSwitch.checked = true;
}

toggleSwitch.addEventListener('change', () => {
    const isDark = toggleSwitch.checked;
    document.body.classList.toggle('dark-theme', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

const instrucoesBtn = document.querySelector(".instrucoes");
const modal = document.getElementById("instructionModal");
const closeModal = document.getElementById("closeModal");

// Abre o modal
instrucoesBtn.addEventListener("click", () => {
    modal.style.display = "flex";
});

// Fecha o modal ao clicar no X
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

// Fecha o modal ao clicar fora dele
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});
