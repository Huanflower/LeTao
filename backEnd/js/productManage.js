$(function () {
    var getProductData = function (pageNum) {
        $.ajax({
            type: 'get',
            url: '/product/queryProductDetailList',
            data: {
                page: pageNum || 1,
                pageSize: 5
            },
            success: function (data) {
                var productResult = template('product-template', data);

                $('tbody').html(productResult);

               
            }
        })
    }

    getProductData();

    initUpload();

    // 信息校验
    $('#productform').bootstrapValidator({

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        /*校验的字段*/
        fields: {
            proName: {
                validators: {
                    notEmpty: {
                        message: '名称不能为空'
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: '名称不能为空'
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: '请上传二级分类Logo'
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: '名称不能为空'
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: '名称不能为空'
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: '名称不能为空'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        /*提交数据了*/
        var $form = $(e.target);

        // 获取参数
        // proName 产品名称
        // proDesc 产品描述
        // num 用户库存
        //price 价格
        // oldPrice 老价格
        //size 产品尺寸

        //branId 归属品牌  自己随便定一个
        //pic 图片数组

        var data = $form.serialize();
        // 遍历数组
        $.each(picList,function(i,item){
            // console.log(i,item);
            data+='&picName'+(i+1)+'='+item.picName+'&picAddr'+(i+1)+'='+item.picAddr;
        })

        data = data+'&brandId=4';
        // console.log(data);

        $.ajax({
            type: 'post',
            url: '/product/addProduct',
            data: data,
            success: function (data) {
                $('#product-modal').modal('hide');
                getProductData(); 
            }
        });
    });
})

//上传图片
var picList = [];
var initUpload = function () {

    $("#pic").fileupload({
        url: "/category/addSecondCategoryPic",
        done: function (e, data) {
            // console.log(data);
            $('.fileupload').append('<img width="50" height="auto" src="'+data.result.picAddr+'">');
            picList.push(data.result);
        }
    })
}