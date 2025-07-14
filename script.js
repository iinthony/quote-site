const quotes = [
  { text: "Life is what happens when you're busy making other plans.", category: "life" },
  { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", category: "inspiration" },
  { text: "Love all, trust a few, do wrong to none.", category: "love" },
  { text: "If you want to live a happy life, tie it to a goal, not to people or things.", category: "inspiration" },
  { text: "I'm not arguing, I'm just explaining why I'm right.", category: "humor" },
  { text: "To love and be loved is to feel the sun from both sides.", category: "love" },
  { text: "Be yourself; everyone else is already taken.", category: "inspiration" }
];

const searchInput = document.getElementById('searchInput');
const categorySelect = document.getElementById('categorySelect');
const searchBtn = document.getElementById('searchBtn');
const randomBtn = document.getElementById('randomBtn');
const toggleDarkMode = document.getElementById('toggleDarkMode');
const quotesContainer = document.getElementById('quotesContainer');
const favoritesContainer = document.getElementById('favoritesContainer');

let favorites = [];

function renderQuotes(list, container, isFavorite = false) {
  container.innerHTML = '';
  list.forEach((quote, index) => {
    const div = document.createElement('div');
    div.className = 'quote';
    div.innerHTML = `
      ${quote.text}
      <div class="actions">
        <button onclick="copyQuote('${quote.text}')">📋 Copy</button>
        ${!isFavorite ? `<button onclick="addToFavorites(${index})">⭐ Favorite</button>` : `<button class="removeBtn" onclick="removeFavorite(${index})">❌</button>`}
      </div>
    `;
    container.appendChild(div);
  });
}

function searchQuotes() {
  const keyword = searchInput.value.toLowerCase();
  const category = categorySelect.value;
  const filtered = quotes.filter(q => 
    q.text.toLowerCase().includes(keyword) &&
    (category === '' || q.category === category)
  );
  renderQuotes(filtered, quotesContainer);
}

function showRandomQuote() {
  const category = categorySelect.value;
  const filtered = category ? quotes.filter(q => q.category === category) : quotes;
  const randomQuote = filtered[Math.floor(Math.random() * filtered.length)];
  renderQuotes([randomQuote], quotesContainer);
}

function addToFavorites(index) {
  const quote = quotes[index];
  if (!favorites.find(f => f.text === quote.text)) {
    favorites.push(quote);
    renderFavorites();
  }
}

function removeFavorite(index) {
  favorites.splice(index, 1);
  renderFavorites();
}

function renderFavorites() {
  renderQuotes(favorites, favoritesContainer, true);
}

function copyQuote(text) {
  navigator.clipboard.writeText(text);
  alert('Quote copied!');
}

toggleDarkMode.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

searchBtn.addEventListener('click', searchQuotes);
randomBtn.addEventListener('click', showRandomQuote);

searchQuotes(); // Initial render
