const API_URL = "http://0.0.0.0:8001";  // Replace with your actual ngrok URL

async function uploadImage() {
    let imageInput = document.getElementById("imageInput");
    let file = imageInput.files[0];

    if (!file) {
        alert("Please select an image first.");
        return;
    }

    document.getElementById("status").innerText = "Processing...";

    // Show image preview
    let reader = new FileReader();
    reader.onload = function (e) {
        let preview = document.getElementById("preview");
        preview.src = e.target.result;
        preview.style.display = "block";
    };
    reader.readAsDataURL(file);

    let formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch(`${API_URL}/upload/`, {
            method: "POST",
            body: formData
        });

        const result = await response.json();
        console.log("API Response:", result);

        // Apply color dynamically
        document.getElementById("output").innerHTML = `
            <b style="color: black;">Emotion:</b> 
            <span style="color: ${result.color}; font-weight: bold;">
                ${result.emotion} (${result.percentage}%) ${result.emoji}
            </span><br>
            <b style="color: black;">Intensity:</b> 
            <span style="color: ${result.color}; font-weight: bold;">${result.intensity}</span><br>
            ${result.context}
        `;

        document.getElementById("status").innerText = "Emotion detected successfully!";
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("status").innerText = "Error detecting emotion.";
    }
}