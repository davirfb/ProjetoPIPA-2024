document.addEventListener("DOMContentLoaded", async () => {
  const resposta = await fetch('posts.json');
  const posts = await resposta.json();

  const postagens = document.getElementById('postagens');
  const pagination = document.getElementById('pagination');

  const cardsPerPage = 6; // Number of cards to display per page
  let currentPage = 1;

  // Function to render cards for the current page
  const renderCards = () => {
      const start = (currentPage - 1) * cardsPerPage;
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

  // Function to render pagination buttons
  const renderPagination = () => {
      const totalPages = Math.ceil(posts.length / cardsPerPage);

      pagination.innerHTML = `
        <div class="d-flex justify-content-center mt-4">
          <button class="btn btn-primary mx-2 ${currentPage === 1 ? 'disabled' : ''}" id="prevPage">Previous</button>
          <button class="btn btn-primary mx-2 ${currentPage === totalPages ? 'disabled' : ''}" id="nextPage">Next</button>
        </div>
      `;

      // Add event listeners for pagination buttons
      document.getElementById('prevPage')?.addEventListener('click', () => {
          if (currentPage > 1) {
              currentPage--;
              renderCards();
              renderPagination();
          }
      });

      document.getElementById('nextPage')?.addEventListener('click', () => {
          if (currentPage < totalPages) {
              currentPage++;
              renderCards();
              renderPagination();
          }
      });
  };

  // Initial rendering
  renderCards();
  renderPagination();
});

//Função que renderiza os destaques no index
document.addEventListener("DOMContentLoaded", async () => {
  const resposta = await fetch('posts.json');
  const posts = await resposta.json();

  const destaquePosts = posts.filter(post => post.destaque === 1);

  const destaquesContainer = document.getElementById('destaques');
  destaquesContainer.innerHTML = `
    <div class="row">
      ${destaquePosts.map(post => `
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
});

// Busca o post e renderiza ele na pagina posts.html
document.addEventListener("DOMContentLoaded", async () => {
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

            <p class=conteudo-postagem>${post.conteudo}</p>
        `;
      } else {
        document.getElementById('postContent').innerHTML = '<p>Postagem não encontrada.</p>';
      }
    }
  });
 

    