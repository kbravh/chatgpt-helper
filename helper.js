// Add a file upload button to the ChatGPT interface
function addFileUploadButton() {
  // Check if file upload button already exists
  if(document.querySelector("#fileUploadButton")) {
    return;
  }

  // Get the text area and add padding to the left to make room for the button
  const chatGPTInput = document.querySelector("textarea");
  chatGPTInput.style.paddingLeft = "1.25rem";

  // Create the file upload button
  const fileUploadButton = document.createElement("button");
  fileUploadButton.id = "fileUploadButton";
  fileUploadButton.style.position = "absolute";
  fileUploadButton.style.left = ".625rem";
  fileUploadButton.style.bottom = ".625rem";
  fileUploadButton.style.color = "rgb(142, 142, 160)";
  fileUploadButton.style.padding = ".25rem";
  fileUploadButton.type = "button";

  // Create an SVG icon for the button
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("width", "16px");
  svg.setAttribute("height", "16px");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"
  );
  path.setAttribute("stroke", "currentColor");
  path.setAttribute("stroke-width", "2");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");
  svg.appendChild(path);
  fileUploadButton.appendChild(svg);

  // Create an input element for selecting files and add it to the file upload button
  const input = document.createElement("input");
  input.type = "file";
  input.multiple = true;
  input.style.display = "none";
  input.addEventListener("change", async () => {
    // Read the contents of each selected file and add them to the text area
    const files = input.files;
    const fileContents = [];
    for(const file of files) {
      const text = await file.text();
      const header = `[File: ${file.name}]`;
      fileContents.push(`${header}\n\n${text}`);
    }
    chatGPTInput.value += `${chatGPTInput.value ? "\n" : ""}${fileContents.join(
      "\n\n"
    )}`;
    // Dispatch an "input" event to trigger a React state update and adjust the height
    chatGPTInput.dispatchEvent(new Event("input", { bubbles: true }));
    // Return focus to the textarea so that we can hit Enter to submit
    chatGPTInput.focus();
  });
  fileUploadButton.addEventListener("click", () => {
    // Trigger a click event on the input element to open the file dialog
    input.click();
  });

  // Add the file upload button to the ChatGPT interface
  chatGPTInput.insertAdjacentElement('afterend', fileUploadButton);
}

setInterval(addFileUploadButton, 1000); // Check for new textareas every second.
