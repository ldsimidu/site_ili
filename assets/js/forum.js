document.addEventListener('DOMContentLoaded', function () {
    const navbarContainer = document.getElementById('navbar-container');
    const footerContainer = document.getElementById('footer-container');

    fetch('assets/components/navbar.html')
        .then(response => response.text())
        .then(data => navbarContainer.innerHTML = data)
        .catch(error => console.error('Erro ao carregar a navbar:', error));

    fetch('assets/components/footer.html')
        .then(response => response.text())
        .then(data => footerContainer.innerHTML = data)
        .catch(error => console.error('Erro ao carregar o footer:', error));
});

document.addEventListener("DOMContentLoaded", function () {
    loadPosts();
    loadSuggestedUsers();
});

function loadSuggestedUsers() {
    const users = [
        "@SegurançaComunitária", "@TecnologiaParaSegurança", "@UrbanSafe", "@ComunidadeSegura", "@ParceirosNaSegurança"
    ];
    const shuffledUsers = users.sort(() => 0.5 - Math.random());
    const selectedUsers = shuffledUsers.slice(0, 3);
    const followedUsers = JSON.parse(localStorage.getItem('followedUsers')) || [];
    const suggestedUsersList = document.getElementById('suggested-users');
    suggestedUsersList.innerHTML = '';

    selectedUsers.forEach(user => {
        const isFollowing = followedUsers.includes(user);
        const userItem = document.createElement('li');
        userItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        userItem.innerHTML = `
            <div>${user}</div>
            <button class="btn btn-sm ${isFollowing ? 'btn-success' : 'btn-primary'} follow-button">${isFollowing ? 'Seguindo' : 'Seguir'}</button>
        `;
        userItem.querySelector('.follow-button').addEventListener('click', function () {
            if (isFollowing) {
                followedUsers.splice(followedUsers.indexOf(user), 1);
            } else {
                followedUsers.push(user);
            }
            localStorage.setItem('followedUsers', JSON.stringify(followedUsers));
            loadSuggestedUsers();
        });
        suggestedUsersList.appendChild(userItem);
    });
}

document.getElementById('post-btn').addEventListener('click', function () {
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;
    const category = document.getElementById('post-category').value;
    const post = { title, content, category, timestamp: new Date().toLocaleString() };
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));
    loadPosts();
    document.getElementById('post-title').value = '';
    document.getElementById('post-content').value = '';
    document.getElementById('post-category').value = '';
});

function loadPosts() {
    const postsFeed = document.getElementById('posts-feed');
    postsFeed.innerHTML = '';
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    
    posts.reverse().forEach(post => {
        const postCard = document.createElement('div');
        postCard.classList.add('card-w', 'p-3', 'mb-4');
        
        postCard.innerHTML = `
            <div class="d-flex justify-content-between">
                <div>
                    <strong>${post.category}</strong> - Postado por <a href="#">@UsuarioForum</a>
                </div>
                <div class="text-muted">${post.timestamp}</div>
            </div>
            <h5 class="mt-2">${post.title}</h5>
            <p>${post.content}</p>
            <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                    <button class="btn btn-sm btn-outline-primary">Upvote</button>
                    <button class="btn btn-sm btn-outline-danger">Downvote</button>
                </div>
                <div class="votes">Votos: 0</div>
            </div>
        `;
        
        postsFeed.appendChild(postCard);
    });
}

