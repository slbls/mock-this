const { app, Menu, Tray, clipboard } = require("electron");

function modifyClipboard() {
	clipboard.writeText(
		clipboard
			.readText()
			.split("")
			.map(
				letter =>
					Math.random() <= 0.35
						? letter === letter.toUpperCase()
							? letter.toLowerCase()
							: letter.toUpperCase()
						: letter
			)
			.join("")
	);
}

let clipboardPoll = setInterval(modifyClipboard, 1000);
app.on("ready", () => {
	const tray = new Tray("icon.png");

	const contextMenu = Menu.buildFromTemplate([
		{
			label: "Enable",
			type: "checkbox",
			checked: true,
			click: item =>
				item.checked
					? (clipboardPoll = setInterval(modifyClipboard, 1000))
					: clearInterval(clipboardPoll)
		},
		{
			label: "Exit",
			type: "normal",
			click: () => app.quit()
		}
	]);

	tray.setToolTip("mock-this");
	tray.setContextMenu(contextMenu);
});
