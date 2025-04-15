document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ client.js loaded!");

  const minecraftForm = document.getElementById("minecraftForm");
  const minecraftResponseEl = document.getElementById("minecraftResponse");

  if (!minecraftForm) {
    console.warn("⚠️ Form not found!");
    return;
  }

  minecraftForm.onsubmit = async function (event) {
    event.preventDefault();
    console.log("📬 Form submitted");

    const area = document.getElementById("minecraftdb").value;
    const pageName = document.getElementById("pageName").value;
    const header = document.getElementById("header").value;

    const body = JSON.stringify({ area, pageName, header });

    try {
      const response = await fetch("/submit-area", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });

      const result = await response.json();
      console.log("✅ Response:", result);

      if (minecraftResponseEl) {
        minecraftResponseEl.innerHTML = `<p>✅ ${result.message}</p>`;
      }
    } catch (err) {
      console.error("❌ Error:", err);
      if (minecraftResponseEl) {
        minecraftResponseEl.innerHTML = `<p style="color:red;">Failed to update. Check the console for details.</p>`;
      }
    }
  };
});
