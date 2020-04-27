/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

const nodeList = document.querySelectorAll('section');
const nav = document.getElementById('navbar__list');

const numSteps = 20.0;

let element;
let prevRatio;
let activeColor = 'rgba(80, 114, 114, ratio)';

//console.log(nodeList);

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

// get dynamic values for opacity changes
function buildThresholdList() {
	let thresholds = [];
	let numSteps = 20;

	for (let i = 1.0; i <= numSteps; i++) {
		let ratio = (i - 2) / numSteps;
		if (ratio > 0.5) {
			thresholds.push(ratio);
		}
	}

	thresholds.push(0);
	console.log(thresholds);
	return thresholds;
}

// create intersection observer for sections.
function createObserver() {
	let observer;

	let options = {
		root: null,
		rootMargin: '0px',
		threshold: buildThresholdList(),
	};

	observer = new IntersectionObserver(handleIntersect, options);
	observer.observe(element);
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
function createNav() {
	for (let i = 0; i < nodeList.length; i++) {
		let data = nodeList[i].getAttribute('data-nav');
		let id = nodeList[i].getAttribute('id');
		let anchor = document.createElement('a');

		anchor.textContent = data;
		anchor.setAttribute('class', 'menu__link');
		anchor.setAttribute( 'href', `#${ id }` );
		
		anchor.onclick = ( () => {
			event.preventDefault()
			nodeList[i].scrollIntoView({behavior: "smooth"})
		})
		let li = document.createElement('li');
		li.appendChild(anchor);

		nav.appendChild(li);
	}
}

//add event listener to "listen" for when sections come into view.
window.addEventListener(
	'load',
	(event) => {
		for (let i = 0; i < nodeList.length; i++) {
			element = nodeList[i];

			createObserver();
		}
	},
	false
);

// Add class 'active' to section when near top of viewport\

function handleIntersect(entries, observer) {
	entries.forEach((entry) => {
		if (entry.intersectionRatio > .7) {
			entry.target.className = 'active';
			entry.target.style.backgroundColor = activeColor.replace(
				'ratio',
				entry.intersectionRatio
			);
		} else {
			entry.target.className = '';
			entry.target.style.backgroundColor = ''
		}


	});
}

// add nav to webpage.
createNav();
