var uri = ''
var params = ''
var used_params = []
var checker = 'https://check-upstate.herokuapp.com/redirect?url='

function getUrl(uri) {
	var uri_enc = uri.split('?u=')[1].split('&h=')[0]
	var uri_dec = decodeURIComponent(uri_enc)
	return uri_dec
}

// test:
/*
var uri = 'https://lm.facebook.com/l.php?u=http%3A%2F%2Fbbc.in%2F2nBsz8v&h=ATNn3IYjcGQZ3H_gjiEnPTi0dTieEX7qSUXq1oiptYTj0DJDSboLaWFRfg1biegalGjdqQNNbS0vHlv4DuNEJqHRPdHsLL70esG0vY2zoJdKIAsqW5Ug55GkG6iQJ5c3BjaU8A&enc=AZOH0zUrYB7yjsphVBxqnLPHX6gECC8szj7CP3bpkV8euzjSN9avXApbDFEGAmv3AotMjlBrZWrPtOZahN8Qp-9Hcek3TuhEmZMSCEgV8YThCkRmuf8CABAzECTPK56ey2S0ZzrwAEW2nigVRw2SSoLXOSuSS60sHOgcPWnmamQkWtlc0m-zTmFUgEuzKzYUbH_NQYuu6ST0r4IoHDLMMvumwXIVqBgkCPFs5uIuWfCDgRNchutfecU116xACmhburjxR9rF_QSFTkELDmh0qtH_6VI2hOPE7hUFGSUYT2OVoAG6CWX0ZrMDL8sZlpHuWFU&s=1'
console.log(getUrl(uri))

https://lm.facebook.com/l.php?u=https%3A%2F%2Fwww.change.org%2Fp%2Fanne-hidalgo-n-ayons-pas-peur-refusons-de-murer-la-tour-eiffel%3Frecruiter%3D703009373%26utm_source%3Dshare_petition%26utm_medium%3Dfacebook%26utm_campaign%3Dautopublish%26utm_term%3Dmob-xs-share_petition-no_msg&h=ATNkGiPffPBTXVynRs7AU5CoUuDaUm9KrMk9sAZA9ymqDE0c8jWG63nkshvhO8h1TgA_6RE6PG9hxQn_YNAGkUz-JHJUeLUUXr_CHEvuYJ257wAKy0EQUAtJ_8Ks6C0cSmJOew&enc=AZM0FnKgWfRhigFzrnzTN2I38noONcafDEIYJlqPYDYThPZCgfN5aLDQ2akQ6lKaV7mOYWv2LY28-CQoNiwHUV89Nm546XM42_rhVinzA3D1F8CbRuZTzbEZz2hmOIVbu3mWTyeibAZK_FRXPSUkLJHD3g1_0EbiR7GrAP-UbfF96qnZbtgm1PuyT_e46fxX-7jUsMW36MqgIRygahmTwno0mTDDCuTaqyR0omY7QoE-Q6n7wl_ECt4Xkk3sdue-xl16j0SeTrFCpm-RrSo0B65LtMS69_XFz_iQqQO8zykVpKb5O1HJJk9maZI1dUkZmbo&s=1

*/

function toggleParam(param) {
	// if $('#cbox1').checked ...
	var disp_uri = uri
	var sep = '?'
	if (used_params.indexOf(param)==-1) {
		used_params.push(param)
	} else {
		used_params.splice(used_params.indexOf(param),1)
	}

	used_params.forEach(function(param) {
		disp_uri+=sep+param+'='+params[param]
		if (sep == '?') {
			sep = '&'
		}
	})
	//params[param]
	$('#d_url').html('<a href="'+disp_uri+'">'+disp_uri+'</a>')
}

function processUrl() {
	uri = $('#f_url').val()
	uri = getUrl(uri)

	$.getJSON(checker+uri,function(data,status,xhr){
		if (data.redirect) {
			uri = data.r_url
			parseUrl()
		}
	})
	
	parseUrl()
}

function parseUrl() {
	var parser = purl(uri)

	uri = parser.attr('protocol')+'://'+parser.attr('host')+parser.attr('path')
	params = parser.param()
	used_params = []

	$('#params').empty()
	for(var param in params) {
		$('#params').append('<input type="checkbox" id="'+param+'" onclick="toggleParam(\''+param+'\')">'+param+': '+params[param]+'<br>')
	}

	$('#d_url').html('<a href="'+uri+'">'+uri+'</a>')
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
	$('#f_url').val('https://lm.facebook.com/l.php?u=http://bit.ly/2ymFv6X&h=ATNkGiPffPBTXVynRs7AU5CoUuDaUm9KrMk9sAZA9ymqDE0c8jWG63nkshvhO8h1TgA_6RE6PG9hxQn_YNAGkUz-JHJUeLUUXr_CHEvuYJ257wAKy0EQUAtJ_8Ks6C0cSmJOew&enc=AZM0FnKgWfRhigFzrnzTN2I38noONcafDEIYJlqPYDYThPZCgfN5aLDQ2akQ6lKaV7mOYWv2LY28-CQoNiwHUV89Nm546XM42_rhVinzA3D1F8CbRuZTzbEZz2hmOIVbu3mWTyeibAZK_FRXPSUkLJHD3g1_0EbiR7GrAP-UbfF96qnZbtgm1PuyT_e46fxX-7jUsMW36MqgIRygahmTwno0mTDDCuTaqyR0omY7QoE-Q6n7wl_ECt4Xkk3sdue-xl16j0SeTrFCpm-RrSo0B65LtMS69_XFz_iQqQO8zykVpKb5O1HJJk9maZI1dUkZmbo&s=1')
	processUrl()
}
