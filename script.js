document.getElementById('scriptForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const prompt = document.getElementById('prompt').value.trim();
    const resultDiv = document.getElementById('result');
    const downloadLink = document.getElementById('downloadLink');
    resultDiv.textContent = "uh, o-okay... hehe... pensando no script pra você...";
    downloadLink.style.display = "none";

    if (prompt.toLowerCase().includes("blox fruits")) {
        resultDiv.textContent = "uh, o-okay... hehe... script de Blox Fruits é especial, baixe aqui:";
        downloadLink.href = "bloxfruits.txt";
        downloadLink.style.display = "block";
    } else {
        resultDiv.textContent = "uh, o-okay... hehe... só consigo baixar script de Blox Fruits aqui no site estático!";
        downloadLink.style.display = "none";
    }
});
