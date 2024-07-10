const allSideMenu = document.querySelectorAll('#sidebar .sideMenu.top li a');

allSideMenu.forEach(item => {
    const li = item.parentElement;

    item.addEventListener('click', function() {
        allSideMenu.forEach(i => {
            i.parentElement.classList.remove('active');
        })
        li.classList.add('active');
    })
});


//Sidebar
const menuBar = document.querySelector('.fa-solid.fa-bars');
const sidebar = document.querySelector('#sidebar');

menuBar.addEventListener('click', function() {
    sidebar.classList.toggle('hide');
})


const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
	if(this.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
})



const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .fa-solid');
const serachForm = document.querySelector('#content nav form');

    searchButton.addEventListener('click', function(e) {
        if (window.innerWidth < 576){
        e.preventDefault();
        serachForm.classList.toggle('show');
        if(serachForm.classList.contains('show')){
            searchButtonIcon.classList.replace('fa-magnifying-glass', 'fa-xmark');
        } else {
            searchButtonIcon.classList.replace( 'fa-xmark', 'fa-magnifying-glass');
        }
        }
    })

    
    if(window.innerWidth > 576) {
        searchButtonIcon.classList.replace( 'fa-xmark', 'fa-magnifying-glass');
        serachForm.classList.remove('show');
    }


    window.addEventListener('resize', function() {
        if(this.innerWidth > 576) {
            searchButtonIcon.classList.replace( 'fa-xmark', 'fa-magnifying-glass');
            serachForm.classList.remove('show');
        }
    })
    


document.addEventListener('DOMContentLoaded', function(){

        var options = {
            series:[{
                name: 'seriese1',
                data: [101, 64, 78, 191, 100, 200]
            },{
                name: 'seriese2',
                data: [301, 42, 50, 100, 64, 132]
            }],
            chart: {
                height: 300,
                type: 'area',
                toolbar: {
                    show: false,
                }
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 
                    'Apr', 'May', 'June', 'Jul'],
                labels: {
                    styles: {
                        colors: 'black'
                    }
                },
            },
            datalables: {
                enabled: false
            },
            colors: ['#1a73e8', '#e91e63'],
            stroke: {
                curve: 'smooth',
            },
            fill: {
             type: 'gradient',
             gradient: {
                opacityFrom: 0.6,
                opacityTo: 0.8,
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: 'black'
                }
            }
        },
        legend:{
        labels: {
            colors: 'black'
        },
    },
    };

    var chart = new ApexCharts(document.querySelector('#lineChart'), options);
     chart.render();

     
  //Pie Chart
    var options = {
        series: [44, 55, 17, 34],
        labels: ['Impressions', 'Followers', 'Engagement', 'Likes'],
        chart: {
            type: 'donut',
            height: 250,
            plotOptions: {
                pie: {
                    expandOnClick: true
                },
            },
        },
        colors: ['#3a86ff', '#3d348b', '#ff006e', '#ffbe0b'],
        legend: {
            show: false
        }
    }
    var chart = new ApexCharts(document.querySelector('#pieChart'), options);
    chart.render();
 });


    