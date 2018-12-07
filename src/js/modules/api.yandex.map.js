module.exports = class {
    constructor(settings) {}

    initMap(settings) {
        return new Promise((resolve, reject)=> ymaps.ready(resolve))
            .then(() => {
                this.map = new ymaps.Map('map', settings);

                this.cluster = new ymaps.Clusterer({
                    clusterDisableClickZoom: true,
                    clusterOpenBalloonOnClick: true,
                    // Используем макет "карусель"
                    clusterBalloonContentLayout: 'cluster#balloonCarousel',
                    clusterBalloonPanelMaxArea: 0,
                    clusterBalloonContentLayoutWidth: 220,
                    clusterBalloonContentLayoutHeight: 300,
                    // Количество элементов в панели.
                    clusterBalloonPagerSize: 5,
                    clusterBalloonPagerVisible: false
                });

                this.map.geoObjects.add(this.cluster);
                return this.map;
            })
    }

    async getMapPosition(e) {
        const coords = e.get('coords');
        const geocode = await ymaps.geocode(coords);
        console.log(geocode);
        const address = geocode.geoObjects.get(0).properties.get('text');

        return {
            coords,
            address
        }
    }

    createPlacemark(position) {
        const myPlacemark = new ymaps.Placemark(position.coords, {
            hintContent: position.address,
            balloonContent: `мы кликнули: ${position.address}`
        });

        this.cluster.add(myPlacemark);
    }
};