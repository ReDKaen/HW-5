class Card {
    constructor(post) {
        this.post = post;
        this.createCard();
    }

    createCard() {
        const cardContainer = document.getElementById('posts-container');
        const card = document.createElement('div');
        card.className = 'card';

        const title = document.createElement('h2');
        title.textContent = this.post.title;

        const text = document.createElement('p');
        text.textContent = this.post.body;

        const userInfo = document.createElement('div');
        const userName = document.createElement('p');
        userName.textContent = `Author: ${this.post.user.name} ${this.post.user.surname}`;
        const userEmail = document.createElement('p');
        userEmail.textContent = `Email: ${this.post.user.email}`;

        const deleteBtn = document.createElement('span');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => this.deleteCard());

        userInfo.appendChild(userName);
        userInfo.appendChild(userEmail);

        card.appendChild(title);
        card.appendChild(text);
        card.appendChild(userInfo);
        card.appendChild(deleteBtn);

        cardContainer.appendChild(card);
    }

    deleteCard() {
        const postId = this.post.id;
        fetch(`https://ajax.test-danit.com/api/json/posts/${postId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                const cardContainer = document.getElementById('posts-container');
                const card = document.querySelector(`.card[data-id="${postId}"]`);
                cardContainer.removeChild(card);
            } else {
                console.error('Failed to delete post.');
            }
        })
        .catch(error => console.error('Error:', error));
    }
}

fetch('https://ajax.test-danit.com/api/json/users')
    .then(response => response.json())
    .then(users => {
        fetch('https://ajax.test-danit.com/api/json/posts')
            .then(response => response.json())
            .then(posts => {
                posts.forEach(post => {
                    const user = users.find(u => u.id === post.userId);
                    post.user = user;
                    new Card(post);
                });
            })
            .catch(error => console.error('Error fetching posts:', error));
    })
    .catch(error => console.error('Error fetching users:', error));
