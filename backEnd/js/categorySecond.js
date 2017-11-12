$(function () {
    // 获取数据列表
    var getSecondData = function (pageNum) {
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: pageNum || 1,
                pageSize: 5
            },
            dataType: 'json',
            success: function (data) {
                // console.log(data);
                var secondResult = template('second-template', data);
                $('tbody').html(secondResult);

                $('.pagination').bootstrapPaginator({
                    /*当前使用的是3版本的bootstrap*/
                    bootstrapMajorVersion: 3,
                    /*配置的字体大小是小号*/
                    size: 'small',
                    /*当前页*/
                    currentPage: data.page,
                    /*一共多少页*/
                    // 总页数=数据的总数/每页显示多少条数据
                    totalPages: Math.ceil(data.total / data.size),
                    /*点击页面事件*/
                    onPageClicked: function (event, originalEvent, type, page) {
                        /*改变当前页再渲染 page当前点击的按钮的页面*/
                        getSecondData(page);
                    }
                });
            }
        })
    }
    getSecondData();

    initDropDown();

    initUpload();

    // 信息校验
    $('#secondform').bootstrapValidator({

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        /*校验的字段*/
        fields: {
            brandName: {
                validators: {
                    notEmpty: {
                        message: '二级分类名称不能为空'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        /*提交数据了*/
        var $form = $(e.target);
  
        var bv = $form.data('bootstrapValidator');

        var data = $form.serialize();

        $.ajax({
            type: 'post',
            url: '/category/addSecondCategory',
            data: data,
            success: function (data) {
            //    console.log(data);
               $('#second-modal').modal('hide');
               getSecondData();
            }
        });
    });

})

//下拉下单
var initDropDown = function () {
    var dropdown = $('.dropdown');
    dropdown.click(function(){

        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            dataType: 'json',
            success: function (data) {
                
                var html = '';
                $.each(data.rows, function (i, item) {
                    //console.log(i,item);
                    html += '<li><a data-id="' + item.id + '" href="javascript:;">' + item.categoryName + '</a></li>'
                })
                //将数据插入到ul 中
                $('.dropdown-menu').html(html);
                $('.dropdown-menu').on('click', 'a', function () {
                    $('.dropdown-text').html($(this).html());
                    $('#categoryId').val($(this).attr('data-id'));
                    
                })
            }
        })
    })
   
}

//上传图片
var initUpload = function () {

    $(".fileupload input").fileupload({
        url: "/category/addSecondCategoryPic",
        done: function (e, data) {
            //预览图片显示
            $('#previewimg').attr('src', data.result.picAddr);
            $('#brandLogo').val(data.result.picAddr);
        }
    })
}

