(function () {

	let slider = new Slider({
		el: document.getElementById("slider"),
		sliders: [{
				link: '#',
				image: 'images/gy.jpg'
			},
			{
				link: '#',
				image: 'images/tlx.jpg'
			},
			{
				link: '#',
				image: 'images/vixx.jpg'
			},
			{
				link: '#',
				image: 'images/xch.jpg'
			},
			{
				link: '#',
				image: 'images/xh.jpg'
			}
		]
	})


	window.slider = slider;

})()