const translations = {
en:{share:"Share", copy:"Copy link"},
es:{share:"Compartir", copy:"Copiar enlace"},
fr:{share:"Partager", copy:"Copier le lien"},
de:{share:"Teilen", copy:"Link kopieren"},
it:{share:"Condividere", copy:"Copia link"},
pt:{share:"Compartilhar",copy: "Copiar link"},
ru:{share:"Поделиться", copy:"Скопировать ссылку"},
zh:{share:"分享", copy:"复制链接"},
ja:{share:"共有する", copy:"リンクをコピー"},
ko:{share:"공유하다", copy:"링크 복사"}
};

const userLanguage = navigator.language;
const languageWithoutHyphen = userLanguage.split('-')[0];
const supportedLanguages = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko'];
const defaultLanguage = 'en';
const languageToUse = supportedLanguages.includes(languageWithoutHyphen) ? languageWithoutHyphen : defaultLanguage;

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
document.querySelectorAll('.menu').forEach(menu => {menu.remove();});
    }
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
shareDiv.textContent = translations[languageToUse].share;
shareDiv.addEventListener('click', () => {
if (navigator.share) {
navigator.share({
title: translations[languageToUse].share,
text: li.textContent,
url: window.location.href
}).catch(error => console.error('Error:', error));
} else {alert(translations[languageToUse].share + ' error');}
});
menu.appendChild(shareDiv);
    
const copyDiv = document.createElement('div');
copyDiv.className = 'copy';
copyDiv.textContent = translations[languageToUse].copy;
    copyDiv.addEventListener('click', () => {
const link = `${window.location.href.split('#')[0]}#${li.id}`;
navigator.clipboard.writeText(link).then(() => {alert(translations[languageToUse].copy + '.');}).catch(err => {
    console.error('Error:', err);
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

document.querySelectorAll('.results a').forEach(link => {
link.textContent = link.textContent.replace('topic/', '');
});

const langElements = document.querySelectorAll('[class^="lang-"]');
langElements.forEach((element) => {
    const classList = element.className;
if (classList.includes(`lang-${languageToUse}`)) {
element.style.display = 'block';}
});

function loadImages() {
const images = document.querySelectorAll('img[data-src]');
images.forEach(img => {
const imgSrc = img.getAttribute('data-src');
img.src = imgSrc;
img.removeAttribute('data-src');
    });
}

function checkConnection() {if (navigator.onLine) {loadImages();}
}

window.addEventListener('online', loadImages);
window.addEventListener('load', checkConnection);

const fixedDiv = document.querySelector('.fixed');
window.addEventListener('scroll', () => {
if (window.scrollY > 100) {fixedDiv.style.display = 'block'; }
});


