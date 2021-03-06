let slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: false,
    responsive: {
        320: {
            nav: true,
            items: 1
        },
        992: {
            nav: false
        }
      }
});

$(document).ready(function() {
    
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() { //функция включения активности таба и контента в зависимости от нажатой кнопки таба
        $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) { //функция для вкл./выкл. класса _active
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        })
    }

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //modal windows
    $('[data-modal=consultation]').on('click', function(){
        $('.overlay, #consultation').fadeIn("fast"); //берем элемент по дата атрибуту data-modal = consultation и говорим что при действии на них клика от юзера js выполняет функцию - класс overlay и id consultation появлялись
    });
    $('.modal__close').on('click', function(){
        $('.overlay, #consultation, #order, #thanks').fadeOut('fast');
    }); //скрипт для скрывания всех модальных окон и в том числе их фона overlay по нажатии на крестик (взяли элемент .modal__close)

    $('.button_buy').each(function(i) { //выполнение функции для i-того элемента по счету
        $(this).on('click', function() { //при нажатии на ЭТУ кнопку
            $('#order .modal__text').text($('.catalog-item__subtitle').eq(i).text()); //выполняется этот код - элементу с классом modal__descr присваивается содержание элемента с классом catalog-item__subtitle  именно того по счету, который был нажат (а именно i-тый элемент), команда .eq позволяет получать определенный элемент по порядку
            $('.overlay, #order').fadeIn('fast');
        })
    })

    function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                    },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите своё имя",
                    minlength: jQuery.validator.format("Как минимум {0} символа требуется ввести")
                },
                phone: "Пожалуйста, введите свой мобильный телефон",
                email: {
                    required: "Пожалуйста, введите свою почту",
                    email: "Ваша почта должна быть следующего формата example@domain.com"
                }
                }
        });
    };
    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    $('input[name=phone]').mask("+7 (999) 999-99-99"); //маска для телефона. для того чтобы маска работала нужен плагин - подключить js файл к проекту
    $('form').submit(function(e) { //добавляем функции аргумент event
        e.preventDefault(); //предотвращаем стандартное браузерное поведение - перезугрзка страницы после submit
        $.ajax({ //используем метод? ajax библиотеки jQuery
            type: "POST", //указываем серверу, что пользователь отдает данные серверу, а не получает
            url: "mailer/smart.php", //прописываем url куда мы будем отправлять наш запрос
            data: $(this).serialize() //подготовка данных для отправки на сервер
        }).done(function() { //выполнение функции по выполнению функции $.ajax
            $(this).find("input").val(""); //находим инпуты this формы (текущей) и их value опустошаем
            $('#consultation, #order').fadeOut('fast');
            $('.overlay, #thanks').fadeIn('fast');
            $('form').trigger('reset'); //триггер для перезапуска формы, для заполнения ее placeholder'ами
        });
        return false;
    });

    //smooth scrolling up and hiding it if scrolling < 1600px
    $(window).scroll(function () {
        if ($(this).scrollTop() > 1200) {
            $('.page-up').fadeIn('slow');
        } else {
            $('.page-up').fadeOut('slow');
        }
    });
    $('a[href="#up"]').click(function() {
        const _href = $(this).attr('href');
        $('html, body').animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    })
    new WOW().init();
});



document.querySelector('.prev').addEventListener('click', function () {
    slider.goTo('prev');
});

  document.querySelector('.next').addEventListener('click', function () {
    slider.goTo('next');
});
