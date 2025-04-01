var prevScrollpos = window.scrollY;
window.onscroll = function() {
  var currentScrollPos = window.scrollY;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("barranav").style.top = "65px";
  } else {
    document.getElementById("barranav").style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
}

// Renderiza os posts na página de notícias (index.html or noticias.html)
document.addEventListener("DOMContentLoaded", async () => {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  if (currentPage !== 'index.html' && currentPage !== 'noticias.html') return;

  const resposta = await fetch('posts.json');
  const posts = await resposta.json();

  const postagens = document.getElementById('postagens');
  const pagination = document.getElementById('pagination');

  const cardsPerPage = 6;
  let currentPageNum = 1;

  const renderCards = () => {
    const start = (currentPageNum - 1) * cardsPerPage;
    const end = start + cardsPerPage;
    const currentPosts = posts.slice(start, end);

    postagens.innerHTML = `
      <div class="row justify-content-center">
        ${currentPosts.map(post => `
          <div class="col-md-4 mb-4">
            <div class="card h-100">
              <img class="card-img-top" src="${post.imagem}" alt="${post.titulo}">
              <div class="card-body">
                <h5 class="card-title">
                  <a href="post.html?id=${post.id}">${post.titulo}</a>
                </h5>
                <p class="card-text">${post.previa}</p>
              </div>
              <div class="card-footer">
                <small class="text-muted">Publicado em ${post.data}</small>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(posts.length / cardsPerPage);
    pagination.innerHTML = `
      <div class="d-flex justify-content-center mt-4">
        <button class="btn btn-success mx-2 espacado ${currentPageNum === 1 ? 'disabled' : ''}" id="prevPage">Página Anterior</button>
        <button class="btn btn-success mx-2 espacado ${currentPageNum === totalPages ? 'disabled' : ''}" id="nextPage">Próxima Página</button>
      </div>
    `;

    document.getElementById('prevPage')?.addEventListener('click', () => {
      if (currentPageNum > 1) {
        currentPageNum--;
        renderCards();
        renderPagination();
      }
    });

    document.getElementById('nextPage')?.addEventListener('click', () => {
      if (currentPageNum < totalPages) {
        currentPageNum++;
        renderCards();
        renderPagination();
      }
    });
  };

  renderCards();
  renderPagination();
});

// Renderiza os destaques no index (only on index.html)
document.addEventListener("DOMContentLoaded", async () => {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  if (currentPage !== 'index.html') return;

  const resposta = await fetch('posts.json');
  const posts = await resposta.json();

  const destaquePosts = posts.filter(post => post.destaque === 1);
  const destaquesContainer = document.getElementById('destaques');
  destaquesContainer.innerHTML = `
    <div class="row justify-content-center">
      ${destaquePosts.map(post => `
        <div class="col-md-4 mb-4">
          <div class="card h-100 w-100">
            <img class="card-img-top" src="${post.imagem}" alt="${post.titulo}">
            <div class="card-body">
              <h5 class="card-title">
                <a href="post.html?id=${post.id}">${post.titulo}</a>
              </h5>
              <p class="card-text">${post.previa}</p>
            </div>
            <div class="card-footer">
              <small class="text-muted">Publicado em ${post.data}</small>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
});

// Renderiza post individual em post.html
document.addEventListener("DOMContentLoaded", async () => {
  const currentPage = window.location.pathname.split('/').pop();
  if (currentPage !== 'post.html') return;

  const params = new URLSearchParams(window.location.search);
  const postId = params.get('id');

  if (postId) {
    const resposta = await fetch('posts.json');
    const posts = await resposta.json();
    const post = posts.find(p => p.id == postId);

    if (post) {
      document.getElementById('titulo-post').innerHTML = `
        <img src="${post.imagem}" alt="${post.titulo}" class="imagem-postagem-grande" id="img-post"/> 
        <h1>${post.titulo}</h1>
        <h3>Publicado em ${post.data}</h3>
      `;
      document.getElementById('postContent').innerHTML = `
        <p class="conteudo-postagem">${post.conteudo}</p>
      `;
    } else {
      document.getElementById('postContent').innerHTML = '<p>Postagem não encontrada.</p>';
    }
  }
});

// Search functionality for pesquisa.html
document.addEventListener("DOMContentLoaded", async () => {
  const currentPage = window.location.pathname.split('/').pop();
  console.log("Current page:", currentPage);
  if (currentPage !== 'pesquisa.html') return;

  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('query');
  console.log("Search query:", query);

  const searchResults = document.getElementById('search-results');
  if (!searchResults) {
    console.error("search-results element not found");
    return;
  }

  if (!query) {
    searchResults.innerHTML = '<p>Digite um termo de pesquisa.</p>';
    return;
  }

  try {
    const resposta = await fetch('posts.json');
    if (!resposta.ok) throw new Error(`Fetch failed: ${resposta.status}`);
    const posts = await resposta.json();
    console.log("Posts loaded:", posts);

    const filteredPosts = posts.filter(post =>
      post.titulo.toLowerCase().includes(query.toLowerCase()) ||
      post.previa.toLowerCase().includes(query.toLowerCase())
    );
    console.log("Filtered posts:", filteredPosts);

    if (filteredPosts.length === 0) {
      searchResults.innerHTML = '<p>Nenhum resultado encontrado.</p>';
    } else {
      searchResults.innerHTML = `
        <div class="row justify-content-center">
          ${filteredPosts.map(post => `
            <div class="col-md-4 mb-4">
              <div class="card h-100">
                <img class="card-img-top" src="${post.imagem}" alt="${post.titulo}">
                <div class="card-body">
                  <h5 class="card-title">
                    <a href="post.html?id=${post.id}">${post.titulo}</a>
                  </h5>
                  <p class="card-text">${post.previa}</p>
                </div>
                <div class="card-footer">
                  <small class="text-muted">Publicado em ${post.data}</small>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }
  } catch (error) {
    console.error("Error in search:", error);
    searchResults.innerHTML = '<p>Erro ao carregar resultados.</p>';
  }
});

// Service Worker registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('Service Worker registered!', reg))
      .catch(err => console.log('Service Worker registration failed:', err));
  });
}