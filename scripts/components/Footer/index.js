class Footer {
    constructor() {
        this.item = document.createElement('footer')
        this.item.classList.add('footer')
        this.item.innerHTML = `
            <div class = "footer-top">
                <ul>
                    <li><h4>Пиццерии</h4></li>
                    <li><a href = '#'>Карта доставки</a></li>
                    <li><a href = '#'>Условия доставки</a></li>
                </ul>
                <ul>
                    <li><h4>Новости</h4></li>
                    <li><a href = '#'>Акции</a></li>
                    <li><a href = '#'>Программа лояльности</a></li>
                </ul>
                <ul>
                    <li><h4>Контактные данные</h4></li>
                    <li>info@pizzadrive.by</li>
                    <li>8877</li>
                </ul>

                <div class = "footer-app">
                    <a href="#">
                        <img class= "mobile_app" src="../image/google.svg" alt="google_play">
                    </a>
                    <a href="#">
                        <img class= "mobile_app" src="../image/huawei.png" alt="google_play">
                    </a>
                    <a href="#">
                        <img class= "mobile_app" src="../image/app_store.svg" alt="google_play">
                    </a>
                </div>
            </div>
            <div class = "footer-bottum">
                <span>Illustration by <a href="https://icons8.ru/illustrations/style--bouncy/free--y">Icons 8 Ouch!</a></span>
            </div>
        `
    }

    render() {
        return this.item
    }
}

export default Footer