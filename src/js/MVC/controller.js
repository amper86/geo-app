const Map = require('../modules/api.yandex.map');

export default class {
    constructor() {
        this.myApiMap = new Map();

        this.init();
    }

    async init() {
        this.yandexApi = await this.myApiMap.initMap({
            center: [55.76, 37.64],
            zoom: 12,
            controls: ['geolocationControl']
        });

        //console.log(this.yandexApi);
        this.yandexApi.events.add('click', async (e) => {
            const position = await this.myApiMap.getMapPosition(e);

            //console.log(position);
            this.myApiMap.createPlacemark(position);
        });
    }
}