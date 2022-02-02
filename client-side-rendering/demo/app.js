import {html, render} from 'https://unpkg.com/lit-html?module';

const articleTemplate = (data) => html`<article>
<input type="text" ?disabled=${data.disabled} .value = ${data.color} />
<h3>${data.title}</h3>
<div class="${data.color}">
<p>${data.content}</p>
</div>
<footer>Autor: ${data.author}</footer>
<div class="comments">
</div>
</article>`;

start(); 

async function start() {
    const data = await (await fetch('./data.json')).json();
    const main = document.querySelector('main');
    const renderBtn = document.getElementById('renderBtn');
    renderBtn.addEventListener('click', onRender);

    document.getElementById('changeBtn').addEventListener('click', onChange);
    
    function onRender() {
        data[0].author += '1';
        const result = data.map(articleTemplate);
        render(result, main);
    }
    
    function onChange() {
        data.shift();
        data.unshift({
            'title': 'First Article 1234',
            'content' : 'Lorem ipsum dolor sit',
            'author' : 'John Smith'
        });

        onRender();
    }
}

