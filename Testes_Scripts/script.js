// Código que renderiza os posts na pagina inicial
document.addEventListener("DOMContentLoaded", async () => {
    const resposta = await fetch('posts.json');
    const posts = await resposta.json();
  
    const postagens = document.getElementById('postagens');
    postagens.innerHTML = posts.map(post => `
      <article class="post">
        <h2><a href="post.html?id=${post.id}">${post.titulo}</a></h2>
        <p>${post.previa}</p>
      </article>
    `).join('');
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
        document.getElementById('postHeader').innerHTML = `
          <h1>${post.titulo}</h1>
          <p>Postado em ${post.data}</p>
        `;
        document.getElementById('postContent').innerHTML = `
          <p>${post.conteudo}</p>
        `;
      } else {
        document.getElementById('postContent').innerHTML = '<p>Postagem não encontrada.</p>';
      }
    }
  });
 

    