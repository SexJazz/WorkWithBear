
const proxy = require('http-proxy-middleware');

//全局的配置
const config = {
    htmloptions: { //html压缩的配置
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    },
    serveroptions: {// 热更新服务
        root: './dist',
        port: 8000,
        livereload: true,
        //在这里 使用http-proxy-middleware工具来使我们的localhost:8000能帮助我们代理数据
        middleware: function(connect, opt) {
            return [ // 数组存放的就是一个一个的代理配置 http://www.zbird.com
                proxy('/zbird',  {// /zbird目的是提醒localhost:8000要做代理了，是暗号
                    target: 'http://www.zbird.com',// 当暗号是zbird的时候，真正的目标服务器
                    changeOrigin:true,
                    pathRewrite: {
                        '^/zbird': ''
                    }
                }),
                proxy('/abc', {
                    target: ' http://www.abc.com',
                    changeOrigin:true,
                    pathRewrite: {
                        '^/abc': ''
                    }
                })
            ]
        }
        // http://www.abc.com/banner/index
  
    },
    pages: [ 'index', 'list', 'car' ],
    cssoptions: {// css配置
        'index': { // index页面的css
            'common': [ // index页面处理之后的common.min.css需要合并的文件
                './src/stylesheets/reset.scss',
                './src/views/index/stylesheets/common/*.scss'
            ],
             // index页面处理之后的index.min.css需要合并的文件
            'index': './src/views/index/stylesheets/index/*.scss',
            'swiper': './src/stylesheets/swiper.min.css'
        },
        'list': {
            'list': [
                './src/stylesheets/reset.scss',
                './src/views/list/*/*.scss'
            ]
        }
    },
    jsoptions: {// js配置
        'index': { //首页的入口
            index: './src/views/index/javascripts/index.js',
            vendor: './src/views/index/javascripts/vendor.js'
        },
        'list': './src/views/list/javascripts/list.js'
    }
} 

// 把config暴露出去，是为了在其他地方用，只能暴露一次
module.exports = config