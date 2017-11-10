// 该文件是用来写echarts这个图表的文件
$(function(){
    // 获取柱状图容器
    var firstDom = document.querySelector('.lt-canvas .picTable:first-child');
    
    var zhuChart = echarts.init(firstDom);

    var option = {
        title: {
            text: '2017年注册人数'
        },
        color: ['red'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: ['人数']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['1月', '2月', '3月', '4月', '5月', '6月'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '人数',
                type: 'bar',
                barWidth: '50%',
                data: [1000, 2500, 3000, 1200, 1100, 1000]
            }
        ]
    };
    // 渲染图标
    zhuChart.setOption(option);

    // 饼状图
    var secondDom = document.querySelector('.lt-canvas .picTable:last-child');
    var pieChart = echarts.init(secondDom);
    
    var secondOption = {
        title: {
            text: '热门品牌销售',
            subtext: '2017年6月',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克', '阿迪', '百伦', '安踏', '李宁']
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    { value: 335, name: '耐克' },
                    { value: 310, name: '阿迪' },
                    { value: 234, name: '百伦' },
                    { value: 135, name: '安踏' },
                    { value: 1548, name: '李宁' }
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    pieChart.setOption(secondOption);

})