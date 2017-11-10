// 该文件的功能是用来写首页的js交互的

//1、进度条
//不要让进度条显示圆圈
NProgress.configure({ 
    showSpinner: false
});
//$.ajax ({
    //type:请求方式
    //url: 请求地址
    //data: 请求数据
    // beforessend:function(){}请求开始时的方式
    //success:function(){} 请求成功时的回调
    //error:function(){} 失败时的回调
    //complete:function(){} 无论成功还是失败都会调用的一个方法
//})

//ajax 全局事件
// $().ajaxStart() 代表ajax调用开始
// $().ajaxComplete() 代表ajax调用完成

//全局监听  当ajax请求发起的时候，让进度条开始
$(window).ajaxStart(function(){
    NProgress.start();
})
//当ajax请求完成的时候，让进度条完成
$(window).ajaxComplete(function () {
    NProgress.done();
})



// 点击左侧的菜单按钮  让左侧的侧边栏消失 让右侧的内容占满全屏
$('[data-menu]').on('click',function(){
    //切换
    $('.lt-aside').toggle();
    $('.lt-section').toggleClass('menu');
})


// 点击分类管理 滑出 菜单
$('.lt-aside .menu').on('click','[href="javascript:;"]',function(){
 var _this = $(this);

 var child = _this.siblings();
 child.slideToggle();
})