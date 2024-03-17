function mostrar(data) {
  const resultsContainer = document.getElementById('resultados');
  resultsContainer.innerHTML = '';

  if (data.docs.length === 0) {
    resultsContainer.textContent = 'Nenhum resultado encontrado';
    return;
  }

  const resultList = document.createElement('ul');
  data.docs.forEach(book => {
    const listItem = document.createElement('li');

    const capa = document.createElement('img');
    capa.src = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`; // <--------------URL da capa do livro
    capa.alt = `Capa do livro ${book.title}`;
    listItem.appendChild(capa);

    const titulo = document.createElement('a');
    titulo.textContent = book.title;
    titulo.href = `https://openlibrary.org${book.key}`;
    titulo.target = '_blank';
    listItem.appendChild(titulo);

    resultList.appendChild(listItem);
  });

  resultsContainer.appendChild(resultList);
}

function BuscarL() {
  const procurar = document.getElementById('searchInput').value.trim();
  if (procurar === '') {
    alert('Por favor, insira um título de livro válido');
    return;
  }

  const apiUrl = `https://openlibrary.org/search.json?title=${encodeURIComponent(procurar)}`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro erro erro');
      }
      return response.json();
    })
    .then(data => {
      mostrar(data);
    })
    .catch(error => {
      console.error('Erro na Busca patrão:', error);
    });
}