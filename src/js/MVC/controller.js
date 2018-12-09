const Map = require('../modules/api.yandex.map');
//todo: поставить дату при добавлении комментария
//todo: сделать чтобы вся инфа переходила в балун (возможно через локал стор)
//todo: при нажатии на метку, чтобы открывалось меню комментов на одинарной метке
//todo: посмотреть видео

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
            //console.log(e);
            let position = await this.myApiMap.getMapPosition(e);

            //console.log(position);
            this.showFormPopUp(position);
            //this.myApiMap.createPlacemark(position);
        });
    }

    showFormPopUp(position) {
        //console.log(position);
        const popUp = document.getElementById('popUp');
        const addressForm = document.querySelector('.pop-up__address');
        const blockComments = document.querySelector('.pop-up__comments');
        //console.log(position.address);

        popUp.classList.remove('pop-up_hidden');
        blockComments.innerHTML = ''; //потом сделать, чтобы грузилось из локал стор или пустое выводило
        addressForm.textContent = position.address;
        this.addComment(position);
        this.hidePopUp();
    }

    addComment(position) {
        const addBtn = document.querySelector('#submitBtn');
        //console.log('add comment');

        addBtn.onclick = (e) => {
            const inputName = document.querySelector('#name');
            const inputArea = document.querySelector('#area');
            const inputComment = document.querySelector('#comment');
           /* console.log(inputName.value);
            console.log(inputArea.value);
            console.log(inputComment.value);*/

            e.preventDefault();
            this.createComment(inputName.value, inputArea.value, inputComment.value);
            this.myApiMap.createPlacemark(position);

            inputName.value = '';
            inputArea.value = '';
            inputComment.value = '';
        }
    };

    createComment(name, area, comment) {
        const block = document.querySelector('.pop-up__comments');
        let commentDiv = document.createElement('div');

        commentDiv.classList.add('pop-up__comment');
        commentDiv.innerHTML = `<p class="comment-info"><span class="name">${name} </span><span class="area">${area} </span><span class="date"></span></p><p class="comment-text">${comment}</p>`;
        block.appendChild(commentDiv);
    };

    hidePopUp() {
        const popUp = document.getElementById('popUp');

        popUp.onclick = (e) => {
            let targetElem = e.target;

            console.log(targetElem.getAttribute('class'));
            if (targetElem.classList.contains('pop-up__exit') || targetElem.classList.contains('pop-up')) {
                e.preventDefault();
                console.log('скрыть поап');
                popUp.classList.add('pop-up_hidden');
            }
        }
    }
}