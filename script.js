document.getElementById('scriptForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const prompt = document.getElementById('prompt').value.trim();
    const resultDiv = document.getElementById('result');
    const downloadLink = document.getElementById('downloadLink');
    resultDiv.textContent = "uh, o-okay... hehe... pensando no script pra você...";
    downloadLink.style.display = "none";

    fetch('/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
    })
    .then(response => response.json())
    .then(data => {
        if (data.download_url) {
            resultDiv.textContent = data.message;
            downloadLink.href = data.download_url;
            downloadLink.style.display = "block";
        } else {
            resultDiv.textContent = data.result;
            downloadLink.style.display = "none";
        }
    })
    .catch(error => {
        resultDiv.textContent = "uh, houve um errinho... tenta de novo, okay? 😳";
        downloadLink.style.display = "none";
    });
});
