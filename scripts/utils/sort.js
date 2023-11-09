function trier(choixTrier) {
    switch (choixTrier.value) {
        case "Popularité":
            photographerMedia.sort(function (a, b) {
                return a.likes - b.likes;
            });
            break;
        case "Date":
            photographerMedia.sort(function (a, b) {
                return a.date.localeCompare(b.date);
            });
            break;
        case "Titre":
            photographerMedia.sort(function (a, b) {
                return a.title.localeCompare(b.title);
            });
            break;
        default:
            break;
    }

	displayMedia(photographerMedia);
}