var Charts = function () {

    return {
        //main function to initiate the module

        init: function () {

            App.addResponsiveHandler();
            
        },

        initCharts: function () {

            if (!jQuery.plot) {
                return;
            }

            var data = [];
            var totalPoints = 10;

            // random data generator for plot charts

            function getRandomData() {
                if (data.length > 0) data = data.slice(1);
                // do a random walk
                while (data.length < totalPoints) {
                    var prev = data.length > 0 ? data[data.length - 1] : 50;
                   // var y = prev + Math.random() * 10 - 5;
                  //  if (y < 0) y = 0;
                  //  if (y > 100) y = 100;
                    data.push(1,2,3,4,5,6,7,8,9,10);
                }
                // zip the generated y values with the x values
                var res = [];
                for (var i = 0; i < data.length; ++i) res.push([i, data[i]])
//alert(i);                
                return res;
               
            }

                    
            //Dynamic Chart

            function chart4() {
                //server load
                var options = {
                    series: {
                        shadowSize: 1
                    },
                    lines: {
                        show: true,
                        lineWidth: 1,
                        fill: false
                    },
                    yaxis: {
                        min: 0,
                        max: 100,
                        tickFormatter: function (v) {
                            return v;
                        }
                    },
                    xaxis: {
                        show: false
                    },
                    colors: ["#6ef146"],
                    grid: {
                        tickColor: "#a8a3a3",
                        borderWidth: 0
                    }
                };

                var updateInterval = 180;
                var plot = $.plot($("#chart_4"), [getRandomData()], options);

                function update() {
                    plot.setData([getRandomData()]);
                    plot.draw();
                    setTimeout(update, updateInterval);
                }
                update();
            }

            //bars with controls

	        //graph
             chart4();
         

        },


        
    };

}();