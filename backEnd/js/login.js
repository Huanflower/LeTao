$(function () {
    /*前端校验功能  bootstrap validator*/
    /*1.完整的表单结构  form   input  submit 这些元素*/
    /*2.表单元素需要对应的名字 name="username" */
    /*3.初始化表单验证组件 插件*/
    /*4.配置组件功能*/
    /*5.配置具体的属性需要的校验规则*/
    $('#login-form').bootstrapValidator({
        /*提示的图标*/
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        /*属性对应的是表单元素的名字*/
        fields: {
            /*配置校验规则*/
            username: {
                /*规则*/
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    // 长度限制设置
                    stringLength: {
                        min: 4,
                        max: 16,
                        message: '用户名长度在1到16位之间'
                    },
                    /*设置错误信息 和规则无关 和后台校验有关系*/
                    callback: {
                        message: '用户名不存在'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 16,
                        message: '密码在6-16个字符内'
                    },
                    different: {
                        field: 'username',
                        message: '密码不能和用户名相同'
                    },
                    callback: {
                        message: '密码不正确'
                    }
                }
            }
        }
        /*7.表单校验成功*/
    }).on('success.form.bv', function (e) {
        /*禁用默认提交的事件 因为要使用ajax提交而不是默认的提交方式*/
        e.preventDefault();
        /*获取当前的表单*/
        var $form = $(e.target);
        /*发送登录请求*/
        $.ajax({
            type: 'post',
            url: '/employee/employeeLogin',
            data: $form.serialize(),
            dataType: 'json',
            success: function (data) {
                // console.log(data);
                if (data.success == true) {
                    location.href = '../index.html';
                } else if (data.error == 1001) {
                    // 密码错误
                    $('#login-form').data("bootstrapValidator").updateStatus("password", "INVALID", 'callback');
                } else if (data.error == 1000) {
                    // 用户名不存在
                    $('#login-form').data("bootstrapValidator").updateStatus("username", "INVALID", 'callback');
                }
            }
        });
    });
});