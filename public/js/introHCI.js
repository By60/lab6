'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);

	$.get("/project/" + idNumber, onReceiveProjectDetails);

	console.log("User clicked on project " + idNumber);
}

function onReceiveProjectDetails(result) {
	var idNumber = result['id'];
	var appendHtml =  '<img src="' + result['image'] + '" class="detailsImage">' +
						'<h2>' + result['title'] + '</h2>' +
						'<p><small>' + result['summary'] + '</small></p>' + 
						'<p><small>on ' + result['date'] + '</small></p>'; 

	$('#project' + idNumber + ' .details').html(appendHtml);
}

/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
	e.preventDefault();

	console.log("Starting POST request to ADS...");

	// var request = new XMLHttpRequest();
	// var data = new FormData();
	// data.append('input_user_id', '3');
	// data.append('input_recipients', '5105555555');
	// data.append('input_time', '2/17/14 2:45PM');
	// data.append('input_message', 'This is a test message');
	
	// request.onload = function () {
 //    	// do something to response
 //    	console.log("Response: " + this.responseText);
	// };
	// request.open("POST", "http://www.aerodroid.com/remindly/send_remindly.php", true);
	// request.setRequestHeader("Access-Control-Allow-Origin", "*");
	// request.send(data);

	//$.get("/palette", onReceivePalette);
	$.post("http://www.aerodroid.com/remindly/send_remindly.php",
		{
			"input_user_id" : "3",
			"input_recipients" : "510555555",
			"input_time" : "2/18/14 3:45pm",
			"input_message" : "Hey this is a POST test."
		},
	onFinishPost);

	console.log("Sent POST request.");
}

function onFinishPost(result) {
	console.log("Finished post, result: " + result);
}

function onReceivePalette(result) {
	var colors = result['colors']['hex'];
	$('body').css('background-color', colors[0]);
	$('.thumbnail').css('background-color', colors[1]);
	$('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
	$('p').css('color', colors[3]);
	$('.project img').css('opacity', .75);
}