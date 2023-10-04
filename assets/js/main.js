/*
	Prologue by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

// const express = require('express');
// const app = express()
// const cors = require('cors')
// app.use(cors())

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$nav = $('#nav');

	// Breakpoints.
		breakpoints({
			wide:      [ '961px',  '1880px' ],
			normal:    [ '961px',  '1620px' ],
			narrow:    [ '961px',  '1320px' ],
			narrower:  [ '737px',  '960px'  ],
			mobile:    [ null,     '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Nav.
		var $nav_a = $nav.find('a');

		$nav_a
			.addClass('scrolly')
			.on('click', function(e) {

				var $this = $(this);

				// External link? Bail.
					if ($this.attr('href').charAt(0) != '#')
						return;

				// Prevent default.
					e.preventDefault();

				// Deactivate all links.
					$nav_a.removeClass('active');

				// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
					$this
						.addClass('active')
						.addClass('active-locked');

			})
			.each(function() {

				var	$this = $(this),
					id = $this.attr('href'),
					$section = $(id);

				// No section for this link? Bail.
					if ($section.length < 1)
						return;

				// Scrollex.
					$section.scrollex({
						mode: 'middle',
						top: '-10vh',
						bottom: '-10vh',
						initialize: function() {

							// Deactivate section.
								$section.addClass('inactive');

						},
						enter: function() {

							// Activate section.
								$section.removeClass('inactive');

							// No locked links? Deactivate all links and activate this section's one.
								if ($nav_a.filter('.active-locked').length == 0) {

									$nav_a.removeClass('active');
									$this.addClass('active');

								}

							// Otherwise, if this section's link is the one that's locked, unlock it.
								else if ($this.hasClass('active-locked'))
									$this.removeClass('active-locked');

						}
					});

			});

	// Scrolly.
		$('.scrolly').scrolly();

	// Header (narrower + mobile).

		// Toggle.
			$(
				'<div id="headerToggle">' +
					'<a href="#header" class="toggle"></a>' +
				'</div>'
			)
				.appendTo($body);

		// Header.
			$('#header')
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'header-visible'
				});


// API's Code Starts Here 

document.querySelector('.button-API').addEventListener('click', getFetch)

async function getFetch(){
	// const choice = document.querySelector('input').value
	const res = await fetch('https://api.nasa.gov/planetary/apod?api_key=kT7dlCmWgHXvQQNHbSy5dk2G96QAD9pQXb8Kjq8w')
	const data = await res.json() // parse response as JSON
		  console.log(data)
		  document.querySelector('h2.nasapicoftheday').innerText = data.title
		  document.querySelector('p.nasapicoftheday').innerText = data.explanation
		  document.querySelector('img.nasapicoftheday').src = data.hdurl
		  document.querySelector('span.nasapicoftheday').innerText = data.date
  
		  
		}

 	 document.querySelector('#memeGen').addEventListener('click', getMemeGener)
 	 function getMemeGener(){
   	 const choice = Number(document.querySelector('input').value)
   	 const url = 'https://api.imgflip.com/get_memes'


   fetch(url)
       .then(res => res.json()) // parse response as JSON
       .then(data => {
         console.log(data)
         // console.log(data.[{0}].word.meanings)
         document.querySelector('h5').innerText = data.data.memes[choice].name
         document.querySelector('#memeHere').src = data.data.memes[choice].url
       })
       .catch(err => {
           console.log(`error ${err}`)
       });
 }

 document.querySelector('#drinkGen').addEventListener('click', getADrink)

 function getADrink(){
   const choice = document.querySelector('#aDrink').value
   const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${choice}`

   fetch(url)
       .then(res => res.json()) // parse response as JSON
       .then(data => {
         console.log(data.drinks[0])
         document.querySelector('#nameTheDrink').innerText = data.drinks[0].strDrink
         document.querySelector('#drinkImgHere').src = data.drinks[0].strDrinkThumb
         document.querySelector('#expTheDrink').innerText = data.drinks[0].strInstructions
       })
       .catch(err => {
           console.log(`error ${err}`)
       });
 }


//  document.querySelector('#spillTheBeans').addEventListener('click', getTopReddits)

//  function getTopReddits(){
//    const url2 = 'https://tradestie.com/api/v1/apps/reddit'

//    fetch(url2)
//        .then(res => res.json()) // parse response as JSON
//        .then(data => {
//  			console.log(data)
//      //     document.querySelector('#nameTheDrink').innerText = data.drinks[0].strDrink
//      //     document.querySelector('#drinkImgHere').src = data.drinks[0].strDrinkThumb
//      //     document.querySelector('#expTheDrink').innerText = data.drinks[0].strInstructions
//         })
//        .catch(err => {
//            console.log(`error ${err}`)
//        });
//  }



})(jQuery);