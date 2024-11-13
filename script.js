function openNews(id) {
    document.getElementById('news-list').style.display = 'none';
    document.getElementById('news-detail').style.display = 'block';
}

function closeNews() {
    document.getElementById('news-list').style.display = 'block';
    document.getElementById('news-detail').style.display = 'none';
}
