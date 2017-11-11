$(function () {
    var getFirstData = function (pageNum) {
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: pageNum || 1,
                pageSize: 5
            },
            dataType: 'json',
            success: function (data) {
                var firstResult = template('first-template', data);

                $('tbody').html(firstResult);

                // 分页
                $('.pagination').bootstrapPaginator({
                    // 当前使用的是3版本的bootstrap
                    bootstrapMajorVersion: 3,
                    // 配置的字体大小是小号
                    size: 'small',
                    // 当前页
                    currentPage: data.page,
                    // 一共多少页
                    // 总页数=数据的总数/每页显示多少条数据
                    totalPages: Math.ceil(data.total / data.size),
                    // 点击页面事件
                    onPageClicked: function (event, originalEvent, type, page) {
                        //    改变当前页面渲染 page 当前点击的按钮的页面
                        getFirstData(page);
                    }
                });
            }

        })
    }
    getFirstData();

    // 校验
    $('#first-form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            // 字段名是name属性的值
            categoryName: {
                validators: {
                    notEmpty: {
                        message: '一级分类名称不能为空'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();

    });

    $('#first-modal').on('click', '#save', function () {
        var formData = $('#first-form').serialize();
        $.ajax({
            type: 'post',
            url: '/category/addTopCategory',
            data: formData,
            dataType: 'json',
            success: function (data) {
                if (data.success == true) {
                    $('#first-modal').modal('hide');
                    getFirstData();
                }
            }
        })
    })
})