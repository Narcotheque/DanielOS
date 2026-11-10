const symbols = [
  "₊",
  "˚",
  "⊹",
  "⋆",
  "˙",
  "✩",
  " ۫ ",
  "˚",
  " ׅ ",
  "⟡",
  ".",
  "𖥔",
  "⊹",
  "˖",
  "࣪",
  "｡",
];

let symbolIndex = 0;

document.addEventListener("mousemove", function (event) {
  const sparkle = document.createElement("span");

  sparkle.textContent = symbols[symbolIndex];
  sparkle.className = "sparkle";

  symbolIndex = (symbolIndex + 1) % symbols.length;

  sparkle.style.left = event.clientX + "px";
  sparkle.style.top = event.clientY + "px";

  sparkle.style.setProperty("--spread", Math.random() * 240 - 120 + "px");
  sparkle.style.setProperty("--rotation", Math.random() * 360 - 180 + "deg");

  document.body.appendChild(sparkle);

  setTimeout(function () {
    sparkle.remove();
  }, 3000);
});
