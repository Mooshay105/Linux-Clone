import React from "react";
import minimize from "../assets/img/minimize.png";
import maximize from "../assets/img/maximize.png";
import close from "../assets/img/close.png";

interface AppProps {
	windowX: string;
	windowY: string;
	isOpen: boolean;
	isTopWindow: boolean;
	closeApp: () => void;
	setTopWindow: () => void;
}

const FirefoxApp: React.FC<AppProps> = ({ windowX, windowY, isOpen, isTopWindow, closeApp, setTopWindow }) => {
	return (
		<div id="firefox" className={isOpen ? "firefoxApp show" : "firefoxApp hide"} style={{ top: windowY, left: windowX, zIndex: isTopWindow ? "3" : "1" }} onClick={setTopWindow}>
			<div className="app-header">
				<div className="app-title">
					<p>Firefox Web Browser</p>
				</div>
				<div className="app-buttons">
					<img src={minimize} width="24px" height="24px" onClick={closeApp} />
					<img src={maximize} width="24px" height="24px" />
					<img src={close} width="24px" height="24px" onClick={closeApp} />
				</div>
			</div>
			<div className="app-content"> To Do... </div>
		</div>
	);
};

export default FirefoxApp;
