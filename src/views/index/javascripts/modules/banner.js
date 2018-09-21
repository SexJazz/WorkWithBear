
console.log('banner')
// 引入了swiper的构造器
const Swiper = require('../../../../javascripts/swiper.min.js')
  

var banner = {
    init () { // 初始化
        this.getData()
       
    },
    getData () {// 获取数据
        $.ajax({
            url: 'https://www.maizuo.com/api/billboard/home',
            data: {
                __t: Date.now(),
                count: 5
            },
            success: (data) => {
                this.renderBannerItem(data)
            }
        })
    },
    renderBannerItem (res) {
        let str = ''
        res.data.billboards.forEach(item => {
            str += `
                <div class="swiper-slide">
                    <img width="100%" src="${item.imageUrl}" alt="">
                </div>
            `
        });

        $('.index-banner .swiper-wrapper').html(str)
        // 当数据循环渲染完成后再去实例化swiper
        this.initialSwiper()

    },
    initialSwiper () {
        // 实例化swiper就能得到轮播
        var mySwiper = new Swiper ('.index-banner .swiper-container', {
            // direction: 'vertical',
            loop: true,
            
            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
            },
            
            // 如果需要前进后退按钮
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        }) 
    }
}

banner.init()
// 跨域方式：代理，服务端与服务端之间没有跨域限制 我们目前前端所处的服务端是localhost:8000,目标是www.zbird.com
// 其实，我们前端去请求localhost:8000服务器，再让localhost:8000 去请求www.zbird.com
// http://www.zbird.com/Ajaxrequest/getCityStore/
$.ajax({
    //把目标域换成了localhost:8000，并且再域和path之间加一个暗号，例如，下面的zbird就是暗号
    // url: 'http://localhost:8000/zbird/Ajaxrequest/getCityStore/',
    url: '/zbird/Ajaxrequest/getCityStore/',
    type: 'post',
    success (data) {
        console.log(data)
    }
})


// $.ajax({
//     url: 'http://localhost:8000/abc/banner/index'
// })