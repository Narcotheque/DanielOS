/* DanielOS Messenger Typing Effect */

// Find all FAQ question radio buttons
const questions = document.querySelectorAll('.chat-faq input[name="question"]');

// Remember the current animation
let typingTimer;
let replyDelay;

// Store each reply's original text
document.querySelectorAll(".bot-reply").forEach((reply) => {
  reply.dataset.fullText = reply.textContent.replace(/\s+/g, " ").trim();
});

// Listen for question selections
questions.forEach((question) => {
  question.addEventListener("change", () => {
    // Stop previous animations
    clearInterval(typingTimer);
    clearTimeout(replyDelay);

    // Find the selected conversation
    const number = question.id.replace("q", "");

    const answer = document.querySelector(`.chat-faq .answer-${number}`);

    if (!answer) return;

    const reply = answer.querySelector(".bot-reply");
    const indicator = answer.querySelector(".typing-indicator");

    if (!reply || !indicator) return;

    const fullText = reply.dataset.fullText;

    // Hide the answer initially
    reply.textContent = "";
    reply.hidden = true;

    // Show the typing indicator
    indicator.hidden = false;

    // Wait one second
    replyDelay = setTimeout(() => {
      indicator.hidden = true;
      reply.hidden = false;

      let index = 0;

      // Reveal one character at a time
      typingTimer = setInterval(() => {
        index++;

        reply.textContent = fullText.slice(0, index);

        if (index >= fullText.length) {
          clearInterval(typingTimer);
        }
      }, 20);
    }, 1000);
  });
});
