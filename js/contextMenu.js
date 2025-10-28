const contextMenu = document.getElementById('context-menu')

async function copyToClipboard(text) {
  	try {
    	await navigator.clipboard.writeText(text);
  	} catch (err) {
    	console.error('Failed to copy text: ', err);
  	}
}

document.addEventListener('contextmenu', (event) => {
	event.preventDefault();

	contextMenu.style.display = 'block'; // Show the custom menu
  	contextMenu.style.left = event.clientX + 'px'; // Position horizontally
  	contextMenu.style.top = event.clientY + 'px';
})

document.addEventListener('click', (event) => {
	if (!contextMenu.contains(event.target)) {
		contextMenu.style.display = 'none';
	}
})

document.addEventListener('mousedown', (event) => {
	if (contextMenu.contains(event.target)) {
		event.preventDefault();
	}
})

document.getElementById('copy').addEventListener('click', (event) => {
  	contextMenu.style.display = 'none';
	copyToClipboard(window.getSelection().toString());
});