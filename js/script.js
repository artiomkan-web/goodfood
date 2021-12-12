'use strict'
window.addEventListener('DOMContentLoaded', ()=> {
    let header = document.querySelector('.header'),
        headerCatalog = header.querySelector('.header__catalog'),
        headerCatalogBtn = header.querySelector('.header__catalog__btn'),
        headerCatalogMenu = header.querySelector('.header__catalog__menu'),
        headerCategories = header.querySelectorAll('.header__catalog__category>span'),
        headerSubcategories = header.querySelectorAll('.header__catalog__subcategory>span'),

        headerHead = header.querySelector('.header__head'),
        headerBody = header.querySelector('.header__body'),
        headerBodyTop = headerBody.offsetTop,
        headerAccount = header.querySelector('.header__connect__account'),

        headerBurger = header.querySelector('.header__burger')

    function headerCatalogMenuSwitcher(item) {
        if (item.parentNode.classList.contains('header__catalog__category')){
            if (!item.parentNode.classList.contains('active')){
                headerCatalogMenu.classList.add('choice-category')
                item.parentNode.classList.add('active')
            }
            else{
                headerCatalogMenu.classList.remove('choice-category')
                item.parentNode.classList.remove('active')
            }
        }
        if (item.parentNode.classList.contains('header__catalog__subcategory')){
            if (!item.parentNode.classList.contains('active')){
                headerCatalogMenu.classList.add('choice-subcategory')
                item.parentNode.classList.add('active')
            }
            else{
                headerCatalogMenu.classList.remove('choice-subcategory')
                item.parentNode.classList.remove('active')
            }
        }
    }
    function headerCatalogClose() {
        headerCatalog.querySelectorAll('li').forEach(i => {
            i.classList.remove('active')
        })
        headerCatalog.classList.remove('active')
        headerCatalogMenu.classList.remove('choice-category')
        headerCatalogMenu.classList.remove('choice-subcategory')
    }

    headerCategories.forEach(i => {
        i.addEventListener('click', (e)=>{
            headerCatalogMenuSwitcher(e.target)
        })
    })
    headerSubcategories.forEach(i => {
        i.addEventListener('click', (e)=>{
            headerCatalogMenuSwitcher(e.target)
        })
    })
    
    
    

    let startpage = document.querySelector('.startpage'),
        startpageMainRow = startpage.querySelector('.startpage__maincontent__row'),
        startpageAll = startpage.querySelector('.startpage__allcontent'),
        startpageAllRow = startpage.querySelector('.startpage__allcontent__row'),
        startpageAllItems = startpage.querySelectorAll('.startpage__allcontent__item'),
        startpageShowNumber = getComputedStyle(startpageAll).getPropertyValue('--show'),
        startpageAllNumber = startpageAllItems.length,
        startpagePrev = document.querySelector('.startpage__toggle-btn.prev'),
        startpageNext = document.querySelector('.startpage__toggle-btn.next'),
        startpageSliderIndex = 0

    function startpageSliderToggle() {
        if (startpageSliderIndex > startpageAllNumber - 1){
            startpageSliderIndex = 0
            startpageAllRow.style.left = 0
        }
        if (startpageSliderIndex < 0){
            startpageSliderIndex = startpageAllNumber - 1
        }
        startpageMainRow.style.left = -100*startpageSliderIndex + '%'

        if (startpageSliderIndex >= startpageShowNumber - 1){
            startpageAllRow.style.left = -100/startpageShowNumber *  (startpageSliderIndex - startpageShowNumber + 1) + '%'
        }
    }

    startpagePrev.addEventListener('click', ()=>{
        startpageSliderToggle(startpageSliderIndex--)
    })
    startpageNext.addEventListener('click', ()=> {
        startpageSliderToggle(startpageSliderIndex++)
    })

    class Slider {
        constructor(slider, index = 0){
            this.slider = slider,
            this.row = slider.querySelector('.row'),
            this.items = slider.querySelectorAll('.item'),
            this.indents = getComputedStyle(slider).getPropertyValue('--indents').split('px')[0]*1,
            this.show = getComputedStyle(slider).getPropertyValue('--show'),
            this.all = this.items.length,
            this.prev = slider.querySelector('.toggle-btn.prev'),
            this.next = slider.querySelector('.toggle-btn.next')
            this.index = index


            this.prev.addEventListener('click', ()=>{
                this.sliderToggle(this.index--)
            })

            this.next.addEventListener('click', ()=>{
                this.sliderToggle(this.index++)
            })
        }   
        sliderToggle() {
            if (this.index < 0){
                this.index = this.all - 1
            }
            if (this.index >= this.all - this.show + 1){
                this.index = 0
            } 
            if (this.index > this.all - 1){
                this.index = 0
            }
             
            if (getComputedStyle(this.items[0]).getPropertyValue('min-width') != '100%'){
                this.row.style.left = -this.index*this.items[0].offsetWidth - this.indents*this.index + 'px'
            }
            else{
                this.row.style.left = -this.index*100 + '%'
            }
        }
    }

    let sl1 = new Slider(document.querySelector('.discounts__slider')),
        sl2 = new Slider(document.querySelector('.prices__body')),
        sl3 = new Slider(document.querySelector('.new__content '))
        
    
    let prices = document.querySelector('.prices'),
        pricesItems = prices.querySelectorAll('.prices__item'),
        pricesItemsAvailability = prices.querySelectorAll('.prices__product__availability'),
        pricesItemsLike = prices.querySelectorAll('.prices__properties__favorite'),
        pricesItemsAdd = prices.querySelectorAll('.prices__add')

    function pricesToggle(target) {
        target.classList.contains('active') 
        ? target.classList.remove('active') 
        : target.classList.add('active') 
    }
    pricesItems.forEach(i => {
        if(i.classList.contains('outstock')){
            pricesItemsAvailability.forEach(i => {i.textContent = 'Нет в наличии'})
        }
    })
    pricesItemsLike.forEach(i => {
        i.addEventListener('click', ()=>{
            pricesToggle(i)
        })
    })
    pricesItemsAdd.forEach(i => {
        i.addEventListener('click', ()=>{
            pricesToggle(i)
        })
    })
    function pricesRatingRoot(stars, value) {
        stars.forEach(i => i.classList.remove('active'))
        for (let n = 0; n < value+1; n++){
            stars[n].classList.add('active')
        }
    }
    pricesItems.forEach(item => {
        let itemRating = item.querySelector('.prices__properties__rating'),
            itemRatingStars = item.querySelectorAll('.prices__properties__rating-star'),
            itemRatingDefault = 0

        for (let n = 0; n < itemRatingStars.length; n++){
            if (itemRatingStars[n].classList.contains('active')){
                itemRatingDefault++
            }
        }
        itemRating.addEventListener('mouseover', (e)=>{
            for (let n = 0; n < itemRatingStars.length; n++){
                if (e.target == itemRatingStars[n]){
                    pricesRatingRoot(itemRatingStars, n)
                }
            }
        })
        itemRating.addEventListener('mouseleave', (e)=>{
            itemRatingStars.forEach(i => i.classList.remove('active'))
            for (let n = 0; n < itemRatingDefault; n++){
                itemRatingStars[n].classList.add('active')
            }
        })
    })

    let account = document.querySelector('.account'),
        accountOpen = document.querySelector('.header__connect__account'),
        accountClose = document.querySelectorAll('.account__close'),

        accountTabs = document.querySelector('.account__tabs'),
        accountTabsBtns = document.querySelectorAll('.account__tabs-btn'),
        accountTabsItems = document.querySelectorAll('.account__tabs-item'),
        accountItemError = document.querySelectorAll('.account__error'),

        accountLogin = document.querySelector('.account__item.login'),
        accountConfirm = document.querySelector('.account__item.confirm'),
        
        accountItemLogIn = document.querySelector('.account__tabs-item.log-in'),
        accountItemLogInToggle = true,
        accountItemLogInSubmit = accountItemLogIn.querySelector('.account__btn.submit'),
        accountItemLogInLogin = accountItemLogIn.querySelector('.account__field.login>input'),
        accountItemLogInPassword = accountItemLogIn.querySelector('.account__field.password>input'),
        accountItemLogInData = [
            {login: 'mail@mail.ru', password: 'QWERTY123'},
            {login: 'mail2@mail.ru', password: 'QWERTY1234'},
            {login: 'mail3@mail.ru', password: 'QWERTY12345'},
            {login: 'mail4@mail.ru', password: 'QWERTY123456'}
        ],

        accountItemSignUp = document.querySelector('.account__tabs-item.sign-up'),
        accountItemSignUpToggle = true,
        accountItemSignUpSubmit = accountItemSignUp.querySelector('.account__btn.submit'),
        accountItemSignUpNames = accountItemSignUp.querySelectorAll('.account__field.text>input'),
        accountItemSignUpPhone = accountItemSignUp.querySelector('.account__field.phone>input'),
        accountItemSignUpEmail = accountItemSignUp.querySelector('.account__field.email>input'),
        accountItemSignUpPassword = accountItemSignUp.querySelector('.account__field.password>input'),
        accountItemSignUpConfirmPassword = accountItemSignUp.querySelector('.account__field.confirm-password>input'),
        accountItemSignUpCode = accountItemSignUp.querySelector('.account__field.code>input'),
        accountItemSignUpAgreement = accountItemSignUp.querySelector('.account__checkbox>input'),
        accountItemSignUpData = {
            code: 123456
        },
        
        accountConfirmSMS = accountConfirm.querySelector('.account__field.sms>input'),
        accountConfirmSubmit = accountConfirm.querySelector('.account__btn.submit'),
        accountConfirmCode = 123123

    // Проверки при нажатии на кнопку отправки
    function accountChecker(toggle, errorNumb = 0) {
        if (!toggle){
            accountItemError[errorNumb].classList.add('active')
        }
        else {
            accountItemError[errorNumb].classList.remove('active')
        }
    }
    accountItemLogInSubmit.addEventListener('click', (e)=>{
        // Проверка на соответствие email и пароля в базе "accountItemLogInData"
        let accountArr = accountItemLogInData.filter(i => {
            return i.login === accountItemLogInLogin.value && i.password === accountItemLogInPassword.value
        })
        if (accountArr.length == 1){
            accountItemLogInToggle = true
        }
        else{
            accountItemLogInToggle = false
        }
        accountChecker(accountItemLogInToggle)
    })
    accountItemSignUpSubmit.addEventListener('click', (e)=>{
        accountItemSignUpToggle = true
        // Фамилия/Имя ||| Только русские символы
        accountItemSignUpNames.forEach(i => {
            if (!/^[а-яё]*$/i.test(i.value)){
                return accountItemSignUpToggle = false
            }
        })

        // Телефон || Не меньше необходимого кол-ва символов
        if (accountItemSignUpPhone.value.length < 16){
            accountItemSignUpToggle = false
        }
        // Email || Проверка на шаблон email'a
        if (!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(accountItemSignUpEmail.value)){
            accountItemSignUpToggle = false
        }

        // Пароль || От 6 до 20 символов, которые содержат как минимум одну цифровую цифру , одну заглавную и одну строчную букву
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(accountItemSignUpPassword.value)){
            accountItemSignUpToggle = false
        }

        // Подтверждение пароля || Совпадение с паролем
        if (!(accountItemSignUpPassword.value === accountItemSignUpConfirmPassword.value)){
            accountItemSignUpToggle = false
        }

        // Код || Соответствие с переменной в accountItemSignUpData
        if (!(accountItemSignUpCode.value == accountItemSignUpData.code)){
            accountItemSignUpToggle = false
        }

        // Согласие на обработку персональных данных || Вкл/выкл
        if (!accountItemSignUpAgreement.checked){
            accountItemSignUpToggle = false
        }

        if (accountItemSignUpToggle){
            accountLogin.classList.remove('active')
            accountConfirm.classList.add('active')
        }

        return accountChecker(accountItemSignUpToggle)
    })

    // Проверки прямо во время ввода информации в input'ы
    function accountCheckPassword() {
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(accountItemSignUpPassword.value)){
            accountItemSignUpPassword.parentNode.classList.add('error')
            return false
        }
        else{
            accountItemSignUpPassword.parentNode.classList.remove('error')
        }
    }
    function accountConfirmPassword() {
        let result
        if (accountItemSignUpPassword.value === accountItemSignUpConfirmPassword.value){
            result = true
            accountItemSignUpConfirmPassword.parentNode.classList.remove('error')
        }
        else{
            result = false
        }
        return result
    }
    accountItemSignUpPassword.addEventListener('input', accountCheckPassword)
    accountItemSignUpConfirmPassword.addEventListener('input', ()=>{
        if (accountConfirmPassword()){
            accountItemSignUpConfirmPassword.parentNode.classList.remove('error')
        }
        else{
            accountItemSignUpConfirmPassword.parentNode.classList.add('error')
        }
    })
    accountItemSignUpPassword.addEventListener('input', accountConfirmPassword)
    accountConfirmSMS.addEventListener('input', ()=>{
        if (accountConfirmSMS.value.length == accountConfirmCode.toString().length){
            if (accountConfirmSMS.value == accountConfirmCode){
                accountChecker(true, 1)
                accountConfirmSubmit.classList.remove('disabled')
            }
            else{
                accountChecker(false, 1)
                accountConfirmSubmit.classList.add('disabled')
            }
        }
    })

    // Модальное окно 
    function accountModalToggle() {
        if (account.classList.contains('active')){
            account.classList.remove('active')
            document.body.style.overflow = ''
            document.body.style.position = ''
        }
        else{
            account.classList.add('active')
            document.body.style.overflow = 'hidden'
            document.body.style.position = 'fixed'
        }
    }
    accountOpen.addEventListener('click', ()=>{
        accountModalToggle()
    })
    accountClose.forEach(i => {
        i.addEventListener('click', ()=>{
            accountModalToggle()
        })
    })
    account.addEventListener('click', (e)=> {
        if (e.target.classList.contains('modal')){
            accountModalToggle()
        }
    })
    accountTabs.addEventListener('click', (e)=> {
        for (let n = 0; n < accountTabsBtns.length + 1; n++){
            if (e.target == accountTabsBtns[n]){
                accountTabsBtns.forEach(i => i.classList.remove('active'))
                accountTabsItems.forEach(i => i.classList.remove('active'))

                accountTabsBtns[n].classList.add('active')
                accountTabsItems[n].classList.add('active')
            }
        }
    })

    // Media Queries
    function mediaQueries() {
        if (window.matchMedia('(min-width: 769px)').matches){
            window.addEventListener('scroll', ()=>{
                if(window.pageYOffset > headerBodyTop){
                    headerBody.classList.add('fixed')
                    headerHead.style.marginBottom = headerBody.offsetHeight + 'px'
                }
                else{
                    headerBody.classList.remove('fixed')
                    headerHead.style.marginBottom = ''
                }
            })

            
            headerCatalogBtn.addEventListener('mouseover', ()=>{ headerCatalog.classList.add('active') })
            headerCatalog.addEventListener('mouseleave', headerCatalogClose)
            headerCatalogMenu.addEventListener('mouseleave',headerCatalogClose)
        }
        if (window.matchMedia('(max-width: 768px)').matches){
            headerHead.insertAdjacentElement('beforeend', headerCatalog)
            headerBody.querySelector('.container').insertAdjacentElement('beforeend', headerAccount)
            // Бургер Меню
            headerBurger.addEventListener('click', ()=>{
                if(!header.classList.contains('active') ){
                    header.classList.add('active')
                    document.body.style.overflow = 'hidden'
                }
                else{
                    header.classList.remove('active')
                    document.body.style.overflow = ''
                }
            })

            headerCatalog.classList.add('active')
            headerCatalogMenu.addEventListener('mouseleave', ()=>{})
            headerCatalog.addEventListener('mouseleave', ()=>{})
            headerCatalogBtn.addEventListener('click', ()=>{
                !headerCatalog.classList.contains('active')
                ? headerCatalog.classList.add('active')
                : headerCatalogClose()
            })

            let headerSearch = header.querySelector('.header__search'),
                headerSearchBtn = headerSearch.querySelector('.header__search__icon'),
                headerSearchClose = headerSearch.querySelector('.header__search__window__close')

            function headerSearchToggle() {
                if (!headerSearch.classList.contains('active') ){
                    headerSearch.classList.add('active')
                    document.body.classList.add('fixed')
                }
                else{
                    headerSearch.classList.remove('active')
                    document.body.classList.remove('fixed')
                }
            }
            headerSearchBtn.addEventListener('click', headerSearchToggle)
            headerSearchClose.addEventListener('click', headerSearchToggle)

            // Сворачивание меню при клике вне его
            window.addEventListener('click', (e)=>{
                if (!(e.target.classList.value.includes('header') || e.target.parentNode.classList.value.includes('header'))){
                    header.classList.remove('active')
                    document.body.style.overflow = ''
                    // console.log(e.target.parentNode.classList.value);
                }
                if (e.target.classList.value.includes('header-mobile')){
                    header.classList.remove('active')
                    document.body.style.overflow = ''
                }
            })
        }
        if (window.matchMedia('(max-width: 576px)').matches){
            
        }
    };mediaQueries()
    
    window.addEventListener('resize', mediaQueries)
})