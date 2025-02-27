const presence = new Presence({
	clientId: "719757905888542730",
});

let actionTimestamp: number = null;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/1h1N9Rp.png",
	};

	if (location.hostname === "app.gitbook.com") {
		// In dashboard?
		if (document.querySelector("[class*=--dashboardBody-")) {
			const dashName = document.querySelector(
				"[class*=--dashboardMenu-] [class*=--headerText-]"
			);
			presenceData.details = dashName
				? `In ${dashName.textContent}'s Dashboard`
				: "In a Dashboard";
			actionTimestamp = null;
		} else {
			presenceData.smallImageKey = "writing";
			presenceData.smallImageText = "Editing";

			const docName = document.querySelector("[class*='logoText-'] span"),
				pageName = document.querySelector("[class*=--navButtonOpened-] span");

			actionTimestamp ??= Date.now();
			if (docName) presenceData.details = `Editing ${docName.textContent}`;
			if (pageName) presenceData.state = `on ${pageName.textContent}`;
			presenceData.startTimestamp = actionTimestamp;
		}
	} else {
		presenceData.smallImageKey = "reading";
		presenceData.smallImageText = "Viewing";

		const docName = document.querySelector("[class*='logoText-'] span"),
			pageName = document.querySelector("[class*=--navButtonOpened-] span");

		actionTimestamp ??= Date.now();
		if (docName) presenceData.details = `Viewing ${docName.textContent}`;
		if (pageName) presenceData.state = `on ${pageName.textContent}`;
		presenceData.startTimestamp = actionTimestamp;
	}

	// If data doesn't exist clear else set activity to the presence data
	if (!presenceData.details) {
		// Clear tray
		presence.setActivity(); // Clear activity
	} else presence.setActivity(presenceData);
});
