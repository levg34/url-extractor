var uri = 'https://lm.facebook.com/l.php?u=http%3A%2F%2Fbbc.in%2F2nBsz8v&h=ATNn3IYjcGQZ3H_gjiEnPTi0dTieEX7qSUXq1oiptYTj0DJDSboLaWFRfg1biegalGjdqQNNbS0vHlv4DuNEJqHRPdHsLL70esG0vY2zoJdKIAsqW5Ug55GkG6iQJ5c3BjaU8A&enc=AZOH0zUrYB7yjsphVBxqnLPHX6gECC8szj7CP3bpkV8euzjSN9avXApbDFEGAmv3AotMjlBrZWrPtOZahN8Qp-9Hcek3TuhEmZMSCEgV8YThCkRmuf8CABAzECTPK56ey2S0ZzrwAEW2nigVRw2SSoLXOSuSS60sHOgcPWnmamQkWtlc0m-zTmFUgEuzKzYUbH_NQYuu6ST0r4IoHDLMMvumwXIVqBgkCPFs5uIuWfCDgRNchutfecU116xACmhburjxR9rF_QSFTkELDmh0qtH_6VI2hOPE7hUFGSUYT2OVoAG6CWX0ZrMDL8sZlpHuWFU&s=1'

function getUrl(uri) {
	var uri_enc = uri.split('?u=')[1].split('&h=')[0]
	var uri_dec = decodeURIComponent(uri_enc)
	return uri_dec
}

console.log(getUrl(uri))
