const dropZone = document.getElementById("dropZone");
const audioInput = document.getElementById("audioFile");
const fileName = document.getElementById("fileName");
const progressContainer = document.getElementById("progressContainer");
const progressBar = document.getElementById("progressBar");
const uploadLabel = document.getElementById("uploadLabel");
const uploadSuccess = document.getElementById("uploadSuccess");
const uploadedFileName = document.getElementById("uploadedFileName");
const dragText = document.querySelector(".drag-text");

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
        const data = JSON.parse(xhr.responseText);
        setTimeout(() => {
            progressContainer.style.display = "none";
            uploadSuccess.style.display = "flex";
            uploadedFileName.textContent = "Upload completo — " + file.name;

            document.getElementById("audioPreview").innerHTML = `
        <h4>Preview do Áudio:</h4>
        <audio controls>
          <source src="${data.url}" type="audio/mpeg">
          Seu navegador não suporta o elemento de áudio.
        </audio>`;

            const html = `<audio controls>
  <source src="${data.url}" type="audio/mpeg">
  Seu navegador não suporta o elemento de áudio.
</audio>`;

            document.getElementById("htmlCode").textContent = html;
            document.getElementById("codeTitle").style.display = "block";
            document.getElementById("htmlCode").style.display = "block";
            document.getElementById("copyBtn").style.display = "inline-block";
        }, 800);
    };

    xhr.onerror = () => alert("Erro no upload.");
    xhr.send(formData);
}

function copyCode() {
    const code = document.getElementById("htmlCode").textContent;
    navigator.clipboard.writeText(code).then(() => alert("Código copiado!"));
}

function goBack() {
    window.location.reload();
}
