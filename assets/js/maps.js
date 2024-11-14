document.addEventListener('DOMContentLoaded', function () {
    const navbarContainer = document.getElementById('navbar-container');
    
    // Faz o fetch do conteúdo da navbar
    fetch('assets/components/navbar.html')
        .then(response => response.text())
        .then(data => {
            // Insere o conteúdo da navbar dentro do elemento
            navbarContainer.innerHTML = data;
        })
        .catch(error => console.error('Erro ao carregar a navbar:', error));
});

document.addEventListener('DOMContentLoaded', function () {
    const navbarContainer = document.getElementById('footer-container');
    
    // Faz o fetch do conteúdo da navbar
    fetch('assets/components/footer.html')
        .then(response => response.text())
        .then(data => {
            // Insere o conteúdo da navbar dentro do elemento
            navbarContainer.innerHTML = data;
        })
        .catch(error => console.error('Erro ao carregar a navbar:', error));
});

document.getElementById("customButton").addEventListener("click", function() {
    window.location.href = "tresds.html"; 
});