var checker = 'https://check-upstate.herokuapp.com/redirect?url='
var uri = {}

function URI(url) {
	var parser = purl(url)
	this.base = parser.attr('protocol')+'://'+parser.attr('host')+parser.attr('path')
	this.params = parser.param()
	this.used_params = []
}
URI.prototype.toggleParam = function(param) {
	if (this.used_params.indexOf(param)==-1) {
		this.used_params.push(param)
	} else {
		this.used_params.splice(this.used_params.indexOf(param),1)
	}
}
URI.prototype.getUrl = function() {
	var res = this.base
	var sep = '?'
	var obj = this
	this.used_params.forEach(function(param) {
		res+=sep+param+'='+obj.params[param]
		if (sep == '?') {
			sep = '&'
		}
	})
	return res
}
URI.prototype.displayURL = function() {
	$('#d_url').html('<a href="'+this.getUrl()+'">'+this.getUrl()+'</a>')
	$('#params').empty()
	for (var param in this.params) {
		$('#params').append('<input type="checkbox" id="'+param+'" onclick="toggleParam(\''+param+'\')"> '+param+': '+this.params[param]+'<br>')
	}
	this.used_params.forEach(function(param) {
		$('#'+param).prop('checked', true)
	})
}

function extractUrl(fb_url) {
	var uri_enc = fb_url.split('?u=')[1].split('&h=')[0]
	var uri_dec = decodeURIComponent(uri_enc)
	return uri_dec
}

function processUrl() {
	var text_url = extractUrl($('#f_url').val())
	console.log(text_url)
	uri = new URI(text_url)
	console.log(uri)
	uri.displayURL()
	checkRedirect(uri,function(new_uri) {
		uri = new URI(new_uri)
		uri.displayURL()
	})
}

function toggleParam(param) {
	uri.toggleParam(param)
	uri.displayURL()
}

function checkRedirect(_uri,callback) {
	$('#error_spinner').hide()
	$('#wait_spinner').show()
	$.getJSON(checker+_uri,function(data,status,xhr){
		$('#wait_spinner').hide()
		if (data.redirect) {
			callback(data.r_url)
		}
	}).fail(function() {
		$('#wait_spinner').hide()
		$('#error_spinner').show()
	})
}
	
function pressKey(e) {
	if (e.key=='Enter') {
		processUrl()
	}
}

function clearField() {
	$('#f_url').val('')
	$('#params').empty()
	$('#d_url').empty()
}

function example() {
	//$('#f_url').val('https://lm.facebook.com/l.php?u=https%3A%2F%2Fwww.change.org%2Fp%2Fanne-hidalgo-n-ayons-pas-peur-refusons-de-murer-la-tour-eiffel%3Frecruiter%3D703009373%26utm_source%3Dshare_petition%26utm_medium%3Dfacebook%26utm_campaign%3Dautopublish%26utm_term%3Dmob-xs-share_petition-no_msg&h=ATNkGiPffPBTXVynRs7AU5CoUuDaUm9KrMk9sAZA9ymqDE0c8jWG63nkshvhO8h1TgA_6RE6PG9hxQn_YNAGkUz-JHJUeLUUXr_CHEvuYJ257wAKy0EQUAtJ_8Ks6C0cSmJOew&enc=AZM0FnKgWfRhigFzrnzTN2I38noONcafDEIYJlqPYDYThPZCgfN5aLDQ2akQ6lKaV7mOYWv2LY28-CQoNiwHUV89Nm546XM42_rhVinzA3D1F8CbRuZTzbEZz2hmOIVbu3mWTyeibAZK_FRXPSUkLJHD3g1_0EbiR7GrAP-UbfF96qnZbtgm1PuyT_e46fxX-7jUsMW36MqgIRygahmTwno0mTDDCuTaqyR0omY7QoE-Q6n7wl_ECt4Xkk3sdue-xl16j0SeTrFCpm-RrSo0B65LtMS69_XFz_iQqQO8zykVpKb5O1HJJk9maZI1dUkZmbo&s=1')
	$('#f_url').val('https://l.facebook.com/l.php?u=http%3A%2F%2Fbbc.in%2F2fjoyWl&h=ATN3GrlPmmJL7o1Q5ieDUrnAQPJ3CVikP_19Sp0Wt4JtarQeOo1XXvRq4kA8Dm5Zuf7YXBUb5DItl3eKyJr7gIV5d3Ux4DAeCvyUo5oC35hTW8GcgpfQkAC2ID8UJ1chn6tSwICu-zzT7hNABWXcDlMfcvMuOEtPIMx7gCe4thBd506U02Akt2NksJKX3RR-d8LJ_hTXqAEG_I-n8FVzOMrGGnIULohsMGvnNzuzNJeR6G8kz0klYIeKlBnqt8s3nYcZwxwL8Vk5jvuJFRMsHYF_UJDUcUkdfDGclJ0')
	processUrl()
}
