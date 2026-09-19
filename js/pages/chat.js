/**
 * DevPilot-AI - AI Coding Assistant Module
 */

let chatHistory = Storage.get('chat_history', [
  {
    role: 'ai',
    content: `Hello Aditya! 👋 I'm your **DevPilot-AI Coding Assistant**.

I can help you:
- 💡 **Debug** complex errors and race conditions
- ⚡ **Optimize** DSA algorithms for $O(N)$ time complexity
- 🏗️ **Architect** clean modular frontend & backend systems
- 📝 **Write** clean, fully-typed code with test suites

What are you building or solving today?`,
    codeSnippet: null
  }
]);

document.addEventListener('DOMContentLoaded', () => {
  renderMessages();
  initChatInputs();
  checkIncomingPrompt();
});

function renderMessages() {
  const container = document.getElementById('chat-messages-container');
  if (!container) return;

  container.innerHTML = chatHistory.map((msg, index) => {
    const isUser = msg.role === 'user';
    return `
      <div class="message-row ${isUser ? 'user' : 'ai'}">
        <div class="message-avatar ${isUser ? 'user-avatar' : 'ai-avatar'}">
          <span class="material-symbols-outlined text-[20px]">${isUser ? 'person' : 'smart_toy'}</span>
        </div>
        <div class="message-bubble">
          <div class="message-text">${formatMarkdown(msg.content)}</div>
          ${msg.codeSnippet ? renderCodeBlock(msg.codeSnippet, index) : ''}
        </div>
      </div>
    `;
  }).join('');

  scrollToBottom();
}

function renderCodeBlock(snippet, index) {
  return `
    <div class="code-block-wrapper mt-3">
      <div class="code-block-header">
        <div class="code-block-dots">
          <span class="code-dot code-dot-red"></span>
          <span class="code-dot code-dot-yellow"></span>
          <span class="code-dot code-dot-green"></span>
        </div>
        <span>${snippet.language || 'javascript'}</span>
        <button class="flex items-center gap-1 text-outline hover:text-white transition-colors" onclick="copyCodeFromChat(${index})">
          <span class="material-symbols-outlined text-[14px]">content_copy</span>
          <span>Copy</span>
        </button>
      </div>
      <pre class="code-content"><code>${escapeHtml(snippet.code)}</code></pre>
    </div>
  `;
}

window.copyCodeFromChat = function(index) {
  const msg = chatHistory[index];
  if (msg && msg.codeSnippet && msg.codeSnippet.code) {
    copyToClipboard(msg.codeSnippet.code, 'Code snippet copied to clipboard!');
  }
};

function scrollToBottom() {
  const container = document.getElementById('chat-messages-container');
  if (container) {
    container.scrollTop = container.scrollHeight;
  }
}

function initChatInputs() {
  const textarea = document.getElementById('chat-input');
  const sendBtn = document.getElementById('btn-send-chat');
  const clearBtn = document.getElementById('btn-clear-chat');
  const chips = document.querySelectorAll('.suggestion-chip');

  if (textarea) {
    // Auto resize
    textarea.addEventListener('input', () => {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    });

    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
  }

  if (sendBtn) {
    sendBtn.addEventListener('click', sendMessage);
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm('Clear chat history?')) {
        chatHistory = [{
          role: 'ai',
          content: 'Chat cleared! Ready for your next query.',
          codeSnippet: null
        }];
        Storage.set('chat_history', chatHistory);
        renderMessages();
        showToast('Chat history cleared', 'info');
      }
    });
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      if (textarea) {
        textarea.value = chip.getAttribute('data-prompt') || chip.textContent.trim();
        textarea.focus();
      }
    });
  });
}

function sendMessage() {
  const textarea = document.getElementById('chat-input');
  if (!textarea) return;

  const text = textarea.value.trim();
  if (!text) return;

  // Add User Message
  chatHistory.push({
    role: 'user',
    content: text,
    codeSnippet: null
  });

  textarea.value = '';
  textarea.style.height = 'auto';
  renderMessages();

  // Simulate AI Response with Typing Animation
  generateAiResponse(text);
}

function generateAiResponse(prompt) {
  const modelSelect = document.getElementById('chat-model-select');
  const selectedModel = modelSelect ? modelSelect.value : 'GPT-4o';

  // Add placeholder AI message
  const aiMsgIndex = chatHistory.length;
  chatHistory.push({
    role: 'ai',
    content: 'Thinking...',
    codeSnippet: null
  });
  renderMessages();

  setTimeout(() => {
    const response = getMockAiAnswer(prompt, selectedModel);
    chatHistory[aiMsgIndex] = response;
    Storage.set('chat_history', chatHistory);
    renderMessages();
  }, 900);
}

function getMockAiAnswer(prompt, model) {
  const lower = prompt.toLowerCase();

  if (lower.includes('sliding window') || lower.includes('subarray') || lower.includes('dsa')) {
    return {
      role: 'ai',
      content: `Here is an optimal **Sliding Window** solution in JavaScript. This algorithm runs in $O(N)$ time complexity and $O(1)$ auxiliary space.`,
      codeSnippet: {
        language: 'javascript',
        code: `// Maximum Sum Subarray of Size K
function maxSubarraySum(arr, k) {
  if (arr.length < k) return null;
  
  let maxSum = 0;
  let windowSum = 0;
  
  // Calculate sum of first window
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  maxSum = windowSum;
  
  // Slide the window across the array
  for (let i = k; i < arr.length; i++) {
    windowSum += arr[i] - arr[i - k];
    maxSum = Math.max(maxSum, windowSum);
  }
  
  return maxSum;
}

// Example usage:
const nums = [2, 1, 5, 1, 3, 2];
console.log(maxSubarraySum(nums, 3)); // Output: 9 (subarray [5, 1, 3])`
      }
    };
  } else if (lower.includes('hook') || lower.includes('react') || lower.includes('debounce')) {
    return {
      role: 'ai',
      content: `Here is a custom **useDebounce** hook in React TypeScript to prevent excessive API invocations on user input:`,
      codeSnippet: {
        language: 'typescript',
        code: `import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delayMs: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delayMs]);

  return debouncedValue;
}`
      }
    };
  } else {
    return {
      role: 'ai',
      content: `Analysis generated via **${model}**:

I have analyzed your request regarding *"**${prompt.slice(0, 60)}...**"*.

### Key Recommendations:
1. **Separation of Concerns**: Keep business logic decoupled from presentational views.
2. **Defensive Validation**: Sanitize inputs and handle boundary conditions gracefully.
3. **Performance**: Utilize cached memoization for expensive computations.

Feel free to ask for step-by-step code implementations or unit tests!`,
      codeSnippet: null
    };
  }
}

function checkIncomingPrompt() {
  let incoming = null;
  try {
    const urlParams = new URLSearchParams(window.location.search);
    incoming = urlParams.get('prompt');
  } catch (e) {}

  if (!incoming) {
    try {
      incoming = localStorage.getItem('devpilot_prompt_to_run');
    } catch (e) {}
  }

  if (incoming && incoming.trim()) {
    const textarea = document.getElementById('chat-input');
    if (textarea) {
      textarea.value = incoming.trim();
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 140) + 'px';
      textarea.focus();
      if (typeof textarea.setSelectionRange === 'function') {
        textarea.setSelectionRange(textarea.value.length, textarea.value.length);
      }
      try {
        localStorage.removeItem('devpilot_prompt_to_run');
      } catch (e) {}
      if (window.history && window.history.replaceState) {
        const cleanUrl = window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
      }
      if (typeof showToast === 'function') {
        showToast('Prompt loaded into chat input! Edit or press Enter to send.', 'info');
      }
    }
  }
}

function formatMarkdown(text) {
  if (!text) return '';
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code class="bg-slate-100 text-primary px-1 py-0.5 rounded text-xs">$1</code>')
    .replace(/\n/g, '<br/>');
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
