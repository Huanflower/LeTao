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

})
