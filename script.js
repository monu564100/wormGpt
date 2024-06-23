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

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                chatgptResult.innerText = data.choices[0].text;
            } catch (error) {
                console.error('Error fetching results:', error);
                chatgptResult.innerText = `Error fetching results: ${error.message}`;
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

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                const img = document.createElement('img');
                img.src = data.data[0].url;
                img.alt = prompt;
                img.className = 'img-fluid';

                dalleResult.innerHTML = '';
                dalleResult.appendChild(img);
            } catch (error) {
                console.error('Error fetching results:', error);
                dalleResult.innerText = `Error fetching results: ${error.message}`;
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
