// script.js
document.getElementById('searchButton').addEventListener('click', function() {
    const inputWord = document.getElementById('inputWord').value;
    getRelatedColors(inputWord);
});

document.getElementById('inputWord').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        const inputWord = document.getElementById('inputWord').value;
        getRelatedColors(inputWord);
    }
});

function getRelatedColors(word) {
    const url = "https://unpkg.com/color-name-list/dist/colornames.json";
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const colorList = document.getElementById('colorList');
            colorList.innerHTML = '';
            const filteredColors = data.filter((color) => color.name.toLowerCase().includes(word.toLowerCase()));
            filteredColors.forEach((color) => {
                const colorCard = document.createElement('div');
                colorCard.classList.add('colorCard');
                colorCard.style.backgroundColor = color.hex;
                colorCard.innerHTML = `
                    <div class="hexValue" style="font-size:25px;color:grey;text-transform:uppercase">${color.hex}</div>
                `;
                colorList.appendChild(colorCard);
            });

            const grid = new Isotope(colorList, {
                itemSelector: '.colorCard',
                layoutMode: 'masonry',
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
