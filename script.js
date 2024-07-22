document.addEventListener('DOMContentLoaded', () => {
document.querySelectorAll('li').forEach(li => {
li.addEventListener('click', (event) => {
document.querySelectorAll('.menu').forEach(menu => {menu.remove();});

const menu = createMenu(li);
document.body.appendChild(menu);
const rect = li.getBoundingClientRect();
menu.style.top = `${rect.top + window.scrollY + rect.height}px`;
menu.style.left = `${rect.left + window.scrollX}px`;
menu.style.display = 'block';
    });
});

document.addEventListener('click', (event) => {
if (!event.target.closest('.menu') && !event.target.closest('li')) {
document.querySelectorAll('.menu').forEach(menu => {menu.remove();});}
  });
});

function createMenu(li) {
const menu = document.createElement('div');
menu.className = 'menu';
    
const dateDiv = document.createElement('div');
dateDiv.className = 'date';
const date = new Date(li.id.slice(0, 4), li.id.slice(4, 6) - 1, li.id.slice(6, 8));
dateDiv.textContent = date.toLocaleDateString();
menu.appendChild(dateDiv);
    
const shareDiv = document.createElement('div');
shareDiv.className = 'share';
shareDiv.textContent = 'Compartilhar';
shareDiv.addEventListener('click', () => {
if (navigator.share) {
navigator.share({
title: 'Compartilhar',
text: li.textContent,
url: window.location.href
}).catch(error => console.error('Error sharing:', error));} else {
alert('No support');}
});
menu.appendChild(shareDiv);
    
const copyDiv = document.createElement('div');
copyDiv.className = 'copy';
copyDiv.textContent = 'Copiar link';
copyDiv.addEventListener('click', () => {
const link = `${window.location.href.split('#')[0]}#${li.id}`;
navigator.clipboard.writeText(link).then(() => {alert('Done');
}).catch(err => {console.error('Error:', err);
});
});
menu.appendChild(copyDiv);
return menu;
}

document.getElementById('search').addEventListener('input', function() {
let query = this.value.toLowerCase();
let resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
fetch('https://api.github.com/repos/spikesnews/main/contents/topic')
.then(response => response.json())
.then(data => {
let pages = data.map(file => file.path);
let results = pages.filter(page => page.toLowerCase().includes(query));
results.forEach(result => {
let link = document.createElement('a');
link.href = result;
link.textContent = result;
resultsContainer.appendChild(link);
resultsContainer.appendChild(document.createElement('br'));
  });
})
.catch(error => console.error('Error:', error));
});

const userLanguage = navigator.language;
const languageWithoutHyphen = userLanguage.split('-')[0];
const supportedLanguages = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko'];
const defaultLanguage = 'en';
const languageToUse = supportedLanguages.includes(languageWithoutHyphen) ? languageWithoutHyphen : defaultLanguage;
const langElements = document.querySelectorAll('[class^="lang-"]');
langElements.forEach((element) => {
    const classList = element.className;
if (classList.includes(`lang-${languageToUse}`)) {
element.style.display = 'block';}
});
