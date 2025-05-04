export async function copy(text) {
  try {
    console.log(text);
    await navigator.clipboard.writeText(text);
    console.log("Copied to clipboard:", text);
  } catch (err) {
    console.log(test);
    console.error("Failed to copy:", err);
  }
}

export async function paste() {
  console.log(text);
  try {
    const text = await navigator.clipboard.readText();
    return text;
  } catch (err) {
    console.error("Failed to paste:", err);
  }
}
