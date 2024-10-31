import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import Time from "./components/Time";
import FirefoxApp from "./components/FirefoxApp";
import SettingsApp from "./components/SettingsApp";
import Dock from "./components/Dock";
import "./assets/main.css";

function App() {
	const defaultWindowX = "400px";
	const defaultWindowY = "70px";
	const [settingsWindowOpen, setSettingsWindowOpen] = useState(true);
	const [firefoxWindowOpen, setFirefoxWindowOpen] = useState(false);
	const [firefoxWindowX, setFirefoxWindowX] = useState(defaultWindowX);
	const [firefoxWindowY, setFirefoxWindowY] = useState(defaultWindowY);
	const [settingsWindowX, setSettingsWindowX] = useState(defaultWindowX);
	const [settingsWindowY, setSettingsWindowY] = useState(defaultWindowY);
	const [topWindow, setTopWindow] = useState("settings");

	function openApp(appId: string) {
		if (appId === "firefox") {
			setFirefoxWindowOpen(true);
			setTopWindow("firefox");
		} else if (appId === "settings") {
			setSettingsWindowOpen(true);
			setTopWindow("settings");
		} else {
			console.log("[Web Linux Kernel] [WARN]: Invalid App ID");
		}
	}

	function closeApp(appId: string) {
		if (appId === "firefox") {
			setFirefoxWindowOpen(false);
		} else if (appId === "settings") {
			setSettingsWindowOpen(false);
		} else {
			console.log("[Web Linux Kernel] [WARN]: Invalid App ID");
		}
	}

	useEffect(() => {
		const headers = document.querySelectorAll<HTMLElement>(".app-header");

		headers.forEach((header) => {
			let parentElement = header.parentElement as HTMLElement;
			let offsetX: number, offsetY: number;

			function onMouseDown(e: MouseEvent) {
				offsetX = e.clientX - parentElement.getBoundingClientRect().left;
				offsetY = e.clientY - parentElement.getBoundingClientRect().top;

				function onMouseMove(e: MouseEvent) {
					const mouseX = e.clientX;
					const mouseY = e.clientY;
					const left = `${mouseX - offsetX}px`;
					const top = `${mouseY - offsetY}px`;
					parentElement.style.left = left;
					parentElement.style.top = top;

					if (parentElement.id === "settings") {
						setSettingsWindowX(left);
						setSettingsWindowY(top);
						setTopWindow("settings");
					} else if (parentElement.id === "firefox") {
						setFirefoxWindowX(left);
						setFirefoxWindowY(top);
						setTopWindow("firefox");
					}
				}

				document.addEventListener("mousemove", onMouseMove);
				document.addEventListener(
					"mouseup",
					() => {
						document.removeEventListener("mousemove", onMouseMove);
					},
					{ once: true },
				);
			}

			header.addEventListener("mousedown", onMouseDown);
			return () => header.removeEventListener("mousedown", onMouseDown);
		});
	}, []);

	function resetAppPos() {
		setSettingsWindowX(defaultWindowX);
		setSettingsWindowY(defaultWindowY);
		setFirefoxWindowX(defaultWindowX);
		setFirefoxWindowY(defaultWindowY);
	}

	return (
		<div>
			<header>
				<Time />
			</header>
			<Dock openApp={openApp} resetAppPos={resetAppPos} />
			<SettingsApp windowX={settingsWindowX} windowY={settingsWindowY} isOpen={settingsWindowOpen} isTopWindow={topWindow === "settings"} closeApp={() => closeApp("settings")} setTopWindow={() => setTopWindow("settings")} />
			<FirefoxApp windowX={firefoxWindowX} windowY={firefoxWindowY} isOpen={firefoxWindowOpen} isTopWindow={topWindow === "firefox"} closeApp={() => closeApp("firefox")} setTopWindow={() => setTopWindow("firefox")} />
		</div>
	);
}

createRoot(document.getElementById("root")!).render(<App />);
