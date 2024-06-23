document.addEventListener('DOMContentLoaded', () => {
    const chatgptForm = document.getElementById('chatgpt-form');
    const chatgptResult = document.getElementById('chatgpt-result');
    const dalleForm = document.getElementById('dalle-form');
    const dalleResult = document.getElementById('dalle-result');

    function showPleaseWait() {
        const pleaseWait = document.getElementById('please-wait');
        pleaseWait.classList.remove('d-none');
    }

    function hidePleaseWait() {
        const pleaseWait = document.getElementById('please-wait');
        pleaseWait.classList.add('d-none');
    }

    if (chatgptForm) {
        chatgptForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const prompt = document.getElementById('chatgpt-prompt').value;
            
            showPleaseWait();

            try {
                const response = await fetch('http://localhost:5000/api/chatgpt', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ prompt: prompt })
                });

                const data = await response.json();
                chatgptResult.innerText = data.choices[0].text;
            } catch (error) {
                console.error(error);
                chatgptResult.innerText = 'Error fetching results';
            }

            hidePleaseWait();
        });
    }

    if (dalleForm) {
        dalleForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const prompt = document.getElementById('dalle-prompt').value;
            const imageSize = document.getElementById('image-size').value;

            showPleaseWait();

            try {
                const response = await fetch('http://localhost:5000/api/dalle', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ prompt: prompt, imageSize: imageSize })
                });

                const data = await response.json();
                const img = document.createElement('img');
                img.src = data.data[0].url;
                img.alt = prompt;
                img.className = 'img-fluid';

                dalleResult.innerHTML = '';
                dalleResult.appendChild(img);
            } catch (error) {
                console.error(error);
                dalleResult.innerText = 'Error fetching results';
            }

            hidePleaseWait();
        });
    }
});

function setActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop();
    let activeNavItem;

    switch (currentPage) {
        case 'index.html':
            activeNavItem = document.getElementById('nav-chatgpt');
            break;
        case 'dalle.html':
            activeNavItem = document.getElementById('nav-dalle');
            break;
        default:
            return;
    }

    if (activeNavItem) {
        activeNavItem.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setActiveNavItem();
});
